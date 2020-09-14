import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={4}>
            <Card className="card-box card-box-alt">
              <div className="card-content-overlay text-left">
                <div className="px-4">
                  <div className="d-50 rounded-lg border-0 mb-1 card-icon-wrapper bg-danger text-white btn-icon text-center shadow-danger">
                    <FontAwesomeIcon
                      icon={['far', 'user']}
                      className="display-4"
                    />
                  </div>
                  <div className="font-weight-bold text-black display-4 mt-4 mb-3">
                    Bamburgh React Admin Dashboard with Material-UI PRO
                  </div>
                  <div className="font-size-lg text-dark opacity-8">
                    View any of the 5+ live previews we&#39;ve set up to learn
                    why this dashboard template is the last one you&#39;ll ever
                    need!
                  </div>
                </div>
                <div className="divider mt-4" />
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="px-4 py-3 btn-transition-none text-danger btn btn-white shadow-none d-flex justify-content-between align-items-center">
                  <div>Manage my account</div>
                  <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                </a>
              </div>
            </Card>
          </Grid>
          <Grid item xl={4}>
            <Card className="card-box card-box-alt">
              <div className="card-content-overlay text-left">
                <div className="px-4">
                  <div className="d-50 rounded-lg border-0 mb-1 card-icon-wrapper bg-info text-white btn-icon text-center shadow-info">
                    <FontAwesomeIcon
                      icon={['far', 'keyboard']}
                      className="display-4"
                    />
                  </div>
                  <div className="font-weight-bold text-black display-4 mt-4 mb-3">
                    Bamburgh React Admin Dashboard with Material-UI PRO
                  </div>
                  <div className="font-size-lg text-dark opacity-8">
                    View any of the 5+ live previews we&#39;ve set up to learn
                    why this dashboard template is the last one you&#39;ll ever
                    need!
                  </div>
                </div>
                <div className="divider mt-4" />
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="px-4 py-3 btn-transition-none text-info btn btn-white shadow-none d-flex justify-content-between align-items-center">
                  <div>Create sales reports</div>
                  <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                </a>
              </div>
            </Card>
          </Grid>
          <Grid item xl={4}>
            <Card className="card-box bg-deep-blue card-box-alt">
              <div className="card-content-overlay text-left">
                <div className="px-4">
                  <div className="d-50 rounded-lg border-0 mb-1 card-icon-wrapper bg-serious-blue text-white btn-icon text-center shadow-sm-dark">
                    <FontAwesomeIcon
                      icon={['far', 'object-group']}
                      className="display-4"
                    />
                  </div>
                  <div className="font-weight-bold text-second display-4 mt-4 mb-3">
                    Bamburgh React Admin Dashboard with Material-UI PRO
                  </div>
                  <div className="font-size-lg text-second opacity-8">
                    View any of the 5+ live previews we&#39;ve set up to learn
                    why this dashboard template is the last one you&#39;ll ever
                    need!
                  </div>
                </div>
                <div className="divider bg-white opacity-3 mt-4" />
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="px-4 py-3 btn-transition-none text-white btn btn-white shadow-none d-flex justify-content-between align-items-center">
                  <div>View all profiles</div>
                  <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                </a>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
