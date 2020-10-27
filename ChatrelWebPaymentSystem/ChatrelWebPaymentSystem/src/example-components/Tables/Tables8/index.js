import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Card, CardContent, Button } from '@material-ui/core';

import Pagination from '@material-ui/lab/Pagination';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <div className="card-header">
          <div className="card-header--title">
            <small>Tables</small>
            <b>This table card has custom content</b>
          </div>
          <div className="card-header--actions">
            <Button size="small" className="btn-primary d-40 btn-icon p-0">
              <FontAwesomeIcon
                icon={['far', 'lightbulb']}
                className="font-size-lg"
              />
            </Button>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="table-responsive-md">
            <Table className="table table-hover table-striped text-nowrap mb-0">
              <thead className="thead-light">
                <tr>
                  <th style={{ width: '40%' }}>Employee</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper mr-3">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar2} />
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
                    <div className="badge badge-warning h-auto py-0 px-3">
                      Pending
                    </div>
                  </td>
                  <td className="text-center">
                    <div>
                      <Button
                        size="small"
                        className="btn-primary btn-icon d-40 p-0 btn-animated-icon-sm">
                        <FontAwesomeIcon
                          icon={['fas', 'ellipsis-h']}
                          className="font-size-lg"
                        />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper mr-3">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar1} />
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
                    <div className="badge badge-success h-auto py-0 px-3">
                      Completed
                    </div>
                  </td>
                  <td className="text-center">
                    <div>
                      <Button
                        size="small"
                        className="btn-primary btn-icon d-40 p-0 btn-animated-icon-sm">
                        <FontAwesomeIcon
                          icon={['fas', 'ellipsis-h']}
                          className="font-size-lg"
                        />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper mr-3">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar3} />
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
                    <div className="badge badge-danger h-auto py-0 px-3">
                      Declined
                    </div>
                  </td>
                  <td className="text-center">
                    <div>
                      <Button
                        size="small"
                        className="btn-primary btn-icon d-40 p-0 btn-animated-icon-sm">
                        <FontAwesomeIcon
                          icon={['fas', 'ellipsis-h']}
                          className="font-size-lg"
                        />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="divider" />
          <div className="divider" />
          <div className="p-3 d-flex justify-content-center">
            <Pagination className="pagination-primary" count={10} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
