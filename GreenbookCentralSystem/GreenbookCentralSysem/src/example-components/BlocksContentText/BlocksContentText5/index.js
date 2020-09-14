import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import stock2 from '../../../assets/images/stock-photos/stock-6.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box card-box-hover-rise mb-spacing-6-x2">
        <Grid container spacing={0}>
          <Grid item lg={6}>
            <div className="p-5">
              <a href="#/" onClick={(e) => e.preventDefault()}>
                <h1 className="display-3 mt-3 mb-4 font-weight-bold">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h1>
              </a>
              <p className="font-size-xxl text-black-50">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>
              <p className="mb-5 font-size-lg">
                Premium admin template powered by the most popular UI components
                framework available for React: Material-UI. Features hundreds of
                examples making web development fast and easy. Start from one of
                the individual apps included or from the general dashboard and
                build beautiful scalable applications and presentation websites.
              </p>
              <Button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="btn-pill hover-scale-lg btn-primary">
                <span className="btn-wrapper--label">Continue reading</span>
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                </span>
              </Button>
            </div>
          </Grid>
          <Grid item lg={6}>
            <img
              alt="..."
              className="rounded br-lg-left-0 img-fit-container"
              src={stock2}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
