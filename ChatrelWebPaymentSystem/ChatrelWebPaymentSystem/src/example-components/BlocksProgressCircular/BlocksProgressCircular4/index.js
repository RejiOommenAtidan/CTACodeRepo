import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import CountUp from 'react-countup';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item md={6} xl={3}>
            <Card className="card-box p-3">
              <div className="card-tr-actions">
                <Button className="btn-link p-0 text-black-50 d-30 btn-icon">
                  <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                </Button>
              </div>
              <div className="text-black-50 font-size-lg pb-3">Customers</div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <CircularProgressbar
                    value={65}
                    text={65 + '%'}
                    strokeWidth={9}
                    circleRatio={0.75}
                    styles={buildStyles({ rotation: 1 / 2 + 1 / 8 })}
                    className="m-3 circular-progress-lg circular-progress-info"
                  />
                </div>
                <div className="text-right pr-3">
                  <h3 className="font-weight-bold display-4 mb-1 text-black">
                    <CountUp
                      start={0}
                      end={547}
                      duration={4}
                      separator=""
                      decimals={0}
                      decimal=","
                      prefix=""
                      suffix=""
                    />
                  </h3>
                  <span className="text-black-50">Last week</span>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="card-box p-3">
              <div className="card-tr-actions">
                <Button className="btn-link p-0 text-black-50 d-30 btn-icon">
                  <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                </Button>
              </div>
              <div className="text-black-50 font-size-lg pb-3">Orders</div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <CircularProgressbar
                    value={87}
                    text={87 + '%'}
                    strokeWidth={9}
                    circleRatio={0.75}
                    styles={buildStyles({ rotation: 1 / 2 + 1 / 8 })}
                    className="m-3 circular-progress-lg circular-progress-first"
                  />
                </div>
                <div className="text-right pr-3">
                  <h3 className="font-weight-bold display-4 mb-1 text-black">
                    <CountUp
                      start={0}
                      end={456}
                      duration={6}
                      delay={2}
                      separator=" "
                      decimals={0}
                      decimal=","
                      prefix=""
                      suffix=""
                    />
                  </h3>
                  <span className="text-black-50">Last month</span>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="card-box p-3">
              <div className="card-tr-actions">
                <Button className="btn-link p-0 text-black-50 d-30 btn-icon">
                  <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                </Button>
              </div>
              <div className="text-black-50 font-size-lg pb-3">Visitors</div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <CircularProgressbar
                    value={49}
                    text={49 + '%'}
                    strokeWidth={9}
                    circleRatio={0.75}
                    styles={buildStyles({ rotation: 1 / 2 + 1 / 8 })}
                    className="m-3 circular-progress-lg circular-progress-primary"
                  />
                </div>
                <div className="text-right pr-3">
                  <h3 className="font-weight-bold display-4 mb-1 text-black">
                    <CountUp
                      start={0}
                      end={362}
                      duration={6}
                      delay={2}
                      separator=""
                      decimals={0}
                      decimal=","
                    />
                  </h3>
                  <span className="text-black-50">Last year</span>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="card-box p-3">
              <div className="card-tr-actions">
                <Button className="btn-link p-0 text-black-50 d-30 btn-icon">
                  <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                </Button>
              </div>
              <div className="text-black-50 font-size-lg pb-3">Deliveries</div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <CircularProgressbar
                    value={71}
                    text={71 + '%'}
                    strokeWidth={9}
                    circleRatio={0.75}
                    styles={buildStyles({ rotation: 1 / 2 + 1 / 8 })}
                    className="m-3 circular-progress-lg circular-progress-second"
                  />
                </div>
                <div className="text-right pr-3">
                  <h3 className="font-weight-bold display-4 mb-1 text-black">
                    <CountUp
                      start={0}
                      end={43}
                      duration={6}
                      delay={2}
                      separator=""
                      decimals={0}
                      decimal=","
                    />
                  </h3>
                  <span className="text-black-50">Last day</span>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
