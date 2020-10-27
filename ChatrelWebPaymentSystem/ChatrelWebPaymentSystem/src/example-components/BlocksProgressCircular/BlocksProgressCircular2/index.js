import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

import CountUp from 'react-countup';
import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item md={6} xl={3}>
            <Card className="card-box p-3">
              <div className="d-flex align-items-center">
                <CircularProgressbarWithChildren
                  value={81}
                  strokeWidth={6}
                  className="circular-progress-success">
                  <div className="d-40 rounded-circle bg-neutral-success btn-icon">
                    <FontAwesomeIcon
                      icon={['far', 'user']}
                      className="font-size-lg text-success"
                    />
                  </div>
                </CircularProgressbarWithChildren>
                <div className="pl-3">
                  <div className="text-black-50 font-weight-bold">Stocks</div>
                  <div className="display-4 font-weight-bold pt-2 text-black">
                    $
                    <CountUp
                      start={0}
                      end={683.57}
                      duration={6}
                      delay={2}
                      separator=""
                      decimals={2}
                      decimal=","
                    />
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="card-box p-3">
              <div className="d-flex align-items-center">
                <CircularProgressbarWithChildren
                  value={54}
                  strokeWidth={6}
                  className="circular-progress-info">
                  <div className="d-40 rounded-circle bg-neutral-info btn-icon">
                    <FontAwesomeIcon
                      icon={['far', 'chart-bar']}
                      className="font-size-lg text-info"
                    />
                  </div>
                </CircularProgressbarWithChildren>
                <div className="pl-3">
                  <div className="text-black-50 font-weight-bold">Sales</div>
                  <div className="display-4 font-weight-bold pt-2 text-black">
                    <CountUp
                      start={0}
                      end={8.741}
                      duration={6}
                      delay={2}
                      separator=""
                      decimals={3}
                      decimal=","
                    />
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="card-box bg-deep-sky p-3">
              <div className="d-flex align-items-center">
                <CircularProgressbarWithChildren
                  styles={buildStyles({
                    textColor: 'var(--white)',
                    pathColor: 'rgba(255,255,255,.95)',
                    trailColor: 'rgba(255,255,255,.1)'
                  })}
                  value={34}
                  strokeWidth={6}
                  className="circular-progress-success">
                  <div className="d-40 rounded bg-white-10 btn-icon">
                    <FontAwesomeIcon
                      icon={['far', 'question-circle']}
                      className="font-size-lg text-white"
                    />
                  </div>
                </CircularProgressbarWithChildren>
                <div className="pl-3">
                  <div className="text-white-50 font-weight-bold">Issues</div>
                  <div className="display-4 font-weight-bold pt-2 text-white">
                    <CountUp
                      start={0}
                      end={54}
                      duration={6}
                      delay={2}
                      separator=""
                      decimals={0}
                      decimal=","
                    />
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="card-box bg-plum-plate p-3">
              <div className="d-flex align-items-center">
                <CircularProgressbarWithChildren
                  styles={buildStyles({
                    textColor: 'var(--white)',
                    pathColor: 'rgba(255,255,255,.95)',
                    trailColor: 'rgba(255,255,255,.1)'
                  })}
                  value={74}
                  strokeWidth={6}
                  className="circular-progress-success">
                  <div className="d-40 rounded bg-white-10 btn-icon">
                    <FontAwesomeIcon
                      icon={['far', 'user-circle']}
                      className="font-size-lg text-white"
                    />
                  </div>
                </CircularProgressbarWithChildren>
                <div className="pl-3">
                  <div className="text-white-50 font-weight-bold">Users</div>
                  <div className="display-4 font-weight-bold pt-2 text-white">
                    $
                    <CountUp
                      start={0}
                      end={8.357}
                      duration={6}
                      delay={2}
                      separator=""
                      decimals={3}
                      decimal=","
                    />
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
