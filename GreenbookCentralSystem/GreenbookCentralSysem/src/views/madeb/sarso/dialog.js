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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  export const EmailDialog = (props) => {
  
    const [id, setId] = React.useState(props.sarsoEmailObj.id);
    const [formNumber, setFormNumber] = React.useState(props.sarsoEmailObj.nFormNumber);
    const [name, setName] = React.useState(props.sarsoEmailObj.sName);
    const [recipient, setRecipient] = React.useState('');
    const [sender, setSender] = React.useState('dataunit@tibet.net');
    const [subject, setSubject] = React.useState('Sarso case no: '+formNumber.toString()+'  Name: '+ name);
    const [body, setBody] = React.useState('Sarso case no:'+formNumber.toString()+' \nName: '+ name +'\nPostal Address:');
    

    const emailObj = {
      id:id,
      nFormNumber: formNumber,
      sName: name,
      sender:sender,
      recipient:recipient,
      subject:subject,
      body:body

      
   }
    return (
        
        
  
      <Dialog open={props.emailModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Email Sarso Madeb</DialogTitle>
        
        <DialogContent>
          <DialogContentText>
          <div>
                             
                              <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                      <FormControl className={props.classes.formControl}>
                                          <TextField
                                              id="sender"
                                              label="Sender"
                                              type="text"   
                                              InputProps={{
                                                  readOnly: false,
                                              }} 
                                             // className={props.classes.textField}
                                              value={sender}
                                              onChange={(e) => { setSender(e.target.value) }}
  
                                          />
                                      </FormControl>
                                  </Grid>
                                  <Grid item xs={12}>
                                      <FormControl className={props.classes.formControl}>
                                          <TextField
                                              id="recipient"
                                              label="Recipient"
                                              type="email"
                                              
                                             
                                            
                                              onChange={(e) => { setRecipient(e.target.value) }}
                                          />
                                      </FormControl>
                                  </Grid>
                                  <Grid item xs={12}>
  
                                      <FormControl className={props.classes.formControl}>
                                          <TextField
                                              id="subject"
                                              label="Subject"
                                              //required={true}
                                           
                                          value={subject}
                                          onChange={(e) => { setSubject(e.target.value) }}
                                          />
                                      </FormControl>
                                  </Grid>
                                <Grid item xs={12}>
                                 <InputLabel shrink>Message</InputLabel>
                                    <TextareaAutosize
                                    aria-label="minimum height"
                                    //rowsMin={5}
                                    //className={props.classes.textField}
                                    label="Message"            
                                    value={body}
                                    style={ { width:'100%', height:200} }
                                    placeholder="Minimum 3 rows"
                                    //onChange={console.log('change')}
                                    />
                                </Grid>
                                                        
                              </Grid>
                          </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleEmailClickClose} color="primary">Cancel</Button>
  
         {/* <Button  type='submit' onClick={handleSubmit} color="primary">Save</Button> */}
       
          {/*<Snackbar open={snackbarOpen} autoHideDuration={3000}  onClose={snackbarClose} >
          <Alert  onClose={snackbarClose} severity={alertType}  >
           {message}
          </Alert>
        </Snackbar>*/}
  
          <Button onClick={() =>  console.log(emailObj)} color="primary">Save</Button> 
        </DialogActions>
    
      </Dialog>
  );
  
  
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
  const [issueAction, setIssueAction] = React.useState(props.sarsoObj.nIssuedOrNotID);
  const [returnDate, setReturnDate] = React.useState(props.sarsoObj.dtReturnEmail.split('T')[0]);
  //const [rejectDate, setRejectDate] = React.useState(props.sarsoObj.dtReject.split('T')[0]);
  const [rejectDate, setRejectDate] = React.useState(props.sarsoObj.dtReject);
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
  console.log(props.selectData);
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

     sDocumentAttached:documents,
     nSaneyFormNo:saney
  


  }
  

 
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
