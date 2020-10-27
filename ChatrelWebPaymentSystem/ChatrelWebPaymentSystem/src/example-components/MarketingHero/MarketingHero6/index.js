import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Button } from '@material-ui/core';

import hero6 from '../../../assets/images/hero-bg/hero-6.jpg';

import MarketingHeaders1 from '../../MarketingHeaders/MarketingHeaders1';

import logo1 from '../../../assets/images/stock-logos/netflix-icon.svg';
import logo2 from '../../../assets/images/stock-logos/airbnb-icon.svg';
import logo3 from '../../../assets/images/stock-logos/instagram-icon.svg';
import logo4 from '../../../assets/images/stock-logos/slack-icon.svg';
import logo5 from '../../../assets/images/stock-logos/google-icon.svg';
import logo6 from '../../../assets/images/stock-logos/microsoft-icon.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-deep-sky">
        <Container className="header-top-section py-2">
          <MarketingHeaders1 />
        </Container>
        <div className="divider bg-white-5" />
        <div className="hero-wrapper--content">
          <div
            className="bg-composed-wrapper--image"
            style={{ backgroundImage: 'url(' + hero6 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-second opacity-5" />
          <div className="bg-composed-wrapper--content">
            <div className="py-5">
              <div className="pb-0 pb-lg-4">
                <Container className="text-white pb-5">
                  <Grid container spacing={6} className="py-5">
                    <Grid item lg={6} className="d-flex align-items-center">
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
                              Create account
                            </span>
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                            </span>
                          </Button>
                          <Button
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            size="large"
                            className="btn-second btn-pill ml-3">
                            <span>Login</span>
                          </Button>
                        </div>
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={6}
                      className="d-flex align-items-center mt-5 mt-lg-0 justify-content-center">
                      <div className="object-skew d-flex flex-wrap align-items-center justify-content-center">
                        <div className="m-3 hover-scale-lg">
                          <div className="rounded-sm btn-icon d-120 shadow-sm-dark bg-secondary hover-scale-rounded d-flex align-self-stretch">
                            <img
                              src={logo1}
                              style={{ height: 51 }}
                              className="m-auto img-fluid"
                              alt="..."
                            />
                          </div>
                        </div>
                        <div className="m-3 hover-scale-lg">
                          <div className="rounded-sm btn-icon d-120 shadow-sm-dark bg-secondary hover-scale-rounded d-flex align-self-stretch">
                            <img
                              src={logo2}
                              style={{ height: 51 }}
                              className="m-auto img-fluid"
                              alt="..."
                            />
                          </div>
                        </div>
                        <div className="m-3 hover-scale-lg">
                          <div className="rounded-sm btn-icon d-120 shadow-sm-dark bg-secondary hover-scale-rounded d-flex align-self-stretch">
                            <img
                              src={logo3}
                              style={{ height: 51 }}
                              className="m-auto img-fluid"
                              alt="..."
                            />
                          </div>
                        </div>
                        <div className="m-3 hover-scale-lg">
                          <div className="rounded-sm btn-icon d-120 shadow-sm-dark bg-secondary hover-scale-rounded d-flex align-self-stretch">
                            <img
                              src={logo4}
                              style={{ height: 51 }}
                              className="m-auto img-fluid"
                              alt="..."
                            />
                          </div>
                        </div>
                        <div className="m-3 hover-scale-lg">
                          <div className="rounded-sm btn-icon d-120 shadow-sm-dark bg-secondary hover-scale-rounded d-flex align-self-stretch">
                            <img
                              src={logo5}
                              style={{ height: 51 }}
                              className="m-auto img-fluid"
                              alt="..."
                            />
                          </div>
                        </div>
                        <div className="m-3 hover-scale-lg">
                          <div className="rounded-sm btn-icon d-120 shadow-sm-dark bg-secondary hover-scale-rounded d-flex align-self-stretch">
                            <img
                              src={logo6}
                              style={{ height: 51 }}
                              className="m-auto img-fluid"
                              alt="..."
                            />
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Container>
              </div>
            </div>
            <div className="shape-container-top-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="var(--light)"
                  fillOpacity="1"
                  d="M0,64L48,64C96,64,192,64,288,80C384,96,480,128,576,122.7C672,117,768,75,864,101.3C960,128,1056,224,1152,224C1248,224,1344,128,1392,80L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
