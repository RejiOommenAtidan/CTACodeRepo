import React from 'react';

import { Grid, Container, Card } from '@material-ui/core';

import logo1 from '../../../assets/images/stock-logos/netflix.svg';
import logo2 from '../../../assets/images/stock-logos/airbnb.svg';
import logo3 from '../../../assets/images/stock-logos/instagram.svg';
import logo4 from '../../../assets/images/stock-logos/slack.svg';

import stock1 from '../../../assets/images/stock-photos/stock-1.jpg';
import stock2 from '../../../assets/images/stock-photos/stock-2.jpg';
import stock3 from '../../../assets/images/stock-photos/stock-3.jpg';
import stock4 from '../../../assets/images/stock-photos/stock-4.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="pt-5 mb-spacing-6-x2">
        <Container className="py-5">
          <Grid container spacing={6}>
            <Grid item md={6} xl={3}>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card bg-white shadow-xxl card-box-hover-rise mb-5">
                <img src={stock1} className="card-img-top" alt="..." />
                <div className="p-3 bg-secondary rounded-bottom p-xl-4">
                  <img src={logo1} alt="..." style={{ height: 25 }} />
                  <p className="text-second opacity-8 mt-4 mb-0">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                </div>
              </a>
            </Grid>
            <Grid item md={6} xl={3}>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card bg-white shadow-xxl card-box-hover-rise mb-5">
                <img src={stock2} className="card-img-top" alt="..." />
                <div className="p-3 bg-secondary rounded-bottom p-xl-4">
                  <img src={logo2} alt="..." style={{ height: 25 }} />
                  <p className="text-second opacity-8 mt-4 mb-0">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                </div>
              </a>
            </Grid>
            <Grid item md={6} xl={3}>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card bg-white shadow-xxl card-box-hover-rise mb-5">
                <img src={stock3} className="card-img-top" alt="..." />
                <div className="p-3 bg-secondary rounded-bottom p-xl-4">
                  <img src={logo3} alt="..." style={{ height: 25 }} />
                  <p className="text-second opacity-8 mt-4 mb-0">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                </div>
              </a>
            </Grid>
            <Grid item md={6} xl={3}>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card bg-white shadow-xxl card-box-hover-rise mb-5">
                <img src={stock4} className="card-img-top" alt="..." />
                <div className="p-3 bg-secondary rounded-bottom p-xl-4">
                  <img src={logo4} alt="..." style={{ height: 25 }} />
                  <p className="text-second opacity-8 mt-4 mb-0">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                </div>
              </a>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </>
  );
}
