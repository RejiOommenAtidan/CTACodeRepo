import React, { useEffect, useState } from 'react';

import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  FormControl,
  TextField,
  Select,
} from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EditDialog = (props) => {
  //debugger
  const [authRegion, setAuthRegion] = useState(props.authRegionObj.authRegion);
  const [countryID, setCountryID] = useState(props.authRegionObj.countryID);
  
  const ids = props.countryList.map((data) => data.sCountryID);
  let value ="";
  ids.forEach(element => {
    if(element === countryID){
      value = element;
    }
  });
  const children =  () => { 
    return (props.countryList.map((country) =>  (<option value={country.sCountryID}>{country.sCountry}</option>)))};
  const opts = children();
  return (
    <Dialog open={props.editModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Authority Region</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div>
            <Grid container>
            <Grid item xs={12}>
            <FormControl className={props.classes.formControl}>
              <Select 
                id="countryID"
                label="Country ID"
                native = {false}
                children = {opts}
                value = {value}
                onChange={(e) => { setCountryID(e.target.value) }}
              >
              </Select>
            </FormControl>
          </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_AuthRegion"
                    label="Auth Region"
                    type="text"
                    value={authRegion} // Set Auth Region name 
                    onChange={(e) => { setAuthRegion(e.target.value) }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleEditClickClose} color="primary">Cancel</Button>
        <Button onClick={() => props.editAPICall({ ID: props.authRegionObj.ID, sCountryID: countryID, sAuthRegion: authRegion })} color="primary">Save</Button>
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
  console.log("Add Dialog");
  const ids = props.dataAPI.map((data) => data.sCountryID);
  const [countryID, setCountryID] = useState(ids[0]);
  const [authRegion, setAuthRegion] = useState('');
  
  const children =  () => { 
    return (ids.filter((data, index, array) => (array.indexOf(data) == index)).map((filteredData) =>  (<option value={filteredData}>{filteredData}</option>)))};
  const opts = children();
  //const opts1 = (<option>CJ</option>);
  return (
    <Dialog open={props.addModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Authority Region</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid item xs={12}>
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
          </Grid>
            <Grid item xs={12} >
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_AuthRegion"
                  label="Auth Region"
                  type="text"
                  onChange={(e) => { setAuthRegion(e.target.value) }}
                />
              </FormControl>
            </Grid>
          </Grid>

        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleAddClickClose} color="primary">Cancel</Button>
        <Button onClick={() => props.addAPICall({ sCountryID: countryID, sAuthRegion: authRegion })} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );

}

const Children = (props) => {
  console.log("Children");
  return (props.dataAPI.map((data) => {
    debugger
    console.log(data);
    return (<option>{data.sCountryID}</option>)
  }));
}
