import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={4}>
            <Card className="d-block px-4 py-5 rounded-sm bg-primary">
              <div className="d-block d-xl-flex">
                <div className="rounded-circle flex-shrink-0 btn-icon d-50 bg-white text-primary mb-4 mb-xl-0">
                  <FontAwesomeIcon
                    icon={['far', 'lightbulb']}
                    className="font-size-lg"
                  />
                </div>
                <div className="pl-0 pl-xl-4">
                  <div className="text-white font-weight-bold font-size-xxl mb-2 text-capitalize">
                    bamburgh
                  </div>
                  <p className="mb-0 text-white-50">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xl={4}>
            <Card className="d-block px-4 py-5 rounded-sm bg-second hover-scale-lg">
              <div className="d-block d-xl-flex">
                <div className="rounded-circle flex-shrink-0 btn-icon d-50 bg-white text-second mb-4 mb-xl-0">
                  <FontAwesomeIcon
                    icon={['far', 'heart']}
                    className="font-size-lg"
                  />
                </div>
                <div className="pl-0 pl-xl-4">
                  <div className="text-white font-weight-bold font-size-xxl mb-2 text-capitalize">
                    bamburgh
                  </div>
                  <p className="mb-0 text-white-50">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xl={4}>
            <Card className="d-block px-4 py-5 rounded-sm bg-primary">
              <div className="d-block d-xl-flex">
                <div className="rounded-circle flex-shrink-0 btn-icon d-50 bg-white text-primary mb-4 mb-xl-0">
                  <FontAwesomeIcon
                    icon={['far', 'user']}
                    className="font-size-lg"
                  />
                </div>
                <div className="pl-0 pl-xl-4">
                  <div className="text-white font-weight-bold font-size-xxl mb-2 text-capitalize">
                    bamburgh
                  </div>
                  <p className="mb-0 text-white-50">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
