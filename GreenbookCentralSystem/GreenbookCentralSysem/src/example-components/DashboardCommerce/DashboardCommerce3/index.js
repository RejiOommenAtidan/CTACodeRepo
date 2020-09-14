import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

import GaugeChart from 'react-gauge-chart';

export default function LivePreviewExample() {
  const [currentPercent1, setCurrentPercent1] = useState();
  const [currentPercent2, setCurrentPercent2] = useState();
  const [currentPercent3, setCurrentPercent3] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPercent1(Math.random());
      setCurrentPercent2(Math.random());
      setCurrentPercent3(Math.random());
    }, 1900);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={4} className="d-flex">
            <Card className="card-box w-100 p-4 d-flex align-items-center card-box-hover-rise">
              <div className="d-flex flex-column flex-grow-1 justify-content-center w-100">
                <div className="card-header-alt d-flex justify-content-between align-items-center">
                  <h6 className="font-weight-bold font-size-lg mb-0 text-black">
                    Weekly Sales
                  </h6>
                  <div className="text-success font-weight-bold">
                    $56,304.00
                  </div>
                </div>
                <div className="mx-auto py-3">
                  <GaugeChart
                    id="chartsGauges4A"
                    arcPadding={0.1}
                    cornerRadius={3}
                    textColor="rgba(0,0,0,.5"
                    colors={[
                      'rgba(27,201,67,0.1)',
                      'rgba(27,201,67,0.5)',
                      'rgba(27,201,67,0.99)'
                    ]}
                    percent={currentPercent1}
                    animDelay={0}
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
            <Card className="card-box w-100 p-4 d-flex align-items-center card-box-hover-rise">
              <div className="d-flex flex-column flex-grow-1 justify-content-center w-100">
                <div className="card-header-alt d-flex justify-content-between align-items-center">
                  <h6 className="font-weight-bold font-size-lg mb-0 text-black">
                    Returning Visitors
                  </h6>
                  <div className="text-warning font-weight-bold">12,34k</div>
                </div>
                <div className="mx-auto py-3">
                  <GaugeChart
                    id="chartsGauges4B"
                    arcPadding={0.1}
                    cornerRadius={3}
                    textColor="rgba(0,0,0,.5"
                    colors={[
                      'rgba(244,119,46,0.1)',
                      'rgba(244,119,46,0.5)',
                      'rgba(244,119,46,0.99)'
                    ]}
                    percent={currentPercent2}
                    animDelay={0}
                  />
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
            <Card className="card-box w-100 p-4 d-flex align-items-center card-box-hover-rise">
              <div className="d-flex flex-column flex-grow-1 justify-content-center w-100">
                <div className="card-header-alt d-flex justify-content-between align-items-center">
                  <h6 className="font-weight-bold font-size-lg mb-0 text-black">
                    Monthly Expenses
                  </h6>
                  <div className="badge badge-danger badge-pill font-weight-bold">
                    $45,349
                  </div>
                </div>
                <div className="mx-auto py-3">
                  <GaugeChart
                    id="chartsGauges4C"
                    arcPadding={0.1}
                    cornerRadius={3}
                    textColor="rgba(0,0,0,.5"
                    colors={[
                      'rgba(248,50,69,0.1)',
                      'rgba(248,50,69,0.5)',
                      'rgba(248,50,69,0.99)'
                    ]}
                    percent={currentPercent3}
                    animDelay={0}
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
                  <div className="text-black-50 pt-3">
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
