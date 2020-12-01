
import React,{useState,useEffect} from 'react';
import { Card } from '@material-ui/core';
import {Link, Box, Container, Grid, Button, Typography, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize} from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
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
import Moment from 'moment';
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



export default function Family () {
  const sGBID=useSelector(state => state.GBDetailsReducer.oGBDetails.sGBID);
  const [paymentHistory,setPaymentHistory]=React.useState();
  const classes = useStyles();
  const theme = useTheme();
  
  const getReceipt = (sChatrelReceiptNumber) => {
    console.log("Receipt Number", sChatrelReceiptNumber);
  }


  useEffect(() => {
    //setPaymentData(payObj);
    axios.get(`/ChatrelPayment/GetPaymentHistory/?sGBID=`+sGBID)
      .then(resp => {
        if (resp.status === 200) {
         setPaymentHistory(resp.data);
         
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
    <>
    {paymentHistory &&
    <><p style={{fontSize:"18px", fontWeight: "bold", textAlign:"center"}}>Chatrel History</p>
      <Card  style={{  padding: 50 }} >

      <br />
        <p style={{backgroundColor: "lightblue"}}>Payment History</p>
        <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            
            <TableCell align="left" style={{width: "8%"}}>Date</TableCell>
            <TableCell align="center" style={{width: "13%"}}>Reciept No.</TableCell>
            <TableCell align="center" style={{width: "8%"}}>Paid By GBID</TableCell>
            <TableCell align="center" style={{width: "8%"}}>Paid for GBID</TableCell>
            <TableCell align="center" style={{width: "16%"}}>Paid for Name</TableCell>
            <TableCell align="center" style={{width: "8%"}}>Relation</TableCell>
            <TableCell align="center" style={{width: "3%"}}>Currency</TableCell>
            <TableCell align="center" style={{width: "8%"}}>Amount</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Mode</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Status</TableCell>
          </TableRow>
        </TableHead>
        {paymentHistory && <TableBody>
          {paymentHistory.map((row) => (
            <TableRow key={row.receiptNo}>
              <TableCell align="center">{Moment(row.dtPayment).format("DD/MM/yyyy")}</TableCell>
              <TableCell >{row.sChatrelReceiptNumber}</TableCell>
              <TableCell >{row.sPaidByGBId}</TableCell>
              <TableCell >{row.sGBIDPaidFor}</TableCell>
              <TableCell >{row.sFirstName + ' ' + row.sLastName}</TableCell>
              <TableCell align="center">{row.sRelation}</TableCell>
              <TableCell align="center">{row.sPaymentCurrency}</TableCell>
              <TableCell align="center">{row.nChatrelTotalAmount}</TableCell>
              <TableCell align="center">{row.sPaymentMode}</TableCell>
              <TableCell align="center">{row.sPaymentStatus}</TableCell>
              <TableCell align="center"><input type="button" value="Download Receipt" onClick={()=>{getReceipt({sChatrelReceiptNumber: row.sChatrelReceiptNumber })}} /></TableCell>
              
            </TableRow>
          ))}
        </TableBody>}
      </Table>
    </TableContainer>
    </Card></>}
    </>
  );
}