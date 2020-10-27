import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, CardContent, Button, Tooltip } from '@material-ui/core';

import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar1 from '../../../assets/images/avatars/avatar1.jpg';

import stock3 from '../../../assets/images/stock-photos/stock-3.jpg';
import stock5 from '../../../assets/images/stock-photos/stock-5.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item lg={6}>
          <Card>
            <div className="card-img-wrapper h-180px">
              <div className="card-badges card-badges-bottom">
                <div className="badge badge-danger">offline</div>
              </div>
              <img
                alt="..."
                className="card-img-top img-fit-container"
                src={stock5}
              />
            </div>
            <CardContent className="text-center card-body-avatar">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="avatar-icon-wrapper card-box-hover rounded-circle card-box-hover-rise hover-scale-lg d-130">
                <div className="avatar-icon rounded-circle">
                  <img alt="..." className="img-fluid" src={avatar6} />
                </div>
              </a>
              <h3 className="font-weight-bold mt-4 mb-3">Brianne Frost</h3>
              <p className="card-text mb-3">
                Premium admin template powered by the most popular UI components
                framework available for React: Material-UI. Features hundreds of
                examples making web development fast and easy. Start from one of
                the individual apps included or from the general dashboard and
                build beautiful scalable applications and presentation websites.
              </p>
              <div className="py-3">
                <Tooltip title="Github">
                  <Button className="btn-github btn-pill d-60 p-0">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'github']}
                        className="font-size-xl"
                      />
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip title="Instagram" arrow>
                  <Button className="btn-instagram btn-pill d-60 p-0 mx-2">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'instagram']}
                        className="font-size-xl"
                      />
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip title="Google" arrow>
                  <Button className="btn-google btn-pill d-60 p-0">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'google']}
                        className="font-size-xl"
                      />
                    </span>
                  </Button>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6}>
          <Card>
            <div className="card-img-wrapper h-180px">
              <div className="card-badges card-badges-top">
                <div className="badge badge-warning">Online</div>
              </div>
              <img
                alt="..."
                className="card-img-top img-fit-container"
                src={stock3}
              />
            </div>
            <CardContent className="text-center card-body-avatar">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="avatar-icon-wrapper shadow-lg rounded-circle card-box-hover-rise d-130">
                <div className="avatar-icon rounded-circle">
                  <img alt="..." className="img-fluid" src={avatar1} />
                </div>
              </a>
              <h3 className="font-weight-bold mt-4 mb-3">Lizzie Guerra</h3>
              <p className="card-text mb-3">
                Premium admin template powered by the most popular UI components
                framework available for React: Material-UI. Features hundreds of
                examples making web development fast and easy. Start from one of
                the individual apps included or from the general dashboard and
                build beautiful scalable applications and presentation websites.
              </p>
              <div className="py-3">
                <Tooltip title="Github">
                  <Button className="btn-github text-github btn-pill bg-white border-2 d-60 p-0">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'github']}
                        className="font-size-xl"
                      />
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip title="Instagram" arrow>
                  <Button className="btn-instagram text-instagram btn-pill bg-white border-2 d-60 p-0 mx-2">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'instagram']}
                        className="font-size-xl"
                      />
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip title="Google" arrow>
                  <Button className="btn-google text-google btn-pill bg-white border-2 d-60 p-0">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'google']}
                        className="font-size-xl"
                      />
                    </span>
                  </Button>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
