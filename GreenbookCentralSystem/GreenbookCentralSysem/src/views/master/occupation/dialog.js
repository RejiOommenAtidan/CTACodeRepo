import React, { useEffect, useState } from 'react';

import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  FormControl,
  TextField
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
  const [occupationDesc, setOccupationDesc] = useState(props.occupationObj.occupationDesc);
  const [occupationDescTibetan, setOccupationDescTibetan] = useState(props.occupationObj.occupationDescTibetan);
  return (
    <Dialog open={props.editModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Occupation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div>
            <Grid container>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_occupationDesc"
                    label="Occupation"
                    type="text"
                    // InputProps={{
                    //   readOnly: true
                    // }}
                    value={occupationDesc}
                    onChange={(e) => { setOccupationDesc(e.target.value) }}

                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_OccupationDescTibetan"
                    label="Occupation (in Tibetan)"
                    type="text"
                    value={occupationDescTibetan} 
                    onChange={(e) => { setOccupationDescTibetan(e.target.value) }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleEditClickClose} color="primary">Cancel</Button>
        <Button onClick={() => props.editAPICall({ id: props.occupationObj.id, sOccupationDesc: occupationDesc, sOccupationDescTibetan: occupationDescTibetan })} color="primary">Save</Button>
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
          Are you sure you want to delete occupation {props.occupationDesc} ?
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
  const [occupationDesc, setOccupationDesc] = useState('');
  const [occupationDescTibetan, setOccupationDescTibetan] = useState('');
  return (
    <Dialog open={props.addModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Occupation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid item xs={12}>
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_occupationDesc"
                  label="Occupation"
                  type="text"
                  onChange={(e) => { setOccupationDesc(e.target.value) }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_OccupationDescTibetan"
                  label="Occupation (in Tibetan)"
                  type="text"
                  onChange={(e) => { setOccupationDescTibetan(e.target.value) }}
                />
              </FormControl>
            </Grid>
          </Grid>

        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleAddClickClose} color="primary">Cancel</Button>
        <Button onClick={() => props.addAPICall({ sOccupationDesc: occupationDesc, sOccupationDescTibetan: occupationDescTibetan })} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );

}
