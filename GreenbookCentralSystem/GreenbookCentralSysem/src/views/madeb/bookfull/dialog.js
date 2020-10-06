import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import axios from 'axios';
import {Alerts} from '../../alerts';

import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export const EditDialog = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();


  console.log(props.bookFullObj);
  const [snackbarOpen,setSnackbarOpen]=React.useState(false);
  const snackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };
  const handleSubmitEditRecord = () =>{
    props.editAPICall(madeb);
    // setMessage("Record Successfully Edited");
    // setAlertType('success');
    // setSnackbarOpen(true)
  }
  debugger
  const [message,setMessage]=React.useState('');
  const [alertType,setAlertType]=React.useState('');

  const [authorityData,setAuthoritData]= React.useState(props.selectData['authRegions']);
  const [typeIssuedData,settypeIssuedData]= React.useState(props.selectData['typeIssued']);

  const [madebType,setMadebType]= React.useState(5);
  const [id, setId] = React.useState(props.bookFullObj.id);
  const [formNumber, setFormNumber] = React.useState(props.bookFullObj.nFormNumber);
  const [receivedDate, setReceivedDate] = React.useState((props.bookFullObj.dtReceived) ? props.bookFullObj.dtReceived.split('T')[0] : undefined);
  const [authRegionID, setAuthorityId] = React.useState(props.bookFullObj.nAuthRegionID);
  
  const [name, setName] = React.useState(props.bookFullObj.sName);
  const [gbId, setGbId] = useState(props.bookFullObj.sGBID);
  const [fname, setFname] = React.useState(props.bookFullObj.sFathersName);
  const [saney, setSaney] = React.useState(props.bookFullObj.nSaneyFormNo);
  const [currentGBSno, setCurrentGBSNo] = useState(props.bookFullObj.nCurrentGBSno);
  const [previousGBSno, setPreviousGBSNo] = useState(props.bookFullObj.nPreviousGBSno);
  const [issueActionDate, setIssueActionDate] = React.useState(props.bookFullObj.dtIssueAction ?(props.bookFullObj.dtIssueAction).split('T')[0] : undefined);
  const [rejectDate, setRejectDate] = useState(props.bookFullObj.dtReject ? (props.bookFullObj.dtReject).split('T')[0] : undefined);
  const [issueAction, setIssueAction] = React.useState(props.bookFullObj.nIssuedOrNotID);
  const [returnDate, setReturnDate] = React.useState(props.bookFullObj.dtReturnEmail ? (props.bookFullObj.dtReturnEmail).split('T')[0] : undefined);
  

  
  const madeb = {
    id:id,
    nMadebTypeID: madebType,
    nFormNumber: formNumber, 
    dtReceived: receivedDate,
    nAuthRegionID:authRegionID , 
    sName: name,
    sGBID: gbId,
    sFathersName:fname,
    nSaneyFormNo:saney,
    nCurrentGBSno: currentGBSno,
    nPreviousGBSno: previousGBSno,
    dtIssueAction:issueActionDate,
    dtReject: rejectDate,
    nIssuedOrNotID:issueAction,
    dtReturnEmail:returnDate
 }
console.log("Madeb Edit Object received in dialog", madeb);
//  const childrenAuthRegion =  () => { 
//         return (authorityData.map((data) => (<option value={data.id}>{data.sAuthRegion}</option> )  ))
//     };  
//  const optsAuthRegion = childrenAuthRegion();
 let valueAuthRegion = [];
 
 authorityData.forEach(element => {
    if(element.id === authRegionID){
        valueAuthRegion = element;
    }
  });

    // const childrenTypeIssued =  () => { 
    //   return (typeIssuedData.map((data) =>  (<option value={data.id}>{data.sTypeIssued}</option>)))};
    // const optsTypeIssued = childrenTypeIssued();
    let valueTypeIssued = [];
    console.log(issueAction);
    typeIssuedData.forEach(element => {
     if(element.id === issueAction){
        valueTypeIssued = element;
     }
     
   });

  return (
      
      

    <Dialog open={props.editModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Book Full Madeb</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
      <DialogContent>
        <DialogContentText>
        <div>
                           
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="nFormNumber"
                                            label="Form Number"
                                            type="number"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            value={formNumber}
                                            onChange={(e) => { setFormNumber(e.target.value) }}

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="dtDate"
                                            name="dtDate"
                                            label="Received Date"
                                            type="date"
                                            defaultValue={receivedDate}
                                            className={props.classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) => { setReceivedDate(e.target.value) }}
                                            inputRef={register({
                                              required: true
                                            })}
                                          />
                                          {_.get("dtDate.type", errors) === "required" && (
                                            <span style={{color: 'red'}}>This field is required</span>
                                          )}
                                    </FormControl>
                                </Grid>

                                {/* <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <InputLabel id="Auth-label">Authority Region</InputLabel>
                                        <Select
                                            labelId="Auth-label"
                                            id="authority"
                                            value={valueAuthRegion}
                                            onChange={(e) => { setAuthorityId(e.target.value) }}
                                            label="Authority"
                                            children={optsAuthRegion}
                                        >
                                           
                                        </Select>
                                    </FormControl>
                                </Grid> */}

                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                    <Autocomplete
                                      openOnFocus
                                      clearOnEscape
                                      onChange={  
                                        (e, value) => {
                                          if (value !== null) {
                                            console.log(value.id);
                                            setAuthorityId(value.id);
                                          }
                                          else {
                                            setAuthorityId(0);
                                          }
                                        }
                                      }
                                     value={valueAuthRegion} 
                                     id="id_nAuthorityId"
                                     options={authorityData}
                                     autoHighlight
                                     getOptionLabel={(option) => option.sAuthRegion}
                                     renderOption={(option) => (
                                       <React.Fragment>
                                         <span>{option.sAuthRegion}</span>
                                       </React.Fragment>
                                     )}
                                     renderInput={(params) => (
                                       <TextField
                                         {...params}
                                         label="Authority"
                                         variant="standard"
                                         inputRef={register({
                                            required: true
                                          })}
                                         name="text_authority"
                                         inputProps={{
                                           ...params.inputProps,
                                           autoComplete: 'new-password', // disable autocomplete and autofill
                                         }}
                                        />
                                      )}
                                    />
                                    {_.get("text_authority.type", errors) === "required" && (
                                         <span style={{color: 'red'}}>This field is required</span>
                                      )}
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="sName"
                                            name="sName"
                                        label="Name"
                                        //required={true}
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                        inputRef={register({
                                          required: true
                                        })}
                                      />
                                      {_.get("sName.type", errors) === "required" && (
                                        <span style={{color: 'red'}}>This field is required</span>
                                      )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="sGBID"
                                            label="GBID"
                                            name="sGBID"
                                            //required={true}
                                        value={gbId}
                                        onChange={(e) => { setGbId(e.target.value) }}
                                        inputRef={register({
                                          required: true
                                        })}
                                      />
                                      {_.get("sGBID.type", errors) === "required" && (
                                        <span style={{color: 'red'}}>This field is required</span>
                                      )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="fname"
                                            label="Father's Name"
                                            value={fname}
                                            onChange={(e) => { setFname(e.target.value) }}
                                        />
                                    </FormControl>
                                </Grid>
                                
                                
                                <Grid item xs={12} sm={6}>

                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="sfn"
                                            label="Saney Form No"
                                            type='number'
                                            value={saney}
                                            onChange={(e) => { 
                                                setSaney(parseInt(e.target.value));
                                                console.log("Value of saney changed to:", e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                          id="nCurrentGBSno"
                                          name="nCurrentGBSno"
                                          label="Current GB SNo."
                                          type='number'
                                          //required={true}
                                          value={currentGBSno}
                                          onChange={(e) => { 
                                            setCurrentGBSNo(parseInt(e.target.value));
                                            console.log("Value of currentGB changed to:", parseInt(e.target.value));
                                          }}
                                          inputRef={register({
                                            required: true
                                          })}
                                        />
                                        {_.get("nCurrentGBSno.type", errors) === "required" && (
                                          <span style={{color: 'red'}}>This field is required</span>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                      <TextField
                                        id="nPreviousGBSno"
                                        name="nPreviousGBSno"
                                        label="Previous GB SNo"
                                        type='number'
                                        // required={true}
                                        value={previousGBSno}
                                        onChange={(e) => { 
                                          setPreviousGBSNo(parseInt(e.target.value));
                                          console.log("Value of previousGB changed to:", e.target.value);
                                        }}
                                        // inputRef={register({
                                        //   required: true
                                        // })}
                                      />
                                      {/* {_.get("nPreviousGBSno.type", errors) === "required" && (
                                        <span style={{color: 'red'}}>This field is required</span>
                                      )} */}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="dtIssueActionDate"
                                            name="dtIssueActionDate"
                                            label="Issue Action Date"
                                            type="date"
                                            defaultValue={issueActionDate}
                                            className={props.classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            
                                            onChange={(e) => { setIssueActionDate(e.target.value) }}
                                        />
                                    </FormControl>
                                </Grid>
                                {/* <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <InputLabel id="issue-label"> Issue Action</InputLabel>
                                        <Select
                                            labelId="issue-label"
                                            id="authority"
                                            value={valueTypeIssued}
                                             onChange={(e) => { setIssueAction(e.target.value) }}
                                            label="Issue Action"
                                            children={optsTypeIssued}
                                        >
                                          

                                        </Select>
                                    </FormControl>
                                </Grid> */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                    <Autocomplete
                                      openOnFocus
                                      clearOnEscape
                                      onChange={  
                                        (e, value) => {
                                          if (value !== null) {
                                            console.log(value.id);
                                            setIssueAction(value.id);
                                          }
                                          else {
                                            setIssueAction(0);
                                          }
                                        }
                                      }
                                     value={valueTypeIssued} 
                                     id="id_nTypeIssued"
                                     options={typeIssuedData}
                                     autoHighlight
                                     getOptionLabel={(option) => option.sTypeIssued}
                                     renderOption={(option) => (
                                       <React.Fragment>
                                         <span>{option.sTypeIssued}</span>
                                       </React.Fragment>
                                     )}
                                     renderInput={(params) => (
                                       <TextField
                                         {...params}
                                         label="Type Issued"
                                         variant="standard"
                                         inputProps={{
                                           ...params.inputProps,
                                           autoComplete: 'new-password', // disable autocomplete and autofill
                                         }}
                                        />
                                      )}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="dtRejectDate"
                                            name="dtRejectDate"
                                            label="Reject Date"
                                            type="date"
                                            defaultValue={rejectDate}
                                            className={props.classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            
                                            onChange={(e) => { setRejectDate(e.target.value) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="dtReturnDate"
                                            name="dtReturnDate"
                                            label="Return Date"
                                            type="date"
                                            defaultValue={returnDate}
                                            className={props.classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            
                                            onChange={(e) => { setReturnDate(e.target.value) }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleEditClickClose} color="primary">Cancel</Button>

       {/* <Button  type='submit' onClick={handleSubmit} color="primary">Save</Button> */}
     
        <Snackbar open={snackbarOpen} autoHideDuration={3000}  onClose={snackbarClose} >
        <Alert  onClose={snackbarClose} severity={alertType}  >
         {message}
        </Alert>
      </Snackbar>

      <Button type="submit" color="primary">Save</Button> 
      </DialogActions>
      </form>
    </Dialog>
);


}



export const AddDialog = (props) => {
    const { register, handleSubmit, watch, errors } = useForm();
    
    // SnackBar Alerts 

   const [alertMessage, setAlertMessage] = useState("");
   const [alertType, setAlertType] = useState("");
   const alertObj={
     alertMessage:alertMessage,
     alertType:alertType
   }
   const [snackbar,setSnackbar]=React.useState(false);
   const snackbarOpen = () => {
     console.log('alert');
     setSnackbar(true);
   }
   const snackbarClose = () => {
     setSnackbar(false);
   };


   

   
    const handleSnackBarSubmit = () =>{
      // setMessage("Record Successfully Edited");
      // setAlertType('success');
      // setSnackbarOpen(true);
      props.addAPICall(madeb);
    }

    const handleChangeGBID = (value) => {
      setGbId(value);
      setName('');
      setFname('');
    }
    const formPopulate = (value) => {
      console.log("Value in GBID: ", value);
      const gbid = value;
      const event = new Event('change' , {
        bubbles: true
      });
    /* Need Greenbook record by passing GBID
     * from Greenbook controller. 
     * Must talk to Malay.
    */
    const sNameElement = document.getElementById("sName");
    const nCurrentGBSnoElement = document.getElementById("nCurrentGBSno");
    const nPreviousGBSnoElement = document.getElementById("nPreviousGBSno");
       axios.get(`Greenbook/GetGreenbook/sGBID=`+ gbid)
       .then(resp => {
         if (resp.status === 200) {
           console.log("Got gb record\n", resp.data);
           console.log("Name Element:" , sNameElement);
           const name = resp.data.sFirstName ? resp.data.sFirstName : '';
           const mname = resp.data.sMiddleName ? resp.data.sMiddleName : '';
           const lname = resp.data.sLastName ? resp.data.sLastName : '';
           //sNameElement.value=`${name} ${mname} ${lname}`;
           var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype, "value").set;
          nativeInputValueSetter.call(sNameElement, `${name} ${mname} ${lname}`);
          var inputEvent = new Event("input", { bubbles: true });
          setName( `${name} ${mname} ${lname}`);
          setFname(resp.data.sFathersName);
          sNameElement.dispatchEvent(inputEvent);
          //  setCurrentGBSNo(resp.data.sOldGreenBKNo);
          //  setPreviousGBSNo(resp.data.sFstGreenBkNo);
         }
         else{
           setName('');
           setFname('');
           console.log("Not found" , resp);
           setAlertMessage(`No record found for GB Id: ${gbid}.` );
           setAlertType('error');
           snackbarOpen();
         }
       })
       .catch((error) => {
         setName('');
         setName('');
         console.log(error);
       });
     };

  console.log(props.selectData);
  const [authorityData,setAuthoritData]= React.useState(props.selectData['authRegions']);
  const [typeIssuedData,settypeIssuedData]= React.useState(props.selectData['typeIssued']);

  const [formNumber, setFormNumber] = React.useState(props.selectData['nFormNumber']);
  const [id, setId] = React.useState(0);
  const [madebType,setMadebType]= React.useState(5);
  const [authRegionID, setAuthRegionId] = React.useState(0);
  const [receivedDate, setReceivedDate] = React.useState('');
  const [name, setName] = React.useState('');
  const [gbId, setGbId] = useState('');
  const [fname, setFname] = React.useState('');
  const [saney, setSaney] = React.useState();
  const [currentGBSno, setCurrentGBSNo] = useState(null);
  const [previousGBSno, setPreviousGBSNo] = useState(null);

  let valueAuthRegion = [];
  let valueTypeIssued = [];
  const madeb = {
    id:id,
    nMadebTypeID: madebType,
    nFormNumber: formNumber, 
    dtReceived: receivedDate,
    nAuthRegionID:authRegionID , 
    sName: name,
    sGBID: gbId,
    sFathersName:fname,
    nSaneyFormNo:saney,
    nCurrentGBSno: currentGBSno,
    nPreviousGBSno: previousGBSno
 }
 const btnstyles = {background:'none', border:'none', cursor: 'pointer', color: 'blue'};
console.log("Madeb Object in Add dialog", madeb);

 // const idsAuthRegion = authorityData.map((data) => data.sAuthRegion);
  //const childrenAuthRegion =  () => { 
   // return (idsAuthRegion.filter((data, index, array) => (array.indexOf(data) == index)).map((filteredData) =>  (<option value={filteredData}>{filteredData}</option>)))};
//   const childrenAuthRegion =  () => { 
//   return (authorityData.map((data) => (<option value={data.id}>{data.sAuthRegion}</option> )  ))};  
//    const optsAuthRegion = childrenAuthRegion();

//   const childrenTypeIssued =  () => { 
//     return (typeIssuedData.map((data) =>  (<option value={data.id}>{data.sTypeIssued}</option>)))};
//   const optsTypeIssued = childrenTypeIssued();
 
  return (
    <Dialog open={props.addModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Book Full Madeb</DialogTitle>
      <form onSubmit={handleSubmit(handleSnackBarSubmit)}>
      <DialogContent>
        <DialogContentText>
        <div>
                           
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="number"
                                            label="Form Number"
                                            type="number"
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            value={formNumber}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                          id="dtDate"
                                          name="dtDate"
                                          label="Received Date"
                                          type="date"
                                          defaultValue={receivedDate}
                                          className={props.classes.textField}
                                          InputLabelProps={{
                                              shrink: true,
                                          }}
                                          onChange={(e) => { setReceivedDate(e.target.value) }}
                                          inputRef={register({
                                            required: true
                                          })}
                                        />
                                        {_.get("dtDate.type", errors) === "required" && (
                                          <span style={{color: 'red'}}>This field is required</span>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                    <Autocomplete
                                      openOnFocus
                                      clearOnEscape
                                      onChange={  
                                        (e, value) => {
                                          if (value !== null) {
                                            console.log(value.id);
                                            setAuthRegionId(value.id);
                                          }
                                          else {
                                            setAuthRegionId(0);
                                          }
                                        }
                                      }
                                     //value={valueAuthRegion} 
                                     id="id_nAuthorityId"
                                     name="authority"
                                     options={authorityData}
                                     autoHighlight
                                     getOptionLabel={(option) => option.sAuthRegion}
                                     renderOption={(option) => (
                                       <React.Fragment>
                                         <span>{option.sAuthRegion}</span>
                                       </React.Fragment>
                                     )}
                                     renderInput={(params) => (
                                       <TextField
                                         {...params}
                                         label="Authority"
                                         variant="standard"
                                         inputRef={register({
                                          required: true
                                        })}
                                        name="text_authority"
                                         inputProps={{
                                           ...params.inputProps,
                                           autoComplete: 'new-password', // disable autocomplete and autofill
                                         }}
                                         
                                         
                                        />
                                      )}
                                      
                                      
                                      />
                                      {_.get("text_authority.type", errors) === "required" && (
                                         <span style={{color: 'red'}}>This field is required</span>
                                      )}
                                    
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                          id="sGBID"
                                          label="sGBID"
                                          //required={true}
                                          name="sGBID"
                                          value={gbId}
                                          onChange={(e) => { handleChangeGBID(e.target.value) }}
                                          //onBlur={(e) => {formPopulate(e.target.value)}}
                                          inputRef={register({
                                            required: true
                                          })}
                                        />
                                        {_.get("sGBID.type", errors) === "required" && (
                                          <span style={{color: 'red'}}>This field is required</span>
                                        )}
                                        
                                        
                                    </FormControl>
                                    <button type='button' style={btnstyles} onClick={() => formPopulate(gbId)}>Get Details</button>

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                          id="sName"
                                          label="Name"
                                          name="sName"
                                          //required={true}
                                          value={name}
                                          onChange={(e) => { setName(e.target.value) }}
                                          inputRef={register({
                                            required: true
                                          })}
                                        />
                                        {_.get("sName.type", errors) === "required" && (
                                          <span style={{color: 'red'}}>This field is required</span>
                                        )}
                                        
                                    </FormControl>
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="fname"
                                            label="Father's Name"
                                            value={fname}
                                            onChange={(e) => { setFname(e.target.value) }}
                                        />
                                    </FormControl>
                                </Grid>
                                
                                
                                <Grid item xs={12} sm={6}>

                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="sfn"
                                            label="Saney Form No"
                                            type='number'
                                            value={saney}
                                            onChange={(e) => { 
                                                setSaney(parseInt(e.target.value));
                                                console.log("Value of saney changed to:", parseInt(e.target.value));
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                      <TextField
                                        id="nCurrentGBSno"
                                        label="Current GB SNo."
                                        type='number'
                                        name='nCurrentGBSno'
                                        //required={true}
                                        value={currentGBSno}
                                        onChange={(e) => { 
                                          setCurrentGBSNo(parseInt(e.target.value));
                                          console.log("Value of currentGB changed to:", parseInt(e.target.value));
                                        }}
                                        inputRef={register({
                                          required: true
                                        })}
                                      />
                                      {_.get("nCurrentGBSno.type", errors) === "required" && (
                                        <span style={{color: 'red'}}>This field is required</span>
                                      )}
                                       
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="nPreviousGBSno"
                                            label="Previous GB SNo"
                                            type='number'
                                            name='nPreviousGBSno'
                                            //required={true}
                                        value={previousGBSno}
                                        onChange={(e) => { 
                                            setPreviousGBSNo(parseInt(e.target.value));
                                            console.log("Value of previousGB changed to:", parseInt(e.target.value));
                                        }}
                                        />
                                    </FormControl>
                                </Grid>
                                { snackbar && <Alerts
                                   alertObj={alertObj}
                                  snackbar={snackbar}
                                  snackbarClose={snackbarClose}
                                  /> 
                                }
                                
                            </Grid>
                        </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleAddClickClose} color="primary">Cancel</Button>

       {/* <Button  type='submit' onClick={handleSubmit} color="primary">Save</Button> */}
     
        {/* <Snackbar open={snackbarOpen} autoHideDuration={3000}  onClose={snackbarClose} >
        <Alert  onClose={snackbarClose} severity={alertType}  >
         {message}
        </Alert>
      </Snackbar> */}

        <Button type="submit" color="primary">Save</Button> 
      </DialogActions>
      </form>
    </Dialog>
);

}
