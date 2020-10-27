import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Grid, Card, Button } from '@material-ui/core';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../../assets/images/avatars/avatar4.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={6}>
            <Card className="card-box">
              <div className="font-size-lg px-3 py-4 font-weight-bold">
                Transactions history
              </div>
              <div className="table-responsive-md">
                <Table className="table table-borderless text-nowrap mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase bg-secondary">
                        Application
                      </th>
                      <th className="text-uppercase bg-secondary">Date</th>
                      <th className="text-uppercase bg-secondary">Payouts</th>
                      <th className="text-uppercase bg-secondary">Status</th>
                      <th className="text-uppercase bg-secondary text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>File Manager</td>
                      <td>Aug 11, 2020</td>
                      <td>$45,567</td>
                      <td>
                        <div className="badge badge-success">Paid</div>
                      </td>
                      <td className="text-center">
                        <Button
                          size="small"
                          className="btn-primary shadow-none d-30 btn-icon hover-scale-sm p-0">
                          <FontAwesomeIcon icon={['far', 'dot-circle']} />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Calendar App</td>
                      <td>Nov 12, 2020</td>
                      <td>$586,567</td>
                      <td>
                        <div className="badge badge-success">Paid</div>
                      </td>
                      <td className="text-center">
                        <Button
                          size="small"
                          className="btn-primary shadow-none d-30 btn-icon hover-scale-sm p-0">
                          <FontAwesomeIcon icon={['far', 'dot-circle']} />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Tasks Management</td>
                      <td>Nov 13, 2020</td>
                      <td>$657</td>
                      <td>
                        <div className="badge badge-warning">Pending</div>
                      </td>
                      <td className="text-center">
                        <Button
                          size="small"
                          className="btn-primary shadow-none d-30 btn-icon hover-scale-sm p-0">
                          <FontAwesomeIcon icon={['far', 'dot-circle']} />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Tickets App</td>
                      <td>Nov 22, 2020</td>
                      <td>$12,478</td>
                      <td>
                        <div className="badge badge-danger">Overdue</div>
                      </td>
                      <td className="text-center">
                        <Button
                          size="small"
                          className="btn-primary shadow-none d-30 btn-icon hover-scale-sm p-0">
                          <FontAwesomeIcon icon={['far', 'dot-circle']} />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Dashboard App</td>
                      <td>Aug 15, 2020</td>
                      <td>$45,57</td>
                      <td>
                        <div className="badge badge-success">Paid</div>
                      </td>
                      <td className="text-center">
                        <Button
                          size="small"
                          className="btn-primary shadow-none d-30 btn-icon hover-scale-sm p-0">
                          <FontAwesomeIcon icon={['far', 'dot-circle']} />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Grid>
          <Grid item xl={6}>
            <Card className="card-box">
              <div className="font-size-lg px-3 py-4 font-weight-bold">
                Exchange
              </div>
              <div className="table-responsive-md">
                <Table className="table table-borderless text-nowrap mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase bg-secondary">Profile</th>
                      <th className="text-uppercase bg-secondary">Currency</th>
                      <th className="text-uppercase bg-secondary">Balance</th>
                      <th className="text-uppercase bg-secondary">
                        Reserved in Orders
                      </th>
                      <th className="text-uppercase bg-secondary text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon-wrapper avatar-icon-sm mr-3">
                            <div className="avatar-icon">
                              <img alt="..." src={avatar1} />
                            </div>
                          </div>
                          <div>
                            Brody Dixon
                            <span className="text-black-50 font-size-sm d-block">
                              Member since 2016
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="font-weight-bold">BTC</td>
                      <td>0.000458 BTC</td>
                      <td>0.000073 BTC</td>
                      <td className="text-center">
                        <Button className="btn-link p-0 btn-icon d-30">
                          <span className="btn-wrapper--icon d-flex">
                            <FontAwesomeIcon
                              icon={['fas', 'plus']}
                              className="text-success font-size-sm"
                            />
                          </span>
                        </Button>
                        <Button className="btn-link p-0 btn-icon d-30">
                          <span className="btn-wrapper--icon d-flex">
                            <FontAwesomeIcon
                              icon={['fas', 'times']}
                              className="text-danger font-size-sm"
                            />
                          </span>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon-wrapper avatar-icon-sm mr-3">
                            <div className="avatar-icon">
                              <img alt="..." src={avatar2} />
                            </div>
                          </div>
                          <div>
                            Arvin Weston
                            <span className="text-black-50 font-size-sm d-block">
                              Member since 2017
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="font-weight-bold">ETH</td>
                      <td>3.435456 ETH</td>
                      <td>1.234555 ETH</td>
                      <td className="text-center">
                        <Button className="btn-link p-0 btn-icon d-30">
                          <span className="btn-wrapper--icon d-flex">
                            <FontAwesomeIcon
                              icon={['fas', 'plus']}
                              className="text-success font-size-sm"
                            />
                          </span>
                        </Button>
                        <Button className="btn-link p-0 btn-icon d-30">
                          <span className="btn-wrapper--icon d-flex">
                            <FontAwesomeIcon
                              icon={['fas', 'times']}
                              className="text-danger font-size-sm"
                            />
                          </span>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon-wrapper avatar-icon-sm mr-3">
                            <div className="avatar-icon">
                              <img alt="..." src={avatar3} />
                            </div>
                          </div>
                          <div>
                            Elin Paine
                            <span className="text-black-50 font-size-sm d-block">
                              Member since 2018
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="font-weight-bold">EUR</td>
                      <td>34 EUR</td>
                      <td>6 EUR</td>
                      <td className="text-center">
                        <Button className="btn-link p-0 btn-icon d-30">
                          <span className="btn-wrapper--icon d-flex">
                            <FontAwesomeIcon
                              icon={['fas', 'plus']}
                              className="text-success font-size-sm"
                            />
                          </span>
                        </Button>
                        <Button className="btn-link p-0 btn-icon d-30">
                          <span className="btn-wrapper--icon d-flex">
                            <FontAwesomeIcon
                              icon={['fas', 'times']}
                              className="text-danger font-size-sm"
                            />
                          </span>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon-wrapper avatar-icon-sm mr-3">
                            <div className="avatar-icon">
                              <img alt="..." src={avatar4} />
                            </div>
                          </div>
                          <div>
                            Sheena Hampton
                            <span className="text-black-50 font-size-sm d-block">
                              Member since 2019
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="font-weight-bold">CNY</td>
                      <td>66.20 CNY</td>
                      <td>23.40 CNY</td>
                      <td className="text-center">
                        <Button className="btn-link p-0 btn-icon d-30">
                          <span className="btn-wrapper--icon d-flex">
                            <FontAwesomeIcon
                              icon={['fas', 'plus']}
                              className="text-success font-size-sm"
                            />
                          </span>
                        </Button>
                        <Button className="btn-link p-0 btn-icon d-30">
                          <span className="btn-wrapper--icon d-flex">
                            <FontAwesomeIcon
                              icon={['fas', 'times']}
                              className="text-danger font-size-sm"
                            />
                          </span>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
