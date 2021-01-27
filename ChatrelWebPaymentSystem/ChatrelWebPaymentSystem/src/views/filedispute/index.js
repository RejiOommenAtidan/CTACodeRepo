
import React from 'react';
import { Card } from '@material-ui/core';
import {Link, Box, Container, Grid, Button, Typography, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize} from '@material-ui/core';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import axios from 'axios';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useState } from 'react';
import { Alerts } from '../alerts';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


export default function Friends () {
  const classes = useStyles();
  const theme = useTheme();
 
  
  //const [sAccept, setsAccept] = useState("audio/*,video/*,image/*,*.doc, *.docx, *.pdf, *.xls, *.xlsx");
  const [sAccept, setsAccept] = useState("*.png,*.jpg,*.jpeg,*.doc, *.docx, *.pdf");
  const [sTitle, setsTitle] = useState(""); 
  const [sDocType, setsDocType] = useState("");
  const [binFileDoc, setbinFileDoc] = useState("");
  const [sFileExtension, setsFileExtension] = useState("");
  const [disputeDescription, setDisputeDescription] = useState('');  

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

  const [backdrop, setBackdrop] = React.useState(false);
  
const userObj = useSelector(state => state.GLoginReducer.oGoogle);
const userGBObj = useSelector(state => state.GBDetailsReducer.oGBDetails);
const [sName,setName]=React.useState(userObj.name);

const [sGBID,setGBID]=React.useState(userGBObj.sGBID);
const [dtDob,setDOB]=React.useState("");
const [fileName,setFileName]=React.useState("No file chosen");
const handleUploadClick =(e) =>{
  console.log(e)
  //filename = this.files[0].name
}
const reader = new FileReader();

    reader.addEventListener("load", function () {
        setbinFileDoc(reader.result);
       // console.log(reader.result);
    }, false);
  

const handleUploadChange = (event) => {
    let files = document.getElementById("id_binDocFile").files;
    let file;
    if (files) {
        for (var i = 0; i < files.length; i++) {
            file = files[i];
            reader.readAsDataURL(file);
            //use var instead of let
            var Dot = file.name.lastIndexOf('.');
            var Name = file.name.slice(0, Dot);
            var Extension = file.type.split("/").pop()
            setsTitle(Name);
            setsFileExtension(Extension);
            console.log(file.name);
            console.log(Name);
            console.log(Extension);
        }
    }
};


const handleDisputeFileSubmit = (e) => {
 //  e.preventDefault();
  setBackdrop(true);
  
  
  if(disputeDescription === ""){
    
    setBackdrop(false);
    setAlertMessage('Enter Description');
    setAlertType('info');
    snackbarOpen();
    
  }
  else if(binFileDoc === "" ){
    
    setBackdrop(false);
    setAlertMessage('Select a file ');
    setAlertType('info');
    snackbarOpen();
    
  }
else if (binFileDoc !== "" && disputeDescription !== "")
{
  //console.log(backdrop);
  // console.log ("File upload:", binFileDoc)
   const submit = {sGBID: sGBID, sName: sName, description: disputeDescription, sTitle: sTitle,
    file: binFileDoc, sFileExtension: sFileExtension }
   axios.post(`/ChatrelPayment/SubmitDispute`, submit)
   .then((resp) => {
    if (resp.status === 200) {

      setBackdrop(false);
      setAlertMessage('File Dispute Submitted successfully.');
      setAlertType('success');
      snackbarOpen();
      
    }
  })
  .catch((error) => {
     // alert('error on submission.') ;
     setBackdrop(false);
      setAlertMessage('error on submission.');
      setAlertType('error');
      snackbarOpen();
      console.log(error.message);
      
  });
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
                                            <FontAwesomeIcon icon={['fas', 'file-invoice-dollar']} className="display-3" />
                                        </div>
                                        <div className="font-weight-bold text-black display-4 mt-4 mb-3">
                                            File Dispute
                                        </div>
            <Grid container spacing={3}>
         
              <Grid item xs={12}>
              <TextField rows={5} variant="outlined" fullWidth onChange={(e)=>{setDisputeDescription(e.target.value)}} multiline label="Enter Description"/>

              </Grid>
              <Grid item xs={12} >
                <div className="mx-auto">
                <label htmlFor="id_binDocFile" className="w-100">
                      <input
                          id="id_binDocFile"
                          accept={sAccept}
                          //className={props.classes.textField}
                          style={{ display: 'none' }}
                          type="file"
                          onChange={(event) => { handleUploadChange(event) }}
                      />
                    
              <Button className="btn-outline-first border-1 m-1 w-100" variant="outlined"  component="span" >
                                          <FontAwesomeIcon icon={['fas', 'upload']} className="display-5 ml-2" style={{marginRight:'5px'}} /> Upload Document
                                          </Button>
                                          </label>
                                          </div>
          {sTitle !== "" &&        <Typography
                      variant="p"
                      color="primary"
                      className="text-dark"
                  >File Name: {sTitle}</Typography>}


              </Grid>
            
            </Grid>

      </div>
          <div className="divider mt-4" />
          <a type="submit"  onClick={()=>{handleDisputeFileSubmit();}} className="px-4 py-3 btn-transition-none text-white bg-first btn btn-white shadow-none d-flex justify-content-between align-items-center">
              
              <div>File a Dispute</div>
              <FontAwesomeIcon icon={['fas', 'chevron-right']}/>
          </a>
      </div>
    {/*    <Button variant="outlined" color="primary" type="submit" >Verify &amp; Pay</Button>*/}
                            </Card>

     
     </Grid>
     <Grid item xs={12} sm={4} ></Grid>
     </Grid>
  
    {snackbar && <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />
          }
         <Backdrop className={classes.backdrop} open={backdrop} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}