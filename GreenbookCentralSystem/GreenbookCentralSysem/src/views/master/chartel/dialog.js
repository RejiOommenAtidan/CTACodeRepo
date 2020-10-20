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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { sDateFormatMUIDatepicker } from '../../../config/commonConfig';

export const AddDialog = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const handleSubmitAddRecord = () => {
    props.addAPICall(
      {
        sChartelKey: sChartelKey,
        nChartelValue: nChartelValue,
        dtChartelFrom: dtChartelFrom,
      }
    );
  }

  const [sChartelKey, setsChartelKey] = useState("");
  const [nChartelValue, setnChartelValue] = useState('');
  const [dtChartelFrom, setdtChartelFrom] = useState(null);
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
                    id="id_sChartelKey"
                    name="name_sChartelKey"
                    label="Chartel Term"
                    type="text"
                    value={sChartelKey}
                    onChange={(e) => { setsChartelKey(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("name_sChartelKey.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_nChartelValue"
                    name="name_nChartelValue"
                    label="Value"
                    type="number"
                    value={nChartelValue}
                    onChange={(e) => { setnChartelValue(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                </FormControl>
                {_.get("name_nChartelValue.type", errors) === "required" && (
                  <span style={{ color: 'red' }}>This field is required</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      id="id_dtChartelFrom"
                      name="name_dtChartelFrom"
                      variant="dialog"
                      openTo="year"
                      views={["year", "month", "date"]}
                      margin="dense"
                      inputRef={register({
                        required: true
                      })}
                      label="Chartel From"
                      format={sDateFormatMUIDatepicker}
                      onChange={date => { setdtChartelFrom(date) }}
                      value={dtChartelFrom}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                      className={props.classes.dateField}
                    />
                  </MuiPickersUtilsProvider>
                  {_.get("name_dtChartelFrom.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
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
    props.editAPICall(
      {
        id: props.oChartel.id,
        sChartelKey: sChartelKey,
        nChartelValue: nChartelValue,
        dtChartelFrom: dtChartelFrom
      }
    );
  }
  const [sChartelKey, setsChartelKey] = useState(props.oChartel.sChartelKey);
  const [nChartelValue, setnChartelValue] = useState(props.oChartel.nChartelValue);
  const [dtChartelFrom, setdtChartelFrom] = useState(props.oChartel.dtChartelFrom);
  return (
    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Chartel</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container >
                <Grid item xs={12} >
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_sChartelKey"
                      name="name_sChartelKey"
                      label="Chartel Term"
                      type="text"
                      value={sChartelKey}
                      onChange={(e) => { setsChartelKey(e.target.value) }}
                      InputProps={{
                        readOnly: true,
                        disabled: true
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} >
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_nChartelValue"
                      name="name_nChartelValue"
                      label="Value"
                      type="number"
                      value={nChartelValue}
                      onChange={(e) => { setnChartelValue(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                  </FormControl>
                  {_.get("name_nChartelValue.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={props.classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        id="id_dtChartelFrom"
                        name="name_dtChartelFrom"
                        variant="dialog"
                        openTo="year"
                        views={["year", "month", "date"]}
                        margin="dense"
                        inputRef={register({
                          required: true
                        })}
                        label="Chartel From"
                        format={sDateFormatMUIDatepicker}
                        onChange={date => { setdtChartelFrom(date) }}
                        value={dtChartelFrom}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        fullWidth
                        className={props.classes.dateField}
                      />
                    </MuiPickersUtilsProvider>
                    {_.get("name_dtChartelFrom.type", errors) === "required" && (
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
          {/* <Button onClick={() => props.editAPICall({ id: props.typeIssuedObj.id, sTypeIssued: Name })} color="primary">Save</Button> */}
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