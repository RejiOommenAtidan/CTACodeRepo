import React from 'react';

import { Grid, Container, Card, Button } from '@material-ui/core';

import hero2 from '../../../assets/images/hero-bg/hero-2.jpg';
import particles2 from '../../../assets/images/hero-bg/particles-2.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-serious-blue">
        <div className="hero-wrapper--content">
          <div
            className="bg-composed-wrapper--image bg-composed-filter-rm"
            style={{ backgroundImage: 'url(' + hero2 + ')' }}
          />
          <div
            className="bg-composed-wrapper--image opacity-6"
            style={{ backgroundImage: 'url(' + particles2 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-second opacity-4" />
          <div className="bg-composed-wrapper--content">
            <Container
              className="py-5 z-over"
              style={{ marginBottom: '-300px' }}>
              <Grid
                container
                spacing={6}
                className="text-center text-white py-5">
                <Grid item lg={10} xl={8} className="mx-auto">
                  <div className="font-size-sm d-inline-flex bg-white-10 px-4 rounded-lg text-white py-2 text-uppercase">
                    Spectacular Prices
                  </div>
                  <h3 className="display-3 font-weight-bold my-4 text-uppercase">
                    Pricing Plans
                  </h3>
                  <p className="text-white-50 line-height-2 font-size-xxl px-3 px-xl-5 mb-0">
                    View any of the 5+ live previews we&#39;ve set up to learn
                    why this dashboard template is the last one you&#39;ll ever
                    need!
                  </p>
                </Grid>
              </Grid>
              <Grid container spacing={0} className="z-over">
                <Grid item lg={7}>
                  <Card className="bg-white rounded mb-5 mb-lg-0">
                    <div className="text-center rounded-top p-3 p-lg-5">
                      <div className="font-weight-bold display-3">
                        Developer
                      </div>
                      <p className="text-black-50 line-height-2 font-size-xl px-3 px-xl-5 mb-0">
                        View any of the 5+ live previews we&#39;ve set up to
                        learn why this dashboard template is the last one
                        you&#39;ll ever need!
                      </p>
                    </div>
                    <div className="divider" />
                    <div className="p-4 p-lg-5">
                      <div className="d-flex align-items-center justify-content-between pb-3">
                        <div className="font-weight-bold font-size-lg">
                          Lifetime license
                        </div>
                        <div className="bg-neutral-success text-success text-uppercase font-size-sm font-weight-bold py-2 px-4 rounded-pill">
                          Included
                        </div>
                      </div>
                      <div className="divider opacity-6" />
                      <div className="d-flex align-items-center justify-content-between py-3">
                        <div className="font-weight-bold font-size-lg">
                          Components
                        </div>
                        <div className="bg-neutral-success text-success text-uppercase font-size-sm font-weight-bold py-2 px-4 rounded-pill">
                          300+
                        </div>
                      </div>
                      <div className="divider opacity-6" />
                      <div className="d-flex align-items-center justify-content-between pt-3">
                        <div className="font-weight-bold font-size-lg">
                          Technical Support
                        </div>
                        <div className="bg-neutral-warning text-warning text-uppercase font-size-sm font-weight-bold py-2 px-4 rounded-pill">
                          12 months
                        </div>
                      </div>
                    </div>
                    <div className="divider" />
                    <div className="d-flex bg-secondary rounded-bottom align-items-center justify-content-between py-4 px-5">
                      <div className="display-1 font-weight-bold">
                        <span className="font-size-lg">$</span>
                        <span>199</span>
                        <span className="font-size-xl">/mo</span>
                      </div>
                      <div>
                        <Button
                          className="rounded-sm font-weight-bold hover-scale-lg px-4 btn-primary"
                          size="large">
                          Purchase now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Grid>
                <Grid item lg={5} className="d-flex align-items-center">
                  <div className="text-white w-100 overflow-hidden pt-3 pt-lg-5 mb-5 mb-lg-0 bg-deep-sky rounded br-lg-left-0">
                    <div className="text-center py-3 py-lg-5">
                      <div className="font-weight-bold display-4 mb-3">
                        Enterprise
                      </div>
                      <p className="text-white-50 line-height-2 font-size-lg px-3 px-xl-5 mb-0">
                        View any of the 5+ live previews we&#39;ve set up to
                        learn why this dashboard template is the last one
                        you&#39;ll ever need!
                      </p>
                    </div>
                    <div className="divider bg-white mt-3 mt-lg-5 opacity-2" />
                    <div className="d-flex bg-white-10 align-items-center justify-content-between py-4 px-5">
                      <div className="display-2 font-weight-bold">
                        <span className="font-size-md">$</span>
                        <span>599</span>
                        <span className="font-size-lg">/mo</span>
                      </div>
                      <div>
                        <Button
                          className="rounded-sm font-weight-bold hover-scale-lg px-4 btn-success"
                          size="large">
                          Purchase now
                        </Button>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>
            <div className="shape-container-top-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="var(--light)"
                  fillOpacity="1"
                  d="M0,64L120,58.7C240,53,480,43,720,48C960,53,1200,75,1320,85.3L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
