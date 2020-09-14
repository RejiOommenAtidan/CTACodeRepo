import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={3} md={6}>
            <Card className="bg-vicious-stance p-4">
              <div className="d-flex align-items-center">
                <div className="d-50 rounded-circle btn-icon bg-first text-white text-center font-size-lg mr-3">
                  <FontAwesomeIcon icon={['far', 'keyboard']} />
                </div>
                <div className="text-white font-weight-bold font-size-lg">
                  Orders
                </div>
              </div>
              <div className="display-3 text-center line-height-sm text-white text-center d-flex align-items-center pt-3 justify-content-center">
                <small>
                  <FontAwesomeIcon
                    icon={['fas', 'arrow-down']}
                    className="text-danger mr-2"
                  />
                </small>
                <div>$3,485</div>
              </div>
              <div className="text-white-50 text-center opacity-9 pt-3">
                <b>+36%</b> from last month
              </div>
            </Card>
          </Grid>
          <Grid item xl={3} md={6}>
            <Card className="bg-midnight-bloom p-4">
              <div className="d-flex align-items-center">
                <div className="d-50 rounded-circle btn-icon bg-success text-white text-center font-size-lg mr-3">
                  <FontAwesomeIcon icon={['far', 'file-excel']} />
                </div>
                <div className="text-white font-weight-bold font-size-lg">
                  Reports
                </div>
              </div>
              <div className="display-3 text-center line-height-sm text-white text-center d-flex align-items-center pt-3 justify-content-center">
                <small>
                  <FontAwesomeIcon
                    icon={['far', 'dot-circle']}
                    className="text-warning mr-2"
                  />
                </small>
                <div>436</div>
              </div>
              <div className="text-white-50 text-center opacity-9 pt-3">
                <b>+65%</b> from last month
              </div>
            </Card>
          </Grid>
          <Grid item xl={3} md={6}>
            <Card className="bg-royal p-4">
              <div className="d-flex align-items-center">
                <div className="d-50 rounded-circle btn-icon bg-danger text-white text-center font-size-lg mr-3">
                  <FontAwesomeIcon icon={['far', 'user']} />
                </div>
                <div className="text-white font-weight-bold font-size-lg">
                  Customers
                </div>
              </div>
              <div className="display-3 text-center line-height-sm text-white text-center d-flex align-items-center pt-3 justify-content-center">
                <small>
                  <FontAwesomeIcon
                    icon={['fas', 'arrow-up']}
                    className="text-success mr-2"
                  />
                </small>
                <div>4867</div>
              </div>
              <div className="text-white-50 text-center opacity-9 pt-3">
                <b>+22%</b> from last month
              </div>
            </Card>
          </Grid>
          <Grid item xl={3} md={6}>
            <Card className="bg-midnight-bloom p-4">
              <div className="d-flex align-items-center">
                <div className="d-50 rounded-circle btn-icon bg-info text-white text-center font-size-lg mr-3">
                  <FontAwesomeIcon icon={['fas', 'dollar-sign']} />
                </div>
                <div className="text-white font-weight-bold font-size-lg">
                  Sales
                </div>
              </div>
              <div className="display-3 text-center line-height-sm text-white text-center d-flex align-items-center pt-3 justify-content-center">
                <small>
                  <FontAwesomeIcon
                    icon={['fas', 'arrow-down']}
                    className="text-danger mr-2"
                  />
                </small>
                <div>868</div>
              </div>
              <div className="text-white-50 text-center opacity-9 pt-3">
                <b>+0.45%</b> from last year
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
