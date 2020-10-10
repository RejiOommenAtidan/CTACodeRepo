import React, { useState } from 'react';
import {
  Grid,
  Button,
  FormControl,
  TextField
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const AddDialog = (props) => {
  const [regionId, setRegionId] = useState('');
  const [region, setRegion] = useState('');
  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Region</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid item xs={12}>
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_regionId"
                  label="Region ID"
                  type="text"
                  onChange={(e) => { setRegionId(e.target.value) }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_Region"
                  label="Region"
                  type="text"
                  onChange={(e) => { setRegion(e.target.value) }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleAddClickClose} color="primary">Cancel</Button>
        <Button onClick={() => props.addAPICall({ sRegionID: regionId, sRegion: region })} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export const EditDialog = (props) => {
  const [Name, setRegion] = useState(props.regionObj.region);
  return (
    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Region</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div>
            <Grid container >
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl} >
                  <TextField
                    id="id_regionId"
                    label="Region ID"
                    type="text"
                    InputProps={{
                      readOnly: true
                    }}
                    value={props.regionObj.regionId}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_Region"
                    label="Region"
                    type="text"
                    value={Name}
                    onChange={(e) => { setRegion(e.target.value) }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleEditClickClose} color="primary">Cancel</Button>
        <Button onClick={() => props.editAPICall({ id: props.regionObj.id, sRegion_code: props.regionObj.regionId, sRegion_name: Name })} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

{/*export const DeleteDialog = (props) => {
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
}*/}
