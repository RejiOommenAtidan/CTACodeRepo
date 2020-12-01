import React from 'react';
import { Card } from '@material-ui/core';
import {Link, Box, Container, Grid, Button, Typography, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize} from '@material-ui/core';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { storeCurrentGBDetails } from '../../actions/transactions/CurrentGBDetailsAction';
import axios from 'axios';
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
  let history = useHistory();
  let dispatch = useDispatch();
  
  const classes = useStyles();
  const theme = useTheme();
  const [sFirstName, setFirstName] = React.useState('');
  const [sLastName, setLastName] = React.useState('');
  const [dtDOB, setDOB] = React.useState();
  const [sFriendGBID, setFriendGBID] = React.useState();

  const makePayment = (obj, data, outstanding)=> {
    console.log("Inside Make payment method for " , obj, data)
    dispatch(storeCurrentGBDetails(obj));
    history.push('/PaymentPage', {pymtData: data, outstanding});
  }


  const verify = (e) => {
    e.preventDefault()
    axios.get(`/ChatrelPayment/VerifyFriendDetails/?sGBID=${sFriendGBID}&sFirstName=${sFirstName}&sLastName=${sLastName}&dtDOB=${dtDOB}`)
    .then(resp => {
      
      if(resp.status === 200){
        console.log(resp.data);
        if(resp.data === true){
          axios.get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=`+sFriendGBID)
          .then(resp => {
            if (resp.status === 200) {
              makePayment({sGBID: sFriendGBID, sName: `${sFirstName} ${sLastName}`, sRelation: `Friend`, from:'Chatrel for Friend' }, resp.data, resp.data.chatrelPayment.nChatrelTotalAmount)
            }
          })
          .catch(error => {
            console.log(error.message);
          });
        }
        else{
          alert("Values don't match with database. Enter correct values.");
        }
      }
      
    
    })
    .catch(error => {
        if(error.response.status === 400){
          alert("Missing Parameters...");
        }
        console.log(error.message);
        console.log(error);

    });
  };
  return (
  <>
  <p style={{backgroundColor: "lightblue"}}>Pay for a friend</p>
  <form onSubmit = {(e) => verify(e)}>
    <Grid container direction="column" alignContent="center" >
      
      <Grid item xs={12} sm={6}>
        <FormControl>
          <TextField
            label="Enter First Name of Friend"
            // InputProps={{inputProps: {style: minWidth = "50px"} }}
            style={{minWidth: "250px"}}
            onChange={(e) => {setFirstName(e.target.value)}}
            required
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl>
          <TextField
            label="Enter Last Name of Friend"
            style={{minWidth: "250px"}}
            onChange={(e) => {setLastName(e.target.value)}}
            required
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl>
          <TextField
            label="Enter GreenBook ID"
            style={{minWidth: "250px"}}
            onChange={(e) => {setFriendGBID(e.target.value)}}
            required
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl>
          <TextField
            label="Enter Birth Date"
            InputLabelProps={{
              shrink: true,
            }}
            style={{minWidth: "250px"}}
            type="date"
            onChange={(e) => {setDOB(e.target.value)}}
            required
          />
        </FormControl>
      </Grid>
      
      <Grid item xs={12} sm={3}>
        <br />
        <Button variant="outlined" color="primary" type="submit" >Verify &amp; Pay</Button>
      </Grid>
    </Grid>
    </form>
    </>);

}