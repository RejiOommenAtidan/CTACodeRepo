import React from 'react';

import { Grid, Card } from '@material-ui/core';

import CountUp from 'react-countup';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item md={6} xl={3}>
            <Card className="p-3 bg-deep-sky">
              <div className="text-white-50 pb-2">Income</div>
              <div className="d-flex justify-content-between align-items-end">
                <h3 className="display-4 mb-0">
                  <small className="pr-1 text-white-50">$</small>
                  <span className="text-white">3,21M</span>
                </h3>
                <div className="text-white font-weight-bold">-22%</div>
              </div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="p-3 bg-plum-plate">
              <div className="text-white-50 pb-2">Spendings</div>
              <div className="d-flex justify-content-between align-items-end">
                <h3 className="display-4 mb-0">
                  <small className="pr-1 text-white-50">$</small>
                  <span className="text-white">
                    <CountUp
                      start={0}
                      end={683.93}
                      duration={6}
                      delay={2}
                      separator=""
                      decimals={2}
                      decimal=","
                    />
                  </span>
                </h3>
                <div className="text-white-50 font-weight-bold">+7.454%</div>
              </div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="p-3 bg-grow-early">
              <div className="text-white-50 pb-2">Earnings</div>
              <div className="d-flex justify-content-between align-items-end">
                <h3 className="display-4 mb-0">
                  <small className="pr-1 text-white-50">$</small>
                  <span className="text-white">
                    <CountUp
                      start={0}
                      end={5843.65}
                      duration={6}
                      delay={2}
                      separator=""
                      decimals={2}
                      decimal=","
                    />
                  </span>
                </h3>
                <div className="text-white font-weight-bold">+34,4%</div>
              </div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="p-3 bg-nice-redora">
              <div className="text-white-50 pb-2">Losses</div>
              <div className="d-flex justify-content-between align-items-end">
                <h3 className="display-4 mb-0">
                  <small className="pr-1 text-white-50">$</small>
                  <span className="text-white">
                    <CountUp
                      start={0}
                      end={4.295}
                      duration={6}
                      delay={2}
                      separator=""
                      decimals={3}
                      decimal=","
                    />
                  </span>
                </h3>
                <div className="text-white font-weight-bold">+73.2%</div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
