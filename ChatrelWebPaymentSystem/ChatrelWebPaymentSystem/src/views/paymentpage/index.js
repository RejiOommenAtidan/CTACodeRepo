//'use strict';

import React, { useEffect, useState } from 'react';
import { Card } from '@material-ui/core';
import {Link, Box, Container, Grid, Button, Typography, FormControl, TextField, InputLabel, MenuItem, TextareaAutosize} from '@material-ui/core';
import PropTypes from 'prop-types';

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
import { useSelector} from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Alerts } from '../alerts';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 1000,
    alignContent: "center",
    textAlign: "center"
  },
  table: {
    minWidth: 650,
  },
}));



export default function PaymentPage  (props) {

  let history = useHistory();
  //const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  
  console.log("Props contains:", props);
  // Who is paying
  const paidByGBID=useSelector(state => state.GBDetailsReducer.oGBDetails.sGBID);
  const userId = paidByGBID;
  // GBID for whom we are paying
  const sGBID=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sGBID);
  
  // Relation we are paying for
  const paymentFor = useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sRelation);

  // Heading
  const pageFrom=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.from);

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

  

  //console.log(paidByGBID);
  //const userObj = useSelector(state => state.GLoginReducer.oGoogle);

  
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
  console.log("Current paymentData is ", paymentData);
  

  const autoComplete = (<Autocomplete
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
    onChange={
      (e, value) => {
        if (value !== null) {
          console.log(value.id);
          //setMadebStatusID(value.id);
        }
        else {
          //setMadebStatusID(0);
        }
      }
    }
    renderInput={(params) => (
      <TextField
        {...params}
        label="Authority Region"
        variant="standard"
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password', // disable autocomplete and autofill
        }}
      />
    )}
  />);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  

 
  

  const updateAuthRegion = (e, value) => {
    console.log("Auth region changed to ", value.id, "at row ", e.target.id);
    //const index = e.currentTarget.id.substring(0, e.currentTarget.id.indexOf('_'));
    //const index = e.target.id.substring(0, e.target.id.indexOf('_'));
    const index = parseInt(e.target.id);
    let chatrelObj = [...paymentData];
    chatrelObj[index].nAuthRegionID = value.id;
    chatrelObj[index].sCountryID = value.sCountryID;
    chatrelObj[index].sAuthRegionCurrency = value.sCurrencyCode;
    chatrelObj[index].nChatrelAmount = value.sCurrencyCode === 'INR' ? chatrelObj[index].nChatrelINR : chatrelObj[index].nChatrelUSD;
    chatrelObj[index].nChatrelMeal = value.sCurrencyCode === 'INR' ? chatrelObj[index].nChatrelMealINR : chatrelObj[index].nChatrelMealUSD;
    chatrelObj[index].nCurrentChatrelSalaryAmt = 0;

    setPaymentData(chatrelObj);
    calculate(index);
  };



const modify =(target) =>{
  console.log(target);
  let payObj = [...paymentData];
  let index;
  if(target.type === 'text'){
    index = parseInt(target.id);
    payObj[index].nCurrentChatrelSalaryAmt = parseFloat(target.value) ? parseFloat(target.value) : 0 ;
  }
  else{
    index = parseInt(target.value);
    if(payObj[index].nCurrentChatrelSalaryAmt===0){
      payObj[index].nCurrentChatrelSalaryAmt= payObj[index].nSalaryUSD;
      //setPaymentData(payObj);
    }
    else{
      payObj[index].nCurrentChatrelSalaryAmt=0;
    }
  }
  setPaymentData(payObj);
  calculate(index);
};

const calculate =(index) =>{
let payObj = [...paymentData];

let len=paymentData.length  ;

if(index!=len-1){
  payObj[index].nChatrelLateFeesValue=(payObj[index].nChatrelAmount + payObj[index].nChatrelMeal + payObj[index].nCurrentChatrelSalaryAmt) * (payObj[index].nChatrelLateFeesPercentage / 100);
  
  payObj[index].nArrearsAmount = payObj[index].nChatrelAmount + payObj[index].nChatrelMeal + payObj[index].nChatrelLateFeesValue + payObj[index].nCurrentChatrelSalaryAmt;

}
else{
  payObj[index].nChatrelLateFeesValue=0;
  
}

payObj[index].nChatrelTotalAmount= (payObj[index].nChatrelAmount + payObj[index].nChatrelMeal + payObj[index].nChatrelLateFeesValue + payObj[index].nCurrentChatrelSalaryAmt) * ((dollarToRupees && payObj[index].sAuthRegionCurrency === 'USD') ? dollarToRupees.toFixed(4) : 1);

payObj[index].nConversionRate = payObj[index].sAuthRegionCurrency === 'INR' ? 1.00 : parseFloat(dollarToRupees.toFixed(4));

setPaymentData(payObj);
calcTotal(paymentData ,adonation,bdonation);
};


const calcTotal =(obj ,a,b)=>{
  let temptotal=a+b;
  obj.forEach((row ) => {
  
  //temptotal+= row.nChatrelTotalAmount;
  temptotal += (row.nChatrelTotalAmount);
  
  })
  setTotal(temptotal);

};

  
  
  const runOnce = () => {
    
    if (paymentData && dollarToRupees && shouldRun){
      
      
      if(!outstanding){
        if(paymentData[0].nCurrentChatrelSalaryAmt > 0){
          console.log("we have no outstanding");
           const checkBox = document.getElementById('employed');
           const rateField = document.getElementById('rate');
           const totalField = document.getElementById('total');
           if(checkBox){
              rateField.innerText = '';
              checkBox.checked = true;
              checkBox.disabled = true;
              setPaymentData(paymentData.map((element) => {
                element.nChatrelTotalAmount = 0;
                element.nCurrentChatrelSalaryAmt = 0;
                return element;
              }));
              
              //totalField.innerText = '';
              setTotal(0.00);
              setGBChatrelsNull(true);
           }
          
        }
      }
      else{
        console.log("we have outstanding");
        const len = paymentData.length;
        for (var i = 0; i < len; i++){
          calculate(i);
        }
      }
      setShouldRun(false);
    } 
  };
  

const submit =(e) =>{
  e.preventDefault();
  let tempSummaryObj = summaryData;
  let payObj = [...paymentData];
  let lastindex =payObj.length-1;

  let donationObj = donationData;
  if(bdonation > 0 || adonation > 0){
    donationObj.nChatrelAdditionalDonationAmt = adonation;
    donationObj.nChatrelBusinessDonationAmt = bdonation;
    donationObj.nAuthRegionID = payObj[lastindex].nAuthRegionID;
    donationObj.sCountryID = payObj[lastindex].sCountryID;
    donationObj.sAuthRegionCurrency = payObj[lastindex].sAuthRegionCurrency;
    donationObj.sPaidByGBId = paidByGBID;
    donationObj.nConversionRate = 1.00;
  }
  else{
    donationObj = null;
  }

  tempSummaryObj.nArrearsAmount= total- ( payObj[lastindex].nChatrelTotalAmount + bdonation+adonation);
  tempSummaryObj.nChatrelTotalAmount=total;
  tempSummaryObj.nChatrelBusinessDonationAmt=bdonation;
  tempSummaryObj.nChatrelAdditionalDonationAmt=adonation;
  tempSummaryObj.sPaidByGBId=paidByGBID;
  tempSummaryObj.sChatrelReceiptNumber=receiptNumber;

  let chatrel = 0.00;
  let meal = 0.00;
  let salary = 0.00;
  payObj.forEach(gbchatrel => {
    chatrel += gbchatrel.sAuthRegionCurrency=== 'INR' ?  gbchatrel.nChatrelAmount : gbchatrel.nChatrelAmount * dollarToRupees.toFixed(4);
    meal += gbchatrel.sAuthRegionCurrency=== 'INR' ?  gbchatrel.nChatrelMeal : gbchatrel.nChatrelMeal * dollarToRupees.toFixed(4);
    salary += gbchatrel.sAuthRegionCurrency=== 'INR' ?  gbchatrel.nCurrentChatrelSalaryAmt : gbchatrel.nCurrentChatrelSalaryAmt  * dollarToRupees.toFixed(4);
    gbchatrel.nEnteredBy = userId;
    gbchatrel.nUpdatedBy = userId;
  });
  
  tempSummaryObj.nChatrelAmount = chatrel;
  tempSummaryObj.nChatrelMeal = meal;
  tempSummaryObj.nCurrentChatrelSalaryAmt = salary;
  tempSummaryObj.nEnteredBy = userId;
  tempSummaryObj.nUpdatedBy = userId;
  // if(payObj[lastindex].sAuthRegionCurrency === 'USD'){
  //   tempSummaryObj.nCurrentChatrelSalaryAmt=payObj[lastindex].nCurrentChatrelSalaryAmt * dollarToRupees.toFixed(4);
  //   tempSummaryObj.nChatrelAmount = payObj[lastindex].nChatrelAmount * dollarToRupees.toFixed(4);
  //   tempSummaryObj.nChatrelMeal = payObj[lastindex].nChatrelMeal * dollarToRupees.toFixed(4);
  // }
  // else{
  //   tempSummaryObj.nCurrentChatrelSalaryAmt=payObj[lastindex].nCurrentChatrelSalaryAmt;
  //   tempSummaryObj.nChatrelAmount = payObj[lastindex].nChatrelAmount; 
  //   tempSummaryObj.nChatrelMeal = payObj[lastindex].nChatrelMeal;
  // }
  
  
  // The following to be commented if conversion rate column available in db.
  // payObj.forEach(gbchatrel => {
  //   gbchatrel.nChatrelTotalAmount = gbchatrel.nChatrelAmount + gbchatrel.nChatrelMeal + gbchatrel.nCurrentChatrelSalaryAmt + gbchatrel.nChatrelLateFeesValue
  // });
  
  // let finalObj={
  //   "chatrelPayment": tempSummaryObj,
  //   "gbChatrels": paymentData
  // };

  if(gbChatrelsNull){
    payObj = null;
  }

  if(donationNull){
  
  }

  let finalObj={
    "chatrelPayment": tempSummaryObj,
    "gbChatrels": payObj,
    "gbChatrelDonation": donationObj
  };

  console.log("Final Obj:" , finalObj);
  axios.post(`http://localhost:52013/api/ChatrelPayment/AddNewChatrelPayment`,finalObj)
  .then(resp => {
    if (resp.status === 200) {
      //alert(resp.data);
      setAlertMessage('Chatrel recorded successfully.');
      setAlertType('success');
      snackbarOpen();
      history.goBack();
      console.log(resp.data); 
    }
  })
  .catch(error => {
    console.log(error.config);
    console.log(error.message);
  });
  


};
  

 
  const select = (<select><option>1</option><option>2</option><option>3</option><option>4</option></select>);
  useEffect(() => {
    axios.get(`/AuthRegion/GetAuthRegions`)
      .then(resp => {
        if(resp.status === 200){
          console.log("AuthRegions fetched:", resp.data);
          setAuthRegions(resp.data);
          if(props.location.state.pymtData){
            console.log("Status is ", props.location.state.outstanding);
            if(!props.location.state.outstanding){
              setOutstanding(false);
              if(props.location.state.pymtData.gbChatrels[0].nCurrentChatrelSalaryAmt > 0){
                // const checkBox = document.getElementById('employed');
                // checkBox.checked = true;
                // checkBox.disabled = true;
              }
              

            }
            setDataAPI(props.location.state.pymtData);
            setSummaryData(props.location.state.pymtData.chatrelPayment);
            setPaymentData(props.location.state.pymtData.gbChatrels);
            setDonationData(props.location.state.pymtData.gbChatrelDonation);
            calcTotal(props.location.state.pymtData.gbChatrels, adonation, bdonation);
            

            fetch('https://api.ratesapi.io/api/latest?base=USD&symbols=INR')
                  .then(response => response.json())
                  .then(data => {
                  console.log("currency", data.rates.INR);
                  setDollarToRupees(parseFloat(data.rates.INR));
                  });
            console.log("Got data from props");
            
            return;
          }
          axios.get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=`+sGBID)
            .then(resp => {
              if (resp.status === 200) {
                console.log("resp.data is:", resp.data);
                //resp.data.chatrelPayment.sPaymentMode = 'Offline';
                setDataAPI(resp.data);
                setSummaryData(resp.data.chatrelPayment);
                calcTotal(resp.data.gbChatrels ,adonation,bdonation);
                setPaymentData(resp.data.gbChatrels);
                
                fetch('https://api.ratesapi.io/api/latest?base=USD&symbols=INR')
                  .then(response => response.json())
                  .then(data => {
                  console.log("currency", data.rates.INR);
                  setDollarToRupees(parseFloat(data.rates.INR));
                  });
                
              }
            })
            .catch(error => {
              console.log(error.message);
              console.log(error.config);
              //console.log(error.response.data);
            });
        }
          
      })
      .catch(error => {
        console.log(error.message);
        console.log(error.config);
      });
    //setPaymentData(payObj);
    
      
     }, []);
  
     
  const [dollarToRupees, setDollarToRupees] = React.useState(0.00);

  useEffect(() => {
    runOnce();
    console.log("dollar rate is ", dollarToRupees);
  }, [dollarToRupees])


  useEffect(() => {
    (authRegions && dataAPI &&
    setAuthRegion(authRegions.find((x) => x.id === dataAPI.nAuthRegionID)));

  }, [authRegions, dataAPI]);

  
 

  return (
    <> {dataAPI  &&
    <><p style={{fontSize:"18px", fontWeight: "bold", textAlign:"center"}}>{pageFrom}</p>
    <Card  style={{  padding: 50 }} >
          <Grid container spacing={3}>
          <Grid item >
              <Button variant='contained' color='primary' onClick={() => history.goBack()} >Go Back</Button>
            </Grid>
            <Grid item xs={12} sm={12}> 
            <div className={classes.root}>
      
       
     
     
          <br />
            <p style={{backgroundColor: "lightblue"}}>Personal Details - {dataAPI.chatrelPayment.sGBId}</p>
          
          
              <FormControl>
                <TextField label="GreenBook Holder Name" value={dataAPI.sName}/>
              </FormControl>
              
            
            
            <FormControl style={{paddingLeft: "20px"}}>
                <TextField label="Paid Until"  value={dataAPI.nPaidUntil.split('T')[0]}/>
              </FormControl>
              <br />
              <br />
              <br />
           <p style={{backgroundColor: "lightblue"}}>Payment Balance</p>
           <form onSubmit = {(e) => submit(e)} >
           <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{width: "3%"}}>Year</TableCell>
            <TableCell style={{width: "20%"}}>Authority Region</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Region Currency</TableCell>
            <TableCell align="center" style={{width: "5%"}}>Chatrel</TableCell>
            <TableCell align="center" style={{width: "5%"}}>Meal</TableCell>
            <TableCell align="center" style={{width: "8%"}}>Late Fees</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Employed</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Rate &#8377;/$</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Total (₹)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { paymentData &&
           paymentData.map((row,index) => (
            <TableRow >
              <TableCell component="th" scope="row">
                {row.nChatrelYear}
              </TableCell>
              {/*<TableCell>{select}</TableCell>*/}
              <TableCell>
                <Autocomplete
                  disabled = {!outstanding}
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
                      <span id={`${index}`}>{option.sAuthRegion}</span>
                    </React.Fragment>
                  )}
                  onChange={
                    (e, value) => {
                      if (value !== null) {
                        updateAuthRegion(e, value);
                        
                      }
                      else {
                        //setMadebStatusID(0);
                      }
                    }
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      //label="Authority Region"
                      variant="standard"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </TableCell>
              <TableCell align="center">{row.sAuthRegionCurrency}</TableCell>
              {outstanding && <> <TableCell align="center">{row.nChatrelAmount}</TableCell>
              <TableCell align="center">{row.nChatrelMeal}</TableCell>
              <TableCell align="center">{row.nChatrelLateFeesValue.toFixed(2)}</TableCell> </>}
              {!outstanding && <> <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell> </>}
              {(row.sAuthRegionCurrency === 'USD') &&
              <TableCell align="center">{ <input id='employed' value= {index} onChange={(e)=>{modify(e.target)}} type="checkbox" disabled = {row.isChild}/>}</TableCell>}
              {(row.sAuthRegionCurrency === 'INR') &&
                <TableCell align="center">< input id={index} type = 'text' style={{maxWidth:'50px', border: 'none', borderBottom: '1px solid'}} onChange={(e)=>{modify(e.target)}} /></TableCell>
              }
              <TableCell id='rate' align="center">{(dollarToRupees && row.sAuthRegionCurrency === 'USD') ? dollarToRupees.toFixed(4) : '-'}</TableCell>
              <TableCell id='total' align="right">{row.nChatrelTotalAmount.toFixed(2) }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    <p style={{backgroundColor: "lightblue"}}>Additional Payment</p>
    <Grid container xs={12} sm={12} alignContent="flex-end" justify="flex-end">
    <FormControl style={{textAlign: "right"}} >
                <TextField label="Business Donation" type='number' value={bdonation} 
                onChange={(e)=>{
                  if(e.target.value ===""){
                    calcTotal(paymentData,adonation,0);
                    setBdonation(0);
                  }
                  else{
                    calcTotal(paymentData,adonation,parseInt(e.target.value));
                    setBdonation(parseInt(e.target.value));
                  }
                  
                  
                  }}
                   inputProps={{min: 0, style: { textAlign: 'right' }}}/>
              </FormControl>  
    </Grid>
     
    <Grid container xs={12} sm={12} alignContent="flex-end" justify="flex-end">
    <FormControl>
                <TextField textAlign={"right"}  type='number'label="Additional Donation" value={adonation} 
                onChange={(e)=>{
                  if(e.target.value === ""){
                    calcTotal(paymentData,0,bdonation);
                    setAdonation(0);
                  }
                  else{
                    calcTotal(paymentData,parseInt(e.target.value),bdonation);
                    setAdonation(parseInt(e.target.value));
                  }
                  
                  
                
                }} 
                inputProps={{min: 0, style: { textAlign: 'right' }}}/>
              </FormControl>  
    </Grid>
    <br />
           <p style={{backgroundColor: "lightblue", textAlign: "right", fontWeight: "bold"}}>Total To Pay <span style={{textAlign: "right", fontWeight: "bold"}}>&#8377; {total.toFixed(2)}</span></p>          
           <Grid item>
              <TextField
                label= 'Enter Receipt Number'
                onChange = {(e) => setReceiptNumber(e.target.value)}
              />
            </Grid>
           <div style={{paddingTop:'10px'}}><Button variant="contained" color="primary" type = 'submit' >Save</Button></div>
           </form>
      
        </div>
            </Grid>
            
            <Grid item>
              <Button variant='contained' color='primary' onClick={() => history.goBack()} >Go Back</Button>
            </Grid>
          </Grid>
      
      
          {snackbar && <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />
          }
        
      </Card>
      </>
}
    </>
  );
}

