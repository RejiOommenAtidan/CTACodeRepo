import React from 'react';

import { Grid, Button, TextField } from '@material-ui/core';

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
                    <div className="text-center mb-4">
                      <h1 className="display-4 mb-1 font-weight-bold">
                        Create your account
                      </h1>
                      <p className="font-size-lg mb-0 text-black-50">
                        Start benefiting from our tools right away
                      </p>
                    </div>
                    <div className="mb-3">
                      <label className="font-weight-bold mb-2">
                        Email address
                      </label>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Enter your email address"
                        type="email"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label className="font-weight-bold mb-2">
                          Password
                        </label>
                      </div>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Enter your password"
                        type="password"
                      />
                    </div>
                    <Grid container spacing={6}>
                      <Grid item md={6}>
                        <div>
                          <label className="font-weight-bold mb-2">
                            First name
                          </label>
                          <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            placeholder="Enter your first name"
                          />
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div>
                          <label className="font-weight-bold mb-2">
                            Last name
                          </label>
                          <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            placeholder="Enter your last name"
                          />
                        </div>
                      </Grid>
                    </Grid>
                    <div className="my-4">
                      By clicking the <strong>Create account</strong> button
                      below you agree to our terms of service and privacy
                      statement.
                    </div>
                    <div className="text-center mb-4">
                      <Button className="btn-primary text-uppercase font-weight-bold font-size-sm my-3">
                        Create account
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
