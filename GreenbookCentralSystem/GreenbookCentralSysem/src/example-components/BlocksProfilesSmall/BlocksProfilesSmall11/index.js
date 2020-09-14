import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, LinearProgress, Card, Button } from '@material-ui/core';

import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item lg={6}>
            <Card className="card-box p-4">
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
              <div className="d-flex align-items-center mb-3">
                <div className="avatar-icon-wrapper rounded-circle mr-3">
                  <div className="d-block p-0 avatar-icon-wrapper m-0 d-100">
                    <div className="rounded-circle overflow-hidden">
                      <img alt="..." className="img-fluid" src={avatar6} />
                    </div>
                  </div>
                </div>
                <div className="w-100">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold font-size-lg"
                    title="...">
                    Kate Winchester
                  </a>
                  <span className="text-black-50 d-block">
                    Freelance Designer, Mutual Inc.
                  </span>
                  <div className="d-flex align-items-center pt-1">
                    <LinearProgress
                      variant="determinate"
                      className="progress-xs progress-bar-rounded flex-grow-1 progress-animated-alt progress-bar-danger"
                      value={56}
                    />
                    <div className="font-weight-bold text-black-50 pl-2">
                      56%
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-black-50 font-size-md mb-0">
                Premium admin template powered by the most popular UI components
                framework available for React: Material-UI. Features hundreds of
                examples making web development fast and easy. Start from one of
                the individual apps included or from the general dashboard and
                build beautiful scalable applications and presentation websites.
              </p>
              <div className="my-4 font-size-sm p-3 bg-secondary rounded-sm">
                <div className="d-flex justify-content-between">
                  <span className="font-weight-bold">Email:</span>
                  <span className="text-black-50">russotry@russo.com</span>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <span className="font-weight-bold">Job Description:</span>
                  <span className="text-black-50">Project Manager</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="font-weight-bold">Location:</span>
                  <span className="text-black-50">San Francisco, USA</span>
                </div>
              </div>
              <Button fullWidth className="btn-neutral-danger text-uppercase">
                <span className="font-weight-bold">View Complete Profile</span>
              </Button>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Card className="card-box p-4">
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
                Premium admin template powered by the most popular UI components
                framework available for React: Material-UI. Features hundreds of
                examples making web development fast and easy. Start from one of
                the individual apps included or from the general dashboard and
                build beautiful scalable applications and presentation websites.
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
              <Button fullWidth className="btn-neutral-first text-uppercase">
                <span className="font-weight-bold">View Complete Profile</span>
              </Button>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item lg={6}>
            <Card className="card-box p-4">
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
                Premium admin template powered by the most popular UI components
                framework available for React: Material-UI. Features hundreds of
                examples making web development fast and easy. Start from one of
                the individual apps included or from the general dashboard and
                build beautiful scalable applications and presentation websites.
              </p>
              <div className="divider mt-4" />
              <div className="font-size-sm py-3 rounded-sm">
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
              <div className="divider mb-4" />
              <Button fullWidth className="btn-neutral-warning text-uppercase">
                <span className="font-weight-bold">View Complete Profile</span>
              </Button>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Card className="card-box p-4">
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
              <div className="d-flex align-items-center mb-3">
                <div
                  className="avatar-icon-wrapper rounded-circle mr-3"
                  title="Online">
                  <div className="badge badge-success badge-position badge-position--bottom-left badge-circle">
                    Online
                  </div>
                  <div className="rounded overflow-hidden d-100 bg-neutral-second font-size-lg text-center font-weight-bold text-second d-flex justify-content-center flex-column">
                    <span>SS</span>
                  </div>
                </div>
                <div className="w-100">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold font-size-lg"
                    title="...">
                    Stevie Sharp
                  </a>
                  <span className="text-black-50 d-block">UX Developer</span>
                  <div className="d-flex align-items-center pt-1">
                    <LinearProgress
                      variant="determinate"
                      className="progress-animated-alt progress-xs flex-grow-1 progress-bar-rounded progress-bar-success"
                      value={74}
                    />
                    <div className="font-weight-bold text-black-50 pl-2">
                      42%
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-black-50 font-size-md mb-0">
                Premium admin template powered by the most popular UI components
                framework available for React: Material-UI. Features hundreds of
                examples making web development fast and easy. Start from one of
                the individual apps included or from the general dashboard and
                build beautiful scalable applications and presentation websites.
              </p>
              <div className="divider mt-4" />
              <div className="font-size-sm py-3 rounded-sm">
                <div className="d-flex justify-content-between">
                  <span className="font-weight-bold">Email:</span>
                  <span className="text-black-50">jenna@example.com</span>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <span className="font-weight-bold">Job Description:</span>
                  <span className="text-black-50">UX Developer</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="font-weight-bold">Location:</span>
                  <span className="text-black-50">Berlin, DE</span>
                </div>
              </div>
              <div className="divider mb-4" />
              <Button fullWidth className="btn-neutral-success text-uppercase">
                <span className="font-weight-bold">View Complete Profile</span>
              </Button>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
