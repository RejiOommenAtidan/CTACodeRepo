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
import { useForm } from "react-hook-form";
import _ from "lodash/fp";

export const AddDialog = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const handleSubmitAddRecord = () => {
    props.addAPICall({ sTypeIssued: typeIssued });
  }
  const [typeIssuedId, setTypeIssuedId] = useState('');
  const [typeIssued, setTypeIssued] = useState('');
  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Issue Type</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitAddRecord)}>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid item xs={12} >
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_TypeIssued"
                  name = "sTypeIssued"
                  label="TypeIssued"
                  type="text"
                  onChange={(e) => { setTypeIssued(e.target.value) }}
                  inputRef={register({
                    required: true
                  })}
                />
                {_.get("sTypeIssued.type", errors) === "required" && (
                      <span style={{color: 'red'}}>This field is required</span>
                    )}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleAddClickClose} color="primary">Cancel</Button>
        {/* <Button onClick={() => props.addAPICall({ sTypeIssued: typeIssued })} color="primary">Save</Button> */}
        <Button type="submit" color="primary">Save</Button> 
      </DialogActions>
      </form>
    </Dialog>
  );
}

export const EditDialog = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const handleSubmitEditRecord = () => {
    props.editAPICall({ id: props.typeIssuedObj.id, sTypeIssued: Name });
  }
  const [Name, setTypeIssued] = useState(props.typeIssuedObj.typeIssued);
  return (
    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Issue Type</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
      <DialogContent>
        <DialogContentText>
          <div>
            <Grid container >
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_TypeIssued"
                    name="sTypeIssued"
                    label="TypeIssued"
                    type="text"
                    value={Name}
                    onChange={(e) => { setTypeIssued(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("sTypeIssued.type", errors) === "required" && (
                      <span style={{color: 'red'}}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleEditClickClose} color="primary">Cancel</Button>
        {/* <Button onClick={() => props.editAPICall({ id: props.typeIssuedObj.id, sTypeIssued: Name })} color="primary">Save</Button> */}
      </DialogActions>
      </form>
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