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
import { sButtonColor, sButtonSize, sButtonVariant } from "../../../config/commonConfig";

export const EditDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const { register, handleSubmit, errors, formState } = useForm();
  const handleSubmitEditRecord = () => {
    props.editAPICall(
      {
        id: props.qualificationObj.id,
        sQualificationID: props.qualificationObj.qualificationId,
        sQualification: Name,
        nUpdatedBy: userId
      }
    )
  }

  const [Name, setQualification] = useState(props.qualificationObj.qualification);
  return (
    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Qualification</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container >
                <Grid item xs={12}>
                  <FormControl className={props.classes.formControl} >
                    <TextField
                      // style={{width:max}}
                      id="id_qualificationId"
                      label={<>Qualification ID<span style={{ color: 'red' }}> *</span></>}
                      type="text"
                      InputProps={{
                        readOnly: true
                      }}
                      value={props.qualificationObj.qualificationId}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} >
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_Qualification"
                      name="sQualification"
                      label={<>Qualification<span style={{ color: 'red' }}> *</span></>}
                      type="text"
                      value={Name} // Set country name from local variable Name.
                      onChange={(e) => { setQualification(e.target.value) }}
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
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleEditClickClose}
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
          >Cancel</Button>
          {/* <Button onClick={() => props.editAPICall({ id: props.qualificationObj.id, sQualificationID: props.qualificationObj.qualificationId, sQualification: Name })} color="primary">Save</Button> */}
          <Button
            disabled={formState.isSubmitting && formState.isValid}
            type="submit"
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
          >Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export const DeleteDialog = (props) => {
  return ({/*
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
  */ });
}

export const AddDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const { register, handleSubmit, errors, formState } = useForm();
  const handleSubmitAddRecord = () => {
    props.addAPICall(
      {
        sQualificationID: qualificationId,
        sQualification: qualification,
        nEnteredBy: userId,
        nUpdatedBy: userId
      }
    )
  }
  const [qualificationId, setQualificationId] = useState('');
  const [qualification, setQualification] = useState('');

  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Qualification</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitAddRecord)}>
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_qualificationId"
                    name="name_qualificationId"
                    label={<>Qualification ID<span style={{ color: 'red' }}> *</span></>}
                    type="text"
                    onChange={(e) => { setQualificationId(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                    {_.get("name_qualificationId.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_Qualification"
                    name="sQualification"
                    label={<>Qualification<span style={{ color: 'red' }}> *</span></>}
                    type="text"
                    onChange={(e) => { setQualification(e.target.value) }}
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
          <Button
            onClick={props.handleAddClickClose}
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
          >Cancel</Button>
          {/* <Button onClick={() => props.addAPICall({ sQualificationID: qualificationId, sQualification: qualification })} color="primary">Save</Button> */}
          <Button
            disabled={formState.isSubmitting && formState.isValid}
            type="submit"
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
          >Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
