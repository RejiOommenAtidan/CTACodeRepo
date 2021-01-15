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
import { useSelector } from 'react-redux';
import { sButtonColor, sButtonSize, sButtonVariant, sDateFormatMUIDatepicker, sDDMMYYYYRegex } from "../../../config/commonConfig";

export const AddDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.Id);
  const { register, handleSubmit, errors, formState } = useForm();
  const handleSubmitAddRecord = () => {
    props.addAPICall(
      {
        sChatrelKey: sChatrelKey,
        nChatrelValue: nChatrelValue,
        dtChatrelFrom: dtChatrelFrom,
        nEnteredBy: userId
      }
    );
  }

  const [sChatrelKey, setsChatrelKey] = useState("");
  const [nChatrelValue, setnChatrelValue] = useState('');
  const [dtChatrelFrom, setdtChatrelFrom] = useState(null);
  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Chatrel</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitAddRecord)}>
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_sChatrelKey"
                    name="name_sChatrelKey"
                    label={<>Chatrel Term<span style={{ color: 'red' }}> *</span></>}
                    type="text"
                    value={sChatrelKey}
                    onChange={(e) => { setsChatrelKey(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("name_sChatrelKey.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_nChatrelValue"
                    name="name_nChatrelValue"
                    label={<>Value<span style={{ color: 'red' }}> *</span></>}
                    type="number"
                    value={nChatrelValue}
                    onChange={(e) => { setnChatrelValue(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                </FormControl>
                {_.get("name_nChatrelValue.type", errors) === "required" && (
                  <span style={{ color: 'red' }}>This field is required</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
placeholder="DD-MM-YYYY"
                      id="id_dtChatrelFrom"
                      name="name_dtChatrelFrom"
                      variant="dialog"
                      openTo="year"
                      views={["year", "month", "date"]}
                      margin="dense"
                      inputRef={register({
                        required: true
                      })}
                      label={<>Chatrel From<span style={{ color: 'red' }}> *</span></>}
                      format={sDateFormatMUIDatepicker}
                      onChange={date => { setdtChatrelFrom(date) }}
                      value={dtChatrelFrom}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                      className={props.classes.dateField}
                    />
                  </MuiPickersUtilsProvider>
                  {_.get("name_dtChatrelFrom.type", errors) === "required" && (
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
          {/* <Button onClick={() => props.addAPICall({ sTypeIssued: typeIssued })} color="primary">Save</Button> */}
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
  const { register, handleSubmit, errors, setValue, formState } = useForm();
  const handleSubmitEditRecord = () => {
    props.editAPICall(
      {
        id: props.oChatrel.id,
        sChatrelKey: sChatrelKey,
        nChatrelValue: nChatrelValue,
        dtChatrelFrom: dtChatrelFrom,
        nEnteredBy: userId
      }
    );
  }
  const [sChatrelKey, setsChatrelKey] = useState(props.oChatrel.sChatrelKey);
  const [nChatrelValue, setnChatrelValue] = useState(props.oChatrel.nChatrelValue);
  const [dtChatrelFrom, setdtChatrelFrom] = useState(props.oChatrel.dtChatrelFrom);
  return (
    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Chatrel</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container >
                <Grid item xs={12} >
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_sChatrelKey"
                      name="name_sChatrelKey"
                      label={<>Chatrel Term<span style={{ color: 'red' }}> *</span></>}
                      type="text"
                      value={sChatrelKey}
                      onChange={(e) => { setsChatrelKey(e.target.value) }}
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
                      id="id_nChatrelValue"
                      name="name_nChatrelValue"
                      label={<>Value<span style={{ color: 'red' }}> *</span></>}
                      type="number"
                      value={nChatrelValue}
                      onChange={(e) => { setnChatrelValue(parseInt(e.target.value)) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                  </FormControl>
                  {_.get("name_nChatrelValue.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={props.classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
placeholder="DD-MM-YYYY"
                        id="id_dtChatrelFrom"
                        name="name_dtChatrelFrom"
                        variant="dialog"
                        openTo="year"
                        views={["year", "month", "date"]}
                        margin="dense"
                        inputRef={register({
                          required: true,
                          pattern:
                          {
                            value: new RegExp(sDDMMYYYYRegex),
                            message: "Invalid Date"
                          }
                        })}
                        label={<>Chatrel From<span style={{ color: 'red' }}> *</span></>}
                        format={sDateFormatMUIDatepicker}
                        onChange={date => {
                          if (date) {
                            setdtChatrelFrom(date);
                            setValue('name_dtChatrelFrom', date, { shouldValidate: true });
                          }
                        }
                        }
                        value={dtChatrelFrom}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        fullWidth
                        className={props.classes.dateField}
                      />
                    </MuiPickersUtilsProvider>
                    {_.get("name_dtChatrelFrom.type", errors) === "required" && (
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
          {/* <Button onClick={() => props.editAPICall({ id: props.typeIssuedObj.id, sTypeIssued: Name })} color="primary">Save</Button> */}
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