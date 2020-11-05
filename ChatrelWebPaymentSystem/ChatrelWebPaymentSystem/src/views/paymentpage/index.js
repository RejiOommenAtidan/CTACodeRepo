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

  let nGBID=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.nGBID);
  let pageFrom=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.from);
  let paidByGBID=useSelector(state => state.GBDetailsReducer.oGBDetails.nGBID);

  console.log(paidByGBID);
  const userObj = useSelector(state => state.GLoginReducer.oGoogle);

  const [dataAPI, setDataAPI] = React.useState();
  const [summaryData, setSummaryData] = React.useState();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [bdonation, setBdonation] = React.useState(0);
  const [adonation, setAdonation] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


const [paymentData, setPaymentData] = React.useState();


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
payObj[index].nChatrelTotalAmount= payObj[index].nChatrelAmount + payObj[index].nChatrelMeal + payObj[index].lateFees + payObj[index].nChatrelSalaryAmt;
setPaymentData(payObj);
calcTotal(paymentData ,adonation,bdonation);
}
const calcTotal =(obj ,a,b)=>{
  let temptotal=a+b;
  obj.forEach((row ) => {
  
  temptotal+= row.nChatrelTotalAmount;
  
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
  axios.post(`http://localhost:52013/api/ChatrelPayment/DisplayChatrelPayment/?sGBID=`+nGBID)
  .then(resp => {
    if (resp.status === 200) {
      setDataAPI(resp.data);
      setSummaryData(resp.data.chatrelPayment);
      console.log(resp.data.chatrelPayment.sGBId); 
      setPaymentData(resp.data.gbChatrels);
      calcTotal(resp.data.gbChatrels ,adonation,bdonation);
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
    }
    console.log(error.config);
  })
  .then(release => {
    //console.log(release); => udefined
  });


}




  const select = (<select><option>1</option><option>2</option><option>3</option><option>4</option></select>);
  useEffect(() => {
    //setPaymentData(payObj);
    axios.get(`http://localhost:52013/api/ChatrelPayment/DisplayChatrelPayment/?sGBID=`+nGBID)
      .then(resp => {
        if (resp.status === 200) {
          setDataAPI(resp.data);
          setSummaryData(resp.data.chatrelPayment);
          console.log(resp.data.chatrelPayment.sGBId); 
          setPaymentData(resp.data.gbChatrels);
          calcTotal(resp.data.gbChatrels ,adonation,bdonation);
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
        }
        console.log(error.config);
      })
      .then(release => {
        //console.log(release); => udefined
      });
     }, []);
  return (
    <> {dataAPI  &&
      <Card  style={{  padding: 50 }} >
       
        
        <div>
          <Grid container spacing={3}>
            
              <Grid item xs={12} sm={2}>
              
              {/* <FormControl >
                <TextField label="GreenBook ID" value={9996070}/>
              </FormControl> */}
            </Grid>
            
          </Grid>
          <br/>
        </div>
        
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
            <TableCell>Region</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Chatrel</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Meal</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Penalty</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Employed</TableCell>
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
              <TableCell>{select}</TableCell>
              <TableCell align="right">{row.nChatrelAmount}</TableCell>
              <TableCell align="right">{row.nChatrelMeal}</TableCell>
              <TableCell align="right">{row.lateFees}</TableCell>
              <TableCell align="right">{ <input value= {index} onChange={(e)=>{modify(e.target.value)}} type="checkbox"/>}</TableCell>
              <TableCell align="right">{row.nChatrelTotalAmount}</TableCell>
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
           <br />
           <p style={{backgroundColor: "lightblue"}}>Pay Online</p>   
           <div><Button onClick={()=>{submit() }} > <img src="https://www.paypalobjects.com/webstatic/mktg/logo/bdg_now_accepting_pp_2line_w.png" border="0" alt="Now accepting PayPal" /></Button></div>
           
      
        </div>
            </Grid>
          </Grid>
      
      
    
        
      </Card>
}
    </>
  );
}

