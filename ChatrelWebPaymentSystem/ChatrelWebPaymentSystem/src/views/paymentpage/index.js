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


  // Who is paying
  const paidByGBID=useSelector(state => state.GBDetailsReducer.oGBDetails.sGBID);
  
  // GBID for whom we are paying
  const sGBID=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sGBID);
  
  // Relation we are paying for
  const paymentFor = useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sRelation);

  // Heading
  const pageFrom=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.from);

  

  

  //console.log(paidByGBID);
  //const userObj = useSelector(state => state.GLoginReducer.oGoogle);

  const [dataAPI, setDataAPI] = React.useState();
  const [summaryData, setSummaryData] = React.useState();
  const [paymentData, setPaymentData] = React.useState();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [bdonation, setBdonation] = React.useState(0);
  const [adonation, setAdonation] = React.useState(0);

  const [authRegions, setAuthRegions] = React.useState(null);
  const [authRegion, setAuthRegion] = React.useState();
  

  const [shouldRun, setShouldRun] = React.useState(true);

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
    console.log(value.id, e.currentTarget.id.substring(0, e.currentTarget.id.indexOf('_')));
    const index = e.currentTarget.id.substring(0, e.currentTarget.id.indexOf('_'));
    let chartelObj = [...paymentData];
    chartelObj[index].nAuthRegionID = value.id;
    chartelObj[index].sCountryID = value.sCountryID;
    chartelObj[index].sCurrencyCode = value.sCurrencyCode;
    chartelObj[index].nChatrelAmount = value.sCurrencyCode === 'INR' ? chartelObj[index].nChatrelINR : chartelObj[index].nChatrelUSD;
    chartelObj[index].nChatrelMeal = value.sCurrencyCode === 'INR' ? chartelObj[index].nChatrelMealINR : chartelObj[index].nChatrelMealUSD;

    setPaymentData(chartelObj);
    calculate(index);
  };



const modify =(index) =>{
  let payObj = [...paymentData];
  if(payObj[index].nChatrelSalaryAmt===0){
    payObj[index].nChatrelSalaryAmt=50;
    //setPaymentData(payObj);
  }
  else{
    payObj[index].nChatrelSalaryAmt=0;
  }
  setPaymentData(payObj);
  calculate(index);
}

const calculate =(index) =>{
let payObj = [...paymentData];

let len=paymentData.length  ;

if(index!=len-1)
{
payObj[index].lateFees=(payObj[index].nChatrelAmount + payObj[index].nChatrelMeal + payObj[index].nChatrelSalaryAmt)/10;
}
payObj[index].nChatrelTotalAmount= (payObj[index].nChatrelAmount + payObj[index].nChatrelMeal + payObj[index].lateFees + payObj[index].nChatrelSalaryAmt) * ((dollarToRupees && payObj[index].sCurrencyCode === 'INR') ? dollarToRupees.toFixed(4) : 1);
setPaymentData(payObj);
calcTotal(paymentData ,adonation,bdonation);
}
const calcTotal =(obj ,a,b)=>{
  let temptotal=a+b;
  obj.forEach((row ) => {
  
  //temptotal+= row.nChatrelTotalAmount;
  temptotal += (row.nChatrelTotalAmount);
  
  })
  setTotal(temptotal);

}
const submit =() =>{
  let tempSummaryObj = summaryData;
  let payObj = [...paymentData];
  let lastindex =payObj.length-1;

  tempSummaryObj.nArrearsAmount= total- ( payObj[lastindex].nChatrelTotalAmount + bdonation+adonation);
  tempSummaryObj.nChatrelTotalAmount=total;
  tempSummaryObj.nChatrelSalaryAmt=payObj[lastindex].nChatrelSalaryAmt;
  tempSummaryObj.nChatrelBusinessDonationAmt=bdonation;
  tempSummaryObj.nChatrelAdditionalDonationAmt=adonation;
  tempSummaryObj.sPaidByGBId=paidByGBID;

  
  
  let finalObj={
    "chatrelPayment": tempSummaryObj,
    "gbChatrels": paymentData
  }

  console.log("Final Obj:" , finalObj)
  // axios.post(`http://localhost:52013/api/ChatrelPayment/AddNewChatrelPayment`,finalObj)
  // .then(resp => {
  //   if (resp.status === 200) {
      
  //     console.log("Added"); 
      
  //   }
  // })
  // .catch(error => {
  //   if (error.response) {
  //     console.error(error.response.data);
  //     console.error(error.response.status);
  //     console.error(error.response.headers);
  //   } else if (error.request) {
  //     console.warn(error.request);
  //   } else {
  //     console.error('Error', error.message);
  //   }
  //   console.log(error.config);
  // })
  // .then(release => {
  //   //console.log(release); => udefined
  // });


}
  
 
const runOnce = () => {
 // debugger
  if (paymentData && dollarToRupees && shouldRun){
    const len = paymentData.length;
    for (var i = 0; i < len; i++){
      calculate(i);
    }
    setShouldRun(false);
  } 
};

 
  const select = (<select><option>1</option><option>2</option><option>3</option><option>4</option></select>);
  useEffect(() => {
    axios.get(`/AuthRegion/GetAuthRegions`)
      .then(resp => {
        if(resp.status === 200){
          console.log("AuthRegions fetched:", resp.data);
          setAuthRegions(resp.data);
          axios.get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=`+sGBID)
            .then(resp => {
              if (resp.status === 200) {
                console.log("resp.data is:", resp.data);
                setDataAPI(resp.data);
                setSummaryData(resp.data.chatrelPayment);
                setPaymentData(resp.data.gbChatrels);
                calcTotal(resp.data.gbChatrels ,adonation,bdonation);

                fetch('https://api.ratesapi.io/api/latest?base=INR&symbols=USD')
      .then(response => response.json())
      .then(data => {
          console.log("currency", data.rates.USD);
          setDollarToRupees(data.rates.USD);
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
     const [dollarToRupees, setDollarToRupees] = React.useState();
     useEffect(() => {
      runOnce();
    }, [dollarToRupees])
  
  
  
  useEffect(() => {
    (authRegions && summaryData &&
    setAuthRegion(authRegions.find((x) => x.id === summaryData.nAuthRegionID)));
    


    
   

  }, [authRegions, summaryData])
  return (
    <> {dataAPI  &&
    <><p style={{fontSize:"18px", fontWeight: "bold", textAlign:"center"}}>{pageFrom}</p>
    <Card  style={{  padding: 50 }} >
          <Grid container spacing={3}>
   
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
           <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Authority Region</TableCell>
            <TableCell style={{width: "5%"}}>Currency</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Chatrel</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Meal</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Late Fees</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Employed</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Rate &#8377;/$</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Total</TableCell>
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
                  id={`${index}_id`}
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
                      <span>{option.sAuthRegion}</span>
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
              <TableCell>{row.sCurrencyCode}</TableCell>
              <TableCell align="right">{row.nChatrelAmount}</TableCell>
              <TableCell align="right">{row.nChatrelMeal}</TableCell>
              <TableCell align="right">{row.lateFees}</TableCell>
              <TableCell align="center">{ <input value= {index} onChange={(e)=>{modify(e.target.value)}} type="checkbox" disabled = {row.isChild}/>}</TableCell>
              <TableCell align="center">{(dollarToRupees && row.sCurrencyCode === 'INR') ? dollarToRupees.toFixed(4) : '-'}</TableCell>
              <TableCell align="right">{row.nChatrelTotalAmount.toFixed(2) }</TableCell>
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
           <p style={{backgroundColor: "lightblue", textAlign: "right", fontWeight: "bold"}}>Total To Pay <span style={{textAlign: "right", fontWeight: "bold"}}>$ {total.toFixed(2)}</span></p>          
          
           <div><Button variant="contained" color="primary" onClick={()=>{submit() }} >Save</Button></div>
           
      
        </div>
            </Grid>
           
          </Grid>
      
      
    
        
      </Card>
      </>
}
    </>
  );
}

