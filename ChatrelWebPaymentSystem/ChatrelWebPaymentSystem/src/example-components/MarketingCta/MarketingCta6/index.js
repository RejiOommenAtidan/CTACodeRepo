import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Card, Button } from '@material-ui/core';

import illustration1 from '../../../assets/images/illustrations/pack2/video_call.svg';
import illustration2 from '../../../assets/images/illustrations/pack3/question.svg';
export default function LivePreviewExample() {
  return (
    <>
      <Container>
        <Card className="card-box p-0 mb-spacing-6-x2">
          <Grid container spacing={0}>
            <Grid item lg={7} className="d-flex align-items-center">
              <div className="p-4 text-center text-lg-left p-lg-5">
                <div className="bg-primary btn-icon mx-auto mx-lg-0 text-white font-size-xl d-50 rounded-circle mb-4">
                  <FontAwesomeIcon icon={['far', 'bell']} />
                </div>
                <h4 className="display-4 font-weight-bold mb-3">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h4>
                <p className="opacity-7 mb-4 font-size-lg line-height-2">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button className="btn-primary text-uppercase font-weight-bold btn-pill px-4 font-size-sm">
                  <span className="btn-wrapper--label">View details</span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                  </span>
                </Button>
              </div>
            </Grid>
            <Grid item lg={5} className="d-flex align-items-center">
              <img alt="..." className="w-100 p-4 p-lg-0" src={illustration1} />
            </Grid>
          </Grid>
        </Card>
        <Card className="card-box p-0 mb-spacing-6-x2">
          <Grid container spacing={0}>
            <Grid item lg={5} className="d-flex align-items-center">
              <img alt="..." className="w-100 p-4 p-lg-0" src={illustration2} />
            </Grid>
            <Grid item lg={7} className="d-flex align-items-center">
              <div className="p-4 text-center text-lg-left p-lg-5">
                <div className="bg-warning btn-icon mx-auto mx-lg-0 text-white font-size-xl d-50 rounded mb-4">
                  <FontAwesomeIcon icon={['far', 'lightbulb']} />
                </div>
                <h4 className="display-4 font-weight-bold mb-3">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h4>
                <p className="text-warning mb-4 font-size-lg line-height-2">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button className="btn-warning text-uppercase font-weight-bold px-4 font-size-sm">
                  <span className="btn-wrapper--label">View details</span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                  </span>
                </Button>
              </div>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
