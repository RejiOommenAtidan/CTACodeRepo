import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, CardContent, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={4}>
            <Card className="shadow-xxl card-box-hover-rise p-2">
              <CardContent>
                <div className="bg-deep-blue text-center text-white font-size-xl d-60 rounded-circle btn-icon">
                  <FontAwesomeIcon icon={['far', 'envelope']} />
                </div>
                <h3 className="heading-6 mt-4 mb-3 font-weight-bold">
                  Lightweight
                </h3>
                <p className="card-text mb-3">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="btn-link btn-link-primary pl-0 pr-0"
                  title="Learn more">
                  <span>Learn more</span>
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={4}>
            <Card className="shadow-xxl card-box-hover-rise p-2">
              <CardContent>
                <div className="bg-sunny-morning text-center text-white font-size-xl d-60 rounded-circle btn-icon">
                  <FontAwesomeIcon icon={['far', 'keyboard']} />
                </div>
                <h3 className="heading-6 mt-4 mb-3 font-weight-bold">
                  Simple to use
                </h3>
                <p className="card-text mb-3">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="btn-link btn-link-primary pl-0 pr-0"
                  title="Learn more">
                  <span>Learn more</span>
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={4}>
            <Card className="shadow-xxl card-box-hover-rise p-2">
              <CardContent>
                <div className="bg-grow-early text-center text-white font-size-xl d-60 rounded-circle btn-icon">
                  <FontAwesomeIcon icon={['far', 'address-card']} />
                </div>
                <h3 className="heading-6 mt-4 mb-3 font-weight-bold">
                  Starter templates
                </h3>
                <p className="card-text mb-3">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="btn-link btn-link-primary pl-0 pr-0"
                  title="Learn more">
                  <span>Learn more</span>
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
