import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={4} className="d-flex">
            <Card className="card-box w-100 p-4 d-flex align-items-center hover-scale-sm card-box-hover-rise">
              <div className="d-flex flex-column flex-grow-1 justify-content-center w-100">
                <div className="card-header-alt d-flex justify-content-between align-items-center">
                  <h6 className="font-weight-bold font-size-lg mb-0 text-black">
                    Weekly Sales
                  </h6>
                  <div className="text-success font-weight-bold">
                    $56,304.00
                  </div>
                </div>
                <div className="mx-auto py-2">
                  <CircularProgressbar
                    value={67.48}
                    text={67.48 + '%'}
                    strokeWidth={7}
                    className="m-3 circular-progress-xxl circular-progress-first"
                  />
                </div>
                <div className="divider mt-1" />
                <div className="divider mb-1" />
                <div className="pt-4">
                  <div className="text-success d-flex align-items-center">
                    <div className="d-30 rounded-sm btn-icon bg-neutral-success mr-2">
                      <FontAwesomeIcon icon={['fas', 'angle-up']} />
                    </div>
                    <span className="pt-1 font-weight-bold font-size-sm">
                      + 58.3%
                    </span>
                  </div>
                  <div className="text-black-50 pt-3">
                    You had a 58% increase in sales during the last 7 days. Keep
                    up the good work!
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xl={4} className="d-flex">
            <Card className="card-box w-100 p-4 d-flex align-items-center hover-scale-sm card-box-hover-rise">
              <div className="d-flex flex-column flex-grow-1 justify-content-center w-100">
                <div className="card-header-alt d-flex justify-content-between align-items-center">
                  <h6 className="font-weight-bold font-size-lg mb-0 text-black">
                    Returning Visitors
                  </h6>
                  <div className="text-warning font-weight-bold">12,34k</div>
                </div>
                <div className="mx-auto pt-2">
                  <CircularProgressbar
                    circleRatio={0.75}
                    styles={buildStyles({ rotation: 1 / 2 + 1 / 8 })}
                    value={84.32}
                    text={84.32 + '%'}
                    strokeWidth={5}
                    className="m-3 circular-progress-xxl circular-progress-warning"
                  />{' '}
                </div>
                <div className="divider" />
                <div className="divider mb-1" />
                <div className="pt-4">
                  <div className="text-warning d-flex align-items-center">
                    <div className="d-30 rounded-sm btn-icon bg-neutral-warning mr-2">
                      <FontAwesomeIcon icon={['fas', 'angle-down']} />
                    </div>
                    <span className="pt-1 font-weight-bold font-size-sm">
                      - 23.66%
                    </span>
                  </div>
                  <div className="text-black-50 pt-3">
                    You missed your target visitors numbers by 23.66%. Improve
                    your ratings!
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xl={4} className="d-flex">
            <Card className="card-box bg-warm-flame w-100 p-4 d-flex align-items-center hover-scale-sm card-box-hover-rise">
              <div className="d-flex flex-column flex-grow-1 justify-content-center w-100">
                <div className="card-header-alt d-flex justify-content-between align-items-center">
                  <h6 className="font-weight-bold font-size-lg mb-0 text-black">
                    Monthly Expenses
                  </h6>
                  <div className="badge badge-danger badge-pill font-weight-bold">
                    $45,349
                  </div>
                </div>
                <div className="mx-auto py-2">
                  <CircularProgressbar
                    value={67.48}
                    text={67.48 + '%'}
                    strokeWidth={7}
                    className="m-3 circular-progress-xxl circular-progress-danger"
                  />
                </div>
                <div className="divider bg-white opacity-2 mt-1" />
                <div className="divider bg-white opacity-2 mb-1" />
                <div className="pt-4">
                  <div className="d-flex align-items-center">
                    <div className="d-30 rounded-sm btn-icon bg-danger text-white mr-2">
                      <FontAwesomeIcon icon={['fas', 'angle-up']} />
                    </div>
                    <span className="pt-1 text-black font-weight-bold font-size-sm">
                      + 58.3%
                    </span>
                  </div>
                  <div className="text-black pt-3">
                    You're expenses are bigger than income. Do something to fix
                    this!
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
