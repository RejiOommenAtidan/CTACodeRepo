import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, CardContent, Button, Tooltip } from '@material-ui/core';

import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item lg={6}>
            <Card className="shadow-xxl">
              <div className="card-header bg-secondary text-center pt-4 pb-3">
                <div className="avatar-icon-wrapper shadow-xxl border-white border-3 rounded-circle m-0">
                  <div className="d-block p-0 avatar-icon-wrapper m-0 d-100">
                    <div className="rounded-circle overflow-hidden">
                      <img
                        alt="..."
                        className="img-fluid d-100"
                        src={avatar6}
                      />
                    </div>
                  </div>
                </div>
                <h3 className="font-size-xl font-weight-bold mt-2">
                  Shania O'Brien
                </h3>
                <div className="badge badge-danger mt-1 mb-4 font-size-xs badge-pill px-4 py-1 h-auto">
                  offline
                </div>
                <p className="mb-4 text-dark opacity-8 px-3">
                  Premium admin template powered by the most popular UI
                  components framework available for React: Material-UI.
                  Features hundreds of examples making web development fast and
                  easy. Start from one of the individual apps included or from
                  the general dashboard and build beautiful scalable
                  applications and presentation websites.
                </p>
              </div>
              <div className="card-tr-actions">
                <Button
                  variant="text"
                  className="p-0 d-30 border-0 btn-transition-none text-dark"
                  disableRipple>
                  <FontAwesomeIcon
                    icon={['fas', 'ellipsis-h']}
                    className="font-size-lg"
                  />
                </Button>
              </div>
              <div className="divider" />
              <CardContent className="pb-0 px-0 text-center card-body-button">
                <div className="card-body-button-wrapper">
                  <Tooltip title="Github">
                    <Button
                      size="large"
                      className="btn-github shadow-none border-3 border-white btn-pill mx-2 hover-scale-sm btn-animated-icon d-70 p-0">
                      <FontAwesomeIcon
                        icon={['fab', 'github']}
                        className="font-size-xl"
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Instagram" arrow>
                    <Button
                      size="large"
                      className="btn-instagram shadow-none border-3 border-white btn-pill mx-2 hover-scale-sm btn-animated-icon d-70 p-0">
                      <FontAwesomeIcon
                        icon={['fab', 'instagram']}
                        className="font-size-xl"
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Google" arrow>
                    <Button
                      size="large"
                      className="btn-google shadow-none border-3 border-white btn-pill mx-2 hover-scale-sm btn-animated-icon d-70 p-0">
                      <FontAwesomeIcon
                        icon={['fab', 'google']}
                        className="font-size-xl"
                      />
                    </Button>
                  </Tooltip>
                </div>
                <div className="px-3 pb-3">
                  <Grid container spacing={0}>
                    <Grid item md={6}>
                      <div className="p-3">
                        <Button className="btn-first d-block border-0 w-100 shadow-none rounded py-3 btn-transition-none btn-animated-icon-sm">
                          <div className="mx-auto">
                            <span className="btn-wrapper--icon btn-icon mx-auto font-size-lg d-40 bg-white-10 rounded-pill d-block text-white mb-2">
                              <FontAwesomeIcon icon={['far', 'bell']} />
                            </span>
                          </div>
                          <span className="font-weight-bold">Deliveries</span>
                        </Button>
                      </div>
                    </Grid>
                    <Grid item md={6}>
                      <div className="p-3">
                        <Button className="btn-success d-block border-0 w-100 shadow-none rounded py-3 btn-transition-none btn-animated-icon-sm">
                          <div className="mx-auto">
                            <span className="btn-wrapper--icon btn-icon mx-auto font-size-lg d-40 bg-white-10 rounded-pill d-block text-white mb-2">
                              <FontAwesomeIcon icon={['far', 'chart-bar']} />
                            </span>
                          </div>
                          <span className="font-weight-bold">Accounts</span>
                        </Button>
                      </div>
                    </Grid>
                    <Grid item md={6}>
                      <div className="p-3">
                        <Button className="btn-warning d-block border-0 w-100 shadow-none rounded py-3 btn-transition-none btn-animated-icon-sm">
                          <div className="mx-auto">
                            <span className="btn-wrapper--icon btn-icon mx-auto font-size-lg d-40 bg-white-10 rounded-pill d-block text-white mb-2">
                              <FontAwesomeIcon icon={['far', 'lightbulb']} />
                            </span>
                          </div>
                          <span className="font-weight-bold">Reports</span>
                        </Button>
                      </div>
                    </Grid>
                    <Grid item md={6}>
                      <div className="p-3">
                        <Button className="btn-danger d-block border-0 w-100 shadow-none rounded py-3 btn-transition-none btn-animated-icon-sm">
                          <div className="mx-auto">
                            <span className="btn-wrapper--icon btn-icon mx-auto font-size-lg d-40 bg-white-10 rounded-pill d-block text-white mb-2">
                              <FontAwesomeIcon icon={['far', 'user']} />
                            </span>
                          </div>
                          <span className="font-weight-bold">Projects</span>
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Card className="shadow-xxl">
              <div className="card-header bg-secondary text-center pt-4 pb-3">
                <div className="avatar-icon-wrapper shadow-xxl border-white border-3 rounded-circle m-0">
                  <div className="d-block p-0 avatar-icon-wrapper m-0 100">
                    <div className="rounded-circle overflow-hidden">
                      <img
                        alt="..."
                        className="img-fluid d-100"
                        src={avatar7}
                      />
                    </div>
                  </div>
                </div>
                <h3 className="font-size-xl font-weight-bold mt-2">
                  Martin Howell
                </h3>
                <div className="badge badge-success mt-1 mb-4 font-size-xs px-4 py-1 h-auto">
                  online
                </div>
                <p className="mb-4 text-dark opacity-8 px-3">
                  Premium admin template powered by the most popular UI
                  components framework available for React: Material-UI.
                  Features hundreds of examples making web development fast and
                  easy. Start from one of the individual apps included or from
                  the general dashboard and build beautiful scalable
                  applications and presentation websites.
                </p>
              </div>
              <div className="card-tr-actions">
                <Button
                  variant="text"
                  className="p-0 d-30 border-0 btn-transition-none text-dark"
                  disableRipple>
                  <FontAwesomeIcon
                    icon={['fas', 'ellipsis-h']}
                    className="font-size-lg"
                  />
                </Button>
              </div>
              <div className="divider" />
              <CardContent className="text-center card-body-button">
                <div className="card-body-button-wrapper">
                  <Button
                    size="large"
                    className="btn-instagram shadow-none border-3 border-white btn-pill mx-2 hover-scale-sm btn-animated-icon d-70 p-0">
                    <FontAwesomeIcon
                      icon={['fab', 'instagram']}
                      className="font-size-xl"
                    />
                  </Button>
                  <Button
                    size="large"
                    className="btn-discord shadow-none border-3 border-white btn-pill mx-2 hover-scale-sm btn-animated-icon d-70 p-0">
                    <FontAwesomeIcon
                      icon={['fab', 'discord']}
                      className="font-size-xl"
                    />
                  </Button>
                  <Button
                    size="large"
                    className="btn-facebook shadow-none border-3 border-white btn-pill mx-2 hover-scale-sm btn-animated-icon d-70 p-0">
                    <FontAwesomeIcon
                      icon={['fab', 'facebook']}
                      className="font-size-xl"
                    />
                  </Button>
                </div>
                <Grid container spacing={0}>
                  <Grid item md={6}>
                    <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'user']}
                          className="font-size-xxl text-warning"
                        />
                      </div>
                      <div className="mt-2 line-height-sm">
                        <b className="font-size-lg">2,345</b>
                        <span className="text-black-50 d-block">users</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                      <div>
                        <FontAwesomeIcon
                          icon={['fas', 'lemon']}
                          className="font-size-xxl text-success"
                        />
                      </div>
                      <div className="mt-2 line-height-sm">
                        <b className="font-size-lg">$3,586</b>
                        <span className="text-black-50 d-block">sales</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'chart-bar']}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="mt-2 line-height-sm">
                        <b className="font-size-lg">$9,693</b>
                        <span className="text-black-50 d-block">revenue</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                      <div>
                        <FontAwesomeIcon
                          icon={['fas', 'question-circle']}
                          className="font-size-xxl text-danger"
                        />
                      </div>
                      <div className="mt-2 line-height-sm">
                        <b className="font-size-lg">694</b>
                        <span className="text-black-50 d-block">issues</span>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
