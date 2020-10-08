import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import { authenticationService } from '../../../auth/_services';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {storeAuthDetails,removeAuthDetails} from "../../../actions/userAuthenticateAction";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import {
  Grid,
  InputAdornment,
  // FormControlLabel,
  // Checkbox,
  Button,
  TextField
} from '@material-ui/core';

// import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';

export default function LogingPage() {
  let history = useHistory()
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();
  // const [checked1, setChecked1] = useState(true);
  const [sUsername, setsUsername] = useState(null);
  const [sPassword, setsPassword] = useState(null)
  // const handleChange1 = (event) => {
  //   setChecked1(event.target.checked);
  // };

  useEffect(() => {
    // redirect to home if already logged in
    //console.log(authenticationService.currentUserValue);
    if (authenticationService.currentUserValue) {
      history.push('/Home');
    }
  }, []);

  const onSubmit = () => {
    //e.preventDefault();
    let user = {
      sUsername,
      sPassword
    };
    console.info(user);
    authenticationService.login(sUsername, sPassword).then(
      user => {
        // const { from } = this.props.location.state || { from: { pathname: "/" } };
        dispatch(storeAuthDetails(user));
        history.push('/Home');
      },
      error => {
          authenticationService.logout();
          dispatch(removeAuthDetails());
          window.location.reload(true);
        //console.error(error);
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
                        {/*<p className="font-size-lg mb-0 text-black-50">
                        Fill in the fields below to login to your account
                      </p>*/}
                      </div>
                      {/*<div className="text-center py-4 rounded bg-secondary my-4">
                      <Button
                        className="m-2 btn-pill px-4 font-weight-bold btn-google"
                        size="small">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['fab', 'google']} />
                        </span>
                        <span className="btn-wrapper--label">
                          Login with Google
                        </span>
                      </Button>
                      <Button
                        className="m-2 btn-pill px-4 font-weight-bold btn-facebook"
                        size="small">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['fab', 'facebook']} />
                        </span>
                        <span className="btn-wrapper--label">
                          Login with Facebook
                        </span>
                      </Button>
                    </div>
                    <div className="text-center text-black-50 mb-4">
                      or sign in with credentials
                    </div>*/}
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
                            <p>Username is required</p>
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
                            <p>Password is required</p>
                          )}
                        </div>
                        {/*<div className="d-flex justify-content-between align-items-center font-size-md">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checked1}
                              onChange={handleChange1}
                              value="checked1"
                              color="primary"
                            />
                          }
                          label="Remember me"
                        />
                        <div>
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="text-first">
                            Recover password
                          </a>
                        </div>
                        </div>*/}
                        <div className="text-center py-4">
                          <Button className="btn-second font-weight-bold w-50 my-2" type="submit">
                            Login
                        </Button>
                        </div>
                        {/*<div className="text-center text-black-50 mt-3">
                        Don't have an account?{' '}
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="text-first">
                          Sign up
                        </a>
                      </div>*/}
                      </div>
                    </Grid>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
