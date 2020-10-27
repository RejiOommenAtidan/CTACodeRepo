import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Checkbox, Card, CardContent, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <div className="card-header">
          <div className="card-header--title">
            <h4 className="font-size-lg mb-0 py-2 font-weight-bold">
              Users list
            </h4>
          </div>

          <div className="card-header--actions">
            <div>
              <Button size="small" className="btn-neutral-success">
                Actions
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="px-0 pt-2 pb-3">
          <Table className="table table-borderless table-hover table-alternate text-nowrap mb-0">
            <thead>
              <tr>
                <th>Software</th>
                <th className="text-center">Income</th>
                <th className="text-center">Expenses</th>
                <th className="text-center">Status</th>
                <th className="text-right">Totals</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="d-flex">
                    <Checkbox
                      color="primary"
                      id="checkboxProjects15"
                      className="align-self-center mr-2"
                    />
                    <div>
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="font-weight-bold text-black"
                        title="...">
                        Isaiah Ruiz
                      </a>
                      <span className="text-black-50 d-block">
                        Senior Web Developer
                      </span>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold text-danger">-$254</span>
                </td>
                <td className="text-center">
                  <span className="text-danger font-weight-bold">-2,374</span>
                </td>
                <td className="text-center">
                  <div className="badge badge-danger">Overdue</div>
                </td>
                <td className="text-right">
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="font-weight-bold font-size-lg pr-2">
                      2363
                    </div>
                    <FontAwesomeIcon
                      icon={['fas', 'arrow-down']}
                      className="font-size-sm opacity-5"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex">
                    <Checkbox
                      color="primary"
                      id="checkboxProjects4"
                      className="align-self-center mr-2"
                    />
                    <div>
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="font-weight-bold text-black"
                        title="...">
                        Inez Conley
                      </a>
                      <span className="text-black-50 d-block">
                        Project Manager
                      </span>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">$18,386</span>
                </td>
                <td className="text-center">
                  <span className="text-danger font-weight-bold">-6,310</span>
                </td>
                <td className="text-center">
                  <div className="badge badge-warning">Pending</div>
                </td>
                <td className="text-right">
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="font-weight-bold font-size-lg pr-2">
                      584
                    </div>
                    <FontAwesomeIcon
                      icon={['fas', 'arrow-down']}
                      className="font-size-sm opacity-5"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex">
                    <Checkbox
                      color="primary"
                      id="checkboxProjects5"
                      className="align-self-center mr-2"
                    />
                    <div>
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="font-weight-bold text-black"
                        title="...">
                        Adyan Sosa
                      </a>
                      <span className="text-black-50 d-block">
                        User Experience Designer
                      </span>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">$6,356</span>
                </td>
                <td className="text-center">
                  <span className="text-warning">-374</span>
                </td>
                <td className="text-center">
                  <div className="badge badge-first">Waiting</div>
                </td>
                <td className="text-right">
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="font-weight-bold font-size-lg pr-2">
                      483
                    </div>
                    <FontAwesomeIcon
                      icon={['fas', 'arrow-up']}
                      className="font-size-sm opacity-5"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex">
                    <Checkbox
                      color="primary"
                      id="checkboxProjects11"
                      className="align-self-center mr-2"
                    />
                    <div>
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="font-weight-bold text-black"
                        title="...">
                        Beck Simpson
                      </a>
                      <span className="text-black-50 d-block">
                        Senior Consultant
                      </span>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">$16,281</span>
                </td>
                <td className="text-center">
                  <span className="text-success">+684</span>
                </td>
                <td className="text-center">
                  <div className="badge badge-success">Done</div>
                </td>
                <td className="text-right">
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="font-weight-bold font-size-lg pr-2">
                      {' '}
                      $12,23M
                    </div>
                    <FontAwesomeIcon
                      icon={['fas', 'arrow-up']}
                      className="font-size-sm opacity-5"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="divider mb-3" />
          <div className="text-center">
            <Button variant="contained" color="primary">
              <span className="btn-wrapper--label">View details</span>
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fas', 'chevron-right']} />
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
