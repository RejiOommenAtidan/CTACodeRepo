import React from 'react';
import { Card ,CardContent} from '@material-ui/core';
import {Link, Box, Container, Grid, Button, Typography, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize} from '@material-ui/core';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { storeCurrentGBDetails } from '../../actions/transactions/CurrentGBDetailsAction';
import axios from 'axios';
import { Alerts } from '../alerts';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'date-fns'; import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import { dateTimePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';
import Moment from 'moment';
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
  const [sFirstName, setFirstName] = React.useState();
  const [sLastName, setLastName] = React.useState();
  const [dtDOB, setDOB] = React.useState(Date.now());
  const [sFriendGBID, setFriendGBID] = React.useState();

    //Alert
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertType, setAlertType] = React.useState('');
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
  
    const [backdrop, setBackdrop] = React.useState(false);
  
  const makePayment = (obj, data, outstanding)=> {
    console.log("Inside Make payment method for " , obj, data)
    dispatch(storeCurrentGBDetails(obj));
    history.push('/PaymentPage', {pymtData: data, outstanding});
  }
  const [check, setCheck] = React.useState(false);


  const verify = () => {
    //e.preventDefault()
    setBackdrop(true);
    console.log(sFirstName,sLastName,sFriendGBID,Moment(dtDOB).format("YYYY-MM-DD"));
    if(sFirstName && sLastName && dtDOB && sFriendGBID){
      axios.get(`/ChatrelPayment/VerifyFriendDetails/?sGBID=${sFriendGBID}&sFirstName=${sFirstName}&sLastName=${sLastName}&dtDOB=${Moment(dtDOB).format("YYYY-MM-DD")}`)
      .then(resp => {
        
        if(resp.status === 200){
          console.log(resp.data);
          if(resp.data === true){
            axios.get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=`+sFriendGBID)
            .then(resp => {
              setBackdrop(false);
              if (resp.status === 200) {
                if(resp.data === "Paid Until Missing"){
                  setAlertMessage('Last Paid Chatrel Date not available in system. Please Contact CTA.');
                  setAlertType('warning');
                  snackbarOpen();
                }
                makePayment({sGBID: sFriendGBID, sName: `${sFirstName} ${sLastName}`, sRelation: `Friend`, from:'Chatrel for Friend' }, resp.data, resp.data.chatrelPayment.nChatrelTotalAmount)
              }
            })
            .catch(error => {
              console.log(error.message);
            });
          }
          else{
            setBackdrop(false);
            setAlertMessage('Friend verification failed');
            setAlertType('warning');
            snackbarOpen();
           // alert("Values don't match with database. Enter correct values.");
          }
        }
        
      
      })
      .catch(error => {
          if(error.response.status === 400){
          //  alert("Missing Parameters...");
            setBackdrop(false);
            setAlertMessage('Something went wrong');
            setAlertType('danger');
            snackbarOpen();
          }
          console.log(error.message);
          console.log(error);
  
      });
    }
    else{
     setCheck(true);
  }
  };
  return (
  <>
  
  
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4} ></Grid>
      <Grid item xs={12} sm={4}>
      <Card className="card-box card-box-alt  mx-auto mt-4">
      <div className="card-content-overlay text-left">
      <div className="px-4">
                                        <div className="d-50 rounded-lg border-0 mb-1 card-icon-wrapper bg-first text-white btn-icon text-center shadow-first">
                                            <FontAwesomeIcon icon={['fas', 'leaf']} className="display-4" />
                                        </div>
                                        <div className="font-weight-bold text-black display-4 mt-4 mb-3">
                                            Pay for Friend
                                        </div>
      <Grid container direction="column" /*alignContent="center"*/  spacing={2}  >
      
            <Grid item xs={12} >
           
                <TextField
                  label="Enter First Name of Friend"
                  // InputProps={{inputProps: {style: minWidth = "50px"} }}
                 variant="outlined"
                 fullWidth
                  
                  onChange={(e) => {setFirstName(e.target.value)}}
                  error={(check && !sFirstName)}
                  helperText={(check && !sFirstName) ?"This Field is required":""}
                />
             
            </Grid>
            <Grid item xs={12} >
          
                <TextField
                  label="Enter Last Name of Friend"
                  fullWidth
                //  style={{minWidth: "250px"}}
                  onChange={(e) => {setLastName(e.target.value)}}
                  variant="outlined"
                  error={(check && !sLastName)}
                  helperText={(check && !sLastName) ?"This Field is required":""}
                />
             
            </Grid>
            <Grid item xs={12} >
             
                <TextField

                
                  label="Enter Green Book Number"
                  fullWidth
//style={{minWidth: "250px"}}
                
                  onChange={(e) => {setFriendGBID(e.target.value)}}
                  variant="outlined"

                  error={(check && !sFriendGBID)}
                  helperText={(check && !sFriendGBID) ?"This Field is required":""}
                />
              
            </Grid>
         
            <Grid item xs={12}>
            <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                                    <div className="m-0">
                                        <KeyboardDatePicker
                                        fullWidth
                                        inputVariant="outlined"
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Enter Date of Birth"
                                            format="dd-MM-yyyy"
                                            value={dtDOB}
                                            error={(check && !dtDOB)}
                                            helperText={(check && !dtDOB) ?"This Field is required":""}
                                            //onChange={handleDateChange}
                                            onChange={(date) => {setDOB(date);}}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                          </div>
                            </MuiPickersUtilsProvider>
              </Grid>
      </Grid>
      </div>
          <div className="divider mt-4" />
          <a type="submit" onClick={()=>{verify();}}  className="px-4 py-3 btn-transition-none text-white bg-first btn btn-white shadow-first d-flex justify-content-between align-items-center">
              
              <div>Continue to Payment Page</div>
              <FontAwesomeIcon icon={['fas', 'chevron-right']}/>
          </a>
      </div>
    {/*    <Button variant="outlined" color="primary" type="submit" >Verify &amp; Pay</Button>*/}
                            </Card>

     
     </Grid>
     </Grid>
     {snackbar && (
            <Alerts
              alertObj={alertObj}
              snackbar={snackbar}
              snackbarClose={snackbarClose}
            />
          )}
          <Backdrop className={classes.backdrop} open={backdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
    </>);

}