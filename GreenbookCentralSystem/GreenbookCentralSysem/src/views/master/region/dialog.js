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

export const AddDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.Id);
  const { register, handleSubmit, errors, formState } = useForm();
  const handleSubmitAddRecord = () => {
    props.addAPICall(
      {
        sRegion_code: regionId,
        sRegion_name: region,
        nEnteredBy: userId,
        nUpdatedBy: userId
      }
    )
  }
  const [regionId, setRegionId] = useState('');
  const [region, setRegion] = useState('');
  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Region</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitAddRecord)}>
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_regionId"
                    name="sRegionID"
                    label={<>Region ID<span style={{ color: 'red' }}> *</span></>}
                    type="text"
                    onChange={(e) => { setRegionId(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("sRegionID.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_Region"
                    name="sRegion"
                    label={<>Region Name<span style={{ color: 'red' }}> *</span></>}
                    type="text"
                    onChange={(e) => { setRegion(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("sRegion.type", errors) === "required" && (
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
          {/* <Button onClick={() => props.addAPICall({ sRegionID: regionId, sRegion: region })} color="primary">Save</Button> */}
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

export const EditDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.Id);
  const { register, handleSubmit, errors, formState } = useForm();
  const handleSubmitEditRecord = () => {
    props.editAPICall(
      {
        id: props.regionObj.id,
        sRegion_code: props.regionObj.regionId,
        sRegion_name: Name,
        nUpdatedBy: userId
      }
    )
  }
  const [Name, setRegion] = useState(props.regionObj.region);
  return (
    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Region</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container >
                <Grid item xs={12}>
                  <FormControl className={props.classes.formControl} >
                    <TextField
                      id="id_regionId"
                      label={<>Region ID<span style={{ color: 'red' }}> *</span></>}
                      type="text"
                      disabled
                      value={props.regionObj.regionId}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} >
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_Region"
                      name="sRegion"
                      label={<>Region Name<span style={{ color: 'red' }}> *</span></>}
                      type="text"
                      value={Name}
                      onChange={(e) => { setRegion(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sRegion.type", errors) === "required" && (
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
          {/* <Button onClick={() => props.editAPICall({ id: props.regionObj.id, sRegion_code: props.regionObj.regionId, sRegion_name: Name })} color="primary">Save</Button> */}
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
