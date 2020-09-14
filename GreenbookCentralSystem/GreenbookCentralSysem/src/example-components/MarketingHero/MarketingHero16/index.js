import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Card, Button } from '@material-ui/core';

import particles1 from '../../../assets/images/hero-bg/particles-1.svg';
import logo1 from '../../../assets/images/stock-logos/microsoft-icon.svg';
import logo2 from '../../../assets/images/stock-logos/google-icon.svg';
import logo3 from '../../../assets/images/stock-logos/spotify-icon.svg';
import logo4 from '../../../assets/images/stock-logos/instagram-icon.svg';

import MarketingHeaders1 from '../../MarketingHeaders/MarketingHeaders1';

export default function LivePreviewExample() {
  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-red-lights">
        <div className="w-100 px-4">
          <MarketingHeaders1 />
        </div>
        <div className="hero-wrapper--content">
          <div
            className="bg-composed-wrapper--image opacity-4 bg-composed-filter-rm"
            style={{ backgroundImage: 'url(' + particles1 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-second opacity-7" />
          <div className="bg-composed-wrapper--content">
            <Container className="z-over text-white text-center py-5">
              <Grid item md={10} lg={8} className="mx-auto py-5">
                <h2 className="display-3 font-weight-bold">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h2>
                <p className="font-size-xl py-3 text-white-50">
                  Premium admin template powered by the most popular UI
                  components framework available for React: Material-UI.
                  Features hundreds of examples making web development fast and
                  easy. Start from one of the individual apps included or from
                  the general dashboard and build beautiful scalable
                  applications and presentation websites.
                </p>
                <div className="pt-3">
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    size="large"
                    className="btn-pill shadow-second-sm btn-first">
                    <span className="btn-wrapper--label">Browse gallery</span>
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
              </Grid>
              <Card className="text-left my-5 bg-white shadow-sm p-4">
                <Grid container spacing={0}>
                  <Grid item lg={6}>
                    <div className="d-flex p-4">
                      <div className="d-80 flex-shrink-0 rounded-circle btn-icon bg-second">
                        <div className="d-40">
                          <img
                            alt="..."
                            className="img-fit-container"
                            src={logo1}
                          />
                        </div>
                      </div>
                      <div className="pt-2 pl-4">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold d-flex align-items-center mb-2 d-flex">
                          <div className="font-size-lg">Microsoft</div>
                          <div className="d-30 rounded-pill btn-icon bg-neutral-success font-size-xs text-success ml-2">
                            <FontAwesomeIcon
                              icon={['fas', 'check']}
                              className="font-size-sm"
                            />
                          </div>
                        </a>
                        <p className="mb-0 text-second opacity-7">
                          View any of the 5+ live previews we&#39;ve set up to
                          learn why this dashboard template is the last one
                          you&#39;ll ever need!
                        </p>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={6}>
                    <div className="d-flex p-4">
                      <div className="d-80 flex-shrink-0 rounded-circle btn-icon bg-second">
                        <div className="d-40">
                          <img
                            alt="..."
                            className="img-fit-container"
                            src={logo2}
                          />
                        </div>
                      </div>
                      <div className="pt-2 pl-4">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold d-flex align-items-center mb-2 d-flex">
                          <div className="font-size-lg">Google</div>
                          <div className="d-30 rounded-pill btn-icon bg-neutral-success font-size-xs text-success ml-2">
                            <FontAwesomeIcon
                              icon={['fas', 'check']}
                              className="font-size-sm"
                            />
                          </div>
                        </a>
                        <p className="mb-0 text-second opacity-7">
                          View any of the 5+ live previews we&#39;ve set up to
                          learn why this dashboard template is the last one
                          you&#39;ll ever need!
                        </p>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={6}>
                    <div className="d-flex p-4">
                      <div className="d-80 flex-shrink-0 rounded-circle btn-icon bg-second">
                        <div className="d-40">
                          <img
                            alt="..."
                            className="img-fit-container"
                            src={logo3}
                          />
                        </div>
                      </div>
                      <div className="pt-2 pl-4">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold d-flex align-items-center mb-2 d-flex">
                          <div className="font-size-lg">Spotify</div>
                          <div className="d-30 rounded-pill btn-icon bg-neutral-danger font-size-xs text-danger ml-2">
                            <FontAwesomeIcon
                              icon={['fas', 'times']}
                              className="font-size-sm"
                            />
                          </div>
                        </a>
                        <p className="mb-0 text-second opacity-7">
                          View any of the 5+ live previews we&#39;ve set up to
                          learn why this dashboard template is the last one
                          you&#39;ll ever need!
                        </p>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={6}>
                    <div className="d-flex p-4">
                      <div className="d-80 flex-shrink-0 rounded-circle btn-icon bg-second">
                        <div className="d-40">
                          <img
                            alt="..."
                            className="img-fit-container"
                            src={logo4}
                          />
                        </div>
                      </div>
                      <div className="pt-2 pl-4">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold d-flex align-items-center mb-2 d-flex">
                          <div className="font-size-lg">Instagram</div>
                          <div className="d-30 rounded-pill btn-icon bg-neutral-success font-size-xs text-success ml-2">
                            <FontAwesomeIcon
                              icon={['fas', 'check']}
                              className="font-size-sm"
                            />
                          </div>
                        </a>
                        <p className="mb-0 text-second opacity-7">
                          View any of the 5+ live previews we&#39;ve set up to
                          learn why this dashboard template is the last one
                          you&#39;ll ever need!
                        </p>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </Container>
            <div className="shadow-container-blocks-2 z-below">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="var(--light)"
                  fillOpacity="1"
                  d="M0,32L120,58.7C240,85,480,139,720,138.7C960,139,1200,85,1320,58.7L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
