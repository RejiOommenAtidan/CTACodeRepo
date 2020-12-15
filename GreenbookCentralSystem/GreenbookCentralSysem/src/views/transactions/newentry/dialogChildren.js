import React, { useState } from 'react';
import {
  Grid,
  Button,
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { sDateFormatMUIDatepicker, sButtonColor, sButtonSize, sButtonVariant, sDDMMYYYYRegex } from '../../../config/commonConfig';
import { useSelector } from 'react-redux';

export const AddChildDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  Moment.locale('en');
  const { register, handleSubmit, errors, setValue } = useForm();
  const handleSubmitAddChildRecord = () => {
    props.addChildAPICall({
      sGBIDParent: props.sGBID,
      sName: sName,
      dtDOB: dtDOB,
      sGender: sGender,
      sChildID: sChildID,
      sGBIDChild: sGBIDChild,
      nEnteredBy: userId,
      nUpdatedBy: userId
    });
  }

  const [sName, setsName] = useState("");
  const [dtDOB, setdtDOB] = useState(null);
  const [sGender, setsGender] = useState("M");
  const [sChildID, setsChildID] = useState("");
  const [sGBIDChild, setsGBIDChild] = useState("");

  return (
    <Dialog fullWidth={true} maxWidth='lg' open={props.addChildModal} onEscapeKeyDown={props.handleAddChildClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add a Child for {props.sGBID}</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitAddChildRecord)}>
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    autoFocus
                    id="id_sName"
                    name="name_sName"
                    label="Name"
                    type="text"
                    value={sName}
                    onChange={(e) => { setsName(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("name_sName.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      variant="dialog"
                      openTo="year"
                      views={["year", "month", "date"]}
                      margin="dense"
                      id="id_dtDOB"
                      name="name_dtDOB"
                      label="Date Of Birth"
                      format={sDateFormatMUIDatepicker}
                      inputRef={register({
                        required: true,
                        pattern:
                        {
                          value: new RegExp(sDDMMYYYYRegex),
                          message: "Invalid Date"
                        }
                      })}
                      onChange={date => {
                        if (date) {
                          setdtDOB(date);
                          setValue('name_dtDOB', date, { shouldValidate: true });
                        }
                      }
                      }
                      value={dtDOB}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                      className={props.classes.dateField}
                    />
                  </MuiPickersUtilsProvider>
                  {_.get("name_dtDOB.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <InputLabel id="id_sGender">Gender</InputLabel>
                  <Select
                    value={sGender}
                    id="id_sGender"
                    name="name_sGender"
                    label="Gender"
                    type="text"
                    fullWidth
                    margin="dense"
                    className={props.classes.textField}
                    onChange={(e) => { setsGender(e.target.value) }}
                  >
                    <MenuItem value={"M"}>Male</MenuItem>
                    <MenuItem value={"F"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_sChildID"
                    name="name_sChildID"
                    label="Old GB"
                    type="text"
                    value={sChildID}
                    onChange={(e) => { setsChildID(e.target.value) }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_sGBIDChild"
                    name="name_sGBIDChild"
                    label="GB No"
                    type="number"
                    value={sGBIDChild}
                    onChange={(e) => { setsGBIDChild(e.target.value) }}
                    inputRef={register({
                      maxLength: 7
                    })}
                  />
                  {_.get("name_sGBIDChild.type", errors) === "maxLength" && (
                    <span style={{ color: 'red' }}>Child GB No cannot exceed 7 characters</span>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleAddChildClickClose}
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
          >Cancel</Button>
          <Button
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

export const EditChildDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  Moment.locale('en');
  const { register, handleSubmit, errors, setValue } = useForm();
  const handleSubmitEditChildRecord = () => {
    props.editChildAPICall(
      {
        id: props.oChild.id,
        sGBIDParent: props.oChild.sGBIDParent,
        sName: sName,
        dtDOB: dtDOB,
        sGender: sGender,
        sChildID: sChildID,
        sGBIDChild: sGBIDChild,
        nUpdatedBy: userId
      }
    );
  }

  const [sName, setsName] = useState(props.oChild.sName);
  const [dtDOB, setdtDOB] = useState(props.oChild.dtDOB);
  const [sGender, setsGender] = useState(props.oChild.sGender);
  const [sChildID, setsChildID] = useState(props.oChild.sChildID);
  const [sGBIDChild, setsGBIDChild] = useState(props.oChild.sGBIDChild);

  return (
    <Dialog fullWidth={true} maxWidth='lg' open={props.editChildModal} onEscapeKeyDown={props.handleEditChildClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Child for {props.oChild.sGBID}</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditChildRecord)}>
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    autoFocus
                    id="id_sName"
                    name="name_sName"
                    label="Name"
                    type="text"
                    value={sName}
                    onChange={(e) => { setsName(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("name_sName.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      variant="dialog"
                      openTo="year"
                      views={["year", "month", "date"]}
                      margin="dense"
                      id="id_dtDOB"
                      name="name_dtDOB"
                      label="Date Of Birth"
                      format={sDateFormatMUIDatepicker}
                      inputRef={register({
                        required: true,
                        pattern:
                        {
                          value: new RegExp(sDDMMYYYYRegex),
                          message: "Invalid Date"
                        }
                      })}
                      onChange={date => {
                        if (date) {
                          setdtDOB(date);
                          setValue('name_dtDOB', date, { shouldValidate: true });
                        }
                      }
                      }
                      value={dtDOB}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                      className={props.classes.dateField}

                    />
                  </MuiPickersUtilsProvider>
                  {_.get("name_dtDOB.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <InputLabel id="id_sGender">Gender</InputLabel>
                  <Select
                    value={sGender}
                    id="id_sGender"
                    name="name_sGender"
                    label="Gender"
                    type="text"
                    fullWidth
                    margin="dense"
                    className={props.classes.textField}
                    onChange={(e) => { setsGender(e.target.value) }}
                  >
                    <MenuItem value={"M"}>Male</MenuItem>
                    <MenuItem value={"F"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_sChildID"
                    name="name_sChildID"
                    label="Old GB"
                    type="text"
                    value={sChildID}
                    onChange={(e) => { setsChildID(e.target.value) }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_sGBIDChild"
                    name="name_sGBIDChild"
                    label="GB No"
                    type="number"
                    value={sGBIDChild}
                    onChange={(e) => { setsGBIDChild(e.target.value) }}
                    inputRef={register({
                      maxLength: 7
                    })}
                  />
                  {_.get("name_sGBIDChild.type", errors) === "maxLength" && (
                    <span style={{ color: 'red' }}>Child GB No cannot exceed 7 characters</span>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleEditChildClickClose}
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
          >Cancel</Button>
          <Button
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