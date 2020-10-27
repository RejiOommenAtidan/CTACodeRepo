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

import hero1 from '../../../assets/images/hero-bg/hero-1.jpg';

import MarketingHeaders5 from '../../MarketingHeaders/MarketingHeaders5';

export default function LivePreviewExample() {
  const [checked1, setChecked1] = useState(true);

  const handleChange1 = (event) => {
    setChecked1(event.target.checked);
  };

  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-midnight-bloom">
        <Container className="header-top-section py-2">
          <MarketingHeaders5 />
        </Container>
        <div className="divider bg-white-5" />
        <div className="hero-wrapper--content">
          <div
            className="bg-composed-wrapper--image"
            style={{ backgroundImage: 'url(' + hero1 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-second opacity-5" />
          <div className="bg-composed-wrapper--content">
            <Container className="z-over">
              <Container className="text-white py-5">
                <Grid container spacing={6} className="pb-5">
                  <Grid
                    item
                    lg={6}
                    className="d-flex align-items-center pr-0 pr-xl-3">
                    <div className="text-center text-lg-left">
                      <h2 className="display-3 font-weight-bold">
                        Bamburgh React Admin Dashboard with Material-UI PRO
                      </h2>
                      <p className="font-size-xl py-3 text-white-50">
                        Premium admin template powered by the most popular UI
                        components framework available for React: Material-UI.
                        Features hundreds of examples making web development
                        fast and easy. Start from one of the individual apps
                        included or from the general dashboard and build
                        beautiful scalable applications and presentation
                        websites.
                      </p>
                      <div className="pt-3">
                        <Button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          size="large"
                          className="btn-pill shadow-second-sm btn-first">
                          <span className="btn-wrapper--label">
                            Browse gallery
                          </span>
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                          </span>
                        </Button>
                        <Button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          size="large"
                          className="bg-white-10 text-white btn-pill ml-3">
                          <span>Documentation</span>
                        </Button>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    className="d-flex align-items-center justify-content-center">
                    <Card className="rounded-sm shadow-none mt-5 mt-lg-0 p-3 bg-white-10">
                      <Card className="rounded-sm font-size-sm p-4">
                        <div className="py-4">
                          <div className="text-center mb-3">
                            <Button
                              className="m-2 btn-pill px-3 font-weight-bold btn-google"
                              size="small">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon icon={['fab', 'google']} />
                              </span>
                              <span className="btn-wrapper--label">
                                Login with Google
                              </span>
                            </Button>
                            <Button
                              className="m-2 btn-pill px-3 font-weight-bold btn-facebook"
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
                              <Button className="btn-first font-weight-bold w-50 my-2">
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
                      </Card>
                    </Card>
                  </Grid>
                </Grid>
              </Container>
            </Container>
            <div
              className="shape-container-top-1 z-below"
              style={{ marginTop: '-320px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="var(--light)"
                  fillOpacity="1"
                  d="M0,224L288,192L576,224L864,256L1152,128L1440,160L1440,320L1152,320L864,320L576,320L288,320L0,320Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
