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
import Slide from '@material-ui/core/Slide';
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import { useSelector } from 'react-redux';
import { sButtonColor, sButtonSize, sButtonVariant } from "../../../config/commonConfig";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EditDialog = (props) => {
  console.log(props);
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const { register, handleSubmit, errors } = useForm();
  const handleSubmitEditRecord = () => {
    props.editAPICall(
      {
        id: props.madebTypeObj.id,
        sMadebType: madebType,
        sMadebDisplayName,
        sMadebDisplayKey,
        nMadebFeatureId,
        nUpdatedBy: userId
      }
    )
  }
  const [madebType, setMadebType] = useState(props.madebTypeObj.madebType);
  const [sMadebDisplayName, setMadebDisplayName] = useState(props.madebTypeObj.sMadebDisplayName);
  const [sMadebDisplayKey, setMadebDisplayKey] = useState(props.madebTypeObj.sMadebDisplayKey);
  const [nMadebFeatureId, setMadebFeatureId] = useState(props.madebTypeObj.nMadebFeatureId);
  return (
    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Madeb Type</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container>
                <Grid item xs={12} >
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_MadebType"
                      name="sMadabType"
                      label={<p>Madeb Type<span style={{ color: "red" }} > *</span></p>}
                      type="text"

                      value={madebType}
                      onChange={(e) => { setMadebType(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sMadabType.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>


                <Grid item xs={12} >
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_MadebType"
                      name="sMadebDisplayName"
                      label={<p>Display Name<span style={{ color: "red" }} > *</span></p>}
                      type="text"

                      value={sMadebDisplayName}
                      onChange={(e) => { setMadebDisplayName(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sMadebDisplayName.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>


                <Grid item xs={12} >
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_MadebType"
                      name="sMadebDisplayKey"
                      label={<p>Display Key<span style={{ color: "red" }} > *</span></p>}
                      type="text"

                      value={sMadebDisplayKey}
                      onChange={(e) => { setMadebDisplayKey(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sMadebDisplayKey.type", errors) === "required" && (
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
          {/* <Button onClick={() => props.editAPICall({ id: props.madebTypeObj.id, sMadebType: madebType })} color="primary">Save</Button> */}
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
          Are you sure you want to delete madebType {props.madebType} ?
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
        sMadebType: madebType,
        sMadebDisplayName,
        sMadebDisplayKey,
        nMadebFeatureId: 0,
        nEnteredBy: userId,
        nUpdatedBy: userId
      }
    );
  }
  const [madebType, setMadebType] = useState('');
  const [sMadebDisplayName, setMadebDisplayName] = useState('');
  const [sMadebDisplayKey, setMadebDisplayKey] = useState('');
  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Madeb Type</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitAddRecord)}>
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_madebType"
                    name="sMadebType"
                    label={<p>Madeb Type<span style={{ color: "red" }} > *</span></p>}

                    type="text"
                    onChange={(e) => { setMadebType(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("sMadebType.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_MadebType"
                    name="sMadebDisplayName"
                    label={<p>Display Name<span style={{ color: "red" }} > *</span></p>}
                    type="text"

                    onChange={(e) => { setMadebDisplayName(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("sMadebDisplayName.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_MadebType"
                    name="sMadebDisplayKey"
                    label={<p>Display Key<span style={{ color: "red" }} > *</span></p>}
                    type="text"

                    onChange={(e) => { setMadebDisplayKey(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("sMadebDisplayKey.type", errors) === "required" && (
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
          {/* <Button onClick={() => props.addAPICall({sMadebType: madebType })} color="primary">Save</Button> */}
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
