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
import { sButtonColor, sButtonSize, sButtonVariant } from '../../../config/commonConfig';
import { useSelector } from 'react-redux';

export const AddNoteDialog = (props) => {
  const { register, handleSubmit, errors, formState } = useForm();
  const handleSubmitAddNoteRecord = () => {
    props.addNoteAPICall(sNote);
  }

  const [sNote, setsNote] = useState("");

  return (
    <Dialog fullWidth={true} maxWidth='md' open={props.addNoteModal} onEscapeKeyDown={props.handleAddNoteClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add a Note for {props.sGBID}</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitAddNoteRecord)}>
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    autoFocus
                    id="id_sNote"
                    name="name_sNote"
                    label={<>Note<span style={{ color: "red" }} > *</span></>}
                    type="text"
                    value={sNote}
                    onChange={(e) => { setsNote(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                    InputProps={{
                      style: {fontSize: '1.4rem'}
                    }}
                    multiline={true}
                    rows={5}
                    rowsMax={10}
                  />
                  {_.get("name_sNote.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleAddNoteClickClose}
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
          >Cancel</Button>
          <Button
            disabled={formState.isSubmitting && formState.isValid}
            type="submit"
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
          >Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export const EditNoteDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const { register, handleSubmit, errors, formState } = useForm();
  const handleSubmitEditNoteRecord = () => {
    props.editNoteAPICall(
      {
        id: props.oNote.id,
        sNote: sNote,
        sGBID: props.oNote.sGBID,
        nUpdatedBy: userId
      }
    );
  }

  const [sNote, setsNote] = useState(props.oNote.sNote);

  return (
    <Dialog fullWidth={true} maxWidth='md' open={props.editNoteModal} onEscapeKeyDown={props.handleEditNoteClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Note for {props.oNote.sGBID}</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditNoteRecord)}>
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    autoFocus
                    id="id_sNote"
                    name="name_sNote"
                    label={<>Note<span style={{ color: "red" }} > *</span></>}
                    type="text"
                    value={sNote}
                    onChange={(e) => { setsNote(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                    InputProps={{
                      style: {fontSize: '1.4rem'}
                    }}
                    multiline={true}
                    rows={5}
                    rowsMax={10}
                  />
                  {_.get("name_sNote.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleEditNoteClickClose}
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
          >Cancel</Button>
          <Button
            disabled={formState.isSubmitting && formState.isValid}
            type="submit"
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
          >Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}