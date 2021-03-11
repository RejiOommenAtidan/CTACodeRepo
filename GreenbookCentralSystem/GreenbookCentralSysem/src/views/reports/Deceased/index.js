import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
import Search from '@material-ui/icons/Search';
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';
import { useForm, Controller } from "react-hook-form";
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
  const [deceasedData, SetDeceasedData] = React.useState([]);
  const [madebTypeData, SetMadebTypeData] = React.useState();
  const [madebType, SetMadebType] = React.useState('');
  const [dtFrom, SetdtFrom] = React.useState(null);
  const [dtTo, SetdtTo] = React.useState(null);
  const [orderBy, SetOrderBy] = React.useState('');
  const [title, setTitle] = useState();
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
        border: '1px solid black'


      },
    },
    {
      field: "sGBID",
      title: "GB ID",
      
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
      field: "dtFormattedDOB",
      title: "DATE OF BIRTH",
      //   render: rowData => rowData.dtDOB ? Moment(rowData.dtDOB).format('DD-MM-YYYY') : '',
      
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
      customSort: (a, b) => {
        //console(a, b);
        if(!a.dtFormattedDOB){
          return -1;
        }
        if(!b.dtFormattedDOB){
          return 1;
        }
        a = a ? a.dtFormattedDOB.split('-').reverse().join('') : '';
        b = b ? b.dtFormattedDOB.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
    },
    {
      field: "dtFormattedDeceased",
      title: "DECEASED DATE",
      //   render: rowData => rowData.dtDeceased ? Moment(rowData.dtDeceased).format('DD-MM-YYYY') : '',
      
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
      customSort: (a, b) => {
        //console(a, b);
        if(!a.dtFormattedDeceased){
          return -1;
        }
        if(!b.dtFormattedDeceased){
          return 1;
        }
        a = a ? a.dtFormattedDeceased.split('-').reverse().join('') : '';
        b = b ? b.dtFormattedDeceased.split('-').reverse().join('') : '';
        return a.localeCompare(b);
      },
    },
    {
      field: "deathAge",
      title: "DEATH AGE",
      
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
      field: "sPlace",
      title: "REGION/COUNTRY",
      
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


  ]
  const deceased = (e) => {
    e.preventDefault();
    if (dtFrom === null || dtTo === null || orderBy === '') {
      setAlertMessage('All fields are required !');
      setAlertType('error');
      snackbarOpen();
    }
    else {
      setBackdrop(true);
      axios.get(`/Report/GetReportCTADeceasedRegionOrCountryWise/?dtRecordFrom=` + dtFrom + `&dtRecordTo=` + dtTo + `&sOrderBy=` + orderBy)
        .then(resp => {
          if (resp.status === 200) {
            setBackdrop(false);
            const grouping = orderBy === 'lstcountry.sCountry' ? 'Country Wise' : 'Region Wise'
            setTitle(`Deceased ${grouping} Report from ${Moment(dtFrom).format(sDateFormat)} to ${Moment(dtTo).format(sDateFormat)}` );
            if (resp.data.length == 0) {
              setAlertMessage('No Records to display');
              setAlertType('info');
              snackbarOpen();
              SetDeceasedData([]);
            }
            else {
              let x = 1;
              resp.data.forEach((element) => {
                element.no = x;
                x = x + 1;
                element.dtFormattedDOB = element.dtDOB ? Moment(element.dtDOB).format(sDateFormat) : null;
                element.dtFormattedDeceased = element.dtDeceased ? Moment(element.dtDeceased).format(sDateFormat) : null;
              })
              SetDeceasedData(resp.data);
            }
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
    }
  }
  useEffect(() => {
    deceasedData.length > 0 && modifyHeaders()
  }, [deceasedData]);

  return (
    <>
      <Paper style={{ padding: '30px', textAlign: 'center' }} >
        <h1>Deceased Region or Country Wise Report</h1>
        <form onSubmit = {(e) => handleSubmit(deceased(e))}>
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
            onChange={(e) => { SetOrderBy(e.target.value); }}
          // onChange={handleChange}
          >
            <MenuItem value={'lstauthregion.sAuthRegion'}>Region Wise</MenuItem>
            <MenuItem value={'lstcountry.sCountryID'}>Country Wise</MenuItem>

          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <Button
            type="submit"
            size={sButtonSize}
            color={sButtonColor}
            variant={sButtonVariant}
            value="Report"
            >Show</Button>
        </FormControl>
        <FormControl className={classes.formControl}>
          {deceasedData.length > 0 &&
            <Button
              type="button"
              size={sButtonSize}
              color={sButtonColor}
              variant={sButtonVariant}
              onClick={() => { history.go(0); }} >Clear</Button>
          }
        </FormControl>

        {
          deceasedData.length > 0 &&

          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px', color: 'black', fontSize:'1.05rem' }}
            //isLoading={isLoading}
            icons={oTableIcons}
            title={title}
            columns={columns}
            data={deceasedData}
            options={{ ...oOptions, exportFileName: "DeceasedReport"}}
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
