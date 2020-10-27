import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import GaugeChart from 'react-gauge-chart';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={4} className="d-flex">
          <Card className="card-box w-100 d-flex align-items-center">
            <div className="card-tr-actions">
              <Button
                variant="text"
                className="p-0 d-30 border-0 btn-transition-none text-white-50"
                disableRipple>
                <FontAwesomeIcon
                  icon={['fas', 'ellipsis-h']}
                  className="font-size-lg"
                />
              </Button>
            </div>
            <div className="d-flex flex-column flex-grow-1 justify-content-center w-100">
              <div className="card-header-alt d-flex justify-content-center px-4 pt-4 pb-2">
                <h6 className="font-weight-bold font-size-xl mb-2 text-black">
                  Storage Capacity
                </h6>
              </div>
              <div className="mx-auto">
                <GaugeChart
                  id="chartsGauges3A"
                  nrOfLevels={20}
                  colors={['#1bc943', '#f83245']}
                  arcWidth={0.4}
                  hideText
                  percent={0.77}
                />
              </div>
              <div className="px-4 pb-4 pt-2">
                <div className="d-flex text-uppercase justify-content-center text-black-50 font-size-xs font-weight-bold mb-4">
                  <div className="d-flex align-items-center">
                    <div className="badge badge-success badge-circle mx-2">
                      available
                    </div>
                    <span className="d-20 w-auto">Available</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="badge badge-danger badge-circle mx-2">
                      total
                    </div>
                    <span className="d-20 w-auto">Total</span>
                  </div>
                </div>
                <Button
                  fullWidth
                  className="btn-neutral-dark font-weight-bold text-uppercase font-size-sm hover-scale-sm">
                  Increase Storage
                </Button>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xl={4} className="d-flex">
          <Card className="card-box w-100 d-flex align-items-center">
            <div className="d-flex flex-column flex-grow-1 justify-content-center w-100">
              <div className="card-header-alt d-flex justify-content-center px-4 pt-4 pb-2">
                <h6 className="font-weight-bold font-size-xl mb-2 text-black">
                  Lost Packages
                </h6>
              </div>
              <div className="mx-auto">
                <GaugeChart
                  id="chartsGauges3B"
                  nrOfLevels={20}
                  colors={['rgba(65,145,255,0.3)', '#4191ff']}
                  arcWidth={0.4}
                  hideText
                  percent={0.55}
                />
              </div>
              <p className="mb-3 text-black-50 text-center">
                These issues require immediate action !
              </p>
              <div className="px-4 pb-4 pt-2">
                <Button
                  fullWidth
                  className="btn-neutral-dark font-weight-bold text-uppercase font-size-sm hover-scale-sm">
                  View Network Issues
                </Button>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xl={4} className="d-flex">
          <Card className="card-box w-100 d-flex align-items-center">
            <div className="d-flex flex-column flex-grow-1 justify-content-center w-100">
              <div className="card-header-alt d-flex justify-content-center px-4 pt-4 pb-2">
                <h6 className="font-weight-bold font-size-xl mb-2 text-black">
                  Internet Speed
                </h6>
              </div>
              <div className="mx-auto">
                <GaugeChart
                  id="chartsGauges3C"
                  nrOfLevels={20}
                  colors={['#1bc943', '#f4772e', '#f83245']}
                  arcWidth={0.4}
                  hideText
                  percent={0.47}
                />
              </div>
              <div className="px-5 mt-2">
                <Grid
                  container
                  spacing={6}
                  className="text-black-50 font-size-sm">
                  <Grid item md={4} className="d-flex justify-content-center">
                    <div>
                      <div className="d-flex p-1 align-items-center">
                        <div className="badge badge-success badge-circle mr-2">
                          fast
                        </div>
                        <span className="d-20 w-auto">fast</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item md={4} className="d-flex justify-content-center">
                    <div>
                      <div className="d-flex p-1 align-items-center">
                        <div className="badge badge-warning badge-circle mr-2">
                          normal
                        </div>
                        <span className="d-20 w-auto">normal</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item md={4} className="d-flex justify-content-center">
                    <div>
                      <div className="d-flex p-1 align-items-center">
                        <div className="badge badge-danger badge-circle mr-2">
                          slow
                        </div>
                        <span className="d-20 w-auto">slow</span>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className="p-4">
                <Button
                  fullWidth
                  className="btn-neutral-dark font-weight-bold text-uppercase font-size-sm hover-scale-sm">
                  Increase capacity
                </Button>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
