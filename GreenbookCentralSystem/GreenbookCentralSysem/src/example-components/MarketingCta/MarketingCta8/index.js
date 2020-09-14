import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6-x2">
        <Grid container spacing={6}>
          <Grid item lg={4}>
            <Card className="card-box p-4">
              <div className="text-center">
                <div className="avatar-icon-wrapper rounded-circle m-0">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-danger text-danger m-0 d-130">
                    <FontAwesomeIcon
                      icon={['fas', 'times']}
                      className="d-flex align-self-center display-3"
                    />
                  </div>
                </div>
                <h4 className="font-weight-bold mt-4">Delete this entry?</h4>
                <p className="mb-0 font-size-lg text-muted">
                  You cannot undo this operation.
                </p>
                <div className="pt-4">
                  <Button className="btn-neutral-secondary btn-pill mx-1">
                    <span className="btn-wrapper--label">Cancel</span>
                  </Button>
                  <Button className="btn-danger btn-pill mx-1">
                    <span className="btn-wrapper--label">Delete</span>
                  </Button>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card className="card-box p-4">
              <div className="text-center">
                <div className="avatar-icon-wrapper rounded-circle m-0">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-success text-success m-0 d-130">
                    <FontAwesomeIcon
                      icon={['far', 'lightbulb']}
                      className="d-flex align-self-center display-3"
                    />
                  </div>
                </div>
                <h4 className="font-weight-bold mt-4">Really create this?</h4>
                <p className="mb-0 font-size-lg text-muted">
                  You can later review your options.
                </p>
                <div className="pt-4">
                  <Button className="btn-neutral-dark btn-pill mx-1">
                    <span className="btn-wrapper--label">Cancel</span>
                  </Button>
                  <Button className="btn-success btn-pill mx-1">
                    <span className="btn-wrapper--label">Create</span>
                  </Button>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card className="card-box p-4">
              <div className="text-center">
                <div className="avatar-icon-wrapper rounded-circle m-0">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-first text-first m-0 d-130">
                    <FontAwesomeIcon
                      icon={['far', 'keyboard']}
                      className="d-flex align-self-center display-3"
                    />
                  </div>
                </div>
                <h4 className="font-weight-bold mt-4">Are you sure?</h4>
                <p className="mb-0 text-black-50">
                  You can change your mind later.
                </p>
                <div className="pt-4">
                  <Button className="btn-neutral-secondary btn-pill text-danger mx-1">
                    <span className="btn-wrapper--label">No</span>
                  </Button>
                  <Button className="btn-first btn-pill mx-1">
                    <span className="btn-wrapper--label">Yes</span>
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
