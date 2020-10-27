import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Grid, LinearProgress, Card, Button } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { FlagIcon } from 'react-flag-kit';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={6}>
            <Card className="card-box">
              <div className="card-header">
                <div className="card-header--title font-weight-bold">
                  Analytics
                </div>
                <div className="card-header--actions">
                  <div>
                    <Button size="small" className="btn-neutral-success">
                      <span className="btn-wrapper--label">Select period</span>
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-down']}
                          className="opacity-8 font-size-xs"
                        />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
              <PerfectScrollbar className="scroll-area-sm mb-2">
                <div className="table-responsive-md">
                  <Table className="table table-borderless table-hover text-nowrap mb-0">
                    <tbody>
                      <tr>
                        <td className="text-center font-size-lg">1 August</td>
                        <td>
                          <div className="text-left font-size-lg">
                            <small className="text-black-50 d-block">
                              Returning visitors
                            </small>
                            <span className="text-warning">596</span>
                          </div>
                        </td>
                        <td>
                          <div className="text-left font-size-lg">
                            <small className="text-black-50 d-block">
                              New visits
                            </small>
                            <span className="text-success">
                              <FontAwesomeIcon
                                icon={['fas', 'angle-up']}
                                className="mr-1"
                              />
                              45%
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center font-size-lg">2 August</td>
                        <td>
                          <div className="text-left font-size-lg">
                            <small className="text-black-50 d-block">
                              Returning visitors
                            </small>
                            <span className="text-success">3,465</span>
                          </div>
                        </td>
                        <td>
                          <div className="text-left font-size-lg">
                            <small className="text-black-50 d-block">
                              New visits
                            </small>
                            <span className="text-danger">
                              <FontAwesomeIcon
                                icon={['fas', 'angle-down']}
                                className="mr-1"
                              />
                              35%
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center font-size-lg">3 August</td>
                        <td>
                          <div className="text-left font-size-lg">
                            <small className="text-black-50 d-block">
                              Returning visitors
                            </small>
                            <span className="text-success">12,364</span>
                          </div>
                        </td>
                        <td>
                          <div className="text-left font-size-lg">
                            <small className="text-black-50 d-block">
                              New visits
                            </small>
                            <span className="text-success">
                              <FontAwesomeIcon
                                icon={['fas', 'angle-up']}
                                className="mr-1"
                              />
                              45%
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center font-size-lg">4 August</td>
                        <td>
                          <div className="text-left font-size-lg">
                            <small className="text-black-50 d-block">
                              Returning visitors
                            </small>
                            <span className="text-warning">346</span>
                          </div>
                        </td>
                        <td>
                          <div className="text-left font-size-lg">
                            <small className="text-black-50 d-block">
                              New visits
                            </small>
                            <span className="text-success">
                              <FontAwesomeIcon
                                icon={['fas', 'angle-up']}
                                className="mr-1"
                              />
                              66%
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center font-size-lg">5 August</td>
                        <td>
                          <div className="text-left font-size-lg">
                            <small className="text-black-50 d-block">
                              Returning visitors
                            </small>
                            <span className="text-success">765</span>
                          </div>
                        </td>
                        <td>
                          <div className="text-left font-size-lg">
                            <small className="text-black-50 d-block">
                              New visits
                            </small>
                            <span className="text-danger">
                              <FontAwesomeIcon
                                icon={['fas', 'angle-down']}
                                className="mr-1"
                              />
                              64%
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </PerfectScrollbar>
            </Card>
          </Grid>
          <Grid item xl={6}>
            <Card className="card-box">
              <div className="card-header">
                <div className="card-header--title font-weight-bold">
                  Countries
                </div>
                <div className="card-header--actions">
                  <div className="badge badge-pill badge-neutral-first">
                    Updates available
                  </div>
                </div>
              </div>
              <PerfectScrollbar className="scroll-area-sm mb-2">
                <div className="table-responsive-md">
                  <Table className="table table-borderless table-hover text-nowrap mb-0">
                    <thead>
                      <tr>
                        <th style={{ width: 150 }}>Country</th>
                        <th>Visits</th>
                        <th>% Visits</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="align-box-row">
                            <FlagIcon className="mr-2" size={40} code="US" />
                            <span>USA</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center font-size-lg">
                            <FontAwesomeIcon
                              icon={['fas', 'angle-up']}
                              className="mr-2 t2xt-success"
                            />
                            <small className="text-black-50 d-block">
                              45,235
                            </small>
                          </div>
                        </td>
                        <td>
                          <div className="align-box-row">
                            <div className="flex-grow-1">
                              <LinearProgress
                                variant="determinate"
                                className="progress-animated-alt progress-xs progress-bar-first"
                                value={55}
                              />
                            </div>
                            <div className="text-dark pl-2">55%</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="align-box-row">
                            <FlagIcon className="mr-2" size={40} code="IT" />
                            <span>Italy</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center font-size-lg">
                            <FontAwesomeIcon
                              icon={['fas', 'angle-up']}
                              className="mr-2 2ext-success"
                            />
                            <small className="text-black-50 d-block">
                              3,772
                            </small>
                          </div>
                        </td>
                        <td>
                          <div className="align-box-row">
                            <div className="flex-grow-1">
                              <LinearProgress
                                variant="determinate"
                                className="progress-animated-alt progress-xs progress-bar-first"
                                value={65}
                              />
                            </div>
                            <div className="text-dark pl-2">65%</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="align-box-row">
                            <FlagIcon className="mr-2" size={40} code="FR" />
                            <span>France</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center font-size-lg">
                            <FontAwesomeIcon
                              icon={['fas', 'angle-down']}
                              className="mr-2 text-danger"
                            />
                            <small className="text-black-50 d-block">
                              56,235
                            </small>
                          </div>
                        </td>
                        <td>
                          <div className="align-box-row">
                            <div className="flex-grow-1">
                              <LinearProgress
                                variant="determinate"
                                className="progress-animated-alt progress-xs progress-bar-first"
                                value={87}
                              />
                            </div>
                            <div className="text-dark pl-2">87%</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="align-box-row">
                            <FlagIcon className="mr-2" size={40} code="CH" />
                            <span>Switzerland</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center font-size-lg">
                            <FontAwesomeIcon
                              icon={['fas', 'angle-down']}
                              className="mr-2 text-warning"
                            />
                            <small className="text-black-50 d-block">
                              6,346
                            </small>
                          </div>
                        </td>
                        <td>
                          <div className="align-box-row">
                            <div className="flex-grow-1">
                              <LinearProgress
                                variant="determinate"
                                className="progress-animated-alt progress-xs progress-bar-first"
                                value={29}
                              />
                            </div>
                            <div className="text-dark pl-2">29%</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="align-box-row">
                            <FlagIcon className="mr-2" size={40} code="DE" />
                            <span>Germany</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center font-size-lg">
                            <FontAwesomeIcon
                              icon={['fas', 'angle-up']}
                              className="mr-2 t2xt-success"
                            />
                            <small className="text-black-50 d-block">
                              15,366
                            </small>
                          </div>
                        </td>
                        <td>
                          <div className="align-box-row">
                            <div className="flex-grow-1">
                              <LinearProgress
                                variant="determinate"
                                className="progress-animated-alt progress-xs progress-bar-first"
                                value={33}
                              />
                            </div>
                            <div className="text-dark pl-2">33%</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </PerfectScrollbar>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
