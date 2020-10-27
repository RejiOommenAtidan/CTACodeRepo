import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Card } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="mb-spacing-6-x2">
        <Container className="py-5">
          <Grid container spacing={0}>
            <Grid item lg={6}>
              <div className="feature-box py-3">
                <div className="font-size-xxl text-primary rounded-circle">
                  <FontAwesomeIcon icon={['fas', 'bomb']} />
                </div>
                <h3 className="font-size-lg font-weight-bold mt-2">Widgets</h3>
                <p className="text-black-50 mt-3">
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born.
                </p>
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className="feature-box py-3">
                <div className="font-size-xxl text-danger rounded-circle">
                  <FontAwesomeIcon icon={['fas', 'network-wired']} />
                </div>
                <h3 className="font-size-lg font-weight-bold mt-2">
                  Components
                </h3>
                <p className="text-black-50 mt-3">
                  The master-builder of human happiness. No one rejects,
                  dislikes, or avoids pleasure itself, because it is pleasure.
                </p>
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className="feature-box py-3">
                <div className="font-size-xxl text-success rounded-circle">
                  <FontAwesomeIcon icon={['fas', 'birthday-cake']} />
                </div>
                <h3 className="font-size-lg font-weight-bold mt-2">Blocks</h3>
                <p className="text-black-50 mt-3">
                  Who are so beguiled and demoralized by the charms of pleasure
                  of the moment, so blinded by desire, that they cannot foresee.
                </p>
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className="feature-box py-3">
                <div className="font-size-xxl text-warning rounded-circle">
                  <FontAwesomeIcon icon={['fas', 'bus-alt']} />
                </div>
                <h3 className="font-size-lg font-weight-bold mt-2">Pages</h3>
                <p className="text-black-50 mt-3">
                  Which toil and pain can procure him some great pleasure. To
                  take a trivial example, which of us avoids pleasure.
                </p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </>
  );
}
