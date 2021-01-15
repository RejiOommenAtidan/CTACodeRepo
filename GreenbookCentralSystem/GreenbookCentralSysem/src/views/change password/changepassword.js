import React, { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Button, Grid, Typography, Container, TextField, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import _ from "lodash/fp";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { authenticationService } from '../../auth/_services';
import handleError from '../../auth/_helpers/handleError';
import { useDispatch, useSelector } from 'react-redux';
import { removeAuthDetails } from "../../actions/userAuthenticateAction";
import { Alerts } from '../alerts';
import { sButtonColor, sButtonSize, sButtonVariant } from "../../config/commonConfig";
import { BackdropComponent } from '../backdrop/pageBackDrop';

const useStyles = makeStyles({
  root: {
    height: '100%',
    paddingBottom: 3,
    paddingTop: 3,
    flexGrow: 1,
    'label + &': {
      marginTop: 3
    }
  },
  selectEmpty: {
    marginTop: 1.5,
  },
  formControl: {
    margin: 2,
    width: '95%'
  },
  paper: {
    padding: 2,
    textAlign: 'center'
  },
  textField: {
    marginTop: 0.15,
    marginBottom: 0.15
  },
  dateField: {
    marginTop: 0.25,
    marginBottom: 0.25
  },
  box: {
    marginBottom: 1.5,
    marginTop: 1.5
  },
  button: {
    margin: 1,
  },
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: red[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  }
});

export default function ChangePassword() {
  let history = useHistory();
  const dispatch = useDispatch();
  const currentUser = authenticationService.currentUserValue;
  const oUserAuthUser = JSON.parse(currentUser.UserAuthenticationReducer);
  // let nUserId = oUserAuthUser.oUserAuth.oUser.id;
  const nUserId = useSelector(state => {
    if (state.UserAuthenticationReducer.oUserAuth) {
      return state.UserAuthenticationReducer.oUserAuth.oUser.Id;
    }
  });
  const [backdrop, setBackdrop] = React.useState(false);
  const classes = useStyles();
  const { register, handleSubmit, errors, formState } = useForm();
  const [sOldPassword, setsOldPassword] = useState('');
  const [sNewPassword, setsNewPassword] = useState('');
  const [sConfirmNewPassword, setsConfirmNewPassword] = useState('');
  // const password = useRef({});
  // password.current = watch("name_sNewPassword", "");
  // console.log(password);

  //Alert
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

  // useEffect(() => {
  // }, []);
  const onSubmit = () => {
    if (sNewPassword === sConfirmNewPassword) {
      let changePassword = {
        nUserId,
        sOldPassword,
        sNewPassword,
        sConfirmNewPassword
      };
      setBackdrop(true);
      axios.post(`/User/ChangePassword`, changePassword)
        .then(resp => {
          if (resp.status === 200) {
            setBackdrop(false);
            setAlertMessage("Password Updated Successfully, Please Login in again with New Password");
            setAlertType('success');
            snackbarOpen();
            setTimeout(() => {
              dispatch(removeAuthDetails());
              history.push('/Login', { changepassword: true })
            }, 1500);
          }
        })
        .catch(error => {
          if (error.response.data === "Incorrect Old Password") {
            setBackdrop(false);
            setAlertMessage('Incorrect Old Password, Hold on Refreshing');
            setAlertType('error');
            snackbarOpen();
            setTimeout(() => {
              window.location.reload(true)
            }, 1500);
            ;
          }
          else if (error.response.data === "New Password & Confirm New Password are Different") {
            setBackdrop(false);
            setAlertMessage('New Passwords do not match, Hold on Refreshing');
            setAlertType('error');
            snackbarOpen();
            setTimeout(() => {
              window.location.reload(true)
            }, 1500);
          }
          else
            handleError(error, history);
        })
        .then(release => {
          //console.log(release); => udefined
        });
    }
    else {
      setAlertMessage('New Passwords do not match');
      setAlertType('error');
      snackbarOpen();
    }
  };

  return (
    <>
      <Container maxWidth="lg" disableGutters={true}><br />
        <Typography variant="h4" gutterBottom>Change Password</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.box}>
          <Grid container>
            {/*Old Password*/}
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.textField}
                  autoFocus
                  name="name_sOldPassword"
                  id="id_sOldPassword"
                  label="Old Password"
                  type="password"
                  defaultValue={sOldPassword}
                  onChange={(e) => { setsOldPassword(e.target.value); }}
                  fullWidth
                  margin="normal"
                  inputRef={register({
                    required: "Old Password Required"
                  })}
                />
                {errors.name_sOldPassword && <span style={{ color: 'red' }}>{errors.name_sOldPassword.message}</span>}
              </FormControl>
            </Grid>
            {/*New Password*/}
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  name="name_sNewPassword"
                  id="id_sNewPassword"
                  label="New Password"
                  type="password"
                  onChange={(e) => { setsNewPassword(e.target.value); }}
                  defaultValue={sNewPassword}
                  fullWidth
                  className={classes.textField}
                  margin="normal"
                  inputRef={register({
                    required: "You must specify a password"
                  })}
                />
                {errors.name_sNewPassword && <span style={{ color: 'red' }}>{errors.name_sNewPassword.message}</span>}
              </FormControl>
            </Grid>

            {/*Confirm New Password*/}
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.textField}
                  name="name_sConfirmNewPassword"
                  id="id_sConfirmNewPassword"
                  label="Confirm New Password"
                  type="password"
                  defaultValue={sConfirmNewPassword}
                  onChange={(e) => { setsConfirmNewPassword(e.target.value); }}
                  fullWidth
                  margin="normal"
                  inputRef={register({
                    required: "Please Confirm the Password",
                    //validate: value =>  value === sNewPassword || "The passwords do not match"
                    //validate: value => value === password.current || "The passwords do not match"
                  })}
                />
                {errors.name_sConfirmNewPassword && <span style={{ color: 'red' }}> {errors.name_sConfirmNewPassword.message}</span>}
              </FormControl>
            </Grid>
            <br />
            <br /><br />
            <Grid item xs={12}>
              <Button
                onClick={() => { history.push("/Home") }}
                variant={sButtonVariant}
                color={sButtonColor}
                size={sButtonSize}
              >Cancel</Button> &nbsp;
              <Button
                disabled={formState.isSubmitting && formState.isValid}
                type="submit"
                variant={sButtonVariant}
                color={sButtonColor}
                size={sButtonSize}
              >Save</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      {snackbar && <Alerts
        alertObj={alertObj}
        snackbar={snackbar}
        snackbarClose={snackbarClose}
      />}
      {backdrop && <BackdropComponent
        backdrop={backdrop}
      />}
    </>
  );
}
