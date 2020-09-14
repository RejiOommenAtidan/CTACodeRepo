import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Button } from '@material-ui/core';

import { NavLink } from 'react-router-dom';

import particles2 from '../../../assets/images/hero-bg/particles-1.svg';
import hero1 from '../../../assets/images/hero-bg/hero-9.jpg';
import EmojiEventsTwoToneIcon from '@material-ui/icons/EmojiEventsTwoTone';
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';
import TuneTwoToneIcon from '@material-ui/icons/TuneTwoTone';

import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone';

import OverviewHeader from './OverviewHeader.js';

export default function LivePreviewExample() {
  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-second">
        <Container>
          <OverviewHeader />
        </Container>
        <div className="hero-wrapper--content">
          <div
            className="bg-composed-wrapper--image opacity-5"
            style={{ backgroundImage: 'url(' + hero1 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-deep-sky opacity-6" />
          <div className="bg-composed-wrapper--bg bg-sunrise-purple opacity-6" />
          <div
            className="bg-composed-wrapper--image opacity-9"
            style={{ backgroundImage: 'url(' + particles2 + ')' }}
          />
          <div className="bg-composed-wrapper--content">
            <Container className="z-over shadow-container-content-5 text-white text-center pt-5">
              <Grid
                item
                md={11}
                lg={10}
                xl={8}
                className="mx-auto py-3 py-lg-5">
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
                <div className="py-4 mb-4">
                  <Button
                    component={NavLink}
                    to="/DashboardCommerce"
                    size="large"
                    className="btn-pill shadow-second-sm btn-danger">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                    </span>
                    <span className="btn-wrapper--label">
                      Browse Dashboards
                    </span>
                  </Button>
                  <Button
                    href="https://material-ui.com/store/items/bamburgh-react-admin-dashboard-pro"
                    rel="noopener noreferrer"
                    target="_blank"
                    size="large"
                    className="bg-white-10 text-white shadow-second-sm btn-pill ml-0 ml-sm-3 mt-3 mt-sm-0">
                    <span>Product Details</span>
                  </Button>
                </div>
              </Grid>
              <Grid item lg={10} className="mx-auto">
                <div className="p-4 p-xl-5 hover-scale-rounded bg-second rounded-lg modal-content">
                  <Grid container spacing={0}>
                    <Grid item xs={6} md={3} className="p-3">
                      <div className="divider-v bg-white-10 divider-v-md d-none d-lg-block" />

                      <div className="text-center">
                        <div>
                          <TrendingUpTwoToneIcon className="d-30 text-danger" />
                        </div>
                        <div className="mt-3 line-height-sm">
                          <b className="font-size-xxl pb-2">1000+</b>
                          <span className="text-white-50 font-size-lg d-block">
                            components
                          </span>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6} md={3} className="p-3">
                      <div className="divider-v bg-white-10 divider-v-md d-none d-lg-block" />

                      <div className="text-center">
                        <div>
                          <ListAltTwoToneIcon className="d-30 text-warning" />
                        </div>
                        <div className="mt-3 line-height-sm">
                          <b className="font-size-xxl pb-2">5+</b>
                          <span className="text-white-50 font-size-lg d-block">
                            applications
                          </span>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6} md={3} className="p-3">
                      <div className="divider-v bg-white-10 divider-v-md d-none d-lg-block" />
                      <div className="text-center">
                        <div>
                          <EmojiEventsTwoToneIcon className="d-30 text-info" />
                        </div>
                        <div className="mt-3 line-height-sm">
                          <b className="font-size-xxl pb-2">100+</b>
                          <span className="text-white-50 font-size-lg d-block">
                            pages
                          </span>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6} md={3} className="p-3">
                      <div className="text-center">
                        <div>
                          <TuneTwoToneIcon className="d-30 text-success" />
                        </div>
                        <div className="mt-3 line-height-sm">
                          <b className="font-size-xxl pb-2">100+</b>
                          <span className="text-white-50 font-size-lg d-block">
                            widgets
                          </span>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Container>
            <div className="shadow-container-blocks-5 z-below">
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
