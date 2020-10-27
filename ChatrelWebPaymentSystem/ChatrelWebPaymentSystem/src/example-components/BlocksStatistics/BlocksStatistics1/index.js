import React from 'react';

import { Grid, Card } from '@material-ui/core';

import CountUp from 'react-countup';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item md={6} xl={3}>
            <Card className="shadow-success-sm p-3">
              <div className="text-black-50 pb-2">Expenses</div>
              <div className="d-flex justify-content-between align-items-end">
                <h3 className="display-4 mb-0 text-success">
                  <small className="pr-1">$</small>
                  <CountUp
                    start={0}
                    end={4.986}
                    duration={6}
                    delay={2}
                    separator=""
                    decimals={3}
                    decimal=","
                  />
                </h3>
                <div className="text-success font-weight-bold">+34%</div>
              </div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="shadow-warning-sm p-3">
              <div className="text-black-50 pb-2">Sales</div>
              <div className="d-flex justify-content-between align-items-end">
                <h3 className="display-4 mb-0 text-warning">
                  <small className="pr-1">$</small>
                  <CountUp
                    start={0}
                    end={4.546}
                    duration={4}
                    separator=""
                    decimals={3}
                    decimal=","
                    prefix=""
                    suffix=""
                  />
                </h3>
                <div className="text-warning font-weight-bold">+15%</div>
              </div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="shadow-first-sm p-3">
              <div className="text-black-50 pb-2">Income</div>
              <div className="d-flex justify-content-between align-items-end">
                <h3 className="display-4 mb-0 text-first">
                  <small className="pr-1">$</small>
                  <CountUp
                    start={0}
                    end={23.349}
                    duration={4}
                    separator=""
                    decimals={3}
                    decimal=","
                    prefix=""
                    suffix=""
                  />
                </h3>
                <div className="text-first font-weight-bold">+76%</div>
              </div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="shadow-danger-sm p-3">
              <div className="text-black-50 pb-2">Visitors</div>
              <div className="d-flex justify-content-between align-items-end">
                <h3 className="display-4 mb-0 text-danger">
                  <CountUp
                    start={0}
                    end={5385}
                    duration={4}
                    separator=""
                    decimals={0}
                    decimal=","
                    prefix=""
                    suffix=""
                  />
                </h3>
                <div className="text-danger font-weight-bold">+65%</div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
