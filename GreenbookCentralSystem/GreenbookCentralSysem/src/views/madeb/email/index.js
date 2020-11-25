import React, { useEffect, useState } from 'react';
// import axios from 'axios';
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
  Select,
  TextareaAutosize
} from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import handleError from "../../../auth/_helpers/handleError";
import { useHistory } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EmailDialog = (props) => {
  let history = useHistory();
  const [id, setId] = React.useState(props.emailInObj.id);
  const [madebName, setMadebName] = React.useState(props.emailInObj.madebName)
  const [formNumber, setFormNumber] = React.useState(props.emailInObj.nFormNumber);
  const [name, setName] = React.useState(props.emailInObj.sName);
  const [recipient, setRecipient] = React.useState('');
  const [sender, setSender] = React.useState("");
  const [subject, setSubject] = React.useState(madebName + ' case no: ' + formNumber.toString() + '  Name: ' + name);
  const [body, setBody] = React.useState(madebName + ' case no:' + formNumber.toString() + ' \nName: ' + name + '\nPostal Address:');

  console.log(props.emailInObj);
  const emailOutObj = {
    id: id,
    nFormNumber: formNumber,
    sName: name,
    sFrom: sender,
    sReceiver: recipient,
    sSubject: subject,
    sBody: body
  }

  const SendEmail = ((emailObj) => {
    axios.post(`Madeb/SendEmail`, emailObj)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          alert("Success.\n" + resp.data);
          props.handleEmailClickClose();
        }
      })
      .catch(error => {
        alert(error.message + "\nThere was an error sending your email. Please check your network status or if the email address is correct.");
      });
  });



  useEffect(() => {
    axios.get(`/CTAConfig/GetCTAConfigByKey/Key=CTAAdminEmail`)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data.sValue);
          setSender(resp.data.sValue);
        }
      })
      .catch(error => {
        handleError(error, history);
      })
      .then(release => {
        //console.log(release); => udefined
      });
  });

  return (



    <Dialog open={props.emailModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Email {madebName} Madeb</DialogTitle>

      <DialogContent>
        <DialogContentText>
          <div>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="sender"
                    label="Sender"
                    type="text"
                    required={true}
                    InputProps={{
                      // readOnly: true,
                      disabled: true
                    }}
                    // className={props.classes.textField}
                    value={sender}
                    onChange={(e) => { setSender(e.target.value) }}

                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="recipient"
                    label="Recipient"
                    type="email"
                    required={true}


                    onChange={(e) => { setRecipient(e.target.value) }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>

                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="subject"
                    label="Subject"

                    required={true}

                    value={subject}
                    onChange={(e) => { setSubject(e.target.value) }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="message"
                    label="Message"
                    required={true}
                    multiline
                    rowsMax={4}
                    value={body}
                    onChange={(e) => { setBody(e.target.value) }}
                  />
                </FormControl>

              </Grid>

            </Grid>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleEmailClickClose} color="primary">Cancel</Button>

        {/* <Button  type='submit' onClick={handleSubmit} color="primary">Save</Button> */}

        {/*<Snackbar open={snackbarOpen} autoHideDuration={3000}  onClose={snackbarClose} >
          <Alert  onClose={snackbarClose} severity={alertType}  >
           {message}
          </Alert>
        </Snackbar>*/}

        <Button onClick={() => SendEmail(emailOutObj)} color="primary">Send</Button>
      </DialogActions>

    </Dialog>
  );


}