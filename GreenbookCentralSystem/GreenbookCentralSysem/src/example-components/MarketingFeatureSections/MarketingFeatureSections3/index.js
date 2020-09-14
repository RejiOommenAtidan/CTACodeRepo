import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Card, Button } from '@material-ui/core';

import illustration1 from '../../../assets/images/illustrations/pack3/balloon.svg';
export default function LivePreviewExample() {
  return (
    <>
      <Container className="py-1 py-xl-3">
        <Card className="card-box p-0">
          <Grid container spacing={0}>
            <Grid item lg={7} className="d-flex align-items-center">
              <div className="p-4 text-center text-lg-left p-lg-5">
                <div className="mb-4">
                  <div className="badge badge-pill badge-warning">
                    Latest release
                  </div>
                  <h1 className="display-3 my-3 text-capitalize font-weight-bold">
                    bamburgh
                  </h1>
                  <p className="font-size-xl text-black opacity-7">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                  <p className="font-size-lg text-black-50">
                    Premium admin template powered by the most popular UI
                    components framework available for React: Material-UI.
                    Features hundreds of examples making web development fast
                    and easy. Start from one of the individual apps included or
                    from the general dashboard and build beautiful scalable
                    applications and presentation websites.
                  </p>
                </div>
                <div>
                  <Button size="large" className="btn-outline-primary">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['far', 'question-circle']} />
                    </span>
                    <span className="btn-wrapper--label">Read more</span>
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item lg={5} className="d-flex align-items-center">
              <img alt="..." className="w-100" src={illustration1} />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
