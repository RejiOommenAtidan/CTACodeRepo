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
  InputAdornment,
  Switch
 
} from '@material-ui/core';

import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Alerts } from '../alerts';
import { PayPalButton } from 'react-paypal-button-v2';
import Moment from 'moment';



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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TramOutlined } from '@material-ui/icons';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import projectLogo from '../../assets/images/CTALogo.png';
import { useMediaQuery } from 'react-responsive'

//import {sPayPal_ClientID} from '../../config/commonConfig';


import { useDispatch } from 'react-redux';
import {storeSession} from '../../actions/transactions/SessionAction';

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

export default function Chatrel(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  //const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const responsive = useMediaQuery({query: '(max-width: 1100px)'})
  const fontName = 'Poppins';

  console.log('Props contains:', props);
  // Who is paying
  const paidByGBID = useSelector(
    (state) => state.GBDetailsReducer.oGBDetails.sGBID
  );
  const sCountryID = useSelector(
    (state) => state.GBDetailsReducer.oGBDetails.sCountryID
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

  const [backdrop, setBackdrop] = React.useState(true);

  const [displayFileDispute, setDisplayFileDispute] = React.useState(false);

  //console.log(paidByGBID);
  //const userObj = useSelector(state => state.GLoginReducer.oGoogle);

  const [paymentDiv, setPaymentDiv] = React.useState(true);
  const [successDiv, setSuccessDiv] = React.useState(false);
  const [receiptData, setReceiptData] = React.useState();
  const [popup, setPopup] = React.useState(false);
  const [popupOnce, setPopupOnce] = React.useState(false);

  const [dataAPI, setDataAPI] = React.useState();
  const [summaryData, setSummaryData] = React.useState();
  const [paymentData, setPaymentData] = React.useState();
  const [donationData, setDonationData] = React.useState();
  const [showPaypalDetails, setShowPaypalDetails] = React.useState(false);
  const [paypalID, setPaypalID] = React.useState("");
  
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
  const [paypalId, setPaypalId] = React.useState("");
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
    console.log("test Auth2",value);
  
    const index = parseInt(e.target.id);
    let chatrelObj = [...paymentData];
    let tempAuthArray =[...authRegion];
    if(value.sCurrencyCode === 'INR'){
      console.log('test Auth2',true);
    }
    for (var forIndex = index; forIndex < chatrelObj.length; forIndex++) {
       
   tempAuthArray[forIndex]=value;
      console.log(forIndex);
    chatrelObj[forIndex].nAuthRegionID = value.id;
    chatrelObj[forIndex].sCountryID = value.sCountryID;
    chatrelObj[forIndex].sAuthRegionCurrency = value.sCurrencyCode;
    chatrelObj[forIndex].nChatrelAmount =
      value.sCurrencyCode === 'INR'
        ? chatrelObj[forIndex].nChatrelINR
        : chatrelObj[forIndex].nChatrelUSD;
    chatrelObj[forIndex].nChatrelMeal =
      value.sCurrencyCode === 'INR'
        ? chatrelObj[forIndex].nChatrelMealINR
        : chatrelObj[forIndex].nChatrelMealUSD;
   // 
      if(value.sCurrencyCode === 'INR'){
        chatrelObj[forIndex].nCurrentChatrelSalaryAmt = 0;
        
      }
      else{
        chatrelObj[forIndex].nCurrentChatrelSalaryAmt = chatrelObj[forIndex].isChild?0:chatrelObj[forIndex].nSalaryUSD;
      }
    setPaymentData(chatrelObj);
    calculate(forIndex);
    }
    setAuthRegion(tempAuthArray);
    if(!popupOnce && value.sCurrencyCode==='INR' && !value.isChild){
        setPopup(true);
        setPopupOnce(true); 
    }
   
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
        calculate(index);
    } else {
      console.log(target.value);
      index = parseInt(target.value);
      if (payObj[index].nCurrentChatrelSalaryAmt === 0) {
        console.log( payObj[index]);
       
    
    
        if(dataAPI.message==="No Outstandings"){
          payObj[index].nCurrentChatrelSalaryAmt = dataAPI.nSalaryUSD;   

        }
        else{
          for (var forIndex = index; forIndex < payObj.length; forIndex++) {
         
            if(payObj[forIndex].sAuthRegionCurrency==='USD' && !payObj[forIndex].isChild){
              payObj[forIndex].nCurrentChatrelSalaryAmt = payObj[forIndex].nSalaryUSD;
              calculate(forIndex);
            }
           
          }
       
        }
     
      } else {
        for (var forIndex = index; forIndex < payObj.length; forIndex++) {
          // console.log('test loop',payObj[forIndex].dtCurrentChatrelFrom);
           if(payObj[forIndex].sAuthRegionCurrency==='USD' ){
             
             payObj[forIndex].nCurrentChatrelSalaryAmt = 0;
             calculate(forIndex);
           }
          
         }
        
      }
    }
    setPaymentData(payObj);
    calculate(index);
  };

  const calculate = (index) => {
    let payObj = [...paymentData];
    console.log(payObj);
    let len = paymentData.length;

    if (index < len - 2) {
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
    } 
    else if (index === len - 2) {
      if(payObj[index].nChatrelLateFeesValue!=0){
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
      }
    } 
    else {
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
      temptotal += parseFloat(row.nChatrelTotalAmount.toFixed(2));
      console.log(row.nChatrelTotalAmount);
    });
    setTotal(temptotal);
  };
let textFieldDisabled=false;
  const runOnce = () => {
    if (paymentData && dollarToRupees && shouldRun) {

    
      if (!outstanding) {
        if (paymentData[0].nCurrentChatrelSalaryAmt > 0) {
          console.log('we have no outstanding');
          const checkBox = document.getElementById('employed');
          const inputText = document.getElementById('0');
        //  const rateField = document.getElementById('rate');
          const totalField = document.getElementById('total');
          if (paymentData[0].sAuthRegionCurrency==='USD') {
          //  rateField.innerText = '';
            checkBox.checked = true;
            checkBox.disabled = true;
          

            //totalField.innerText = '';
            setTotal(0.0);
            setGBChatrelsNull(true);
          }
          else{
            textFieldDisabled=true;
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

  
  const [checked, setChecked] = useState(true);
  const [basicResponse, setBasicResponse] = useState();

  const toggle = () => {
      setChecked(!checked)
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
     // sOrderId:paypalObj.id
    };

    console.log('Final Obj:', finalObj);
    axios
      .post(`/ChatrelPayment/AddNewChatrelPayment`, finalObj)
      .then((resp) => {
        if (resp.status === 200) {
          //alert(resp.data);
          console.log(resp.data);
         
          const oSession={
            sJwtToken:resp.data.token,
            bSession:true
          }
          dispatch(storeSession(oSession));
          //setBackdrop(false);
          setShowPaypalDetails(false);
          setAlertMessage('Chatrel recorded successfully.');
          setAlertType('success');
          snackbarOpen();
          setReceiptData(resp.data.message);
          
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
        if(error.response.status!==401){
          setBackdrop(false);
          setShowPaypalDetails(false);
          setAlertMessage('Something went wrong, please try again later');
          setAlertType('error');
          snackbarOpen();
        }
      });
  };
  const pingPong =() =>{
    axios.get(`/ChatrelPayment/Ping`)
    .then(resp => {
      if (resp.status === 200) {
        console.log(resp.data);
        const oSession={
          sJwtToken:resp.data.token,
          bSession:true
        }
        dispatch(storeSession(oSession));
      }
    })
    .catch(error => {
      console.log("Error ", error.response);
      if(error.response.status!==401){
        setBackdrop(false);
        setAlertMessage('Something went wrong, please try again later');
        setAlertType('error');
        snackbarOpen();
      }
      if (error.response) {
        console.error(error.response);
      
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
  const getReceipt = (sChatrelReceiptNumber) => {
    setBackdrop(true);
    console.log("Receipt Number", sChatrelReceiptNumber);
    axios.get(`/ChatrelPayment/GetReceipt/?sReceiptNumber=`+sChatrelReceiptNumber)
    .then(resp => {
      console.log("Response", resp);
      
      if (resp.status === 200) {
        const oSession={
          sJwtToken:resp.data.token,
          bSession:true
        }
        dispatch(storeSession(oSession));
        setBackdrop(false);
 
        const url = `data:application/pdf;base64,${resp.data.receipt}`;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ChatrelReceipt-"+sChatrelReceiptNumber+".pdf");
        document.body.appendChild(link);
        link.click();
  
      }
    })
    .catch(error => {
      console.log("Error ", error.response);
      if(error.response.status!==401){
        setBackdrop(false);
        setAlertMessage('Something went wrong, please try again later');
        setAlertType('error');
        snackbarOpen();
      }
      if (error.response) {
        console.error(error.response);
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
  useEffect(() => {
    console.log("Props Console:",props.location.state);
    setBackdrop(true);
   // alert('page hit');
    axios
      .get(`/AuthRegion/GetAuthRegions`)
      .then((resp) => {
        if (resp.status === 200) {
          
          console.log('AuthRegions fetched:', resp.data);
          setAuthRegions(resp.data);
    
          axios.get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=` + sGBID)
            .then((resp) => {
              if (resp.status === 200) {



                const oSession={
                  sJwtToken:resp.data.token,
                  bSession:true
                }
                dispatch(storeSession(oSession));
                console.log("test resp",resp.data);
                if(resp.data.message==="Paid Until Missing"){
                  console.log("Inside File Dispute Condition");
                  setDisplayFileDispute(true);
                }
                else{
                  console.log(resp.data);
                  setPaypalID(resp.data.clientId);
                  if (resp.data.chatrel.chatrelPayment.nChatrelTotalAmount === 0) {
                    setOutstanding(false);
                    setBasicResponse(resp.data.chatrel.gbChatrels[0].nCurrentChatrelSalaryAmt);
                 
                  }
                  else{
                    if(resp.data.chatrel.gbChatrels[0].sAuthRegionCurrency!=='INR'){
                    for (var forIndex = 0; forIndex < resp.data.chatrel.gbChatrels.length; forIndex++) {
                     
                      if( !resp.data.chatrel.gbChatrels[forIndex].isChild ){
                        resp.data.chatrel.gbChatrels[forIndex].nCurrentChatrelSalaryAmt = resp.data.chatrel.gbChatrels[forIndex].nSalaryUSD;
                       
                      }
                      
                    }}
                  }
                  setSummaryData(resp.data.chatrel.chatrelPayment);
                 // let payObj = [...resp.data.chatrel.gbChatrels];
                
  
              //  setPaymentData(payObj);
                setDataAPI(resp.data.chatrel);
                  setPaymentData(resp.data.chatrel.gbChatrels);
                  setDonationData(resp.data.chatrel.gbChatrelDonation);
                  calcTotal(
                    //resp.data.chatrel.gbChatrels,
                    resp.data.chatrel.gbChatrels,
                    adonation,
                    bdonation
                  );
      
                  fetch('https://api.ratesapi.io/api/latest?base=INR&symbols=USD')
                    .then((response) => response.json())
                    .then((data) => {
                      console.log('currency', data.rates.USD);
                      setDollarToRupees(data.rates.USD);
                      setBackdrop(false);
                    });
                  console.log('Got data from props');
      
                  }
              }
            })
            .catch((error) => {
              if(error.response.status!==401){
                setBackdrop(false);
                setAlertMessage('Something went wrong, please try again later');
                setAlertType('error');
                snackbarOpen();
              }
              console.log(error.message);
              console.log(error.config);
              //console.log(error.response.data);
            });
        }
      })
      .catch((error) => {
        if(error.response.status!==401){
          setAlertMessage('Something went wrong, please try again later');
          setAlertType('error');
          snackbarOpen();
        }
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

const runOnceAuthRegion=()=>{
  var temp=authRegions.find((x) => x.id === dataAPI.nAuthRegionID);
  // setAuthRegion(authRegions.find((x) => x.id === dataAPI.nAuthRegionID));

  let chatrelObj = [dataAPI.gbChatrels];
  let tempAuthArray=[];
 // console.log('length',dataAPI.gbChatrels.length);
   for (var forIndex = 0; forIndex < dataAPI.gbChatrels.length; forIndex++) {
    
   tempAuthArray.push(temp);
   }
   setAuthRegion(tempAuthArray);
   console.log('test Auth',tempAuthArray[0]);
   console.log('test Chatrel',chatrelObj[0][0].nCurrentChatrelSalaryAmt===0 && tempAuthArray[0].sCurrencyCode==='INR' );
   if(tempAuthArray[0].sCurrencyCode==='INR' && chatrelObj[0][0].nCurrentChatrelSalaryAmt===0)
   {
    setPopup(true);

    //setPopupOnce(true);
   }
   

}

   useEffect(() => {
    authRegions && dataAPI &&
    runOnceAuthRegion();
   
  }, [authRegions, dataAPI]);
 
  return (
    <>
       { displayFileDispute && (
                <div id="fileDisputeDiv" style={{margin:'30px'}}>
                
                  <Card className="bg-neutral-first d-block card-border-top border-first text-center p-4 p-xl-5 w-50 mx-auto">
                                    <h4 className="px-3 px-xl-5 display-4 line-height-2 font-weight-bold mb-2">There is no chatrel contribution record in the database. You are requested to upload your two year chatrel receipt</h4>
                                  
                                    
 


                                    <Button  onClick={() => {
                        history.push("/FileDispute");
                      }} className="btn-first px-4 text-uppercase font-size-sm hover-scale-lg font-weight-bold mt-2">
                                        File a Dispute
                                    </Button>
                                </Card>
                </div>
              )}
      {dataAPI && (
        <>
         {paymentDiv && < >
            
            <Grid container spacing={1} style={{marginTop:'30px'}}>
     <Grid item xs={12} sm={1} ></Grid>
     <Grid item xs={12} sm={10}>
     <Card className="card-box card-box-alt  mx-auto my-4 shadow-lg " style={{borderBottom: "10px solid #4191ff"}} >
     <div className="card-content-overlay text-left">
     <div className="px-4">
                                       <div className="d-50 rounded-lg border-0 mb-1 card-icon-wrapper bg-first text-white btn-icon text-center shadow-first">
                                           <FontAwesomeIcon icon={['fas', 'wallet']} className="display-4" />
                                       </div>
                                    
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
                  <Grid container spacing={2} justify="center"  style={{
                                
                                color: '#000'
                              }}>
            <Grid item xs={12} sm={6} align="left">
            <b>NAME: </b>{dataAPI.sName}
            </Grid>
            <Grid item xs={12} sm={6} align="left">
            <b>PAID UNTIL: </b>{ Moment(dataAPI.nPaidUntil).format('DD-MM-YYYY')}
            </Grid>
            <Grid item xs={12} align="left">
            <b>GREEN BOOK ID: </b>{dataAPI.sCountryID + dataAPI.chatrelPayment.sGBId}
            </Grid>
          </Grid>
                 
                  <br/>
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

               
                 <div style={{  padding: 20,marginBottom:20,fontFamily:'Roboto'}}>
  {!responsive && (                     
      <Table style={{color:'#000'}}>
      <Thead>
        <Tr >
          <Th style={{textAlign:'center'}}>YEAR</Th>
          <Th style={{textAlign:'center'}}>AUTHORITY REGION</Th>
          <Th style={{textAlign:'center'}}>CURRENCY</Th>
          <Th style={{textAlign:'center'}}>CHATREL</Th>
          <Th style={{textAlign:'center'}}>MEAL</Th>
          <Th style={{textAlign:'center'}}>STATUS</Th>                
          
          <Th style={{textAlign:'center'}}>EMPLOYED</Th>
          <Th style={{textAlign:'center'}}>LATE FEES</Th>
          <Th style={{textAlign:'center'}}>RATE ₹/$</Th>
          <Th style={{textAlign:'center'}}>TOTAL</Th>
         
        </Tr>
      </Thead>
      <Tbody  >
      {paymentData &&
                      paymentData.map((row, index) => (
        <Tr style={{borderTop:'1px solid grey',borderRadius:'5px',marginBottom:'5px',paddingBottom:'5px',height:'70px'}}>
         <Td align="center" style={{marginBottom:'15px'}}>{row.nChatrelYear}</Td>
<Td align="center">
    <Autocomplete
      disabled={!outstanding}
      id={`${index}`}
      //openOnFocus
      clearOnEscape
      disableClearable
      autoComplete={true}
      autoHighlight={true}
      options={authRegions}
      value={authRegion[index]}
      //defaultValue={authRegion}
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
</Td>
<Td align="center">{row.sAuthRegionCurrency}{' '}<Flag country={row.sAuthRegionCurrency === 'INR' ? 'IN' : 'US'} size={20}/></Td>
{outstanding && (
 
 
      <Td align="center" style={{ fontSize: '18px' }}>
       
        {row.sAuthRegionCurrency  === 'INR' ? '₹': '$' }{row.nChatrelAmount}
        
 
      </Td>)}

      {outstanding && (
 
      <Td align="center" style={{ fontSize: '18px' }}>
      
        {row.sAuthRegionCurrency  === 'INR' ? '₹': '$' }{row.nChatrelMeal}
      
      </Td>)}
      {outstanding && (
    <>
      {row.nChatrelLateFeesValue > 0 && (
          <>
        <Td align="center"> <div
              style={{ display: 'inline' }}
              className="badge badge-danger">
              {' '}
              Overdue
            </div></Td>
            {row.sAuthRegionCurrency === 'USD' && (
            <Td  align="center">
              
            
             { !row.isChild && <div className="m-2">
                            <Switch id="employed" checked={row.nCurrentChatrelSalaryAmt>0} onChange={(e) => {
                              console.log('test',e);
                              modify(e.target);}} disabled={row.isChild}  value={index}  className="switch-small toggle-switch-first"/>
                        </div>}
                        { row.isChild && <div className="m-2">
                            <Switch id="employed" checked={row.nCurrentChatrelSalaryAmt>0} onChange={(e) => {
                              console.log('test',e);
                              modify(e.target);}} style={{pointerEvents:'none'}}  value={index}  className="switch-small toggle-switch-first"/>
                        </div>}
            </Td>
            )}
            {row.sAuthRegionCurrency === 'INR' && (
            <Td align="center">
              <input
                id={index}
                type="text"
                disabled={row.isChild}
                style={{
                  maxWidth: '100px',
                  border: 'none',
                  borderBottom: '1px solid',
                  
                }}
                onChange={(e) => {
                  modify(e.target);
                }}
              />
            </Td>
            )}
            <Td align="center"  style={{ color: 'red' , fontSize: '18px'}}>
            
            {row.sAuthRegionCurrency  === 'INR' ? '₹': '$' }{row.nChatrelLateFeesValue.toFixed(2)}
          
       </Td>  
          </>)}
       
        {row.nChatrelLateFeesValue == 0 && (
          <>
          <Td align="center">
            <div
              style={{ display: 'inline' }}
              className="badge badge-warning">
              Pending
            </div>
            </Td>
            {row.sAuthRegionCurrency === 'USD' && (
            <Td  align="center">
              {
             
                 <Switch id="employed" checked={row.nCurrentChatrelSalaryAmt>0} onChange={(e) => {
                   console.log('test',e);modify(e.target);
                  }} disabled={row.isChild} value={index} className="switch-small toggle-switch-first"/>
              }
              
            </Td>
            )}
            {row.sAuthRegionCurrency === 'INR' && (
            <Td align="center">
              <input
                id={index}
                type="text"
                style={{
                  maxWidth: '100px',
                  border: 'none',
                  borderBottom: '1px solid',
                  
                }}
                onChange={(e) => {
                  modify(e.target);
                }}
              />
            </Td>
            )}
            <Td></Td>
              
          </>
        )}
        </> )}
     
    {!outstanding && (
        <>
          
          <Td >
            
          </Td>
          <Td >
            
          </Td>
         
          <Td align="center"><div className="badge badge-success"> Paid</div></Td>
          {row.sAuthRegionCurrency === 'USD' && (
            <Td  align="center">
              {
            
                <Switch id="employed" onChange={(e) => {modify(e.target);}} 
               
                checked={row.nCurrentChatrelSalaryAmt>0?true:false} 
                
                disabled={basicResponse>0?true:false || row.isChild} 
                //disabled={row.nCurrentChatrelSalaryAmt>0?true:false || row.isChild} 
                 value={index} className="switch-small toggle-switch-first"/>
                
          }
            </Td>
            )}
            {row.sAuthRegionCurrency === 'INR' && (
            <Td align="center">
              <input
                id={index}
                type="text"
              disabled={basicResponse>0?true:false || row.isChild}
                // disabled={row.nCurrentChatrelSalaryAmt>0?true:false || row.isChild}
               // disabled={textFieldDisabled}
                style={{
                  maxWidth: '100px',
                  border: 'none',
                  borderBottom: '1px solid',
                  
                }}
                onChange={(e) => {
                  modify(e.target);
                }}
              />
            </Td>
            )}
          <Td >
            
          </Td>
        </>
        )}

        
            <Td align="center" style={{ color: 'grey' }}>
            {dollarToRupees && row.sAuthRegionCurrency === 'INR'
              ? dollarToRupees.toFixed(4)
              : '-'}
            </Td>
            <Td
          align="center"
            style={{  fontSize: '20px' }}>
            <b>${row.nChatrelTotalAmount.toFixed(2)}</b>
            </Td>        


          
        </Tr>))}
    
       
      </Tbody>
    </Table>)}


    {responsive && (                     
      <Table style={{color:'#000'}}>
      <Thead>
        <Tr >
          <Th style={{textAlign:'center'}}>YEAR</Th>
          <Th style={{textAlign:'center'}}>REGION</Th>
          <Th style={{textAlign:'center'}}>CURRENCY</Th>
          <Th style={{textAlign:'center'}}>CHATREL</Th>
          <Th style={{textAlign:'center'}}>MEAL</Th>
          <Th style={{textAlign:'center'}}>STATUS</Th>                
          
          <Th style={{textAlign:'center'}}>EMPLOYED</Th>
          <Th style={{textAlign:'center'}}>LATE FEES</Th>
          <Th style={{textAlign:'center'}}>RATE ₹/$</Th>
          <Th style={{textAlign:'center'}}>TOTAL</Th>
         
        </Tr>
      </Thead>
      <Tbody  >
      {paymentData &&
                      paymentData.map((row, index) => (
        <Tr style={{borderTop:'1px solid grey',borderRadius:'5px',marginBottom:'5px',paddingBottom:'5px'}}>
         <Td align="center" style={{marginBottom:'15px'}}>{row.nChatrelYear}</Td>
<Td align="center" >
    <Autocomplete
      disabled={!outstanding}
      id={`${index}`}
     // openOnFocus
      clearOnEscape
      disableClearable
      autoComplete={true}
      autoHighlight={true}
      options={authRegions}
      //value={authRegion}
      value={authRegion[index]}
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
</Td>
<Td align="center">{row.sAuthRegionCurrency}{' '}<Flag country={row.sAuthRegionCurrency === 'INR' ? 'IN' : 'US'} size={20}/></Td>
{outstanding && (
 
 
      <Td align="center" style={{ fontSize: '18px' }}>
        
        {row.sAuthRegionCurrency  === 'INR' ? '₹': '$' }{row.nChatrelAmount}
        
 
      </Td>)}

      {outstanding && (
 
      <Td align="center" style={{ fontSize: '18px' }}>
       
        {row.sAuthRegionCurrency  === 'INR' ? '₹': '$' }{row.nChatrelMeal}
       
      </Td>)}
      {outstanding && (
    <>
      {row.nChatrelLateFeesValue > 0 && (
          <>
        <Td align="center"> <div
              style={{ display: 'inline' }}
              className="badge badge-danger">
              {' '}
              Overdue
            </div></Td>
            {row.sAuthRegionCurrency === 'USD' && (
            <Td  align="center">
              
             
              <div className="m-2">
                            <Switch id="employed" checked={row.nCurrentChatrelSalaryAmt>0} onChange={(e) => {
                              console.log('test',e);
                            modify(e.target);}} disabled={row.isChild} value={index} className="switch-small toggle-switch-first"/>
                        </div>
            </Td>
            )}
            {row.sAuthRegionCurrency === 'INR' && (
            <Td align="center">
              <input
                id={index}
                type="text"
                style={{
                  maxWidth: '100px',
                  border: 'none',
                  borderBottom: '1px solid',
                  
                }}
                onChange={(e) => {
                  modify(e.target);
                }}
              />
            </Td>
            )}
            <Td align="center"  style={{ color: 'red',fontSize: '18px' }}>
           
            {row.sAuthRegionCurrency  === 'INR' ? '₹': '$' }{row.nChatrelLateFeesValue.toFixed(2)}
           
       </Td>  
          </>)}
       
        {row.nChatrelLateFeesValue == 0 && (
          <>
          <Td align="center">
            <div
              style={{ display: 'inline' }}
              className="badge badge-warning">
              Pending
            </div>
            </Td>
            {row.sAuthRegionCurrency === 'USD' && (
            <Td  align="center">
              {
            
                 <Switch id="employed" onChange={(e) => {
                   console.log('test',e);modify(e.target);
                  }} disabled={row.isChild} value={index} className="switch-small toggle-switch-first"/>
              }
            </Td>
            )}
            {row.sAuthRegionCurrency === 'INR' && (
            <Td align="center">
              <input
                id={index}
                type="text"
                style={{
                  maxWidth: '100px',
                  border: 'none',
                  borderBottom: '1px solid',
                  
                }}
                onChange={(e) => {
                  modify(e.target);
                }}
              />
            </Td>
            )}
            <Td></Td>
              
          </>
        )}
        </> )}
     
    {!outstanding && (
        <>
          
          <Td >
            
          </Td>
          <Td >
            
          </Td>
         
          <Td align="center"><div className="badge badge-success"> Paid</div></Td>
          {row.sAuthRegionCurrency === 'USD' && (
            <Td  align="center">
              {
    
                <Switch id="employed" onChange={(e) => {modify(e.target);}}   checked={row.nCurrentChatrelSalaryAmt>0?true:false}  
                // disabled={(dataAPI.gbChatrels[0].nCurrentChatrelSalaryAmt>0?true:false) && row.isChild}
                 disabled={basicResponse>0?true:false || row.isChild} 
                 value={index} className="switch-small toggle-switch-first"/>
                
          }
            </Td>
            )}
            {row.sAuthRegionCurrency === 'INR' && (
            <Td align="center">
              <input
                id={index}
                type="text"
               // disabled={(row.nCurrentChatrelSalaryAmt>0?true:false) && row.isChild}
               disabled={basicResponse>0?true:false || row.isChild} 
                //disabled={row.isChild}
                style={{
                  maxWidth: '100px',
                  border: 'none',
                  borderBottom: '1px solid',
                  
                }}
                onChange={(e) => {
                  modify(e.target);
                }}
              />
            </Td>
            )}
          <Td >
            
          </Td>
        </>
        )}

        
            <Td align="center" style={{ color: 'grey' }}>
            {dollarToRupees && row.sAuthRegionCurrency === 'INR'
              ? dollarToRupees.toFixed(4)
              : '-'}
            </Td>
            <Td
          align="center"
            style={{  fontSize: '20px' }}>
            <b>${row.nChatrelTotalAmount.toFixed(2)}</b>
            </Td>        


          
        </Tr>))}
    
       
      </Tbody>
    </Table>)}
    <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}></Grid>
                            <Grid item xs={12} sm={4}></Grid>
                            <Grid item xs={12} sm={4}>
                              <Grid container spacing={1} justify="center">
                                <Grid item xs={12} align="center">
                                  <div
                                    className="badge badge-first px-3"
                                    style={{
                                      fontSize: '14px',
                                      marginBottom: '15px',
                                      marginRight: '20px'
                                    }}>
                                    Business Donation
                                  </div>
                                  <div>
                                    <TextField
                                      className="h-50"
                                      value={bdonation}
                                      // variant="outlined"
                                      type="number"
                                      onChange={(e) => {
                                        if (e.target.value === '') {
                                          calcTotal(paymentData, adonation, 0);
                                          setBdonation(0);
                                        } else {
                                          calcTotal(
                                            paymentData,
                                            adonation,
                                            parseFloat(e.target.value)
                                          );
                                          setBdonation(
                                            parseFloat(e.target.value)
                                          );
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
                                  </div>
                                </Grid>
                                <Grid item xs={12} align="center">
                                  <div
                                    className="badge badge-first px-3"
                                    style={{
                                      fontSize: '14px',
                                      marginBottom: '15px',
                                      marginRight: '20px'
                                    }}>
                                    Additional Donation
                                  </div>
                                  <div>
                                    <TextField
                                      value={adonation}
                                      type="number"
                                      onChange={(e) => {
                                        if (e.target.value === '') {
                                          calcTotal(paymentData, 0, bdonation);
                                          setAdonation(0);
                                        } else {
                                          calcTotal(
                                            paymentData,
                                            parseFloat(e.target.value),
                                            bdonation
                                          );
                                          setAdonation(
                                            parseFloat(e.target.value)
                                          );
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
                                  </div>
                                </Grid>
                                <Grid item xs={12} align="center">
                                 
                                    <div className="font-weight-bold text-black display-2 mt-4 mb-1">
                                      <CountUp
                                        start={0}
                                        end={total}
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
                                                                          className="">
                                      <br />
                                      <PayPalButton
                                        amount={total.toFixed(2)}
                                        style={{ label: 'pay' }}
                                        options={{
                                          clientId: paypalID,
                                          currency: 'USD'
                                        }}
                                        shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                        onSuccess={(details, data) => {
                                          //setBackdrop(true);
                                          //alert("Transaction completed by " + details.payer.name.given_name);
                                          console.log('Details:', details);
                                          console.log('Data', data);
                                          setPaypalID(details.id);
                                          setBackdrop(false);
                                          setShowPaypalDetails(true);
                                          submit(details);
                                        }}
                                        onError={(err) => {
                                          console.log(err);
                                          setAlertMessage(
                                            'Chatrel donation failed.'
                                          );
                                          setAlertType('error');
                                          snackbarOpen();
                                        }}
                                        onCancel={(data) => {
                                          setBackdrop(false);
                                        }}
                                        createOrder={(data, actions) => {
                                          setBackdrop(true);
                                          pingPong();
                                          return actions.order.create({
                                            purchase_units: [
                                              {
                                                amount: {
                                                  value: total.toFixed(2)
                                                }
                                              }
                                            ]
                                          });
                                        }}
                                        // onError={(details, data)=>{console.log(details);}}
                                      />
                                    </div>
                                  )}
                                
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
    
                      
                     
                 
                  
                 </div>     
           
                  
             
                

        </div>
        </div>
        </Card>
        </Grid>
        
        <Grid item xs={12} sm={1} ></Grid>
        </Grid>
        </>
        }
        
          
             
          { successDiv && (
                <div id="successDiv">
                
                  <Card className="bg-neutral-first d-block card-border-top border-first text-center p-4 p-xl-5 w-50 mx-auto">
                                    <h4 className="px-3 px-xl-5 display-4 line-height-2 font-weight-bold mb-2">Thank You for your contribution!!</h4>
                                    <h5 className="px-3 px-xl-5 display-4 line-height-2  mb-2">དཔྱ་དངུལ་དྲྭ་ཐོག་གནང་བར་ཐུགས་རྗེ་ཆེ་ཞུ། </h5>
                                    
 


                                    <Button  onClick={() => {
                        getReceipt(receiptData);
                      }} className="btn-first px-4 text-uppercase font-size-sm hover-scale-lg font-weight-bold mt-2">
                                        View Receipt
                                    </Button>
                                </Card>
                </div>
              )}
          
          {snackbar && (
            <Alerts
              alertObj={alertObj}
              snackbar={snackbar}
              snackbarClose={snackbarClose}
            />
          )}
          <Dialog
        open={popup}
        onClose={()=>{setPopup(false);}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
       
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Please enter Employment Contribution manually for your Authority Region
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setPopup(false);}} color="primary">
            Close
          </Button>
         
        </DialogActions>
      </Dialog>
         
          <Backdrop className={classes.backdrop} open={showPaypalDetails}>
          <Card  variant="outlined" className='text-center mx-auto p-3 text-black'>
          <strong>PayPal Contribution Details</strong><br/>
          PayPal Transaction ID: {paypalID}<br/>
          Kindly save this ID for future reference.
            <br/>
          <CircularProgress color="black" />
          </Card>
          
            
          </Backdrop>
        </>
      )}
       <Backdrop className={classes.backdrop} open={backdrop}>
         
         <CircularProgress color="inherit" />
       </Backdrop>
    </>
  );
}
