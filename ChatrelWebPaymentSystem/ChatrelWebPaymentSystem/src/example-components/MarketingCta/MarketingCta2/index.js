import React from 'react';

import { Grid, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item md={6}>
            <Card className="card-box bg-composed-wrapper bg-slick-carbon p-3 p-xl-4 text-white">
              <div className="bg-composed-img-1 bg-composed-wrapper--image" />
              <div className="bg-composed-wrapper--content d-block text-center text-xl-left d-xl-flex justify-content-between align-items-center">
                <p className="opacity-9 font=size-xl mr-0 mr-xl-3 mb-4 mb-xl-0">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button className="btn-info text-nowrap px-4 text-uppercase font-size-xs font-weight-bold shadow-sm-dark">
                  Issues
                </Button>
              </div>
            </Card>
          </Grid>
          <Grid item md={6}>
            <Card className="card-box bg-composed-wrapper bg-vicious-stance p-3 p-xl-4 text-white">
              <div className="bg-composed-img-2 bg-composed-wrapper--image" />
              <div className="bg-composed-wrapper--content d-block text-center text-xl-left d-xl-flex justify-content-between align-items-center">
                <p className="opacity-9 font=size-xl mr-0 mr-xl-3 mb-4 mb-xl-0">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button className="btn-danger text-nowrap px-4 text-uppercase font-size-xs font-weight-bold shadow-sm-dark">
                  Tasks
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
