import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Button } from '@material-ui/core';

import hero2 from '../../../assets/images/hero-bg/hero-2.jpg';
import illustration3 from '../../../assets/images/illustrations/pack1/handshake.svg';

import MarketingHeaders2 from '../../MarketingHeaders/MarketingHeaders2';

export default function LivePreviewExample() {
  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-serious-blue">
        <MarketingHeaders2 />
        <div className="divider bg-white-5" />
        <div className="hero-wrapper--content">
          <div
            className="bg-composed-wrapper--image bg-composed-filter-rm"
            style={{ backgroundImage: 'url(' + hero2 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-second opacity-4" />
          <div className="bg-composed-wrapper--content">
            <div className="z-over pb-5">
              <Container className="text-white pt-3">
                <Grid container spacing={6} className="pt-5">
                  <Grid
                    item
                    lg={6}
                    className="d-flex order-2 order-lg-1 align-items-start">
                    <img
                      src={illustration3}
                      alt="..."
                      className="m-5 m-lg-3 m-xl-0 w-100"
                    />
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    className="d-flex order-1 order-lg-2 align-items-center">
                    <div className="text-center text-lg-left">
                      <div className="badge bg-white-10 mb-3 text-white h-auto py-1 px-3 font-size-xs badge-pill font-weight-normal">
                        Marketing
                      </div>
                      <h1 className="display-3 font-weight-bold mb-3">
                        Bamburgh React Admin Dashboard with Material-UI PRO
                      </h1>
                      <p className="font-size-lg py-2 mb-0 text-white-50">
                        Premium admin template powered by the most popular UI
                        components framework available for React: Material-UI.
                        Features hundreds of examples making web development
                        fast and easy. Start from one of the individual apps
                        included or from the general dashboard and build
                        beautiful scalable applications and presentation
                        websites.
                      </p>
                      <div className="py-4">
                        <div className="text-white d-flex align-items-center mb-3 justify-content-center justify-content-lg-start">
                          <div className="d-30 rounded-pill btn-icon bg-white-10 mr-2">
                            <FontAwesomeIcon
                              icon={['fas', 'check']}
                              className="font-size-sm"
                            />
                          </div>
                          <span className="pt-1 text-white-50">
                            This template comes with over 300 components
                          </span>
                        </div>
                        <div className="text-white d-flex align-items-center mb-3 justify-content-center justify-content-lg-start">
                          <div className="d-30 rounded-pill btn-icon bg-white-10 mr-2">
                            <FontAwesomeIcon
                              icon={['fas', 'check']}
                              className="font-size-sm"
                            />
                          </div>
                          <span className="pt-1 text-white-50">
                            Build applications or presentation websites
                          </span>
                        </div>
                        <div className="text-white d-flex align-items-center mb-3 justify-content-center justify-content-lg-start">
                          <div className="d-30 rounded-pill btn-icon bg-white-10 mr-2">
                            <FontAwesomeIcon
                              icon={['fas', 'check']}
                              className="font-size-sm"
                            />
                          </div>
                          <span className="pt-1 text-white-50">
                            One of the most complete UI solution available
                          </span>
                        </div>
                      </div>
                      <Button
                        className="btn-warning text-uppercase font-size-sm font-weight-bold px-4 btn-pill"
                        size="large">
                        Find out more
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Container>
            </div>
            <div className="shape-container-top-2 z-below">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="var(--light)"
                  fillOpacity="1"
                  d="M0,96L34.3,96C68.6,96,137,96,206,90.7C274.3,85,343,75,411,90.7C480,107,549,149,617,154.7C685.7,160,754,128,823,149.3C891.4,171,960,245,1029,245.3C1097.1,245,1166,171,1234,138.7C1302.9,107,1371,117,1406,122.7L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
