import React from 'react';

import { Grid, Card } from '@material-ui/core';

import stock1 from '../../../assets/images/stock-photos/stock-4.jpg';
import stock2 from '../../../assets/images/stock-photos/stock-5.jpg';

import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item lg={6}>
            <Card className="shadow-sm rounded-lg overflow-hidden">
              <div className="card-img-wrapper rounded">
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="img-wrapper-overlay p-4 p-xl-5 img-wrapper-overlay--visible rounded">
                  <div className="overlay-btn-wrapper card-body text-white text-center">
                    <h5 className="px-2 font-weight-bold display-4 mb-4">
                      Bamburgh React Admin Dashboard with Material-UI PRO
                    </h5>
                    <p className="font-size-lg text-white-50 mb-0">
                      Premium admin template powered by the most popular UI
                      components framework available for React: Material-UI.
                      Features hundreds of examples making web development fast
                      and easy. Start from one of the individual apps included
                      or from the general dashboard and build beautiful scalable
                      applications and presentation websites.
                    </p>
                    <div className="mt-4">
                      <div className="avatar-icon-wrapper mx-auto mb-2">
                        <div className="avatar-icon shadow-sm-dark">
                          <img alt="..." src={avatar6} />
                        </div>
                      </div>
                      <div>Dalia Finney</div>
                    </div>
                  </div>
                  <div className="card-badges card-badges-top">
                    <div className="badge badge-pill badge-danger">
                      Development
                    </div>
                  </div>
                </a>
                <img
                  src={stock1}
                  className="card-overlay-image img-fit-container rounded"
                  alt="..."
                />
              </div>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Card className="shadow-sm rounded-lg overflow-hidden hover-scale-sm">
              <div className="card-img-wrapper rounded">
                <div className="img-wrapper-overlay align-items-end img-wrapper-overlay--visible p-4 p-xl-5">
                  <div className="overlay-btn-wrapper p-4 card-body text-white">
                    <h5 className="px-2 font-weight-bold display-4 mb-4">
                      Bamburgh React Admin Dashboard with Material-UI PRO
                    </h5>
                    <p className="font-size-lg mb-0 text-white-50">
                      Premium admin template powered by the most popular UI
                      components framework available for React: Material-UI.
                      Features hundreds of examples making web development fast
                      and easy. Start from one of the individual apps included
                      or from the general dashboard and build beautiful scalable
                      applications and presentation websites.
                    </p>
                    <div className="mt-4">
                      <div className="avatar-icon-wrapper mx-auto mb-2">
                        <div className="avatar-icon shadow-sm-dark">
                          <img alt="..." src={avatar7} />
                        </div>
                      </div>
                      <div>Miranda Lawson</div>
                    </div>
                  </div>
                </div>
                <div className="card-badges">
                  <div className="badge badge-pill badge-neutral-success text-success">
                    Marketing
                  </div>
                </div>
                <img
                  src={stock2}
                  className="card-overlay-image img-fit-container rounded"
                  alt="..."
                />
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
