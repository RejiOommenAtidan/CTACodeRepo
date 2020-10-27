import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, List, ListItem } from '@material-ui/core';

import logo1 from '../../../assets/images/stock-logos/stripe.svg';
import stock5 from '../../../assets/images/stock-photos/stock-5.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <Grid container spacing={0}>
          <Grid item xl={4}>
            <div className="text-center pt-4 pb-3">
              <img
                alt="..."
                className="img-fluid mt-2 mx-auto"
                style={{ height: '60px' }}
                src={logo1}
              />

              <p className="font-size-lg text-dark px-3 my-4">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>

              <List
                component="div"
                className="nav-pills nav-neutral-primary nav-lg nav-alt flex-column pr-4">
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  selected>
                  <span>Analytics</span>
                  <div className="ml-auto">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <span>Reports Management</span>
                  <div className="ml-auto">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <span>Real Estate</span>
                  <div className="ml-auto">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <span>Server Status</span>
                  <div className="ml-auto">
                    <div className="badge badge-danger mr-3">23</div>
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid item xl={8}>
            <div className="hero-wrapper bg-composed-wrapper h-100 rounded br-xl-left-0">
              <div className="flex-grow-1 w-100 d-flex align-items-end">
                <div
                  className="bg-composed-wrapper--image rounded br-xl-left-0 opacity-9 bg-composed-filter-rm"
                  style={{ backgroundImage: 'url(' + stock5 + ')' }}
                />
                <div className="bg-composed-wrapper--bg bg-night-sky opacity-5 rounded br-xl-left-0" />
                <div className="bg-composed-wrapper--bg bg-sunrise-purple opacity-7 rounded br-xl-left-0" />
                <div className="bg-composed-wrapper--content align-self-center p-4 p-xl-5">
                  <Grid container spacing={0}>
                    <Grid item md={6} className="d-flex">
                      <Card className="card-box mx-3 mb-3 mb-lg-0 p-3 p-xl-4 w-100">
                        <div className="font-weight-bold font-size-sm text-uppercase text-second mt-2">
                          Positive Reviews
                        </div>
                        <div className="d-flex py-4 align-items-center">
                          <div className="d-60 rounded border-0 card-icon-wrapper flex-shrink-0 bg-success text-white btn-icon text-center shadow-success mr-3">
                            <FontAwesomeIcon
                              icon={['far', 'comment-dots']}
                              className="display-4"
                            />
                          </div>
                          <div className="display-3 text-success font-weight-bold ml-1">
                            0.16%
                          </div>
                        </div>
                        <div className="text-black-50 font-weight-bold mb-2">
                          <a
                            className="text-first"
                            href="#/"
                            onClick={(e) => e.preventDefault()}>
                            See reviews
                          </a>{' '}
                          that were left by past customers from USA.
                        </div>
                      </Card>
                    </Grid>
                    <Grid item md={6} className="d-flex">
                      <Card className="card-box mx-3 p-3 p-xl-4 w-100">
                        <div className="font-weight-bold font-size-sm text-uppercase text-second mt-2">
                          Bounce Rate
                        </div>
                        <div className="d-flex py-4 align-items-center">
                          <div className="d-60 rounded border-0 card-icon-wrapper flex-shrink-0 bg-warning text-white btn-icon text-center shadow-warning mr-3">
                            <FontAwesomeIcon
                              icon={['fas', 'map-marked-alt']}
                              className="display-4"
                            />
                          </div>
                          <div className="display-3 text-warning font-weight-bold ml-1">
                            12.87%
                          </div>
                        </div>
                        <div className="text-black-50 font-weight-bold mb-2">
                          <a
                            className="text-first"
                            href="#/"
                            onClick={(e) => e.preventDefault()}>
                            See visits
                          </a>{' '}
                          that had a higher than expected bounce rate.
                        </div>
                      </Card>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
