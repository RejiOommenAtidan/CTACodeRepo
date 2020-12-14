import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import { authenticationService } from '../../../auth/_services';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { storeAuthDetails, removeAuthDetails } from "../../../actions/userAuthenticateAction";
import projectLogo from '../../../assets/images/ctalogo.png';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import {
  Grid,
  InputAdornment,
  Button,
  TextField
} from '@material-ui/core';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import { Alerts } from '../../../views/alerts';
import loginBackground from '../../../assets/images/LoginBG.jpg';

export default function LogingPage(props) {
 
  let LoggedInOrNot = useSelector(state => state.UserAuthenticationReducer.oUserAuth);
  let history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const [sUsername, setsUsername] = useState("");
  const [sPassword, setsPassword] = useState("");
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
  // console.log('Props:',props);
    
    
    // Redirect to Home if Data Present in Redux
    if (LoggedInOrNot !== null) {
      
      history.push('/Search');
    }
  }, []);

  const onSubmit = () => {
    authenticationService.login(sUsername, sPassword).then(
      user => {
        dispatch(storeAuthDetails(user));
        console.info(user);
        //history.push('/Home');
        //Using Window.location.reload to /Home for refersh and read proper value from LS
        window.location.reload("/Search");
      },
      error => {
        setAlertMessage("Please Check your User name & Password");
        setAlertType('info');
        snackbarOpen();
        dispatch(removeAuthDetails());
        setsPassword("");
        setsUsername("");
      }
    );
  };

  return (
    <>
      <div 
      className="app-wrapper bg-white min-vh-100"
      style={{
        //opacity:0.40,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.725), rgba(255,255,255,0.725)), url(${loginBackground})`,
          height: '100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
      }}
      >
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className="app-content--inner d-flex align-items-center">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content py-5">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid item md={10} lg={8} xl={4} className="mx-auto">
                      <div className="text-center">
                      <img
                        alt="CTA"
                        src={projectLogo}
                        width={"300px"}
                        //height={}
                        style={{marginBottom:'20px'}}
                      />
                      
                        <h1 className="display-4 mb-1 font-weight-bold">
                        New CTA's Green Book Database
                        </h1>
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
                                  <PermIdentityIcon/>
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
                            <span style={{ color: 'red' }}>Please Enter Username</span>
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
                            <span style={{ color: 'red' }}>Please Enter Password</span>
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
