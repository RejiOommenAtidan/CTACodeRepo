import React from 'react';
import {
  Grid,
  Button,
  FormControl,
  TextField
} from '@material-ui/core';
import { useForm } from "react-hook-form";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { sButtonColor, sButtonSize, sButtonVariant } from '../../../config/commonConfig';

export const AssignDialog = (props) => {
  const {  handleSubmit, formState } = useForm();
  console.log("Props object: \n", props);
  const handleSubmitAssign = (e) => {
    e.preventDefault();
    console.log("Handle submit called");
    props.handleAssignGBID();
  }
  return(
    <div>
      <Dialog open={props.assignModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Generate Green Book ID</DialogTitle>
        <form onSubmit={(e) => handleSubmit(handleSubmitAssign(e))}>
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
                            label="Generate Date"
                            type="date"
                            //defaultValue={props.dtReceived.split('T')[0]}
                            defaultValue={props.dtReceived}
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
            <Button 
            onClick={props.handleDialogClose} 
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
            >Cancel</Button>
            <Button 
            type="submit"
            disabled={formState.isSubmitting && formState.isValid}
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
            >Submit</Button> 
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}