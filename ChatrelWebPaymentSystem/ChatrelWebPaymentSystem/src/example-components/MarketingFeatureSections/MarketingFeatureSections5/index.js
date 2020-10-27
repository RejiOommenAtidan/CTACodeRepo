import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Card, Button } from '@material-ui/core';

import illustration1 from '../../../assets/images/illustrations/pack2/video_call.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="bg-white py-3 py-xl-5">
        <Container className="py-3 py-xl-5">
          <Grid container spacing={6}>
            <Grid
              item
              xl={8}
              className="d-flex align-items-center text-center text-xl-left">
              <div className="mb-5 pr-0 pr-xl-5 mb-xl-0">
                <div className="mb-4">
                  <div className="badge badge-pill badge-warning">
                    Latest release
                  </div>
                  <h1 className="display-3 mt-3 text-capitalize font-weight-bold">
                    bamburgh
                  </h1>
                  <div className="divider mx-auto mx-xl-0 my-4 bg-dark opacity-1 w-43" />
                  <p className="font-size-xl text-second opacity-6">
                    Premium admin template powered by the most popular UI
                    components framework available for React: Material-UI.
                    Features hundreds of examples making web development fast
                    and easy. Start from one of the individual apps included or
                    from the general dashboard and build beautiful scalable
                    applications and presentation websites.
                  </p>
                </div>
                <div>
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="btn-success d-flex d-sm-inline-flex">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['far', 'question-circle']} />
                    </span>
                    <span className="btn-wrapper--label">Read more</span>
                  </Button>
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="btn-link btn-link-first d-flex d-sm-inline-flex ml-0 mt-3 mt-sm-0 ml-sm-3"
                    title="View documentation">
                    <span>Documentation</span>
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xl={4} className="d-none d-xl-flex align-items-center">
              <Card className="shadow-xxl rounded-circle overflow-visible p-3 w-100">
                <img src={illustration1} className="img-fluid" alt="..." />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
