import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Card, Button } from '@material-ui/core';

import MarketingHeaders3 from '../../MarketingHeaders/MarketingHeaders3';

export default function LivePreviewExample() {
  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-deep-sky">
        <Container className="header-top-section pb-2">
          <MarketingHeaders3 />
        </Container>
        <div className="hero-wrapper--content">
          <div className="bg-composed-wrapper--bg bg-second opacity-5" />
          <div className="bg-composed-wrapper--content">
            <Container className="text-white py-5">
              <Container>
                <Grid
                  container
                  spacing={6}
                  className="align-items-center pt-4 pb-5">
                  <Grid item lg={6} className="order-2 order-lg-2">
                    <div className="m-0 m-xl-5 p-0 p-lg-4">
                      <Card className="card-box card-box-alt modal-content">
                        <div className="card-content-overlay text-center pb-4">
                          <div className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-success text-white btn-icon mx-auto text-center shadow-success">
                            <FontAwesomeIcon
                              icon={['far', 'bell']}
                              className="display-4"
                            />
                          </div>
                          <div className="font-weight-bold text-black display-3 mt-4 mb-1">
                            $4,745
                          </div>
                          <div className="font-size-lg text-dark opacity-8">
                            Today's Sales
                          </div>
                          <div className="divider mx-4 my-4" />
                          <div className="text-center">
                            <Button
                              className="p-0 text-uppercase btn-link-success font-weight-bold font-size-sm btn-link"
                              variant="text">
                              <span>View details</span>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    className="order-1 order-lg-1 d-flex align-items-center">
                    <div className="pl-0 mb-5 mb-lg-0 pl-xl-5">
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
                          className="rounded-lg font-size-sm font-weight-bold text-uppercase shadow-second-sm btn-success">
                          <span className="btn-wrapper--label">
                            Browse gallery
                          </span>
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Container>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
