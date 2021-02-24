import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'moment';
import {
  Button,
  FormControl,
  TextField,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import MaterialTable from 'material-table';
import { oOptions, oTableIcons, sDateFormat, sButtonColor, sButtonSize, sButtonVariant, modifyHeaders, sDDMMYYYYRegex, sDateFormatMUIDatepicker, sISODateFormat } from '../../../config/commonConfig';
import Search from '@material-ui/icons/Search';
import { useForm, Controller } from "react-hook-form";
import { Alerts } from '../../alerts';
import _ from "lodash/fp";
import { BackdropComponent } from '../../backdrop/index';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: 0.01875,
    textAlign: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  },
}));


export default function Report() {
  const { register, handleSubmit, watch, errors, clearErrors, control, setValue, formState } = useForm();
  let history = useHistory();
  const [backdrop, setBackdrop] = React.useState(false);
  const classes = useStyles();
  const [newEntryFromDayData, SetNewEntryFromDayData] = React.useState([]);
  const [madebTypeData, SetMadebTypeData] = React.useState();
  const [madebType, SetMadebType] = React.useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orderBy, SetOrderBy] = React.useState('');
  const [groupBy, SetGroupBy] = React.useState('');
  const [title, setTitle] = useState();
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

  //Alert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  }
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    setSnackbar(true);
  }
  const snackbarClose = () => {
    setSnackbar(false);
  };
  const columns = [
    {
      field: "no",
      title: "Sr. No.",
      
      width: '5%',
      //hidden:true,
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'center',
        borderRight: '1px solid grey'

      },
    },
    {
      field: "sGBId",
      title: "GB ID",
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'center',
        borderRight: '1px solid grey'

      },
    },
    {
      field: "sName",
      title: "NAME",
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'left',
        borderRight: '1px solid grey'

      },
    },

    {
      field: "dtFormattedEntered",
      title: "DATE ENTERED",
      //   render: rowData => rowData.dtEntered ? Moment(rowData.dtEntered).format('DD-MM-YYYY') : '',
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'center',
        borderRight: '1px solid grey'

      },
      customSort: (a, b) => {
        //console(a, b);
        if(!a.dtFormattedEntered){
          return -1;
        }
        if(!b.dtFormattedEntered){
          return 1;
        }
        a = a ? a.dtFormattedEntered.split('-').reverse().join('') : '';
        b = b ? b.dtFormattedEntered.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
    },
    {
      field: "sFullName",
      title: "ENTERED BY",
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'left',
        borderRight: '1px solid grey'

      },
    },
    {
      field: "sOffice",
      title: "OFFICE",
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'left',
        borderRight: '1px solid grey'

      },
    },


  ]
  const newEntryFromDay = (e) => {
    e.preventDefault();
    if (startDate === '' || startDate === null || endDate === '' || endDate === null ) {
      setAlertMessage('All fields are required !');
      setAlertType('error');
      snackbarOpen();

    }
    else {
      setBackdrop(true);
      axios.get(`/Report/GetReportCTANewEntryFromDay/?dtRecordFrom=${startDate}&dtRecordTo=${endDate}`)
        .then(resp => {
          if (resp.status === 200) {
            setBackdrop(false);
            if (resp.data.length == 0) {
              setAlertMessage('No Records to display');
              setAlertType('info');
              snackbarOpen();
              SetNewEntryFromDayData([]);
            }
            else {
              let x = 1;
              resp.data.forEach((element) => {
                element.dtFormattedEntered = element.dtEntered ? Moment(element.dtEntered).format(sDateFormat) : null;
                element.no = x;
                x = x + 1;
              })
              SetNewEntryFromDayData(resp.data);
              console.log(resp.data);
            }
          }
        })
        .catch(error => {
          setBackdrop(false);
          setAlertMessage('Error', error.message);
            setAlertType('error');
            snackbarOpen();
          if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
          } else if (error.request) {
            console.warn(error.request);
          } else {
            console.error('Error', error.message);
            
          }
          console.log(error.config);
        })
        .then(release => {
          //console.log(release); => udefined
        });
    }
  }
  useEffect(() => {
    newEntryFromDayData.length > 0 && modifyHeaders()
  }, [newEntryFromDayData]);

  return (
    <>
      <Paper style={{ padding: '30px', textAlign: 'center' }} >
        <h3>New Entry From Day Report</h3>

        <form onSubmit = {(e) => handleSubmit(newEntryFromDay(e))}>
        <FormControl className={classes.formControl}>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  variant="dialog"
                  //openTo="year"
                  //views={["year", "month", "date"]}
                  margin="dense"
                  id="startDate"
                  name="startDate"
                  autoFocus
                  label={<> Date From<span style={{ color: 'red' }}> *</span></>}
                  format={sDateFormatMUIDatepicker}
                  returnMoment={true}
                  onChange={(date) => {
                    if (date) {
                      setStartDate(Moment(date).format(sISODateFormat));
                      setValue('startDate', date, { shouldValidate: true });
                    };
                  }}
                  value={startDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  // fullWidth
                  //className={classes.dateField}
                  inputRef={register({
                    required: true,
                    pattern:
                    {
                      value: new RegExp(sDDMMYYYYRegex),
                      message: "Invalid Date"
                    }
                  })}
                />
              </MuiPickersUtilsProvider>
              {/*{errors.startDate && <span style={{ color: 'red' }}>Date From is required</span>}*/}
              {_.get("startDate.type", errors) === "required" && (
                <span style={{ color: 'red' }}>Date From is required</span>
              )}






          {/* <TextField
            type="date"
            id='dtFrom'
            name='dtFrom'
            onChange={(e) => { SetdtFrom(e.target.value); }}
            value={dtFrom}
            label="On Date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}

          /> */}

        </FormControl>
        <FormControl className={classes.formControl}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker
                  variant="dialog"
                  //openTo="year"
                  //views={["year", "month", "date"]}
                  margin="dense"
                  id="endDate"
                  name="endDate"

                  label={<> Date To<span style={{ color: 'red' }}> *</span></>}
                  format={sDateFormatMUIDatepicker}
                  returnMoment={true}
                  onChange={(date) => {
                    if (date) {
                      setEndDate(Moment(date).format(sISODateFormat));
                      setValue('endDate', date, { shouldValidate: true });
                    }
                  }}
                  value={endDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  // fullWidth
                  //className={classes.dateField}
                  inputRef={register({
                    required: true,
                    pattern:
                    {
                      value: new RegExp(sDDMMYYYYRegex),
                      message: "Invalid Date"
                    }
                  })}
                />
              </MuiPickersUtilsProvider>
              {_.get("endDate.type", errors) === "required" && (
                <span style={{ color: 'red' }}>Date To is required</span>
              )}
            </FormControl>
        <FormControl >
          <Button
            type="submit"
            style={{marginTop: '25px', marginLeft:'8px'}}
            size={sButtonSize}
            color={sButtonColor}
            variant={sButtonVariant}
             >Show</Button>
        </FormControl>
        <FormControl >
          {newEntryFromDayData.length > 0 &&
            <Button
              type="button"
              style={{marginTop: '25px', marginLeft:'8px'}}
              size={sButtonSize}
              color={sButtonColor}
              variant={sButtonVariant}
              onClick={() => { setStartDate(null); setEndDate(null); SetNewEntryFromDayData([]); }} >Clear</Button>
          }
        </FormControl>
        </form>
        {
          newEntryFromDayData.length > 0 &&
          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px', color: 'black', fontSize:'1.05rem' }}
            //isLoading={isLoading}
            icons={oTableIcons}
            title={`New Entry from ${Moment(startDate).format(sDateFormat)} To ${Moment(endDate).format(sDateFormat)}`}
            columns={columns}
            data={newEntryFromDayData}
            options={{ ...oOptions, tableLayout: "fixed" }}
            actions={[

              {
                icon: Search,
                tooltip: 'Toggle Filter',
                isFreeAction: true,
                onClick: (event) => { setFiltering(currentFilter => !currentFilter) }
              }
            ]}
          />
        }
      </Paper>
      {snackbar && <Alerts
        alertObj={alertObj}
        snackbar={snackbar}
        snackbarClose={snackbarClose}
      />}
      {backdrop && <BackdropComponent
        backdrop={backdrop}
      />}
    </>
  );
}
