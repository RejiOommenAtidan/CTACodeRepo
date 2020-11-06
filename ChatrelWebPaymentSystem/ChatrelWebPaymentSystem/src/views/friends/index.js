
import React from 'react';
import { Card } from '@material-ui/core';
import {Link, Box, Container, Grid, Button, Typography, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize} from '@material-ui/core';
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
import { subMinutes } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
  TextField: {
    width:200
  }
}));


export default function Friends () {
  const classes = useStyles();
  const theme = useTheme();
  const [sFirstName,setFirstName]=React.useState("");
  const [sLastName,setLastName]=React.useState("");
  const [sGBID,setGBID]=React.useState("");
  const [dtDob,setDOB]=React.useState("");
  
  const FriendObj={
    sFirstName,
    sLastName,
    sGBID,
    dtDob
  }
  let history = useHistory();
  
  const dispatch = useDispatch();
  
  const submit =() =>{
  console.log(FriendObj);
  
  
  const obj={
      sGBID:sGBID,
      from:'Chatrel for Friend'
    }
  dispatch(storeCurrentGBDetails(obj));
  history.push('/PaymentPage');
  }
  return (
    <>
      <Card  style={{  padding: 50 }} >

      <br />
        <p style={{backgroundColor: "lightblue"}}>Pay for a friend</p>
          <Grid container direction="column" alignContent="center" >
            
            <Grid item xs={12} sm={2}>
              <FormControl>
                <TextField
                  label="Enter First Name "
                  onChange={(e)=>setFirstName(e.target.value)}
                  style={{width:'150px'}}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl>
                <TextField
                  label="Enter Last Name "
                  onChange={(e)=>setLastName(e.target.value)}
                  style={{width:'150px'}}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl>
                <TextField
                id="standard-basic"
                  label="Enter GreenBook ID"
                  onChange={(e)=>setGBID(e.target.value)}
                  type="number"
                  inputProps={{min:0,max:9999999}}
                  style={{width:'150px'}}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl>
                <TextField
                  label="Enter Birth Date"
                  type="date"
                  onChange={(e)=>{setDOB(e.target.value)}}
                  style={{width:'150px'}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={2}>
              <br />
              <Button variant="outlined" onClick={()=>{submit()}} color="primary">Verify &amp; Pay</Button>
            </Grid>
          </Grid>
    </Card>
    </>
  );
}