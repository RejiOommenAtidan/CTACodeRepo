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
  const [typeIssuedId, setTypeIssuedId] = useState('');
  const [typeIssued, setTypeIssued] = useState('');
  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Issue Type</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid item xs={12} >
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_TypeIssued"
                  label="TypeIssued"
                  type="text"
                  onChange={(e) => { setTypeIssued(e.target.value) }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleAddClickClose} color="primary">Cancel</Button>
        <Button onClick={() => props.addAPICall({ sTypeIssued: typeIssued })} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export const EditDialog = (props) => {
  const [Name, setTypeIssued] = useState(props.typeIssuedObj.typeIssued);
  return (
    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Issue Type</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div>
            <Grid container >
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_TypeIssued"
                    label="TypeIssued"
                    type="text"
                    value={Name}
                    onChange={(e) => { setTypeIssued(e.target.value) }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleEditClickClose} color="primary">Cancel</Button>
        <Button onClick={() => props.editAPICall({ id: props.typeIssuedObj.id, sTypeIssued: Name })} color="primary">Save</Button>
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