import React, { useState } from 'react';
import {
  Grid,
  Button,
  FormControl,
  TextField,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControlLabel,
  FormGroup
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Switch from '@material-ui/core/Switch';


import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EditDialog = (props) => {
  const [Id, setId] = React.useState(props.oLnkObj.id)
  const [nFeatureID, setnFeatureID] = React.useState(props.oLnkObj.nFeatureID);
  const [nUserRightsId, setnUserRightsId] = React.useState(props.oLnkObj.nUserRightsID);
  const [nRights, setnRights] = React.useState(props.oLnkObj.nRights);
  const [sFeature, setsFeature] = React.useState(props.oLnkObj.sFeature);
  const [sUserRightsName, setsUserRightsName] = React.useState(props.oLnkObj.sUserRightsName);
  const handleChange = (e) => {
    //console.log(e);
    if (nRights === 1) {
      setnRights(0);
    }
    else {
      setnRights(1);
    }
  };
  return (
    <Dialog open={props.editModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Mapping</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div>
            <Grid container>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_sFeature"
                    label="Feature"
                    type="text"
                    InputProps={{
                      readOnly: true,
                      disabled: true
                    }}
                    value={sFeature}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_sUserRightsName"
                    label="Role Name"
                    type="text"
                    InputProps={{
                      readOnly: true,
                      disabled: true
                    }}
                    value={sUserRightsName}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      //value="start"
                      control=
                      {
                        <Switch
                          color="primary"
                          name="name_bRights"
                          id="id_nRights"
                          checked={nRights === 1 ? true : false}
                          onChange={handleChange}
                          size="small"
                        />}
                      label="Mapping"
                      labelPlacement="start"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleEditClickClose} color="primary">Cancel</Button>
        <Button onClick={() => {
          props.editAPICall({
            Id,
            nFeatureID,
            nUserRightsId,
            nRights
          });
        }
        } color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export const DeleteDialog = (props) => {
  console.log("Delete Dialog");
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
}

export const AddDialog = (props) => {
  const [lUserRights, setlUserRights] = React.useState(props.lUserRights);
  const [lstFeature, setlstFeature] = React.useState(props.lstFeature);
  //console.log("Add Dialog");

  const [Id, setId] = React.useState(0)
  const [nFeatureID, setnFeatureID] = React.useState(0);
  const [nUserRightsId, setnUserRightsId] = React.useState(0);
  const [nRights, setnRights] = React.useState(1);
  const [sFeature, setsFeature] = React.useState('');
  const [sUserRightsName, setsUserRightsName] = React.useState('');

  const handleChange = (e) => {
    //console.log(e);
    if (nRights === 1) {
      setnRights(0);
    }
    else {
      setnRights(1);
    }
  };

  return (
    <Dialog open={props.addModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Mapping</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid item xs={12}>
              <FormControl className={props.classes.formControl}>
                <Autocomplete
                  openOnFocus
                  clearOnEscape
                  onChange={
                    (e, value) => {
                      if (value !== null) {
                        console.log(value);
                        setnFeatureID(value.id);
                        setsFeature(value.sFeature);
                      }
                      else {
                        setnFeatureID(0);
                        setsFeature("");
                      }
                    }
                  }
                  id="id_nFeatureID"
                  options={lstFeature}
                  classes={{
                    option: props.classes.option,
                  }}
                  className={props.classes.textField}
                  autoHighlight
                  getOptionLabel={(option) => option.sFeature}
                  renderOption={(option) => (
                    <React.Fragment>
                      <span>{option.sFeature}</span>
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Feature"
                      variant="standard"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <FormControl className={props.classes.formControl}>
                <Autocomplete
                  openOnFocus
                  clearOnEscape
                  onChange={
                    (e, value) => {
                      if (value !== null) {
                        console.log(value);
                        setnUserRightsId(value.id);
                        setsUserRightsName(value.sUserRightsName);
                      }
                      else {
                        setnUserRightsId(0);
                        setsUserRightsName("");
                      }
                    }
                  }
                  id="id_nUserRightsId"
                  options={lUserRights}
                  classes={{
                    option: props.classes.option,
                  }}
                  className={props.classes.textField}
                  autoHighlight
                  getOptionLabel={(option) => option.sUserRightsName}
                  renderOption={(option) => (
                    <React.Fragment>
                      <span>{option.sUserRightsName}</span>
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Role"
                      variant="standard"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={props.classes.formControl}>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    //value="start"
                    control=
                    {
                      <Switch
                        color="primary"
                        name="name_bRights"
                        id="id_nRights"
                        checked={nRights === 1 ? true : false}
                        onChange={handleChange}
                        size="small"
                      />}
                    label="Mapping"
                    labelPlacement="start"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleAddClickClose} color="primary">Cancel</Button>
        <Button onClick={() => {
          props.addAPICall(
            {
              nFeatureID,
              nUserRightsId,
              nRights
            }
          )
          // console.log(
          //   Id,
          //   nFeatureID,
          //   nUserRightsId,
          //   nRights,
          //   sFeature,
          //   sUserRightsName
          // )
        }} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}