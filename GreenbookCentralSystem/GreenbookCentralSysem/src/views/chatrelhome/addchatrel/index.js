
import React, { useEffect, useState } from 'react';
import { Card, Select } from '@material-ui/core';
import { Link, Box, Container, Grid, Button, Typography, FormControl, TextField, InputLabel, MenuItem, TextareaAutosize } from '@material-ui/core';
import _ from "lodash/fp";
import { useForm, Controller } from "react-hook-form";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { sButtonColor, sButtonSize, sButtonVariant, sDateFormatMUIDatepicker, sDDMMYYYYRegex, asterisk, errorText, sDateFormatChatrel, sISODateFormat, sDateFormatChatrelMoment } from "../../../config/commonConfig";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Moment from "moment";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop/index';

import CurrencyTextField from '@unicef/material-ui-currency-textfield'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    flexGrow: 1,
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(0.5),
    width: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  box: {
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5)
  },
  button: {
    margin: theme.spacing(1),
  },
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: red[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  }
}));

export default function AddSingleChatrel(props) {
  console.log("Single Chatrel Props contains:", props);
  let history = useHistory();
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const classes = useStyles();
  const [backdrop, setBackdrop] = useState(false);
  const [symbol, setSymbol] = useState("₹");

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

  const [authRegions, setAuthRegions] = React.useState(null);
  const [authRegion, setAuthRegion] = React.useState(null);
  const [sAuthRegion, setRegion] = React.useState();
  const [countries, setCountries] = React.useState(null);
  const [countryID, setCountryID] = React.useState();
  const [country, setCountry] = useState(null);

  console.log("AuthRegions set in 'authRegions'", authRegions);
  console.log("Region set in 'authRegion'", authRegion);

  useEffect(() => {
    setBackdrop(true);
    axios.get(`/AuthRegion/GetAuthRegionsForAddNewChatrel`)
      .then(resp => {
        if (resp.status === 200) {
          console.log("AuthRegions fetched:", resp.data);
          setAuthRegions(resp.data);
          axios.get(`Country/GetCountriesForAddNewChatrel`)
            .then(resp => {
              if (resp.status === 200) {
                console.log(resp.data);
                setCountries(resp.data);
                setBackdrop(false);
                setAllDone(true);
              }
            })
            .catch(error => {
              setBackdrop(false);
              console.log(error.response.data);
            });
        }
      })
      .catch(error => {
        setBackdrop(false);
        console.log(error.response.data);
      });
  }, []);

  //Dialog setup
  const { register, handleSubmit, watch, errors, clearErrors, control, setValue, formState } = useForm();
  const [sName, setName] = React.useState('');
  const btnstyles = { background: 'none', border: 'none', cursor: 'pointer', color: 'blue' };
  

  // GBID for Chatrel
  //const [sGBID, setGBID] = useState(props?.sGBID);
  const [sGBID, setGBID] = useState(null);
  //const [sGBID, setGBID] = useState(() => 
  //props && props.sGBID && handleChangeGBID(props?.sGBID));
  const [sGBIDForDetails, setGBIDForDetails] = useState(props?.sGBID);
   // Who is paying
  const [sPaidByGBID, setPaidByGBID] = useState(null);
  const [dtPaymentDate, setPaymentDate] = useState(null);
  const [sCurrency, setCurrency] = React.useState('INR');
  const [nChatrel, setChatrel] = useState(null);
  const [nMeal, setMeal] = useState(null);
  const [nSalary, setSalary] = useState(0);
  const [dtChatrelFrom, setChatrelFrom] = useState(null);
  const [dtChatrelTo, setChatrelTo] = useState(null);

  const [nChatrelYear, setChatrelYear] = useState(null);
  const [nArrearsPlusLateFees, setArrearPlusLateFees] = useState(0);
  const [dtArrearsFrom, setArrearsFrom] = useState(null);
  const [dtArrearsTo, setArrearsTo] = useState(null);
  const [nBusinessDonation, setBusinessDonation] = useState(0);
  const [nAdditionalDonation, setAdditionalDonation] = useState(0);
  const [nChatrelTotalAmount, setChatrelTotalAmount] = useState(0);
  const [sReceiptNumber, setReceiptNumber] = useState(null);
  const [sPaymentMode, setPaymentMode] = useState('Offline');
  const [allDone, setAllDone] = useState(false);


  const handleChangeGBID = (value) => {
    //alert("Setting gbid: " + value);
    var len = 7 - value.length;
    for(var i = 0; i < len ; i++){
      console.log("gbid value:", value);
      value = '0' + value;
    }
    console.log("gbid value:", value);
    setGBID(value);
    setAuthRegion(null);
    setRegion(null);
    setCountryID(null);
    setCountry(null);
    setName(null);
    
  }

  const bindValues = (value) => {
    //alert("Setting gbid: " + value);
    var len = 7 - value.length;
    for(var i = 0; i < len ; i++){
      console.log("gbid value:", value);
      value = '0' + value;
    }
    console.log("gbid value:", value);
    //setGBID(value);
    setAuthRegion(null);
    setRegion(null);
    setCountryID(null);
    setCountry(null);
    setName(null);
  }
  const handleChangePaidByGBID = (value) => {
    var len = 7 - value.length;
    for(var i = 0; i < len ; i++){
      value = '0' + value;
    }
    
    setPaidByGBID(value);

  }
 
  const formPopulate = (value) => {
    if (value === '') {
      setAlertMessage(`Please enter a valid number...`);
      setAlertType('error');
      snackbarOpen();
      return;
    }
    //console.log("Value in GBID: ", value);
    //alert ("Value in GBID: " + value);
    const gbid = value;
    axios.get(`Greenbook/GetPersonalDetailsFromGBID/?sGBID=` + gbid)
      .then(resp => {
        if (resp.status === 200) {
          console.log("Got gb record\n", resp.data);

          const name = resp.data.sFirstName ? resp.data.sFirstName : '';

          const lname = resp.data.sLastName ? resp.data.sLastName : '';
          setName(`${name} ${lname}`);
          clearErrors("sName");
           const region = authRegions.find((x) => x.sAuthRegion === resp.data.sAuthRegion)
          setAuthRegion(region);
          setRegion(region.sAuthRegion);
          setValue('AuthRegion', region, {shouldValidate: true});
          var c = countries.find(x => x.sCountryID === region.sCountryID);
          console.log("Country", c);
          setCountryID(region.sCountryID);
          setCountry(c);
          setValue('sCountry', c, {shouldValidate: true});
          // setAuthRegionId(region.id);
          // setValue("AuthRegion", region, {
          //   shouldValidate: true,
          //   shouldDirty: true
          // })



        }
        else {
          setName('');
          setAuthRegion({});
          setRegion(null);
          console.log("Not found", resp);
          setAlertMessage(`No record found for GB Id: ${gbid}.`);
          setAlertType('error');
          snackbarOpen();
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setName('');
          //setAuthRegion([]);
          console.log("Not found", error.response.data);
          setAlertMessage(`${error.response.data}`);
          setAlertType('warning');
          snackbarOpen();
        }
        else if (error.response.status === 505) {
          setName('');
          //setAuthRegion([]);
          console.log(error);
          setAlertMessage(`Server error while fetching details for GB Id: ${gbid}.`);
          setAlertType('error');
          snackbarOpen();
        }
        else {
          setName('');
          //setAuthRegion([]);
          console.log(error);
        }
      });
  };
  
  useEffect(() => {
    if(allDone){
      if(props){
        if(props.sGBID){
          //setGBID(props.sGBID);
          handleChangeGBID(props.sGBID);
          setValue('sGBID', props.sGBID, {shouldValidate: true});
          formPopulate(props.sGBID);

          //handleChangePaidByGBID(props.sGBID);
        }
      }
    }
    
  },[allDone]);

  const currencies = [
    {
      value: 'USD',
      symbol: '$',
    },

    {
      value: 'INR',
      symbol: '₹',
    }];

  const chatrel = [{
    GBID: `${countryID}${sGBID}`,
    Name: sName,
    PaidByGBID: `${countryID}${sPaidByGBID}`,
    Currency: sCurrency,
    Chatrel: nChatrel?.toString(),
    Meal: nMeal?.toString(),
    Salary: nSalary?.toString(),
    ChatrelFrom: Moment(dtChatrelFrom).format('YYYY-MM-DD') != 'Invalid date' ? Moment(dtChatrelFrom).format(sDateFormatChatrelMoment) : null,
    ChatrelTo: Moment(dtChatrelTo).format('YYYY-MM-DD') !== 'Invalid date' ? Moment(dtChatrelTo).format(sDateFormatChatrelMoment) : null,
    FinancialYear: nChatrelYear?.toString(),
    ArrearsPlusLateFees: nArrearsPlusLateFees?.toString(),
    ArrearsFrom: Moment(dtArrearsFrom).format('YYYY-MM-DD') !== 'Invalid date'? Moment(dtArrearsFrom).format(sDateFormatChatrelMoment) : null,
    ArrearsTo: Moment(dtArrearsTo).format('YYYY-MM-DD') !== 'Invalid date' ? Moment(dtArrearsTo).format(sDateFormatChatrelMoment) : null,
    BusinessDonation: nBusinessDonation?.toString(),
    AdditionalDonation: nAdditionalDonation?.toString(),
    TotalAmount: nChatrelTotalAmount.toFixed(2),
    ReceiptNo: sReceiptNumber,
    PaymentDate: Moment(dtPaymentDate).format('YYYY-MM-DD') !== 'Invalid date' ? Moment(dtPaymentDate).format(sDateFormatChatrelMoment) : null,
    Region: sAuthRegion,
    Country: country?.sCountry,
    PaymentMode: sPaymentMode,
    nEnteredBy: userId,
    nUpdatedBy: userId
  }];

  console.log("Final obj", chatrel);

  const handleChatrelSubmit = () => {
    setBackdrop(true);
    console.log("Submit called");
    axios.post(`ChatrelBulkData/VerifyBulkImport`, chatrel).then(resp => {
      if(resp.status === 200){
        console.log("Verification Response: ", resp.data);
        if(resp.data[0].sStatus === 'Validate Success'){
          console.log("Validation successful", resp.data[0].sBatchNumber);
          axios.post(`ChatrelBulkData/SubmitBulkData/?sBatchNumber=${resp.data[0].sBatchNumber}`)
          .then(resp => {
            if(resp.status === 200){
              console.log("Submit success result integer",resp.data);
              setBackdrop(false);
              setAlertMessage('Record added successfully.');
              setAlertType('success');
              snackbarOpen();
              setTimeout(() => props.handleAddClickClose(true), 3000);
            }
          })
          .catch(error => {
            setBackdrop(false);
            setAlertMessage(`Record adding failed.`);
            setAlertType('error');
            snackbarOpen();
            console.log("Error Status:", error.response.status);
            console.log("Error Message:", error.message);
            console.log("Error Data:", error.response.data);
          });
        }
        else{
          setAlertMessage(resp.data[0].sStatus+'--\n\n'+resp.data[0].sRemarkText);
            setAlertType('error');
            snackbarOpen();
            setBackdrop(false);
        }
      }
    })
    .catch(error => {
      setBackdrop(false);
      setAlertMessage(`${error.message}`);
      setAlertType('error');
      snackbarOpen();
      console.log("Error Status:", error.response.status);
      console.log("Error Message:", error.message);
      console.log("Error Data:", error.response.data);
    });
  };

  useEffect(() => {
    console.log("Country changed", country);
    
  }, [country])

  return (
    <>

      <Dialog open={props.addModal} onEscapeKeyDown={() => props.handleAddClickClose(false)} aria-labelledby="form-dialog-title" maxWidth='md'>
        <DialogTitle id="form-dialog-title">Add single Chatrel Payment</DialogTitle>
        <form onSubmit={handleSubmit(handleChatrelSubmit)}>
          <DialogContent>
            <DialogContentText>
              <div>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={2}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        size="small"
                        id="filled-select-currency-native"
                        select
                        label="Currency"
                        value={sCurrency}
                        onChange={(e) => {
                          setCurrency(e.target.value);
                          setSymbol(e.target.options[e.target.options.selectedIndex].label);
                          console.log("target: ", e.target);
                        }}
                        SelectProps={{
                          native: true,
                        }}
                      //helperText="Please select your currency"

                      >
                        {currencies.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.symbol}
                          </option>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <FormControl className={classes.formControl}>
                      <Controller
                        render={props => (
                          <Autocomplete
                            {...props}
                            openOnFocus={true}
                            clearOnEscape
                            autoComplete={true}
                            autoHighlight={true}
                            options={authRegions}
                            getOptionLabel={(option) => option.sAuthRegion}
                            renderOption={(option) => (
                              <React.Fragment>
                                <span>{option.sAuthRegion}</span>
                              </React.Fragment>
                            )}
                            renderInput={params => (
                              <TextField
                                {...params}
                                label={<p>Authority<span style={{ color: "red" }} > *</span></p>}
                                variant="standard"
                                name="sAuthRegionText"
                                inputRef={register({
                                  required: true
                                })}
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: 'off', // disable autocomplete and autofill
                                }}
                              />
                            )}
                            onChange={
                              (e, value) => {
                                props.onChange(value);
                                //alert ("onChangeFired")
                                if (value !== null) {
                                  console.log(value.id);
                                  //setAuthRegionId(value.id);
                                  setRegion(value.sAuthRegion);
                                  setAuthRegion(value);
                                  setCountryID(value.sCountryID);
                                  setCountry(() => {
                                    var c = countries.find(x => x.sCountryID === value.sCountryID);
                                    console.log("Country", c);
                                    return c;
                                  });
                                  setValue('sCountry', countries.find(x => x.sCountryID === value.sCountryID), {shouldValidate: true});
                                }
                                else {
                                  //setAuthRegionId(null);
                                  setRegion(null);
                                  setCountryID(null);
                                  setCountry(null);
                                }
                              }
                            }
                            value={authRegion}
                          />
                        )}
                        name="AuthRegion"
                        control={control}
                        rules={{ required: true }}
                      />
                      {errors.AuthRegion && <span style={{ color: 'red' }}>This field is required</span>}
                      {/* {errors.sAuthRegionText && <span style={{color: 'red'}}>Enter Authority Region</span>} */}
                    </FormControl>
                  </Grid>


                  <Grid item xs={12} sm={5}>
                    <FormControl className={classes.formControl}>
                      <Controller
                        render={props => (
                          <Autocomplete
                            {...props}
                            disabled = {true}
                            openOnFocus={true}
                            clearOnEscape
                            autoComplete={true}
                            autoHighlight={true}
                            options={countries}
                            getOptionLabel={(option) => option.sCountry}
                            renderOption={(option) => (
                              <React.Fragment>
                                <span>{option.sCountry}</span>
                              </React.Fragment>
                            )}
                            renderInput={params => (
                              <TextField
                                {...params}
                                label={<p>Country<span style={{ color: "red" }} > *</span></p>}
                                variant="standard"
                                name="sCountry"
                                inputRef={register({
                                  required: true
                                })}
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: 'off', // disable autocomplete and autofill
                                }}
                              />
                            )}
                            onChange={
                              (e, value) => {
                                props.onChange(value);
                                //alert ("onChangeFired")
                                if (value !== null) {
                                  console.log("Country selected", value.sCountryID);
                                  setCountryID(value.sCountryID);
                                  setCountry(value);
                                }
                                else {
                                  setCountryID(null);
                                  setCountry(null);
                                }
                              }
                            }
                            value={country}
                          />
                        )}
                        name="sCountry"
                        control={control}
                        rules={{ required: true }}
                      />
                      {errors.sCountry && <span style={{ color: 'red' }}>This field is required</span>}
                      {/* {errors.sAuthRegionText && <span style={{color: 'red'}}>Enter Authority Region</span>} */}
                    </FormControl>
                  </Grid>


                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="sReceiptNumber"
                        size="small"
                        label={<p>Receipt No<span style={{ color: "red" }} > *</span></p>}
                        name="sReceiptNumber"
                        //required={true}
                        value={sReceiptNumber}
                        onChange={(e) => { setReceiptNumber(e.target.value) }}
                        inputRef={register({
                          required: true
                        })}
                      />
                      {errors.sReceiptNumber && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}

                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                    <Controller
                        render={props => (
                          <CurrencyTextField
                            label={<><span style={{ fontSize: '1.2rem' }}>Greenbook ID</span> {asterisk} </>}
                            variant="standard"
                            value={sGBID}
                            currencySymbol=""
                            //decimalCharacter="."
                            decimalPlaces={0}
                            outputFormat='string'
                            //maximumValue={2099}
                            //minimumValue={1950}
                            digitGroupSeparator=""
                            onChange={(event, value) => {
                              props.onChange(value); 
                              handleChangeGBID(value);
                              setGBIDForDetails(value);
                            }}
                          />
                        )}
                        name="sGBID"
                        control={control}
                        rules={{ required: true }}
                      />
                      {errors.sGBID && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                     
                    </FormControl>
                    <button type='button' style={btnstyles} onClick={() => formPopulate(sGBIDForDetails)}>Get Details</button>
                    
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="sName"
                        size="small"
                        label={<p>Name<span style={{ color: "red" }} > *</span></p>}
                        name="sName"
                        //required={true}
                        value={sName}
                        onChange={(e) => { setName(e.target.value) }}
                        inputRef={register({
                          required: true
                        })}
                      />
                      {errors.sName && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}

                    </FormControl>
                  </Grid>


                  <Grid item xs={12} sm={4}>

                    <FormControl className={classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          placeholder="DD/MM/YYYY"
                          size="small"
                          variant="dialog"
                          margin="dense"
                          id="dtPaymentDate"
                          name="dtPaymentDate"
                          autoOk
                          value={dtPaymentDate}
                          label={<>Payment Date<span style={{ color: 'red' }}> *</span></>}
                          format={sDateFormatChatrel}
                          returnMoment={true}
                          onChange={(date) => {
                            if (date) {

                              setValue('dtPaymentDate', date, { shouldValidate: true });
                              setPaymentDate(date);
                            }
                            else {
                              setValue('dtPaymentDate', null, { shouldValidate: true });
                              setPaymentDate(null);
                            }
                          }}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          fullWidth
                          //className={classes.dateField}
                          inputRef={register({
                            required: true,
                            // pattern:
                            // {
                            //   value: new RegExp(sDDMMYYYYRegex),
                            //   message: "Invalid Date"
                            // }
                          })}
                        />
                        {_.get("dtPaymentDate.type", errors) === "required" && (
                          <span style={{ color: "red" }}>
                            This field is required
                          </span>
                        )}
                      </MuiPickersUtilsProvider>

                    </FormControl>
                  </Grid>




                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>

                    <Controller
                        render={props => (
                          <CurrencyTextField
                            label={<><span style={{ fontSize: '1.2rem' }}>Paid by GB ID</span> {asterisk} </>}
                            variant="standard"
                            value={sPaidByGBID}
                            currencySymbol=""
                            //decimalCharacter="."
                            decimalPlaces={0}
                            outputFormat='string'
                            //maximumValue={2099}
                            //minimumValue={1950}
                            digitGroupSeparator=""
                            onChange={(event, value) => {
                              props.onChange(value); handleChangePaidByGBID(value);
                            }}
                          />
                        )}
                        name="sPaidByGBID"
                        control={control}
                        rules={{ required: true }}
                      />
                      {errors.sPaidByGBID && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}


                        {/* <TextField
                          id="sPaidByGBID"
                          label={<p>Paid by GB ID<span style={{ color: "red" }} > *</span></p>}
                          name="sPaidByGBID"
                          //required={true}
                          value={sPaidByGBID}
                          onChange={(e) => { setPaidByGBID(e.target.value) }}
                          inputRef={register({
                            required: true
                          })}
                        />
                        {errors.sPaidByGBID && (
                          <span style={{ color: 'red' }}>This field is required</span>
                        )} */}

                    </FormControl>
                  </Grid>


                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>

                      <Controller
                        render={props => (
                          <CurrencyTextField
                            label={<><span style={{ fontSize: '1.2rem' }}>Chatrel</span> {asterisk} </>}
                            name='chatrel'
                            variant="standard"
                            value={nChatrel}
                            currencySymbol={symbol}
                            decimalCharacter="."
                            //outputFormat='string'
                            decimalPlaces={2}
                            digitGroupSeparator=","
                            onChange={(event, value) => {
                              props.onChange(value);
                              setChatrel(value);
                              setChatrelTotalAmount(value+nMeal+nSalary+nArrearsPlusLateFees+nBusinessDonation+nAdditionalDonation );
                            }}

                          />
                        )}
                        name="chatrel"
                        control={control}
                        rules={{ required: true, min:1 }}
                      />



                      {errors.chatrel && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}

                    </FormControl>
                  </Grid>



                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                      <Controller
                        render={props => (
                          <CurrencyTextField
                            label={<><span style={{ fontSize: '1.2rem' }}>Meal</span>{asterisk}</>}
                            name='meal'
                            variant="standard"
                            value={nMeal}
                            currencySymbol={symbol}
                            decimalCharacter="."
                            decimalPlaces={2}
                            //outputFormat='string'
                            digitGroupSeparator=","
                            onChange={(event, value) => {
                              props.onChange(value); setMeal(value);
                              setChatrelTotalAmount(nChatrel+value+nSalary+nArrearsPlusLateFees+nBusinessDonation+nAdditionalDonation );
                            }}
                          />
                        )}
                        name="meal"
                        control={control}
                        rules={{ required: true, min:1 }}
                      />
                      {errors.meal && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                      <CurrencyTextField
                        label={<><span style={{ fontSize: '1.2rem' }}>Salary</span></>}
                        variant="standard"
                        value={nSalary}
                        currencySymbol={symbol}
                        decimalCharacter="."
                        decimalPlaces={2}
                        //outputFormat='string'
                        digitGroupSeparator=","
                        onChange={(event, value) => {
                          setSalary(value);
                          setChatrelTotalAmount(nChatrel+nMeal+value+nArrearsPlusLateFees+nBusinessDonation+nAdditionalDonation );
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                      <Controller
                        render={props => (
                          <CurrencyTextField
                            label={<><span style={{ fontSize: '1.2rem' }}>Financial Year</span> {asterisk} </>}
                            variant="standard"
                            value={nChatrelYear}
                            currencySymbol=""
                            //decimalCharacter="."
                            decimalPlaces={0}
                            outputFormat='string'
                            //maximumValue={2099}
                            //minimumValue={1950}
                            digitGroupSeparator=""
                            onChange={(event, value) => {
                              if(value.length == 4){
                                props.onChange(value); 
                                setChatrelYear(value);
                                setChatrelFrom(Moment(value+'-04-01'));
                                setChatrelTo(Moment(parseInt(value)+ 1 + '-03-31'));
                              }
                              else{
                                setChatrelYear();
                                setChatrelFrom(null);
                                setChatrelTo(null);
                              }
                              
                            }}
                          />
                        )}
                        name="year"
                        control={control}
                        rules={{ required: true, min:1950, max:2049 }}
                      />
                      {errors.year && (
                        <span style={{ color: 'red' }}>This field is required</span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>

                    <FormControl className={classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          placeholder="DD/MM/YYYY"
                          variant="dialog"
                          margin="dense"
                          id="dtChatrelFrom"
                          name="dtChatrelFrom"
                          value={dtChatrelFrom}
                          autoOk
                          label={<>Chatrel From{asterisk}</>}
                          format={sDateFormatChatrel}
                          returnMoment={true}
                          onChange={(date) => {
                            if (date) {

                              setValue('dtChatrelFrom', date, { shouldValidate: true });
                              setChatrelFrom(date);
                            }
                            else {
                              setValue('dtChatrelFrom', null, { shouldValidate: true });
                              setChatrelFrom(null);
                            }
                          }}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          fullWidth
                          //className={classes.dateField}
                          inputRef={register({
                            required: true,
                            // pattern:
                            // {
                            //   value: new RegExp(sDDMMYYYYRegex),
                            //   message: "Invalid Date"
                            // }
                          })}
                        />
                      </MuiPickersUtilsProvider>
                      {_.get("dtChatrelFrom.type", errors) === "required" && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>

                    <FormControl className={classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          placeholder="DD/MM/YYYY"
                          variant="dialog"
                          margin="dense"
                          id="dtChatrelTo"
                          name="dtChatrelTo"
                          autoOk
                          value={dtChatrelTo}
                          label={<>Chatrel To<span style={{ color: 'red' }}> *</span></>}
                          format={sDateFormatChatrel}
                          returnMoment={true}
                          onChange={(date) => {
                            if (date) {

                              setValue('dtChatrelTo', date, { shouldValidate: true });
                              setChatrelTo(date);
                            }
                            else {
                              setValue('dtChatrelTo', date, { shouldValidate: true });
                              setChatrelTo(null);
                            }
                          }}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          fullWidth
                          //className={classes.dateField}
                          inputRef={register({
                            required: true,
                            // pattern:
                            // {
                            //   value: new RegExp(sDDMMYYYYRegex),
                            //   message: "Invalid Date"
                            // }
                          })}
                        />
                      </MuiPickersUtilsProvider>
                      {_.get("dtChatrelTo.type", errors) === "required" && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                      <CurrencyTextField
                        label={<><span style={{ fontSize: '1.2rem' }}>Arrears + Late Fees</span> </>}
                        variant="standard"
                        value={nArrearsPlusLateFees}
                        currencySymbol={symbol}
                        //outputFormat='string'
                        decimalCharacter="."
                        decimalPlaces={2}
                        digitGroupSeparator=","
                        onChange={(event, value) => {
                          setArrearPlusLateFees(value);
                          setChatrelTotalAmount(nChatrel+nMeal+nSalary+value+nBusinessDonation+nAdditionalDonation );
                        }}
                      />

                    </FormControl>
                  </Grid>


                  <Grid item xs={12} sm={4}>

                    <FormControl className={classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          placeholder="DD/MM/YYYY"
                          variant="dialog"
                          margin="dense"
                          id="dtArrearsFrom"
                          name="dtArrearsFrom"
                          value={dtArrearsFrom}
                          autoOk
                          label={<>Arrears From</>}
                          format={sDateFormatChatrel}
                          returnMoment={true}
                          onChange={(date) => {
                            if (date) {

                              setValue('dtArrearsFrom', date, { shouldValidate: true });
                              setArrearsFrom(date);
                            }
                            else {
                              setValue('dtArrearsFrom', date, { shouldValidate: true });
                              setArrearsFrom(null);
                            }
                          }}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          fullWidth
                          //className={classes.dateField}
                          inputRef={register({

                            // pattern:
                            // {
                            //   value: new RegExp(sDDMMYYYYRegex),
                            //   message: "Invalid Date"
                            // }
                          })}
                        />
                      </MuiPickersUtilsProvider>

                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>

                    <FormControl className={classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          placeholder="DD/MM/YYYY"
                          variant="dialog"
                          margin="dense"
                          id="dtArrearsTo"
                          name="dtArrearsTo"
                          value={dtArrearsTo}
                          autoOk
                          label={<>Arrears To</>}
                          format={sDateFormatChatrel}
                          returnMoment={true}
                          onChange={(date) => {
                            if (date) {

                              setValue('dtArrearsTo', date, { shouldValidate: true });
                              setArrearsTo(date);
                            }
                            else {
                              setValue('dtArrearsTo', date, { shouldValidate: true })
                              setArrearsTo(null);
                            }
                          }}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          fullWidth
                          //className={classes.dateField}
                          inputRef={register({

                            // pattern:
                            // {
                            //   value: new RegExp(sDDMMYYYYRegex),
                            //   message: "Invalid Date"
                            // }
                          })}
                        />
                      </MuiPickersUtilsProvider>

                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                      <CurrencyTextField
                        label={<><span style={{ fontSize: '1.2rem' }}>Business Donation</span>  </>}
                        variant="standard"
                        value={nBusinessDonation}
                        currencySymbol={symbol}
                        decimalCharacter="."
                        //outputFormat='string'
                        decimalPlaces={2}
                        digitGroupSeparator=","
                        onChange={(event, value) => {
                          setBusinessDonation(value);
                          setChatrelTotalAmount(nChatrel+nMeal+nSalary+nArrearsPlusLateFees+value+nAdditionalDonation );
                        }}
                      />

                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                      <CurrencyTextField
                        label={<><span style={{ fontSize: '1.2rem' }}>Additional Donation</span>  </>}
                        variant="standard"
                        value={nAdditionalDonation}
                        currencySymbol={symbol}
                        //outputFormat='string'
                        decimalCharacter="."
                        decimalPlaces={2}
                        digitGroupSeparator=","
                        onChange={(event, value) => {
                          setAdditionalDonation(value);
                          setChatrelTotalAmount(nChatrel+nMeal+nSalary+nArrearsPlusLateFees+nBusinessDonation+value);
                        }
                        }
                      />

                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                      <Controller
                        render={props => (
                          <CurrencyTextField
                            label={<><span style={{ fontSize: '1.2rem' }}>Total Amount</span> {asterisk} </>}
                            variant="standard"
                            readOnly={true}
                            value={nChatrel+nMeal+nSalary+nArrearsPlusLateFees+nBusinessDonation+nAdditionalDonation}
                            currencySymbol={symbol}
                            //outputFormat='string'
                            decimalCharacter="."
                            decimalPlaces={2}
                            digitGroupSeparator=","
                            onChange={(event, value) => {
                              props.onChange(value); //setChatrelTotalAmount(value)
                            }}
                          />
                        )}
                        name="total"
                        control={control}
                        //rules={{  }}
                      />
                      {errors.total && <span style={{ color: 'red' }}>This field is required</span>}
                    </FormControl>
                  </Grid>

                  {snackbar && <Alerts
                    alertObj={alertObj}
                    snackbar={snackbar}
                    snackbarClose={snackbarClose}
                  />
                  }
                </Grid>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => props.handleAddClickClose(false)}
              color={sButtonColor}
              variant={sButtonVariant}
              size={sButtonSize}
            >Cancel</Button>

            {/* <Button  type='submit' onClick={handleSubmit} color="primary">Save</Button> */}

            {/* <Snackbar open={snackbarOpen} autoHideDuration={3000}  onClose={snackbarClose} >
        <Alert  onClose={snackbarClose} severity={alertType}  >
         {message}
        </Alert>
      </Snackbar> */}

            <Button
              disabled={formState.isSubmitting && formState.isValid}
              type="submit"
              color={sButtonColor}
              variant={sButtonVariant}
              size={sButtonSize}
            >Save</Button>
          </DialogActions>
        </form>
        {snackbar && <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />
          }
        {backdrop && <BackdropComponent
            backdrop={backdrop}
          />}
      </Dialog>

    </>
  );
};