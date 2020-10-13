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



  const [id, setId] = React.useState(props.sarsoObj.id);
  const [formNumber, setFormNumber] = React.useState(props.sarsoObj.nFormNumber);
  const [authRegionID, setAuthorityId] = React.useState(props.sarsoObj.nAuthRegionID);
  const [receivedDate, setReceivedDate] = React.useState(props.sarsoObj.dtReceived ? (props.sarsoObj.dtReceived).split('T')[0] : undefined);
  const [name, setName] = React.useState(props.sarsoObj.sName);
  const [fname, setFname] = React.useState(props.sarsoObj.sFathersName);
  const [saney, setSaney] = React.useState(props.sarsoObj.nSaneyFormNo);
  const [madebType,setMadebType]= React.useState(1);
  const [documents, setDocument] = React.useState(props.sarsoObj.sDocumentAttached);
  const [issueActionDate, setIssueActionDate] = React.useState(props.sarsoObj.dtIssueAction ? (props.sarsoObj.dtIssueAction).split('T')[0] : undefined);
  const [issueAction, setIssueAction] = React.useState(props.sarsoObj.nIssuedOrNotID);
  const [returnDate, setReturnDate] = React.useState(props.sarsoObj.dtReturnEmail ? (props.sarsoObj.dtReturnEmail).split('T')[0] : undefined);
  //const [rejectDate, setRejectDate] = React.useState(props.sarsoObj.dtReject.split('T')[0]);
  const [rejectDate, setRejectDate] = React.useState(props.sarsoObj.dtReject ? (props.sarsoObj.dtReject).split('T')[0] : undefined);
  const madeb = {
    id:id,
    nFormNumber: formNumber, 
    nMadebTypeID: madebType,
    sName: name,
    sFathersName:fname,
    nAuthRegionID:authRegionID , 
    dtReceived:receivedDate,  
    dtIssueAction:issueActionDate,
    nIssuedOrNotID:issueAction,
    sDocumentAttached:documents,
    nSaneyFormNo:saney,
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
      
      

    <Dialog open={props.editModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Sarso Madeb</DialogTitle>
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
                                            onChange={(e) => { setSaney(e.target.value) }}
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
  

  
  const [authorityData,setAuthoritData]= React.useState(props.selectData['authRegions']);


  const [formNumber, setFormNumber] = React.useState(props.selectData['nFormNumber']);
  const [id, setId] = React.useState(0);
  const [madebType,setMadebType]= React.useState(1);
  const [authority, setAuthority] = React.useState(0);
  const [receivedDate, setReceivedDate] = React.useState('');
  const [name, setName] = React.useState('');
  const [fname, setFname] = React.useState('');
  const [saney, setSaney] = React.useState(0);
  const [documents, setDocument] = React.useState('');


  const madeb = {
     nFormNumber: formNumber, 
     nMadebTypeID: madebType,
     sName: name,
     sFathersName:fname,
     nAuthRegionID:authority , 
     dtReceived:receivedDate,  
     nIssuedOrNotID:1,   
     sDocumentAttached:documents,
     nSaneyFormNo:saney
  }
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    props.addAPICall(madeb);
  };

 
  return (
    <Dialog open={props.addModal} aria-labelledby="form-dialog-title">
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
                                                <p>This field is required</p>
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
                                                <p>This field is required</p>
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
                                            setAuthority(value.id);
                                        }
                                        else {
                                            setAuthority(0);
                                        }
                                        }
                                    }
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
                            <p>This field is required</p>
                        )}
                                   </FormControl>
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
                                            <p>This field is required</p>
                                        )}
                                    
                                    </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>

                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="fname"
                                           label="Father's Name"
                                           name="name_fname"
                                           
                                           inputRef={register({
                                            required: true,
                                       
                                            pattern: /^[A-Za-z]+$/i
                                          })}
                                       //value='Aayush Pandya'
                                       onChange={(e) => { setFname(e.target.value) }}
                                       />
                                          {_.get("name_fname.type", errors) === "required" && (
                                            <p>This field is required</p>
                                        )}
                                       
                                        {_.get("name_fname.type", errors) === "pattern" && (
                                            <p>Alphabetical characters only</p>
                                        )}
                                   </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>

                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="saney"
                                           label="Saney Form No"
                                           type='number'

                                           onChange={(e) => { setSaney(parseInt(e.target.value)) }}
                                       
                                          name="name_saney"
                                       //value='Aayush Pandya'
                                       />
                                 
                                            
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
                                                <p>This field is required</p>
                                            )}
                                        
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
