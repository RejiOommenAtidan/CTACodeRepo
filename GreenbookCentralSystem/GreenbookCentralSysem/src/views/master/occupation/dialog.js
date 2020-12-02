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
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import { useSelector } from 'react-redux';
import {
  oOptions, oTableIcons, sSnackbarAddMessage, sSnackbarUpdateMessages,
  sButtonColor, sButtonSize, sButtonVariant
} from "../../../config/commonConfig";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EditDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const { register, handleSubmit, errors } = useForm();
  const handleSubmitEditRecord = () => {
    props.editAPICall(
      {
        id: props.occupationObj.id,
        sOccupationDesc: occupationDesc,
        sOccupationDescTibetan: occupationDescTibetan,
        nUpdatedBy: userId
      }
    )
  }
  const [occupationDesc, setOccupationDesc] = useState(props.occupationObj.occupationDesc);
  const [occupationDescTibetan, setOccupationDescTibetan] = useState(props.occupationObj.occupationDescTibetan);
  return (
    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Occupation</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container>
                <Grid item xs={12}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_occupationDesc"
                      name="sOccupation"
                      label="Occupation"
                      type="text"
                      // InputProps={{
                      //   readOnly: true
                      // }}
                      value={occupationDesc}
                      onChange={(e) => { setOccupationDesc(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sOccupation.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} >
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_OccupationDescTibetan"
                      label="Occupation (in Tibetan)"
                      type="text"
                      value={occupationDescTibetan}
                      onChange={(e) => { setOccupationDescTibetan(e.target.value) }}
                    />
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
          {/* <Button onClick={() => props.editAPICall({ id: props.occupationObj.id, sOccupationDesc: occupationDesc, sOccupationDescTibetan: occupationDescTibetan })} color="primary">Save</Button> */}
          <Button
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
  return (
    <Dialog
      open={props.deleteModal}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle id="alert-dialog-slide-title">Confirm Operation</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete occupation {props.occupationDesc} ?
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
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const { register, handleSubmit, errors } = useForm();
  const handleSubmitAddRecord = () => {
    props.addAPICall(
      {
        sOccupationDesc: occupationDesc,
        sOccupationDescTibetan: occupationDescTibetan,
        nEnteredBy: userId,
        nUpdatedBy: userId
      }
    )
  }
  const [occupationDesc, setOccupationDesc] = useState('');
  const [occupationDescTibetan, setOccupationDescTibetan] = useState('');
  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Occupation</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitAddRecord)}>
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_occupationDesc"
                    name="sOccupation"
                    label="Occupation"
                    type="text"
                    onChange={(e) => { setOccupationDesc(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("sOccupation.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_OccupationDescTibetan"
                    label="Occupation (in Tibetan)"
                    type="text"
                    onChange={(e) => { setOccupationDescTibetan(e.target.value) }}
                  />
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
          {/* <Button onClick={() => props.addAPICall({ sOccupationDesc: occupationDesc, sOccupationDescTibetan: occupationDescTibetan })} color="primary">Save</Button> */}
          <Button
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
