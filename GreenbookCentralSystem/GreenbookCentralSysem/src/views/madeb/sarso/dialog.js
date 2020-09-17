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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EditDialog = (props) => {
  //debugger
  const [Name, setCountryName] = useState(props.countryObj.countryName);
  return (
    <Dialog open={props.editModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Sarso Madeb</DialogTitle>
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
                                            value='43131'

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="date"
                                            label="Received Date"
                                            type="date"
                                            defaultValue="2020-08-27"
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
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={1}>Mundgod</MenuItem>
                                            <MenuItem value={2}>Shimla</MenuItem>
                                            <MenuItem value={3}>Paris</MenuItem>
                                            <MenuItem value={4}>Dekyiling</MenuItem>
                                            <MenuItem value={5}>BTS, Bir</MenuItem>
                                            <MenuItem value={6}>Leh</MenuItem>
                                            <MenuItem value={7}>Boudha</MenuItem>
                                            <MenuItem value={8}>Jorpati</MenuItem>
                                            <MenuItem value={9}>Boston</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="name"
                                            label="Name"
                                        //value='Aayush Pandya'
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="fname"
                                            label="Father's Name"
                                        //value='Aayush Pandya'
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="sfn"
                                            label="Saney Form No"
                                            type='number'
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
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="date"
                                            label="Issue Action Date"
                                            type="date"
                                            defaultValue="2020-08-27"
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
                                            // onChange={handleChange}
                                            label="Issue Action"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={1}>On Progress</MenuItem>
                                            <MenuItem value={2}>Issued</MenuItem>
                                            <MenuItem value={3}>Rejected</MenuItem>
                                            <MenuItem value={4}>Double</MenuItem>
                                            <MenuItem value={5}>Cancel</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="date"
                                            label="Return Date"
                                            type="date"
                                            defaultValue="2020-08-27"
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
        <Button onClick={props.handleEditClickClose} color="primary">Cancel</Button>
        <Button onClick={() => props.editAPICall({ id: props.countryObj.id, sCountryID: props.countryObj.countryId, sCountry: Name })} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );


}

export const DeleteDialog = (props) => {
  console.log("Delete Dialog");
  return (
    <Dialog
      open={props.deleteModal}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle id="alert-dialog-slide-title">Confirm Operation</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete country {props.countryName} ?
        </DialogContentText>
      </DialogContent>
      <DialogActions >
        <Button onClick={props.handleClose} color="default">
          No
        </Button>
        <Button onClick={props.deleteAPICall} color="secondary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );

}

export const AddDialog = (props) => {
  console.log("Add Dialog");
  const [countryId, setCountryId] = useState('');
  const [countryName, setCountryName] = useState('');
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
                                               readOnly: true,
                                           }}
                                           value='43131'

                                       />
                                   </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>
                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="date"
                                           label="Received Date"
                                           type="date"
                                           defaultValue="2020-08-27"
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
                                       >
                                           <MenuItem value="">
                                               <em>None</em>
                                           </MenuItem>
                                           <MenuItem value={1}>Mundgod</MenuItem>
                                           <MenuItem value={2}>Shimla</MenuItem>
                                           <MenuItem value={3}>Paris</MenuItem>
                                           <MenuItem value={4}>Dekyiling</MenuItem>
                                           <MenuItem value={5}>BTS, Bir</MenuItem>
                                           <MenuItem value={6}>Leh</MenuItem>
                                           <MenuItem value={7}>Boudha</MenuItem>
                                           <MenuItem value={8}>Jorpati</MenuItem>
                                           <MenuItem value={9}>Boston</MenuItem>
                                       </Select>
                                   </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>

                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="name"
                                           label="Name"
                                       //value='Aayush Pandya'
                                       />
                                   </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>

                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="fname"
                                           label="Father's Name"
                                       //value='Aayush Pandya'
                                       />
                                   </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>

                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="sfn"
                                           label="Saney Form No"
                                           type='number'
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
                                       />
                                   </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>
                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="date"
                                           label="Issue Action Date"
                                           type="date"
                                           defaultValue="2020-08-27"
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
                                           // onChange={handleChange}
                                           label="Issue Action"
                                       >
                                           <MenuItem value="">
                                               <em>None</em>
                                           </MenuItem>
                                           <MenuItem value={1}>On Progress</MenuItem>
                                           <MenuItem value={2}>Issued</MenuItem>
                                           <MenuItem value={3}>Rejected</MenuItem>
                                           <MenuItem value={4}>Double</MenuItem>
                                           <MenuItem value={5}>Cancel</MenuItem>

                                       </Select>
                                   </FormControl>
                               </Grid>
                               <Grid item xs={12} sm={6}>
                                   <FormControl className={props.classes.formControl}>
                                       <TextField
                                           id="date"
                                           label="Return Date"
                                           type="date"
                                           defaultValue="2020-08-27"
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
        <Button onClick={() => props.addAPICall({ sCountryID: countryId, sCountry: countryName })} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );

}
