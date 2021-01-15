import React, { useState } from 'react';
import {
  Grid,
  Button,
  FormControl,
  TextField,
} from '@material-ui/core';

import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import {
  sButtonColor, sButtonSize, sButtonVariant
} from "../../../config/commonConfig";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EditDialog = (props) => {

  // console.log("Props object", props);
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.Id);
  const { register, handleSubmit, errors, formState } = useForm();
  const [authRegion, setAuthRegion] = useState(props.authRegionObj.authRegion);
  const [countryID, setCountryID] = useState(props.authRegionObj.countryID);
  const [sCurrencyCode, setCurrencyCode] = useState(props.authRegionObj.sCurrencyCode);

  const ids = props.countryList.map((data) => data.sCountryID);
  let value = "";
  ids.forEach(element => {
    if (element === countryID) {
      value = element;
    }
  });
  const children = () => {
    return (props.countryList.map((country) => (<option value={country.sCountryID}>{country.sCountry}</option>)))
  };
  const opts = children();

  let valueCountry = [];
  props.countryList.forEach(element => {
    if (element.sCountryID === countryID) {
      valueCountry = element;
    }
  })

  // console.log("Country select is : ", valueCountry);

  const handleSubmitEditRecord = () => {
    props.editAPICall(
      {
        ID: props.authRegionObj.ID,
        sCountryID: countryID,
        sAuthRegion: authRegion,
        sCurrencyCode,
        nUpdatedBy: userId
      }
    )
  }

  return (
    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Authority Region</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <FormControl className={props.classes.formControl}>
                  <Autocomplete
                    openOnFocus
                    fullWidth
                    style={{ width: 250 }}
                    clearOnEscape
                    onChange={
                      (e, value) => {
                        if (value !== null) {
                          console.log(value.sCountryID);
                          setCountryID(value.sCountryID);
                        }
                        else {
                          setCountryID(0);
                        }
                      }
                    }
                    style={{ width: 180 }}
                    value={valueCountry}
                    id="id_sCountryID"
                    options={props.countryList}
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
                        label={<>Country<span style={{ color: 'red' }}> *</span></>}
                        variant="standard"
                        inputRef={register({
                          required: true
                        })}
                        name="text_country"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'off', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                  {_.get("text_country.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              {/*<Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <Select 
                    id="countryID"
                    label="Country ID"
                    native = {false}
                    children = {opts}
                    value = {value}
                    onChange={(e) => { console.log(e.target.value);
                      setCountryID(e.target.value) }}
                  >
                  </Select>
                </FormControl>
                    </Grid>*/}

              <Grid item xs={12} >
                <FormControl>
                  <TextField
                    id="id_AuthRegion"
                    label={<>Authority Region<span style={{ color: 'red' }}> *</span></>}
                    type="text"
                    value={authRegion} // Set Auth Region name 
                    onChange={(e) => { setAuthRegion(e.target.value) }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl>
                  <TextField
                    id="id_CurrencyCode"
                    label={<>Currency Code<span style={{ color: 'red' }}> *</span></>}
                    type="text"
                    inputRef={register({
                      required: true
                    })}
                    name="name_CurrencyCode"
                    value={sCurrencyCode} // Set Auth Region name 
                    onChange={(e) => { setCurrencyCode(e.target.value) }}
                  />
                  {_.get("name_CurrencyCode.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleEditClickClose}
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
          >Cancel</Button>
          {/* <Button onClick={() => props.editAPICall({ ID: props.authRegionObj.ID, sCountryID: countryID, sAuthRegion: authRegion })} color="primary">Save</Button> */}
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
          Are you sure you want to delete Auth Region {props.authRegion} ?
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
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.Id);
  const { register, handleSubmit, errors, formState } = useForm();
  const ids = props.dataAPI.map((data) => data.sCountryID);
  const [countryID, setCountryID] = useState(ids[0]);
  const [authRegion, setAuthRegion] = useState('');
  const [sCurrencyCode, setCurrencyCode] = useState('');
  // const children =  () => { 
  //   return (ids.filter((data, index, array) => (array.indexOf(data) == index)).map((filteredData) =>  (<option value={filteredData}>{filteredData}</option>)))};
  const children = () => {
    return (props.countryList.map((country) => (<option value={country.sCountryID}>{country.sCountry}</option>)))
  };

  const opts = children();
  //const opts1 = (<option>CJ</option>);

  let valueCountry = [];


  const handleSubmitAddRecord = () => {
    props.addAPICall(
      {
        sCountryID: countryID,
        sAuthRegion: authRegion,
        nEnteredBy: userId,
        sCurrencyCode,
        nUpdatedBy: userId
      }
    )
  }

  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Authority Region</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitAddRecord)}>
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item xs={12} sm={12} lg={12} >
                <FormControl >
                  <Autocomplete
                    openOnFocus
                    clearOnEscape
                    onChange={
                      (e, value) => {
                        if (value !== null) {
                          console.log(value.sCountryID);
                          setCountryID(value.sCountryID);
                        }
                        else {
                          setCountryID(0);
                        }
                      }
                    }
                    //value={valueCountry}
                    style={{ width: '250px' }}
                    id="id_sCountryID"
                    options={props.countryList}
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
                        label={<>Country<span style={{ color: 'red' }}> *</span></>}
                        variant="standard"
                        inputRef={register({
                          required: true
                        })}
                        name="text_country"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'off', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                  {_.get("text_country.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
            <FormControl className={props.classes.formControl}>
              <Select 
                id="countryID"
                label="Country ID"
                native = {true}
                children = {opts}
                onChange={(e) => { setCountryID(e.target.value) }}
              >
              </Select>
            </FormControl>
          </Grid> */}
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_AuthRegion"
                    name="sAuthRegion"
                    label={<>Authority Region<span style={{ color: 'red' }}> *</span></>}
                    type="text"
                    onChange={(e) => { setAuthRegion(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("sAuthRegion.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl>
                  <TextField
                    id="id_CurrencyCode"
                    label={<>Currency Code<span style={{ color: 'red' }}> *</span></>}
                    type="text"
                    inputRef={register({
                      required: true
                    })}
                    name="name_CurrencyCode"
                    value={sCurrencyCode} // Set Auth Region name 
                    onChange={(e) => { setCurrencyCode(e.target.value) }}
                  />
                  {_.get("name_CurrencyCode.type", errors) === "required" && (
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
          {/* <Button onClick={() => props.addAPICall({ sCountryID: countryID, sAuthRegion: authRegion })} color="primary">Save</Button> */}
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

const Children = (props) => {
  console.log("Children");
  return (props.dataAPI.map((data) => {
    debugger;
    console.log(data);
    return (<option>{data.sCountryID}</option>)
  }));
}
