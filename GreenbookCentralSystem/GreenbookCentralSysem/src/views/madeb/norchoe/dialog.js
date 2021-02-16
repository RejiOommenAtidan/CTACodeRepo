import React, { useEffect, useState } from 'react';

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
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useForm, Controller } from "react-hook-form";
import _ from "lodash/fp";
import axios from 'axios';
import { Alerts } from '../../alerts';
import { useSelector } from 'react-redux';
import { sButtonColor, sButtonSize, sButtonVariant, sDDMMYYYYRegex } from "../../../config/commonConfig";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  sDateFormatMUIDatepicker,
} from "../../../config/commonConfig";
import Moment from 'moment';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const EditDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const { register, handleSubmit, watch, errors, clearErrors, control, setValue, formState } = useForm();

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  }
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    setSnackbar(true);
  }
  const snackbarClose = () => {
    setSnackbar(false);
  };
  const handleSubmitEditRecord = () => {
    // alert("Form Submitted.");
    props.editAPICall(madeb);

  };

  const handleChangeGBID = (value) => {
    setGbId(value);
    setName('');

    setAuthRegion([]);
  };

  const [authRegions, setAuthRegions] = React.useState(props.selectData['authRegions']);

  const [typeIssuedData, settypeIssuedData] = React.useState(props.selectData['typeIssued']);
  const [madebStatuses, setMadebStatuses] = React.useState(props.selectData['madebStatuses']);

  const [id, setId] = React.useState(props.norchoeObj.id);
  const [formNumber, setFormNumber] = React.useState(props.norchoeObj.nFormNumber);

  const [nAuthRegionID, setAuthRegionId] = React.useState(props.norchoeObj.nAuthRegionID);
  const [receivedDate, setReceivedDate] = React.useState(props.norchoeObj.dtReceived ? (props.norchoeObj.dtReceived).split('T')[0] : null);
  const [name, setName] = React.useState(props.norchoeObj.sName);
  const [sGBID, setGbId] = React.useState(props.norchoeObj.sGBID);
  const [receipt, setReceipt] = React.useState(props.norchoeObj.nReceiptNo);
  const [sChangeField, setChangeField] = React.useState(props.norchoeObj.sChangeField);
  const [madebType, setMadebType] = React.useState(2);
  const [documents, setDocument] = React.useState(props.norchoeObj.sDocumentAttached);
  const [issueActionDate, setIssueActionDate] = React.useState(props.norchoeObj.dtIssueAction ? (props.norchoeObj.dtIssueAction).split('T')[0] : undefined);
  const [issueAction, setIssueAction] = React.useState(props.norchoeObj.nIssuedOrNotID);
  const [nMadebStatusID, setMadebStatusID] = React.useState(props.norchoeObj.nMadebStatusID);
  const [sMadebStatusRemark, setMadebStatusRemark] = React.useState(props.norchoeObj.sMadebStatusRemark);
  const [returnDate, setReturnDate] = React.useState(props.norchoeObj.dtReturnEmail ? (props.norchoeObj.dtReturnEmail).split('T')[0] : null);
  //const [rejectDate, setRejectDate] = React.useState(props.norchoeObj.dtReject.split('T')[0]);
  const [rejectDate, setRejectDate] = React.useState(props.norchoeObj.dtReject ? (props.norchoeObj.dtReject).split('T')[0] : null);
  const [authRegion, setAuthRegion] = React.useState(props.selectData['authRegions'].find((x) => x.id === nAuthRegionID));
  const formPopulate = (value) => {
    if (value === '') {
      setAlertMessage(`Please enter a valid number...`);
      setAlertType('error');
      snackbarOpen();
      return;
    }
    //console.log("Value in GBID: ", value);
    const gbid = value;
    const event = new Event('change', {
      bubbles: true
    });
    /* Need Greenbook record by passing GBID
     * from Greenbook controller. 
     * Must talk to Malay.
    */
    const sNameElement = document.getElementById("sName");
    const nCurrentGBSnoElement = document.getElementById("nCurrentGBSno");
    const nPreviousGBSnoElement = document.getElementById("nPreviousGBSno");
    axios.get(`Greenbook/GetPersonalDetailsFromGBID/?sGBID=` + gbid)
      .then(resp => {
        if (resp.status === 200) {
          //console.log("Got gb record\n", resp.data);
          //console.log("Name Element:", sNameElement);
          const name = resp.data.sFirstName ? resp.data.sFirstName : '';
          const mname = resp.data.sMiddleName ? resp.data.sMiddleName : '';
          const lname = resp.data.sLastName ? resp.data.sLastName : '';
          setName(`${name} ${mname} ${lname}`);

          clearErrors("sName");
          //setValue("sName");
          const region = authRegions.find((x) => x.sAuthRegion === resp.data.sAuthRegion)
          setAuthRegion(region);
          setAuthRegionId(region.id);
          setValue("AuthRegion", region, {
            shouldValidate: true,
            shouldDirty: true
          })
          /*setTimeout(() => setValue("AuthRegion", region,{
            shouldValidate: true,
            shouldDirty: true
          }), 0);*/
          //sNameElement.value=`${name} ${mname} ${lname}`;
          //  var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          //   window.HTMLInputElement.prototype, "value").set;
          // nativeInputValueSetter.call(sNameElement, `${name} ${mname} ${lname}`);
          // var inputEvent = new Event("input", { bubbles: true });



          // sNameElement.dispatchEvent(inputEvent);
          //  setCurrentGBSNo(resp.data.sOldGreenBKNo);
          //  setPreviousGBSNo(resp.data.sFstGreenBkNo);
        }
        else {
          setName('');

          setAuthRegion([]);
          //console.log("Not found", resp);
          setAlertMessage(`No record found for GB Id: ${gbid}.`);
          setAlertType('error');
          snackbarOpen();
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setName('');

          setAuthRegion([]);
          //console.log("Not found", error.response.data);
          setAlertMessage(`${error.response.data}`);
          setAlertType('warning');
          snackbarOpen();
        }
        else if (error.response.status === 500) {
          setName('');
          setAuthRegion([]);
          //console.log(error);
          setAlertMessage(`Server error while fetching details for GB Id: ${gbid}.`);
          setAlertType('error');
          snackbarOpen();
        }
        else {
          setName('');

          setAuthRegion([]);
          //console.log(error);
        }
      });
  };

  const madeb = {
    id: id,
    nFormNumber: formNumber,
    nMadebTypeID: madebType,
    sName: name,
    sGBID: sGBID,
    sChangeField: sChangeField,
    sMadebStatusRemark,
    nAuthRegionID: nAuthRegionID,
    dtReceived: Moment(receivedDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(receivedDate).format('YYYY-MM-DD') : null,
    nReceiptNo: receipt,
    dtIssueAction: issueActionDate,
    nIssuedOrNotID: issueAction,
    sDocumentAttached: documents,
    nMadebStatusID,
    sMadebStatusRemark,
    dtReturnEmail: Moment(returnDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(returnDate).format('YYYY-MM-DD') : null,
    dtReject: Moment(rejectDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(rejectDate).format('YYYY-MM-DD') : null,
    nUpdatedBy: userId
  }

  const btnstyles = { background: 'none', border: 'none', cursor: 'pointer', color: 'blue' };
  let valueAuthRegion = [];
  authRegions.forEach(element => {
    if (element.id === nAuthRegionID) {
      valueAuthRegion = element;
      //console.log(valueAuthRegion);
    }
  });

  let valueTypeIssued = [];
  // //console.log(issueAction);
  typeIssuedData.forEach(element => {
    if (element.id === issueAction) {
      valueTypeIssued = element;
      //console.log(element);
    }
  });

  let valueMadebStatus = [];

  valueMadebStatus = madebStatuses.find((x) => x.id === nMadebStatusID);
  useEffect(() => {
    //console.log("Inside useEffect()");
    const region = props.selectData['authRegions'].find((x) => x.id === nAuthRegionID);
    setTimeout(() => setValue("AuthRegion", region, {
      shouldValidate: true,
      shouldDirty: true
    }), 0);
  });

  return (
    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Norchoe Madeb</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="number"

                      label={<p>Form Number<span style={{ color: "red" }} > *</span></p>}
                      type="number"
                      InputProps={{
                        readOnly: issueAction,
                       }}
                      name='form_number'
                      inputRef={register({
                        required: true,
                        min: 0
                      })}
                      value={formNumber}
                      onChange={(e) => { setFormNumber(parseInt(e.target.value)) }}

                    />
                    {_.get("form_number.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}

                  </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormControl className={props.classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
placeholder="DD-MM-YYYY"
                        variant="dialog"
                        //  openTo="year"
                        // views={["year", "month", "date"]}
                        margin="dense"
                        id="id_dtDate"
                        name="name_dtDate"

                        label={<> Received Date<span style={{ color: 'red' }}> *</span></>}
                        format={sDateFormatMUIDatepicker}
                        returnMoment={true}

                        value={receivedDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}

                        // className={classes.dateField}
                        onChange={(date) => {
                          if (date) {
                            setReceivedDate(date);
                            setValue('name_dtDate', date, { shouldValidate: true });
                          }

                        }}
                        inputRef={register({
                          required: true,
                          pattern:
                          {
                            value: new RegExp(sDDMMYYYYRegex),
                            message: "Invalid Date"
                          }
                        })}
                      />
                    </MuiPickersUtilsProvider>
                    {_.get("name_dtDate.type", errors) === "required" && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <Controller
                      render={props => (
                        <Autocomplete
                          openOnFocus
                          clearOnEscape
                          onChange={
                            (e, value) => {
                              props.onChange(value);
                              if (value !== null) {
                                //console.log(value.id);
                                setAuthRegionId(value.id);
                                setAuthRegion(value);
                              }
                              else {
                                setAuthRegionId(null);
                                setAuthRegion([]);
                              }
                            }
                          }
                          value={authRegion}
                          inputRef={register({
                            required: true
                          })}
                          id="id_nAuthorityId"
                          options={authRegions}
                          /*  classes={{
                                option: classes.option,
                            }}
                            className={classes.textField}*/
                          autoHighlight
                          getOptionLabel={(option) => option.sAuthRegion}
                          renderOption={(option) => (
                            <React.Fragment>
                              <span>{option.sAuthRegion}</span>
                            </React.Fragment>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={<p>Authority<span style={{ color: "red" }} > *</span></p>}
                              variant="standard"

                              inputRef={register({
                                required: true
                              })}
                              name="name_authority"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: 'off', // disable autocomplete and autofill
                              }}
                            />

                          )}
                        />)}
                      name="AuthRegion"
                      control={control}
                      rules={{ required: true }}
                    />
                    {errors.AuthRegion && <span style={{ color: 'red' }}>Enter Authority Region</span>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sGBID"
                      label={<p>GB ID<span style={{ color: "red" }} > *</span></p>}
                      //required={true}
                      name="sGBID"
                      value={sGBID}
                      InputProps={{
                        readOnly: issueAction,
                       }}
                      onChange={(e) => { handleChangeGBID(e.target.value) }}
                    //onBlur={(e) => {formPopulate(e.target.value)}}
                    />
                  </FormControl>
                  {<button type='button' style={btnstyles} disabled={issueAction} onClick={() => formPopulate(sGBID)}>Get Details</button>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="name"
                      label={<p>Name<span style={{ color: "red" }} > *</span></p>}

                      value={name}
                      onChange={(e) => { setName(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sChangeField"
                      label={<p>Change Field</p>}
                      name="sChangeField"
                      value={sChangeField}
                      onChange={(e) => { setChangeField(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="da"

                      label={<p>Document Attached</p>}
                      value={documents}
                      onChange={(e) => { setDocument(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="receipt"
                      label={<p>Receipt Number</p>}
                      type="number"
                      name='receipt'
                      value={receipt}
                      onChange={(e) => { setReceipt(parseInt(e.target.value)) }}

                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <Autocomplete
                      openOnFocus
                      clearOnEscape
                      onChange={
                        (e, value) => {
                          if (value !== null) {
                            //console.log(value.id);
                            setMadebStatusID(value.id);
                          }
                          else {
                            setMadebStatusID(0);
                          }
                        }
                      }
                      value={valueMadebStatus}
                      id="id_nMadebStatusID"
                      options={madebStatuses}
                      disabled={issueAction}
                      autoHighlight
                      getOptionLabel={(option) => option.sMadebStatus}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span>{option.sMadebStatus}</span>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Madeb Status"
                          variant="standard"
                        
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sMadebStatusRemark"
                      name="sMadebStatusRemark"
                      label="Status Remarks"
                      //required={true}
                      value={sMadebStatusRemark}
                      onChange={(e) => { setMadebStatusRemark(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                {/*<Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="date"
                      label="Issue Action Date"
                      type="date"
                      value={issueActionDate}
                      className={props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}

                      onChange={(e) => { setIssueActionDate(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <Autocomplete
                      openOnFocus
                      clearOnEscape
                      onChange={
                        (e, value) => {
                          if (value !== null) {
                            //console.log(value.id);
                            setIssueAction(value.id);
                          }
                          else {
                            setIssueAction(0);
                          }
                        }
                      }
                      value={valueTypeIssued}

                      id="id_nIssuedOrNotId"
                      options={typeIssuedData}
                        classes={{
                            option: classes.option,
                        }}
                        className={classes.textField}
                      autoHighlight
                      getOptionLabel={(option) => option.sTypeIssued}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span>{option.sTypeIssued}</span>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Issue Action"
                          variant="standard"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>*/}

                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
placeholder="DD-MM-YYYY"
                        variant="dialog"
                        //openTo="year"
                        //views={["year", "month", "date"]}
                        margin="dense"
                        id="id_dtReturnDate"
                        name="name_dtReturnDate"

                        label="Return Date"
                        format={sDateFormatMUIDatepicker}
                        // returnMoment={true}
                        onChange={(date) => {
                          ////console.log(date.toISOString().split("T")[0]);
                          ////console.log(date.toDateString());
                          // //console.log(date.toLocaleDateString());
                          ////console.log(date);
                          setReturnDate(date);
                        }}
                        value={returnDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}


                      />
                    </MuiPickersUtilsProvider>

                  </FormControl>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <FormControl className={props.classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
placeholder="DD-MM-YYYY"
                        variant="dialog"
                        //openTo="year"
                        //views={["year", "month", "date"]}
                        margin="dense"
                        id="id_dtRejectDate"
                        name="name_dtRejectDate"

                        label="Reject Date"
                        format={sDateFormatMUIDatepicker}
                        // returnMoment={true}
                        onChange={(date) => {
                          ////console.log(date.toISOString().split("T")[0]);
                          ////console.log(date.toDateString());
                          // //console.log(date.toLocaleDateString());
                          ////console.log(date);
                          setRejectDate(date);
                        }}
                        value={rejectDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}

                      //   className={classes.dateField}

                      />
                    </MuiPickersUtilsProvider>

                  </FormControl>
                </Grid>

              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleEditClickClose}
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
          >Cancel</Button>
          {/* <Button  type='submit' onClick={handleSubmit} color="primary">Save</Button> */}
          {snackbar && <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />
          }
          <Button
            disabled={formState.isSubmitting && formState.isValid}
            type='submit'
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
          >Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export const AddDialog = (props) => {
  ////console.log(props.selectData);
  // SnackBar Alerts 
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  };
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    //console.log('alert');
    setSnackbar(true);
  }
  const snackbarClose = () => {
    setSnackbar(false);
  };

  const btnstyles = { background: 'none', border: 'none', cursor: 'pointer', color: 'blue' };

  const handleChangeGBID = (value) => {
    setGbId(value);
    setName('');
    //  setFname('');
  }

  const formPopulate = (value) => {
    if (value === '') {
      setAlertMessage(`Please enter a valid number...`);
      setAlertType('error');
      snackbarOpen();
      return;
    }
    //console.log("Value in GBID: ", value);
    const gbid = value;
    const event = new Event('change', {
      bubbles: true
    });


    axios.get(`Greenbook/GetPersonalDetailsFromGBID/?sGBID=` + gbid)
      .then(resp => {
        if (resp.status === 200) {
          //console.log("Got gb record\n", resp.data);

          const name = resp.data.sFirstName ? resp.data.sFirstName : '';
          const mname = resp.data.sMiddleName ? resp.data.sMiddleName : '';
          const lname = resp.data.sLastName ? resp.data.sLastName : '';
          //setName(`${name} ${mname} ${lname}`);
          //console.log(name);
          setName(`${name} ${mname} ${lname}`);

          clearErrors("sName");
          //setValue("sName");
          const region = authRegions.find((x) => x.sAuthRegion === resp.data.sAuthRegion)
          setAuthRegion(region);
          setAuthRegionId(region.id);
          setValue("AuthRegion", region, {
            shouldValidate: true,
            shouldDirty: true
          })

        }
        else {
          setName('');

          setAuthRegion([]);
          //console.log("Not found", resp);
          setAlertMessage(`No record found for GB Id: ${gbid}.`);
          setAlertType('error');
          snackbarOpen();
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setName('');

          setAuthRegion([]);
          //console.log("Not found", error.response.data);
          setAlertMessage(`${error.response.data}`);
          setAlertType('warning');
          snackbarOpen();
        }
        else if (error.response.status === 500) {
          setName('');

          setAuthRegion([]);
          //console.log(error);
          setAlertMessage(`Server error while fetching details for GB Id: ${gbid}.`);
          setAlertType('error');
          snackbarOpen();
        }
        else {
          setName('');

          setAuthRegion([]);
          //console.log(error);
        }
      });
  };

  const [authRegions, setAuthRegions] = React.useState(props.selectData['authRegions']);
  const [formNumber, setFormNumber] = React.useState(props.selectData['nFormNumber']);
  const [id, setId] = React.useState(0);
  const [madebType, setMadebType] = React.useState(2);
  const [nAuthRegionID, setAuthRegionId] = React.useState(null);
  const [receivedDate, setReceivedDate] = React.useState(null);
  const [sGBID, setGbId] = React.useState('');
  const [receipt, setReceipt] = React.useState(0);
  const [sChangeField, setChangeField] = React.useState('');
  const [name, setName] = React.useState('');
  const [authRegion, setAuthRegion] = React.useState([]);
  const [documents, setDocument] = React.useState('');
  const [madebStatuses, setMadebStatuses] = React.useState(props.selectData['madebStatuses']);
  const [nMadebStatusID, setMadebStatusID] = React.useState(1);
  const [sMadebStatusRemark, setMadebStatusRemark] = React.useState('');
  let valueMadebStatus = [];
  valueMadebStatus = madebStatuses.find((x) => x.id === nMadebStatusID);

  const madeb = {
    nFormNumber: formNumber,
    nMadebTypeID: madebType,
    sName: name,
    sGBID,
    nAuthRegionID,
    dtReceived: Moment(receivedDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(receivedDate).format('YYYY-MM-DD') : null,
    sChangeField: sChangeField,
    sDocumentAttached: documents,
    nReceiptNo: receipt,
    nMadebStatusID,
    sMadebStatusRemark,
    nEnteredBy: userId,
    nUpdatedBy: userId
  }
  const { register, handleSubmit, watch, errors, clearErrors, control, setValue, formState } = useForm();
  const onSubmit = data => {
    props.addAPICall(madeb);
  };


  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Madeb Entry Form For Changes</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="form_number"
                      label={<p>Form Number<span style={{ color: "red" }} > *</span></p>}
                      variant="standard"


                      type="number"
                      name='form_number'
                      inputRef={register({
                        required: true,
                        min: 0
                      })}
                      // InputProps={{
                      //   readOnly: false,
                      // }}
                      value={formNumber}
                      onChange={(e) => { setFormNumber(parseInt(e.target.value)) }}

                    />
                    {_.get("form_number.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                    {/*_.get("form_number.type", errors) === "maxLength" && (
                                                <p>First name cannot exceed 20 characters</p>
                                            )*/}

                  </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormControl className={props.classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
placeholder="DD-MM-YYYY"
                        variant="dialog"
                        //  openTo="year"
                        // views={["year", "month", "date"]}
                        margin="dense"
                        id="id_dtDate"
                        name="name_dtDate"

                        label={<> Received Date<span style={{ color: 'red' }}> *</span></>}
                        format={sDateFormatMUIDatepicker}
                        returnMoment={true}

                        value={receivedDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}

                        // className={classes.dateField}
                        onChange={(date) => {
                          if (date) {
                            setReceivedDate(date);
                            setValue('name_dtDate', date, { shouldValidate: true });
                          }

                        }}
                        inputRef={register({
                          required: true,
                          pattern:
                          {
                            value: new RegExp(sDDMMYYYYRegex),
                            message: "Invalid Date"
                          }
                        })}
                      />
                    </MuiPickersUtilsProvider>
                    {_.get("name_dtDate.type", errors) === "required" && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <Controller
                      render={props => (
                        <Autocomplete
                          openOnFocus
                          clearOnEscape
                          onChange={
                            (e, value) => {
                              props.onChange(value);
                              if (value !== null) {
                                //console.log(value.id);
                                setAuthRegionId(value.id);
                                setAuthRegion(value);
                              }
                              else {
                                setAuthRegionId(null);
                                setAuthRegion([]);
                              }
                            }
                          }
                          value={authRegion}
                          inputRef={register({
                            required: true
                          })}
                          id="id_nAuthorityId"
                          options={authRegions}
                          /*  classes={{
                                option: classes.option,
                            }}
                            className={classes.textField}*/
                          autoHighlight
                          getOptionLabel={(option) => option.sAuthRegion}
                          renderOption={(option) => (
                            <React.Fragment>
                              <span>{option.sAuthRegion}</span>
                            </React.Fragment>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={<p>Authority<span style={{ color: "red" }} > *</span></p>}
                              variant="standard"

                              inputRef={register({
                                required: true
                              })}
                              name="name_authority"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: 'off', // disable autocomplete and autofill
                              }}
                            />
                          )}
                        />)}
                      name="AuthRegion"
                      control={control}
                      rules={{ required: true }}
                    />
                    {errors.AuthRegion && <span style={{ color: 'red' }}>Enter Authority Region</span>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sGBID"
                      label={<p>GB ID<span style={{ color: "red" }} > *</span></p>}
                      //required={true}
                      name="sGBID"
                      value={sGBID}
                      onChange={(e) => { handleChangeGBID(e.target.value) }}
                      //onBlur={(e) => {formPopulate(e.target.value)}}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sGBID.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                  <button type='button' style={btnstyles} onClick={() => formPopulate(sGBID)}>Get Details</button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="name"
                      label={<p>Name<span style={{ color: "red" }} > *</span></p>}
                      value={name}
                      name='name'
                      inputRef={register({
                        required: true
                      })}
                      onChange={(e) => { setName(e.target.value) }}
                    />
                    {_.get("name.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sChangeField"
                      label={<p>Change Field<span style={{ color: "red" }} > *</span></p>}
                      name="sChangeField"

                      inputRef={register({
                        required: true,
                      })}
                      //value='Aayush Pandya'
                      onChange={(e) => { setChangeField(e.target.value) }}
                    />
                    {_.get("sChangeField.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="da"

                      label={<p>Document Attached</p>}
                      name="name_da"
                      //value='Aayush Pandya'
                      
                      onChange={(e) => { setDocument(e.target.value) }}
                    />
                    
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="receipt"

                      label={<p>Receipt Number</p>}
                      type="number"
                      name='receipt'
                      inputRef={register({
                     
                        min: 0
                      })}
                      onChange={(e) => { setReceipt(parseInt(e.target.value)) }}
                    />
                   
                    {/*_.get("form_number.type", errors) === "maxLength" && (
                                                <p>First name cannot exceed 20 characters</p>
                                            )*/}

                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <Autocomplete
                      openOnFocus
                      clearOnEscape
                      onChange={
                        (e, value) => {
                          if (value !== null) {
                            //console.log(value.id);
                            setMadebStatusID(value.id);
                          }
                          else {
                            setMadebStatusID(0);
                          }
                        }
                      }
                      value={valueMadebStatus}
                      id="id_nMadebStatusID"
                      options={madebStatuses}
                      autoHighlight
                      getOptionLabel={(option) => option.sMadebStatus}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span>{option.sMadebStatus}</span>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Madeb Status"
                          variant="standard"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sMadebStatusRemark"
                      name="sMadebStatusRemark"
                      label="Status Remarks"
                      //required={true}
                      value={sMadebStatusRemark}
                      onChange={(e) => { setMadebStatusRemark(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              {snackbar && <Alerts
                alertObj={alertObj}
                snackbar={snackbar}
                snackbarClose={snackbarClose}
              />
              }
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleAddClickClose}
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
