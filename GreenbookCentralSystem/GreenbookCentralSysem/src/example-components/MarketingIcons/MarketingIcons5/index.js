import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="mb-spacing-6-x2">
        <Container className="py-5">
          <Grid container spacing={6}>
            <Grid item md={6} xl={3}>
              <div className="feature-box text-center">
                <div className="text-center text-primary font-size-xxl rounded-circle">
                  <FontAwesomeIcon icon={['fas', 'bomb']} />
                </div>
                <h3 className="font-size-lg font-weight-bold my-3">Widgets</h3>
                <p className="text-black-50 mb-3">
                  But I must explain to you how all this mistaken.
                </p>
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="btn-link btn-link-primary pl-0 pr-0"
                  title="Learn more">
                  <span>Learn more</span>
                </Button>
              </div>
            </Grid>
            <Grid item md={6} xl={3}>
              <div className="feature-box text-center">
                <div className="text-center text-primary font-size-xxl rounded-circle">
                  <FontAwesomeIcon icon={['fas', 'network-wired']} />
                </div>
                <h3 className="font-size-lg font-weight-bold my-3">
                  Components
                </h3>
                <p className="text-black-50 mb-3">
                  So blinded by desire, that they cannot foresee.
                </p>
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="btn-link btn-link-primary pl-0 pr-0"
                  title="Learn more">
                  <span>Learn more</span>
                </Button>
              </div>
            </Grid>
            <Grid item md={6} xl={3}>
              <div className="feature-box text-center">
                <div className="text-center text-primary font-size-xxl rounded-circle">
                  <FontAwesomeIcon icon={['fas', 'birthday-cake']} />
                </div>
                <h3 className="font-size-lg font-weight-bold my-3">Blocks</h3>
                <p className="text-black-50 mb-3">
                  It takes a trivial example, which of us ever undertakes.
                </p>
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="btn-link btn-link-primary pl-0 pr-0"
                  title="Learn more">
                  <span>Learn more</span>
                </Button>
              </div>
            </Grid>
            <Grid item md={6} xl={3}>
              <div className="feature-box text-center">
                <div className="text-center text-primary font-size-xxl rounded-circle">
                  <FontAwesomeIcon icon={['fas', 'bus-alt']} />
                </div>
                <h3 className="font-size-lg font-weight-bold my-3">Pages</h3>
                <p className="text-black-50 mb-3">
                  Pleasure that has no annoying consequences of the moment.
                </p>
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="btn-link btn-link-primary pl-0 pr-0"
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
