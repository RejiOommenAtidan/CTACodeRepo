import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={5}>
          <Card className="card-box">
            <div className="grid-menu grid-menu-2col">
              <Grid container spacing={0}>
                <Grid item md={6}>
                  <Button
                    variant="text"
                    className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                    <FontAwesomeIcon
                      icon={['far', 'bell']}
                      className="h2 d-block mb-2 mx-auto mt-1 text-primary"
                    />
                    <div className="font-weight-bold font-size-md text-black">
                      Reports
                    </div>
                    <div className="font-size-md mb-1 text-black-50">
                      Monthly Stats
                    </div>
                  </Button>
                </Grid>
                <Grid item md={6}>
                  <Button
                    variant="text"
                    className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                    <FontAwesomeIcon
                      icon={['far', 'file-excel']}
                      className="h2 d-block mx-auto mb-2 mt-1 text-primary"
                    />
                    <div className="font-weight-bold font-size-md text-black">
                      Statistics
                    </div>
                    <div className="font-size-md mb-1 text-black-50">
                      Customers stats
                    </div>
                  </Button>
                </Grid>
                <Grid item md={6}>
                  <Button
                    variant="text"
                    className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                    <FontAwesomeIcon
                      icon={['far', 'eye']}
                      className="h2 d-block mb-2 mx-auto mt-1 text-primary"
                    />
                    <div className="font-weight-bold font-size-md text-black">
                      Projects
                    </div>
                    <div className="font-size-md mb-1 text-black-50">
                      Manage servers
                    </div>
                  </Button>
                </Grid>
                <Grid item md={6}>
                  <Button
                    variant="text"
                    className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                    <FontAwesomeIcon
                      icon={['far', 'chart-bar']}
                      className="h2 d-block mx-auto mb-2 mt-1 text-primary"
                    />
                    <div className="font-weight-bold font-size-md text-black">
                      Tasks
                    </div>
                    <div className="font-size-md mb-1 text-black-50">
                      Pending items
                    </div>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Card>
        </Grid>
        <Grid item xl={7}>
          <Card className="card-box">
            <div className="grid-menu grid-menu-3col">
              <Grid container spacing={0}>
                <Grid item md={4}>
                  <Button
                    variant="text"
                    className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                    <FontAwesomeIcon
                      icon={['far', 'comment-dots']}
                      className="h2 d-block mb-2 mx-auto mt-1 text-danger"
                    />
                    <div className="font-weight-bold font-size-md text-black">
                      Profiles
                    </div>
                    <div className="font-size-md mb-1 text-black-50">
                      Client details
                    </div>
                  </Button>
                </Grid>
                <Grid item md={4}>
                  <Button
                    variant="text"
                    className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                    <FontAwesomeIcon
                      icon={['far', 'question-circle']}
                      className="h2 d-block mx-auto mb-2 mt-1 text-primary"
                    />
                    <div className="font-weight-bold font-size-md text-black">
                      Accounts
                    </div>
                    <div className="font-size-md mb-1 text-black-50">
                      Statistics
                    </div>
                  </Button>
                </Grid>
                <Grid item md={4}>
                  <Button
                    variant="text"
                    className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                    <FontAwesomeIcon
                      icon={['far', 'eye']}
                      className="h2 d-block mb-2 mx-auto mt-1 text-success"
                    />
                    <div className="font-weight-bold font-size-md text-black">
                      Servers
                    </div>
                    <div className="font-size-md mb-1 text-black-50">
                      Uptime status
                    </div>
                  </Button>
                </Grid>
                <Grid item md={4}>
                  <Button
                    variant="text"
                    className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                    <FontAwesomeIcon
                      icon={['far', 'chart-bar']}
                      className="h2 d-block mx-auto mb-2 mt-1 text-warning"
                    />
                    <div className="font-weight-bold font-size-md text-black">
                      Deliveries
                    </div>
                    <div className="font-size-md mb-1 text-black-50">
                      Status reports
                    </div>
                  </Button>
                </Grid>
                <Grid item md={4}>
                  <Button
                    variant="text"
                    className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                    <FontAwesomeIcon
                      icon={['far', 'file-word']}
                      className="h2 d-block mx-auto mb-2 mt-1 text-first"
                    />
                    <div className="font-weight-bold font-size-md text-black">
                      Car fleet
                    </div>
                    <div className="font-size-md mb-1 text-black-50">
                      View details
                    </div>
                  </Button>
                </Grid>
                <Grid item md={4}>
                  <Button
                    variant="text"
                    className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                    <FontAwesomeIcon
                      icon={['far', 'building']}
                      className="h2 d-block mx-auto mb-2 mt-1 text-info"
                    />
                    <div className="font-weight-bold font-size-md text-black">
                      Income
                    </div>
                    <div className="font-size-md mb-1 text-black-50">
                      Annual report
                    </div>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
