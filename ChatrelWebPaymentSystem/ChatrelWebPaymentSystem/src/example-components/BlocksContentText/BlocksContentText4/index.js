import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import stock1 from '../../../assets/images/stock-photos/stock-7.jpg';
import svgImage1 from '../../../assets/images/illustrations/pack1/wireframe.svg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <Grid container spacing={0}>
          <Grid item lg={5}>
            <img
              alt="..."
              className="rounded br-lg-right-0 img-fit-container"
              src={stock1}
            />
          </Grid>
          <Grid item lg={7}>
            <div className="pb-2">
              <img
                alt="..."
                className="w-50 d-block img-fluid"
                src={svgImage1}
              />
            </div>
            <div className="px-5 pb-5">
              <a href="#/" onClick={(e) => e.preventDefault()}>
                <h3 className="display-3 my-3 font-weight-bold">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h3>
              </a>
              <p className="font-size-xxl text-black-50">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>
              <p className="mb-4 font-size-lg text-black">
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
        </Grid>
      </Card>
    </>
  );
}
