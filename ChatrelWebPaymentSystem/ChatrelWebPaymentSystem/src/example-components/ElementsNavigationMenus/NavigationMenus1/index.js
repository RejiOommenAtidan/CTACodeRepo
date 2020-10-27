import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={7}>
          <Card>
            <div className="grid-menu grid-menu-3col">
              <Grid container spacing={0}>
                <Grid item md={4}>
                  <div className="p-3">
                    <Button
                      variant="outlined"
                      className="d-block btn-outline-primary border-0 w-100 py-3">
                      <span className="font-size-xxl d-block">
                        <FontAwesomeIcon icon={['far', 'bell']} />
                      </span>
                      <span className="text-uppercase font-weight-bold font-size-xs">
                        Customers
                      </span>
                    </Button>
                  </div>
                </Grid>
                <Grid item md={4}>
                  <div className="p-3">
                    <Button
                      variant="outlined"
                      className="d-block btn-outline-first border-0 w-100 py-3">
                      <span className="font-size-xxl d-block">
                        <FontAwesomeIcon icon={['far', 'chart-bar']} />
                      </span>
                      <span className="text-uppercase font-weight-bold font-size-xs">
                        Orders
                      </span>
                    </Button>
                  </div>
                </Grid>
                <Grid item md={4}>
                  <div className="p-3">
                    <Button
                      variant="outlined"
                      className="d-block btn-outline-warning border-0 w-100 py-3">
                      <span className="font-size-xxl d-block">
                        <FontAwesomeIcon icon={['far', 'lightbulb']} />
                      </span>
                      <span className="text-uppercase font-weight-bold font-size-xs">
                        Tickets
                      </span>
                    </Button>
                  </div>
                </Grid>
                <Grid item md={4}>
                  <div className="p-3">
                    <Button
                      variant="outlined"
                      className="d-block btn-outline-danger border-0 w-100 py-3">
                      <span className="font-size-xxl d-block">
                        <FontAwesomeIcon icon={['far', 'user']} />
                      </span>
                      <span className="text-uppercase font-weight-bold font-size-xs">
                        Projects
                      </span>
                    </Button>
                  </div>
                </Grid>
                <Grid item md={4}>
                  <div className="p-3">
                    <Button
                      variant="outlined"
                      className="d-block btn-outline-success border-0 w-100 py-3">
                      <span className="font-size-xxl d-block">
                        <FontAwesomeIcon icon={['far', 'lightbulb']} />
                      </span>
                      <span className="text-uppercase font-weight-bold font-size-xs">
                        Profiles
                      </span>
                    </Button>
                  </div>
                </Grid>
                <Grid item md={4}>
                  <div className="p-3">
                    <Button
                      variant="outlined"
                      className="d-block btn-outline-info border-0 w-100 py-3">
                      <span className="font-size-xxl d-block">
                        <FontAwesomeIcon icon={['far', 'user']} />
                      </span>
                      <span className="text-uppercase font-weight-bold font-size-xs">
                        Servers
                      </span>
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Card>
        </Grid>
        <Grid item xl={5}>
          <Card>
            <div className="grid-menu grid-menu-2col">
              <Grid container spacing={0}>
                <Grid item md={6}>
                  <div className="p-2">
                    <Button
                      variant="outlined"
                      className="d-block btn-outline-primary border-0 w-100 shadow-none py-3 btn-transition-none btn-animated-icon-sm">
                      <div className="mx-auto">
                        <span className="btn-wrapper--icon btn-icon mx-auto font-size-lg d-40 bg-light rounded-pill d-block text-primary mb-2">
                          <FontAwesomeIcon icon={['far', 'bell']} />
                        </span>
                      </div>
                      <span className="font-weight-bold font-size-md">
                        Deliveries
                      </span>
                    </Button>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="p-2">
                    <Button
                      variant="outlined"
                      className="d-block btn-outline-primary border-0 w-100 shadow-none py-3 btn-transition-none btn-animated-icon-sm">
                      <div className="mx-auto">
                        <span className="btn-wrapper--icon btn-icon mx-auto font-size-lg d-40 bg-light rounded-pill d-block text-primary mb-2">
                          <FontAwesomeIcon icon={['far', 'chart-bar']} />
                        </span>
                      </div>
                      <span className="font-weight-bold font-size-md">
                        Accounts
                      </span>
                    </Button>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="p-2">
                    <Button
                      variant="outlined"
                      className="d-block btn-outline-primary border-0 w-100 shadow-none py-3 btn-transition-none btn-animated-icon-sm">
                      <div className="mx-auto">
                        <span className="btn-wrapper--icon btn-icon mx-auto font-size-lg d-40 bg-light rounded-pill d-block text-primary mb-2">
                          <FontAwesomeIcon icon={['far', 'lightbulb']} />
                        </span>
                      </div>
                      <span className="font-weight-bold font-size-md">
                        Reports
                      </span>
                    </Button>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="p-2">
                    <Button
                      variant="outlined"
                      className="d-block btn-outline-primary border-0 w-100 shadow-none py-3 btn-transition-none btn-animated-icon-sm">
                      <div className="mx-auto">
                        <span className="btn-wrapper--icon btn-icon mx-auto font-size-lg d-40 bg-light rounded-pill d-block text-primary mb-2">
                          <FontAwesomeIcon icon={['far', 'user']} />
                        </span>
                      </div>
                      <span className="font-weight-bold font-size-md">
                        Projects
                      </span>
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
