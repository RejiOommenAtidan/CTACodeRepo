import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import _ from "lodash/fp";
import axios from 'axios';
import { Grid, Button, FormControl, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Alerts } from '../../alerts';
import { useSelector } from 'react-redux';
import { sButtonColor, sButtonSize, sButtonVariant, sDateFormatMUIDatepicker, sDDMMYYYYRegex } from "../../../config/commonConfig";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Moment from "moment";

export const EditDialog = (props) => {
  Moment.locale("en");
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const { register, handleSubmit, watch, errors, clearErrors, control, setValue, formState } = useForm();
  //console.log(props.abroadObj);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  };
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    setSnackbar(true);
  };
  const snackbarClose = () => {
    setSnackbar(false);
  };
  const handleChangeGBID = (value) => {
    setGbId(value);
    setName('');
    setAuthRegion([]);
    setPreviousGBSNo('');
  };

  const handleSubmitEditRecord = () => {
    props.editAPICall(madeb);
    // setMessage("Record Successfully Edited");
    // setAlertType('success');
    // setSnackbarOpen(true)
  };

  const [authRegions, setAuthRegionData] = React.useState(props.selectData['authRegions']);
  const [typeIssuedData, setTypeIssuedData] = React.useState(props.selectData['typeIssued']);

  const [madebType, setMadebType] = React.useState(4);
  const [id, setId] = React.useState(props.abroadObj.id);
  const [nFormNumber, setFormNumber] = React.useState(props.abroadObj.nFormNumber);
  const [dtReceived, setReceivedDate] = React.useState((props.abroadObj.dtReceived) ? props.abroadObj.dtReceived.split('T')[0] : null);
  const [nAuthRegionID, setAuthRegionId] = React.useState(props.abroadObj.nAuthRegionID);
  const [sAlias, setAlias] = React.useState(props.abroadObj.sAlias);
  const [sName, setName] = React.useState(props.abroadObj.sName);
  const [sGBID, setGbId] = useState(props.abroadObj.sGBID);
  const [sFathersName, setFname] = React.useState(props.abroadObj.sFathersName);
  const [nReceiptNo, setReceiptNo] = React.useState(props.abroadObj.nReceiptNo);
  const [nSaneyFormNo, setSaney] = React.useState(props.abroadObj.nSaneyFormNo);
  //const [nCurrentGBSno, setCurrentGBSNo] = useState(props.abroadObj.nCurrentGBSno);
  const [nPreviousGBSno, setPreviousGBSNo] = useState(props.abroadObj.nPreviousGBSno);
  const [sApprovedReject, setApprovedReject] = useState(props.abroadObj.sApprovedReject);
  const [dtIssueAction, setIssueActionDate] = React.useState(props.abroadObj.dtIssueAction ? (props.abroadObj.dtIssueAction).split('T')[0] : null);
  const [dtReject, setRejectDate] = useState(props.abroadObj.dtReject ? (props.abroadObj.dtReject).split('T')[0] : null);
  const [nIssuedOrNotID, setIssueAction] = React.useState(props.abroadObj.nIssuedOrNotID);
  const [dtReturnEmail, setReturnDate] = React.useState(props.abroadObj.dtReturnEmail ? (props.abroadObj.dtReturnEmail).split('T')[0] : null);
  const [authRegion, setAuthRegion] = React.useState(props.selectData['authRegions'].find((x) => x.id === nAuthRegionID));
  const [nMadebStatusID, setMadebStatusID] = React.useState(props.abroadObj.nMadebStatusID);
  const [madebStatuses, setMadebStatuses] = React.useState(props.selectData['madebStatuses']);
  const [sMadebStatusRemark, setMadebStatusRemark] = React.useState(props.abroadObj.sMadebStatusRemark);

  let valueMadebStatus = props.selectData['madebStatuses'].find((x) => x.id === nMadebStatusID);

  const madeb = {
    id: id,
    nMadebTypeID: madebType,
    nFormNumber,
    dtReceived: Moment(dtReceived).format('YYYY-MM-DD') != 'Invalid date' ? Moment(dtReceived).format('YYYY-MM-DD') : null,
    //dtReceived,
    nAuthRegionID,
    sName,
    sAlias,
    sGBID,
    sFathersName,
    nReceiptNo,
    nSaneyFormNo,
    //nCurrentGBSno,
    nPreviousGBSno,
    sApprovedReject,
    dtIssueAction,
    dtReject: Moment(dtReject).format('YYYY-MM-DD') != 'Invalid date' ? Moment(dtReject).format('YYYY-MM-DD') : null,
    //dtReject,
    nIssuedOrNotID,
    dtReturnEmail: Moment(dtReturnEmail).format('YYYY-MM-DD') != 'Invalid date' ? Moment(dtReturnEmail).format('YYYY-MM-DD') : null,
    //dtReturnEmail,
    nMadebStatusID,
    sMadebStatusRemark,
    nUpdatedBy: userId
  };

  // let valueMadebStatus = [];

  //console.log("Madeb Edit Object received in dialog", madeb);
  //  const childrenAuthRegion =  () => { 
  //         return (authRegions.map((data) => (<option value={data.id}>{data.sAuthRegion}</option> )  ))
  //     };  
  //  const optsAuthRegion = childrenAuthRegion();
  const formPopulate = (value) => {
    if (value === '') {
      setAlertMessage(`Please enter a valid number...`);
      setAlertType('error');
      snackbarOpen();
      return;
    }
    //console.log("Value in Form Abroad GBID: ", value);
    const gbid = value;
    const event = new Event('change', {
      bubbles: true
    });
    /* Need Greenbook record by passing GBID
     * from Greenbook controller. 
     * Must talk to Malay.
    */
    const sNameElement = document.getElementById("sName");
    //const nCurrentGBSnoElement = document.getElementById("nCurrentGBSno");
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
          setPreviousGBSNo(resp.data.nPreviousSrNo);
          //clearErrors("nPreviousSrNo");
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
          setPreviousGBSNo('');
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
          setPreviousGBSNo('');
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

  let valueAuthRegion = [];

  authRegions.forEach(element => {
    if (element.id === nAuthRegionID) {
      valueAuthRegion = element;
    }
  });

  const btnstyles = { background: 'none', border: 'none', cursor: 'pointer', color: 'blue' };
  // const childrenTypeIssued =  () => { 
  //   return (typeIssuedData.map((data) =>  (<option value={data.id}>{data.sTypeIssued}</option>)))};
  // const optsTypeIssued = childrenTypeIssued();
  let valueTypeIssued = [];
  //console.log(nIssuedOrNotID);
  typeIssuedData.forEach(element => {
    if (element.id === nIssuedOrNotID) {
      valueTypeIssued = element;
    }

  });
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
      <DialogTitle id="form-dialog-title">Edit Abroad Madeb</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nFormNumber"
                      name="nFormNumber"
                      label={<p>Form Number<span style={{ color: "red" }} > *</span></p>}
                      type="number"
                      // InputProps={{
                      //   readOnly: true,
                      // }}
                      InputProps={{
                        readOnly: nIssuedOrNotID,
                       }}
                      value={nFormNumber}
                      onChange={(e) => { setFormNumber(parseInt(e.target.value)) }}

                    />
                    {_.get("nFormNumber.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                {/*<Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="dtReceived"
                      name="dtReceived"
                      label={<p>Received Date<span style={{ color: "red" }} > *</span></p>}
                      type="date"
                      value={dtReceived}
                      className={props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => { setReceivedDate(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("dtReceived.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                    </Grid>*/}
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
placeholder="DD-MM-YYYY"
                        variant="dialog"
                        // openTo="year"
                        // views={["year", "month", "date"]}
                        margin="dense"
                        id="id_dtReceived"
                        name="name_dtReceived"

                        label={<> Received Date<span style={{ color: "red" }} > *</span></>}
                        format={sDateFormatMUIDatepicker}
                        returnMoment={true}
                        onChange={(date) => {
                          if (date) {
                            setValue('name_dtReceived', date, { shouldValidate: true });
                            setReceivedDate(date);
                          }
                        }}
                        value={dtReceived}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        fullWidth
                        className={props.classes.dateField}
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
                    {_.get("name_dtReceived.type", errors) === "required" && (
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
                          id="id_nAuthorityId"
                          inputRef={register({
                            required: true
                          })}
                          options={authRegions}
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
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: 'off', // disable autocomplete and autofill
                              }}
                              inputRef={register({
                                required: true
                              })}
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
                      id="sName"
                      name="sName"
                      label={<p>Name<span style={{ color: "red" }} > *</span></p>}
                      //required={true}
                      value={sName}
                      onChange={(e) => { setName(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sName.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sAlias"
                      label={<p>Alias<span style={{ color: "red" }} > *</span></p>}
                      name="sAlias"
                      //required={true}
                      value={sAlias}
                      onChange={(e) => { setAlias(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sAlias.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}

                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sGBID"
                      label={<p>GB ID<span style={{ color: "red" }} > *</span></p>}
                      name="sGBID"
                      //required={true}
                      value={sGBID}
                      InputProps={{
                        readOnly: nIssuedOrNotID,
                       }}
                      onChange={(e) => { handleChangeGBID(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sGBID.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                  {<button type='button' style={btnstyles} disabled={nIssuedOrNotID} onClick={() => formPopulate(sGBID)}>Get Details</button>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sFathersName"
                      label="Father's Name"
                      value={sFathersName}
                      onChange={(e) => { setFname(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>

                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nReceiptNo"
                      name="nReceiptNo"
                      label="Receipt No"
                      type='number'
                      value={nReceiptNo}
                      onChange={(e) => {
                        setReceiptNo(parseInt(e.target.value));
                        //console.log("Value of Receipt changed to:", e.target.value);
                      }}
                     
                    />
                  
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>

                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nSaneyFormNo"
                      name="nSaneyFormNo"
                      label="Saney Form No"
                      type='number'
                      value={nSaneyFormNo}
                      onChange={(e) => {
                        setSaney(parseInt(e.target.value));
                        //console.log("Value of saney changed to:", e.target.value);
                      }}
                    />
                  </FormControl>
                </Grid>
                {/*<Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nCurrentGBSno"
                      name="nCurrentGBSno"
                      label="Current GB SNo."
                      type='number'
                      //required={true}
                      value={nCurrentGBSno}
                      onChange={(e) => {
                        setCurrentGBSNo(parseInt(e.target.value));
                        //console.log("Value of currentGB changed to:", parseInt(e.target.value));
                      }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("nCurrentGBSno.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                    </Grid>*/}
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nPreviousGBSno"
                      name="nPreviousGBSno"
                      label="Previous GB SNo"
                      type='number'
                      // required={true}
                      InputProps={{
                        readOnly: true
                      }}
                      InputLabelProps={nPreviousGBSno && { shrink: true }}
                      value={nPreviousGBSno}
                      onChange={(e) => {
                        setPreviousGBSNo(parseInt(e.target.value));
                        //console.log("Value of previousGB changed to:", e.target.value);
                      }}
                    // inputRef={register({
                    //   required: true
                    // })}
                    />
                    {/* {_.get("nPreviousGBSno.type", errors) === "required" && (
                                        <span style={{color: 'red'}}>This field is required</span>
                                      )} */}
                  </FormControl>
                </Grid>
                {/*<Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="dtIssueAction"
                      name="dtIssueAction"
                      label="Issue Action Date"
                      type="date"
                      value={dtIssueAction}
                      className={props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}

                      onChange={(e) => { setIssueActionDate(e.target.value) }}
                    />
                  </FormControl>
                    </Grid>*/}
                {/* <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <InputLabel id="issue-label"> Issue Action</InputLabel>
                                        <Select
                                            labelId="issue-label"
                                            id="authority"
                                            value={valueTypeIssued}
                                             onChange={(e) => { setIssueAction(e.target.value) }}
                                            label="Issue Action"
                                            children={optsTypeIssued}
                                        >
                                          

                                        </Select>
                                    </FormControl>
                                </Grid> */}
                {/*<Grid item xs={12} sm={6}>
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
                      id="id_nTypeIssued"
                      options={typeIssuedData}
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
                          label="Type Issued"
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
                {/*<Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="dtReject"
                      name="dtReject"
                      label="Reject Date"
                      type="date"
                      value={dtReject}
                      className={props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}

                      onChange={(e) => { setRejectDate(e.target.value) }}
                    />
                  </FormControl>
                    </Grid>*/}
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
placeholder="DD-MM-YYYY"
                        variant="dialog"
                        // openTo="year"
                        // views={["year", "month", "date"]}
                        margin="dense"
                        id="id_dtReject"
                        name="name_dtReject"
                        label="Reject Date"
                        format={sDateFormatMUIDatepicker}
                        returnMoment={true}
                        onChange={(date) => {
                          if (date) {
                            setValue('name_dtReject', date, { shouldValidate: true });
                            setRejectDate(date);
                          }
                        }}
                        value={dtReject}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        fullWidth
                        className={props.classes.dateField}
                        inputRef={register({

                          pattern:
                          {
                            value: new RegExp(sDDMMYYYYRegex),
                            message: "Invalid Date"
                          }
                        })}
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Grid>
                {/*<Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="dtReturnEmail"
                      name="dtReturnEmail"
                      label="Return Date"
                      type="date"
                      value={dtReturnEmail}
                      className={props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => { setReturnDate(e.target.value) }}
                    />
                  </FormControl>
                    </Grid>*/}

                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
placeholder="DD-MM-YYYY"
                        variant="dialog"
                        // openTo="year"
                        // views={["year", "month", "date"]}
                        margin="dense"
                        id="id_dtReturnEmail"
                        name="name_dtReturnEmail"
                        label="Return Date"
                        format={sDateFormatMUIDatepicker}
                        returnMoment={true}
                        onChange={(date) => {
                          if (date) {
                            setReturnDate(date);
                            setValue('name_dtReturnEmail', date, { shouldValidate: true });
                          }
                        }}
                        value={dtReturnEmail}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        fullWidth
                        className={props.classes.dateField}
                        inputRef={register({

                          pattern:
                          {
                            value: new RegExp(sDDMMYYYYRegex),
                            message: "Invalid Date"
                          }
                        })}
                      />
                    </MuiPickersUtilsProvider>
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
                      disabled={nIssuedOrNotID}
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

          {/* <Snackbar open={snackbarOpen} autoHideDuration={3000}  onClose={snackbarClose} >
        <Alert  onClose={snackbarClose} severity={alertType}  >
         {message}
        </Alert>
      </Snackbar> */}

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

export const AddDialog = (props) => {
  Moment.locale("en");
  const { register, handleSubmit, watch, errors, clearErrors, control, setValue, formState } = useForm();
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);

  // SnackBar Alerts 

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
  };
  const snackbarClose = () => {
    setSnackbar(false);
  };

  const handleAddSubmit = () => {
    // setMessage("Record Successfully Edited");
    // setAlertType('success');
    // setSnackbarOpen(true);
    props.addAPICall(madeb);
  }

  const handleChangeGBID = (value) => {
    setGbId(value);
    setName('');
    setFname('');
  };

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
          setName(`${name} ${mname} ${lname}`);
          setFname(resp.data.sFathersName);
          setPreviousGBSNo(resp.data.nPreviousSrNo);

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

  //console.log(props.selectData);
  const [authRegions, setAuthRegions] = React.useState(props.selectData['authRegions']);
  const [typeIssuedData, settypeIssuedData] = React.useState(props.selectData['typeIssued']);

  const [nFormNumber, setFormNumber] = React.useState(props.selectData['nFormNumber']);
  const [id, setId] = React.useState(0);
  const [madebType, setMadebType] = React.useState(4);
  const [nAuthRegionID, setAuthRegionId] = React.useState(0);
  const [dtReceived, setReceivedDate] = React.useState(new Date(Date.now()).toISOString().substring(0, 10));
  const [sName, setName] = React.useState('');
  const [sAlias, setAlias] = React.useState('');
  const [sGBID, setGbId] = useState('');
  const [sFathersName, setFname] = React.useState('');
  const [nReceiptNo, setReceiptNo] = React.useState(0);
  const [nSaneyFormNo, setSaney] = React.useState();
  //const [nCurrentGBSno, setCurrentGBSNo] = useState();
  const [nPreviousGBSno, setPreviousGBSNo] = useState();
  const [authRegion, setAuthRegion] = React.useState([]);
  const [nMadebStatusID, setMadebStatusID] = React.useState(1);
  const [madebStatuses, setMadebStatuses] = React.useState(props.selectData['madebStatuses']);
  const [sMadebStatusRemark, setMadebStatusRemark] = React.useState("");

  const madeb = {
    id: id,
    nMadebTypeID: madebType,
    nFormNumber,
    dtReceived: Moment(dtReceived).format('YYYY-MM-DD') != 'Invalid date' ? Moment(dtReceived).format('YYYY-MM-DD') : '',
    //dtReceived,
    nAuthRegionID,
    sName,
    sGBID,
    sAlias,
    sFathersName,
    nReceiptNo,
    nSaneyFormNo,
    //nCurrentGBSno,
    nPreviousGBSno,
    //nIssuedOrNotID: 1,
    nMadebStatusID,
    sMadebStatusRemark,
    nEnteredBy: userId,
    nUpdatedBy: userId
  }

  let valueAuthRegion = [];
  let valueTypeIssued = [];
  let valueMadebStatus = props.selectData['madebStatuses'].find((x) => x.id === nMadebStatusID);


  const btnstyles = { background: 'none', border: 'none', cursor: 'pointer', color: 'blue' };
  //console.log("Madeb Object in Add dialog", madeb);

  // const idsAuthRegion = authRegions.map((data) => data.sAuthRegion);
  //const childrenAuthRegion =  () => { 
  // return (idsAuthRegion.filter((data, index, array) => (array.indexOf(data) == index)).map((filteredData) =>  (<option value={filteredData}>{filteredData}</option>)))};
  //   const childrenAuthRegion =  () => { 
  //   return (authRegions.map((data) => (<option value={data.id}>{data.sAuthRegion}</option> )  ))};  
  //    const optsAuthRegion = childrenAuthRegion();

  //   const childrenTypeIssued =  () => { 
  //     return (typeIssuedData.map((data) =>  (<option value={data.id}>{data.sTypeIssued}</option>)))};
  //   const optsTypeIssued = childrenTypeIssued();

  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Madeb Entry form for Abroad</DialogTitle>
      <form onSubmit={handleSubmit(handleAddSubmit)}>
        <DialogContent>
          <DialogContentText>
            <div>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nFormNumber"
                      name="nFormNumber"
                      label={<p>Form Number<span style={{ color: "red" }} > *</span></p>}
                      type="number"
                      // InputProps={{
                      //   readOnly: true
                      // }}
                      inputRef={register({
                        required: true
                      })}
                      value={nFormNumber}
                    />
                    {_.get("nFormNumber.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                {/*<Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="dtReceived"
                      name="dtReceived"
                      label={<p>Received Date<span style={{ color: "red" }} > *</span></p>}
                      type="date"
                      value={dtReceived}
                      className={props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => { setReceivedDate(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("dtDate.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                    </Grid>*/}
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
placeholder="DD-MM-YYYY"
                        variant="dialog"
                        // openTo="year"
                        // views={["year", "month", "date"]}
                        margin="dense"
                        id="id_dtReceived"
                        name="name_dtReceived"
                        label={<> Received Date<span style={{ color: "red" }} > *</span></>}
                        format={sDateFormatMUIDatepicker}
                        returnMoment={true}
                        onChange={(date) => {
                          if (date) {

                            setValue('name_dtReceived', date, { shouldValidate: true });
                            setReceivedDate(date);
                          }
                        }}
                        value={dtReceived}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        fullWidth
                        className={props.classes.dateField}
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
                    {_.get("name_dtReceived.type", errors) === "required" && (
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
                          id="id_nAuthorityId"
                          options={authRegions}
                          autoHighlight
                          inputRef={register({
                            required: true
                          })}
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
                              name="authority_text"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: 'off', // disable autocomplete and autofill
                              }}
                              inputRef={register({
                                required: true
                              })}


                            />
                          )}

                          name="authority"
                        />
                      )}
                      name="AuthRegion"
                      control={control}
                      rules={{ required: true }}
                    />
                  </FormControl>
                  {errors.AuthRegion && <span style={{ color: 'red' }}>Enter Authority Region</span>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sGBID"
                      label={<p>GB ID<span style={{ color: "red" }} > *</span></p>}
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
                      id="sName"
                      label={<p>Name<span style={{ color: "red" }} > *</span></p>}
                      name="sName"
                      //required={true}
                      value={sName}
                      onChange={(e) => { setName(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sName.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}

                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sAlias"
                      label={<p>Alias<span style={{ color: "red" }} > *</span></p>}
                      name="sAlias"
                      //required={true}
                      value={sAlias}
                      onChange={(e) => { setAlias(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sAlias.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}

                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sFathersName"
                      name="sFathersName"
                      label="Father's Name"
                      value={sFathersName}
                      onChange={(e) => { setFname(e.target.value) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>

                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nReceiptNo"
                      name="nReceiptNo"
                      label="Receipt No"
                      type='number'
                      value={nReceiptNo}
                      onChange={(e) => {
                        setReceiptNo(parseInt(e.target.value));
                        //console.log("Value of Receipt changed to:", e.target.value);
                      }}

                    />

                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>

                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nSaneyFormNo"
                      name="nSaneyFormNo"
                      label="Saney Form No"
                      type='number'
                      value={nSaneyFormNo}
                      onChange={(e) => {
                        setSaney(parseInt(e.target.value));
                        //console.log("Value of saney changed to:", parseInt(e.target.value));
                      }}
                    />
                  </FormControl>
                </Grid>
                {/*<Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nCurrentGBSno"
                      label="Current GB SNo."
                      type='number'
                      name='nCurrentGBSno'
                      //required={true}
                      value={nCurrentGBSno}
                      onChange={(e) => {
                        setCurrentGBSNo(parseInt(e.target.value));
                        //console.log("Value of currentGB changed to:", parseInt(e.target.value));
                      }}
                     
                    />
                  </FormControl>
                    </Grid>*/}
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nPreviousGBSno"
                      label="Previous GB SNo"
                      type='number'
                      InputProps={{
                        readOnly: true
                      }}
                      InputLabelProps={nPreviousGBSno && { shrink: true }}

                      name='nPreviousGBSno'
                      //required={true}
                      value={nPreviousGBSno}
                      onChange={(e) => {
                        setPreviousGBSNo(parseInt(e.target.value));
                        //console.log("Value of previousGB changed to:", parseInt(e.target.value));
                      }}
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
                {snackbar && <Alerts
                  alertObj={alertObj}
                  snackbar={snackbar}
                  snackbarClose={snackbarClose}
                />
                }
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleAddClickClose}
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
          >Cancel</Button>

          {/* <Button  type='submit' onClick={handleSubmit} color="primary">Save</Button> */}

          {/* <Snackbar open={snackbarOpen} autoHideDuration={3000}  onClose={snackbarClose} >
        <Alert  onClose={snackbarClose} severity={alertType}  >
         {message}
        </Alert>
      </Snackbar> */}

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
