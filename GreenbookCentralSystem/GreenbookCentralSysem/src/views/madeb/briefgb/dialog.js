import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import axios from 'axios';

import {Box, Container, Grid, Button, Typography, FormControl, TextField, InputLabel, MenuItem, Select} from '@material-ui/core';

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


  console.log(props.briefGBObj);
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

  const [authRegions,setAuthRegionData]= React.useState(props.selectData['authRegions']);
  const [typeIssuedData,setTypeIssuedData]= React.useState(props.selectData['typeIssued']);

  const [madebType,setMadebType]= React.useState(6);
  const [id, setId] = React.useState(props.briefGBObj.id);
  const [nFormNumber, setFormNumber] = React.useState(props.briefGBObj.nFormNumber);
  const [dtReceived, setReceivedDate] = React.useState((props.briefGBObj.dtReceived) ? props.briefGBObj.dtReceived.split('T')[0] : undefined);
  const [nAuthRegionID, setAuthorityId] = React.useState(props.briefGBObj.nAuthRegionID);
  
  const [sName, setName] = React.useState(props.briefGBObj.sName);
  const [sGBID, setGbId] = useState(props.briefGBObj.sGBID);
  const [sFathersName, setFname] = React.useState(props.briefGBObj.sFathersName);
  const [nReceiptNo, setReceiptNo] = React.useState(props.briefGBObj.nReceiptNo);
  const [nSaneyFormNo, setSaney] = React.useState(props.briefGBObj.nSaneyFormNo);
  const [nCurrentGBSno, setCurrentGBSNo] = useState(props.briefGBObj.nCurrentGBSno);
  const [nPreviousGBSno, setPreviousGBSNo] = useState(props.briefGBObj.nPreviousGBSno);
  const [dtIssueAction, setIssueActionDate] = React.useState(props.briefGBObj.dtIssueAction ?(props.briefGBObj.dtIssueAction).split('T')[0] : undefined);
  const [dtReject, setRejectDate] = useState(props.briefGBObj.dtReject ? (props.briefGBObj.dtReject).split('T')[0] : undefined);
  const [nIssuedOrNotID, setIssueAction] = React.useState(props.briefGBObj.nIssuedOrNotID);
  const [dtReturnEmail, setReturnDate] = React.useState(props.briefGBObj.dtReturnEmail ? (props.briefGBObj.dtReturnEmail).split('T')[0] : undefined);
  

  
  const madeb = {
    id:id,
    nMadebTypeID: madebType,
    nFormNumber,
    dtReceived,
    nAuthRegionID,
    sName,
    sGBID,
    sFathersName,
    nReceiptNo,
    nSaneyFormNo,
    nCurrentGBSno,
    nPreviousGBSno,
    dtIssueAction,
    dtReject,
    nIssuedOrNotID,
    dtReturnEmail
 }
console.log("Madeb Edit Object received in dialog", madeb);
//  const childrenAuthRegion =  () => { 
//         return (authRegions.map((data) => (<option value={data.id}>{data.sAuthRegion}</option> )  ))
//     };  
//  const optsAuthRegion = childrenAuthRegion();
 let valueAuthRegion = [];
 
 authRegions.forEach(element => {
    if(element.id === nAuthRegionID){
        valueAuthRegion = element;
    }
  });

    // const childrenTypeIssued =  () => { 
    //   return (typeIssuedData.map((data) =>  (<option value={data.id}>{data.sTypeIssued}</option>)))};
    // const optsTypeIssued = childrenTypeIssued();
    let valueTypeIssued = [];
    console.log(nIssuedOrNotID);
    typeIssuedData.forEach(element => {
     if(element.id === nIssuedOrNotID){
        valueTypeIssued = element;
     }
     
   });

  return (
    <Dialog open={props.editModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Brief GreenBook Madeb</DialogTitle>
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
                                            value={nFormNumber}
                                            onChange={(e) => { setFormNumber(e.target.value) }}

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="dtReceived"
                                            name="dtReceived"
                                            label="Received Date"
                                            type="date"
                                            defaultValue={dtReceived}
                                            className={props.classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) => { setReceivedDate(e.target.value) }}
                                            inputRef={register({
                                              required: true
                                            })}
                                          />
                                          {_.get("dtReceived.type", errors) === "required" && (
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
                                            setAuthorityId(value.id);
                                          }
                                          else {
                                            setAuthorityId(0);
                                          }
                                        }
                                      }
                                     value={valueAuthRegion} 
                                     id="id_nAuthorityId"
                                     options={authRegions}
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
                                            id="sName"
                                            name="sName"
                                        label="Name"
                                        //required={true}
                                        value={sName}
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
                                      value={sGBID}
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
                                            id="sFathersName"
                                            label="Father's Name"
                                            value={sFathersName}
                                            onChange={(e) => { setFname(e.target.value) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                  <FormControl className={props.classes.formControl}>
                                    <TextField
                                      id="nReceiptNo"
                                      name="nReceiptNo"
                                      label="Receipt No"
                                      type='number'
                                      value={nReceiptNo}
                                      onChange={(e) => { 
                                          setReceiptNo(parseInt(e.target.value));
                                          console.log("Value of Receipt changed to:", e.target.value);
                                      }}
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
                                            id="nSaneyFormNo"
                                            name="nSaneyFormNo"
                                            label="Saney Form No"
                                            type='number'
                                            value={nSaneyFormNo}
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
                                          value={nCurrentGBSno}
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
                                        value={nPreviousGBSno}
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
                                            id="dtIssueAction"
                                            name="dtIssueAction"
                                            label="Issue Action Date"
                                            type="date"
                                            defaultValue={dtIssueAction}
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
                                            id="dtReject"
                                            name="dtReject"
                                            label="Reject Date"
                                            type="date"
                                            defaultValue={dtReject}
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
                                            id="dtReturnEmail"
                                            name="dtReturnEmail"
                                            label="Return Date"
                                            type="date"
                                            defaultValue={dtReturnEmail}
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
    
    
   

    const [message,setMessage]=React.useState('');
    const [alertType,setAlertType]=React.useState('');
    const [snackbarOpen,setSnackbarOpen]=React.useState(false);
    const snackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setSnackbarOpen(false);
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
           console.log(resp);
         }
       })
       .catch((error) => {
         setName('');
         setName('');
         console.log(error);
       });
     };

  console.log(props.selectData);
  const [authRegions,setAuthRegions]= React.useState(props.selectData['authRegions']);
  const [typeIssuedData,settypeIssuedData]= React.useState(props.selectData['typeIssued']);

  const [nFormNumber, setFormNumber] = React.useState(props.selectData['nFormNumber']);
  const [id, setId] = React.useState(0);
  const [madebType, setMadebType]= React.useState(6);
  const [nAuthRegionID, setAuthRegionId] = React.useState(0);
  const [dtReceived, setReceivedDate] = React.useState('');
  const [sName, setName] = React.useState('');
  const [sGBID, setGbId] = useState('');
  const [sFathersName, setFname] = React.useState('');
  const [nReceiptNo, setReceiptNo] = React.useState(0);
  const [nSaneyFormNo, setSaney] = React.useState();
  const [nCurrentGBSno, setCurrentGBSNo] = useState();
  const [nPreviousGBSno, setPreviousGBSNo]  = useState();
  
  const madeb = {
    id:id,
    nMadebTypeID: madebType,
    nFormNumber,
    dtReceived,
    nAuthRegionID,
    sName,
    sGBID,
    sFathersName,
    nReceiptNo,
    nSaneyFormNo,
    nCurrentGBSno,
    nPreviousGBSno,
 }




  let valueAuthRegion = [];
  let valueTypeIssued = [];
  
 const btnstyles = {background:'none', border:'none', cursor: 'pointer', color: 'blue'};
  console.log("Madeb Object in Add dialog", madeb);

 // const idsAuthRegion = authRegions.map((data) => data.sAuthRegion);
  //const childrenAuthRegion =  () => { 
   // return (idsAuthRegion.filter((data, index, array) => (array.indexOf(data) == index)).map((filteredData) =>  (<option value={filteredData}>{filteredData}</option>)))};
//   const childrenAuthRegion =  () => { 
//   return (authRegions.map((data) => (<option value={data.id}>{data.sAuthRegion}</option> )  ))};  
//    const optsAuthRegion = childrenAuthRegion();

//   const childrenTypeIssued =  () => { 
//     return (typeIssuedData.map((data) =>  (<option value={data.id}>{data.sTypeIssued}</option>)))};
//   const optsTypeIssued = childrenTypeIssued();
 
  return (
    <Dialog open={props.addModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Brief GreenBook Madeb</DialogTitle>
      <form onSubmit={handleSubmit(handleSnackBarSubmit)}>
      <DialogContent>
        <DialogContentText>
        <div>
                           
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="nFormNumber"
                                            name="nFormNumber"
                                            label="Form Number"
                                            type="number"
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            value={nFormNumber}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                          id="dtReceived"
                                          name="dtReceived"
                                          label="Received Date"
                                          type="date"
                                          defaultValue={dtReceived}
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
                                     options={authRegions}
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
                                         name="authority_text"
                                         inputProps={{
                                           ...params.inputProps,
                                           autoComplete: 'new-password', // disable autocomplete and autofill
                                         }}
                                         
                                         
                                        />
                                      )}
                                      
                                      name="authority"
                                    />
                                    
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                          id="sGBID"
                                          label="sGBID"
                                          //required={true}
                                          name="sGBID"
                                          value={sGBID}
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
                                    <button type='button' style={btnstyles} onClick={() => formPopulate(sGBID)}>Get Details</button>

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                          id="sName"
                                          label="Name"
                                          name="sName"
                                          //required={true}
                                          value={sName}
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
                                            id="sFathersName"
                                            name="sFathersName"
                                            label="Father's Name"
                                            value={sFathersName}
                                            onChange={(e) => { setFname(e.target.value) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                  <FormControl className={props.classes.formControl}>
                                    <TextField
                                      id="nReceiptNo"
                                      name="nReceiptNo"
                                      label="Receipt No"
                                      type='number'
                                      value={nReceiptNo}
                                      onChange={(e) => { 
                                        setReceiptNo(parseInt(e.target.value));
                                        console.log("Value of Receipt changed to:", e.target.value);
                                      }}
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
                                            id="nSaneyFormNo"
                                            name="nSaneyFormNo"
                                            label="Saney Form No"
                                            type='number'
                                            value={nSaneyFormNo}
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
                                        value={nCurrentGBSno}
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
                                        value={nPreviousGBSno}
                                        onChange={(e) => { 
                                            setPreviousGBSNo(parseInt(e.target.value));
                                            console.log("Value of previousGB changed to:", parseInt(e.target.value));
                                        }}
                                        />
                                    </FormControl>
                                </Grid>

                                
                            </Grid>
                        </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleAddClickClose} color="primary">Cancel</Button>

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