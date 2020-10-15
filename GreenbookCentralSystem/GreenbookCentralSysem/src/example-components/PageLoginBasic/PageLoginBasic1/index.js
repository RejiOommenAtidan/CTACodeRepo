import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import { authenticationService } from '../../../auth/_services';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeAuthDetails, removeAuthDetails } from "../../../actions/userAuthenticateAction";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import {
  Grid,
  InputAdornment,
  Button,
  TextField
} from '@material-ui/core';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import { Alerts } from '../../../views/alerts';

export default function LogingPage() {
  let history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const [sUsername, setsUsername] = useState(null);
  const [sPassword, setsPassword] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [snackbar, setSnackbar] = React.useState(false);
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  };

  const snackbarOpen = () => {
    setSnackbar(true);
  }

  const snackbarClose = () => {
    setSnackbar(false);
  };

  useEffect(() => {
    // Redirect to Home if Data Present
    if (authenticationService.currentUserValue) {
      history.push('/Home');
    }
  }, []);

  const onSubmit = () => {
    authenticationService.login(sUsername, sPassword).then(
      user => {
        // setAlertMessage('Login Successful');
        // setAlertType('success');
        // snackbarOpen();
        dispatch(storeAuthDetails(user));
        history.push('/Home');
      },
      error => {
        setAlertMessage("Invalid Username/Password");
        setAlertType('error');
        snackbarOpen();
        authenticationService.logout();
        dispatch(removeAuthDetails());
        // setTimeout(()=>{window.location.reload(true);}, 2000);
        setsUsername("");
        setsPassword("");
      }
    );
  };

  return (
    <>
      <div className="app-wrapper bg-white min-vh-100">
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className="app-content--inner d-flex align-items-center">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content py-5">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid item md={10} lg={8} xl={4} className="mx-auto">
                      <div className="text-center">
                        <h1 className="display-4 mb-1 font-weight-bold">CTA Login</h1>
                        <br />
                      </div>
                      <div>
                        <div className="mb-4">
                          <TextField
                            autoFocus
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Username"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PermIdentityIcon />
                                </InputAdornment>
                              )
                            }}
                            id="id_sUsername"
                            name="name_sUsername"
                            value={sUsername}
                            onChange={(e) => { setsUsername(e.target.value); }}
                            inputRef={register({
                              required: true
                            })}
                          />
                          {_.get("name_sUsername.type", errors) === "required" && (
                            <span style={{ color: 'red' }}>This field is required</span>
                          )}
                        </div>
                        <div className="mb-3">
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Password"
                            type="password"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockTwoToneIcon />
                                </InputAdornment>
                              )
                            }}
                            value={sPassword}
                            onChange={(e) => { setsPassword(e.target.value); }}
                            id="id_sPassword"
                            name="name_sPassword"
                            inputRef={register({
                              required: true
                            })}
                          />
                          {_.get("name_sPassword.type", errors) === "required" && (
                            <span style={{ color: 'red' }}>This field is required</span>
                          )}
                        </div>
                        <div className="text-center py-4">
                          <Button className="btn-second font-weight-bold w-50 my-2" type="submit">
                            Login
                        </Button>
                        </div>
                      </div>
                    </Grid>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      { snackbar && <Alerts
        alertObj={alertObj}
        snackbar={snackbar}
        snackbarClose={snackbarClose}
      />}
    </>
  );
}
