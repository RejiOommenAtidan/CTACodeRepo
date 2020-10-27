import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Button } from '@material-ui/core';

import illustration1 from '../../../assets/images/illustrations/pack1/security.svg';
import particles2 from '../../../assets/images/hero-bg/particles-2.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="app-wrapper bg-second min-vh-100">
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className="app-content--inner d-flex align-items-center">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div
                  className="bg-composed-wrapper--image bg-composed-filter-rm opacity-2 bg-repeat"
                  style={{ backgroundImage: 'url(' + particles2 + ')' }}
                />
                <div className="bg-composed-wrapper--content py-5">
                  <Container>
                    <Grid container spacing={6}>
                      <Grid item lg={6} className="d-flex align-items-center">
                        <div className="divider-v d-none d-lg-block bg-white-10 divider-v-md" />
                        <div className="w-100 pr-0 pr-lg-5">
                          <div className="text-center text-white mb-5">
                            <h1 className="display-1 mb-4 px-4 font-weight-bold">
                              505 Forbidden
                            </h1>
                            <h3 className="font-size-xxl line-height-sm font-weight-light d-block px-3 mb-4 text-white-50">
                              Something is broken.
                            </h3>
                            <p className="mb-5">
                              We've been automatically alerted of the issue and
                              will work to fix it as soon as possible.
                            </p>
                            <Button className="btn-danger px-5 font-size-sm font-weight-bold btn-animated-icon text-uppercase rounded shadow-sm-dark py-3 hover-scale-sm hover-scale-lg btn-pill mt-4">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon icon={['fas', 'cog']} spin />
                              </span>
                              <span className="btn-wrapper--label">
                                Refresh
                              </span>
                            </Button>
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        item
                        lg={6}
                        className="d-none d-lg-flex object-skew align-items-center">
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
