import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

import CountUp from 'react-countup';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={6}>
            <Card className="card-box">
              <Grid container spacing={0}>
                <Grid item lg={4} className="p-3">
                  <div className="divider-v divider-v-lg" />
                  <div className="text-center">
                    <div>
                      <FontAwesomeIcon
                        icon={['far', 'envelope']}
                        className="font-size-xxl text-info"
                      />
                    </div>
                    <div className="mt-2 line-height-sm">
                      <b className="font-size-lg">
                        <CountUp
                          start={0}
                          end={993}
                          duration={12}
                          deplay={2}
                          separator=" "
                          decimals={0}
                          decimal=","
                          prefix="$ "
                          suffix=""
                        />
                      </b>
                      <span className="text-black-50 d-block">revenue</span>
                    </div>
                  </div>
                </Grid>
                <Grid item lg={4} className="p-3">
                  <div className="divider-v divider-v-lg" />

                  <div className="text-center">
                    <div>
                      <FontAwesomeIcon
                        icon={['far', 'lightbulb']}
                        className="font-size-xxl text-success"
                      />
                    </div>
                    <div className="mt-2 line-height-sm">
                      <b className="font-size-lg">
                        <CountUp
                          start={0}
                          end={2345}
                          duration={12}
                          deplay={2}
                          separator=""
                          decimals={0}
                          decimal=","
                          prefix=""
                          suffix=""
                        />
                      </b>
                      <span className="text-black-50 d-block">users</span>
                    </div>
                  </div>
                </Grid>
                <Grid item lg={4} className="p-3">
                  <div className="text-center">
                    <div>
                      <FontAwesomeIcon
                        icon={['far', 'keyboard']}
                        className="font-size-xxl text-danger"
                      />
                    </div>
                    <div className="mt-2 line-height-sm">
                      <b className="font-size-lg">
                        <CountUp
                          start={0}
                          end={1024}
                          duration={9}
                          separator=""
                          decimals={0}
                          decimal=","
                          prefix=""
                          suffix=""
                        />
                      </b>
                      <span className="text-black-50 d-block">orders</span>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xl={6}>
            <Card className="card-box">
              <Grid container spacing={0}>
                <Grid item lg={4} className="p-3">
                  <div className="divider-v divider-v-lg" />

                  <div className="d-flex p-3">
                    <FontAwesomeIcon
                      icon={['far', 'envelope']}
                      className="display-4 text-info"
                    />
                    <div className="ml-3 line-height-sm">
                      <b className="font-size-xxl">
                        <CountUp
                          start={0}
                          end={5468}
                          duration={9}
                          separator=""
                          decimals={0}
                          decimal=","
                          prefix="$ "
                          suffix=""
                        />
                      </b>
                      <span className="text-black-50 d-block">revenue</span>
                    </div>
                  </div>
                </Grid>
                <Grid item lg={4} className="p-3">
                  <div className="divider-v divider-v-lg" />

                  <div className="d-flex p-3">
                    <FontAwesomeIcon
                      icon={['far', 'lightbulb']}
                      className="display-4 text-success"
                    />
                    <div className="ml-3 line-height-sm">
                      <b className="font-size-xxl">
                        <CountUp
                          start={0}
                          end={2346}
                          duration={5}
                          separator=""
                          decimals={0}
                          decimal=","
                          prefix=""
                          suffix=""
                        />
                      </b>
                      <span className="text-black-50 d-block">users</span>
                    </div>
                  </div>
                </Grid>
                <Grid item lg={4} className="p-3">
                  <div className="d-flex p-3">
                    <FontAwesomeIcon
                      icon={['far', 'keyboard']}
                      className="display-4 text-danger"
                    />
                    <div className="ml-3 line-height-sm">
                      <b className="font-size-xxl">
                        <CountUp
                          start={0}
                          end={7764}
                          duration={5}
                          separator=""
                          decimals={0}
                          decimal=","
                          prefix=""
                          suffix=""
                        />
                      </b>
                      <span className="text-black-50 d-block">orders</span>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
