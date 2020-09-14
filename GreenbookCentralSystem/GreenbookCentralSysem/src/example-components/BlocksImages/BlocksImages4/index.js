import React from 'react';

import { Grid, Card, CardContent, Button } from '@material-ui/core';

import stock1 from '../../../assets/images/stock-photos/stock-1.jpg';
import stock2 from '../../../assets/images/stock-photos/stock-2.jpg';
export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item lg={6}>
          <Card>
            <img alt="..." className="card-img-top" src={stock1} />
            <CardContent>
              <h5 className="card-title font-weight-bold font-size-xxl">
                Bamburgh React Admin Dashboard with Material-UI PRO
              </h5>
              <p className="card-text">
                Premium admin template powered by the most popular UI components
                framework available for React: Material-UI. Features hundreds of
                examples making web development fast and easy. Start from one of
                the individual apps included or from the general dashboard and
                build beautiful scalable applications and presentation websites.
              </p>
              <Button color="primary" variant="contained">
                Learn more
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6}>
          <Card>
            <img alt="..." className="card-img-top" src={stock2} />
            <CardContent>
              <h5 className="card-title font-weight-bold font-size-xxl">
                Bamburgh React Admin Dashboard with Material-UI PRO
              </h5>
              <p className="card-text">
                Premium admin template powered by the most popular UI components
                framework available for React: Material-UI. Features hundreds of
                examples making web development fast and easy. Start from one of
                the individual apps included or from the general dashboard and
                build beautiful scalable applications and presentation websites.
              </p>
              <Button color="primary" variant="contained">
                Learn more
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
