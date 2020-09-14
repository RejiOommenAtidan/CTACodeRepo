import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

import stock3 from '../../../assets/images/stock-photos/stock-6.jpg';

import avatar3 from '../../../assets/images/avatars/avatar6.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={6}>
          <Card className="shadow-sm rounded-lg overflow-hidden">
            <div className="card-img-wrapper rounded">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="p-4 p-lg-5 img-wrapper-overlay img-wrapper-overlay--visible shadow-none rounded">
                <div className="overlay-btn-wrapper d-block p-3 p-lg-5 text-left text-white">
                  <h5 className="font-weight-bold display-3 mb-3">
                    Bamburgh React Admin Dashboard with Material-UI PRO
                  </h5>
                  <p className="font-size-lg mb-3">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                  <p className="font-size-md text-white-50">
                    Premium admin template powered by the most popular UI
                    components framework available for React: Material-UI.
                    Features hundreds of examples making web development fast
                    and easy. Start from one of the individual apps included or
                    from the general dashboard and build beautiful scalable
                    applications and presentation websites.
                  </p>
                  <p className="font-size-md text-white-50">
                    View any of the 5+ live previews we&#39;ve set up to learn
                    why this dashboard template is the last one you&#39;ll ever
                    need!
                  </p>

                  <div className="divider bg-white opacity-1 my-4" />
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper mr-3">
                        <div className="avatar-icon shadow-sm-dark">
                          <img alt="..." src={avatar3} />
                        </div>
                      </div>
                      <div className="font-size-lg">Shanelle Wynn</div>
                    </div>
                    <div className="d-flex align-items-center text-white-50">
                      <FontAwesomeIcon
                        icon={['far', 'clock']}
                        className="mr-2"
                      />
                      <small>5 days ago</small>
                    </div>
                  </div>
                </div>
                <div className="card-badges card-badges-top">
                  <div className="badge badge-pill badge-success">
                    Marketing
                  </div>
                </div>
              </a>
              <img
                src={stock3}
                className="card-overlay-image img-fit-container rounded"
                alt="..."
              />
            </div>
          </Card>
        </Grid>
        <Grid item xl={6}>
          <Card className="shadow-sm rounded-lg overflow-hidden">
            <div className="card-img-wrapper rounded">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="img-wrapper-overlay img-wrapper-overlay--visible shadow-none rounded">
                <div className="overlay-btn-wrapper p-4 p-lg-5 text-left text-white">
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon-wrapper mr-3">
                      <div className="avatar-icon shadow-sm-dark">
                        <img alt="..." src={avatar3} />
                      </div>
                    </div>
                    <div>
                      <div>Shanelle Wynn</div>
                      <span className="text-white-50">
                        UI Engineer, Apple Inc.
                      </span>
                    </div>
                  </div>

                  <div className="divider bg-white opacity-2 my-3 my-lg-5" />

                  <h5 className="font-weight-bold display-3">
                    Bamburgh React Admin Dashboard with Material-UI PRO
                  </h5>
                  <p className="font-size-lg my-3 text-white-50">
                    View any of the 5+ live previews we&#39;ve set up to learn
                    why this dashboard template is the last one you&#39;ll ever
                    need!
                  </p>
                  <p className="text-light">
                    Premium admin template powered by the most popular UI
                    components framework available for React: Material-UI.
                    Features hundreds of examples making web development fast
                    and easy. Start from one of the individual apps included or
                    from the general dashboard and build beautiful scalable
                    applications and presentation websites.
                  </p>

                  <div className="divider bg-white opacity-2 my-3 my-lg-5" />

                  <div className="d-flex align-items-center text-white-50">
                    <FontAwesomeIcon icon={['far', 'clock']} className="mr-2" />
                    <small>added 3 days ago</small>
                  </div>
                </div>
                <div className="card-badges card-badges-bottom">
                  <div className="badge badge-first">Articles</div>
                </div>
              </a>
              <img
                src={stock3}
                className="card-overlay-image img-fit-container rounded"
                alt="..."
              />
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
