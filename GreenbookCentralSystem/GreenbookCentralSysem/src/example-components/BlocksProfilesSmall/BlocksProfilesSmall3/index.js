import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, CardContent, Button, Tooltip } from '@material-ui/core';

import avatar4 from '../../../assets/images/avatars/avatar7.jpg';
import avatar5 from '../../../assets/images/avatars/avatar6.jpg';

import stock6 from '../../../assets/images/stock-photos/stock-6.jpg';
import stock7 from '../../../assets/images/stock-photos/stock-7.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item lg={6} className="d-flex">
            <Card className="card-box w-100 card-box-hover-rise">
              <div className="card-img-wrapper h-240px">
                <div className="card-badges card-badges-bottom">
                  <div className="badge badge-pill badge-warning">
                    New Profile
                  </div>
                </div>
                <img
                  alt="..."
                  className="card-img-top img-fit-container"
                  src={stock6}
                />
              </div>
              <CardContent className="text-center card-body-avatar">
                <div className="avatar-icon-wrapper border-white overflow-hidden rounded border-3">
                  <div className="avatar-icon rounded-0">
                    <img alt="..." src={avatar4} />
                  </div>
                </div>
                <h3 className="font-weight-bold font-size-xl mt-2 mb-3">
                  Zara Wagstaff
                </h3>
                <p className="font-size-lg text-black-50 mb-0 px-4">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <div className="pt-4 pb-2">
                  <Tooltip title="Facebook" arrow>
                    <Button className="btn-facebook btn-icon btn-animated-icon-sm d-50 hover-scale-lg rounded-circle p-0 border-0 m-1">
                      <span className="btn-wrapper--icon d-flex">
                        <FontAwesomeIcon
                          icon={['fab', 'facebook']}
                          className="font-size-lg"
                        />
                      </span>
                    </Button>
                  </Tooltip>
                  <Tooltip title="Dribbble">
                    <Button className="btn-dribbble btn-icon btn-animated-icon-sm d-50 hover-scale-lg rounded-circle p-0 border-0 m-1">
                      <span className="btn-wrapper--icon d-flex">
                        <FontAwesomeIcon
                          icon={['fab', 'dribbble']}
                          className="font-size-lg"
                        />
                      </span>
                    </Button>
                  </Tooltip>
                  <Tooltip title="Twitter" arrow>
                    <Button className="btn-twitter btn-icon btn-animated-icon-sm d-50 hover-scale-lg rounded-circle p-0 border-0 m-1">
                      <span className="btn-wrapper--icon d-flex">
                        <FontAwesomeIcon
                          icon={['fab', 'twitter']}
                          className="font-size-lg"
                        />
                      </span>
                    </Button>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={6} className="d-flex">
            <Card className="card-box w-100 p-3">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card-img-wrapper h-240px card-box-hover-rise-alt-lg rounded">
                <div className="img-wrapper-overlay">
                  <div className="overlay-btn-wrapper">
                    <Button className="btn-facebook btn-icon btn-animated-icon-sm d-50 p-0 border-0 m-2">
                      <span className="btn-wrapper--icon d-flex">
                        <FontAwesomeIcon icon={['fab', 'facebook']} />
                      </span>
                    </Button>
                    <Button className="btn-twitter btn-icon btn-animated-icon-sm d-50 p-0 border-0 m-2">
                      <span className="btn-wrapper--icon d-flex">
                        <FontAwesomeIcon icon={['fab', 'twitter']} />
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="card-badges card-badges-top">
                  <div className="badge badge-pill badge-success">Updated</div>
                </div>
                <img
                  src={stock7}
                  className="card-img-top img-fit-container rounded"
                  alt="..."
                />
              </a>
              <CardContent className="text-center card-body-avatar">
                <div className="avatar-icon-wrapper rounded-circle border-white overflow-hidden border-3">
                  <div className="avatar-icon rounded-circle">
                    <img alt="..." src={avatar5} />
                  </div>
                </div>
                <h3 className="font-weight-bold font-size-xl mt-2 mb-3">
                  Emma Taylor
                </h3>
                <p className="font-size-lg text-black-50 mb-0 px-4">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <div className="pt-4 pb-2">
                  <Button className="btn-primary d-50 px-4 line-height-1 py-0 w-auto hover-scale-lg btn-pill">
                    View complete profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
