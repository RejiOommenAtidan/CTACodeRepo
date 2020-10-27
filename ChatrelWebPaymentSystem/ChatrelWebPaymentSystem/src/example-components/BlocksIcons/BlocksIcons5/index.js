import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={4}>
            <Card className="p-5">
              <div className="card-badges">
                <div className="badge badge-pill badge-danger shadow-none">
                  27
                </div>
              </div>
              <div className="bg-arielle-smile text-center text-white font-size-xl d-50 rounded btn-icon">
                <FontAwesomeIcon icon={['far', 'map']} />
              </div>
              <h3 className="font-size-lg font-weight-bold mt-4">
                Sales statistics
              </h3>
              <p className="text-black-50 mt-2">
                We've included only the most popular solutions included ...
              </p>
              <Button
                href="#/"
                onClick={(e) => e.preventDefault()}
                variant="text"
                className="btn-outline-first mt-1">
                <span className="btn-wrapper--label">View live preview</span>
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                </span>
              </Button>
            </Card>
          </Grid>
          <Grid item xl={4}>
            <Card className="p-5">
              <div className="card-badges">
                <div className="badge badge-pill badge-warning shadow-none mr-1">
                  Promo
                </div>
                <div className="badge badge-pill badge-info shadow-none">
                  Special
                </div>
              </div>
              <div className="bg-night-sky text-center text-white font-size-xl d-50 rounded btn-icon">
                <FontAwesomeIcon icon={['far', 'chart-bar']} />
              </div>
              <h3 className="font-size-lg font-weight-bold mt-4">
                Generated reports
              </h3>
              <p className="text-black-50 mt-2">
                Mosaic, the first graphical browser, is introduced to the ...
              </p>
              <Button
                href="#/"
                onClick={(e) => e.preventDefault()}
                variant="text"
                className="btn-outline-first mt-1">
                <span className="btn-wrapper--label">View live preview</span>
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                </span>
              </Button>
            </Card>
          </Grid>
          <Grid item xl={4}>
            <Card className="p-5">
              <div className="card-badges">
                <div className="badge badge-pill badge-neutral-danger shadow-none text-danger">
                  Overdue
                </div>
              </div>
              <div className="bg-vicious-stance text-center text-white font-size-xl d-50 rounded btn-icon">
                <FontAwesomeIcon icon={['far', 'object-group']} />
              </div>
              <h3 className="font-size-lg font-weight-bold mt-4">
                Pricing plans
              </h3>
              <p className="text-black-50 mt-2">
                Bill Clinton's presidential scandal makes it online for the ...
              </p>
              <Button
                href="#/"
                onClick={(e) => e.preventDefault()}
                variant="text"
                className="btn-outline-first mt-1">
                <span className="btn-wrapper--label">View live preview</span>
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                </span>
              </Button>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
