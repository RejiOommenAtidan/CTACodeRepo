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
import {useSelector} from 'react-redux';


export const AddDialog = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const handleSubmitAddRecord = () => {
    props.addAPICall(
      {
        sKey: sKey,
        sValue: sValue
      }
    );
  }

  const [sKey, setsKey] = useState("");
  const [sValue, setsValue] = useState("");

  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add CTA Config</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitAddRecord)}>
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_sKey"
                    name="name_sKey"
                    label="Key"
                    type="text"
                    value={sKey}
                    onChange={(e) => { setsKey(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("name_sKey.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_sValue"
                    name="name_sValue"
                    label="Value"
                    type="text"
                    value={sValue}
                    onChange={(e) => { setsValue(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("name_sValue.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleAddClickClose} color="primary">Cancel</Button>
          <Button type="submit" color="primary">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export const EditDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const { register, handleSubmit, errors } = useForm();
  const handleSubmitEditRecord = () => {
    props.editAPICall(
      {
        id: props.oCTAConfig.id,
        sKey: sKey,
        sValue: sValue,
        nEnteredBy:userId
      }
    );
  }
  const [sKey, setsKey] = useState(props.oCTAConfig.sKey);
  const [sValue, setsValue] = useState(props.oCTAConfig.sValue);

  return (
    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit CTA Config</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container >
                <Grid item xs={12} >
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      disabled
                      id="id_sKey"
                      name="name_sKey"
                      label="Key"
                      type="text"
                      value={sKey}
                      onChange={(e) => { setsKey(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("name_sKey.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} >
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_sValue"
                      name="name_sValue"
                      label="Value"
                      type="text"
                      value={sValue}
                      onChange={(e) => { setsValue(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("name_sValue.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleEditClickClose} color="primary">Cancel</Button>
          <Button type="submit" color="primary">Save</Button>
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