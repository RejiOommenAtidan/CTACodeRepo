import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import axios from 'axios';
import { Grid, Button, FormControl, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector } from 'react-redux';
import { sButtonColor, sButtonSize, sButtonVariant, sDateFormatMUIDatepicker, sDDMMYYYYRegex } from '../../../config/commonConfig';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Moment from "moment";

export const EditDialog = (props) => {
  Moment.locale("en");
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  console.log("Hello from Edit Dialog");
  const { register, handleSubmit, watch, errors, setValue } = useForm();


  console.log(props.gbSerialObj);
  // const [snackbarOpen,setSnackbarOpen]=React.useState(false);
  // const snackbarClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setSnackbarOpen(false);
  // };
  const handleSubmitEditRecord = () => {
    props.editAPICall(gbSerialObj);

    // setMessage("Record Successfully Edited");
    // setAlertType('success');
    // setSnackbarOpen(true)
  }
  const [message, setMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('');

  const [authRegions, setAuthRegionData] = React.useState(props.selectData['authRegions']);
  const [madebTypes, setMadebTypesData] = React.useState(props.selectData['madebTypes']);
  const [countries, setCountriesData] = React.useState(props.selectData['countries']);

  const [id, setId] = React.useState(props.gbSerialObj.id);
  const [nBookNo, setBookNo] = useState(props.gbSerialObj.nBookNo);
  const [sGBID, setGbId] = useState(props.gbSerialObj.sGBID);
  const [remarks, setRemarks] = React.useState(props.gbSerialObj.remarks);
  const [dtDate, setDate] = React.useState((props.gbSerialObj.dtDate) ? props.gbSerialObj.dtDate.split('T')[0] : null);
  const [sName, setName] = React.useState(props.gbSerialObj.sName);
  const [sCountryID, setCountryID] = React.useState(props.gbSerialObj.sCountryID);
  const [nMadebTypeId, setMadebTypeId] = React.useState(props.gbSerialObj.nMadebTypeId);
  const [nFormNumber, setFormNumber] = React.useState(props.gbSerialObj.nFormNumber);
  const [nAuthRegionId, setAuthRegionId] = React.useState(props.gbSerialObj.nAuthRegionId);

  const gbSerialObj = {
    id,
    nBookNo,
    sGBID,
    remarks,
    dtDate: Moment(dtDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(dtDate).format('YYYY-MM-DD') : null,
    //dtDate,
    //sName,
    sCountryID,
    nMadebTypeId,
    nFormNumber,
    nAuthRegionId,
    nUpdatedBy: userId
  }
  console.log("gbSerialObj Object received in dialog", gbSerialObj);

  let valueAuthRegion = [];

  authRegions.forEach(element => {
    if (element.id === nAuthRegionId) {
      valueAuthRegion = element;
    }
  });

  let valueMadebTypes = [];
  console.log(nMadebTypeId);
  madebTypes.forEach(element => {
    if (element.id === nMadebTypeId) {
      valueMadebTypes = element;
    }
  });

  let valueCountryName = [];
  console.log("Country list\n", countries);
  countries.forEach(element => {
    if (element.sCountryID === sCountryID) {
      valueCountryName = element;
    }
  });

  return (
    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Green Book Serial Number</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container spacing={3}>
                {/*<Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="dtDate"
                      name="dtDate"
                      label="Date"
                      type="date"
                      defaultValue={dtDate}
                      className={props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => { setDate(e.target.value) }}
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
                        variant="dialog"
                        // openTo="year"
                        // views={["year", "month", "date"]}
                        margin="dense"
                        id="id_dtDate"
                        name="name_dtDate"
                        label={<>Date<span style={{ color: 'red' }}> *</span></>}
                        format={sDateFormatMUIDatepicker}
                        returnMoment={true}
                        onChange={(date) => {
                          if (date) {
                            setDate(date);
                            setValue('name_dtDate', date, { shouldValidate: true });
                          }
                        }}
                        value={dtDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        fullWidth
                        //className={props.classes.dateField}
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
                    <TextField
                      id="nBookNo"
                      name="nBookNo"
                      label="Book Serial No"
                      type='number'
                      value={nBookNo}
                      onChange={(e) => {
                        setBookNo(parseInt(e.target.value));
                        console.log("Value of Book Serial number changed to:", parseInt(e.target.value));
                      }}
                      InputProps={{
                        readOnly: true
                      }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("nBookNo.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sName"
                      name="sName"
                      label="Name"
                      //required={true}
                      InputProps={{
                        readOnly: true
                      }}
                      color="text.disabled"
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
                    <Autocomplete

                      openOnFocus
                      clearOnEscape
                      onChange={
                        (e, value) => {
                          if (value !== null) {
                            console.log("Value in Country id:", value.sCountryID);
                            setCountryID(value.sCountryID);
                          }
                          else {
                            setCountryID('');
                          }
                        }
                      }
                      value={valueCountryName}
                      id="id_sCountryID"
                      options={countries}
                      autoHighlight
                      getOptionLabel={(option) => option.sCountry}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span>{option.sCountry}</span>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Country"
                          variant="standard"
                          InputProps={{
                            readOnly: true
                          }}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off',

                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="sCountryID"
                                            label="Country ID"
                                            value={sCountryID}
                                            onChange={(e) => { setCountryID(e.target.value) }}
                                        />
                                    </FormControl>
                                </Grid> */}

                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sGBID"
                      label="GBID"
                      name="sGBID"
                      InputProps={{
                        readOnly: true
                      }}
                      //required={true}
                      value={sGBID}
                      onChange={(e) => { setGbId(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sGBID.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
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
                            console.log(value.id);
                            setMadebTypeId(value.id);
                          }
                          else {
                            setMadebTypeId(0);
                          }
                        }
                      }
                      value={valueMadebTypes}
                      id="id_nMadebTypeId"
                      options={madebTypes}
                      autoHighlight
                      getOptionLabel={(option) => option.sMadebType}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span>{option.sMadebType}</span>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Madeb Type"
                          variant="standard"
                          InputProps={{
                            readOnly: true
                          }}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off',

                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nFormNumber"
                      label="Form Number"
                      type="number"
                      InputProps={{
                        readOnly: true,
                      }}
                      value={nFormNumber}
                      onChange={(e) => { setFormNumber(parseInt(e.target.value)) }}
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
                            console.log(value.id);
                            setAuthRegionId(value.id);
                          }
                          else {
                            setAuthRegionId(0);
                          }
                        }
                      }
                      value={valueAuthRegion}
                      id="id_nAuthorityId"
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
                          label="Authority Region"
                          variant="standard"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off',
                          }}
                          InputProps={{
                            readOnly: true
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="remarks"
                      name="remarks"
                      label="Remarks"
                      multiline
                      value={remarks}
                      rows={2}
                      rowsMax={2}
                      onChange={(e) => {
                        setRemarks(e.target.value);
                        console.log("Value of remarks changed to:", e.target.value);
                      }}
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
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  console.log("Hello from Add dialog");
  const { register, handleSubmit, watch, errors } = useForm();
  console.log("Serial Object\n", props.gbSerialObj);
  // const [snackbarOpen,setSnackbarOpen]=React.useState(false);
  // const snackbarClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setSnackbarOpen(false);
  // };
  const handleSubmitEditRecord = () => {
    props.addAPICall(gbSerialObj);

    // setMessage("Record Successfully Edited");
    // setAlertType('success');
    // setSnackbarOpen(true)
  }
  const [message, setMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('');

  const [authRegions, setAuthRegionData] = React.useState(props.selectData['authRegions']);
  const [madebTypes, setMadebTypesData] = React.useState(props.selectData['madebTypes']);
  const [countries, setCountriesData] = React.useState(props.selectData['countries']);

  const [id, setId] = React.useState(0);
  const [nBookNo, setBookNo] = useState(props.selectData['nBookNo']);
  const [sGBID, setGbId] = useState('');
  const [remarks, setRemarks] = React.useState('');
  const [dtDate, setDate] = React.useState(new Date(Date.now()).toISOString().substring(0, 10));
  const [sName, setName] = React.useState('');
  const [sCountryID, setCountryID] = React.useState('');
  const [nMadebTypeId, setMadebTypeId] = React.useState(0);
  const [nFormNumber, setFormNumber] = React.useState(0);
  const [nAuthRegionId, setAuthRegionId] = React.useState(0);
  const [valueCountryName, setValueCountryName] = React.useState([]);
  const [valueAuthRegion, setValueAuthRegion] = React.useState([]);
  const [valueMadebTypes, setValueMadebTypes] = React.useState([]);

  const gbSerialObj = {
    id,
    nBookNo,
    sGBID,
    remarks,
    dtDate,
    //sName,
    sCountryID,
    nMadebTypeId,
    nFormNumber,
    nAuthRegionId,
    nEnteredBy: userId,
    nUpdatedBy: userId
  }
  console.log("gbSerialObj Object received in Add dialog", gbSerialObj);

  // let valueAuthRegion = [];

  //  authRegions.forEach(element => {
  //     if(element.id === nAuthRegionId){
  //         valueAuthRegion = element;
  //     }
  //   });

  //let valueMadebTypes = [];
  // //console.log(nMadebTypeId);
  // madebTypes.forEach(element => {
  //   if(element.id === nMadebTypeId){
  //     valueMadebTypes = element;
  //   }
  // });

  //let valueCountryName = [];
  // console.log("Country list\n", countries);
  // countries.forEach(element => {
  //   if(element.sCountryID === sCountryID){
  //     valueCountryName = element;
  //     console.log("valueCountryName variable: ", valueCountryName);
  //   }
  // });


  const formPopulate = (value) => {
    console.log("Value in GBID: ", value);
    const gbid = value;
    const event = new Event('change', {
      bubbles: true
    });
    /* Need Greenbook record by passing GBID
     * from Greenbook controller. 
     * Must talk to Malay.
    */
    const sNameElement = document.getElementById("sName");
    const sCountryElement = document.getElementById("id_sCountryID");
    const sAuthRegionElement = document.getElementById("id_nAuthorityId");

    axios.get(`Greenbook/GetGreenbook/sGBID=` + gbid)
      .then(resp => {
        if (resp.status === 200) {
          console.log("Got gb record\n", resp.data);
          console.log("Name Element:", sNameElement);
          const name = resp.data.sFirstName ? resp.data.sFirstName : '';
          const mname = resp.data.sMiddleName ? resp.data.sMiddleName : '';
          const lname = resp.data.sLastName ? resp.data.sLastName : '';
          const country = countries.find((x) => x.sCountryID === resp.data.sCountryID);
          const region = authRegions.find((x) => x.id === resp.data.nAuthRegionID);
          setCountryID(country.sCountryID);
          setAuthRegionId(region.id);

          // Handle validation on automatic field set. React fails to do this.

          // For name
          var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype, "value").set;
          nativeInputValueSetter.call(sNameElement, `${name} ${mname} ${lname}`);
          setName(`${name} ${mname} ${lname}`);
          var inputEvent = new Event("input", { bubbles: true });
          sNameElement.dispatchEvent(inputEvent);

          // For Country dropdown
          var nivs = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype, "value").set;
          setValueCountryName(country);
          nivs.call(sCountryElement, country.sCountry);


          var nivsInputEvent = new Event("input", { bubbles: true });
          sCountryElement.dispatchEvent(nivsInputEvent);

          // For Authority Regions drop down
          const nivs1 = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype, "value").set;
          nivs1.call(sAuthRegionElement, region.sAuthRegion);

          sAuthRegionElement.dispatchEvent(new Event("input", { bubbles: true }));



          //sAuthRegionElement.focus();
        }
        else {
          setName('');
          setCountryID('');
          setAuthRegionId(0);
          console.log(resp);
        }
      })
      .catch((error) => {
        setName('');

        console.log(error);
      });
  };
  const btnstyles = { background: 'none', border: 'none', cursor: 'pointer', color: 'blue' };

  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Green Book Serial Number</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="dtDate"
                      name="dtDate"
                      label="Date"
                      type="date"
                      defaultValue={dtDate}
                      className={props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => { setDate(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("dtDate.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>

                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nBookNo"
                      name="nBookNo"
                      label="Book Serial No"
                      type='number'
                      value={nBookNo}
                      onChange={(e) => {
                        setBookNo(parseInt(e.target.value));
                        console.log("Value of Book Serial number changed to:", parseInt(e.target.value));
                      }}
                      InputProps={{
                        readOnly: true
                      }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("nBookNo.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sGBID"
                      label="GBID"
                      name="sGBID"
                      //required={true}
                      value={sGBID}
                      onChange={(e) => { setGbId(e.target.value) }}
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
                      name="sName"
                      label="Name"
                      //required={true}
                      InputProps={{
                        readOnly: true
                      }}
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
                    <Autocomplete
                      openOnFocus
                      clearOnEscape
                      onChange={
                        (e, value) => {
                          if (value !== null) {
                            console.log("Value in Country id:", value.sCountryID);
                            setCountryID(value.sCountryID);
                            setValueCountryName(value);
                          }
                          else {
                            setCountryID('');
                          }
                        }
                      }
                      value={valueCountryName}
                      id="id_sCountryID"
                      name="sCountry_name"
                      options={countries}
                      autoHighlight
                      getOptionLabel={(option) => option.sCountry}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span>{option.sCountry}</span>
                        </React.Fragment>
                      )}
                      inputRef={register({
                        required: true
                      })}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="sCountry"
                          label="Country"
                          name="sCountry"
                          variant="standard"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                    {_.get("sCountry_name.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
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
                            console.log(value.id);
                            setMadebTypeId(value.id);
                            setValueMadebTypes(value);
                          }
                          else {
                            setMadebTypeId(0);
                          }
                        }
                      }
                      value={valueMadebTypes}
                      id="id_nMadebTypeId"
                      options={madebTypes}
                      autoHighlight
                      getOptionLabel={(option) => option.sMadebType}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span>{option.sMadebType}</span>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Madeb Type"
                          name="sMadebType"
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
                    />
                    {_.get("sMadebType.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="nFormNumber"
                      label="Form Number"
                      name="nFormNumber"
                      type="number"
                      InputProps={{
                        readOnly: true,
                      }}
                      value={nFormNumber}
                      onChange={(e) => { setFormNumber(parseInt(e.target.value)) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sMadebType.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
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
                            console.log(value.id);
                            setAuthRegionId(value.id);
                          }
                          else {
                            setAuthRegionId(0);
                          }
                        }
                      }
                      value={valueAuthRegion}
                      id="id_nAuthorityId"
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
                          label="Authority Region"
                          name="sAuthRegion"
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
                    />
                    {_.get("sAuthRegion.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="remarks"
                      name="remarks"
                      label="Remarks"
                      multiline
                      rows={2}
                      rowsMax={2}
                      value={remarks}
                      onChange={(e) => {
                        setRemarks(e.target.value);
                        console.log("Value of remarks changed to:", e.target.value);
                      }}
                    />
                  </FormControl>
                </Grid>
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