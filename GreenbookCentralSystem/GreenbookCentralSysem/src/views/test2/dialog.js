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
  const [Name, setCountryName] = useState(props.countryObj.countryName);
  return (
    <Dialog open={props.editModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Country</DialogTitle>
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
                    InputProps={{
                      readOnly: true
                    }}
                    value={props.countryObj.countryId}

                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_CountryName"
                    label="Country Name"
                    type="text"
                    value={Name} // Set country name from local variable Name.
                    onChange={(e) => { setCountryName(e.target.value) }}
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
                  onChange={(e) => { setCountryId(e.target.value) }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_CountryName"
                  label="Country Name"
                  type="text"
                  onChange={(e) => { setCountryName(e.target.value) }}
                />
              </FormControl>
            </Grid>
          </Grid>

        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleAddClickClose} color="primary">Cancel</Button>
        <Button onClick={() => props.addAPICall({ sCountryID: countryId, sCountry: countryName })} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );

}
