import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6-x2">
        <Grid container spacing={6}>
          <Grid item md={6} lg={4}>
            <Card className="rounded shadow-xxl">
              <div className="p-3 p-lg-4">
                <div className="bg-deep-blue text-white font-size-xl d-60 btn-icon card-icon-wrapper rounded-circle">
                  <FontAwesomeIcon icon={['far', 'envelope']} />
                </div>
                <h3 className="font-weight-bold display-5 mt-4 mb-3">
                  Lightweight
                </h3>
                <p className="card-text mb-4">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <div className="text-center">
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    fullWidth
                    className="btn-primary mt-1 text-uppercase font-size-sm rounded d-inline-block"
                    target="_blank"
                    title="Learn more">
                    <span>Learn more</span>
                  </Button>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item md={6} lg={4}>
            <Card className="rounded shadow-xxl">
              <div className="p-3 p-lg-4">
                <div className="bg-sunny-morning text-white font-size-xl d-60 btn-icon card-icon-wrapper rounded-circle">
                  <FontAwesomeIcon icon={['far', 'keyboard']} />
                </div>
                <h3 className="font-weight-bold display-5 mt-4 mb-3">
                  Simple to use
                </h3>
                <p className="card-text mb-4">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <div className="text-center">
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    fullWidth
                    className="btn-primary mt-1 text-uppercase font-size-sm rounded d-inline-block"
                    target="_blank"
                    title="Learn more">
                    <span>Learn more</span>
                  </Button>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item md={12} lg={4}>
            <Card className="rounded shadow-xxl">
              <div className="p-3 p-lg-4">
                <div className="bg-grow-early text-white font-size-xl d-60 btn-icon card-icon-wrapper rounded-circle">
                  <FontAwesomeIcon icon={['far', 'address-card']} />
                </div>
                <h3 className="font-weight-bold display-5 mt-4 mb-3">
                  Starter Templates
                </h3>
                <p className="card-text mb-4">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <div className="text-center">
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    fullWidth
                    className="btn-primary mt-1 text-uppercase font-size-sm rounded d-inline-block"
                    target="_blank"
                    title="Learn more">
                    <span>Learn more</span>
                  </Button>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
