import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  LinearProgress,
  Card,
  Button,
  List,
  ListItem,
  Tooltip
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';

import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box">
        <div className="card-header bg-light">
          <div className="card-header--title">
            <small className="d-block text-uppercase mt-1">Progress</small>
            <b>Users Analytics</b>
          </div>
          <div className="card-header--actions">
            <div className="badge badge-pill badge-dark">Pending</div>
          </div>
        </div>
        <div className="scroll-area shadow-overflow">
          <PerfectScrollbar options={{ wheelPropagation: false }}>
            <List component="div" className="list-group-flush">
              <ListItem className="d-block">
                <div className="align-box-row py-2">
                  <div className="mr-4">
                    <Tooltip title="View details" placement="right">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="avatar-icon-wrapper avatar-icon-lg m-0">
                        <div className="dot-badge" />
                        <div className="avatar-icon">
                          <img alt="..." src={avatar7} />
                        </div>
                      </a>
                    </Tooltip>
                  </div>

                  <div className="flex-grow-1">
                    <LinearProgress
                      variant="determinate"
                      className="progress-bar-rounded progress-animated-alt progress-bar-success"
                      value={61}
                    />
                  </div>
                  <div className="line-height-sm text-center ml-4">
                    <small className="text-black-50 d-block text-uppercase">
                      Totals
                    </small>
                    <b className="font-size-lg text-success">
                      <small className="pr-1 text-black-50">$</small>
                      1,628
                    </b>
                  </div>
                </div>
              </ListItem>
              <ListItem className="d-block">
                <div className="align-box-row py-2">
                  <div className="mr-4">
                    <Tooltip title="View details" placement="right">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="avatar-icon-wrapper avatar-icon-lg m-0">
                        <div className="dot-badge" />
                        <div className="avatar-icon">
                          <img alt="..." src={avatar5} />
                        </div>
                      </a>
                    </Tooltip>
                  </div>

                  <div className="flex-grow-1">
                    <LinearProgress
                      variant="determinate"
                      className="progress-animated-alt progress-bar-rounded progress-bar-info"
                      value={44}
                    />
                  </div>
                  <div className="line-height-sm text-center ml-4">
                    <small className="text-black-50 d-block text-uppercase">
                      Totals
                    </small>
                    <b className="font-size-lg text-info">
                      <small className="text-black-50 pr-1">$</small>
                      7,389
                    </b>
                  </div>
                </div>
              </ListItem>
              <ListItem className="d-block">
                <div className="align-box-row py-2">
                  <div className="mr-4">
                    <Tooltip title="View details" placement="right">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="avatar-icon-wrapper avatar-icon-lg m-0">
                        <div className="dot-badge" />
                        <div className="avatar-icon">
                          <img alt="..." src={avatar1} />
                        </div>
                      </a>
                    </Tooltip>
                  </div>

                  <div className="flex-grow-1">
                    <LinearProgress
                      variant="determinate"
                      className="progress-bar-rounded progress-animated-alt progress-bar-danger"
                      value={29}
                    />
                  </div>
                  <div className="line-height-sm text-center ml-4">
                    <small className="text-black-50 d-block text-uppercase">
                      Totals
                    </small>
                    <b className="font-size-lg text-danger">
                      <small className="text-black-50 pr-1">$</small>
                      8,493
                    </b>
                  </div>
                </div>
              </ListItem>
              <ListItem className="d-block">
                <div className="align-box-row py-2">
                  <div className="mr-4">
                    <Tooltip title="View details" placement="right">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="avatar-icon-wrapper avatar-icon-lg m-0">
                        <div className="dot-badge" />
                        <div className="avatar-icon">
                          <img alt="..." src={avatar2} />
                        </div>
                      </a>
                    </Tooltip>
                  </div>

                  <div className="flex-grow-1">
                    <LinearProgress
                      variant="determinate"
                      className="progress-bar-rounded progress-animated-alt progress-bar-warning"
                      value={38}
                    />
                  </div>
                  <div className="line-height-sm text-center ml-4">
                    <small className="text-black-50 d-block text-uppercase">
                      Totals
                    </small>
                    <b className="font-size-lg text-warning">
                      <small className="text-black-50 pr-1">$</small>
                      2,594
                    </b>
                  </div>
                </div>
              </ListItem>
              <ListItem className="d-block">
                <div className="align-box-row py-2">
                  <div className="mr-4">
                    <Tooltip title="View details" placement="right">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="avatar-icon-wrapper avatar-icon-lg m-0">
                        <div className="dot-badge" />
                        <div className="avatar-icon">
                          <img alt="..." src={avatar7} />
                        </div>
                      </a>
                    </Tooltip>
                  </div>

                  <div className="flex-grow-1">
                    <LinearProgress
                      variant="determinate"
                      className="progress-bar-rounded progress-animated-alt progress-bar-success"
                      value={61}
                    />
                  </div>
                  <div className="line-height-sm text-center ml-4">
                    <small className="text-black-50 d-block text-uppercase">
                      Totals
                    </small>
                    <b className="font-size-lg text-success">
                      <small className="pr-1 text-black-50">$</small>
                      1,628
                    </b>
                  </div>
                </div>
              </ListItem>
              <ListItem className="d-block">
                <div className="align-box-row py-2">
                  <div className="mr-4">
                    <Tooltip title="View details" placement="right">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="avatar-icon-wrapper avatar-icon-lg m-0">
                        <div className="dot-badge" />
                        <div className="avatar-icon">
                          <img alt="..." src={avatar5} />
                        </div>
                      </a>
                    </Tooltip>
                  </div>

                  <div className="flex-grow-1">
                    <LinearProgress
                      variant="determinate"
                      className="progress-animated-alt progress-bar-rounded progress-bar-info"
                      value={44}
                    />
                  </div>
                  <div className="line-height-sm text-center ml-4">
                    <small className="text-black-50 d-block text-uppercase">
                      Totals
                    </small>
                    <b className="font-size-lg text-info">
                      <small className="text-black-50 pr-1">$</small>
                      7,389
                    </b>
                  </div>
                </div>
              </ListItem>
            </List>
          </PerfectScrollbar>
        </div>
        <div className="card-footer p-3 bg-secondary text-center">
          <Button className="btn-first">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={['far', 'question-circle']} />
            </span>
            <span className="btn-wrapper--label">Generate reports</span>
          </Button>
        </div>
      </Card>
    </>
  );
}
