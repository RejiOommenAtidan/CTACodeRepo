
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

  const classes = useStyles();
  const [changesLogData, SetChangesLogData] = React.useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  const [backdrop, setBackdrop] = React.useState(false);
  const [title, setTitle] =  React.useState();
  //Alert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  };
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
      title: "SR. NO.",
      
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
      width: '5%',
      field: "GBId",
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
      field: "name",
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
      field: "field",
      title: "NAME OF FIELD",
      
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
      field: "previous",
      title: "CHANGE FROM",
      
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',
        borderRight: '1px solid grey',

        textAlign: 'left'

      },
    },
    {
      field: "new",
      title: "CHANGED TO",
      
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
      width: '7%',
      field: "changedBy",
      title: "CHANGED BY",
      
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
      width: '15%',
      field: "changedAt",
      title: "CHANGED AT",
      // render: rowData => rowData.dtEntered ? Moment(rowData.dtEntered).format('DD-MM-YYYY') : '',
      
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
  ]
  const changesLog = (e) => {
    e.preventDefault();
    if (startDate === '' || startDate === null || endDate === '' || endDate === null ) {
      setAlertMessage('Date field is required !');
      setAlertType('error');
      snackbarOpen();

    }
    else {
      setBackdrop(true);

      axios.get(`/Report/GetReportCTAChangesLog/?dtRecordFrom=${startDate}&dtRecordTo=${endDate}`)
        .then(resp => {

          if (resp.status === 200) {
            setBackdrop(false);
            //console.log(resp.data);
            if (resp.data.length == 0) {
              setAlertMessage('No Records to display');
              setAlertType('info');
              snackbarOpen();
              SetChangesLogData([]);
            }
            else {
              let x = 1;
              let arr=[];
              resp.data.forEach((element1) => {
                
                
               
                JSON.parse(element1.sFieldValuesOld).forEach((element2) => {
                  let row={};
                  //console.log(element2);
                  row.no = x;
                  

                  row.GBId=element1.sGBId;
                  row.name=element1.sName;
                  row.field=element2.Field;
                  row.previous=element2.PreviousValue;
                  row.new=element2.NewValue;
                  row.changedBy=element1.sFullName;
                  row.changedAt=element1.dtEntered ? Moment(element1.dtEntered).format("DD-MM-YY HH:mm") : null;
                  arr.push(row);
                  
                  x = x + 1;
                })
                
                
              })
             //console.log("New",arr);
              SetChangesLogData(arr);
              //console.log(resp.data);
            }
          }
        })
        .catch(error => {
          setBackdrop(false);
          if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
          } else if (error.request) {
            console.warn(error.request);
          } else {
            console.error('Error', error.message);
          }
          //console.log(error.config);
        })
        .then(release => {
          ////console.log(release); => udefined
        });
    }
  }
  useEffect(() => {
    changesLogData.length > 0 && modifyHeaders()
  }, [changesLogData]);

  return (
    <>
      <Paper style={{ padding: '30px', textAlign: 'center' }} >
        <h3>Changes Log Report</h3>
      <form onSubmit = {(e) => handleSubmit(changesLog(e))}>
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
          {changesLogData.length > 0 &&
            <Button
              type="button"
              style={{marginTop: '25px', marginLeft:'8px'}}
              size={sButtonSize}
              color={sButtonColor}
              variant={sButtonVariant}
              onClick={() => { setStartDate(null); setEndDate(null); SetChangesLogData([]); }} >Clear</Button>
          }
        </FormControl>
        </form>

        {
          changesLogData.length > 0 &&

          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px', color: 'black', fontSize:'1.05rem' }}
            //isLoading={isLoading}
            icons={oTableIcons}
            title={`Changes Log from ${Moment(startDate).format(sDateFormat)} To ${Moment(endDate).format(sDateFormat)}`}
            columns={columns}
            data={changesLogData}
            /*options={{
              filtering,
              exportButton: true,
              exportAllData: true,
              headerStyle: {
                padding: '0',
                paddingLeft: '10px',
                border: '1px solid lightgrey',
              },
              pageSize: pageSize,
              pageSizeOptions: pageSizeArray
            }}*/
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
