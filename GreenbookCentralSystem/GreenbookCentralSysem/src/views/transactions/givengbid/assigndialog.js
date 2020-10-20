import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Label } from '@material-ui/icons';


export const AssignDialog = (props) => {
  console.log("Props object: \n", props);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handle submit called");
    props.handleAssignGBID();

  }
  return(
    <div>
      <Dialog open={props.assignModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Generate GreenBook ID</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              <Grid container spacing={3}>
                
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="number"
                      label="Form Number"
                      //type="number"
                      InputProps={{
                        readOnly: true,
                      }}
                      value={props.nFormNumber}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                                    <FormControl className={props.classes.formControl}>
                                        <TextField
                                            id="dtReceived"
                                            name="dtReceived"
                                            label="Received Date"
                                            type="date"
                                            defaultValue={props.dtReceived.split('T')[0]}
                                            className={props.classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                          />
                                         
                                    </FormControl>
                                </Grid>      
                <Grid item xs={12} sm={6}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="gbid"
                      label="Green Book ID"
                      //type="number"
                      InputProps={{
                        readOnly: true,
                      }}
                      value={props.randomGBID}
                    />
                  </FormControl>
                </Grid>
              </Grid>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleDialogClose} color="primary">Cancel</Button>
            <Button type="submit" color="primary">Submit</Button> 
          </DialogActions>
        </form>
      </Dialog>
    </div>

  );
}