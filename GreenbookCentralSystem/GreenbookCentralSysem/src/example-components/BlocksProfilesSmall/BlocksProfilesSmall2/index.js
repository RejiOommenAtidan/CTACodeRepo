import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, CardContent, Button } from '@material-ui/core';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={4}>
            <Card className="bg-midnight-bloom">
              <CardContent className="px-3 py-3">
                <div className="font-size-lg pb-3 font-weight-bold">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="text-white">
                    Create Figma design files
                  </a>
                </div>
                <div>
                  <div className="avatar-icon-wrapper mr-1 avatar-initials">
                    <div className="avatar-icon rounded-circle shadow-sm-dark font-weight-normal text-white bg-danger">
                      JK
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper mr-1 avatar-initials">
                    <div className="avatar-icon rounded-circle shadow-sm-dark font-weight-normal text-white bg-second">
                      HA
                    </div>
                    <div className="badge badge-success badge-circle">
                      Online
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper">
                    <div className="avatar-icon rounded-circle shadow-sm-dark">
                      <img alt="..." src={avatar2} />
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper">
                    <div className="avatar-icon rounded-circle shadow-sm-dark">
                      <img alt="..." src={avatar1} />
                    </div>
                    <div className="badge badge-warning badge-circle">Idle</div>
                  </div>
                </div>
              </CardContent>
              <div className="divider bg-white-50 opacity-6" />
              <div className="card-footer text-white-50 d-flex align-items-center p-3 bg-white-10 justify-content-between">
                <div>
                  <Button className="btn-first d-30 btn-icon p-0 mr-2">
                    <FontAwesomeIcon icon={['fas', 'plus']} />
                  </Button>
                  <span className="font-size-sm px-2" title="Total downloads">
                    <FontAwesomeIcon
                      icon={['fas', 'link']}
                      className="mr-1 font-size-xs"
                    />
                    55
                  </span>
                  <span className="font-size-sm px-2" title="Total views">
                    <FontAwesomeIcon
                      icon={['far', 'eye']}
                      className="mr-1 font-size-xs"
                    />
                    344
                  </span>
                </div>
                <div className="font-size-sm text-white px-2 opacity-7">
                  <FontAwesomeIcon
                    icon={['far', 'clock']}
                    className="mr-1 font-size-xs"
                  />
                  Today - 11:35
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xl={4}>
            <Card className="bg-slick-carbon">
              <CardContent className="text-center px-3 py-3">
                <div className="font-size-lg pb-3 font-weight-bold">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="text-white">
                    Implements package.json update
                  </a>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <div className="avatar-icon-wrapper mr-1 avatar-initials">
                    <div className="avatar-icon rounded-circle shadow-sm-dark font-weight-normal text-white bg-info">
                      MA
                    </div>
                    <div className="badge badge-success badge-circle">
                      Online
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper">
                    <div className="avatar-icon rounded-circle shadow-sm-dark">
                      <img alt="..." src={avatar3} />
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper mr-1 avatar-initials">
                    <div className="avatar-icon rounded-circle shadow-sm-dark font-weight-normal text-white bg-dark">
                      TK
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper">
                    <div className="avatar-icon rounded-circle shadow-sm-dark">
                      <img alt="..." src={avatar4} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="divider bg-white-50 opacity-6" />
              <div className="card-footer text-white-50 d-flex align-items-center p-3 bg-white-10 justify-content-between">
                <div>
                  <Button className="btn-success d-30 btn-icon p-0 mr-2">
                    <FontAwesomeIcon icon={['fas', 'plus']} />
                  </Button>
                  <span className="font-size-sm px-2" title="Total downloads">
                    <FontAwesomeIcon
                      icon={['fas', 'link']}
                      className="mr-1 font-size-xs"
                    />
                    55
                  </span>
                  <span className="font-size-sm px-2" title="Total views">
                    <FontAwesomeIcon
                      icon={['far', 'eye']}
                      className="mr-1 font-size-xs"
                    />
                    344
                  </span>
                </div>
                <div className="font-size-sm text-white px-2 opacity-7">
                  <FontAwesomeIcon
                    icon={['far', 'clock']}
                    className="mr-1 font-size-xs"
                  />
                  Today - 11:35
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xl={4}>
            <Card className="bg-vicious-stance">
              <CardContent className="px-3 py-3">
                <div className="font-size-lg pb-3 font-weight-bold">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="text-white">
                    Release new features
                  </a>
                </div>
                <div>
                  <div className="avatar-icon-wrapper mr-1 avatar-initials">
                    <div className="avatar-icon rounded-circle shadow-sm-dark font-weight-normal text-white bg-warning">
                      JK
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper mr-1 avatar-initials">
                    <div className="avatar-icon rounded-circle shadow-sm-dark font-weight-normal text-white bg-dark">
                      HA
                    </div>
                    <div className="badge badge-success badge-circle">
                      Online
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper">
                    <div className="avatar-icon rounded-circle shadow-sm-dark">
                      <img alt="..." src={avatar7} />
                      <div className="badge badge-success badge-circle">
                        Online
                      </div>
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper">
                    <div className="avatar-icon rounded-circle shadow-sm-dark">
                      <img alt="..." src={avatar6} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="divider bg-white-50 opacity-6" />
              <div className="card-footer text-white-50 p-3 bg-white-10 d-flex align-items-center justify-content-between">
                <div>
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="btn-danger d-30 btn-icon p-0 mr-2">
                    <FontAwesomeIcon icon={['fas', 'plus']} />
                  </Button>
                  <span className="font-size-sm px-2" title="Total downloads">
                    <FontAwesomeIcon
                      icon={['fas', 'link']}
                      className="mr-1 font-size-xs"
                    />
                    55
                  </span>
                  <span className="font-size-sm px-2" title="Total views">
                    <FontAwesomeIcon
                      icon={['far', 'eye']}
                      className="mr-1 font-size-xs"
                    />
                    344
                  </span>
                </div>
                <div className="font-size-sm text-white px-2 opacity-7">
                  <FontAwesomeIcon
                    icon={['far', 'clock']}
                    className="mr-1 font-size-xs"
                  />
                  Today - 12:43
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
