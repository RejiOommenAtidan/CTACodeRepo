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
  const [relationId, setRelationId] = useState('');
  const [relation, setRelation] = useState('');
  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Relation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid item xs={12} >
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_Relation"
                  label="Relation"
                  type="text"
                  onChange={(e) => { setRelation(e.target.value) }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleAddClickClose} color="primary">Cancel</Button>
        <Button onClick={() => props.addAPICall({ sRelation: relation })} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export const EditDialog = (props) => {
  const [Name, setRelation] = useState(props.relationObj.relation);
  return (
    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Relation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div>
            <Grid container >
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_Relation"
                    label="Relation"
                    type="text"
                    value={Name}
                    onChange={(e) => { setRelation(e.target.value) }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleEditClickClose} color="primary">Cancel</Button>
        <Button onClick={() => props.editAPICall({ id: props.relationObj.id, sRelation: Name })} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

{/*export const DeleteDialog = (props) => {
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
}*/}
