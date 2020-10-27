import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import CountUp from 'react-countup';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={5} className="d-flex">
            <Card className="card-box w-100 p-4 text-center">
              <div className="card-tr-actions">
                <Button
                  variant="text"
                  className="p-0 d-30 border-0 btn-transition-none text-dark opacity-8"
                  disableRipple>
                  <FontAwesomeIcon
                    icon={['fas', 'ellipsis-h']}
                    className="font-size-lg"
                  />
                </Button>
              </div>
              <div className="card-header-alt">
                <div className="font-weight-bold font-size-lg mb-0 text-black">
                  Financial year
                </div>
                <p className="text-black-50">Expenses statistics to date</p>
              </div>
              <div className="divider mb-5" />
              <h3 className="mb-0 display-3 mt-1 font-weight-bold">
                <small className="opacity-7">$</small>
                <span>
                  <CountUp
                    start={0}
                    end={458.695}
                    duration={4}
                    separator=""
                    decimals={3}
                    decimal=","
                    prefix=""
                    suffix=""
                  />
                </span>
              </h3>
              <div className="divider mt-5" />
              <Grid container spacing={6} className="mt-4">
                <Grid item md={6}>
                  <span className="opacity-6 pb-2">Current month</span>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="font-weight-bold font-size-lg">
                      <small className="opacity-6 pr-1">$</small>
                      <span>
                        <CountUp
                          start={0}
                          end={466.362}
                          duration={12}
                          deplay={2}
                          separator=""
                          decimals={3}
                          decimal=","
                        />
                      </span>
                    </span>
                    <div className="badge badge-neutral-danger ml-2 text-danger">
                      -8%
                    </div>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <span className="opacity-6 pb-2">Last year</span>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="font-weight-bold font-size-lg">
                      <small className="opacity-6 pr-1">$</small>
                      <span>
                        <CountUp
                          start={0}
                          end={34.546}
                          duration={12}
                          deplay={2}
                          separator=""
                          prefix="+"
                          suffix="%"
                          decimals={3}
                          decimal=","
                        />
                      </span>
                    </span>
                    <div className="badge badge-neutral-success text-success ml-2">
                      +13%
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xl={7}>
            <div className="mb-spacing-6">
              <Grid container spacing={6}>
                <Grid item md={6}>
                  <Card className="card-box card-shadow-first p-4">
                    <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
                      <FontAwesomeIcon
                        icon={['fas', 'arrow-down']}
                        className="font-size-sm text-danger mr-2"
                      />
                      <div>
                        <CountUp
                          start={0}
                          end={348.56}
                          duration={12}
                          deplay={2}
                          separator=""
                          decimals={2}
                          prefix="$ "
                          decimal=","
                        />
                      </div>
                    </div>
                    <div className="text-black-50 text-center opacity-6 pt-3">
                      <b>
                        <CountUp
                          start={0}
                          end={36}
                          duration={12}
                          deplay={2}
                          separator=""
                          decimals={0}
                          prefix="+"
                          suffix="%"
                          decimal=","
                        />
                      </b>{' '}
                      from last month
                    </div>
                  </Card>
                </Grid>
                <Grid item md={6}>
                  <Card className="card-box p-4">
                    <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
                      <FontAwesomeIcon
                        icon={['far', 'dot-circle']}
                        className="font-size-sm text-warning mr-2"
                      />
                      <div>
                        <CountUp
                          start={0}
                          end={436}
                          duration={12}
                          deplay={2}
                          separator=""
                          decimals={0}
                          decimal=","
                        />
                      </div>
                    </div>
                    <div className="text-black-50 text-center opacity-6 pt-3">
                      <b>
                        <CountUp
                          start={0}
                          end={65}
                          duration={12}
                          deplay={2}
                          separator=""
                          decimals={0}
                          prefix="+"
                          suffix="%"
                          decimal=","
                        />
                      </b>{' '}
                      from last month
                    </div>
                  </Card>
                </Grid>
                <Grid item md={6}>
                  <Card className="card-box p-4">
                    <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
                      <FontAwesomeIcon
                        icon={['fas', 'arrow-up']}
                        className="font-size-sm text-success mr-2"
                      />
                      <div>
                        <CountUp
                          start={0}
                          end={48.67}
                          duration={12}
                          deplay={2}
                          separator=""
                          decimals={2}
                          decimal=","
                        />
                      </div>
                    </div>
                    <div className="text-black-50 text-center opacity-6 pt-3">
                      <b>
                        <CountUp
                          start={0}
                          end={22}
                          duration={12}
                          deplay={2}
                          separator=""
                          prefix="+"
                          suffix="%"
                          decimals={0}
                          decimal=","
                        />
                      </b>{' '}
                      from last month
                    </div>
                  </Card>
                </Grid>
                <Grid item md={6}>
                  <Card className="card-box bg-premium-dark p-4">
                    <div className="display-3 text-center line-height-sm text-white-50 text-center d-flex align-items-center pt-3 justify-content-center">
                      <FontAwesomeIcon
                        icon={['fas', 'arrow-down']}
                        className="font-size-sm text-first mr-2"
                      />
                      <div>
                        <CountUp
                          start={0}
                          end={433}
                          duration={12}
                          deplay={2}
                          separator=""
                          prefix=""
                          suffix=""
                          decimals={0}
                          decimal=","
                        />
                      </div>
                    </div>
                    <div className="text-white-50 text-center opacity-6 pt-3">
                      <b>
                        <CountUp
                          start={0}
                          end={35}
                          duration={12}
                          deplay={2}
                          separator=""
                          prefix="+"
                          suffix="%"
                          decimals={0}
                          decimal=","
                        />
                      </b>{' '}
                      from last month
                    </div>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
