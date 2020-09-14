import React from 'react';

import { Grid, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item md={6}>
            <Card className="card-box bg-neutral-success p-3 p-xl-4">
              <div className="bg-composed-wrapper--content d-block text-center text-xl-left d-xl-flex justify-content-between align-items-center">
                <p className="opacity-9 font=size-xl mr-0 mr-xl-3 mb-4 mb-xl-0">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button className="btn-success text-nowrap px-4 text-uppercase font-size-sm font-weight-bold">
                  Orders
                </Button>
              </div>
            </Card>
          </Grid>
          <Grid item md={6}>
            <Card className="card-box bg-neutral-warning p-3 p-xl-4">
              <div className="bg-composed-wrapper--content d-block text-center text-xl-left d-xl-flex justify-content-between align-items-center">
                <p className="opacity-9 font=size-xl mr-0 mr-xl-3 mb-4 mb-xl-0">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button className="btn-warning text-nowrap px-4 text-uppercase font-size-sm font-weight-bold">
                  Contact
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
