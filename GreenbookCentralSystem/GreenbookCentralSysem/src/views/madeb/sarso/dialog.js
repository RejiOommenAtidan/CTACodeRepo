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
  const [receivedDate, setReceivedDate] = React.useState(props.sarsoObj.dtReceived.split('T')[0]);
  const [name, setName] = React.useState(props.sarsoObj.sName);
  const [fname, setFname] = React.useState(props.sarsoObj.sFathersName);
  const [saney, setSaney] = React.useState(props.sarsoObj.nSaneyFormNo);
  const [madebType,setMadebType]= React.useState(1);
  const [documents, setDocument] = React.useState(props.sarsoObj.sDocumentAttached);
  const [issueActionDate, setIssueActionDate] = React.useState(props.sarsoObj.dtIssueAction.split('T')[0]);
  const [issueAction, setIssueAction] = React.useState(props.sarsoObj.nIssuedOrNot);
  const [returnDate, setReturnDate] = React.useState(props.sarsoObj.dtReturnEmail.split('T')[0]);
  const madeb = {
      id:id,
    nFormNumber: formNumber, 
    nMadebTypeID: madebType,
    sName: name,
    sFathersName:fname,
    nAuthRegionID:authRegionID , 
    dtReceived:receivedDate,  
    dtIssueAction:issueActionDate,
    nIssuedOrNot:issueAction,
    sDocumentAttached:documents,
    nSaneyFormNo:saney,
    dtReturnEmail:returnDate


 }
 const childrenAuthRegion =  () => { 
    return (authorityData.map((data) => (<option value={data.id}>{data.sAuthRegion}</option> )  ))};  
    const optsAuthRegion = childrenAuthRegion();
    let valueAuthRegion =1;
   // console.log(authorityData);
    authorityData.forEach(element => {
    if(element.id === authRegionID){
        valueAuthRegion = element.id;
    }
    
  });

    const childrenTypeIssued =  () => { 
      return (typeIssuedData.map((data) =>  (<option value={data.id}>{data.sTypeIssued}</option>)))};
    const optsTypeIssued = childrenTypeIssued();
    let valueTypeIssued =1;
    console.log(issueAction);
    typeIssuedData.forEach(element => {
     if(element.id === issueAction){
        valueTypeIssued = element.id;
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
                                        <InputLabel id="Auth-label"> Authority</InputLabel>
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
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="name"
                                            label="Name"
                                            required={true}
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
  console.log(props.selectData);
  const [authorityData,setAuthoritData]= React.useState(props.selectData['authRegions']);
  const [typeIssuedData,settypeIssuedData]= React.useState(props.selectData['typeIssued']);

  const [formNumber, setFormNumber] = React.useState(props.selectData['nFormNumber']);
  const [id, setId] = React.useState(0);
  const [madebType,setMadebType]= React.useState(1);
  const [authority, setAuthority] = React.useState(0);
  const [receivedDate, setReceivedDate] = React.useState('');
  const [name, setName] = React.useState('');
  const [fname, setFname] = React.useState('');
  const [saney, setSaney] = React.useState(0);
  const [documents, setDocument] = React.useState('');
  const [issueActionDate, setIssueActionDate] = React.useState('');
  const [issueAction, setIssueAction] = React.useState(0);
  const [returnDate, setReturnDate] = React.useState('');

  const madeb = {
     nFormNumber: formNumber, 
     nMadebTypeID: madebType,
     sName: name,
     sFathersName:fname,
     nAuthRegionID:authority , 
     dtReceived:receivedDate,  
     dtIssueAction:issueActionDate,
     nIssuedOrNot:issueAction,
     sDocumentAttached:documents,
     nSaneyFormNo:saney,
     dtReturnEmail:returnDate


  }
  
 // const idsAuthRegion = authorityData.map((data) => data.sAuthRegion);
  //const childrenAuthRegion =  () => { 
   // return (idsAuthRegion.filter((data, index, array) => (array.indexOf(data) == index)).map((filteredData) =>  (<option value={filteredData}>{filteredData}</option>)))};
  const childrenAuthRegion =  () => { 
  return (authorityData.map((data) => (<option value={data.id}>{data.sAuthRegion}</option> )  ))};  
   const optsAuthRegion = childrenAuthRegion();

  const childrenTypeIssued =  () => { 
    return (typeIssuedData.map((data) =>  (<option value={data.id}>{data.sTypeIssued}</option>)))};
  const optsTypeIssued = childrenTypeIssued();
 
  return (
    <Dialog open={props.addModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Madeb Entry Form For Fresh Issue</DialogTitle>
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
                                           onChange={(e) => { setFormNumber(parseInt(e.target.value)) }}

                                       />
                                   </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>
                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="date"
                                           label="Received Date"
                                           type="date"
                                           onChange={(e) => { setReceivedDate(e.target.value) }}
                                           className={props.classes.textField}
                                           InputLabelProps={{
                                               shrink: true,
                                           }}
                                       />
                                   </FormControl>
                               </Grid>

                               <Grid item xs={12} sm={6}>
                                   <FormControl className={props.classes.formControl}>
                                       <InputLabel id="Auth-label"> Authority</InputLabel>
                                       <Select
                                           labelId="Auth-label"
                                           id="authority"
                                           //value={}
                                           // onChange={handleChange}
                                           label="Authority"
                                           children = {optsAuthRegion}
                                           onChange={(e) => { setAuthority(e.target.value) }}
                                       >
                                       </Select>
                                   </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>

                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="name"
                                           label="Name"
                                       //value='Aayush Pandya'
                                       onChange={(e) => { setName(e.target.value) }}
                                       />
                                   </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>

                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="fname"
                                           label="Father's Name"
                                       //value='Aayush Pandya'
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
                                           onChange={(e) => { setSaney(parseInt(e.target.value)) }}
                                       //value='Aayush Pandya'
                                       />
                                   </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>

                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="da"
                                           label="Document attached"
                                       //value='Aayush Pandya'
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
                                           onChange={(e) => { setIssueActionDate(e.target.value) }}
                                           className={props.classes.textField}
                                           InputLabelProps={{
                                               shrink: true,
                                           }}
                                       />
                                   </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>
                                   <FormControl className={props.classes.formControl}>
                                       <InputLabel id="issue-label"> Issue Action</InputLabel>
                                       <Select
                                           labelId="issue-label"
                                           id="authority"
                                           //value={}
                                           onChange={(e) => { setIssueAction(e.target.value) }}
                                           label="Issue Action"
                                           children={optsTypeIssued}
                                       >
                                          

                                       </Select>
                                   </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>
                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="date"
                                           label="Return Date"
                                           type="date"
                                           onChange={(e) => { setReturnDate(e.target.value) }}
                                           className={props.classes.textField}
                                           InputLabelProps={{
                                               shrink: true,
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
        
       <Button onClick={() => props.addAPICall(madeb)} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );

}
