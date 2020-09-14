import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  Tooltip
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';

import stock2 from '../../../assets/images/stock-photos/stock-2.jpg';
import stock3 from '../../../assets/images/stock-photos/stock-3.jpg';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={6}>
          <Card className="card-box">
            <div className="card-header bg-secondary">
              <div className="card-header--title">
                <small className="d-block text-uppercase mt-1">Blogs</small>
                <b>Latest articles</b>
              </div>
              <div className="card-header--actions">
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  size="small"
                  className="w-auto px-4 py-0 border-0 d-30 btn-primary">
                  View all
                </Button>
              </div>
            </div>
            <div className="scroll-area-lg shadow-overflow">
              <PerfectScrollbar options={{ wheelPropagation: false }}>
                <List component="div" className="list-group-flush">
                  <ListItem className="py-4 d-block">
                    <div className="d-flex flex-column flex-sm-row align-items-start">
                      <div>
                        <Card className="card-transparent mb-3 mb-sm-0">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="card-img-wrapper rounded">
                            <div className="img-wrapper-overlay">
                              <div className="overlay-btn-wrapper">
                                <div className="rounded-circle d-40 mx-auto d-flex align-items-center justify-content-center">
                                  <FontAwesomeIcon
                                    icon={['fas', 'plus-circle']}
                                    className="font-size-lg"
                                  />
                                </div>
                              </div>
                            </div>
                            <img
                              alt="..."
                              className="card-img-top rounded"
                              src={stock3}
                              style={{ width: 170 }}
                            />
                          </a>
                        </Card>
                      </div>
                      <div className="pl-0 pl-sm-4">
                        <div className="mb-3 font-size-xxl font-weight-bold">
                          <a href="#/" onClick={(e) => e.preventDefault()}>
                            Bamburgh React Admin Dashboard with Material-UI PRO
                          </a>
                        </div>
                        <div className="d-flex font-size-sm mb-3 opacity-7 align-items-center">
                          <FontAwesomeIcon
                            icon={['far', 'clock']}
                            className="mr-2"
                          />
                          <span>17 May 2020</span>
                        </div>
                        <p className="font-size-lg text-black-50">
                          Premium admin template powered by the most popular UI
                          components framework available for React: Material-UI.
                          Features hundreds of examples making web development
                          fast and easy. Start from one of the individual apps
                          included or from the general dashboard and build
                          beautiful scalable applications and presentation
                          websites.
                        </p>
                        <div className="mt-3">
                          <Button
                            className="btn-primary btn-pill px-4 hover-scale-sm"
                            size="small"
                            href="#/"
                            onClick={(e) => e.preventDefault()}>
                            Learn more
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ListItem>
                  <ListItem className="py-4 d-block">
                    <div className="d-flex flex-column flex-sm-row align-items-start">
                      <div>
                        <Card className="card-transparent mb-3 mb-sm-0">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="card-img-wrapper rounded">
                            <div className="img-wrapper-overlay">
                              <div className="overlay-btn-wrapper">
                                <div className="rounded-circle d-40 mx-auto d-flex align-items-center justify-content-center">
                                  <FontAwesomeIcon
                                    icon={['fas', 'plus-circle']}
                                    className="font-size-lg"
                                  />
                                </div>
                              </div>
                            </div>
                            <img
                              alt="..."
                              className="card-img-top rounded"
                              src={stock2}
                              style={{ width: 170 }}
                            />
                          </a>
                        </Card>
                      </div>
                      <div className="pl-0 pl-sm-4">
                        <div className="mb-3 font-size-xxl font-weight-bold">
                          <a href="#/" onClick={(e) => e.preventDefault()}>
                            Bamburgh React Admin Dashboard with Material-UI PRO
                          </a>
                        </div>
                        <div className="d-flex font-size-sm mb-3 opacity-7 align-items-center">
                          <FontAwesomeIcon
                            icon={['far', 'clock']}
                            className="mr-2"
                          />
                          <span>17 May 2020</span>
                        </div>
                        <p className="font-size-lg text-black-50">
                          Premium admin template powered by the most popular UI
                          components framework available for React: Material-UI.
                          Features hundreds of examples making web development
                          fast and easy. Start from one of the individual apps
                          included or from the general dashboard and build
                          beautiful scalable applications and presentation
                          websites.
                        </p>
                        <div className="mt-3">
                          <Button
                            className="btn-primary btn-pill px-4 hover-scale-sm"
                            size="small"
                            href="#/"
                            onClick={(e) => e.preventDefault()}>
                            Learn more
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ListItem>
                </List>
              </PerfectScrollbar>
            </div>
            <div className="card-footer bg-white text-center p-3">
              <Tooltip title="Facebook" arrow>
                <Button className="btn-facebook btn-icon d-40 p-0 hover-scale-lg rounded-circle">
                  <FontAwesomeIcon
                    icon={['fab', 'facebook']}
                    className="font-size-lg"
                  />
                </Button>
              </Tooltip>
              <Tooltip title="Dribbble">
                <Button className="btn-dribbble btn-icon d-40 p-0 hover-scale-lg rounded-circle mx-2">
                  <FontAwesomeIcon
                    icon={['fab', 'dribbble']}
                    className="font-size-lg"
                  />
                </Button>
              </Tooltip>
              <Tooltip title="Twitter" arrow>
                <Button className="btn-twitter btn-icon d-40 p-0 hover-scale-lg rounded-circle">
                  <FontAwesomeIcon
                    icon={['fab', 'twitter']}
                    className="font-size-lg"
                  />
                </Button>
              </Tooltip>
            </div>
          </Card>
        </Grid>
        <Grid item xl={6}>
          <Card className="card-box">
            <div className="card-header bg-secondary">
              <div className="card-header--title">
                <small className="d-block text-uppercase mt-1">Scrolling</small>
                <b>Composed text cards</b>
              </div>
              <div className="card-header--actions">
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  size="small"
                  className="btn-icon border-0 p-0 d-30 btn-primary">
                  <FontAwesomeIcon icon={['fas', 'plus']} />
                </Button>
              </div>
            </div>
            <div className="scroll-area-lg shadow-overflow">
              <PerfectScrollbar options={{ wheelPropagation: false }}>
                <CardContent>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper avatar-icon-lg mr-3">
                        <div className="badge badge-danger badge-circle">
                          Offline
                        </div>
                        <div className="avatar-icon rounded">
                          <img alt="..." src={avatar7} />
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold"
                          title="...">
                          Kate Winchester
                        </a>
                        <span className="text-black-50 d-block">
                          Freelance Designer, Mutual Inc.
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="rounded-pill bg-neutral-success text-success px-3 py-1 h-auto font-size-sm">
                        Successful
                      </span>
                    </div>
                  </div>
                  <p className="text-black-50 mb-0">
                    From its medieval origins to the digital era, learn
                    everything there is to know about the ubiquitous lorem ipsum
                    passage learn everything there is.
                  </p>
                </CardContent>
                <div className="divider" />
                <CardContent>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper avatar-icon-lg mr-3">
                        <div className="badge badge-success badge-circle">
                          Online
                        </div>
                        <div className="avatar-icon rounded">
                          <img alt="..." src={avatar1} />
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold"
                          title="...">
                          Solomon Mora
                        </a>
                        <span className="text-black-50 d-block">
                          <FontAwesomeIcon
                            icon={['far', 'clock']}
                            className="opacity-7 mr-1"
                          />
                          2 days ago
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="rounded-pill bg-neutral-warning text-warning px-3 py-1 h-auto font-size-sm">
                        Pending
                      </span>
                    </div>
                  </div>
                  <p className="text-black-50">
                    The purpose of lorem ipsum is to create a natural looking
                    block of text (sentence, paragraph, page, etc.) that doesn't
                    distract from the layout.
                  </p>
                  <p className="text-black-50 mb-0">
                    A practice not without controversy, laying out pages with
                    meaningless filler text can be very useful when the focus is
                    meant to be on design, not content.
                  </p>
                </CardContent>
                <div className="divider" />
                <CardContent>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper avatar-icon-lg mr-3">
                        <div
                          className="badge badge-success badge-circle"
                          title="User Online">
                          Online
                        </div>
                        <div className="avatar-icon rounded">
                          <img alt="..." src={avatar5} />
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold"
                          title="...">
                          Milly Dougherty
                        </a>
                        <span className="text-black-50 d-block">
                          <FontAwesomeIcon
                            icon={['far', 'calendar-alt']}
                            className="opacity-7 mr-1"
                          />
                          15 August 2021
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="rounded-pill bg-neutral-first text-first px-3 py-1 h-auto font-size-sm font-weight-bold">
                        Investigation
                      </span>
                    </div>
                  </div>
                  <p className="text-black-50 mb-0">
                    The purpose of lorem ipsum is to create a natural looking
                    block of text from the layout laying out pages with
                    meaningless filler.
                  </p>
                </CardContent>
                <div className="divider" />
                <CardContent>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper avatar-icon-lg mr-3">
                        <div className="badge badge-warning badge-position badge-position--bottom-center badge-circle-inner">
                          Idle
                        </div>
                        <div className="avatar-icon rounded">
                          <img alt="..." src={avatar3} />
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold"
                          title="...">
                          Amy-Louise Mccaffrey
                        </a>
                        <span className="text-black-50 d-block">
                          <FontAwesomeIcon
                            icon={['far', 'clock']}
                            className="opacity-7 mr-1"
                          />
                          2 days ago
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="rounded-pill bg-neutral-danger text-danger px-3 py-1 h-auto font-size-sm font-weight-bold">
                        Declined
                      </span>
                    </div>
                  </div>
                  <p className="text-black-50 mb-0">
                    A practice not without controversy, laying out pages with
                    meaningless filler text can be very useful when the focus is
                    meant to be on design, not content.
                  </p>
                </CardContent>
                <div className="divider" />
              </PerfectScrollbar>
            </div>
            <div className="card-footer bg-white text-center p-3">
              <Button className="btn-primary btn-icon d-40 p-0 hover-scale-lg rounded-circle mr-2">
                <FontAwesomeIcon
                  icon={['far', 'question-circle']}
                  className="font-size-lg"
                />
              </Button>
              <Button className="btn-primary btn-icon d-40 p-0 hover-scale-lg rounded-circle">
                <FontAwesomeIcon
                  icon={['far', 'user-circle']}
                  className="font-size-lg"
                />
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
