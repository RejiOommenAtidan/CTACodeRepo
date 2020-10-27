import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={3} md={6}>
          <Card className="card-box shadow-first-sm p-4">
            <div className="d-flex align-items-center">
              <div className="d-40 rounded-circle btn-icon font-size-sm bg-first text-white text-center font-size-lg mr-3">
                <FontAwesomeIcon icon={['far', 'keyboard']} />
              </div>
              <div className="text-black-50">Orders</div>
            </div>
            <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
              <FontAwesomeIcon
                icon={['fas', 'arrow-down']}
                className="font-size-sm text-danger mr-2"
              />
              <div>$3,485</div>
            </div>
            <div className="text-black-50 text-center opacity-8 pt-3">
              <b>+36%</b> from last month
            </div>
          </Card>
        </Grid>
        <Grid item xl={3} md={6}>
          <Card className="card-box shadow-success-sm p-4">
            <div className="d-flex align-items-center">
              <div className="d-40 rounded-circle btn-icon font-size-sm bg-success text-white text-center font-size-lg mr-3">
                <FontAwesomeIcon icon={['far', 'file-excel']} />
              </div>
              <div className="text-black-50">Reports</div>
            </div>
            <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
              <FontAwesomeIcon
                icon={['far', 'dot-circle']}
                className="font-size-sm text-warning mr-2"
              />
              <div>436</div>
            </div>
            <div className="text-black-50 text-center opacity-8 pt-3">
              <b>+65%</b> from last month
            </div>
          </Card>
        </Grid>
        <Grid item xl={3} md={6}>
          <Card className="card-box shadow-danger-sm p-4">
            <div className="d-flex align-items-center">
              <div className="d-40 rounded-circle btn-icon font-size-sm bg-danger text-white text-center font-size-lg mr-3">
                <FontAwesomeIcon icon={['far', 'user']} />
              </div>
              <div className="text-black-50">Customers</div>
            </div>
            <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
              <FontAwesomeIcon
                icon={['fas', 'arrow-up']}
                className="font-size-sm text-success mr-2"
              />
              <div>4867</div>
            </div>
            <div className="text-black-50 text-center opacity-8 pt-3">
              <b>+22%</b> from last month
            </div>
          </Card>
        </Grid>
        <Grid item xl={3} md={6}>
          <Card className="card-box shadow-info-sm p-4">
            <div className="d-flex align-items-center">
              <div className="d-40 rounded-circle btn-icon font-size-sm bg-info text-white text-center font-size-lg mr-3">
                <FontAwesomeIcon icon={['fas', 'dollar-sign']} />
              </div>
              <div className="text-black-50">Sales</div>
            </div>
            <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
              <FontAwesomeIcon
                icon={['fas', 'arrow-down']}
                className="font-size-sm text-danger mr-2"
              />
              <div>868</div>
            </div>
            <div className="text-black-50 text-center opacity-8 pt-3">
              <b>+0.45%</b> from last year
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
