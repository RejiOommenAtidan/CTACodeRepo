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

   const [authorityData,setAuthoritData]= React.useState(props.selectData['authRegions']);
   const [madebData,setMadebData]= React.useState(props.selectData['madebTypes']);
   const [typeIssuedData,setTypeIssuedData]= React.useState(props.selectData['typeIssued']);
   
   const [formNumber, setFormNumber] = React.useState(props.editObj['sFormNumber']);
   const [id, setId] = React.useState(props.editObj['id']);
   const [madebType,setMadebType]= React.useState(props.editObj['nMadebTypeId']);
   const [authorityId, setAuthorityId] = React.useState(props.editObj['nAuthRegionId']);
   const [issuedDate, setIssuedDate] = React.useState(props.editObj.dtIssuedDate ? (props.editObj.dtIssuedDate).split('T')[0] : undefined);
   const [enteredDate, setEnteredDate] = React.useState(props.editObj.dtEntered ? (props.editObj.dtEntered).split('T')[0] : undefined);
   const [gbId, setGbId] = React.useState(parseInt(props.editObj['nGBId']));
   const [issuedOrNotId, setIssuedOrNotId] = React.useState(props.editObj['nTypeIssuedId']);
   const [printed, setPrinted] = React.useState(props.editObj['nPrinted']);
   const [remarks, setRemarks] = React.useState(props.editObj['sRemarks']);
   const editObj ={
     id:id,
     sFormNumber: formNumber, 
     nMadebTypeId: madebType,
     nTypeIssuedId: issuedOrNotId,
     nGBId : gbId,
     dtIssuedDate:issuedDate,
     nAuthRegionId:authorityId , 
     nPrinted:printed,
     sRemarks:remarks
  
   }
   
  
 
   let valueAuthRegion =[];
   authorityData.forEach(element => {
   
   if(element.id === authorityId){
       valueAuthRegion = element;
   }
 });
 
   let valueTypeIssued =[];
   typeIssuedData.forEach(element => {
    
    if(element.id === issuedOrNotId){
       valueTypeIssued = element;
    }
  });
  let valueMadebType =[];
  madebData.forEach(element => {
   
   if(element.id === madebType){
     valueMadebType = element;
   }
 });
   return (
  <>
 
   {
  <Dialog open={props.editModal} aria-labelledby="form-dialog-title">
       <DialogTitle id="form-dialog-title">Edit Issue Book Record</DialogTitle>
       <form>
       <DialogContent>
         <DialogContentText>
         <div>
                            
                             <Grid container spacing={3}>
                                
                                 <Grid item xs={12} sm={6}>
                                     <FormControl className={props.classes.formControl}>
                                         <TextField
                                             id="date"
                                             label="Issued Date"
                                             type="date"
                                             defaultValue={issuedDate}
                                             className={props.classes.textField}
                                             InputLabelProps={{
                                                 shrink: true,
                                             }}
                                             onChange={(e) => { setIssuedDate(e.target.value) }}
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
                                             setMadebType(value.id);
                                         }
                                         else {
                                             setMadebType(0);
                                         }
                                         }
                                     }
                                    value={valueMadebType} 
                                     
                                     id="id_madebType"
                                     options={madebData}
                   
                                     autoHighlight
                                     getOptionLabel={(option) => option.sMadebDisplayName}
                                     renderOption={(option) => (
                                         <React.Fragment>
                                         <span>{option.sMadebDisplayName}</span>
                                         </React.Fragment>
                                     )}
                                     renderInput={(params) => (
                                         <TextField
                                         {...params}
                                         label="Why"
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
                                         label="Where"
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
                                     <Autocomplete
                                     openOnFocus
                                     clearOnEscape
                                     onChange={  
                                         (e, value) => {
                                         if (value !== null) {
                                             console.log(value.id);
                                             setIssuedOrNotId(value.id);
                                         }
                                         else {
                                             setIssuedOrNotId(0);
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
                                             id="remarks"
                                             label="Remarks"
                                             multiline
                                             rows={4}
                                             InputProps={{
                                                 readOnly: false,
                                             }}
                                             value={remarks}
                                             onChange={(e) => { setRemarks(e.target.value) }}
 
                                         />
                                     </FormControl>
                                 </Grid>
                             </Grid>
                         </div>
         </DialogContentText>
       </DialogContent>
       <DialogActions>
            <Button onClick={() =>props.editModalClose()} color="primary">Cancel</Button>
 
    
      
      
 
         <Button onClick={() => props.editAPICall(editObj)} color="primary">Save</Button> 
       </DialogActions>
       </form>
     </Dialog> }
  </>
   );
 
 }
 



export const SaveDialog = (props) => {
   console.log('dialog');
  console.log(props.selectData);
  console.log(props.saveObj);
  const [authorityData,setAuthoritData]= React.useState(props.selectData['authRegions']);
  const [madebData,setMadebData]= React.useState(props.selectData['madebTypes']);
  const [typeIssuedData,setTypeIssuedData]= React.useState(props.selectData['typeIssued']);
  const [formNumber, setFormNumber] = React.useState(props.saveObj['nFormNumber'].toString());
  const [id, setId] = React.useState(props.saveObj['id']);
  const [madebType,setMadebType]= React.useState(props.saveObj['nMadebTypeID']);
  const [authorityId, setAuthorityId] = React.useState(props.saveObj['nAuthRegionID']);
  const [receivedDate, setReceivedDate] = React.useState(props.saveObj.dtReceived ? (props.saveObj.dtReceived).split('T')[0] : undefined);
  const [gbId, setGbId] = React.useState(parseInt(props.saveObj['sGBID']));
  const [issuedOrNotId, setIssuedOrNotId] = React.useState(props.saveObj['nIssuedOrNotID'] == 0  ?  1 : props.saveObj['nIssuedOrNotID']);

  const [printed, setPrinted] = React.useState(0);
  const [remarks, setRemarks] = React.useState('');
  const saveObj ={

    sFormNumber: formNumber.toString(), 
    nMadebTypeId: madebType,
    nTypeIssuedId: issuedOrNotId,
    nGBId : gbId,
    dtIssuedDate:receivedDate,
    nAuthRegionId:authorityId , 
    nPrinted:printed,
    sRemarks:remarks
 
  }
  const changeObj ={
    id:id,
    nIssuedOrNotID: 2
  }
 

  let valueAuthRegion =[];
  authorityData.forEach(element => {
  
  if(element.id === authorityId){
      valueAuthRegion = element;
  }
});

  let valueTypeIssued =[];
  typeIssuedData.forEach(element => {
   
   if(element.id === issuedOrNotId){
      valueTypeIssued = element;
   }
 });
 let valueMadebType =[];
 madebData.forEach(element => {
  
  if(element.id === madebType){
    valueMadebType = element;
  }
});
  return (
 <>

  {
 <Dialog open={props.saveModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Save Issue Book</DialogTitle>
      <form>
      <DialogContent>
        <DialogContentText>
        <div>
                           
                            <Grid container spacing={3}>
                               
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="date"
                                            label="Issued Date"
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
                                            setMadebType(value.id);
                                        }
                                        else {
                                            setMadebType(0);
                                        }
                                        }
                                    }
                                   value={valueMadebType} 
                                    
                                    id="id_madebType"
                                    options={madebData}
                  
                                    autoHighlight
                                    getOptionLabel={(option) => option.sMadebDisplayName}
                                    renderOption={(option) => (
                                        <React.Fragment>
                                        <span>{option.sMadebDisplayName}</span>
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="Why"
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
                                        label="Where"
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
                                    <Autocomplete
                                    openOnFocus
                                    clearOnEscape
                                    onChange={  
                                        (e, value) => {
                                        if (value !== null) {
                                            console.log(value.id);
                                            setIssuedOrNotId(value.id);
                                        }
                                        else {
                                            setIssuedOrNotId(0);
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
                                            id="remarks"
                                            label="Remarks"
                                            multiline
                                            rows={4}
                                            InputProps={{
                                                readOnly: false,
                                            }}
                                            value={remarks}
                                            onChange={(e) => { setRemarks(e.target.value) }}

                                        />
                                          
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
           <Button onClick={() => props.saveModalClose()} color="primary">Cancel</Button>

   
     
     

        <Button onClick={() => props.saveAPICall(saveObj,changeObj)} color="primary">Save</Button> 
      </DialogActions>
      </form>
    </Dialog> }
 </>
  );

}
