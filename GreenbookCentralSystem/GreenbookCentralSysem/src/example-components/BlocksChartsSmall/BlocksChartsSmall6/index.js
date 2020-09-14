import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';

import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

import logo1 from '../../../assets/images/stock-logos/spotify-icon.svg';
import logo2 from '../../../assets/images/stock-logos/pinterest-icon.svg';
import logo3 from '../../../assets/images/stock-logos/slack-icon.svg';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={4} lg={12} xl={4}>
          <Card className="card-box card-box-hover">
            <div className="card-tr-actions">
              <Button
                className="p-0 d-40 btn-transition-none border-0 btn-pill btn-animated-icon-sm btn-outline-first"
                variant="outlined">
                <span className="btn-wrapper--icon d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={['far', 'heart']} />
                </span>
              </Button>
            </div>
            <div className="text-center py-3">
              <div className="d-70 rounded-lg border-0 my-3 shadow-xxl btn-icon p-2 bg-white card-icon-wrapper mx-auto">
                <img
                  className="img-fit-container d-40 rounded-lg"
                  alt="..."
                  src={logo1}
                />
              </div>
              <div className="font-size-xl font-weight-bold pt-2 text-black">
                Development
              </div>
              <div className="opacity-5 pb-3">Build React Interface</div>
              <div className="d-flex justify-content-center">
                <div className="avatar-wrapper-overlap avatar-icon-sm avatar-wrapper-overlap-hover my-2">
                  <div className="avatar-icon-wrapper avatar-icon">
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar1} />
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper avatar-icon">
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar2} />
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper avatar-icon">
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar4} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider mx-auto my-3" />
              <div className="text-center px-3">
                <Button
                  fullWidth
                  className="d-flex btn-transition-none border-0 shadow-none btn-neutral-dark">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['far', 'user-circle']} />
                  </span>
                  <span className="btn-wrapper--label">View Profile</span>
                </Button>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item md={4} lg={12} xl={4}>
          <Card className="card-box card-box-hover">
            <div className="card-tr-actions">
              <Button
                className="p-0 d-40 btn-transition-none border-0 btn-pill btn-animated-icon-sm btn-outline-first"
                variant="outlined">
                <span className="btn-wrapper--icon d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={['far', 'heart']} />
                </span>
              </Button>
            </div>
            <div className="text-center py-3">
              <div className="d-70 rounded-lg border-0 my-3 shadow-xxl btn-icon p-2 bg-white card-icon-wrapper mx-auto">
                <img
                  className="img-fit-container d-40 rounded-lg"
                  alt="..."
                  src={logo2}
                />
              </div>
              <div className="font-size-xl font-weight-bold pt-2 text-black">
                Bugfixes
              </div>
              <div className="opacity-5 pb-3">Resolve Github Issues</div>
              <div className="d-flex justify-content-center">
                <div className="avatar-wrapper-overlap avatar-icon-sm avatar-wrapper-overlap-hover my-2">
                  <div className="avatar-icon-wrapper avatar-icon">
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar5} />
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper avatar-icon">
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar7} />
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper avatar-icon">
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar6} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider mx-auto my-3" />
              <div className="text-center px-3">
                <Button
                  fullWidth
                  className="d-flex btn-transition-none border-0 shadow-none btn-neutral-dark">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['far', 'user-circle']} />
                  </span>
                  <span className="btn-wrapper--label">View Profile</span>
                </Button>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item md={4} lg={12} xl={4}>
          <Card className="card-box card-box-hover">
            <div className="card-tr-actions">
              <Button
                className="p-0 d-40 btn-transition-none border-0 btn-pill btn-animated-icon-sm btn-outline-first"
                variant="outlined">
                <span className="btn-wrapper--icon d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={['far', 'heart']} />
                </span>
              </Button>
            </div>
            <div className="text-center py-3">
              <div className="d-70 rounded-lg border-0 my-3 shadow-xxl btn-icon p-2 bg-white card-icon-wrapper mx-auto">
                <img
                  className="img-fit-container d-40 rounded-lg"
                  alt="..."
                  src={logo3}
                />
              </div>
              <div className="font-size-xl font-weight-bold pt-2 text-black">
                Marketing
              </div>
              <div className="opacity-5 pb-3">Create UI Designs</div>
              <div className="d-flex justify-content-center">
                <div className="avatar-wrapper-overlap avatar-icon-sm avatar-wrapper-overlap-hover my-2">
                  <div className="avatar-icon-wrapper avatar-icon">
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar7} />
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper avatar-icon">
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar6} />
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper avatar-icon">
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar1} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider mx-auto my-3" />
              <div className="text-center px-3">
                <Button
                  fullWidth
                  className="d-flex btn-transition-none border-0 shadow-none btn-neutral-dark">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['far', 'user-circle']} />
                  </span>
                  <span className="btn-wrapper--label">View Profile</span>
                </Button>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
