import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item lg={4}>
          <Card className="card-box p-4">
            <div className="card-tr-actions">
              <Button
                className="p-0 d-20 mr-1 btn-transition-none opacity-6 btn-link"
                variant="text">
                <FontAwesomeIcon
                  icon={['far', 'heart']}
                  className="font-size-sm"
                />
              </Button>
              <Button
                className="p-0 d-20 btn-transition-none opacity-6 btn-link"
                variant="text">
                <FontAwesomeIcon
                  icon={['fas', 'user']}
                  className="font-size-sm"
                />
              </Button>
            </div>
            <div className="d-flex align-items-center justify-content-between py-2">
              <div className="d-50 rounded-circle border-0 my-2 card-icon-wrapper bg-second text-white btn-icon text-center">
                <FontAwesomeIcon
                  icon={['far', 'bell']}
                  className="font-size-xl"
                />
              </div>
              <div className="d-flex align-items-center">
                <div className="badge rounded-circle badge-success d-20 btn-icon p-0 mr-0 mr-xl-2">
                  <FontAwesomeIcon
                    icon={['fas', 'check']}
                    className="font-size-sm"
                  />
                </div>
                <span className="font-size-xs text-dark d-none d-xl-block">
                  Target achieved
                </span>
              </div>
            </div>
            <div className="font-size-xl font-weight-bold pt-2 text-black">
              Recent Visitors
            </div>
            <div className="opacity-7">Today's analytics</div>
          </Card>
        </Grid>
        <Grid item lg={4}>
          <Card className="card-box p-4">
            <div className="card-tr-actions">
              <Button
                className="p-0 d-20 mr-1 btn-transition-none opacity-6 btn-link"
                variant="text">
                <FontAwesomeIcon
                  icon={['far', 'heart']}
                  className="font-size-sm"
                />
              </Button>
              <Button
                className="p-0 d-20 btn-transition-none opacity-6 btn-link"
                variant="text">
                <FontAwesomeIcon
                  icon={['fas', 'user']}
                  className="font-size-sm"
                />
              </Button>
            </div>
            <div className="d-flex align-items-center justify-content-between py-2">
              <div className="d-50 rounded-circle border-0 my-2 card-icon-wrapper bg-info text-white btn-icon text-center">
                <FontAwesomeIcon
                  icon={['fas', 'camera-retro']}
                  className="font-size-xl"
                />
              </div>
              <div className="d-flex align-items-center">
                <div className="badge rounded-circle badge-success d-20 btn-icon p-0 mr-0 mr-xl-2">
                  <FontAwesomeIcon
                    icon={['fas', 'check']}
                    className="font-size-sm"
                  />
                </div>
                <span className="font-size-xs text-dark d-none d-xl-block">
                  Target achieved
                </span>
              </div>
            </div>
            <div className="font-size-xl font-weight-bold pt-2 text-black">
              Today's Revenue
            </div>
            <div className="opacity-7">Successful orders</div>
          </Card>
        </Grid>
        <Grid item lg={4}>
          <Card className="card-box p-4">
            <div className="card-tr-actions">
              <Button
                className="p-0 d-20 mr-1 btn-transition-none opacity-6 btn-link"
                variant="text">
                <FontAwesomeIcon
                  icon={['far', 'heart']}
                  className="font-size-sm"
                />
              </Button>
              <Button
                className="p-0 d-20 btn-transition-none opacity-6 btn-link"
                variant="text">
                <FontAwesomeIcon
                  icon={['fas', 'user']}
                  className="font-size-sm"
                />
              </Button>
            </div>
            <div className="d-flex align-items-center justify-content-between py-2">
              <div className="d-50 rounded-circle border-0 my-2 card-icon-wrapper bg-warning text-white btn-icon text-center">
                <FontAwesomeIcon
                  icon={['far', 'lightbulb']}
                  className="font-size-xl"
                />
              </div>
              <div className="d-flex align-items-center">
                <div className="badge rounded-circle badge-danger d-20 btn-icon p-0 mr-0 mr-xl-2">
                  <FontAwesomeIcon
                    icon={['fas', 'times']}
                    className="font-size-sm"
                  />
                </div>
                <span className="font-size-xs text-danger d-none d-xl-block">
                  Target failed
                </span>
              </div>
            </div>
            <div className="font-size-xl font-weight-bold pt-2 text-black">
              New Customers
            </div>
            <div className="opacity-7">Latest statistics</div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
