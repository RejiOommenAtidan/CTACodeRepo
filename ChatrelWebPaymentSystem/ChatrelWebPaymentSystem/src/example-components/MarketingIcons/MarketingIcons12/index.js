import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Container,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Card,
  Button,
  TextField
} from '@material-ui/core';

import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';

export default function LivePreviewExample() {
  const [checked1, setChecked1] = useState(true);

  const handleChange1 = (event) => {
    setChecked1(event.target.checked);
  };

  return (
    <>
      <Container className="mb-spacing-6-x2">
        <Card className="rounded-sm shadow-none p-3 bg-white-50">
          <Card className="rounded-sm font-size-sm p-4">
            <Grid container spacing={6}>
              <Grid
                item
                lg={7}
                className="d-flex align-items-center justify-content-center flex-column">
                <div className="divider-v divider-v-lg d-none d-lg-block" />
                <div className="py-4">
                  <div className="text-center mb-3">
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
                  <div className="text-center text-black-50 py-2 mb-4">
                    or sign in with credentials
                  </div>
                  <div>
                    <div className="mb-3">
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="textfield-email"
                        label="Email address"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailOutlineTwoToneIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="textfield-password"
                        label="Password"
                        type="password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockTwoToneIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center font-size-md">
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
                    </div>
                    <div className="text-center py-4">
                      <Button className="btn-second font-weight-bold w-50 my-2">
                        Sign in
                      </Button>
                    </div>
                    <div className="text-center text-black-50 mt-3">
                      Don't have an account?{' '}
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="text-first">
                        Sign up
                      </a>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                lg={5}
                className="d-flex align-items-center justify-content-center flex-column">
                <div className="p-3 w-100">
                  <div className="d-block d-xl-flex">
                    <div className="mt-0 mt-xl-1">
                      <FontAwesomeIcon
                        icon={['far', 'heart']}
                        className="font-size-lg text-first"
                      />
                    </div>
                    <div className="pl-0 pl-xl-3">
                      <div className="text-black font-weight-bold font-size-lg mb-1">
                        Widgets
                      </div>
                      <p className="mb-0 text-black-50">
                        You can build unlimited layout styles using any of the
                        500+ included components and elements. Powerful, unique
                        template built for React and Material-UI.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 w-100">
                  <div className="d-block d-xl-flex">
                    <div className="mt-0 mt-xl-1">
                      <FontAwesomeIcon
                        icon={['far', 'lightbulb']}
                        className="font-size-lg text-first"
                      />
                    </div>
                    <div className="pl-0 pl-xl-3">
                      <div className="text-black font-weight-bold font-size-lg mb-1">
                        Components
                      </div>
                      <p className="mb-0 text-black-50">
                        View any of the 5+ live previews we&#39;ve set up to
                        learn why this dashboard template is the last one
                        you&#39;ll ever need!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 w-100">
                  <div className="d-block d-xl-flex">
                    <div className="mt-0 mt-xl-1">
                      <FontAwesomeIcon
                        icon={['far', 'user']}
                        className="font-size-lg text-first"
                      />
                    </div>
                    <div className="pl-0 pl-xl-3">
                      <div className="text-black font-weight-bold font-size-lg mb-1">
                        Elements
                      </div>
                      <p className="mb-0 text-black-50">
                        You can build unlimited layout styles using any of the
                        500+ included components and elements. Powerful, unique
                        template built for React and Material-UI.
                      </p>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Card>
        </Card>
      </Container>
    </>
  );
}
