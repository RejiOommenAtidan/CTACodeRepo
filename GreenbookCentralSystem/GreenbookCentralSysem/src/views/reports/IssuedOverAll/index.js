import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import {
  Button,
  FormControl,
  TextField,
  Paper,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import MaterialTable from 'material-table';
import { oOptions, oTableIcons, sDateFormat, sButtonColor, sButtonSize, sButtonVariant, modifyHeaders, sDDMMYYYYRegex, sDateFormatMUIDatepicker, sISODateFormat  } from '../../../config/commonConfig';
import { useForm, Controller } from "react-hook-form";
import Search from '@material-ui/icons/Search';
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';
import { useHistory } from 'react-router-dom';
import { useStaticState } from '@material-ui/pickers';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import _ from "lodash/fp";
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
  const [issuedIndividualData, SetIssuedIndividualData] = React.useState([]);
  const [madebTypeData, SetMadebTypeData] = React.useState();
  const [madebType, SetMadebType] = React.useState('');
  const [dtFrom, SetdtFrom] = React.useState(null);
  const [dtTo, SetdtTo] = React.useState(null);
  const [orderBy, SetOrderBy] = React.useState('');
  const [groupBy, SetGroupBy] = React.useState('');
  const [title, setTitle] = useState();
  const [total, setTotal] = useState('');
  const [rcheader, setRCHeader] = useState();
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
  };
  const snackbarClose = () => {
    setSnackbar(false);
  };
  const [backdrop, setBackdrop] = React.useState(false);
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  const columns = [
    {
      field: "no",
      title: "Sr. No.",
      sorting:false,
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
        border: '1px solid black'

      },
    },

    {
      field: "individualPlace",
      title: `${rcheader}`,
     // render: rowData => rowData.individualPlace==='Total'?<b>Total</b>:rowData.individualPlace ,
      //sorting:false,
      customSort: (a, b) => {
        if (a.individualPlace==='Total' || b.individualPlace==='Total') {  
          return 1
        }
        return a.individualPlace.localeCompare(b.individualPlace);
      },
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',
        textAlign: 'left',
        border: '1px solid black'

      },

    },
    {
      field: "nCount",
      title: "TOTAL",
     // render: rowData => rowData.individualPlace==='Total'?<b>{rowData.nCount}</b>:rowData.nCount ,
      customSort: (a, b) => {
        if (a.individualPlace==='Total' || b.individualPlace==='Total') {  
          return 1
        }
        return a.nCount.toString().localeCompare(b.nCount.toString(), 'en', {numeric: true});
      },
      headerStyle: {
        padding: '5px',

        textAlign: 'center'
      },
      cellStyle: {
        // padding:'0px',
        padding: '5px',

        textAlign: 'center',
        border: '1px solid black'

      },
    },

  ]




  const issuedIndividual = (e) => {
    e.preventDefault();
    if (madebType === '' || dtFrom === null || dtTo === null || orderBy === '') {
      setAlertMessage('All fields are required !');
      setAlertType('error');
      snackbarOpen();
    }
    else {
      setBackdrop(true);
      axios.get(`/Report/GetReportIssuedOverAll/?sMadebDisplayKey=` + madebType + `&dtRecordFrom=` + dtFrom + `&dtRecordTo=` + dtTo + `&sGroupBy=` + groupBy + `&sOrderBy=` + orderBy)
        .then(resp => {
          if (resp.status === 200) {
            setBackdrop(false);
            const grouping = orderBy === 'lstcountry.sCountry' ? 'Country Wise' : 'Region Wise';
            setRCHeader(orderBy === 'lstcountry.sCountry' ? 'Country' : 'Region')
            const madeb = madebTypeData.find((x) => x.id === madebType).sMadebDisplayName;
            setTitle(`${madeb} ${grouping} Report from ${Moment(dtFrom).format(sDateFormat)} to ${Moment(dtTo).format(sDateFormat)}` );
            if (resp.data.length == 0) {
              setAlertMessage('No Records to display');
              setAlertType('info');
              snackbarOpen();
              SetIssuedIndividualData([]);
            }
            else {
              let x = 1;
              let totalcount = 0;
              resp.data.forEach((element) => {
                //element.dtFormattedIssuedDate = element.dtIssuedDate ? Moment(element.dtIssuedDate).format(sDateFormat) : null;
                element.no = x;
                totalcount = totalcount + element.nCount;
                x = x + 1;
              })
              setTotal(totalcount);
             
              resp.data.push({ 'no': '', 'individualPlace': 'Total', 'nCount': totalcount });
              //console.log()
              SetIssuedIndividualData(resp.data);
            }
          }
        })
        .catch(error => {
          setBackdrop(false);
          setAlertMessage('Error fetching Data...');
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
            setAlertMessage('Error', error.messag);
            setAlertType('error');
            snackbarOpen();
          }
          console.log(error.config);
          console.log(error.message);
        })
        .then(release => {
          //console.log(release); => udefined
        });
    }
  }
  useEffect(() => {
    axios.get(`/MadebType/GetMadebTypes`)
      .then(resp => {
        if (resp.status === 200) {
          //console.log(resp.data);
          SetMadebTypeData(resp.data)
        }
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.warn(error.request);
        } else {
          console.error('Error', error.message);
          setAlertMessage('Error', error.messag);
          setAlertType('error');
          snackbarOpen();
        }
        console.log(error.config);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  }, []);
  useEffect(() => {
    issuedIndividualData.length > 0 && modifyHeaders()
  }, [issuedIndividualData]);

  return (
    <>
      <Paper style={{ padding: '30px', textAlign: 'center' }} >
        <h1>Green Book Issued Overall </h1>
        <form onSubmit = {(e) => handleSubmit(issuedIndividual(e))}>
        <FormControl className={classes.formControl}>
          <InputLabel id="madebTypelbl">Madeb Type<span style={{ color: 'red' }}> *</span></InputLabel>
          <Select
            labelId="madebTypelbl"
            id="madebType"
            autoFocus
            onChange={(e) => { SetMadebType(e.target.value); }}
          >
            {madebTypeData && madebTypeData.map((row) => (
              <MenuItem value={row.id}>{row.sMadebDisplayName}</MenuItem>
            ))}


          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  variant="dialog"
                  //openTo="year"
                  //views={["year", "month", "date"]}
                  margin="dense"
                  id="dtFrom"
                  name="dtFrom"
                  autoFocus
                  label={<> Date From<span style={{ color: 'red' }}> *</span></>}
                  format={sDateFormatMUIDatepicker}
                  returnMoment={true}
                  onChange={(date) => {
                    if (date) {
                      SetdtFrom(Moment(date).format(sISODateFormat));
                      setValue('dtFrom', date, { shouldValidate: true });
                    };
                  }}
                  value={dtFrom}
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
              {_.get("dtFrom.type", errors) === "required" && (
                <span style={{ color: 'red' }}>Date From is required</span>
              )}
        </FormControl>
        <FormControl className={classes.formControl}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker
                  variant="dialog"
                  //openTo="year"
                  //views={["year", "month", "date"]}
                  margin="dense"
                  id="dtTo"
                  name="dtTo"

                  label={<> Date To<span style={{ color: 'red' }}> *</span></>}
                  format={sDateFormatMUIDatepicker}
                  returnMoment={true}
                  onChange={(date) => {
                    if (date) {
                      SetdtTo(Moment(date).format(sISODateFormat));
                      setValue('dtTo', date, { shouldValidate: true });
                    }
                  }}
                  value={dtTo}
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
              {_.get("dtFrom.type", errors) === "required" && (
                <span style={{ color: 'red' }}>Date To is required</span>
              )}
            </FormControl>
        {/* <FormControl className={classes.formControl}>

          <TextField
            type="date"
            id='dtFrom'
            onChange={(e) => { SetdtFrom(e.target.value); }}
            value={dtFrom}
            label="Date From"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl className={classes.formControl}>

          <TextField
            type="date"
            id='dtTo'
            onChange={(e) => { SetdtTo(e.target.value); }}

            value={dtTo}
            label="Date To"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl> */}
        <FormControl className={classes.formControl}>
          <InputLabel id="orderbylbl">Order By<span style={{ color: 'red' }}> *</span></InputLabel>

          <Select
            labelId="orderbylbl"
            id="orderby"
            name="orderby"
            onChange={(e) => {
              if (e.target.value === "Region") {
                SetOrderBy('lstauthregion.sAuthRegion');
                SetGroupBy('lstauthregion.ID');
              }
              else if (e.target.value === "Country") {
                SetOrderBy('lstcountry.sCountry');
                SetGroupBy('lstcountry.sCountry');
              }
            }}
          >
            <MenuItem value={'Region'}>Region Wise</MenuItem>
            <MenuItem value={'Country'}>Country Wise</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <Button
            type="submit"
            size={sButtonSize}
            color={sButtonColor}
            variant={sButtonVariant}
            value="Report"  >Show</Button>
        </FormControl>
        <FormControl className={classes.formControl}>
          {issuedIndividualData.length > 0 &&
            <Button
              type="button"
              size={sButtonSize}
              color={sButtonColor}
              variant={sButtonVariant}
              onClick={() => { history.go(0); }} >Clear</Button>
          }
        </FormControl>

        {
          issuedIndividualData.length > 0 &&

          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px', color: 'black', fontSize:'1.05rem' }}
            //isLoading={isLoading}
            icons={oTableIcons}
            title={title}
            columns={columns}
            data={issuedIndividualData}
            options={{ ...oOptions, tableLayout: "fixed" , exportFileName: "GreenBookIssuedOverallReport"}}
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
        </form>
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
