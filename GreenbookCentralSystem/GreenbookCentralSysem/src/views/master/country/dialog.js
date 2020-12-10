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
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  sButtonColor, sButtonSize, sButtonVariant
} from "../../../config/commonConfig";

export const EditDialog = (props) => {
  debugger
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const { register, handleSubmit, errors } = useForm();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [nDefaultAuthRegionID, setDefaultAuthRegionID] = React.useState(props.countryObj.nDefaultAuthRegionID);
  const [authRegions, setAuthRegions] = React.useState(props.authRegions);

  const snackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  //console.log("nDefaultAuthRegionID is ", nDefaultAuthRegionID);

  const regions = authRegions && authRegions.filter((a) => {
    return a.sCountryID === props.countryObj.countryId;
  })
  //console.log ("Regions are", regions);

  const valueAuthRegion = authRegions && nDefaultAuthRegionID && authRegions.find((element) => element.id === nDefaultAuthRegionID);
  console.log("valueauthregion is", valueAuthRegion);

  const handleSubmitEditRecord = () => {
    //props.editAPICall(madeb);
    props.editAPICall(
      {
        id: props.countryObj.id,
        sCountryID: props.countryObj.countryId,
        sCountry: Name,
        nDefaultAuthRegionID,
        nUpdatedBy: userId
      }
    )
  }

  const [Name, setCountryName] = useState(props.countryObj.countryName);
  return (
    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Country</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container>
                <Grid item xs={12}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_countryId"
                      label="Country ID"
                      type="text"
                      disabled
                      value={props.countryObj.countryId}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} >
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_CountryName"
                      name="sCountry"
                      label={<>Country Name<span style={{ color: 'red' }}> *</span></>}
                      type="text"
                      autoFocus={true}
                      value={Name}
                      onChange={(e) => { setCountryName(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("sCountry.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} >
                  <FormControl className={props.classes.formControl}>
                    <Autocomplete

                      openOnFocus
                      clearOnEscape
                      autoComplete={true}
                      autoHighlight={true}
                      onChange={
                        (e, value) => {
                          if (value !== null) {
                            console.log("AuthRegion id changed to:", value.id);
                            setDefaultAuthRegionID(value.id);
                          }
                          else {
                            setDefaultAuthRegionID(0);
                          }
                        }
                      }
                      style={{ width: 180 }}
                      value={valueAuthRegion}
                      id="id_nAuthorityId"
                      options={regions}
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
                          //label={<>Authority Region<span style={{color:'red'}}> *</span></>}
                          //className={props.classes.textField}
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
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
          >Cancel</Button>
          {/* <Button onClick={() => props.editAPICall({ id: props.countryObj.id, sCountryID: props.countryObj.countryId, sCountry: Name })} color="primary">Save</Button> */}
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

export const AddDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const [countryId, setCountryId] = useState('');
  const [countryName, setCountryName] = useState('');
  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Country</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid item xs={12}>
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_countryId"
                  label={<>Country ID<span style={{ color: 'red' }}> *</span></>}
                  type="text"
                  onChange={(e) => { setCountryId(e.target.value) }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_CountryName"
                  label={<>Country Name<span style={{ color: 'red' }}> *</span></>}
                  type="text"
                  onChange={(e) => { setCountryName(e.target.value) }}
                />
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
        <Button onClick={() => props.addAPICall(
          {
            sCountryID: countryId,
            sCountry: countryName,
            nEnteredBy: userId,
            nUpdatedBy: userId
          }
        )
        }
          variant={sButtonVariant}
          color={sButtonColor}
          size={sButtonSize}
        >Save</Button>
      </DialogActions>
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