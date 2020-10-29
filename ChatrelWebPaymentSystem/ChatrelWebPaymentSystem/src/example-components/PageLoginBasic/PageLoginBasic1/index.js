import React, { useEffect, useState } from 'react';

import {
  Grid,
  InputAdornment,
  Button,
  TextField
} from '@material-ui/core';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import { Alerts } from '../../../views/alerts';

import { GoogleLogin } from 'react-google-login';
import GoogleLoginPage from 'views/login/GoogleLogin';

export default function LogingPage(props) {
  const responseGoogle = (response) => {
    console.log(response);
  }
  const login = (response) => {
    console.log(response);
  //  history.push("/Home");
  }
   
  return (
    <>
      <div className="app-wrapper bg-white min-vh-100">
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className="app-content--inner d-flex align-items-center">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content py-5">
                  <form >
                    <Grid item md={10} lg={8} xl={4} className="mx-auto">
                      <div className="text-center">
                        <h1 className="display-4 mb-1 font-weight-bold">CTA Login</h1>
                        <br />
                      </div>
                      <div>
                     <GoogleLoginPage/>
                  
                      </div>
                    </Grid>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      { /*snackbar && <Alerts
        alertObj={alertObj}
        snackbar={snackbar}
        snackbarClose={snackbarClose}
      />*/}
    </>
  );
}
