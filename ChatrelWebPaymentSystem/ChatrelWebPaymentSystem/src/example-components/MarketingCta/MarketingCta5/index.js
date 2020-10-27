import React from 'react';

import { Grid, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6-x2">
        <Grid container spacing={6}>
          <Grid item xl={4}>
            <Card className="card-box-alt card-border-top border-success p-4 hover-scale-sm">
              <h3 className="font-size-lg font-weight-bold px-3 px-xl-4 m-0">
                Bamburgh React Admin Dashboard with Material-UI PRO
              </h3>
              <p className="card-text px-3 px-xl-4 my-4">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>
              <Button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="btn-link btn-link-first mb-2 p-0"
                title="Find out more">
                <span>Find out more</span>
              </Button>
            </Card>
          </Grid>
          <Grid item xl={4}>
            <Card className="card-box-alt card-border-top border-warning p-4 hover-scale-sm">
              <h3 className="font-size-lg font-weight-bold px-3 px-xl-4 m-0">
                Bamburgh React Admin Dashboard with Material-UI PRO
              </h3>
              <p className="card-text px-3 px-xl-4 my-4">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>
              <Button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="btn-link btn-link-first mb-2 p-0"
                title="Find out more">
                <span>Find out more</span>
              </Button>
            </Card>
          </Grid>
          <Grid item xl={4}>
            <Card className="card-box-alt card-border-top border-first p-4 hover-scale-sm">
              <h3 className="font-size-lg font-weight-bold px-3 px-xl-4 m-0">
                Bamburgh React Admin Dashboard with Material-UI PRO
              </h3>
              <p className="card-text px-3 px-xl-4 my-4">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>
              <Button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="btn-link btn-link-first mb-2 p-0"
                title="Find out more">
                <span>Find out more</span>
              </Button>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
