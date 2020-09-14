import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Box, Card, Button } from '@material-ui/core';

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={4} className="d-flex">
            <Card className="card-box w-100 d-flex align-items-center">
              <Box className="card-tr-actions">
                <Button
                  variant="text"
                  className="p-0 d-30 border-0 btn-transition-none text-dark"
                  disableRipple>
                  <FontAwesomeIcon
                    icon={['fas', 'ellipsis-v']}
                    className="font-size-lg"
                  />
                </Button>
              </Box>
              <div className="d-flex flex-column flex-grow-1 justify-content-center w-100">
                <div className="card-header-alt d-flex justify-content-center px-4 pt-4 pb-2">
                  <h6 className="font-weight-bold font-size-xl mb-1 text-black">
                    Storage status
                  </h6>
                </div>
                <div className="mx-auto">
                  <CircularProgressbar
                    value={56}
                    text={56 + '%'}
                    strokeWidth={8}
                    className="m-3 circular-progress-xxl circular-progress-primary"
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
                  <h6 className="font-weight-bold font-size-xl mb-1 text-black">
                    Active Issues
                  </h6>
                </div>
                <div className="mx-auto">
                  <CircularProgressbarWithChildren
                    circleRatio={0.75}
                    styles={buildStyles({ rotation: 1 / 2 + 1 / 8 })}
                    value={84}
                    strokeWidth={7}
                    className="m-3 circular-progress-xxl circular-progress-danger">
                    <div className="badge badge-danger p-3 badge-pill h-auto font-weight-normal font-size-lg">
                      453
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
                <p className="mb-3 text-black-50 text-center">
                  These issues require immediate action !
                </p>
                <div className="px-4 pb-4 pt-2">
                  <Button
                    fullWidth
                    className="btn-neutral-dark font-weight-bold text-uppercase font-size-sm hover-scale-sm">
                    View all Issues
                  </Button>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xl={4} className="d-flex">
            <Card className="card-box w-100 d-flex align-items-center">
              <div className="d-flex flex-column flex-grow-1 justify-content-center w-100">
                <div className="card-header-alt d-flex justify-content-center px-4 pt-4 pb-2">
                  <h6 className="font-weight-bold font-size-xl mb-1 text-black">
                    Email Marketing
                  </h6>
                </div>
                <div className="mx-auto">
                  <CircularProgressbarWithChildren
                    value={78}
                    strokeWidth={6}
                    className="m-3 circular-progress-xl circular-progress-warning">
                    <span className="text-warning font-size-xxl font-weight-normal">
                      78
                    </span>
                  </CircularProgressbarWithChildren>
                </div>
                <div className="px-5 mt-2">
                  <Grid
                    container
                    spacing={6}
                    className="text-black-50 font-size-sm">
                    <Grid item md={6} className="d-flex justify-content-center">
                      <div>
                        <div className="d-flex p-1 align-items-center">
                          <div className="badge badge-success badge-circle mr-2">
                            success
                          </div>
                          <span className="d-20 w-auto">successful</span>
                        </div>
                        <div className="d-flex p-1 align-items-center">
                          <div className="badge badge-first badge-circle mr-2">
                            fail
                          </div>
                          <span className="d-20 w-auto">failed</span>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} className="d-flex justify-content-center">
                      <div>
                        <div className="d-flex p-1 align-items-center">
                          <div className="badge badge-warning badge-circle mr-2">
                            success
                          </div>
                          <span className="d-20 w-auto">opened</span>
                        </div>
                        <div className="d-flex p-1 align-items-center">
                          <div className="badge badge-danger badge-circle mr-2">
                            fail
                          </div>
                          <span className="d-20 w-auto">reported</span>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div className="p-4">
                  <Button
                    fullWidth
                    className="btn-neutral-dark font-weight-bold text-uppercase font-size-sm hover-scale-sm">
                    Generate Report
                  </Button>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
