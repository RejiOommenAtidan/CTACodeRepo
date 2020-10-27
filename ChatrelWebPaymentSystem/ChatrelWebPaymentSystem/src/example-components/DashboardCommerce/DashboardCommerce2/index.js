import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Card, CardContent } from '@material-ui/core';

import Trend from 'react-trend';
import CountUp from 'react-countup';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <div className="card-header-alt p-4">
          <h6 className="font-weight-bold font-size-lg mb-1 text-black">
            Weekly Sales
          </h6>
          <p className="text-black-50 mb-0">
            Reports for what we sold this week.
          </p>
        </div>
        <div className="divider" />
        <CardContent className="pt-3 px-4 pb-4">
          <Table className="table table-alternate-spaced mb-0">
            <thead>
              <tr>
                <th>Software</th>
                <th className="text-center">Income</th>
                <th className="text-center">Expenses</th>
                <th className="text-left">Status</th>
                <th className="text-center" style={{ width: '15%' }}>
                  Trends
                </th>
                <th className="text-right">Totals</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
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
                </td>
                <td className="text-center">
                  <span className="font-weight-bold text-danger">-$254</span>
                </td>
                <td className="text-center">
                  <span className="text-danger font-weight-bold">-2,374</span>
                </td>
                <td className="text-left">
                  <div className="badge badge-danger">Overdue</div>
                </td>
                <td>
                  <Trend
                    data={[0, 10, 5, 22, 3.6, 11]}
                    autoDraw
                    autoDrawDuration={3000}
                    autoDrawEasing="ease-in"
                    radius={15}
                    smooth
                    stroke="var(--danger)"
                    strokeLinecap="round"
                    strokeWidth={5}
                  />
                </td>
                <td className="text-right">
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="font-weight-bold font-size-lg pr-2">
                      <CountUp
                        start={0}
                        end={3465}
                        duration={6}
                        deplay={2}
                        separator=""
                        decimals={0}
                        decimal=","
                      />
                    </div>
                    <FontAwesomeIcon
                      icon={['fas', 'arrow-down']}
                      className="font-size-sm opacity-5"
                    />
                  </div>
                </td>
              </tr>
              <tr className="divider"></tr>
              <tr>
                <td>
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
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">$18,386</span>
                </td>
                <td className="text-center">
                  <span className="text-danger font-weight-bold">-6,310</span>
                </td>
                <td className="text-left">
                  <div className="badge badge-warning">Pending</div>
                </td>
                <td>
                  <Trend
                    data={[3, 12, 5, 9, 8, 19, 4.6, 5]}
                    autoDraw
                    autoDrawDuration={3000}
                    autoDrawEasing="ease-in"
                    radius={15}
                    smooth
                    stroke="var(--success)"
                    strokeLinecap="round"
                    strokeWidth={5}
                  />
                </td>
                <td className="text-right">
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="font-weight-bold font-size-lg pr-2">
                      <CountUp
                        start={0}
                        end={584}
                        duration={6}
                        deplay={2}
                        separator=""
                        decimals={0}
                        decimal=","
                      />
                    </div>
                    <FontAwesomeIcon
                      icon={['fas', 'arrow-down']}
                      className="font-size-sm opacity-5"
                    />
                  </div>
                </td>
              </tr>
              <tr className="divider"></tr>
              <tr>
                <td>
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
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">$6,356</span>
                </td>
                <td className="text-center">
                  <span className="text-warning">-374</span>
                </td>
                <td className="text-left">
                  <div className="badge badge-first">Waiting</div>
                </td>
                <td>
                  <Trend
                    data={[0, 10, 12, 14, 5, 22, 3.6, 11]}
                    autoDraw
                    autoDrawDuration={3000}
                    autoDrawEasing="ease-in"
                    radius={15}
                    smooth
                    stroke="var(--warning)"
                    strokeLinecap="round"
                    strokeWidth={5}
                  />
                </td>
                <td className="text-right">
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="font-weight-bold font-size-lg pr-2">
                      <CountUp
                        start={0}
                        end={483}
                        duration={6}
                        deplay={2}
                        separator=""
                        decimals={0}
                        decimal=","
                      />
                    </div>
                    <FontAwesomeIcon
                      icon={['fas', 'arrow-up']}
                      className="font-size-sm opacity-5"
                    />
                  </div>
                </td>
              </tr>
              <tr className="divider"></tr>
              <tr>
                <td>
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
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">$16,281</span>
                </td>
                <td className="text-center">
                  <span className="text-success">+684</span>
                </td>
                <td className="text-left">
                  <div className="badge badge-success">Done</div>
                </td>
                <td>
                  <Trend
                    data={[9, 8, 19, 4.6, 3, 12, 5, 5]}
                    autoDraw
                    autoDrawDuration={3000}
                    autoDrawEasing="ease-in"
                    radius={15}
                    smooth
                    stroke="var(--first)"
                    strokeLinecap="round"
                    strokeWidth={5}
                  />
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
        </CardContent>
      </Card>
    </>
  );
}
