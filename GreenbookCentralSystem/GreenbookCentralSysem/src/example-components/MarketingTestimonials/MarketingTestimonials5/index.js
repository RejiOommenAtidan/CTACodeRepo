import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

import avatar4 from '../../../assets/images/avatars/avatar4.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6} className="align-items-center">
        <Grid item md={6}>
          <Card className="shadow-xxl p-3">
            <div className="pb-4">
              <div>
                <FontAwesomeIcon
                  icon={['fas', 'star']}
                  className="text-warning opacity-7 mr-1"
                />
                <FontAwesomeIcon
                  icon={['fas', 'star']}
                  className="text-warning opacity-7 mr-1"
                />
                <FontAwesomeIcon
                  icon={['fas', 'star']}
                  className="text-warning opacity-7 mr-1"
                />
                <FontAwesomeIcon
                  icon={['fas', 'star']}
                  className="text-warning opacity-7 mr-1"
                />
                <FontAwesomeIcon
                  icon={['fas', 'star']}
                  className="text-dark opacity-6 mr-1"
                />
              </div>
              <div className="font-size-xs text-black-50">2 years ago</div>
            </div>
            <div className="pb-4 text-black-50">
              <h6 className="mb-3 text-black font-weight-bold">
                This is just beautiful
              </h6>
              Premium admin template powered by the most popular UI components
              framework available for React: Material-UI. Features hundreds of
              examples making web development fast and easy. Start from one of
              the individual apps included or from the general dashboard and
              build beautiful scalable applications and presentation websites.
            </div>
            <div className="d-flex align-items-center">
              <div className="avatar-icon-wrapper d-40 mr-3">
                <div className="avatar-icon d-40 rounded-circle">
                  <img alt="..." src={avatar4} />
                </div>
                <div className="badge badge-success badge-circle">Online</div>
              </div>
              <div>
                <div className="font-weight-bold">Emma Taylor</div>
                <div className="text-black-50">UI Engineer, Apple Inc.</div>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card className="shadow-xxl p-3">
            <div className="pb-4">
              <div>
                <FontAwesomeIcon
                  icon={['fas', 'star']}
                  className="text-warning opacity-7 mr-1"
                />
                <FontAwesomeIcon
                  icon={['fas', 'star']}
                  className="text-warning opacity-7 mr-1"
                />
                <FontAwesomeIcon
                  icon={['fas', 'star']}
                  className="text-warning opacity-7 mr-1"
                />
                <FontAwesomeIcon
                  icon={['fas', 'star']}
                  className="text-warning opacity-7 mr-1"
                />
                <FontAwesomeIcon
                  icon={['fas', 'star']}
                  className="text-warning opacity-7 mr-1"
                />
              </div>
              <div className="font-size-xs text-black-50">3 months ago</div>
            </div>
            <div className="pb-4 text-black-50">
              <h6 className="mb-3 text-black font-weight-bold">
                Great product, amazing
              </h6>
              Premium admin template powered by the most popular UI components
              framework available for React: Material-UI. Features hundreds of
              examples making web development fast and easy. Start from one of
              the individual apps included or from the general dashboard and
              build beautiful scalable applications and presentation websites.
            </div>
            <div className="d-flex align-items-center">
              <div className="avatar-icon-wrapper avatar-initials d-40 mr-3">
                <div className="avatar-icon rounded-sm d-40 font-weight-normal text-white bg-second">
                  HA
                </div>
                <div className="badge badge-success badge-circle">Online</div>
              </div>
              <div>
                <div className="font-weight-bold">John Davidson</div>
                <div className="text-black-50">Project Manager, Google</div>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
