import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item lg={4}>
            <Card className="card-box card-box-alt">
              <div className="card-content-overlay text-center pb-4">
                <div className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-success text-white btn-icon mx-auto text-center shadow-success">
                  <FontAwesomeIcon
                    icon={['far', 'bell']}
                    className="display-4"
                  />
                </div>
                <div className="font-weight-bold text-black display-3 mt-4 mb-1">
                  $4,745
                </div>
                <div className="font-size-lg text-dark opacity-8">
                  Today's Sales
                </div>
                <div className="divider mx-4 my-4" />
                <div className="text-center">
                  <Button
                    className="p-0 text-uppercase btn-link-success font-weight-bold font-size-sm btn-link"
                    variant="text">
                    <span>View details</span>
                  </Button>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card className="card-box card-box-alt">
              <div className="card-content-overlay text-center pb-4">
                <div className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-first text-white btn-icon mx-auto text-center shadow-first">
                  <FontAwesomeIcon
                    icon={['far', 'lightbulb']}
                    className="display-4"
                  />
                </div>
                <div className="font-weight-bold text-black display-3 mt-4 mb-1">
                  $8.348
                </div>
                <div className="font-size-lg text-dark opacity-8">
                  Monthly Income
                </div>
                <div className="divider mx-4 my-4" />
                <div className="text-center">
                  <Button
                    className="p-0 text-uppercase btn-link-first font-weight-bold font-size-sm btn-link"
                    variant="text">
                    <span>View details</span>
                  </Button>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card className="card-box card-box-alt">
              <div className="card-content-overlay text-center pb-4">
                <div className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-warning text-white btn-icon mx-auto text-center shadow-warning">
                  <FontAwesomeIcon
                    icon={['far', 'user']}
                    className="display-4"
                  />
                </div>
                <div className="font-weight-bold text-black display-3 mt-4 mb-1">
                  582
                </div>
                <div className="font-size-lg text-dark opacity-8">
                  Total Sales
                </div>
                <div className="divider mx-4 my-4" />
                <div className="text-center">
                  <Button
                    className="p-0 text-uppercase btn-link-warning font-weight-bold font-size-sm btn-link"
                    variant="text">
                    <span>View details</span>
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
