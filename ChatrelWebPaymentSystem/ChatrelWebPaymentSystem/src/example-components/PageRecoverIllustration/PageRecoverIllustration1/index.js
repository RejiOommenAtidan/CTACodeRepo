import React from 'react';

import {
  Grid,
  Container,
  InputAdornment,
  Button,
  TextField
} from '@material-ui/core';

import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';

import illustration1 from '../../../assets/images/illustrations/pack1/security.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="app-wrapper bg-white min-vh-100">
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className="app-content--inner d-flex align-items-center">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content py-5">
                  <Container>
                    <Grid container spacing={6}>
                      <Grid item lg={6} className="d-flex align-items-center">
                        <div className="divider-v d-none d-lg-block divider-v-md" />
                        <div className="w-100 pr-0 pr-lg-5">
                          <div className="text-center my-5">
                            <h1 className="display-4 mb-1 font-weight-bold">
                              Recover Password
                            </h1>
                            <p className="font-size-lg mb-0 text-black-50">
                              Forgot your password? No worries, we're here to
                              help!
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
                        </div>
                      </Grid>
                      <Grid
                        item
                        lg={6}
                        className="d-none d-lg-flex align-items-center">
                        <img
                          alt="..."
                          className="w-100 mx-auto d-block img-fluid"
                          src={illustration1}
                        />
                      </Grid>
                    </Grid>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
