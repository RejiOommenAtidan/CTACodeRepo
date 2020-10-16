import React, { useEffect, useState } from 'react';

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
  Select,
  TextareaAutosize
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
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import axios from 'axios';
import {Alerts} from '../../alerts';




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


  
export const EditDialog = (props) => {
  //debugger
  const [snackbarOpen,setSnackbarOpen]=React.useState(false);
  const snackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };
  const handleSubmit = () =>{
    setMessage("Record Successfully Edited");
    setAlertType('success');
    setSnackbarOpen(true)
  }
  const [message,setMessage]=React.useState('');
  const [alertType,setAlertType]=React.useState('');

  const [authorityData,setAuthoritData]= React.useState(props.selectData['authRegions']);
  const [typeIssuedData,settypeIssuedData]= React.useState(props.selectData['typeIssued']);



  const [id, setId] = React.useState(props.norchoeObj.id);
  const [formNumber, setFormNumber] = React.useState(props.norchoeObj.nFormNumber);
  const [authRegionID, setAuthorityId] = React.useState(props.norchoeObj.nAuthRegionID);
  const [receivedDate, setReceivedDate] = React.useState(props.norchoeObj.dtReceived ? (props.norchoeObj.dtReceived).split('T')[0] : undefined);
  const [name, setName] = React.useState(props.norchoeObj.sName);
  const [sGBID, setGbId] = React.useState(props.norchoeObj.sGBID);
  const [receipt, setReceipt] = React.useState(props.norchoeObj.nReceiptNo);
  const [sChangeField, setChangeField] = React.useState(props.norchoeObj.sChangeField);
  const [madebType,setMadebType]= React.useState(2);
  const [documents, setDocument] = React.useState(props.norchoeObj.sDocumentAttached);
  const [issueActionDate, setIssueActionDate] = React.useState(props.norchoeObj.dtIssueAction ? (props.norchoeObj.dtIssueAction).split('T')[0] : undefined);
  const [issueAction, setIssueAction] = React.useState(props.norchoeObj.nIssuedOrNotID);
  const [returnDate, setReturnDate] = React.useState(props.norchoeObj.dtReturnEmail ? (props.norchoeObj.dtReturnEmail).split('T')[0] : undefined);
  //const [rejectDate, setRejectDate] = React.useState(props.norchoeObj.dtReject.split('T')[0]);
  const [rejectDate, setRejectDate] = React.useState(props.norchoeObj.dtReject ? (props.norchoeObj.dtReject).split('T')[0] : undefined);
  const madeb = {
    id:id,
    nFormNumber: formNumber, 
    nMadebTypeID: madebType,
    sName: name,
    sGBID:sGBID,
    sChangeField:sChangeField,
    
    nAuthRegionID:authRegionID , 
    dtReceived:receivedDate,  
    nReceiptNo:receipt,
    dtIssueAction:issueActionDate,
    nIssuedOrNotID:issueAction,
    sDocumentAttached:documents,
  
    dtReturnEmail:returnDate,
    dtReject:rejectDate


 }


    let valueAuthRegion =[];
    authorityData.forEach(element => {
    if(element.id === authRegionID){
        valueAuthRegion = element;
        console.log(valueAuthRegion);
    }
    
  });


    let valueTypeIssued =[];
   // console.log(issueAction);
    typeIssuedData.forEach(element => {
     if(element.id === issueAction){
        valueTypeIssued = element;
        console.log(element);
     }
     
   });

  return (
      
      

    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit norchoe Madeb</DialogTitle>
      <form onSubmit={handleSubmit}>
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
                                                readOnly: false,
                                            }}
                                            value={formNumber}
                                            onChange={(e) => { setFormNumber(e.target.value) }}

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="date"
                                            label="Received Date"
                                            type="date"
                                            defaultValue={receivedDate}
                                            className={props.classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) => { setReceivedDate(e.target.value) }}
                                        />
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
                                    options={authorityData}
                                  /*  classes={{
                                        option: classes.option,
                                    }}
                                    className={classes.textField}*/
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
                                          id="sGBID"
                                          label="GBID"
                                          //required={true}
                                          name="sGBID"
                                          value={sGBID}
                                          onChange={(e) => { setGbId(e.target.value) }}
                                          //onBlur={(e) => {formPopulate(e.target.value)}}
                                
                                        />

                                        
                                        
                                    </FormControl>
                                    {/*<button type='button' style={btnstyles} onClick={() => formPopulate(sGBID)}>Get Details</button>*/}

                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="name"
                                            label="Name"
                                           
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="sChangeField"
                                            label="Change Field"
                                            name="sChangeField"
                                            value={sChangeField}
                                            onChange={(e) => { setChangeField(e.target.value) }}
                                        />
                                    </FormControl>
                                </Grid>
                               
                                <Grid item xs={12} sm={6}>

                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="da"
                                            label="Document attached"
                                            value={documents}
                                            onChange={(e) => { setDocument(e.target.value) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="receipt"
                                           label="Receipt Number"
                                           
                                           type="number"
                                           name='receipt'
                                      
                                          value={receipt}
                                           
                                          
                                           onChange={(e) => { setReceipt(parseInt(e.target.value)) }}

                                       />
                                 
                                         
                                   </FormControl>
                               </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="date"
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
                                    
                                    id="id_nIssuedOrNotId"
                                    options={typeIssuedData}
                                  /*  classes={{
                                        option: classes.option,
                                    }}
                                    className={classes.textField}*/
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
                                        label="Issue Action"
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
                                            id="date"
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
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="date"
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

        <Button onClick={() => props.editAPICall(madeb)} color="primary">Save</Button> 
      </DialogActions>
      </form>
    </Dialog>
);


}



export const AddDialog = (props) => {
  //console.log(props.selectData);
  // SnackBar Alerts 

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj={
    alertMessage:alertMessage,
    alertType:alertType
  }
  const btnstyles = {background:'none', border:'none', cursor: 'pointer', color: 'blue'};

  const handleChangeGBID = (value) => {
    setGbId(value);
    setName('');
  //  setFname('');
  }

  const formPopulate = (value) => {
    debugger
    console.log("Value in GBID: ", value);
    const gbid = value;
    const sNameElement = document.getElementById("name");
    axios.get(`Greenbook/GetBasicDetailsFromGBID/?sGBID=`+ gbid)
       .then(resp => {
         if (resp.status === 200) {
           console.log("Got gb record\n", resp.data);
           console.log("Name Element:" , sNameElement);
           const name = resp.data.greenBook.sFirstName ? resp.data.greenBook.sFirstName : '';
           const mname = resp.data.greenBook.sMiddleName ? resp.data.greenBook.sMiddleName : '';
           const lname = resp.data.greenBook.sLastName ? resp.data.greenBook.sLastName : '';
           setName( `${name} ${mname} ${lname}`);
           const region = authorityData.find((x) => x.sAuthRegion === resp.data.sAuthRegion)
           
            setAuthRegion(region);


           //sNameElement.value=`${name} ${mname} ${lname}`;
           var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype, "value").set;
          nativeInputValueSetter.call(sNameElement, `${name} ${mname} ${lname}`);
          var inputEvent = new Event("input", { bubbles: true });
          
          // setFname(resp.data.sFathersName);
          sNameElement.dispatchEvent(inputEvent);
          
         }
         else{
           setName('');
          //  setFname('');
           console.log("Not found" , resp);
           setAlertMessage(`No record found for GB Id: ${gbid}.` );
           setAlertType('error');
           //snackbarOpen();
         }
       })
       .catch((error) => {
         setName('');
         
         console.log(error);
       });
     };

  const [authorityData,setAuthoritData]= React.useState(props.selectData['authRegions']);


  const [formNumber, setFormNumber] = React.useState(props.selectData['nFormNumber']);
  const [id, setId] = React.useState(0);
  const [madebType,setMadebType]= React.useState(2);
  const [nAuthRegionID, setAuthRegionId] = React.useState(0);
  const [receivedDate, setReceivedDate] = React.useState(new Date(Date.now()).toISOString().substring(0,10));
  const [sGBID, setGbId] = React.useState('');
  const [receipt, setReceipt] = React.useState(0);
  const [sChangeField, setChangeField] = React.useState('');
  const [name, setName] = React.useState('');
  const [authRegion, setAuthRegion] = React.useState([]);
  
  const [documents, setDocument] = React.useState('');


  const madeb = {
     nFormNumber: formNumber, 
     nMadebTypeID: madebType,
     sName: name,
     sGBID,   
     nAuthRegionID,
     dtReceived:receivedDate,  
     sChangeField:sChangeField,
     sDocumentAttached:documents,
     nReceiptNo:receipt,
     nIssuedOrNotID:1,  
  }
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    props.addAPICall(madeb);
  };

 
  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Madeb Entry Form For Fresh Issue</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <DialogContentText>
        <div>
                           
                           <Grid container spacing={3}>
                               <Grid item xs={12} sm={6}>
                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="form_number"
                                           label="Form Number"
                                           
                                           type="number"
                                           name='form_number'
                                           inputRef={register({
                                            required: true,
                                            min:0
                                          })}
                                           InputProps={{
                                               readOnly: false,
                                           }}
                                           value={formNumber}
                                           onChange={(e) => { setFormNumber(parseInt(e.target.value)) }}

                                       />
                                           {_.get("form_number.type", errors) === "required" && (
                                                <span style={{color: 'red'}}>This field is required</span>
                                            )}
                                            {/*_.get("form_number.type", errors) === "maxLength" && (
                                                <p>First name cannot exceed 20 characters</p>
                                            )*/}
                                         
                                   </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>
                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="id_receivedDate"
                                           label="Received Date"
                                           type="date"
                                           name="name_receivedDate"
                                           defaultValue={receivedDate}
                                           inputRef={register({
                                            required: true
                                          })}
                                           onChange={(e) => { setReceivedDate(e.target.value) }}
                                           className={props.classes.textField}
                                           InputLabelProps={{
                                               shrink: true,
                                           }}
                                       />
                                        {_.get("name_receivedDate.type", errors) === "required" && (
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
                                            setAuthRegion(value);
                                        }
                                        else {
                                          setAuthRegionId(0);
                                        }
                                        }
                                    }
                                    value = {authRegion}
                                    inputRef={register({
                                        required: true
                                      })}
                                    id="id_nAuthorityId"
                                    options={authorityData}
                                  /*  classes={{
                                        option: classes.option,
                                    }}
                                    className={classes.textField}*/
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
                                          name="name_authority"
                                        inputProps={{
                                            ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                              }}
                            />
                            
                          )}
                        />  {_.get("name_authority.type", errors) === "required" && (
                            <span style={{color: 'red'}}>This field is required</span>
                        )}
                                   </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                          id="sGBID"
                                          label="GBID"
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
                                           id="name"
                                           label="Name"
                                           
                                           name='name'
                                           inputRef={register({
                                            required: true
                                          })}
                                       onChange={(e) => { setName(e.target.value) }}
                                       />
                                       {_.get("name.type", errors) === "required" && (
                                            <span style={{color: 'red'}}>This field is required</span>
                                        )}
                                    
                                    </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>

                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="sChangeField"
                                           label="Change Field"
                                           name="sChangeField"
                                           
                                           inputRef={register({
                                            required: true,
                                          })}
                                       //value='Aayush Pandya'
                                       onChange={(e) => { setChangeField(e.target.value) }}
                                       />
                                          {_.get("sChangeField.type", errors) === "required" && (
                                            <span style={{color: 'red'}}>This field is required</span>
                                        )}
                                   
                                   </FormControl>
                               </Grid>
                             
                               <Grid item xs={12} sm={6}>

                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="da"
                                           label="Document attached"
                                           
                                           name="name_da"
                                       //value='Aayush Pandya'
                                       inputRef={register({
                                        required: true
                              
                                      })}
                                       onChange={(e) => { setDocument(e.target.value) }}
                                       />
                                       {_.get("name_da.type", errors) === "required" && (
                                                <span style={{color: 'red'}}>This field is required</span>
                                            )}
                                        
                                   </FormControl>
                               </Grid>

                               <Grid item xs={12} sm={6}>
                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="receipt"
                                           label="Receipt Number"
                                           
                                           type="number"
                                           name='receipt'
                                           inputRef={register({
                                            required: true,
                                            min:0
                                          })}
                                           
                                          
                                           onChange={(e) => { setReceipt(parseInt(e.target.value)) }}

                                       />
                                           {_.get("receipt.type", errors) === "required" && (
                                                <span style={{color: 'red'}}>This field is required</span>
                                            )}
                                            {/*_.get("form_number.type", errors) === "maxLength" && (
                                                <p>First name cannot exceed 20 characters</p>
                                            )*/}
                                         
                                   </FormControl>
                               </Grid>
                              
                             
                            
                           </Grid>
                       </div>

        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleAddClickClose} color="primary">Cancel</Button>
        
      
       <Button type="submit"  color="primary">Save</Button>
      </DialogActions>
      </form>
    </Dialog>
  );

}
