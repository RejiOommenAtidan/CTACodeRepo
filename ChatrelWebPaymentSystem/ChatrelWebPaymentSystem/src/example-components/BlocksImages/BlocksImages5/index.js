import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import stock1 from '../../../assets/images/stock-photos/stock-1.jpg';
import stock2 from '../../../assets/images/stock-photos/stock-2.jpg';
import stock3 from '../../../assets/images/stock-photos/stock-3.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={4}>
            <Card className="shadow-xxl">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card-img-wrapper rounded">
                <div className="img-wrapper-overlay">
                  <div className="overlay-btn-wrapper">
                    <Button className="btn-facebook m-2 btn-icon hover-scale-lg btn-animated-icon d-50 p-0 border-0 rounded-lg">
                      <span className="btn-wrapper--icon d-flex">
                        <FontAwesomeIcon
                          icon={['fab', 'facebook']}
                          className="font-size-lg"
                        />
                      </span>
                    </Button>
                    <Button className="btn-twitter m-2 btn-icon hover-scale-lg btn-animated-icon d-50 p-0 border-0 rounded-lg">
                      <span className="btn-wrapper--icon d-flex">
                        <FontAwesomeIcon
                          icon={['fab', 'twitter']}
                          className="font-size-lg"
                        />
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="card-badges card-badges-bottom">
                  <div className="badge badge-pill badge-warning">Pending</div>
                </div>
                <img src={stock1} className="card-img-top rounded" alt="..." />
              </a>
            </Card>
          </Grid>
          <Grid item xl={4}>
            <Card className="shadow-xxl">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card-img-wrapper rounded">
                <div className="img-wrapper-overlay">
                  <div className="overlay-btn-wrapper">
                    <div className="avatar-icon-wrapper mx-auto mb-2">
                      <div className="avatar-icon">
                        <img alt="..." src={avatar5} />
                      </div>
                    </div>
                    <div className="font-size-lg font-weight-bold">
                      Darrel Devlin
                    </div>
                    <div className="text-white-50 pb-4">
                      Senior UX Developer, Apple Inc.
                    </div>
                    <Button
                      size="small"
                      className="btn-info btn-pill px-4 hover-scale-sm">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fas', 'download']} />
                      </span>
                      <span className="btn-wrapper--label">View Profile</span>
                    </Button>
                  </div>
                </div>
                <div className="card-badges">
                  <div className="badge badge-pill badge-neutral-info text-info">
                    Articles
                  </div>
                </div>
                <img src={stock2} className="card-img-top rounded" alt="..." />
              </a>
            </Card>
          </Grid>
          <Grid item xl={4}>
            <Card className="shadow-xxl">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card-img-wrapper rounded">
                <div className="img-wrapper-overlay">
                  <div className="overlay-btn-wrapper">
                    <Button
                      variant="text"
                      className="btn-outline-secondary shadow-sm-dark btn-pill d-inline-flex justify-content-center align-items-center border-2 p-0 d-40 m-1">
                      <FontAwesomeIcon icon={['far', 'comment-dots']} />
                    </Button>
                    <Button
                      variant="text"
                      className="btn-outline-secondary shadow-sm-dark btn-pill d-inline-flex justify-content-center align-items-center border-2 p-0 d-40 m-1">
                      <FontAwesomeIcon icon={['far', 'envelope']} />
                    </Button>
                  </div>
                </div>
                <div className="card-badges card-badges-bottom">
                  <div className="badge badge-danger">Overdue</div>
                </div>
                <img src={stock3} className="card-img-top rounded" alt="..." />
              </a>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
