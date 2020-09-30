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
  console.log("Hello from Edit Dialog");
  const { register, handleSubmit, watch, errors } = useForm();


  console.log(props.gbSerialObj);
  const [snackbarOpen,setSnackbarOpen]=React.useState(false);
  const snackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };
  const handleSubmitEditRecord = () =>{
    props.editAPICall(gbSerialObj);
    
      // setMessage("Record Successfully Edited");
    // setAlertType('success');
    // setSnackbarOpen(true)
  }
  const [message,setMessage]=React.useState('');
  const [alertType,setAlertType]=React.useState('');

  const [authRegions, setAuthRegionData]= React.useState(props.selectData['authRegions']);
  const [madebTypes, setMadebTypesData]= React.useState(props.selectData['madebTypes']);
  const [countries, setCountriesData] = React.useState(props.selectData['countries']);

  const [id, setId] = React.useState(props.gbSerialObj.id);
  const [nBookNo, setBookNo] = useState(props.gbSerialObj.nBookNo);
  const [sGBID, setGbId] = useState(props.gbSerialObj.sGBID);
  const [remarks, setRemarks] = React.useState(props.gbSerialObj.remarks);
  const [dtDate, setDate] = React.useState((props.gbSerialObj.dtDate) ? props.gbSerialObj.dtDate.split('T')[0] : undefined);
  const [sName, setName] = React.useState(props.gbSerialObj.sName);
  const [sCountryID, setCountryID] = React.useState(props.gbSerialObj.sCountryID);
  const [nMadebTypeId, setMadebTypeId] = React.useState(props.gbSerialObj.nMadebTypeId);
  const [nFormNumber, setFormNumber] = React.useState(props.gbSerialObj.nFormNumber);
  const [nAuthRegionId, setAuthRegionId] = React.useState(props.gbSerialObj.nAuthRegionId);

  const gbSerialObj = {
    id,
    nBookNo,
    sGBID,
    remarks,
    dtDate,
    //sName,
    sCountryID,
    nMadebTypeId,
    nFormNumber,
    nAuthRegionId
  }
  console.log("gbSerialObj Object received in dialog", gbSerialObj);

  let valueAuthRegion = [];
 
 authRegions.forEach(element => {
    if(element.id === nAuthRegionId){
        valueAuthRegion = element;
    }
  });
  
  let valueMadebTypes = [];
  console.log(nMadebTypeId);
  madebTypes.forEach(element => {
    if(element.id === nMadebTypeId){
      valueMadebTypes = element;
    }
  });

  let valueCountryName = [];
  console.log("Country list\n", countries);
  countries.forEach(element => {
    if(element.sCountryID === sCountryID){
      valueCountryName = element;
    }
  });

  return (
    <Dialog open={props.editModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit GreenBook Serial Number</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
      <DialogContent>
        <DialogContentText>
        <div>
                            <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="dtDate"
                                            name="dtDate"
                                            label="Date"
                                            type="date"
                                            defaultValue={dtDate}
                                            className={props.classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) => { setDate(e.target.value) }}
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
                                    <TextField
                                      id="nBookNo"
                                      name="nBookNo"
                                      label="Book Serial No"
                                      type='number'
                                      value={nBookNo}
                                      onChange={(e) => { 
                                        setBookNo(parseInt(e.target.value));
                                          console.log("Value of Book Serial number changed to:", parseInt(e.target.value));
                                      }}
                                      InputProps={{
                                        readOnly: true
                                      }}
                                      inputRef={register({
                                        required: true
                                      })}
                                    />
                                    {_.get("nBookNo.type", errors) === "required" && (
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
                                        InputProps={{
                                          readOnly: true
                                        }}
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
                                    <Autocomplete
                                      openOnFocus
                                      clearOnEscape
                                      onChange={  
                                        (e, value) => {
                                          if (value !== null) {
                                            console.log("Value in Country id:", value.sCountryID);
                                            setCountryID(value.sCountryID);
                                          }
                                          else {
                                            setCountryID('');
                                          }
                                        }
                                      }
                                     value={valueCountryName} 
                                     id="id_sCountryID"
                                     options={countries}
                                     autoHighlight
                                     getOptionLabel={(option) => option.sCountry}
                                     renderOption={(option) => (
                                       <React.Fragment>
                                         <span>{option.sCountry}</span>
                                       </React.Fragment>
                                     )}
                                     renderInput={(params) => (
                                       <TextField
                                         {...params}
                                         label="Country"
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



                                {/* <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="sCountryID"
                                            label="Country ID"
                                            value={sCountryID}
                                            onChange={(e) => { setCountryID(e.target.value) }}
                                        />
                                    </FormControl>
                                </Grid> */}

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
                                    <Autocomplete
                                      openOnFocus
                                      clearOnEscape
                                      onChange={  
                                        (e, value) => {
                                          if (value !== null) {
                                            console.log(value.id);
                                            setMadebTypeId(value.id);
                                          }
                                          else {
                                            setMadebTypeId(0);
                                          }
                                        }
                                      }
                                     value={valueMadebTypes} 
                                     id="id_nMadebTypeId"
                                     options={madebTypes}
                                     autoHighlight
                                     getOptionLabel={(option) => option.sMadebType}
                                     renderOption={(option) => (
                                       <React.Fragment>
                                         <span>{option.sMadebType}</span>
                                       </React.Fragment>
                                     )}
                                     renderInput={(params) => (
                                       <TextField
                                         {...params}
                                         label="Madeb Type"
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
                                            id="nFormNumber"
                                            label="Form Number"
                                            type="number"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            value={nFormNumber}
                                            onChange={(e) => { setFormNumber(parseInt(e.target.value)) }}

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
                                            setAuthRegionId(value.id);
                                          }
                                          else {
                                            setAuthRegionId(0);
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
                                         label="Authority Region"
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
                                            id="remarks"
                                            name="remarks"
                                            label="Remarks"
                                            type='text'
                                            value={remarks}
                                            onChange={(e) => { 
                                                setRemarks(e.target.value);
                                                console.log("Value of remarks changed to:", e.target.value);
                                            }}
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

  console.log("Hello from Add dialog");


  const { register, handleSubmit, watch, errors } = useForm();


  console.log(props.gbSerialObj);
  const [snackbarOpen,setSnackbarOpen]=React.useState(false);
  const snackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };
  const handleSubmitEditRecord = () =>{
    props.addAPICall(gbSerialObj);
    
      // setMessage("Record Successfully Edited");
    // setAlertType('success');
    // setSnackbarOpen(true)
  }
  const [message,setMessage]=React.useState('');
  const [alertType,setAlertType]=React.useState('');

  const [authRegions, setAuthRegionData]= React.useState(props.selectData['authRegions']);
  const [madebTypes, setMadebTypesData]= React.useState(props.selectData['madebTypes']);
  const [countries, setCountriesData] = React.useState(props.selectData['countries']);

  const [id, setId] = React.useState(0);
  const [nBookNo, setBookNo] = useState(props.selectData['nBookNo']);
  const [sGBID, setGbId] = useState('');
  const [remarks, setRemarks] = React.useState('');
  const [dtDate, setDate] = React.useState('');
  const [sName, setName] = React.useState('');
  const [sCountryID, setCountryID] = React.useState('');
  const [nMadebTypeId, setMadebTypeId] = React.useState(0);
  const [nFormNumber, setFormNumber] = React.useState(0);
  const [nAuthRegionId, setAuthRegionId] = React.useState(0);

  const gbSerialObj = {
    id,
    nBookNo,
    sGBID,
    remarks,
    dtDate,
    //sName,
    sCountryID,
    nMadebTypeId,
    nFormNumber,
    nAuthRegionId
  }
  console.log("gbSerialObj Object received in Add dialog", gbSerialObj);

  let valueAuthRegion = [];
 
 authRegions.forEach(element => {
    if(element.id === nAuthRegionId){
        valueAuthRegion = element;
    }
  });
  
  let valueMadebTypes = [];
  console.log(nMadebTypeId);
  madebTypes.forEach(element => {
    if(element.id === nMadebTypeId){
      valueMadebTypes = element;
    }
  });

  let valueCountryName = [];
  console.log("Country list\n", countries);
  countries.forEach(element => {
    if(element.sCountryID === sCountryID){
      valueCountryName = element;
    }
  });

  return (
    <Dialog open={props.addModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Green Book Serial Number</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
      <DialogContent>
        <DialogContentText>
        <div>
                            <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="dtDate"
                                            name="dtDate"
                                            label="Date"
                                            type="date"
                                            defaultValue={dtDate}
                                            className={props.classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) => { setDate(e.target.value) }}
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
                                    <TextField
                                      id="nBookNo"
                                      name="nBookNo"
                                      label="Book Serial No"
                                      type='number'
                                      value={nBookNo}
                                      onChange={(e) => { 
                                        setBookNo(parseInt(e.target.value));
                                          console.log("Value of Book Serial number changed to:", parseInt(e.target.value));
                                      }}
                                      InputProps={{
                                        readOnly: true
                                      }}
                                      inputRef={register({
                                        required: true
                                      })}
                                    />
                                    {_.get("nBookNo.type", errors) === "required" && (
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
                                        InputProps={{
                                          readOnly: true
                                        }}
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
                                    <Autocomplete
                                      openOnFocus
                                      clearOnEscape
                                      onChange={  
                                        (e, value) => {
                                          if (value !== null) {
                                            console.log("Value in Country id:", value.sCountryID);
                                            setCountryID(value.sCountryID);
                                          }
                                          else {
                                            setCountryID('');
                                          }
                                        }
                                      }
                                     value={valueCountryName} 
                                     id="id_sCountryID"
                                     options={countries}
                                     autoHighlight
                                     getOptionLabel={(option) => option.sCountry}
                                     renderOption={(option) => (
                                       <React.Fragment>
                                         <span>{option.sCountry}</span>
                                       </React.Fragment>
                                     )}
                                     renderInput={(params) => (
                                       <TextField
                                         {...params}
                                         label="Country"
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
                                    <Autocomplete
                                      openOnFocus
                                      clearOnEscape
                                      onChange={  
                                        (e, value) => {
                                          if (value !== null) {
                                            console.log(value.id);
                                            setMadebTypeId(value.id);
                                          }
                                          else {
                                            setMadebTypeId(0);
                                          }
                                        }
                                      }
                                     value={valueMadebTypes} 
                                     id="id_nMadebTypeId"
                                     options={madebTypes}
                                     autoHighlight
                                     getOptionLabel={(option) => option.sMadebType}
                                     renderOption={(option) => (
                                       <React.Fragment>
                                         <span>{option.sMadebType}</span>
                                       </React.Fragment>
                                     )}
                                     renderInput={(params) => (
                                       <TextField
                                         {...params}
                                         label="Madeb Type"
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
                                            id="nFormNumber"
                                            label="Form Number"
                                            type="number"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            value={nFormNumber}
                                            onChange={(e) => { setFormNumber(parseInt(e.target.value)) }}

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
                                            setAuthRegionId(value.id);
                                          }
                                          else {
                                            setAuthRegionId(0);
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
                                         label="Authority Region"
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
                                            id="remarks"
                                            name="remarks"
                                            label="Remarks"
                                            type='text'
                                            value={remarks}
                                            onChange={(e) => { 
                                                setRemarks(e.target.value);
                                                console.log("Value of remarks changed to:", e.target.value);
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