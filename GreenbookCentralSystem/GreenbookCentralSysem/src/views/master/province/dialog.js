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
import { useForm } from "react-hook-form";
import _ from "lodash/fp";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EditDialog = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const handleSubmitEditRecord = () => {
    props.editAPICall({ id: props.provinceObj.id, sProvince: province })
  }
  
  //debugger
  const [province, setProvince] = useState(props.provinceObj.province);
  return (
    <Dialog open={props.editModal} onEscapeKeyDown={props.handleEditClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Province</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditRecord)}>
      <DialogContent>
        <DialogContentText>
          <div>
            <Grid container>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_provinceId"
                    name = "sProvince"
                    label="Province"
                    type="text"
                    value={province}
                    onChange={(e) => { setProvince(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("sProvince.type", errors) === "required" && (
                      <span style={{color: 'red'}}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleEditClickClose} color="primary">Cancel</Button>
        {/* <Button onClick={() => props.editAPICall({ id: props.provinceObj.id, sProvince: province })} color="primary">Save</Button> */}
        <Button type="submit" color="primary">Save</Button> 
      </DialogActions>
      </form>
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
          Are you sure you want to delete province {props.province} ?
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
  const { register, handleSubmit, watch, errors } = useForm();
  const handleSubmitAddRecord = () => {
    props.addAPICall({ sProvince: province })
  }
  console.log("Add Dialog");
  const [province, setProvince] = useState('');
  return (
    <Dialog open={props.addModal} onEscapeKeyDown={props.handleAddClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Province</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitAddRecord)}>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid item xs={12}>
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_province"
                  name = "sProvince"
                  label="Province"
                  type="text"
                  onChange={(e) => { setProvince(e.target.value) }}
                  inputRef={register({
                    required: true
                  })}
                />
                 {_.get("sProvince.type", errors) === "required" && (
                      <span style={{color: 'red'}}>This field is required</span>
                  )}
              </FormControl>
            </Grid>
            
          </Grid>

        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleAddClickClose} color="primary">Cancel</Button>
        {/* <Button onClick={() => props.addAPICall({ sProvince: province })} color="primary">Save</Button> */}
        <Button type="submit" color="primary">Save</Button> 
      </DialogActions>
      </form>
    </Dialog>
  );

}
