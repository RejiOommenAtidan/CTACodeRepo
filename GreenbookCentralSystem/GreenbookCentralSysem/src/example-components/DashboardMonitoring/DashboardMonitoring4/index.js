import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';

import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item md={4} lg={12} xl={4}>
            <Card className="card-box">
              <div className="text-center py-3">
                <div className="d-60 rounded-circle border-0 my-2 card-icon-wrapper bg-plum-plate text-white btn-icon mx-auto text-center">
                  <FontAwesomeIcon
                    icon={['far', 'bell']}
                    className="font-size-xxl"
                  />
                </div>
                <div className="font-size-xl font-weight-bold pt-2 text-black">
                  Recent Visitors
                </div>
                <div className="opacity-5 pb-3">Today's analytics</div>
                <div className="d-flex justify-content-center">
                  <div className="avatar-wrapper-overlap avatar-wrapper-overlap-hover my-2">
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
                <div className="divider mx-auto w-50 my-3" />
                <div className="text-center">
                  <Button
                    className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-dark"
                    variant="outlined">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['far', 'eye']}
                        className="font-size-sm"
                      />
                    </span>
                  </Button>
                  <Button
                    className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-dark"
                    variant="outlined">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['far', 'heart']}
                        className="font-size-sm"
                      />
                    </span>
                  </Button>
                  <Button
                    className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-dark"
                    variant="outlined">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fas', 'user']}
                        className="font-size-sm"
                      />
                    </span>
                  </Button>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item md={4} lg={12} xl={4}>
            <Card className="card-box">
              <div className="text-center py-3">
                <div className="d-60 rounded-circle border-0 my-2 card-icon-wrapper bg-happy-fisher text-white btn-icon mx-auto text-center">
                  <FontAwesomeIcon
                    icon={['fas', 'cubes']}
                    className="font-size-xl"
                  />
                </div>
                <div className="font-size-xl font-weight-bold pt-2 text-black">
                  New Customers
                </div>
                <div className="opacity-5 pb-3">Latest analytics</div>
                <div className="d-flex justify-content-center">
                  <div className="avatar-wrapper-overlap avatar-wrapper-overlap-hover my-2">
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
                <div className="divider mx-auto w-50 my-3" />
                <div className="text-center">
                  <Button
                    className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-dark"
                    variant="outlined">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['far', 'eye']}
                        className="font-size-sm"
                      />
                    </span>
                  </Button>
                  <Button
                    className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-dark"
                    variant="outlined">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['far', 'heart']}
                        className="font-size-sm"
                      />
                    </span>
                  </Button>
                  <Button
                    className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-dark"
                    variant="outlined">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fas', 'user']}
                        className="font-size-sm"
                      />
                    </span>
                  </Button>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item md={4} lg={12} xl={4}>
            <Card className="card-box">
              <div className="text-center py-3">
                <div className="d-60 rounded-circle border-0 my-2 card-icon-wrapper bg-love-kiss text-white btn-icon mx-auto text-center">
                  <FontAwesomeIcon
                    icon={['fas', 'shapes']}
                    className="font-size-xl"
                  />
                </div>
                <div className="font-size-xl font-weight-bold pt-2 text-black">
                  Today's Revenue
                </div>
                <div className="opacity-5 pb-3">Successful orders</div>
                <div className="d-flex justify-content-center">
                  <div className="avatar-wrapper-overlap avatar-wrapper-overlap-hover my-2">
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
                <div className="divider mx-auto w-50 my-3" />
                <div className="text-center">
                  <Button
                    className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-dark"
                    variant="outlined">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['far', 'eye']}
                        className="font-size-sm"
                      />
                    </span>
                  </Button>
                  <Button
                    className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-dark"
                    variant="outlined">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['far', 'heart']}
                        className="font-size-sm"
                      />
                    </span>
                  </Button>
                  <Button
                    className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-dark"
                    variant="outlined">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fas', 'user']}
                        className="font-size-sm"
                      />
                    </span>
                  </Button>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
