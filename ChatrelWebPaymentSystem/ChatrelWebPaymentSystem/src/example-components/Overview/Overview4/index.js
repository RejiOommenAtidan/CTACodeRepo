import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Container,
  Card,
  Button,
  List,
  ListItem
} from '@material-ui/core';

import { NavLink } from 'react-router-dom';

import logo1 from '../../../assets/images/stock-logos/discord-icon.svg';
import logo2 from '../../../assets/images/stock-logos/google-icon.svg';
import logo3 from '../../../assets/images/stock-logos/spotify-icon.svg';
import logo4 from '../../../assets/images/stock-logos/slack-icon.svg';
import logo5 from '../../../assets/images/stock-logos/pinterest-icon.svg';
import logo6 from '../../../assets/images/stock-logos/airbnb-icon.svg';
import hero8 from '../../../assets/images/hero-bg/hero-8.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-second">
        <div className="hero-wrapper--content flex-column">
          <div className="shape-container-bottom-2 w-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="var(--white)"
                fillOpacity="1"
                d="M0,288L34.3,250.7C68.6,213,137,139,206,144C274.3,149,343,235,411,229.3C480,224,549,128,617,101.3C685.7,75,754,117,823,122.7C891.4,128,960,96,1029,112C1097.1,128,1166,192,1234,186.7C1302.9,181,1371,107,1406,69.3L1440,32L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path>
            </svg>
          </div>
          <div
            className="bg-composed-wrapper--image opacity-3"
            style={{ backgroundImage: 'url(' + hero8 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-premium-dark opacity-3" />
          <div className="bg-composed-wrapper--bg bg-deep-sky opacity-3" />
          <div className="bg-composed-wrapper--bg bg-sunrise-purple opacity-4" />
          <div className="bg-composed-wrapper--content pb-5">
            <Container className="z-over text-white pt-5">
              <Grid container spacing={6} className="py-5">
                <Grid item lg={6}>
                  <div className="text-center text-lg-left py-0 pr-0 pr-xl-3 py-xl-5">
                    <div className="pr-0 pr-xl-5 text-white">
                      <h1 className="display-3 mb-3 font-weight-bold">
                        Bamburgh React Admin Dashboard with Material-UI PRO
                      </h1>
                      <p className="font-size-xxl m-0 py-3 text-white-50">
                        You can build unlimited layout styles using any of the
                        500+ included components and elements. Powerful, unique
                        template built for React and Material-UI.
                      </p>
                      <p className="font-size-lg m-0 py-2 text-white opacity-7">
                        View any of the 5+ live previews we&#39;ve set up to
                        learn why this dashboard template is the last one
                        you&#39;ll ever need!
                      </p>
                      <div className="d-block mt-4">
                        <Button
                          component={NavLink}
                          to="/BlocksListsLarge"
                          className="btn-danger px-5 font-size-sm font-weight-bold btn-animated-icon text-uppercase rounded shadow-none py-3 hover-scale-sm hover-scale-lg mr-3">
                          <span className="btn-wrapper--label">
                            View more list groups
                          </span>
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item lg={6} className="d-flex align-items-center">
                  <Card className="bg-secondary m-5 m-lg-0 object-skew hover-scale-lg shadow-sm-dark w-100 card-box">
                    <List component="div" className="list-group-flush">
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="d-flex rounded-top align-items-center py-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon mr-3 d-50">
                            <img
                              className="img-fit-container"
                              alt="..."
                              src={logo1}
                            />
                          </div>
                          <div>
                            <div className="font-weight-bold text-black">
                              Build React Interface
                            </div>
                            <div className="text-black-50">Development</div>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <div className="badge badge-neutral-success text-success font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                            $3,884
                          </div>
                        </div>
                      </ListItem>
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="d-flex align-items-center py-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon mr-3 d-50">
                            <img
                              className="img-fit-container"
                              alt="..."
                              src={logo2}
                            />
                          </div>
                          <div>
                            <div className="font-weight-bold text-black">
                              Create Ads Campaign
                            </div>
                            <div className="text-black-50">Marketing</div>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <div className="badge badge-neutral-warning text-warning font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                            $8,362
                          </div>
                        </div>
                      </ListItem>
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="d-flex align-items-center py-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon mr-3 d-50">
                            <img
                              className="img-fit-container"
                              alt="..."
                              src={logo3}
                            />
                          </div>
                          <div>
                            <div className="font-weight-bold text-black">
                              Resolve All Github Issues
                            </div>
                            <div className="text-black-50">Bugfixes</div>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <div className="badge badge-neutral-success text-success font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                            $9,385
                          </div>
                        </div>
                      </ListItem>
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="d-flex align-items-center py-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon mr-3 d-50">
                            <img
                              className="img-fit-container"
                              alt="..."
                              src={logo4}
                            />
                          </div>
                          <div>
                            <div className="font-weight-bold text-black">
                              Build UI for Angular
                            </div>
                            <div className="text-black-50">Development</div>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <div className="badge badge-neutral-success text-success font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                            $1,964
                          </div>
                        </div>
                      </ListItem>
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="d-flex align-items-center py-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon mr-3 d-50">
                            <img
                              className="img-fit-container"
                              alt="..."
                              src={logo5}
                            />
                          </div>
                          <div>
                            <div className="font-weight-bold text-black">
                              Create UI Designs
                            </div>
                            <div className="text-black-50">Marketing</div>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <div className="badge badge-neutral-danger text-danger font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                            $5,825
                          </div>
                        </div>
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
              </Grid>
              <Container className="pt-lg-5">
                <div className="d-flex flex-wrap align-items-center justify-content-center">
                  <div className="rounded-circle btn-icon bg-white d-110 shadow-sm-dark m-4 hover-scale-lg d-flex align-self-stretch">
                    <img
                      src={logo1}
                      style={{ height: 46 }}
                      className="m-auto img-fluid"
                      alt="..."
                    />
                  </div>
                  <div className="rounded-circle btn-icon bg-white d-80 shadow-sm-dark m-4 hover-scale-lg d-flex align-self-stretch">
                    <img
                      src={logo2}
                      style={{ height: 49 }}
                      className="m-auto img-fluid"
                      alt="..."
                    />
                  </div>
                  <div className="rounded-circle btn-icon bg-white d-140 shadow-sm-dark m-4 hover-scale-lg d-flex align-self-stretch">
                    <img
                      src={logo3}
                      style={{ height: 51 }}
                      className="m-auto img-fluid"
                      alt="..."
                    />
                  </div>
                  <div className="rounded-circle btn-icon bg-white d-70 shadow-sm-dark m-4 hover-scale-lg d-flex align-self-stretch">
                    <img
                      src={logo4}
                      style={{ height: 55 }}
                      className="m-auto img-fluid"
                      alt="..."
                    />
                  </div>
                  <div className="rounded-circle btn-icon bg-white d-110 shadow-sm-dark m-4 hover-scale-lg d-flex align-self-stretch">
                    <img
                      src={logo5}
                      style={{ height: 41 }}
                      className="m-auto img-fluid"
                      alt="..."
                    />
                  </div>
                  <div className="rounded-circle btn-icon bg-white d-100 shadow-sm-dark m-4 hover-scale-lg d-flex align-self-stretch">
                    <img
                      src={logo6}
                      style={{ height: 51 }}
                      className="m-auto img-fluid"
                      alt="..."
                    />
                  </div>
                </div>
              </Container>
            </Container>
          </div>
          <div className="shape-container-top-1 w-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="var(--white)"
                fillOpacity="1"
                d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,202.7C672,213,768,235,864,213.3C960,192,1056,128,1152,133.3C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
