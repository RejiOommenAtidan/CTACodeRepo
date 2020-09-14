import React from 'react';

import { Grid, LinearProgress, Card } from '@material-ui/core';

import CountUp from 'react-countup';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={4}>
            <Card className="card-box p-3">
              <div className="d-flex align-items-center pb-4 justify-content-between">
                <div>
                  <div className="font-weight-bold">Deliveries</div>
                  <span className="text-black-50 d-block">
                    Total deliveries to date
                  </span>
                </div>
                <div className="display-4 font-weight-bold text-second">
                  <CountUp
                    start={0}
                    end={23.485}
                    duration={6}
                    delay={2}
                    separator=""
                    decimals={3}
                    decimal=","
                  />
                </div>
              </div>
              <div>
                <LinearProgress
                  variant="determinate"
                  className="progress-sm progress-bar-rounded progress-animated-alt progress-bar-second"
                  value={85}
                />
                <div className="align-box-row progress-bar--label mt-2 text-muted">
                  <div>Target</div>
                  <div className="ml-auto">100%</div>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xl={4}>
            <Card className="card-box p-3">
              <div className="d-flex align-items-center pb-4 justify-content-between">
                <div>
                  <div className="font-weight-bold">Orders</div>
                  <span className="text-black-50 d-block">
                    Total orders to date
                  </span>
                </div>
                <div className="display-4 font-weight-bold text-first">
                  $12,346
                </div>
              </div>
              <div>
                <LinearProgress
                  variant="determinate"
                  className="progress-sm progress-bar-rounded progress-animated-alt progress-bar-first"
                  value={87}
                />
                <div className="align-box-row progress-bar--label mt-2 text-muted">
                  <div>Target</div>
                  <div className="ml-auto">100%</div>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xl={4}>
            <Card className="card-box p-3">
              <div className="d-flex align-items-center pb-4 justify-content-between">
                <div>
                  <div className="font-weight-bold">Customers</div>
                  <span className="text-black-50 d-block">
                    Total customers to date
                  </span>
                </div>
                <div className="display-4 font-weight-bold text-warning">
                  $ 2,3M
                </div>
              </div>
              <div>
                <LinearProgress
                  variant="determinate"
                  className="progress-sm progress-bar-rounded progress-animated-alt progress-bar-warning"
                  value={55}
                />
                <div className="align-box-row progress-bar--label mt-2 text-muted">
                  <div>Target</div>
                  <div className="ml-auto">100%</div>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
