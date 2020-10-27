import React from 'react';

import { Grid, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item lg={6}>
            <Card className="bg-neutral-first d-block card-border-top border-first text-center p-4 p-xl-5">
              <h4 className="px-3 px-xl-5 display-4 line-height-2 font-weight-bold mb-0">
                Bamburgh React Admin Dashboard with Material-UI PRO
              </h4>
              <p className="px-3 px-xl-5 opacity-6 font-size-lg my-4">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>
              <Button className="btn-first px-4 text-uppercase font-size-sm hover-scale-lg font-weight-bold">
                Browse Issues
              </Button>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Card className="bg-neutral-danger d-block card-border-top border-danger text-center p-4 p-xl-5">
              <h4 className="px-3 px-xl-5 display-4 line-height-2 font-weight-bold mb-0">
                Bamburgh React Admin Dashboard with Material-UI PRO
              </h4>
              <p className="px-3 px-xl-5 opacity-6 font-size-lg my-4">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>
              <Button className="btn-danger px-4 text-uppercase font-size-sm hover-scale-lg font-weight-bold">
                Get in Touch
              </Button>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
