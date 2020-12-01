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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from 'moment';

import { storeCurrentGBDetails } from '../../actions/transactions/CurrentGBDetailsAction';

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

  let history = useHistory();
  let dispatch = useDispatch();
  
  const makePayment = (obj, data, outstanding)=> {
    console.log("Inside Make payment method for " , obj, data)
    dispatch(storeCurrentGBDetails(obj));
    history.push('/PaymentPage', {pymtData: data, outstanding});
  }

  useEffect(() => {
    axios.get(`http://localhost:52013/api/ChatrelPayment/GetFamilyDetails/?sGBID=`+paidByGBID)
    .then(resp => {
      if (resp.status === 200) {
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
<p style={{backgroundColor: "lightblue"}}>Family Member List for {sGBID}</p>
           <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            
            <TableCell align="left" style={{width: "10%"}}>Name</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Relation</TableCell>
            <TableCell align="center" style={{width: "10%"}}>GreenBook ID</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Age</TableCell>
            <TableCell align="right" style={{width: "10%"}}>Pending</TableCell>
            <TableCell align="center" style={{width: "10%"}}>Action</TableCell>
          </TableRow>
        </TableHead>
        {familyData && <TableBody>
          {familyData.map((row) => (
            <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.sName}
                  </TableCell>
                  <TableCell align="center">{row.sRelation}</TableCell>
                  <TableCell align="center">{row.sGBIDRelation}</TableCell>
                  <TableCell align="center">{row.nAge}</TableCell>
                  <TableCell align="right">{row.dPending && row.dPending.chatrelPayment.nChatrelTotalAmount}</TableCell>
                  {row.sGBIDRelation == null && 
                  <TableCell align="center"><Button disabled variant="contained" color="primary" >Pay</Button></TableCell>}
                  {row.sGBIDRelation != null && 
                  <TableCell align="center"><Button variant='contained' color="primary" onClick={()=>{makePayment({sGBID: row.sGBIDRelation, sName: row.sName, sRelation: row.sRelation, from:'Chatrel for Family' }, row.dPending, row.dPending.chatrelPayment.nChatrelTotalAmount)}}>Pay</Button>
                    </TableCell>}
                  
            </TableRow>
          ))}
        </TableBody>}
      </Table>
    </TableContainer>
</>
);

}