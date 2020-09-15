import React, { useEffect, useState } from 'react';

import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  FormControl,
  TextField
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
  const [authRegion, setAuthRegion] = useState(props.authRegionObj.authRegion);
  const [countryID, setCountryID] = useState(props.authRegionObj.countryID);
  return (
    <Dialog open={props.editModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Auth Region</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div>
            <Grid container>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_countryId"
                    label="Country ID"
                    type="text"
                    // InputProps={{
                    //   readOnly: true
                    // }}
                    value={countryID}
                    onChange={(e) => { setCountryID(e.target.value) }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_AuthRegion"
                    label="Auth Region"
                    type="text"
                    value={authRegion} // Set Auth Region name 
                    onChange={(e) => { setAuthRegion(e.target.value) }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleEditClickClose} color="primary">Cancel</Button>
        <Button onClick={() => props.editAPICall({ ID: props.authRegionObj.ID, sCountryID: countryID, sAuthRegion: authRegion })} color="primary">Save</Button>
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
          Are you sure you want to delete Auth Region {props.authRegion} ?
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
  const [countryID, setCountryID] = useState('');
  const [authRegion, setAuthRegion] = useState('');
  return (
    <Dialog open={props.addModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Country</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid item xs={12}>
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_countryId"
                  label="Country ID"
                  type="text"
                  onChange={(e) => { setCountryID(e.target.value) }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_AuthRegion"
                  label="Auth Region"
                  type="text"
                  onChange={(e) => { setAuthRegion(e.target.value) }}
                />
              </FormControl>
            </Grid>
          </Grid>

        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleAddClickClose} color="primary">Cancel</Button>
        <Button onClick={() => props.addAPICall({ sCountryID: countryID, sAuthRegion: authRegion })} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );

}
