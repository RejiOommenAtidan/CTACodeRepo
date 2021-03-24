import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import {Button, FormControl, Paper, Select, InputLabel, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import MaterialTable from 'material-table';
import { oOptions, oTableIcons, sDateFormat, sButtonColor, sButtonSize, sButtonVariant, modifyHeaders, sDDMMYYYYRegex, sDateFormatMUIDatepicker, sISODateFormat  } from '../../../../config/commonConfig';
import { useForm, Controller } from "react-hook-form";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import _ from "lodash/fp";

import Search from '@material-ui/icons/Search';
import { Alerts } from '../../../alerts';
import { BackdropComponent } from '../../../backdrop/index';

const tableIcons = oTableIcons;

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
  const [bhorlakData, SetBhorlakData] = React.useState([]);
  const [madebTypeData, SetMadebTypeData] = React.useState();
  const [madebType, SetMadebType] = React.useState(3);
  const [dtFrom, SetdtFrom] = React.useState(null);
  const [dtTo, SetdtTo] = React.useState(null);
  const [orderBy, SetOrderBy] = React.useState('');
  const [groupBy, SetGroupBy] = React.useState('');
  const [title, setTitle] = React.useState();
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;
  const [backdrop, setBackdrop] = React.useState(false);

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
      field: "sPlaceName",
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
    {
      field: "madebPending",
      title: "MADEB PENDING",
      
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
      field: "madebIssued",
      title: "MADEB ISSUED",
      
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
      field: "madebRejected",
      title: "MADEB REJECTED",
      
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
      field: "madebDouble",
      title: "MADEB DOUBLE",
      
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
      field: "madebCancelled",
      title: "MADEB CANCELLED",
      
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
      field: "madebClosed",
      title: "MADEB CLOSED/DELETED",
      
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
      field: "madebTotalReceived",
      title: "TOTAL RECEIVED",
      
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
  const bhorlak = (e) => {
    e.preventDefault();
    if (madebType === '' || dtFrom === null || dtTo === null || orderBy === '') {
      setAlertMessage('All fields are required !');
      setAlertType('error');
      snackbarOpen();

    }
    else {
      setBackdrop(true);
      axios.get(`/Report/GetReportCTAMadebRegionOrCountryWiseBhorlak/?sMadebDisplayKey=` + madebType + `&dtRecordFrom=` + dtFrom + `&dtRecordTo=` + dtTo + `&sGroupBy=` + groupBy + `&sOrderBy=` + orderBy)
        .then(resp => {
          setBackdrop(false);
          if (resp.status === 200) {
            const grouping = orderBy === 'lstcountry.sCountry' ? 'Country Wise' : 'Region Wise'
            setTitle(`Madeb Bhorlak ${grouping} Report from ${Moment(dtFrom).format(sDateFormat)} to ${Moment(dtTo).format(sDateFormat)}` );
            if (resp.data.length == 0) {
              setAlertMessage('No Records to display');
              setAlertType('info');
              snackbarOpen();
              SetBhorlakData([]);
            }
            else {
              let x = 1;
              let total = { 'no': '', 'sPlaceName': 'Total', 'madebPending': 0, 'madebIssued': 0, 'madebRejected': 0, 'madebDouble': 0, 'madebCancelled': 0, 'madebClosed' : 0, 'madebTotalReceived': 0 };
              resp.data.forEach((element) => {
                //element.dtFormattedIssuedDate = element.dtIssuedDate ? Moment(element.dtIssuedDate).format(sDateFormat) : null;
                element.no = x;
                x = x + 1;
                total.madebPending += element.madebPending;
                total.madebIssued += element.madebIssued;
                total.madebRejected += element.madebRejected;
                total.madebDouble += element.madebDouble;
                total.madebCancelled += element.madebCancelled;
                total.madebClosed += element.madebClosed;
                total.madebTotalReceived += element.madebTotalReceived;
              })
              resp.data.push(total);
              SetBhorlakData(resp.data);
              console.log(resp.data);
            }
          }
        })
        .catch(error => {
          setBackdrop(false);
          console.error('Error', error.message);
            setAlertMessage('Error', error.messag);
            setAlertType('error');
            snackbarOpen();
          if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
          } else if (error.request) {
            console.warn(error.request);
          } else {
           
          }
          console.log(error.config);
        })
        .then(release => {
          //console.log(release); => udefined
        });
    }
  }
  useEffect(() => {
    bhorlakData.length > 0 && modifyHeaders()
  }, [bhorlakData]);

  return (
    <>
      <Paper style={{ padding: '30px', textAlign: 'center' }} >
        <h1>Bhorlak Report</h1>
        <form onSubmit = {(e) => handleSubmit(bhorlak(e))}>
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
            name='dtFrom'
            autoFocus
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
            name='dtTo'
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
            onChange={(e) => { SetOrderBy(e.target.value) }}

          >
            <MenuItem value={'lstauthregion.sAuthRegion'}>Region Wise</MenuItem>
            <MenuItem value={'lstcountry.sCountry'}>Country Wise</MenuItem>

          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button type="submit"
            size={sButtonSize}
            color={sButtonColor}
            variant={sButtonVariant}
            value="Report" >Show</Button>
        </FormControl>
        <FormControl className={classes.formControl}>
          {bhorlakData.length > 0 &&
            <Button type="button"
              size={sButtonSize}
              color={sButtonColor}
              variant={sButtonVariant}
              onClick={() => { history.go(0); }} >Clear</Button>
          }
        </FormControl>


        {
          bhorlakData.length > 0 &&

          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px', color: 'black', fontSize:'1.05rem' }}
            //isLoading={isLoading}
            icons={tableIcons}
            title={title}
            columns={columns}
            data={bhorlakData}
            options={{...oOptions, exportFileName: "BhorlakReport"}}
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
