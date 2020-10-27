import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, CardContent } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6-x2">
        <Grid container spacing={6}>
          <Grid item md={6} xl={3}>
            <Card className="card-box">
              <div className="card-indicator bg-first" />
              <CardContent className="px-4 py-3">
                <div className="pb-3 d-flex justify-content-between">
                  <a href="#/" onClick={(e) => e.preventDefault()}>
                    Presentation site UX
                  </a>
                </div>
                <div className="d-flex align-items-center justify-content-start">
                  <div className="badge badge-first px-3">On hold</div>
                  <div className="font-size-sm text-danger px-2">
                    <FontAwesomeIcon icon={['far', 'clock']} className="mr-1" />
                    14:22
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="card-box">
              <div className="card-indicator bg-info" />
              <CardContent className="px-4 py-3">
                <div className="pb-3 d-flex justify-content-between">
                  <a href="#/" onClick={(e) => e.preventDefault()}>
                    Implement in Vuejs
                  </a>
                </div>
                <div className="d-flex align-items-center justify-content-start">
                  <div className="badge badge-info px-3">Processed</div>
                  <div className="font-size-sm text-dark px-2">
                    <FontAwesomeIcon icon={['far', 'clock']} className="mr-1" />
                    17:56
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="card-box">
              <div className="card-indicator bg-success" />
              <CardContent className="px-4 py-3">
                <div className="pb-3 d-flex justify-content-between">
                  <a href="#/" onClick={(e) => e.preventDefault()}>
                    Create UI mockups
                  </a>
                </div>
                <div className="d-flex align-items-center justify-content-start">
                  <div className="badge badge-success px-3">Fixed</div>
                  <div className="font-size-sm text-dark px-2">
                    <FontAwesomeIcon icon={['far', 'clock']} className="mr-1" />
                    09:41
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="card-box">
              <div className="card-indicator bg-warning" />
              <CardContent className="px-4 py-3">
                <div className="pb-3 d-flex justify-content-between">
                  <a href="#/" onClick={(e) => e.preventDefault()}>
                    UX research
                  </a>
                </div>
                <div className="d-flex align-items-center justify-content-start">
                  <div className="badge badge-warning px-3">Scheduled</div>
                  <div className="font-size-sm text-danger px-2">
                    <FontAwesomeIcon icon={['far', 'clock']} className="mr-1" />
                    11:35
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
