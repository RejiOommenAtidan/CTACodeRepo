
import React ,{useEffect}from 'react';
import { Card } from '@material-ui/core';
import {Link, Box, Container, Grid, Button, Typography, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import { useState } from 'react';
import { Alerts } from '../alerts';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import BackGroundImage from '../../assets/images/lake-file-dispute.jpg';

import {storeSession} from '../../actions/transactions/SessionAction';

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
  const dispatch = useDispatch();
  
  //const [sAccept, setsAccept] = useState("audio/*,video/*,image/*,*.doc, *.docx, *.pdf, *.xls, *.xlsx");
  const [sAccept, setsAccept] = useState("*.png,*.jpg,*.jpeg,*.doc, *.docx, *.pdf");
  const [sTitle, setsTitle] = useState(""); 
  const [sDocType, setsDocType] = useState("");
  const [binFileDoc, setbinFileDoc] = useState("");
  const [sFileExtension, setsFileExtension] = useState("");
  const [disputeDescription, setDisputeDescription] = useState('');  
  //const [fileName, setFileName] = useState('');  
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
const [fileName,setFileName]=React.useState("");
const handleUploadClick =(e) =>{
  console.log(e)
  //filename = this.files[0].name
}

const handleSingleFile = (file) => {
  const reader = new FileReader();
    let fileObj={}
    reader.addEventListener("load", function () {
    
        fileObj.binFileDoc=reader.result.split('base64,')[1];
    }, false);
    reader.readAsDataURL(file);
    var Dot = file.name.lastIndexOf('.');
    var Name = file.name.slice(0, Dot);
    var Extension = file.type.split("/").pop()
    fileObj.sTitle=Name;
    fileObj.sFileExtension=Extension;
    console.log(sTitle);

 
  return fileObj
}
const MaxFileSize=5;
const MaxFileCount=2;
//let FileDisputeObj=[];
const [FileDisputeObj,setFileDisputeObj]=React.useState([]);
const handleUploadChange = (event) => {
    let files = document.getElementById("id_binDocFile").files;
    let file;
    let FileName="";
    let fileArray=[];
console.log(files );
    if (files) {
      
      if(files.length<(MaxFileCount+1)){
        for (var i = 0; i < files.length; i++) {
            //file = files[i];
            console.log("file ",i);
            if(files[i].size > (MaxFileSize*1024*1024)){
              setAlertMessage('Maximum file size limit: 5 MB.');
              setAlertType('error');
              snackbarOpen();
              break;
            }
            else{
              var fileObj =  handleSingleFile(files[i]);
              console.log(fileObj);
              fileArray.push(fileObj);
               FileName=FileName+" "+files[i].name; 
            }
       
           
        }
        console.log("File Obj",FileDisputeObj);
        console.log('FileName:',FileName);
        setFileName(FileName);
        setFileDisputeObj(fileArray);
      }
      else{
        setAlertMessage('Maximum two files allowed.');
        setAlertType('error');
        snackbarOpen();
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
  else if(FileDisputeObj.length === 0 ){
    
    setBackdrop(false);
    setAlertMessage('Select a file ');
    setAlertType('info');
    snackbarOpen();
    
  }
else if (FileDisputeObj.length !== 0 && disputeDescription !== "")
{
  //console.log(backdrop);
  // console.log ("File upload:", binFileDoc)
   const submit = { description: disputeDescription,aFileResults: FileDisputeObj }
   console.log(submit);
   axios.post(`/ChatrelPayment/SubmitDispute`, submit)
   .then((resp) => {
    if (resp.status === 200) {
      const oSession={
        sJwtToken:resp.data.token,
        bSession:true
      }
dispatch(storeSession(oSession));
      setBackdrop(false);
      setDisputeDescription('');
      setbinFileDoc('');
      setFileName('');
      setsTitle('');
      setAlertMessage('Thanks for uploading. Your details are sent to the CTA Team & they shall get in touch with you soon.');
      setAlertType('success');
      snackbarOpen();
      
    }
  })
  .catch((error) => {
     // alert('error on submission.') ;
     if(error.response.status!==401){
      setBackdrop(false);
      setAlertMessage('Something went wrong, please try again later');
      setAlertType('error');
      snackbarOpen();
    }
      
  });
}
 };

 useEffect(() => {
  setBackdrop(true);
  axios.get(`/ChatrelPayment/Ping`)
  .then(resp => {
    if (resp.status === 200) {
      setBackdrop(false);
      console.log(resp.data);
      const oSession={
        sJwtToken:resp.data.token,
        bSession:true
      }
      dispatch(storeSession(oSession));
    }
  })
  .catch(error => {
    console.log("Error ", error.response);
    if(error.response.status!==401){
      setBackdrop(false);
      setAlertMessage('Something went wrong, please try again later');
      setAlertType('error');
      snackbarOpen();
    }
  })
  .then(release => {
    //console.log(release); => udefined
  });
   }, []);
  return (
    <> 
    <div style={{background:`url(${BackGroundImage}) no-repeat center`,backgroundSize:'auto'}}>
   
    
     <Grid container spacing={1} style={{padding:'30px'}}>
      <Grid item xs={12} sm={4} ></Grid>
      <Grid item xs={12} sm={4}>
      <Card className="card-box card-box-alt  mx-auto mt-4" style={{borderBottomLeftRadius:'0',borderBottomRightRadius:'0'}}>
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
              <TextField rows={5} variant="outlined" value={disputeDescription} fullWidth onChange={(e)=>{setDisputeDescription(e.target.value)}} multiline label="Enter Description"/>

              </Grid>
              <Grid item xs={12} >
                <div className="mx-auto">
                <label htmlFor="id_binDocFile" className="w-100">
                      <input
                          id="id_binDocFile"
                          accept={sAccept}
                          multiple  
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
          {
           fileName !== "" 
           
          &&      
          
              <Typography
                      variant="p"
                      color="primary"
                      className="text-dark"
                  >Files: {fileName}
                  
                  </Typography>}

                  <i style={{paddingTop:'10px',fontSize:'14px'}}><br/>- Maximum two files allowed.<br/>- Maximum file size limit: 5 MB. </i>
              </Grid>
            
            </Grid>

      </div>
          <div className="divider mt-4" />
         
         
         
      </div>
    {/*    <Button variant="outlined" color="primary" type="submit" >Verify &amp; Pay</Button>*/}
                            </Card>
                            <a type="submit"  onClick={()=>{handleDisputeFileSubmit();}} className="px-4 py-3 btn-transition-none text-white bg-first btn btn-white shadow-none d-flex justify-content-between align-items-center">
              
              <div>File a Dispute</div>
              <FontAwesomeIcon icon={['fas', 'chevron-right']}/>
          </a>
     
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
      </div>
    </>
  );
}