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
import loginBackground from '../../../assets/images/TEST1.JPG';

export default function LogingPage(props) {

  const LoggedInOrNot = useSelector(state => state.UserAuthenticationReducer?.oUserAuth);
  console.log("Already logged in user:", LoggedInOrNot);
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

    var cookie = document.cookie;
  
    // Redirect to Home if Data Present in Redux
    if(LoggedInOrNot !== null && cookie.includes('session=Active')){
      var u = LoggedInOrNot.lFeatureUserrights.find((x) => x.nFeatureID === 2);
      if(u) {
        history.push("/Search");
      }
      else{
        history.push("/Home");
      }
    }
    
    // if (LoggedInOrNot !== null) {

    //   history.push('/Search');
    // }
  }, []);

  const onSubmit = () => {
    authenticationService.login(sUsername, sPassword).then(
      user => {
        dispatch(storeAuthDetails(user));
        console.info(user);
        console.log("User logged in:", user);
        // //Hour to seconds conversion
        // setTimeout(()=>{
        //   dispatch(removeAuthDetails());
        //   history.push('/Login');
        // },user.nTimeoutInDays*3600);
        //history.push('/Home');
        //Using Window.location.reload to /Home for refersh and read proper value from LS
        document.cookie = "session=Active;";
        console.log("Feature rights:", user.lFeatureUserrights[1]);
        var u = user.lFeatureUserrights.find((x) => x.nFeatureID === 2);
        console.log("user", u);
        if(u) {
          window.location.reload("/Search");
        }
        else{
          window.location.reload("/Home");
        }
        
      },
      error => {
        if (error.response.data === "User disabled for login, please contact administrator") {
          setAlertMessage("User disabled for login, please contact administrator");
          setAlertType('info');
          snackbarOpen();
          dispatch(removeAuthDetails());
          setsPassword("");
          setsUsername("");
        }
        else {
          setAlertMessage("Please Check your User name & Password");
          setAlertType('info');
          snackbarOpen();
          dispatch(removeAuthDetails());
          setsPassword("");
          setsUsername("");
        }
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
                          style={{ marginBottom: '20px' }}
                        />

                        <h1 className="display-4 mb-1 font-weight-bold">
                          New CTA's Green Book Database
                        </h1>
                        <br />
                      </div>
                      <div>
                        <div className="mb-4 text-center">
                          <TextField
                            autoFocus
                            //fullWidth
                            variant="outlined"
                            type="text"
                            //label="Username"
                            label={<span style={{ color: errors.name_sUsername && 'red' }}>Username</span>}
                            error={errors.name_sUsername}
                            helperText={errors.name_sUsername && 'Please Enter Username'}
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
                          {/* {_.get("name_sUsername.type", errors) === "required" && (
                            <span style={{ color: 'red' }}>Please Enter Username</span>
                          )} */}
                        </div>
                        <div className="mb-3 text-center">
                          <TextField
                            //fullWidth
                            variant="outlined"
                            label={<span style={{ color: errors.name_sPassword && 'red' }}>Password</span>}
                            error={errors.name_sPassword}
                            helperText={errors.name_sPassword && 'Please Enter Password'}
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
                          {/* {_.get("name_sPassword.type", errors) === "required" && (
                            <span style={{ color: 'red' }}>Please Enter Password</span>
                          )} */}
                        </div>
                        <div className="text-center py-4">
                          <Button className="btn-second font-weight-bold my-2" type="submit">
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
