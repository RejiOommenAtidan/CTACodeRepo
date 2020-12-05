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

import { sButtonColor, sButtonSize, sButtonVariant } from '../../../config/commonConfig';

export const AddDialog = (props) => {

  console.log("Hello from Add dialog");

  console.log("gbSerialObj Object received in Add dialog: ", props.gbSerialObj);
  const { register, handleSubmit, watch, errors, clearErrors, control, setValue, formState } = useForm();

  let clicked = false;

  const handleSubmitAndRedirect = (e) => {
    console.log("Clicked redirect:", e);

  }

  const handleSubmitEditRecord = (e) => {
    console.log("Plain", e);
    console.log("Clicked state", clicked);
    //alert("Submission Called.");


    props.addAPICall(gbSerialObj, clicked);

    // setMessage("Record Successfully Edited");
    // setAlertType('success');
    // setSnackbarOpen(true)
  }
  const [message, setMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('');

  const [authRegions, setAuthRegions] = React.useState(props.selectData['authRegions']);
  const [madebTypes, setMadebTypes] = React.useState(props.selectData['madebTypes']);
  const [countries, setCountries] = React.useState(props.selectData['countries']);

  const [id, setId] = React.useState(0);
  const [nBookNo, setBookNo] = useState(props.selectData['nBookNo']);
  const [sGBID, setGbId] = useState(props.gbSerialObj.sGBID);
  const [remarks, setRemarks] = React.useState('');
  const [dtDate, setDate] = React.useState(new Date(Date.now()).toISOString().substring(0, 10));
  const [sName, setName] = React.useState(props.gbSerialObj.sName);
  const [sCountryID, setCountryID] = React.useState('');
  const [nMadebTypeId, setMadebTypeId] = React.useState(0);
  const [nFormNumber, setFormNumber] = React.useState(props.gbSerialObj.nFormNumber);
  const [nAuthRegionId, setAuthRegionId] = React.useState(0);
  const [valueCountryName, setValueCountryName] = React.useState([]);
  //const [valueAuthRegion, setValueAuthRegion] = React.useState([]);
  const [authRegion, setAuthRegion] = React.useState(props.selectData['authRegions'].find((x) => x.sAuthRegion === props.gbSerialObj.sAuthRegion));
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
    nAuthRegionId
  }
  console.log("Object gbSerial modified as: ", gbSerialObj);



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
          const region = authRegions.find((x) => x.sAuthRegion === props.gbSerialObj.sAuthRegion);
          const madeb = madebTypes.find((x) => x.sMadebType === props.gbSerialObj.sMadebType)
          country && setCountryID(country.sCountryID);
          region && setAuthRegionId(region.id);
          madeb && setMadebTypeId(madeb.id);
          setValue("AuthRegion", region, {
            shouldValidate: true,
            shouldDirty: true
          })
          // Handle validation on automatic field set. React fails to do this.

          // For name
          // var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          //     window.HTMLInputElement.prototype, "value").set;
          // nativeInputValueSetter.call(sNameElement, `${name} ${mname} ${lname}`);
          setName(`${name} ${mname} ${lname}`);
          // var inputEvent = new Event("input", { bubbles: true });
          // sNameElement.dispatchEvent(inputEvent);

          // For Country dropdown
          // var nivs = Object.getOwnPropertyDescriptor(
          //   window.HTMLInputElement.prototype, "value").set;
          setValueCountryName(country);
          // nivs.call(sCountryElement, country.sCountry);


          // var nivsInputEvent = new Event("input", {bubbles: true});
          // sCountryElement.dispatchEvent(nivsInputEvent);

          // For Authority Regions drop down
          // const nivs1 = Object.getOwnPropertyDescriptor(
          //   window.HTMLInputElement.prototype, "value").set;
          // nivs1.call(sAuthRegionElement, region.sAuthRegion);

          // sAuthRegionElement.dispatchEvent(new Event("input", {bubbles: true}));

          //setValueAuthRegion(region);
          setValueMadebTypes(madeb);

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



  useEffect(() => {
    formPopulate(sGBID);
  }, []);

  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Generate Green Book Serial Number</DialogTitle>
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
                      disabled
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
                      InputProps={{
                        readOnly: true

                      }}
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
                    <TextField
                      id="sName"
                      name="sName"
                      label="Name"
                      required={true}
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
                      aria-required={true}
                      onChange={
                        (e, value) => {
                          if (value !== null) {
                            debugger
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

                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="sCountry"
                          label="Country"
                          name="sCountry"
                          variant="standard"
                          InputProps={{
                            ...params.inputProps,
                            autoComplete: 'off', // disable autocomplete and autofill,
                            readOnly: true
                          }}
                        />
                      )}
                    />

                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <Autocomplete
                      //disabled
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
                          InputProps={{
                            ...params.inputProps,
                            autoComplete: 'off', // disable autocomplete and autofill
                            readOnly: true
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
                      // InputProps={{
                      //     readOnly: true,
                      // }}
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
                    {/* <Autocomplete
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
                                     inputRef={register({
                                      required: true
                                    })}
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
                                      <span style={{color: 'red'}}>This field is required</span>
                                    )} */}
                    <Controller
                      render={props => (
                        <Autocomplete
                          {...props}
                          disabled
                          openOnFocus={true}
                          clearOnEscape
                          autoComplete={true}
                          autoHighlight={true}
                          options={authRegions}
                          getOptionLabel={(option) => option.sAuthRegion}
                          renderOption={(option) => (
                            <React.Fragment>
                              <span>{option.sAuthRegion}</span>
                            </React.Fragment>
                          )}
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Authority"
                              variant="standard"
                              name="sAuthRegionText"
                              inputRef={register({
                                required: true
                              })}
                              InputProps={{
                                ...params.inputProps,
                                autoComplete: 'off', // disable autocomplete and autofill
                                readOnly: true
                              }}
                            />
                          )}
                          onChange={
                            (e, value) => {
                              props.onChange(value);
                              //alert ("onChangeFired")
                              if (value !== null) {
                                console.log(value.id);
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
                          defaultValue={authRegion}
                        />
                      )}
                      name="AuthRegion"
                      control={control}
                      rules={{ required: true }}
                    />
                    {errors.AuthRegion && <span style={{ color: 'red' }}>Enter Authority Region</span>}
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

          <Button type="submit"
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
            name="submit"
            value="Save">Save</Button>
          <Button
            type="submit"
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
            onClick={() => clicked = true}
            name="submit"
            value="Redirect">Save &amp; Redirect to Edit List</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}