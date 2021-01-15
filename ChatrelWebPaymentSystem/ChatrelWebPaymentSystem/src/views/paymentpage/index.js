//'use strict';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@material-ui/core';
import {
  Link,
  Box,
  Container,
  Grid,
  Button,
  Typography,
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  TextareaAutosize,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TableBodyRow } from 'mui-datatables';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Alerts } from '../alerts';
import { PayPalButton } from 'react-paypal-button-v2';

import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Flag from 'react-flagkit';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CTALogo from '../../assets/images/CTABackgroundLogo.PNG';
//import CTABackground from '../../assets/images/samye.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TramOutlined } from '@material-ui/icons';



import projectLogo from '../../assets/images/CTALogo.png';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 1000,
    alignContent: 'center',
    textAlign: 'center'
  },
  table: {
    minWidth: 650
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PaymentPage(props) {
  let history = useHistory();
  //const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);

  const fontName = 'Poppins';

  console.log('Props contains:', props);
  // Who is paying
  const paidByGBID = useSelector(
    (state) => state.GBDetailsReducer.oGBDetails.sGBID
  );
  const userId = parseInt(paidByGBID);
  // GBID for whom we are paying
  const sGBID = useSelector(
    (state) => state.CurrentGBDetailsReducer.oCurrentGBDetails.sGBID
  );

  // Relation we are paying for
  const paymentFor = useSelector(
    (state) => state.CurrentGBDetailsReducer.oCurrentGBDetails.sRelation
  );

  // Heading
  const pageFrom = useSelector(
    (state) => state.CurrentGBDetailsReducer.oCurrentGBDetails.from
  );

  //Alert
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
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

  //console.log(paidByGBID);
  //const userObj = useSelector(state => state.GLoginReducer.oGoogle);

  const [paymentDiv, setPaymentDiv] = React.useState(true);
  const [successDiv, setSuccessDiv] = React.useState(false);
  const [receiptData, setReceiptData] = React.useState();

  const [dataAPI, setDataAPI] = React.useState();
  const [summaryData, setSummaryData] = React.useState();
  const [paymentData, setPaymentData] = React.useState();
  const [donationData, setDonationData] = React.useState();

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [bdonation, setBdonation] = React.useState(0);
  const [adonation, setAdonation] = React.useState(0);

  const [authRegions, setAuthRegions] = React.useState(null);
  const [authRegion, setAuthRegion] = React.useState();
  const [shouldRun, setShouldRun] = React.useState(true);
  const [receiptNumber, setReceiptNumber] = React.useState('');
  const [outstanding, setOutstanding] = React.useState(true);
  const [donationNull, setDonationNull] = React.useState(false);
  const [gbChatrelsNull, setGBChatrelsNull] = React.useState(false);

  console.log("AuthRegions set in 'authRegions'", authRegions);
  console.log("Current Region set in 'authRegion'", authRegion);
  console.log('Current paymentData is ', paymentData);

  const autoComplete = (
    <Autocomplete
      id="id_authRegion"
      openOnFocus
      clearOnEscape
      autoComplete={true}
      autoHighlight={true}
      options={authRegions}
      value={authRegion}
      defaultValue={authRegion}
      getOptionLabel={(option) => option.sAuthRegion}
      renderOption={(option) => (
        <React.Fragment>
          <span>{option.sAuthRegion}</span>
        </React.Fragment>
      )}
      onChange={(e, value) => {
        if (value !== null) {
          console.log(value.id);
          //setMadebStatusID(value.id);
        } else {
          //setMadebStatusID(0);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Authority Region"
          variant="standard"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password' // disable autocomplete and autofill
          }}
        />
      )}
    />
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const updateAuthRegion = (e, value) => {
    console.log('Auth region changed to ', value.id, 'at row ', e.target.id);
    //const index = e.currentTarget.id.substring(0, e.currentTarget.id.indexOf('_'));
    //const index = e.target.id.substring(0, e.target.id.indexOf('_'));
    const index = parseInt(e.target.id);
    let chatrelObj = [...paymentData];
    chatrelObj[index].nAuthRegionID = value.id;
    chatrelObj[index].sCountryID = value.sCountryID;
    chatrelObj[index].sAuthRegionCurrency = value.sCurrencyCode;
    chatrelObj[index].nChatrelAmount =
      value.sCurrencyCode === 'INR'
        ? chatrelObj[index].nChatrelINR
        : chatrelObj[index].nChatrelUSD;
    chatrelObj[index].nChatrelMeal =
      value.sCurrencyCode === 'INR'
        ? chatrelObj[index].nChatrelMealINR
        : chatrelObj[index].nChatrelMealUSD;
    chatrelObj[index].nCurrentChatrelSalaryAmt = 0;

    setPaymentData(chatrelObj);
    calculate(index);
  };

  const modify = (target) => {
    console.log(target);
    let payObj = [...paymentData];
    let index;
    if (target.type === 'text') {
      index = parseInt(target.id);
      payObj[index].nCurrentChatrelSalaryAmt = parseFloat(target.value)
        ? parseFloat(target.value)
        : 0;
    } else {
      index = parseInt(target.value);
      if (payObj[index].nCurrentChatrelSalaryAmt === 0) {
        payObj[index].nCurrentChatrelSalaryAmt = payObj[index].nSalaryUSD;
        //setPaymentData(payObj);
      } else {
        payObj[index].nCurrentChatrelSalaryAmt = 0;
      }
    }
    setPaymentData(payObj);
    calculate(index);
  };

  const calculate = (index) => {
    let payObj = [...paymentData];

    let len = paymentData.length;

    if (index != len - 1) {
      payObj[index].nChatrelLateFeesValue =
        (payObj[index].nChatrelAmount +
          payObj[index].nChatrelMeal +
          payObj[index].nCurrentChatrelSalaryAmt) *
        (payObj[index].nChatrelLateFeesPercentage / 100);

      payObj[index].nArrearsAmount =
        payObj[index].nChatrelAmount +
        payObj[index].nChatrelMeal +
        payObj[index].nChatrelLateFeesValue +
        payObj[index].nCurrentChatrelSalaryAmt;
    } else {
      payObj[index].nChatrelLateFeesValue = 0;
    }

    payObj[index].nChatrelTotalAmount =
      (payObj[index].nChatrelAmount +
        payObj[index].nChatrelMeal +
        payObj[index].nChatrelLateFeesValue +
        payObj[index].nCurrentChatrelSalaryAmt) *
      (dollarToRupees && payObj[index].sAuthRegionCurrency === 'INR'
        ? dollarToRupees.toFixed(4)
        : 1);

    payObj[index].nConversionRate =
      payObj[index].sAuthRegionCurrency === 'USD'
        ? 1.0
        : parseFloat(dollarToRupees.toFixed(4));

    setPaymentData(payObj);
    calcTotal(paymentData, adonation, bdonation);
  };

  const calcTotal = (obj, a, b) => {
    let temptotal = a + b;
    obj.forEach((row) => {
      //temptotal+= row.nChatrelTotalAmount;
      temptotal += row.nChatrelTotalAmount;
    });
    setTotal(temptotal);
  };

  const runOnce = () => {
    if (paymentData && dollarToRupees && shouldRun) {
      if (!outstanding) {
        if (paymentData[0].nCurrentChatrelSalaryAmt > 0) {
          console.log('we have no outstanding');
          const checkBox = document.getElementById('employed');
          const rateField = document.getElementById('rate');
          const totalField = document.getElementById('total');
          if (checkBox) {
            rateField.innerText = '';
            checkBox.checked = true;
            checkBox.disabled = true;
            setPaymentData(
              paymentData.map((element) => {
                element.nChatrelTotalAmount = 0;
                element.nCurrentChatrelSalaryAmt = 0;
                return element;
              })
            );

            //totalField.innerText = '';
            setTotal(0.0);
            setGBChatrelsNull(true);
          }
        }
      } else {
        console.log('we have outstanding');
        const len = paymentData.length;
        for (var i = 0; i < len; i++) {
          calculate(i);
        }
      }
      setShouldRun(false);
    }
  };

  /*  const printPDF = () => {
    const domElement = document.getElementById("mytable");
    html2canvas(domElement,{scrollX: 0,
      scrollY: -window.scrollY}).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      console.log(imgData);
      //imgData.save();
      const pdf = new jsPdf();
      pdf.addImage(imgData, "PNG",10,10);
      pdf.save(`${new Date().toISOString()}.pdf`);
    });

  };*/
  const printPDF = () => {
    const domElement = document.getElementById('mytable');
    html2canvas(domElement, {
      allowTaint: true,
      scrollX: 0,
      scrollY: -window.scrollY
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      console.log(imgData);
      //imgData.save();
      const pdf = new jsPdf();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save(`${new Date().toISOString()}.pdf`);
    });
  };

  const submit = (paypalObj) => {
    //e.preventDefault();
    let tempSummaryObj = summaryData;
    let payObj = [...paymentData];
    let lastindex = payObj.length - 1;

    let donationObj = donationData;
    if (bdonation > 0 || adonation > 0) {
      donationObj.nChatrelAdditionalDonationAmt = adonation;
      donationObj.nChatrelBusinessDonationAmt = bdonation;
      donationObj.nAuthRegionID = payObj[lastindex].nAuthRegionID;
      donationObj.sCountryID = payObj[lastindex].sCountryID;
      donationObj.sAuthRegionCurrency = payObj[lastindex].sAuthRegionCurrency;
      donationObj.sPaidByGBId = paidByGBID;
      donationObj.nConversionRate = 1.0;
    } else {
      donationObj = null;
    }

    tempSummaryObj.nArrearsAmount =
      total - (payObj[lastindex].nChatrelTotalAmount + bdonation + adonation);
    tempSummaryObj.nChatrelTotalAmount = total;
    tempSummaryObj.nChatrelBusinessDonationAmt = bdonation;
    tempSummaryObj.nChatrelAdditionalDonationAmt = adonation;
    tempSummaryObj.sPaidByGBId = paidByGBID;
    tempSummaryObj.sChatrelReceiptNumber = receiptNumber;

    let chatrel = 0.0;
    let meal = 0.0;
    let salary = 0.0;
    payObj.forEach((gbchatrel) => {
      chatrel +=
        gbchatrel.sAuthRegionCurrency === 'USD'
          ? gbchatrel.nChatrelAmount
          : gbchatrel.nChatrelAmount * dollarToRupees.toFixed(4);
      meal +=
        gbchatrel.sAuthRegionCurrency === 'USD'
          ? gbchatrel.nChatrelMeal
          : gbchatrel.nChatrelMeal * dollarToRupees.toFixed(4);
      salary +=
        gbchatrel.sAuthRegionCurrency === 'USD'
          ? gbchatrel.nCurrentChatrelSalaryAmt
          : gbchatrel.nCurrentChatrelSalaryAmt * dollarToRupees.toFixed(4);
      gbchatrel.nEnteredBy = userId;
      gbchatrel.nUpdatedBy = userId;
    });

    tempSummaryObj.nChatrelAmount = chatrel;
    tempSummaryObj.nChatrelMeal = meal;
    tempSummaryObj.nCurrentChatrelSalaryAmt = salary;
    tempSummaryObj.nEnteredBy = userId;
    tempSummaryObj.nUpdatedBy = userId;
    tempSummaryObj.sPayPal_Status = paypalObj.status;
    tempSummaryObj.sPayPal_ID = paypalObj.id;
    tempSummaryObj.sPayPal_Currency_Code =
      paypalObj.purchase_units[0].amount.currency_code;
    tempSummaryObj.sPayPal_Currency_Value =
      paypalObj.purchase_units[0].amount.value;
    tempSummaryObj.sPayPal_Response_Object = JSON.stringify(paypalObj);

    if (gbChatrelsNull) {
      payObj = null;
    }

    if (donationNull) {
    }

    let finalObj = {
      chatrelPayment: tempSummaryObj,
      gbChatrels: payObj,
      gbChatrelDonation: donationObj
    };

    console.log('Final Obj:', finalObj);
    axios
      .post(`/ChatrelPayment/AddNewChatrelPayment`, finalObj)
      .then((resp) => {
        if (resp.status === 200) {
          //alert(resp.data);
          console.log(resp.data);
          resp.data.receipt.sGBID =
            '0'.repeat(7 - resp.data.receipt.sGBID.length) +
            resp.data.receipt.sGBID;

          setBackdrop(false);
          setAlertMessage('Chatrel recorded successfully.');
          setAlertType('success');
          snackbarOpen();
          setReceiptData(resp.data);
          setPaymentDiv(false);
          setSuccessDiv(true);
          /* history.goBack();
      console.log(resp.data); */
        }
      })
      .catch((error) => {
        console.log(error.config);
        console.log(error.message);
        console.log(error.response);
      });
  };

  useEffect(() => {
    axios
      .get(`/AuthRegion/GetAuthRegions`)
      .then((resp) => {
        if (resp.status === 200) {
          console.log('AuthRegions fetched:', resp.data);
          setAuthRegions(resp.data);
          if (props.location.state.pymtData) {
            console.log('Status is ', props.location.state.outstanding);
            if (!props.location.state.outstanding) {
              setOutstanding(false);
              if (
                props.location.state.pymtData.gbChatrels[0]
                  .nCurrentChatrelSalaryAmt > 0
              ) {
                // const checkBox = document.getElementById('employed');
                // checkBox.checked = true;
                // checkBox.disabled = true;
              }
            }
            setDataAPI(props.location.state.pymtData);
            setSummaryData(props.location.state.pymtData.chatrelPayment);
            setPaymentData(props.location.state.pymtData.gbChatrels);
            setDonationData(props.location.state.pymtData.gbChatrelDonation);
            calcTotal(
              props.location.state.pymtData.gbChatrels,
              adonation,
              bdonation
            );

            fetch('https://api.ratesapi.io/api/latest?base=INR&symbols=USD')
              .then((response) => response.json())
              .then((data) => {
                console.log('currency', data.rates.USD);
                setDollarToRupees(data.rates.USD);
              });
            console.log('Got data from props');

            return;
          }
          axios
            .get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=` + sGBID)
            .then((resp) => {
              if (resp.status === 200) {
                console.log('resp.data is:', resp.data);
                //resp.data.chatrelPayment.sPaymentMode = 'Offline';
                setDataAPI(resp.data);
                setSummaryData(resp.data.chatrelPayment);
                calcTotal(resp.data.gbChatrels, adonation, bdonation);
                setPaymentData(resp.data.gbChatrels);

                fetch('https://api.ratesapi.io/api/latest?base=INR&symbols=USD')
                  .then((response) => response.json())
                  .then((data) => {
                    console.log('currency', data.rates.USD);
                    setDollarToRupees(data.rates.USD);
                  });
              }
            })
            .catch((error) => {
              console.log(error.message);
              console.log(error.config);
              //console.log(error.response.data);
            });
        }
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.config);
      });
    //setPaymentData(payObj);
  }, []);

  const [dollarToRupees, setDollarToRupees] = React.useState(0.0);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    runOnce();
    console.log('dollar rate is ', dollarToRupees);
  }, [dollarToRupees]);

  useEffect(() => {
    authRegions &&
      dataAPI &&
      setAuthRegion(authRegions.find((x) => x.id === dataAPI.nAuthRegionID));
  }, [authRegions, dataAPI]);

  return (
    <>
      {' '}
      {dataAPI && (
        <>
          <div /*style={{backgroundColor:"#fff"}}*/>
            {/*<Typography className="myfont" variant="h4" style={{textAlign:'center',color:'#000',fontFamily:fontName,fontWeight:"bold"}} gutterBottom>{pageFrom.toUpperCase()}</Typography>*/}
            <div
              style={{
                width: '85%',
                margin: 'auto',
                backgroundColor: '#ced9fd',
                padding: '25px',
                border: '2px solid grey',
                borderRadius: '25px',
                boxShadow: ' 10px 10px 5px grey'
              }}
              className="text-black">
              {paymentDiv && (
                <>
                  <Typography
                    className="myfont"
                    variant="h5"
                    style={{
                      color: '#000',
                      fontFamily: fontName,
                      fontWeight: 'bold'
                    }}
                    gutterBottom>
                    PERSONAL DETAILS
                  </Typography>

                  <Card
                    style={{
                      padding: 20,
                      marginBottom: 20,
                      boxShadow: ' 3px 3px 1px grey'
                    }}>
                    <Grid container spacing={3} className="text-black">
                      <Grid item xs={12} sm={3}>
                        <Card className="card-box">
                          <div className="card-indicator bg-success" />
                          <CardContent className="px-4 py-3">
                            <div className="d-flex align-items-center justify-content-start">
                              <div
                                className="badge badge-first px-3"
                                style={{ fontSize: '14px' }}>
                                Name
                              </div>
                            </div>
                            <div
                              style={{
                                marginTop: '7px',
                                color: '#000'
                              }} /*className="pb-3 d-flex justify-content-between"*/
                            >
                              <b>{dataAPI.sName}</b>
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Card className="card-box">
                          <div className="card-indicator bg-success" />
                          <CardContent className="px-4 py-3">
                            <div className="d-flex align-items-center justify-content-start">
                              <div
                                className="badge badge-first px-3"
                                style={{ fontSize: '14px' }}>
                                Green Book ID
                              </div>
                            </div>
                            <div
                              style={{
                                marginTop: '7px',
                                color: '#000'
                              }} /*className="pb-3 d-flex justify-content-between"*/
                            >
                              <b>{dataAPI.chatrelPayment.sGBId}</b>
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Card className="card-box">
                          <div className="card-indicator bg-success" />
                          <CardContent className="px-4 py-3">
                            <div className="d-flex align-items-center justify-content-start">
                              <div
                                className="badge badge-first px-3"
                                style={{ fontSize: '14px' }}>
                                Paid Until
                              </div>
                            </div>
                            <div
                              style={{
                                marginTop: '7px',
                                color: '#000'
                              }} /*className="pb-3 d-flex justify-content-between"*/
                            >
                              <b>{dataAPI.nPaidUntil.split('T')[0]}</b>
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Card className="card-box">
                          <div className="card-indicator bg-success" />
                          <CardContent className="px-4 py-3">
                            <div className="d-flex align-items-center justify-content-start">
                              <div
                                className="badge badge-first px-3"
                                style={{ fontSize: '14px' }}>
                                Your Relation
                              </div>
                            </div>
                            <div
                              style={{
                                marginTop: '7px',
                                color: '#000'
                              }} /*className="pb-3 d-flex justify-content-between"*/
                            >
                              <b>{dataAPI.nPaidUntil.split('T')[0]}</b>
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Card>

                  <Typography
                    className="myfont"
                    variant="h5"
                    style={{
                      color: '#000',
                      fontFamily: fontName,
                      fontWeight: 'bold'
                    }}
                    gutterBottom>
                    {' '}
                    CHATREL BALANCE
                  </Typography>

                  <Card
                    style={{
                      padding: 20,
                      marginBottom: 20,
                      boxShadow: ' 3px 3px 1px grey'
                    }}>
                    <b>
                      <Grid
                        container
                        spacing={1}
                        className="text-black"
                        style={{ marginBottom: 10 }}>
                        <Grid item xs={1}>
                          YEAR
                        </Grid>
                        <Grid item xs={2}>
                          AUTHORITY REGION
                        </Grid>
                        <Grid item xs={1}>
                          CURRENCY
                        </Grid>
                        <Grid item xs={1}>
                          CHATREL
                        </Grid>
                        <Grid item xs={1}>
                          MEAL
                        </Grid>
                        <Grid item xs={2}>
                          LATE FEES
                        </Grid>
                        <Grid item xs={2}>
                          EMPLOYED
                        </Grid>
                        <Grid item xs={1}>
                          RATE ₹/$
                        </Grid>
                        <Grid item xs={1}>
                          TOTAL
                        </Grid>
                      </Grid>
                    </b>
                    {paymentData &&
                      paymentData.map((row, index) => (
                        <Grid
                          container
                          id="test"
                          spacing={1}
                          style={{
                            border: '1px solid lightgrey',
                            borderRadius: '10px',
                            marginBottom: '30px'
                          }}
                          className="text-black">
                          <Grid item xs={1} style={{ verticalAlign: 'middle' }}>
                            {row.nChatrelYear}
                          </Grid>
                          <Grid item xs={2}>
                            <Autocomplete
                              disabled={!outstanding}
                              id={`${index}`}
                              openOnFocus
                              clearOnEscape
                              disableClearable
                              autoComplete={true}
                              autoHighlight={true}
                              options={authRegions}
                              //value={authRegion}
                              defaultValue={authRegion}
                              getOptionLabel={(option) => option.sAuthRegion}
                              renderOption={(option) => (
                                <React.Fragment>
                                  <span id={`${index}`}>
                                    {option.sAuthRegion}
                                  </span>
                                </React.Fragment>
                              )}
                              onChange={(e, value) => {
                                if (value !== null) {
                                  updateAuthRegion(e, value);
                                } else {
                                  //setMadebStatusID(0);
                                }
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  //label="Authority Region"
                                  variant="standard"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password' // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={1}>
                            {row.sAuthRegionCurrency}{' '}
                            <Flag
                              country={
                                row.sAuthRegionCurrency === 'INR' ? 'IN' : 'US'
                              }
                              size={20}
                            />
                          </Grid>
                          {outstanding && (
                            <>
                              {' '}
                              <Grid item xs={1}>
                                <b style={{ fontSize: '18px' }}>
                                  ₹{row.nChatrelAmount}
                                </b>
                              </Grid>
                              <Grid item xs={1}>
                                <b style={{ fontSize: '18px' }}>
                                  ₹{row.nChatrelMeal}
                                </b>
                              </Grid>
                              <Grid item xs={2} style={{ color: 'red' }}>
                                {row.nChatrelLateFeesValue > 0 && (
                                  <>
                                    {' '}
                                    <div
                                      style={{ display: 'inline' }}
                                      className="badge badge-danger">
                                      {' '}
                                      Overdue
                                    </div>{' '}
                                    &nbsp;{' '}
                                    <b style={{ fontSize: '18px' }}>
                                      ₹{row.nChatrelLateFeesValue.toFixed(2)}
                                    </b>
                                  </>
                                )}
                                {row.nChatrelLateFeesValue == 0 && (
                                  <>
                                    {' '}
                                    <div
                                      style={{ display: 'inline' }}
                                      className="badge badge-warning">
                                      {' '}
                                      Pending
                                    </div>
                                  </>
                                )}
                              </Grid>{' '}
                            </>
                          )}
                          {!outstanding && (
                            <>
                              {' '}
                              <Grid item xs={1}><div className="badge badge-success"> Paid</div></Grid>
                              <Grid item xs={1}><div className="badge badge-success"> Paid</div></Grid>
                              <Grid item xs={2}>
                                
                              </Grid>{' '}
                            </>
                          )}
                          {row.sAuthRegionCurrency === 'USD' && (
                            <Grid item xs={2}>
                              {
                                <input
                                  id="employed"
                                  value={index}
                                  onChange={(e) => {
                                    modify(e.target);
                                  }}
                                  type="checkbox"
                                  disabled={row.isChild}
                                />
                              }
                            </Grid>
                          )}
                          {row.sAuthRegionCurrency === 'INR' && (
                            <Grid item xs={2}>
                              <input
                                id={index}
                                type="text"
                                style={{
                                  maxWidth: '50px',
                                  border: 'none',
                                  borderBottom: '1px solid'
                                }}
                                onChange={(e) => {
                                  modify(e.target);
                                }}
                              />
                            </Grid>
                          )}

                          <Grid item xs={1} style={{ color: 'grey' }}>
                            {dollarToRupees && row.sAuthRegionCurrency === 'INR'
                              ? dollarToRupees.toFixed(4)
                              : '-'}
                          </Grid>
                          <Grid
                            item
                            xs={1}
                            style={{ color: '#29cf00', fontSize: '20px' }}>
                            <b>${row.nChatrelTotalAmount.toFixed(2)}</b>
                          </Grid>
                        </Grid>
                      ))}
                    {/*   <Grid container id="test" spacing={3} style={{border:'1px solid lightgrey',borderRadius:'10px',marginBottom:"30px"}} className='text-black'>
          <Grid item xs={1} style={{verticalAlign:'middle'}}>2020</Grid>
          <Grid item xs={2} ><TextField value="Mundgod"></TextField></Grid>
          <Grid item xs={1} >INR <Flag country="IN" size={20} /></Grid>
          <Grid item xs={1} ><b style={{fontSize:"18px"}}>₹36</b></Grid>
          <Grid item xs={1} ><b style={{fontSize:"18px"}}>₹10</b></Grid>
          <Grid item xs={2} style={{color:'red'}} ><div style={{display:'inline'}} className="badge badge-danger"> Overdue</div> &nbsp; <b style={{fontSize:"18px"}}>₹4.6</b> </Grid>
          <Grid item xs={2} ><TextField ></TextField></Grid>
          <Grid item xs={1} style={{color:'grey'}}>0.0137</Grid>
          <Grid item xs={1} style={{color:'#29cf00',fontSize:"20px"}} ><b>$0.87</b></Grid>
        </Grid>

        <Grid container spacing={3} style={{border:'1px solid lightgrey',borderRadius:'10px',marginBottom:15}} className='text-black'>
          <Grid item xs={1} style={{verticalAlign:'middle'}}>2021</Grid>
          <Grid item xs={2} ><TextField value="Chicago"></TextField></Grid>
          <Grid item xs={1} >USD <Flag country="US" size={20} /></Grid>
          <Grid item xs={1} ><b style={{fontSize:"18px"}}> $36</b></Grid>
          <Grid item xs={1} ><b style={{fontSize:"18px"}}> $10</b></Grid>
          <Grid item xs={2} style={{color:'red'}} ><div style={{display:'inline'}} className="badge badge-warning"> Pending</div></Grid>
          <Grid item xs={2}  ><input type="checkbox" /></Grid>
          <Grid item xs={1} >-</Grid>
          <Grid item xs={1} style={{color:'#29cf00',fontSize:"20px"}} ><b>$46</b></Grid>
        </Grid>*/}
                  </Card>

                  <Typography
                    className="myfont"
                    variant="h5"
                    style={{
                      color: '#000',
                      fontFamily: fontName,
                      fontWeight: 'bold'
                    }}
                    gutterBottom>
                    {' '}
                    ADDITIONAL CHATREL
                  </Typography>

                  <Card
                    style={{
                      padding: 20,
                      marginBottom: 20,
                      boxShadow: ' 3px 3px 1px grey'
                    }}>
                    <Grid
                      container
                      spacing={3}
                      className="text-black"
                      justify="center">
                      <Grid item xs={12} sm={6} align="center">
                        
                        <div
                                className="badge badge-first px-3"
                                style={{ fontSize: '14px' }}>
                                Business Donation
                              </div>
                        <div>
                        <TextField
                          className="h-50"
                          value={bdonation}
                          variant="outlined"
                          onChange={(e) => {
                            if (e.target.value === '') {
                              calcTotal(paymentData, adonation, 0);
                              setBdonation(0);
                            } else {
                              calcTotal(
                                paymentData,
                                adonation,
                                parseInt(e.target.value)
                              );
                              setBdonation(parseInt(e.target.value));
                            }
                          }}
                          inputProps={{ min: 0 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            )
                          }}
                        /></div>
                      </Grid>
                      <Grid item xs={12} sm={6} align="center">
                        <div>
                          <b> Additional Donation </b>
                        </div>

                        <TextField
                          variant="outlined"
                          value={adonation}
                          onChange={(e) => {
                            if (e.target.value === '') {
                              calcTotal(paymentData, 0, bdonation);
                              setAdonation(0);
                            } else {
                              calcTotal(
                                paymentData,
                                parseInt(e.target.value),
                                bdonation
                              );
                              setAdonation(parseInt(e.target.value));
                            }
                          }}
                          inputProps={{ min: 0 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Card>
              
                   
                  
             
                  <Card className="card-box card-box-alt w-50 mx-auto" style={{marginTop:'75px',  boxShadow: ' 3px 3px 1px grey'}}>
                    <div className="card-content-overlay text-center pb-4">
                      <div className="d-50 rounded border-0 mb-1 card-icon-wrapper  btn-icon mx-auto text-center ">
                        <img alt="eChatrel" src={projectLogo} width="100px" />
                      </div>
                      <div className="font-weight-bold text-black display-2 mt-4 mb-1">
                      
                      <CountUp
                                    start={0}
                                    end={total.toFixed(2)}
                                    duration={1}
                                    //deplay={2}
                                    separator=""
                                    decimals={2}
                                    decimal="."
                                    prefix="$ "
                                    suffix=""
                                />
                      </div>
                      <div className="font-size-xl text-dark opacity-8">
                        Grand Total
                      </div>
                   
                      
                      {total.toFixed(2) != 0.0 && (
                    <div
                      style={{ textAlign: 'center' }}
                      className="w-75 mx-auto">
                      <br />
                      <PayPalButton
                        amount={total.toFixed(2)}
                        style={{ label: 'pay' }}
                        options={{
                          clientId:
                            'AeIfCd7BHacsWwdqkIYfxmPQrN8UZU2Sap_dor00t7Z8Y9pLLJiwK_v2-lNy8vIhaSU9AFAiC5l8l7Gx',
                          currency: 'USD'
                        }}
                        shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                        onSuccess={(details, data) => {
                          //  alert("Transaction completed by " + details.payer.name.given_name);
                          console.log('Details:', details);
                          console.log('Data', data);
                          submit(details);
                        }}
                        onError={(err) => {
                          console.log(err);
                          setAlertMessage('Chatrel donation failed.');
                          setAlertType('error');
                          snackbarOpen();
                        }}
                        // onError={(details, data)=>{console.log(details);}}
                      />
                    </div>
                  )}
                      
                    </div>
                  </Card>
                 
                </>
              )}
              
            </div>
          </div>
          {successDiv  && (
                <div id="successDiv">
                
                  <Card className="bg-neutral-first d-block card-border-top border-first text-center p-4 p-xl-5 w-50 mx-auto">
                                    <h4 className="px-3 px-xl-5 display-4 line-height-2 font-weight-bold mb-0">Thank You for your contribution!!</h4>
                                    <p className="px-3 px-xl-5 opacity-6 font-size-lg my-4">
                                      Sample textSample textSample textSample textSample textSample textSample textSample textSample text 
                                    </p>
                                    <Button  onClick={() => {
                        handleClickOpen();
                      }} className="btn-first px-4 text-uppercase font-size-sm hover-scale-lg font-weight-bold">
                                        View Receipt
                                    </Button>
                                </Card>
                </div>
              )}
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            // aria-labelledby="alert-dialog-slide-title"
            //aria-describedby="alert-dialog-slide-description"
          >
            {/*<DialogTitle id="alert-dialog-slide-title">{}</DialogTitle>*/}
            <DialogContent>
              <DialogContentText>
                {receiptData && (
                  <table
                    /*ref={ref}*/ id="mytable"
                    className="mytable"
                    cellspacing="0"
                    style={{
                      border: '3px solid #000000',
                      background: `linear-gradient(rgba(255,255,255,.7), rgba(255,255,255,.7)),url(${CTALogo})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'
                    }}>
                    <tr>
                      <td width="20"></td>
                      <td width="200"></td>
                      <td width="175"></td>
                      <td width="175"></td>

                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20"></td>
                      <td colSpan="2" height="35" align="left" valign="middle">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={5}
                            color="#000000">
                            ༄༅། །བཙན་བྱོལ་བོད་མིའི་དཔྱ་དངུལ་བྱུང་འཛིན་ཨང་།
                          </font>
                        </b>
                      </td>

                      <td align="right">
                        <img
                          width="75px"
                          height="75px"
                          src={'data:image/png;base64,' + receiptData.qrcode}
                        />
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20"></td>
                      <td colspan="2" height="28" align="left" valign="middle">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            མིང་།
                          </font>
                          <font size={4} color="#000000">
                            {' '}
                            {receiptData.receipt.sFirstName}
                          </font>
                        </b>
                      </td>
                      <td align="right" valign="middle">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            རང་ལོ། {receiptData.receipt.nAge}
                          </font>
                        </b>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td
                        colspan="5"
                        /* style={{borderRight:"3px solid #000000"}}*/ height="27"
                        align="left"
                        valign="top">
                        <table>
                          <tr>
                            <td
                              style={{
                                width: '200px',
                                paddingLeft: '20px',
                                borderTop: '3px solid #000000'
                              }}>
                              <b>
                                <font
                                  face="Microsoft Himalaya"
                                  size={4}
                                  color="#000000">
                                  {' '}
                                  དཔྱ་དེབ་ཨང་།
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{ border: '3px solid #000000' }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  X
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{
                                borderTop: '3px solid #000000',
                                borderBottom: '3px solid #000000',
                                borderRight: '3px solid #000000'
                              }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  X
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{
                                borderTop: '3px solid #000000',
                                borderBottom: '3px solid #000000',
                                borderRight: '3px solid #000000'
                              }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  {receiptData.receipt.sGBID.charAt(0)}
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{
                                borderTop: '3px solid #000000',
                                borderBottom: '3px solid #000000',
                                borderRight: '3px solid #000000'
                              }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  {receiptData.receipt.sGBID.charAt(1)}
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{
                                borderTop: '3px solid #000000',
                                borderBottom: '3px solid #000000',
                                borderRight: '3px solid #000000'
                              }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  {receiptData.receipt.sGBID.charAt(2)}
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{
                                borderTop: '3px solid #000000',
                                borderBottom: '3px solid #000000',
                                borderRight: '3px solid #000000'
                              }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  {receiptData.receipt.sGBID.charAt(3)}
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{
                                borderTop: '3px solid #000000',
                                borderBottom: '3px solid #000000',
                                borderRight: '3px solid #000000'
                              }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  {receiptData.receipt.sGBID.charAt(4)}
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{
                                borderTop: '3px solid #000000',
                                borderBottom: '3px solid #000000',
                                borderRight: '3px solid #000000'
                              }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  {receiptData.receipt.sGBID.charAt(5)}
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{
                                borderTop: '3px solid #000000',
                                borderBottom: '3px solid #000000',
                                borderRight: '3px solid #000000'
                              }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  {receiptData.receipt.sGBID.charAt(6)}
                                </font>
                              </b>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td width="20"></td>
                      <td colSpan="3" height="7" align="left" valign="top">
                        <font
                          face="Microsoft Himalaya"
                          size={4}
                          color="#000000"></font>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td
                        width="20"
                        height="26"
                        style={{ borderBottom: '1px solid #000000' }}></td>
                      <td
                        colspan="2"
                        style={{ borderBottom: '1px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            ༡། དཔྱ་དངུལ།
                          </font>
                        </b>
                      </td>
                      <td
                        style={{ borderBottom: '2px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            སྒོར།{' '}
                            {receiptData.receipt.nChatrelAmount.toFixed(2)}
                          </font>
                        </b>
                      </td>
                      <td
                        width="20"
                        style={{ borderBottom: '2px solid #000000' }}></td>
                    </tr>
                    <tr>
                      <td
                        width="20"
                        style={{ borderBottom: '1px solid #000000' }}
                        height="26"></td>
                      <td
                        colspan="2"
                        style={{ borderBottom: '1px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            ༢། ཟས་བཅད་དོད།
                          </font>
                        </b>
                      </td>
                      <td
                        style={{ borderBottom: '2px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            སྒོར། {receiptData.receipt.nChatrelMeal.toFixed(2)}
                          </font>
                        </b>
                      </td>
                      <td
                        width="20"
                        style={{ borderBottom: '2px solid #000000' }}></td>
                    </tr>
                    <tr>
                      <td
                        width="20"
                        style={{ borderBottom: '1px solid #000000' }}
                        height="26"></td>
                      <td
                        colspan="2"
                        style={{ borderBottom: '1px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            ༣། ཕོགས་འབབ།
                          </font>
                        </b>
                      </td>
                      <td
                        style={{ borderBottom: '2px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            སྒོར།{' '}
                            {receiptData.receipt.nCurrentChatrelSalaryAmt.toFixed(
                              2
                            )}
                          </font>
                        </b>
                      </td>
                      <td
                        width="20"
                        style={{ borderBottom: '2px solid #000000' }}></td>
                    </tr>
                    <tr>
                      <td
                        width="20"
                        style={{ borderBottom: '1px solid #000000' }}
                        height="26"></td>
                      <td
                        colspan="2"
                        style={{ borderBottom: '1px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            ༤། ཚོང་ཁེའི་བློས་བཅད་ཞལ་འདེབས།
                          </font>
                        </b>
                      </td>
                      <td
                        style={{ borderBottom: '2px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            སྒོར།{' '}
                            {receiptData.receipt.nChatrelBusinessDonationAmt
                              ? receiptData.receipt.nChatrelBusinessDonationAmt.toFixed(
                                  2
                                )
                              : 0}
                          </font>
                        </b>
                      </td>
                      <td
                        width="20"
                        style={{ borderBottom: '2px solid #000000' }}></td>
                    </tr>
                    <tr>
                      <td
                        width="20"
                        style={{ borderBottom: '1px solid #000000' }}
                        height="26"></td>
                      <td
                        colspan="2"
                        style={{ borderBottom: '1px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            ༥། དཔྱ་དངུལ་འབུལ་ཆད་འབབ།
                          </font>
                        </b>
                      </td>
                      <td
                        style={{ borderBottom: '2px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            སྒོར།{' '}
                            {(
                              receiptData.receipt.nArrears +
                              receiptData.receipt.nLateFees
                            ).toFixed(2)}{' '}
                            ({receiptData.receipt.dtArrearsFrom.split('-')[0]}-
                            {receiptData.receipt.dtArrearsTo.split('-')[0]})
                          </font>
                        </b>
                      </td>
                      <td
                        width="20"
                        style={{ borderBottom: '2px solid #000000' }}></td>
                    </tr>
                    <tr>
                      <td
                        width="20"
                        style={{ borderBottom: '1px solid #000000' }}
                        height="26"></td>
                      <td
                        colspan="2"
                        style={{ borderBottom: '1px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            ༦། འཕར་འབུལ་ཞལ་འདེབས།
                          </font>
                        </b>
                      </td>
                      <td
                        style={{ borderBottom: '2px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            སྒོར།{' '}
                            {receiptData.receipt.nChatrelAddtionalDonationAmt
                              ? receiptData.receipt.nChatrelAddtionalDonationAmt.toFixed(
                                  2
                                )
                              : 0}
                          </font>
                        </b>
                      </td>
                      <td
                        width="20"
                        style={{ borderBottom: '2px solid #000000' }}></td>
                    </tr>
                    <tr>
                      <td width="20"></td>
                      <td colSpan="3" height="10" align="left" valign="top">
                        <font
                          face="Microsoft Himalaya"
                          size={4}
                          color="#000000"></font>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20" height="34"></td>
                      <td colspan="2" align="left" valign="bottom">
                        <font
                          face="Microsoft Himalaya"
                          size={4}
                          color="#000000">
                          <b>བཅས་བསྡོམས་</b>{' '}
                          US$/CA$/AU$/NT$/CHF/EURO/GBP/YEN/RR/
                        </font>
                      </td>
                      <td
                        align="left"
                        style={{ paddingLeft: '30px' }}
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            སྒོར{' '}
                          </font>
                          <font size={4} color="#000000">
                            {(
                              receiptData.receipt.nChatrelAmount +
                              receiptData.receipt.nChatrelMeal +
                              receiptData.receipt.nCurrentChatrelSalaryAmt +
                              receiptData.receipt.nArrears +
                              receiptData.receipt.nLateFees +
                              receiptData.receipt.nChatrelAddtionalDonationAmt +
                              receiptData.receipt.nChatrelBusinessDonationAmt
                            ).toFixed(2)}
                          </font>{' '}
                        </b>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20" height="31"></td>
                      <td colspan="3" align="left" valign="middle">
                        <font
                          face="Microsoft Himalaya"
                          size={4}
                          color="#000000">
                          <b>
                            ཕྱི་ལོ་༌་་་་་་་་་་་་་་༌༌༌༌༌་་་་་་་་་་་་༌༌༌༌༌༌༌༌༌༌༌ལོའི་དཔྱ་དངུལ་འབུལ་འབབ་རྩིས་འབུལ་བྱུང་བའི་འཛིན་དུ།{' '}
                          </b>
                        </font>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20"></td>
                      <td colSpan="3" height="32" align="left" valign="top">
                        <font
                          face="Microsoft Himalaya"
                          size={4}
                          color="#000000"></font>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20" height="33"></td>
                      <td colspan="3" align="left" valign="middle">
                        <font
                          face="Microsoft Himalaya"
                          size={4}
                          color="#000000">
                          <b>
                            བོད་རིགས་སྤྱི་མཐུན་ཚོགས་པའམ་བོད་རིགས་ཚོགས་པའི་ལས་དམ་དང་མཚན་རྟགས།
                            &nbsp;&nbsp;&nbsp; ཕྱི་ལོ༌
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ཟླ་
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ཚེས་
                            &nbsp;&nbsp;&nbsp; ལ།
                          </b>
                        </font>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20"></td>
                      <td colSpan="3" height="16" align="left" valign="top">
                        <font size={2} color="#000000">
                          This is computer generated Chatrel receipt, no
                          signature required.
                        </font>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20"></td>
                      <td colSpan="3" height="16" align="left" valign="top">
                        <font size={2} color="#000000">
                          You are advised to update chatrel contribution on your
                          Greenbook from Office of Tibet or
                        </font>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20"></td>
                      <td colSpan="3" height="16" align="left" valign="top">
                        <font size={2} color="#000000">
                          concerned Tibetan Association/Tibetan Community.
                        </font>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20"></td>
                      <td colSpan="3" height="16" align="left" valign="top">
                        <font
                          face="Microsoft Himalaya"
                          size={4}
                          color="#000000"></font>
                      </td>
                      <td width="20"></td>
                    </tr>
                  </table>
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={printPDF}
                variant="contained"
                style={{ paddingTop: '5px', paddingBottom: '5px' }}
                color="primary">
                Print
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                style={{ paddingTop: '5px', paddingBottom: '5px' }}
                color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {snackbar && (
            <Alerts
              alertObj={alertObj}
              snackbar={snackbar}
              snackbarClose={snackbarClose}
            />
          )}
          <Backdrop className={classes.backdrop} open={backdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
    </>
  );
}
