import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="mb-spacing-6-x2 p-4">
        <Container>
          <Grid container spacing={0}>
            <Grid item lg={6}>
              <div className="feature-box my-5 text-center">
                <div className="bg-deep-blue text-white font-size-xl mx-auto d-50 rounded-circle">
                  <FontAwesomeIcon icon={['fas', 'bomb']} />
                </div>
                <h3 className="font-size-lg font-weight-bold mt-4">Widgets</h3>
                <p className="text-black-50 mt-2 px-2">
                  Premium admin template powered by the most popular UI
                  components framework available for React: Material-UI.
                  Features hundreds of examples making web development fast and
                  easy. Start from one of the individual apps included or from
                  the general dashboard and build beautiful scalable
                  applications and presentation websites.
                </p>
                <Button
                  size="small"
                  variant="text"
                  className="btn-outline-first mt-1">
                  <span className="btn-wrapper--label">Learn more</span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                  </span>
                </Button>
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className="feature-box my-5 text-center">
                <div className="bg-grow-early text-white font-size-xl mx-auto d-50 rounded-circle">
                  <FontAwesomeIcon icon={['fas', 'network-wired']} />
                </div>
                <h3 className="font-size-lg font-weight-bold mt-4">
                  Components
                </h3>
                <p className="text-black-50 mt-2 px-2">
                  Premium admin template powered by the most popular UI
                  components framework available for React: Material-UI.
                  Features hundreds of examples making web development fast and
                  easy. Start from one of the individual apps included or from
                  the general dashboard and build beautiful scalable
                  applications and presentation websites.
                </p>
                <Button
                  size="small"
                  variant="text"
                  className="btn-outline-first mt-1">
                  <span className="btn-wrapper--label">Learn more</span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                  </span>
                </Button>
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className="feature-box my-5 text-center">
                <div className="bg-strong-bliss text-white font-size-xl mx-auto d-50 rounded-circle">
                  <FontAwesomeIcon icon={['fas', 'birthday-cake']} />
                </div>
                <h3 className="font-size-lg font-weight-bold mt-4">Blocks</h3>
                <p className="text-black-50 mt-2 px-2">
                  Premium admin template powered by the most popular UI
                  components framework available for React: Material-UI.
                  Features hundreds of examples making web development fast and
                  easy. Start from one of the individual apps included or from
                  the general dashboard and build beautiful scalable
                  applications and presentation websites.
                </p>
                <Button
                  size="small"
                  variant="text"
                  className="btn-outline-first mt-1">
                  <span className="btn-wrapper--label">Learn more</span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                  </span>
                </Button>
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className="feature-box my-5 text-center">
                <div className="bg-plum-plate text-white font-size-xl mx-auto d-50 rounded-circle">
                  <FontAwesomeIcon icon={['fas', 'bus-alt']} />
                </div>
                <h3 className="font-size-lg font-weight-bold mt-4">Pages</h3>
                <p className="text-black-50 mt-2 px-2">
                  Premium admin template powered by the most popular UI
                  components framework available for React: Material-UI.
                  Features hundreds of examples making web development fast and
                  easy. Start from one of the individual apps included or from
                  the general dashboard and build beautiful scalable
                  applications and presentation websites.
                </p>
                <Button
                  size="small"
                  variant="text"
                  className="btn-outline-first mt-1">
                  <span className="btn-wrapper--label">Learn more</span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                  </span>
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </>
  );
}
