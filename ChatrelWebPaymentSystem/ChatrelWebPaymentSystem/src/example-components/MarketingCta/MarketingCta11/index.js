import React from 'react';

import { Grid, Container, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="py-5 bg-white rounded shadow-xxl shape-container-top-1">
        <Container className="py-0 py-lg-5 text-center">
          <div>
            <div className="badge bg-neutral-primary mb-5 text-primary h-auto py-2 px-3 font-size-xs badge-pill font-weight-normal">
              Marketing Plans
            </div>
            <h4 className="font-weight-bold text-second display-3">
              Try our services
            </h4>
            <Grid item md={8} lg={6} className="mx-auto">
              <p className="text-second opacity-6 mt-3 mb-5 font-size-xxl">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>
            </Grid>
          </div>
          <Button className="btn-primary px-5 font-size-sm font-weight-bold text-uppercase shadow-none py-3 hover-scale-sm hover-scale-lg mx-2">
            Get Started
          </Button>
        </Container>
      </div>
    </>
  );
}
