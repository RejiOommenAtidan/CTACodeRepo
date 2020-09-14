import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Table,
  Grid,
  Checkbox,
  Card,
  CardContent,
  Button
} from '@material-ui/core';

import CountUp from 'react-countup';
import PerfectScrollbar from 'react-perfect-scrollbar';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={8}>
          <Card>
            <div className="card-img-wrapper">
              <div className="card-badges card-badges-top">
                <div className="badge badge-pill badge-info">NEW</div>
              </div>
              <div className="bg-composed-wrapper bg-plum-plate border-0">
                <div className="bg-composed-img-2 bg-composed-wrapper--image" />
                <div className="bg-composed-wrapper--content text-center text-white px-2 py-5">
                  <h1 className="font-size-xxl font-weight-bold py-2 mb-0">
                    Technical Support
                  </h1>
                  <p className="mb-2 font-size-lg opacity-7">
                    If you have questions regarding you order, you can send us a
                    message
                  </p>
                </div>
              </div>
            </div>
            <CardContent className="text-center card-body-button">
              <div className="card-body-button-wrapper">
                <Button
                  size="large"
                  className="btn-success btn-pill text-nowrap px-5 shadow-none border-3 border-white">
                  Send message
                </Button>
              </div>
              <Grid container spacing={6}>
                <Grid item md={4}>
                  <div className="bg-secondary p-3 text-center rounded">
                    <div>
                      <FontAwesomeIcon
                        icon={['far', 'user']}
                        className="font-size-xxl text-warning"
                      />
                    </div>
                    <div className="mt-2 line-height-sm">
                      <b className="font-size-lg">2,345</b>
                      <span className="text-black-50 d-block">users</span>
                    </div>
                  </div>
                </Grid>
                <Grid item md={4}>
                  <div className="bg-secondary p-3 text-center rounded">
                    <div>
                      <FontAwesomeIcon
                        icon={['fas', 'lemon']}
                        className="font-size-xxl text-success"
                      />
                    </div>
                    <div className="mt-2 line-height-sm">
                      <b className="font-size-lg">$3,586</b>
                      <span className="text-black-50 d-block">sales</span>
                    </div>
                  </div>
                </Grid>
                <Grid item md={4}>
                  <div className="bg-secondary p-3 text-center rounded">
                    <div>
                      <FontAwesomeIcon
                        icon={['far', 'chart-bar']}
                        className="font-size-xxl text-info"
                      />
                    </div>
                    <div className="mt-2 line-height-sm">
                      <b className="font-size-lg">$9,693</b>
                      <span className="text-black-50 d-block">revenue</span>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <div className="table-responsive">
                <Table className="table table-borderless table-hover text-left mt-4 text-nowrap table-alternate  mb-0">
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex">
                          <Checkbox
                            color="primary"
                            id="checkboxProjects4"
                            className="align-self-center p-0 mr-3"
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
                        <span className="text-danger font-weight-bold">
                          -6,310
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="badge badge-warning">Pending</div>
                      </td>
                      <td className="text-right">
                        <div className="d-flex align-items-center justify-content-end">
                          <div className="font-weight-bold font-size-lg pr-2">
                            <CountUp
                              start={0}
                              end={584}
                              duration={6}
                              delay={2}
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
                    <tr>
                      <td>
                        <div className="d-flex">
                          <Checkbox
                            color="primary"
                            id="checkboxProjects5"
                            className="align-self-center p-0 mr-3"
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
                            <CountUp
                              start={0}
                              end={483}
                              duration={6}
                              delay={2}
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
                    <tr>
                      <td>
                        <div className="d-flex">
                          <Checkbox
                            color="primary"
                            id="checkboxProjects11"
                            className="align-self-center p-0 mr-3"
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
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={4}>
          <Card className="p-3">
            <div className="bg-composed-wrapper bg-deep-blue rounded-sm">
              <div className="bg-composed-img-5 rounded-sm bg-composed-wrapper--image opacity-4" />
              <div className="bg-composed-wrapper--bg rounded-sm bg-serious-blue opacity-7" />
              <div className="bg-composed-wrapper--content text-center text-white p-3">
                <h1 className="font-size-xxl font-weight-bold pt-2 pb-1 mb-0">
                  Recent Orders
                </h1>
                <p className="mb-1 font-size-lg opacity-7">
                  Check latest status updates
                </p>
              </div>
            </div>
            <div className="scroll-area-lg shadow-overflow pt-3">
              <PerfectScrollbar options={{ wheelPropagation: false }}>
                <Table className="table table-borderless table-hover text-left text-nowrap table-alternate mb-0">
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex">
                          <Checkbox
                            color="primary"
                            id="checkboxExample1000"
                            className="align-self-start p-0 mr-2"
                          />
                          <div>
                            <div className="d-flex font-weight-bold text-black">
                              <div className="mr-2">
                                <FontAwesomeIcon
                                  icon={['fas', 'arrow-down']}
                                  className="font-size-sm text-danger"
                                />
                              </div>
                              <span>
                                <div>Macbook Laptop</div>
                                <div className="font-weight-normal text-warning badge badge-neutral-warning">
                                  Pending
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <div>
                          <div className="font-weight-bold">$2,157</div>
                          <div className="text-danger font-size-xs">
                            Increased
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex">
                          <Checkbox
                            color="primary"
                            id="checkboxExample1001"
                            className="align-self-start p-0 mr-2"
                          />
                          <div>
                            <div className="d-flex font-weight-bold text-black">
                              <div className="mr-2">
                                <FontAwesomeIcon
                                  icon={['fas', 'arrow-up']}
                                  className="font-size-sm text-success"
                                />
                              </div>
                              <span>
                                <div>Apple iPhone</div>
                                <div className="font-weight-normal text-success badge badge-neutral-success">
                                  Completed
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <div>
                          <div className="font-weight-bold">$1,573</div>
                          <div className="text-first font-size-xs">Regular</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex">
                          <Checkbox
                            color="primary"
                            id="checkboxExample1000"
                            className="align-self-start p-0 mr-2"
                          />
                          <div>
                            <div className="d-flex font-weight-bold text-black">
                              <div className="mr-2">
                                <FontAwesomeIcon
                                  icon={['fas', 'arrow-down']}
                                  className="font-size-sm text-danger"
                                />
                              </div>
                              <span>
                                <div>Macbook Laptop</div>
                                <div className="font-weight-normal text-warning badge badge-neutral-warning">
                                  Pending
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <div>
                          <div className="font-weight-bold">$2,157</div>
                          <div className="text-danger font-size-xs">
                            Increased
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex">
                          <Checkbox
                            color="primary"
                            id="checkboxExample1001"
                            className="align-self-start p-0 mr-2"
                          />
                          <div>
                            <div className="d-flex font-weight-bold text-black">
                              <div className="mr-2">
                                <FontAwesomeIcon
                                  icon={['fas', 'arrow-up']}
                                  className="font-size-sm text-success"
                                />
                              </div>
                              <span>
                                <div>Apple iPhone</div>
                                <div className="font-weight-normal text-success badge badge-neutral-success">
                                  Completed
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <div>
                          <div className="font-weight-bold">$1,573</div>
                          <div className="text-first font-size-xs">Regular</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex">
                          <Checkbox
                            color="primary"
                            id="checkboxExample1002"
                            className="align-self-start p-0 mr-2"
                          />
                          <div>
                            <div className="d-flex font-weight-bold text-black">
                              <div className="mr-2">
                                <FontAwesomeIcon
                                  icon={['fas', 'arrow-down']}
                                  className="font-size-sm text-danger"
                                />
                              </div>
                              <span>
                                <div>Desktop PC</div>
                                <div className="font-weight-normal text-success badge badge-neutral-success">
                                  Completed
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <div>
                          <div className="font-weight-bold">$639</div>
                          <div className="text-warning font-size-xs">Stale</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex">
                          <Checkbox
                            color="primary"
                            id="checkboxExample1003"
                            className="align-self-start p-0 mr-2"
                          />
                          <div>
                            <div className="d-flex font-weight-bold text-black">
                              <div className="mr-2">
                                <FontAwesomeIcon
                                  icon={['fas', 'arrow-up']}
                                  className="font-size-sm text-success"
                                />
                              </div>
                              <span>
                                <div>Apple Watch</div>
                                <div className="font-weight-normal text-danger badge badge-neutral-danger">
                                  Failed
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <div>
                          <div className="font-weight-bold">$852</div>
                          <div className="text-success font-size-xs">
                            Decreased
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex">
                          <Checkbox
                            color="primary"
                            id="checkboxExample1000"
                            className="align-self-start p-0 mr-2"
                          />
                          <div>
                            <div className="d-flex font-weight-bold text-black">
                              <div className="mr-2">
                                <FontAwesomeIcon
                                  icon={['fas', 'arrow-down']}
                                  className="font-size-sm text-danger"
                                />
                              </div>
                              <span>
                                <div>Macbook Laptop</div>
                                <div className="font-weight-normal text-warning badge badge-neutral-warning">
                                  Pending
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <div>
                          <div className="font-weight-bold">$2,157</div>
                          <div className="text-danger font-size-xs">
                            Increased
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex">
                          <Checkbox
                            color="primary"
                            id="checkboxExample1001"
                            className="align-self-start p-0 mr-2"
                          />
                          <div>
                            <div className="d-flex font-weight-bold text-black">
                              <div className="mr-2">
                                <FontAwesomeIcon
                                  icon={['fas', 'arrow-up']}
                                  className="font-size-sm text-success"
                                />
                              </div>
                              <span>
                                <div>Apple iPhone</div>
                                <div className="font-weight-normal text-success badge badge-neutral-success">
                                  Completed
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <div>
                          <div className="font-weight-bold">$1,573</div>
                          <div className="text-first font-size-xs">Regular</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex">
                          <Checkbox
                            color="primary"
                            id="checkboxExample1000"
                            className="align-self-start p-0 mr-2"
                          />
                          <div>
                            <div className="d-flex font-weight-bold text-black">
                              <div className="mr-2">
                                <FontAwesomeIcon
                                  icon={['fas', 'arrow-down']}
                                  className="font-size-sm text-danger"
                                />
                              </div>
                              <span>
                                <div>Macbook Laptop</div>
                                <div className="font-weight-normal text-warning badge badge-neutral-warning">
                                  Pending
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <div>
                          <div className="font-weight-bold">$2,157</div>
                          <div className="text-danger font-size-xs">
                            Increased
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </PerfectScrollbar>
            </div>
            <div className="text-center pt-3 pb-1">
              <Button className="btn-primary px-4 btn-gradient badge-wrapper bg-serious-blue">
                <div className="badge badge-danger badge-position badge-position--top-left badge-circle-inner">
                  New notifications
                </div>
                <span className="font-weight-bold font-size-sm px-4 text-uppercase">
                  View all
                </span>
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
