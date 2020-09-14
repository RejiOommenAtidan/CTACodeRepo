import React from 'react';

import { Grid, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item lg={6}>
            <Card className="card-box bg-composed-wrapper bg-plum-plate border-0 text-center p-4 p-xl-5 shadow-xxl">
              <div className="bg-composed-img-4 bg-composed-wrapper--image rounded" />
              <div className="bg-composed-wrapper--content text-light">
                <h4 className="display-4 font-weight-bold mb-0">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h4>
                <p className="opacity-6 font-size-lg my-4">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button className="btn-warning text-nowrap px-4 text-uppercase font-size-sm font-weight-bold">
                  Browse Issues
                </Button>
              </div>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Card className="card-box bg-composed-wrapper bg-midnight-bloom border-0 text-center p-4 p-xl-5 shadow-xxl">
              <div className="bg-composed-img-2 bg-composed-wrapper--image rounded" />
              <div className="bg-composed-wrapper--content text-light">
                <h4 className="display-4 font-weight-bold mb-0">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h4>
                <p className="opacity-6 font-size-lg my-4">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button className="btn-danger text-nowrap px-4 text-uppercase font-size-sm font-weight-bold">
                  Get in Touch
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
