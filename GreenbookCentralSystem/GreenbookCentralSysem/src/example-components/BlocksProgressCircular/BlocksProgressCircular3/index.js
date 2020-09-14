import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

import CountUp from 'react-countup';
import { CircularProgressbar } from 'react-circular-progressbar';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item md={6} xl={3}>
            <Card className="card-box card-box-border-bottom border-danger shadow-danger-sm">
              <div className="d-flex justify-content-between align-items-center">
                <div className="p-3">
                  <div className="text-black-50 text-uppercase pb-2 font-size-sm">
                    Accounts
                  </div>
                  <h3 className="font-weight-bold display-4 mb-0 text-black">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-up']}
                      className="font-size-lg mr-2 text-success"
                    />
                    <span>
                      <CountUp
                        start={0}
                        end={34}
                        duration={6}
                        delay={2}
                        separator=""
                        decimals={0}
                        decimal=","
                      />
                    </span>
                    <small className="opacity-6 pl-1 text-black-50">%</small>
                  </h3>
                </div>
                <CircularProgressbar
                  value={53}
                  text={53 + '%'}
                  strokeWidth={5}
                  className="m-3 circular-progress-sm circular-progress-danger"
                />
              </div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="card-box card-box-border-bottom border-success shadow-success-sm">
              <div className="d-flex justify-content-between align-items-center">
                <div className="p-3">
                  <div className="text-black-50 text-uppercase pb-2 font-size-sm">
                    Subscriptions
                  </div>
                  <h3 className="font-weight-bold display-4 mb-0 text-black">
                    <span className="font-size-lg mr-2 text-success font-weight-bold">
                      +
                    </span>
                    <CountUp start={0} end={35} />
                    <small className="opacity-6 pl-1 text-black-50">
                      sales
                    </small>
                  </h3>
                </div>
                <CircularProgressbar
                  value={91}
                  text={91 + '%'}
                  strokeWidth={8}
                  className="m-3 circular-progress-sm circular-progress-success"
                />
              </div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="card-box card-box-border-bottom border-warning shadow-warning-sm">
              <div className="d-flex justify-content-between align-items-center">
                <div className="p-3">
                  <div className="text-black-50 text-uppercase pb-2 font-size-sm">
                    Expenses
                  </div>
                  <h3 className="font-weight-bold display-4 mb-0 text-black">
                    <span className="font-size-lg mr-2 text-black-50 font-weight-bold">
                      $
                    </span>
                    <span>1,25M</span>
                  </h3>
                </div>
                <CircularProgressbar
                  value={87}
                  text={87 + '%'}
                  strokeWidth={8}
                  className="m-3 circular-progress-sm circular-progress-warning"
                />
              </div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="card-box card-box-border-bottom border-info shadow-info-sm">
              <div className="d-flex justify-content-between align-items-center">
                <div className="p-3">
                  <div className="text-black-50 text-uppercase pb-2 font-size-sm">
                    Income
                  </div>
                  <h3 className="font-weight-bold display-4 mb-0 text-black">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-down']}
                      className="font-size-lg mr-2 text-danger"
                    />
                    <span>
                      <CountUp
                        start={0}
                        end={82}
                        duration={6}
                        delay={2}
                        separator=" "
                        decimals={0}
                        decimal=","
                        prefix=""
                        suffix=""
                      />
                    </span>
                    <small className="opacity-6 pl-1 text-black-50">%</small>
                  </h3>
                </div>
                <CircularProgressbar
                  value={85}
                  text={85 + '%'}
                  strokeWidth={8}
                  className="m-3 circular-progress-sm circular-progress-info"
                />
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
