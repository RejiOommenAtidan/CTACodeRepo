import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import avatar2 from '../../../assets/images/avatars/avatar2.jpg';

import avatar7 from '../../../assets/images/avatars/avatar7.jpg';
export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={4}>
          <Card className="card-box p-4">
            <div className="d-flex align-items-center justify-content-between py-2">
              <div className="d-flex align-items-center">
                <div className="avatar-icon-wrapper d-50 mr-3 avatar-initials">
                  <div className="avatar-icon rounded-circle d-50 shadow-sm font-weight-normal text-white bg-danger">
                    TS
                  </div>
                </div>
                <div>
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold"
                    title="...">
                    Shanelle Wynn
                  </a>
                  <span className="text-black-50 d-block">
                    UI Engineer, Apple Inc.
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="badge rounded-circle badge-neutral-success text-success d-30 btn-icon p-0 mr-1">
                  <FontAwesomeIcon icon={['fas', 'check']} />
                </div>
                <span className="font-size-xs text-success">
                  Profile Verified
                </span>
              </div>
            </div>
            <div className="divider mx-auto my-3 w-100" />
            <div className="text-center">
              <Button
                className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none border-0 btn-outline-first"
                variant="text">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['far', 'eye']} />
                </span>
              </Button>
              <Button
                className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none border-0 btn-outline-first"
                variant="text">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['far', 'heart']} />
                </span>
              </Button>
              <Button
                className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none border-0 btn-outline-first"
                variant="text">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'user']} />
                </span>
              </Button>
            </div>
            <div className="divider mx-auto my-3 w-100" />
            <Grid container spacing={6} className="text-center">
              <Grid item sm={4}>
                <div className="text-black-50">Projects</div>
                <b className="font-size-lg">381</b>
              </Grid>
              <Grid item sm={4}>
                <div className="text-black-50">Reviews</div>
                <b className="font-size-lg">129</b>
              </Grid>
              <Grid item sm={4}>
                <div className="text-black-50">Revenue</div>
                <b className="font-size-lg">$691</b>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xl={4}>
          <Card className="card-box p-4">
            <div className="d-flex align-items-center justify-content-between py-2">
              <div className="d-flex align-items-center">
                <div className="avatar-icon-wrapper d-50 mr-3">
                  <div className="avatar-icon rounded-circle d-50 shadow-sm">
                    <img alt="..." src={avatar2} />
                  </div>
                </div>
                <div>
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold"
                    title="...">
                    Richard Doyle
                  </a>
                  <span className="text-black-50 d-block">
                    Senior Consultant, Google
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="badge rounded-circle badge-neutral-warning text-warning d-30 btn-icon p-0 mr-1">
                  <FontAwesomeIcon icon={['far', 'clock']} />
                </div>
                <span className="font-size-xs text-warning">
                  Review Pending
                </span>
              </div>
            </div>
            <div className="divider mx-auto my-3 w-100" />
            <div className="text-center">
              <Button
                className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none border-0 btn-outline-first"
                variant="text">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['far', 'eye']} />
                </span>
              </Button>
              <Button
                className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none border-0 btn-outline-first"
                variant="text">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['far', 'heart']} />
                </span>
              </Button>
              <Button
                className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none border-0 btn-outline-first"
                variant="text">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'user']} />
                </span>
              </Button>
            </div>
            <div className="divider mx-auto my-3 w-100" />
            <Grid container spacing={6} className="text-center">
              <Grid item sm={4}>
                <div className="text-black-50">Projects</div>
                <b className="font-size-lg">34</b>
              </Grid>
              <Grid item sm={4}>
                <div className="text-black-50">Reviews</div>
                <b className="font-size-lg">21</b>
              </Grid>
              <Grid item sm={4}>
                <div className="text-black-50">Revenue</div>
                <b className="font-size-lg">$283</b>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xl={4}>
          <Card className="card-box p-4">
            <div className="d-flex align-items-center justify-content-between py-2">
              <div className="d-flex align-items-center">
                <div className="avatar-icon-wrapper d-50 mr-3">
                  <div className="avatar-icon rounded-circle d-50 shadow-sm">
                    <img alt="..." src={avatar7} />
                  </div>
                </div>
                <div>
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold"
                    title="...">
                    Johnny Becks
                  </a>
                  <span className="text-black-50 d-block">
                    Lead UX Designer, Spotify
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="badge rounded-circle badge-neutral-danger text-danger d-30 btn-icon p-0 mr-1">
                  <FontAwesomeIcon icon={['fas', 'times']} />
                </div>
                <span className="font-size-xs text-danger">Rejected</span>
              </div>
            </div>
            <div className="divider mx-auto my-3 w-100" />
            <div className="text-center">
              <Button
                disabled
                className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none border-0 btn-outline-first"
                variant="text">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['far', 'eye']} />
                </span>
              </Button>
              <Button
                disabled
                className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none border-0 btn-outline-first"
                variant="text">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['far', 'heart']} />
                </span>
              </Button>
              <Button
                disabled
                className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none border-0 btn-outline-first"
                variant="text">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'user']} />
                </span>
              </Button>
            </div>
            <div className="divider mx-auto my-3 w-100" />
            <Grid container spacing={6} className="text-center opacity-6">
              <Grid item sm={4}>
                <div className="text-black-50">Projects</div>
                <b className="font-size-lg">0</b>
              </Grid>
              <Grid item sm={4}>
                <div className="text-black-50">Reviews</div>
                <b className="font-size-lg">0</b>
              </Grid>
              <Grid item sm={4}>
                <div className="text-black-50">Revenue</div>
                <b className="font-size-lg">$0</b>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
