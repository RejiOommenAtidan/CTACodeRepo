import React from 'react';

import { Grid, LinearProgress, Card } from '@material-ui/core';

import CountUp from 'react-countup';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <Grid container spacing={0}>
          <Grid item xl={4} className="p-4">
            <div className="divider-v divider-v-lg" />
            <div className="d-flex align-items-center pb-4 justify-content-between">
              <div>
                <div className="font-weight-bold">Deliveries</div>
                <span className="text-black-50 d-block">
                  Total deliveries to date
                </span>
              </div>
              <div className="display-4 font-weight-bold text-danger">
                <CountUp
                  start={0}
                  end={23.485}
                  duration={6}
                  delay={2}
                  separator=""
                  decimals={3}
                  decimal="."
                />
              </div>
            </div>
            <div>
              <LinearProgress
                variant="determinate"
                className="progress-sm progress-bar-rounded progress-bar-danger"
                value={85}
              />
              <div className="align-box-row progress-bar--label mt-2 text-muted">
                <div>Target</div>
                <div className="ml-auto">100%</div>
              </div>
            </div>
          </Grid>
          <Grid item xl={4} className="p-4">
            <div className="divider-v divider-v-lg" />
            <div className="d-flex align-items-center pb-4 justify-content-between">
              <div>
                <div className="font-weight-bold">Orders</div>
                <span className="text-black-50 d-block">
                  Total orders to date
                </span>
              </div>
              <div className="display-4 font-weight-bold text-info">
                $12,346
              </div>
            </div>
            <div>
              <LinearProgress
                variant="determinate"
                className="progress-sm progress-bar-rounded progress-bar-info"
                value={76}
              />
              <div className="align-box-row progress-bar--label mt-2 text-muted">
                <div>Target</div>
                <div className="ml-auto">100%</div>
              </div>
            </div>
          </Grid>
          <Grid item xl={4} className="p-4">
            <div className="d-flex align-items-center pb-4 justify-content-between">
              <div>
                <div className="font-weight-bold">Customers</div>
                <span className="text-black-50 d-block">
                  Total customers to date
                </span>
              </div>
              <div className="display-4 font-weight-bold text-success">
                $ 2,3M
              </div>
            </div>
            <div>
              <LinearProgress
                variant="determinate"
                className="progress-sm progress-bar-rounded progress-bar-success"
                value={53}
              />
              <div className="align-box-row progress-bar--label mt-2 text-muted">
                <div>Target</div>
                <div className="ml-auto">100%</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
