import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Table,
  LinearProgress,
  Card,
  CardContent,
  Button,
  Tooltip
} from '@material-ui/core';

import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <div className="card-header pr-2">
          <div className="card-header--title">Employees status</div>
          <div className="card-header--actions">
            <Tooltip title="Refresh">
              <Button size="small" className="btn-neutral-primary">
                <FontAwesomeIcon icon={['fas', 'cog']} spin />
              </Button>
            </Tooltip>
          </div>
        </div>
        <CardContent>
          <div className="table-responsive-md">
            <Table className="table table-borderless table-hover text-nowrap mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="text-left">Name</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Progress</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper mr-3">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar7} />
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Shanelle Wynn
                        </a>
                        <span className="text-black-50 d-block">
                          UI Engineer, Apple Inc.
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="badge badge-neutral-warning text-warning px-4">
                      Pending
                    </div>
                  </td>
                  <td>
                    <LinearProgress
                      variant="determinate"
                      value={55}
                      className="progress-bar-rounded progress-bar-info"
                    />
                  </td>
                  <td className="text-center">
                    <Button
                      size="small"
                      className="btn-neutral-dark hover-scale-sm d-40 p-0 btn-icon">
                      <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper mr-3">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar4} />
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Shanelle Wynn
                        </a>
                        <span className="text-black-50 d-block">
                          UI Engineer, Apple Inc.
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="badge badge-neutral-warning text-warning px-4">
                      Pending
                    </div>
                  </td>
                  <td>
                    <LinearProgress
                      variant="determinate"
                      value={55}
                      className="progress-bar-rounded progress-bar-info"
                    />
                  </td>
                  <td className="text-center">
                    <Button
                      size="small"
                      className="btn-neutral-dark hover-scale-sm d-40 p-0 btn-icon">
                      <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper mr-3">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar5} />
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Regan Norris
                        </a>
                        <span className="text-black-50 d-block">
                          Senior Project Manager
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="badge badge-neutral-danger text-danger px-4">
                      Failed
                    </div>
                  </td>
                  <td>
                    <LinearProgress
                      variant="determinate"
                      value={67}
                      className="progress-bar-danger progress-bar-rounded"
                    />
                  </td>
                  <td className="text-center">
                    <Button
                      size="small"
                      className="btn-neutral-dark hover-scale-sm d-40 p-0 btn-icon">
                      <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>33</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper mr-3">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar6} />
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Beck Simpson
                        </a>
                        <span className="text-black-50 d-block">
                          Frontend Developer
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="badge badge-neutral-success text-success px-4">
                      Completed
                    </div>
                  </td>
                  <td>
                    <LinearProgress
                      variant="determinate"
                      value={39}
                      className="progress-bar-dark progress-bar-rounded"
                    />
                  </td>
                  <td className="text-center">
                    <Button
                      size="small"
                      className="btn-neutral-dark hover-scale-sm d-40 p-0 btn-icon">
                      <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </CardContent>
        <div className="card-footer d-flex justify-content-between">
          <Button variant="text" className="btn-outline-danger" size="small">
            Delete
          </Button>
          <div>
            <Button size="small" color="primary" variant="contained">
              Add new entry
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
