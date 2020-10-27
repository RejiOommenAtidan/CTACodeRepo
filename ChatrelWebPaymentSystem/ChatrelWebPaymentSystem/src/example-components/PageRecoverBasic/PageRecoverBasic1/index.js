import React from 'react';

import { Grid, InputAdornment, Button, TextField } from '@material-ui/core';

import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';

export default function LivePreviewExample() {
  return (
    <>
      <div className="app-wrapper bg-white min-vh-100">
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className="app-content--inner d-flex align-items-center">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content py-5">
                  <Grid item md={10} lg={8} xl={4} className="mx-auto">
                    <div className="text-center mb-5">
                      <h1 className="display-4 mb-1 font-weight-bold">
                        Recover Password
                      </h1>
                      <p className="font-size-lg mb-0 text-black-50">
                        Forgot your password? No worries, we're here to help!
                      </p>
                    </div>
                    <div>
                      <label className="font-weight-bold mb-2">
                        Email address
                      </label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="textfield-email"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailOutlineTwoToneIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </div>
                    <div className="text-center mb-5">
                      <Button
                        fullWidth
                        className="text-uppercase font-weight-bold font-size-sm mt-4 btn-primary">
                        Send password
                      </Button>
                    </div>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
