import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item md={6} lg={3}>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="card card-box card-box-hover-rise card-box-hover text-black align-box-row text-second align-items-start p-4">
              <div>
                <div className="display-3 font-weight-bold text-success">
                  56
                </div>
                <div className="divider mt-2 mb-3 border-2 w-50 ml-1 bg-first rounded border-success" />
                <div className="font-weight-bold font-size-sm text-uppercase">
                  Tasks done
                </div>
              </div>
              <div className="ml-auto card-hover-indicator align-self-center">
                <FontAwesomeIcon
                  icon={['fas', 'chevron-right']}
                  className="font-size-xl"
                />
              </div>
            </a>
          </Grid>
          <Grid item md={6} lg={3}>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="card card-box card-box-hover-rise card-box-hover text-black align-box-row text-second align-items-start p-4">
              <div>
                <div className="display-3 font-weight-bold text-danger">18</div>
                <div className="divider mt-2 mb-3 border-2 w-50 bg-danger rounded border-danger" />
                <div className="font-weight-bold font-size-sm text-uppercase">
                  Requests
                </div>
              </div>
              <div className="ml-auto card-hover-indicator align-self-center">
                <FontAwesomeIcon
                  icon={['fas', 'chevron-right']}
                  className="font-size-xl"
                />
              </div>
            </a>
          </Grid>
          <Grid item md={6} lg={3}>
            <Card className="card-box text-center p-4 hover-scale-sm card-box-hover-rise">
              <div className="display-3 text-black font-weight-bold">29</div>
              <div className="divider mt-2 mb-3 mx-auto border-2 w-25 bg-success rounded border-success" />
              <div className="font-weight-bold font-size-sm text-uppercase">
                Bugfixes
              </div>
            </Card>
          </Grid>
          <Grid item md={6} lg={3}>
            <Card className="card-box text-center p-4 hover-scale-sm card-box-hover-rise">
              <div className="display-3 text-black font-weight-bold">768</div>
              <div className="divider mt-2 mb-3 mx-auto border-2 w-25 bg-danger rounded border-danger" />
              <div className="font-weight-bold font-size-sm text-uppercase">
                Tickets
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
