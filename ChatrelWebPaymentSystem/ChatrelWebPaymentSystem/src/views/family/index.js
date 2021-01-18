import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { useMediaQuery } from 'react-responsive'
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
  const responsive = useMediaQuery({query: '(max-width: 1100px)'})
  const sGBID=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sGBID);
  //const pageFrom=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.from);
  //const payingFor=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sName);
  const paidByGBID=useSelector(state => state.GBDetailsReducer.oGBDetails.sGBID);
  const paidByName= useSelector(state => state.GLoginReducer.oGoogle.name);
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
<Grid container spacing={1}>
      <Grid item xs={12} sm={1} ></Grid>
      <Grid item xs={12} sm={10}>
      <Card className="card-box card-box-alt  mx-auto my-4 shadow-lg " style={{borderBottom: "10px solid #4191ff"}} >
      <div className="card-content-overlay text-left">
      <div className="px-4">
                                        <div className="d-50 rounded-lg border-0 mb-1 card-icon-wrapper bg-first text-white btn-icon text-center shadow-first">
                                            <FontAwesomeIcon icon={['fas', 'heart']} className="display-4" />
                                        </div>
                                        <div className="font-weight-bold text-black display-4 mt-4 mb-3">
                                          FAMILY MEMBERS OF {paidByName.toUpperCase()}
                                        </div>
 <Card  style={{  padding: 20,marginBottom:20,border:'1px solid grey'}} className="shadow-first shadow-xl"   >
    
    
    { !responsive &&(  <Table style={{color:'#000'}}>
      <Thead>
        <Tr  >
          <Th style={{textAlign:'left'}}>NAME</Th>
          <Th style={{textAlign:'center'}}>RELATION</Th>
          <Th style={{textAlign:'center'}}>GB ID</Th>
          <Th style={{textAlign:'center'}}>AGE</Th>
          <Th style={{textAlign:'center'}}>STATUS</Th>
          <Th style={{textAlign:'center'}}>AMOUNT</Th>
          <Th style={{textAlign:'center'}}>PAY</Th>
          
        </Tr>
      </Thead>
      <Tbody  >
      
          {familyData.map((row) => (
            <Tr style={{borderTop:'1px solid grey',borderRadius:'5px',marginBottom:'5px',height:'60px'}} className="px-1 m-2" >
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
                     <><div className="badge badge-warning">PENDING</div></>}
                    { !row.dPending && 
                     <div className="badge badge-dark">N/A</div>}
                    </Td>
                  <Td align="center">
                    
                     {(row.dPending && row.dPending.chatrelPayment.nChatrelTotalAmount > 0) && 
                     <>{row.dPending.gbChatrels[0].sAuthRegionCurrency==="USD"?'$':'₹'}{row.dPending.chatrelPayment.nChatrelTotalAmount}</>}
                
                    </Td>
                  {row.sGBIDRelation == null && 
                  <Td align="center">
                  <Button disabled className="btn-dark border-1 m-2 pt-1 pb-1" variant="outlined">Pay</Button></Td>
                  }
                  {row.sGBIDRelation != null && 
                  <Td align="center">
                  <Button className="btn-success border-1 m-2 pt-1 pb-1" disabled={row.dPending.chatrelPayment.nChatrelTotalAmount===0}  onClick={()=>{makePayment({sGBID: row.sGBIDRelation, sName: row.sName, sRelation: row.sRelation, from:'Chatrel for Family' }, row.dPending, row.dPending.chatrelPayment.nChatrelTotalAmount)}} variant="outlined">Pay</Button>
                    </Td>}
                  
            </Tr>
          ))}
        </Tbody>
      </Table> )}
      { responsive &&(  <Table style={{color:'#000'}}>
      <Thead>
        <Tr  >
          <Th style={{textAlign:'left'}}>NAME</Th>
          <Th style={{textAlign:'center'}}>RELATION</Th>
          <Th style={{textAlign:'center'}}>GB ID</Th>
          <Th style={{textAlign:'center'}}>AGE</Th>
          <Th style={{textAlign:'center'}}>STATUS</Th>
          <Th style={{textAlign:'center'}}>AMOUNT</Th>
          <Th style={{textAlign:'center'}}>PAY</Th>
          
        </Tr>
      </Thead>
      <Tbody  >
      
          {familyData.map((row) => (
            <Tr style={{borderTop:'1px solid grey',borderRadius:'5px',marginBottom:'5px'}} className="px-1 m-2" >
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
                     <><div className="badge badge-warning">PENDING</div></>}
                    { !row.dPending && 
                     <div className="badge badge-dark">N/A</div>}
                    </Td>
                  <Td align="center">
                    
                     {(row.dPending && row.dPending.chatrelPayment.nChatrelTotalAmount > 0) && 
                     <>{row.dPending.gbChatrels[0].sAuthRegionCurrency==="USD"?'$':'₹'}{row.dPending.chatrelPayment.nChatrelTotalAmount}</>}
                
                    </Td>
                  {row.sGBIDRelation == null && 
                  <Td align="center">
                  <Button disabled className="btn-dark border-1 m-2 pt-1 pb-1" variant="outlined">Pay</Button></Td>
                  }
                  {row.sGBIDRelation != null && 
                  <Td align="center">
                  <Button className="btn-success border-1 m-2 pt-1 pb-1" disabled={row.dPending.chatrelPayment.nChatrelTotalAmount===0}  onClick={()=>{makePayment({sGBID: row.sGBIDRelation, sName: row.sName, sRelation: row.sRelation, from:'Chatrel for Family' }, row.dPending, row.dPending.chatrelPayment.nChatrelTotalAmount)}} variant="outlined">Pay</Button>
                    </Td>}
                  
            </Tr>
          ))}
        </Tbody>
      </Table> )}

      </Card>
      </div>
      </div>
      </Card>
      </Grid>
      <Grid item xs={12} sm={1} ></Grid>
      </Grid>}</>}

   


       
     
    
</>
);

}