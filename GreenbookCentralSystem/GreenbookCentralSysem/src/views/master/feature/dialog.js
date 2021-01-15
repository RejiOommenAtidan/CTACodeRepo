//REMOVE: Unnecessary IMPORTS as Well as Unncecessary Code after Working Stuff Out  
//NOTE: Request to Follow IMPORT Order For Consistency throughout
//REACT IMPORTS
//REDUX IMPORTS
//ACTIONS IMPORTS
//REDUCERS IMPORTS
//ROUTING IMPORTS
//AUTH SERVICE IMPORTS
//MOMENT IMPORT
//AXIOS IMPORT
//MUI IMPORTS
//MATERIAL-TABLE IMPORT
//LOCAL IMPORTS
//ANY OTHER IMPORTS AFTER THESE
//ENSURE SEMICOLON AFTER EACH IMPORT!!

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
import { useSelector } from 'react-redux';

export const EditDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.Id);
  const { register, handleSubmit, errors } = useForm();
  const handleSubmitEditRecord = () => {
    props.editAPICall(
      {
        id: ocurrentfeature.id,
        sFeature: sFeature,
        nUpdatedBy: userId
      }
    )
  }
  const ocurrentfeature = useSelector(state => state.FeatureReducer.oCurrentFeature);
  const [sFeature, setsFeature] = useState(ocurrentfeature.sFeature);
  return (
    <Dialog open={props.editModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Feature</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container>
                <Grid item xs={12}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      autoFocus
                      id="id_sFeature"
                      name="sFeature"
                      label="Feature"
                      type="text"
                      value={sFeature}
                      onChange={(e) => { setsFeature(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sFeature.type", errors) === "required" && (
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
          {/* <Button onClick={() => props.editAPICall({ id: ocurrentfeature.id, sFeature: sFeature })} color="primary">Save</Button> */}
          <Button type="submit" color="primary">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export const AddDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.Id);
  const { register, handleSubmit, errors } = useForm();
  const handleSubmitAddRecord = () => {
    props.addAPICall(
      {
        sFeature: sFeature,
        nEnteredBy: userId,
        nUpdatedBy: userId
      }
    )
  }
  const [sFeature, setsFeature] = useState("");
  return (
    <Dialog open={props.addModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Feature</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitAddRecord)}>
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    autoFocus
                    id="id_sFeature"
                    name="sFeature"
                    label="Feature"
                    type="text"
                    value={sFeature}
                    onChange={(e) => { setsFeature(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("sQualification.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleAddClickClose} color="primary">Cancel</Button>
          {/* <Button onClick={() => props.addAPICall({ sFeature: sFeature })} color="primary">Save</Button> */}
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
          Are you sure you want to delete Feature {props.sFeature} ?
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
