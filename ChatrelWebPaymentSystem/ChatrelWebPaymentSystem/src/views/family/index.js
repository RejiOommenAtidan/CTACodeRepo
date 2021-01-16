import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { Card } from '@material-ui/core';
import {Link, Box, Container, Grid, Button, Typography, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize, Input} from '@material-ui/core';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TableBodyRow } from 'mui-datatables';
//import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from 'moment';
import Alert from '@material-ui/lab/Alert';
import { storeCurrentGBDetails } from '../../actions/transactions/CurrentGBDetailsAction';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
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



export default function MainPage () {
  const sGBID=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sGBID);
  //const pageFrom=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.from);
  //const payingFor=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sName);
  const paidByGBID=useSelector(state => state.GBDetailsReducer.oGBDetails.sGBID);
  const paidByName= useSelector(state => state.GBDetailsReducer.oGBDetails.sName);
  const [chatrelPending, setChatrelPending] = React.useState(null);

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [familyData, setFamilyData]=React.useState(null);
  const [paymentHistory, setPaymentHistory] = React.useState(null);
  const [sFirstName, setFirstName] = React.useState('');
  const [sLastName, setLastName] = React.useState('');
  const [dtDOB, setDOB] = React.useState();
  const [sFriendGBID, setFriendGBID] = React.useState();
  const [currencySymbol, setCurrencySymbol] = React.useState();
  const [paymentData, setPaymentData] = React.useState();
  const [outstanding, setOutstanding] = useState(true);
  
  console.log("Outstanding is: ", outstanding);
  const fontName='Poppins';
  let history = useHistory();
  let dispatch = useDispatch();
  
  const makePayment = (obj, data, outstanding)=> {
    console.log("Inside Make payment method for " , obj, data)
    dispatch(storeCurrentGBDetails(obj));
    history.push('/PaymentPage', {pymtData: data, outstanding});
  }

  useEffect(() => {
    axios.get(`ChatrelPayment/GetFamilyDetails/?sGBID=`+paidByGBID)
    .then(resp => {
      if (resp.status === 200) {
        console.log(resp.data);
       
        setFamilyData(resp.data);
  
      }
    })
    .catch(error => {
      console.log(error.config);
      console.log(error.message);
  
    })
  
  }, []);
  
  return(
<>
{ familyData  &&<>
{ familyData.length === 0 &&
<Alert className="alerts-alternate mb-4 w-50 mx-auto" severity="info">
        <div className="d-flex align-items-center align-content-start">
            <span>
                <strong className="d-block">No Family Members added </strong> Contact the CTA Team to add Family members.
        </span>
        </div>
        </Alert>}
        
        { familyData.length > 0 &&
      <div style={{width:'85%',margin:'auto',backgroundColor:'#ced9fd',padding:'25px',border:'2px solid grey',borderRadius:'25px',boxShadow:" 10px 10px 5px grey"}} className='text-black' >
      <Typography className="myfont"variant="h5" style={{color:'#000',fontFamily:fontName,fontWeight:"bold"}} gutterBottom>FAMILY MEMBERS FOR {sGBID}</Typography>

      <Card  style={{  padding: 20,marginBottom:20,boxShadow:" 3px 3px 1px grey" }}   >
      <Table style={{color:'#000'}}>
      <Thead>
        <Tr>
          <Th style={{textAlign:'left'}}>NAME</Th>
          <Th style={{textAlign:'center'}}>RELATION</Th>
          <Th style={{textAlign:'center'}}>GREENBOOK ID</Th>
          <Th style={{textAlign:'center'}}>AGE</Th>
          <Th style={{textAlign:'center'}}>AMOUNT</Th>
          <Th style={{textAlign:'center'}}>PAY</Th>
          
        </Tr>
      </Thead>
      <Tbody  >
      
          {familyData.map((row) => (
            <Tr>
                  <Td component="th" scope="row">
                    {row.sName}
                  </Td>
                  <Td align="center">{row.sRelation}</Td>
                  <Td align="center">{row.sGBIDRelation}</Td>
                  <Td align="center">{row.nAge}</Td>
                  <Td align="center">
                    {(row.dPending && row.dPending.chatrelPayment.nChatrelTotalAmount===0) && 
                     <div className="badge badge-success">PAID</div>}
                     {(row.dPending && row.dPending.chatrelPayment.nChatrelTotalAmount > 0) && 
                     <><div className="badge badge-warning">PENDING</div> {row.dPending.chatrelPayment.nChatrelTotalAmount}</>}
                    { !row.dPending && 
                     <div className="badge badge-secondary">N/A</div>}
                    </Td>
                  {row.sGBIDRelation == null && 
                  <Td align="center">
                  <Button disabled className="btn-outline-success border-1 m-2 pt-1 pb-1" variant="outlined">Pay</Button></Td>
                  }
                  {row.sGBIDRelation != null && 
                  <Td align="center">
                  <Button className="btn-outline-success border-1 m-2 pt-1 pb-1" disabled={row.dPending.chatrelPayment.nChatrelTotalAmount===0}  onClick={()=>{makePayment({sGBID: row.sGBIDRelation, sName: row.sName, sRelation: row.sRelation, from:'Chatrel for Family' }, row.dPending, row.dPending.chatrelPayment.nChatrelTotalAmount)}} variant="outlined">Pay</Button>
                    </Td>}
                  
            </Tr>
          ))}
        </Tbody>
      </Table>

      </Card>
    </div>}
    
    </>}

       
     
    
</>
);

}