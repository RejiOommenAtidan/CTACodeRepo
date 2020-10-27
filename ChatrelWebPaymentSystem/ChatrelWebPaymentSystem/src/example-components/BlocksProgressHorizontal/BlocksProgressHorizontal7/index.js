import React from 'react';

import { Grid, LinearProgress, Card } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="p-4 mb-spacing-6-x2">
        <Grid container spacing={6} className="d-flex align-items-center">
          <Grid item xl={6}>
            <div className="text-black-50 pb-3">Project management</div>
            <div className="d-flex justify-content-center">
              <div>
                <div className="text-center font-size-lg px-5">
                  <span className="font-weight-bold">456</span>
                  <small className="text-black-50 d-block">Visitors</small>
                </div>
              </div>
              <div>
                <div className="text-center font-size-lg px-5">
                  <span className="font-weight-bold text-first">+34</span>
                  <small className="text-black-50 d-block">New users</small>
                </div>
              </div>
              <div>
                <div className="text-center font-size-lg px-5">
                  <span className="font-weight-bold">56%</span>
                  <small className="text-black-50 d-block">Increase</small>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xl={6}>
            <div className="text-black-50 pb-3">Current progress</div>
            <LinearProgress
              variant="determinate"
              className="progress-animated-alt progress-bar-rounded progress-bar-success"
              value={34}
            />
            <div className="align-box-row mt-1 text-muted">
              <div className="font-weight-bold">Orders</div>
              <div className="ml-auto">
                <div className="font-size-lg font-weight-bold text-success">
                  348
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>

      <Card className="card-box p-4 text-center mb-spacing-6-x2">
        <Grid container spacing={6}>
          <Grid item md={4}>
            <div className="mb-1 font-weight-bold font-size-xl">76%</div>
            <LinearProgress
              variant="determinate"
              className="bg-secondary progress-constrained progress-bar-rounded progress-bar-rounded-alt progress-bar-danger"
              value={76}
            />
            <div className="text-black-50 pt-2">Sales</div>
          </Grid>
          <Grid item md={4}>
            <div className="mb-1 font-weight-bold font-size-xl">23%</div>
            <LinearProgress
              variant="determinate"
              className="bg-secondary progress-constrained progress-bar-rounded progress-bar-rounded-alt progress-bar-info"
              value={23}
            />
            <div className="text-black-50 pt-2">Profiles</div>
          </Grid>
          <Grid item md={4}>
            <div className="mb-1 font-weight-bold font-size-xl">51%</div>
            <LinearProgress
              variant="determinate"
              className="bg-secondary progress-constrained progress-bar-rounded progress-bar-rounded-alt progress-bar-warning"
              value={51}
            />
            <div className="text-black-50 pt-2">Tickets</div>
          </Grid>
        </Grid>
      </Card>

      <Card className="card-box bg-royal p-4 text-center mb-spacing-6-x2">
        <Grid container spacing={6}>
          <Grid item md={4}>
            <div className="mb-1 font-weight-bold font-size-xl text-white">
              88%
            </div>
            <LinearProgress
              variant="determinate"
              className="bg-white-10 progress-constrained progress-bar-rounded progress-bar-success"
              value={88}
            />
            <div className="text-white-50 pt-2">Sales</div>
          </Grid>
          <Grid item md={4}>
            <div className="mb-1 font-weight-bold font-size-xl text-white">
              61%
            </div>
            <LinearProgress
              variant="determinate"
              className="bg-white-10 progress-constrained progress-bar-rounded progress-bar-warning"
              value={61}
            />
            <div className="text-white-50 pt-2">Profiles</div>
          </Grid>
          <Grid item md={4}>
            <div className="mb-1 font-weight-bold font-size-xl text-white">
              53%
            </div>
            <LinearProgress
              variant="determinate"
              className="bg-white-10 progress-constrained progress-bar-rounded progress-bar-first"
              value={53}
            />
            <div className="text-white-50 pt-2">Tickets</div>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
