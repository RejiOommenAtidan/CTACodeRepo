import React from 'react';

import { Grid, Container, Card, Button } from '@material-ui/core';

import svgImage1 from '../../../assets/images/illustrations/pack4/business_plan.svg';
import svgImage13 from '../../../assets/images/illustrations/pack4/businesswoman.svg';
import svgImage14 from '../../../assets/images/illustrations/pack4/powerful.svg';
export default function LivePreviewExample() {
  return (
    <>
      <Card className="mb-spacing-6-x2">
        <Container className="py-5">
          <Grid container spacing={6}>
            <Grid item lg={4}>
              <div className="feature-box text-center">
                <img
                  src={svgImage1}
                  style={{ height: 90 }}
                  className="mx-auto d-block img-fluid"
                  alt="..."
                />
                <h3 className="font-size-xl font-weight-bold my-3">Widgets</h3>
                <p className="text-black-50 mb-3">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="btn-first"
                  size="small"
                  title="Learn more">
                  <span>Learn more</span>
                </Button>
              </div>
            </Grid>
            <Grid item lg={4}>
              <div className="feature-box text-center">
                <img
                  src={svgImage13}
                  style={{ height: 90 }}
                  className="mx-auto d-block img-fluid"
                  alt="..."
                />
                <h3 className="font-size-xl font-weight-bold my-3">
                  Components
                </h3>
                <p className="text-black-50 mb-3">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="btn-first"
                  size="small"
                  title="Learn more">
                  <span>Learn more</span>
                </Button>
              </div>
            </Grid>
            <Grid item lg={4}>
              <div className="feature-box text-center">
                <img
                  src={svgImage14}
                  style={{ height: 90 }}
                  className="mx-auto d-block img-fluid"
                  alt="..."
                />
                <h3 className="font-size-xl font-weight-bold my-3">Blocks</h3>
                <p className="text-black-50 mb-3">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="btn-first"
                  size="small"
                  title="Learn more">
                  <span>Learn more</span>
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </>
  );
}
