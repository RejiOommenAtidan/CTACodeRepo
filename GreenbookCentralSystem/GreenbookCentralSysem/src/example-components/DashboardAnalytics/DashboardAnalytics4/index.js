import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, LinearProgress, Card, Menu, Button } from '@material-ui/core';

import avatar2 from '../../../assets/images/avatars/avatar2.jpg';

export default function LivePreviewExample() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item lg={6}>
            <Card className="card-box p-4">
              <div className="card-tr-actions">
                <Button
                  onClick={handleClick2}
                  variant="text"
                  className="p-0 d-30 border-0 btn-transition-none text-primary font-size-xl">
                  <FontAwesomeIcon
                    icon={['fas', 'ellipsis-h']}
                    className="font-size-xl"
                  />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorEl)}
                  classes={{ list: 'p-0' }}
                  onClose={handleClose}>
                  <div className="dropdown-menu-xl overflow-hidden p-0">
                    <div className="grid-menu grid-menu-2col">
                      <Grid container spacing={0}>
                        <Grid item sm={6}>
                          <Button
                            variant="text"
                            className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                            <FontAwesomeIcon
                              icon={['far', 'bell']}
                              className="h2 d-block mb-2 mx-auto mt-1 text-success"
                            />
                            <div className="font-weight-bold text-black">
                              Reports
                            </div>
                            <div className="font-size-md mb-1 text-black-50">
                              Monthly Stats
                            </div>
                          </Button>
                        </Grid>
                        <Grid item sm={6}>
                          <Button
                            variant="text"
                            className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                            <FontAwesomeIcon
                              icon={['far', 'file-excel']}
                              className="h2 d-block mx-auto mb-2 mt-1 text-success"
                            />
                            <div className="font-weight-bold text-black">
                              Statistics
                            </div>
                            <div className="font-size-md mb-1 text-black-50">
                              Customers stats
                            </div>
                          </Button>
                        </Grid>
                        <Grid item sm={6}>
                          <Button
                            variant="text"
                            className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                            <FontAwesomeIcon
                              icon={['far', 'eye']}
                              className="h2 d-block mb-2 mx-auto mt-1 text-success"
                            />
                            <div className="font-weight-bold text-black">
                              Projects
                            </div>
                            <div className="font-size-md mb-1 text-black-50">
                              Manage servers
                            </div>
                          </Button>
                        </Grid>
                        <Grid item sm={6}>
                          <Button
                            variant="text"
                            className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                            <FontAwesomeIcon
                              icon={['far', 'chart-bar']}
                              className="h2 d-block mx-auto mb-2 mt-1 text-success"
                            />
                            <div className="font-weight-bold text-black">
                              Tasks
                            </div>
                            <div className="font-size-md mb-1 text-black-50">
                              Pending items
                            </div>
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Menu>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div
                  className="avatar-icon-wrapper rounded-circle mr-3"
                  title="Online">
                  <div className="badge badge-success badge-position badge-position--bottom-center badge-circle">
                    Online
                  </div>
                  <div className="rounded-circle overflow-hidden d-100 bg-neutral-danger font-size-lg text-center font-weight-bold text-danger d-flex justify-content-center flex-column">
                    <span>KA</span>
                  </div>
                </div>
                <div className="w-100">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold font-size-lg"
                    title="...">
                    Kris Alexander
                  </a>
                  <span className="text-black-50 d-block">
                    Project Manager, Apple Inc.
                  </span>
                  <div className="d-flex align-items-center pt-1">
                    <LinearProgress
                      variant="determinate"
                      className="progress-animated-alt progress-xs flex-grow-1 progress-bar-rounded progress-bar-warning"
                      value={42}
                    />
                    <div className="font-weight-bold text-black-50 pl-2">
                      42%
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-black-50 font-size-md mb-0">
                Creation timelines for the standard lorem ipsum passage vary,
                with some citing ...
              </p>
              <div className="my-4 font-size-sm p-3 bg-secondary rounded-sm">
                <div className="d-flex justify-content-between">
                  <span className="font-weight-bold">Email:</span>
                  <span className="text-black-50">krisa@example.com</span>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <span className="font-weight-bold">Job Description:</span>
                  <span className="text-black-50">Project Manager</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="font-weight-bold">Location:</span>
                  <span className="text-black-50">Montreal, CA</span>
                </div>
              </div>
              <Button
                fullWidth
                className="btn-neutral-warning text-uppercase font-size-xs">
                <span className="font-weight-bold">View Complete Profile</span>
              </Button>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Card className="card-box p-4">
              <div className="card-tr-actions">
                <Button
                  onClick={handleClick}
                  variant="text"
                  className="p-0 d-30 border-0 btn-transition-none text-primary font-size-xl">
                  <FontAwesomeIcon
                    icon={['fas', 'ellipsis-h']}
                    className="font-size-xl"
                  />
                </Button>
                <Menu
                  anchorEl={anchorEl2}
                  keepMounted
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorEl2)}
                  classes={{ list: 'p-0' }}
                  onClose={handleClose2}>
                  <div className="dropdown-menu-xl overflow-hidden p-0">
                    <div className="grid-menu grid-menu-2col">
                      <Grid container spacing={0}>
                        <Grid item sm={6}>
                          <Button
                            variant="text"
                            className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                            <FontAwesomeIcon
                              icon={['far', 'bell']}
                              className="h2 d-block mb-2 mx-auto mt-1 text-success"
                            />
                            <div className="font-weight-bold text-black">
                              Reports
                            </div>
                            <div className="font-size-md mb-1 text-black-50">
                              Monthly Stats
                            </div>
                          </Button>
                        </Grid>
                        <Grid item sm={6}>
                          <Button
                            variant="text"
                            className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                            <FontAwesomeIcon
                              icon={['far', 'file-excel']}
                              className="h2 d-block mx-auto mb-2 mt-1 text-success"
                            />
                            <div className="font-weight-bold text-black">
                              Statistics
                            </div>
                            <div className="font-size-md mb-1 text-black-50">
                              Customers stats
                            </div>
                          </Button>
                        </Grid>
                        <Grid item sm={6}>
                          <Button
                            variant="text"
                            className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                            <FontAwesomeIcon
                              icon={['far', 'eye']}
                              className="h2 d-block mb-2 mx-auto mt-1 text-success"
                            />
                            <div className="font-weight-bold text-black">
                              Projects
                            </div>
                            <div className="font-size-md mb-1 text-black-50">
                              Manage servers
                            </div>
                          </Button>
                        </Grid>
                        <Grid item sm={6}>
                          <Button
                            variant="text"
                            className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                            <FontAwesomeIcon
                              icon={['far', 'chart-bar']}
                              className="h2 d-block mx-auto mb-2 mt-1 text-success"
                            />
                            <div className="font-weight-bold text-black">
                              Tasks
                            </div>
                            <div className="font-size-md mb-1 text-black-50">
                              Pending items
                            </div>
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Menu>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="avatar-icon-wrapper rounded-circle mr-3">
                  <div className="d-block p-0 avatar-icon-wrapper m-0 d-100">
                    <div className="rounded-circle overflow-hidden">
                      <img alt="..." className="img-fluid" src={avatar2} />
                    </div>
                  </div>
                </div>
                <div className="w-100">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold font-size-lg"
                    title="...">
                    Matteo Mcphee
                  </a>
                  <span className="text-black-50 d-block">
                    Frontend Developer, Stripe Inc.
                  </span>
                  <div className="d-flex align-items-center pt-1">
                    <LinearProgress
                      variant="determinate"
                      className="progress-animated-alt progress-xs flex-grow-1 progress-bar-rounded progress-bar-first"
                      value={31}
                    />
                    <div className="font-weight-bold text-black-50 pl-2">
                      31%
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-black-50 font-size-md mb-0">
                So how did the classical Latin become so incoherent? According
                to McClintock ...
              </p>
              <div className="font-size-sm p-3 my-4 bg-light rounded-sm">
                <div className="d-flex justify-content-between">
                  <span className="font-weight-bold">Email:</span>
                  <span className="text-black-50">matteo@mophee.com</span>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <span className="font-weight-bold">Job Description:</span>
                  <span className="text-black-50">Frontend Developer</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="font-weight-bold">Location:</span>
                  <span className="text-black-50">London, UK</span>
                </div>
              </div>
              <Button
                fullWidth
                className="btn-neutral-first text-uppercase font-size-xs">
                <span className="font-weight-bold">View Complete Profile</span>
              </Button>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
