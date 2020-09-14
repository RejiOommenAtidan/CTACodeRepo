import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, CardContent, Button } from '@material-ui/core';

import particles1 from '../../../assets/images/hero-bg/particles-1.svg';

import MarketingHeaders4 from '../../MarketingHeaders/MarketingHeaders4';

export default function LivePreviewExample() {
  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-white">
        <Container>
          <MarketingHeaders4 />
        </Container>
        <div className="hero-wrapper--content">
          <div
            className="bg-composed-wrapper--image bg-composed-filter-rm opacity-2"
            style={{ backgroundImage: 'url(' + particles1 + ')' }}
          />
          <div className="bg-composed-wrapper--content">
            <div className="py-5">
              <Container className="text-black text-center py-5">
                <Grid item md={10} lg={8} className="mx-auto py-5">
                  <h2 className="display-4 font-weight-bold">
                    Bamburgh React Admin Dashboard with Material-UI PRO
                  </h2>
                  <p className="font-size-xl py-3 text-black-50">
                    Premium admin template powered by the most popular UI
                    components framework available for React: Material-UI.
                    Features hundreds of examples making web development fast
                    and easy. Start from one of the individual apps included or
                    from the general dashboard and build beautiful scalable
                    applications and presentation websites.
                  </p>
                  <div className="pt-3">
                    <Button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      size="large"
                      className="btn-pill font-size-lg shadow-second-sm btn-first">
                      <span className="btn-wrapper--label">Browse gallery</span>
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                      </span>
                    </Button>
                  </div>
                </Grid>
                <div className="bg-plum-plate shadow-xxl p-5 my-5 rounded">
                  <Grid container spacing={6}>
                    <Grid item xl={3} md={6}>
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="card bg-white card-box card-box-border-bottom border-success card-box-hover-rise-alt">
                        <CardContent>
                          <div className="align-box-row">
                            <div className="text-left">
                              <div className="mt-1">
                                <FontAwesomeIcon
                                  icon={['far', 'user']}
                                  className="font-size-xxl text-success"
                                />
                              </div>
                              <div className="mt-2 line-height-sm">
                                <b className="font-size-lg text-black pr-1">
                                  2,345
                                </b>
                                <span className="text-black-50">users</span>
                              </div>
                            </div>
                            <div className="ml-auto card-hover-indicator">
                              <FontAwesomeIcon
                                icon={['fas', 'chevron-right']}
                                className="font-size-xl"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </a>
                    </Grid>
                    <Grid item xl={3} md={6}>
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="card bg-white card-box card-box-border-bottom border-danger card-box-hover-rise-alt">
                        <CardContent>
                          <div className="align-box-row">
                            <div className="text-left">
                              <div className="mt-1">
                                <FontAwesomeIcon
                                  icon={['far', 'keyboard']}
                                  className="font-size-xxl text-danger"
                                />
                              </div>
                              <div className="mt-2 line-height-sm">
                                <b className="font-size-lg text-black pr-1">
                                  3,568
                                </b>
                                <span className="text-black-50">clicks</span>
                              </div>
                            </div>
                            <div className="ml-auto card-hover-indicator">
                              <FontAwesomeIcon
                                icon={['fas', 'chevron-right']}
                                className="font-size-xl"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </a>
                    </Grid>
                    <Grid item xl={3} md={6}>
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="card bg-white card-box card-box-border-bottom border-warning card-box-hover-rise-alt">
                        <CardContent>
                          <div className="align-box-row">
                            <div className="text-left">
                              <div className="mt-1">
                                <FontAwesomeIcon
                                  icon={['far', 'chart-bar']}
                                  className="font-size-xxl text-warning"
                                />
                              </div>
                              <div className="mt-2 line-height-sm">
                                <b className="font-size-lg text-black pr-1">
                                  $9,693
                                </b>
                                <span className="text-black-50">revenue</span>
                              </div>
                            </div>
                            <div className="ml-auto card-hover-indicator">
                              <FontAwesomeIcon
                                icon={['fas', 'chevron-right']}
                                className="font-size-xl"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </a>
                    </Grid>
                    <Grid item xl={3} md={6}>
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="card bg-white card-box card-box-border-bottom border-info card-box-hover-rise-alt">
                        <CardContent>
                          <div className="align-box-row">
                            <div className="text-left">
                              <div className="mt-1">
                                <FontAwesomeIcon
                                  icon={['far', 'building']}
                                  className="font-size-xxl text-info"
                                />
                              </div>
                              <div className="mt-2 line-height-sm">
                                <b className="font-size-lg text-black pr-1">
                                  431
                                </b>
                                <span className="text-black-50">sales</span>
                              </div>
                            </div>
                            <div className="ml-auto card-hover-indicator">
                              <FontAwesomeIcon
                                icon={['fas', 'chevron-right']}
                                className="font-size-xl"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </a>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
