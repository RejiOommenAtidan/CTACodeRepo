import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import handleError from "../../../auth/_helpers/handleError";
import { useHistory } from 'react-router-dom';
import { Alerts } from '../../alerts';
import { BackdropComponent } from '../../backdrop';
import { sButtonColor, sButtonSize, sButtonVariant } from '../../../config/commonConfig';
import { useForm } from "react-hook-form";
import _ from "lodash/fp";

export const EmailDialog = (props) => {
  let history = useHistory();
  const { register, handleSubmit, errors, formState } = useForm();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  };
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    setSnackbar(true);
  };
  const snackbarClose = () => {
    setSnackbar(false);
  };
  const [id, setId] = React.useState(props.emailInObj.id);
  const [madebName, setMadebName] = React.useState(props.emailInObj.madebName)
  const [formNumber, setFormNumber] = React.useState(props.emailInObj.nFormNumber);
  const [name, setName] = React.useState(props.emailInObj.sName);
  const [recipient, setRecipient] = React.useState('');
  const [sender, setSender] = React.useState("");
  const [subject, setSubject] = React.useState(madebName + ' case no: ' + formNumber.toString() + '  Name: ' + name);
  const [body, setBody] = React.useState(madebName + ' case no:' + formNumber.toString() + ' \nName: ' + name + '\nPostal Address:');
  const [backdrop, setBackdrop] = React.useState(false);

  console.log(props.emailInObj);


  const SendEmail = () => {
    const emailOutObj = {
      id: id,
      nFormNumber: formNumber,
      sName: name,
      nMadebTypeId: props.emailInObj.nMadebTypeId,
      sFrom: sender,
      sReceiver: recipient,
      sSubject: subject,
      sBody: body
    };
    setBackdrop(true);
    axios.post(`Madeb/SendEmail`, emailOutObj)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          //alert("Success.\n" + resp.data);
          setAlertMessage('Email Sent Successfully');
          setAlertType('success');
          snackbarOpen();
          setBackdrop(false);
          setTimeout(() => { props.handleEmailClickClose() }, 3000);
        }
      })
      .catch(error => {
        //alert(error.message + "\nThere was an error sending your email. Please check your network status or if the email address is correct.");
        setAlertMessage(`There was an error sending your email \nError:${error.message}.`);
        setAlertType('error');
        snackbarOpen();
        setBackdrop(false);
      });
  };

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
  }, []);

  return (
    <Dialog open={props.emailModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Email {madebName} Madeb</DialogTitle>
      <form onSubmit={handleSubmit(SendEmail)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="sender"
                      name="name_sender"
                      //label="Sender"
                      type="text"
                      label={<>Sender<span style={{ color: 'red' }}> *</span></>}
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
                      name="name_recipient"
                      //label="Recipient"
                      type="email"
                      label={<>Recipient<span style={{ color: 'red' }}> *</span></>}
                      onChange={(e) => { setRecipient(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("name_recipient.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>

                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="subject"
                      name="name_subject"
                      label={<>Subject<span style={{ color: 'red' }}> *</span></>}
                      value={subject}
                      onChange={(e) => { setSubject(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("name_subject.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="message"
                      name="name_message"
                      label={<>Message<span style={{ color: 'red' }}> *</span></>}
                      //required={true}
                      multiline
                      rowsMax={4}
                      value={body}
                      onChange={(e) => { setBody(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("name_message.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleEmailClickClose}
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
          >Cancel</Button>
          {/* <Button  type='submit' onClick={handleSubmit} color="primary">Save</Button> */}
          {/*<Snackbar open={snackbarOpen} autoHideDuration={3000}  onClose={snackbarClose} >
          <Alert  onClose={snackbarClose} severity={alertType}  >
           {message}
          </Alert>
        </Snackbar>*/}
          <Button
            type="submit"
            //onClick={() => SendEmail(emailOutObj)}
            color={sButtonColor}
            variant={sButtonVariant}
            size={sButtonSize}
          >Send</Button>
        </DialogActions>
        {snackbar && <Alerts
          alertObj={alertObj}
          snackbar={snackbar}
          snackbarClose={snackbarClose}
        />
        }
        {backdrop && <BackdropComponent
          backdrop={backdrop}
        />}
      </form>
    </Dialog>
  );
}