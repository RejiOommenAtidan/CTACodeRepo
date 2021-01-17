import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from "lodash/fp";
import { useForm, Controller } from "react-hook-form";
import Moment from 'moment';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {
  Button,
  FormControl,
  TextField,
  Paper,
  Select,
  InputLabel,
  MenuItem,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MaterialTable from 'material-table';
import { oOptions, oTableIcons, sDateFormat, sButtonColor, sButtonSize, sButtonVariant, modifyHeaders, sDDMMYYYYRegex, sDateFormatMUIDatepicker } from '../../../config/commonConfig';
import Search from '@material-ui/icons/Search';
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
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
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Report() {
  const { register, handleSubmit, watch, errors, clearErrors, control, setValue, formState } = useForm();
  const classes = useStyles();
  let history = useHistory();
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
  const [backdrop, setBackdrop] = React.useState(false);
  const [filtering, setFiltering] = React.useState(false);
  oOptions.filtering = filtering;

  const [dataAPI, setdataAPI] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [authRegions, setAuthRegions] = React.useState([]);
  const [nAuthRegionId, setAuthRegionId] = React.useState([]);
  const [sAuthRegion, setAuthRegion] = useState();
  const [countries, setCountries] = React.useState([]);
  const [sCountryID, setCountryID] = React.useState([]);
  //const [sCountry, setCountry] = useState();
  const [sPaymentMode, setPaymentMode] = useState('Online');

  

  const modes = ['Online', 'Offline'];

  const columns = [
    {
      field: "nSerialNo",
      title: "Sr No.",
      hidden: true,
    },
    {
      field: "dtPayment",
      title: "Payment Date",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      //render: rowData => rowData['dtPayment'] ? Moment(rowData['dtPayment']).format(sDateFormat) : undefined,
    },
    {
      field: "sGBID",
      title: "GreenBook Id",
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },
    {
      field: "sChatrelReceiptNumber",
      title: "Receipt Number",
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
      // render: rowData => <Button className="m-2 btn-transparent btn-link btn-link-first" size={sButtonSize} onClick={() => { viewReceipt(rowData['sChatrelReceiptNumber']) }}><span><u>{rowData['sChatrelReceiptNumber']}</u></span></Button>
      // render: rowData => 
      // <>
      //   <Link to={{
      //     pathname: '/ChatrelPay/ChatrelReceipt',
      //     search: `?receiptNumber=${rowData['sChatrelReceiptNumber']}`,
      //     state: {sReceiptNumber: rowData['sChatrelReceiptNumber']},
      //     }}
      //     target='_blank'
      //   >
      //     <span style={{color: 'blue'}}><u>{rowData['sChatrelReceiptNumber']}</u></span>
      //   </Link>
      // </>

    },
    {
      field: "sFirstName",
      title: "First Name",
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },
    {
      field: "sPaidByGBId",
      title: "Paid By",
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },

    {
      field: "sPaymentCurrency",
      title: "Currency",
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
      //hidden: true
    },
    {
      field: "nChatrelAmount",
      title: "Chatrel",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      render: rowData => rowData['nChatrelAmount'] ? rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelAmount']}` : `$ ${rowData['nChatrelAmount']}` : ''
    },
    {
      field: "nChatrelMeal",
      title: "Meal",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      render: rowData => rowData['nChatrelMeal'] ? rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelMeal']}` : `$ ${rowData['nChatrelMeal']}` : ''
    },
    {
      field: "nCurrentChatrelSalaryAmt",
      title: "Employment",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      render: rowData => rowData['nCurrentChatrelSalaryAmt'] ? rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nCurrentChatrelSalaryAmt']}` : `$ ${rowData['nCurrentChatrelSalaryAmt']}` : ''
    },
    {
      field: "dtCurrentChatrelFrom",
      title: "Chatrel From",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      render: rowData => rowData['dtCurrentChatrelFrom'] ? Moment(rowData['dtCurrentChatrelFrom']).format(sDateFormat) : undefined,
    },
    {
      field: "dtCurrentChatrelTo",
      title: "Chatrel To",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      render: rowData => rowData['dtCurrentChatrelTo'] ? Moment(rowData['dtCurrentChatrelTo']).format(sDateFormat) : undefined,
    },

    {
      field: "sFinancialYear",
      title: "Year",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
    },
    {
      field: "nArrears",
      title: "Arrears + LateFees",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
    },

    {
      field: "dtArrearsFrom",
      title: "Arrears From",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      render: rowData => rowData['dtArrearsFrom'] ? Moment(rowData['dtArrearsFrom']).format(sDateFormat) : undefined,
    },
    {
      field: "dtArrearsTo",
      title: "Arrears To",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      render: rowData => rowData['dtArrearsTo'] ? Moment(rowData['dtArrearsTo']).format(sDateFormat) : undefined,
    },
    {
      field: "nChatrelBusinessDonationAmt",
      title: "Business Donation",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      render: rowData => rowData['nChatrelBusinessDonationAmt'] ? rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelBusinessDonationAmt']}` : `$ ${rowData['nChatrelBusinessDonationAmt']}` : ''
    },
    {
      field: "nChatrelAdditionalDonationAmt",
      title: "Additional Donation",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      render: rowData => rowData['nChatrelAdditionalDonationAmt'] ? rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelAdditionalDonationAmt']}` : `$ ${rowData['nChatrelAdditionalDonationAmt']}` : ''
    },
    {
      field: "nChatrelTotalAmount",
      title: "Total",
      cellStyle: {
        padding: '5px',
        textAlign: "right",
        borderRight: '1px solid grey'
      },
      render: rowData => rowData['sPaymentCurrency'] === 'INR' ? `₹ ${rowData['nChatrelTotalAmount']}` : `$ ${rowData['nChatrelTotalAmount']}`
    },
    {
      field: "sAuthRegion",
      title: "Authority Region",
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },

    {
      field: "sPaymentMode",
      title: "Payment Mode",
      cellStyle: {
        padding: '5px',
        borderRight: '1px solid grey'
      },
    },
  ];


  const reportParams = {
    Countries:  sCountryID,
    AuthRegions: nAuthRegionId,
    dtDateFrom: Moment(startDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(startDate).format('YYYY-MM-DD') : null,
    dtDateTo: Moment(endDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(endDate).format('YYYY-MM-DD') : null,
    sPaymentMode
  };

  //console.log("Parameters", reportParams);

  const getReport = () => {
    //e.preventDefault();
    const dtFrom = Moment(startDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(startDate).format('YYYY-MM-DD') : null;
    const dtTo = Moment(endDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(endDate).format('YYYY-MM-DD') : null;
    setBackdrop(true);
    axios.post(`ChatrelPayment/GetChatrelPaymentReport/`, reportParams)
      .then(resp => {
        setBackdrop(false);
        if (resp.status === 200) {
          console.log("Chatrel List", resp.data);
          var i = 1;
          resp.data.forEach((element) => {
            element.dtPayment = element.dtPayment ? Moment(element.dtPayment).format(sDateFormat) : null;
            element.nSerialNo = i++;
          });
          setdataAPI(resp.data);
          modifyHeaders();

        }
      })
      .catch(error => {
        console.log(error.message);
        setBackdrop(false);
      });
  }

  useEffect(() => {
    const startyear = Moment().month() < 3 ? Moment().year() - 1 : Moment().year();
    const endyear = startyear + 1;
    setStartDate(Moment(`01-04-${startyear}`, 'DD-MM-YYYY'));
    setEndDate(Moment(`31-03-${endyear}`, 'DD-MM-YYYY'));

    axios.get(`/AuthRegion/GetAuthRegionsForChatrelReport`)
      .then(resp => {
        if (resp.status === 200) {
          //console.log("AuthRegions fetched:", resp.data);
          setAuthRegions(resp.data);
          axios.get(`/Country/GetCountriesForChatrelReport`)
            .then(resp => {
              if (resp.status === 200) {
                //console.log("Countries: ", resp.data);
                setCountries(resp.data);
              }
            })
            .catch(error => {

            });
        }
      })
      .catch(error => {
        console.log(error.message);
      });


  }, []);

  
  return (
    <>{countries &&
      
      
      <Paper style={{ padding: '30px', textAlign: 'center' }} >
        <h1>Chatrel Report</h1>
        <form onSubmit={handleSubmit(getReport)}>
        <Grid container direction='row' justify='center' spacing={1}>
 <Grid item xs={12} sm={12} md={3} lg={3}>
 
 <FormControl className={classes.formControl} style={{marginTop: '13px'}}>
          <InputLabel id="madebTypelbl">Payment Mode</InputLabel>
          <Select
            fullWidth
            labelId="madebTypelbl"
            id="madebType"
            value={sPaymentMode}
            onChange={(e) => { setPaymentMode(e.target.value); }}
          >
            {modes.map((mode) => (
              <MenuItem value={mode}>{mode}</MenuItem>
            ))}


          </Select>
        </FormControl>
 
 </Grid>
 <Grid item xs={12} sm={12} md={3} lg={3}>
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
    autoOk
    label={<> Date From<span style={{ color: 'red' }}> *</span></>}
    format={sDateFormatMUIDatepicker}
    returnMoment={true}
    onChange={(date) => {
      if (date) {
        setStartDate(date);
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
{_.get("startDate.type", errors) === "required" && (
                      <span style={{ color: "red" }}>
                        Date From is required
                      </span>
                    )}
</FormControl>
 </Grid>
 <Grid item xs={12} sm={12} md={3} lg={3}>
 <FormControl className={classes.formControl}>

<MuiPickersUtilsProvider utils={DateFnsUtils} >
  <KeyboardDatePicker
    variant="dialog"
    //openTo="year"
    //views={["year", "month", "date"]}
    margin="dense"
    id="endDate"
    name="endDate"
    autoOk
    label={<> Date To<span style={{ color: 'red' }}> *</span></>}
    format={sDateFormatMUIDatepicker}
    returnMoment={true}
    onChange={(date) => {
      if (date) {
        setEndDate(date);
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
                      <span style={{ color: "red" }}>
                        Date To is required
                      </span>
                    )}
</FormControl>
 </Grid>
 </Grid>
 <Grid container direction='row' justify='center'>
 <Grid item xs={12} sm={12} md={3} lg={3}>
 
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={authRegions}
            disableCloseOnSelect
            getOptionLabel={(option) => option.sAuthRegion}
            onChange={
              (e, value) => {
                if(value !== null){
                  console.log("OnChange region...", value);
                  setAuthRegionId(value);
                }
                
              }
            }
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.sAuthRegion}
              </React.Fragment>
            )}
            style={{ width: '80%' }}
            renderInput={(params) => (
              <TextField {...params} label="Regions" placeholder="Region" />
            )}
          />


        

 </Grid>
 <Grid item xs={12} sm={12} lg={3} md={3}>

          <Autocomplete
          
            multiple
            id="checkboxes-tags-demo"
            options={countries}
            disableCloseOnSelect
            getOptionLabel={(option) => option.sCountry}
            onChange={
              (e, value) => {
                console.log("OnChange country...", value);
                setCountryID(value);
              }
            }
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.sCountry}
              </React.Fragment>
            )}
            style={{ width: '80%' }}
            renderInput={(params) => (
              <TextField {...params}  label="Countries" placeholder="Country" />
            )}
          />


        
 </Grid>
 </Grid>
        
        
        

        
        



        <FormControl className={classes.formControl}>
          <Button type="button"
          className={"mt-4"}
            size={sButtonSize}
            color={sButtonColor}
            variant={sButtonVariant}
            type='submit'
            value="Report"
            //onClick={(e) => { getReport(e) }} 
            >Get</Button>
        </FormControl>
        
</form></Paper>}

        {
          dataAPI.length > 0 &&

          <MaterialTable style={{ padding: '10px', width: '100%', border: '2px solid grey', borderRadius: '10px' }}
            //isLoading={isLoading}
            icons={oTableIcons}
            title='Chatrel Report'
            columns={columns}
            data={dataAPI}
            options={oOptions}
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
