import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  LinearProgress,
  Card,
  Menu,
  Button,
  List,
  ListItem
} from '@material-ui/core';

import Chart from 'react-apexcharts';
import CountUp from 'react-countup';
import { CircularProgressbar } from 'react-circular-progressbar';

import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../../assets/images/avatars/avatar4.jpg';

export default function LivePreviewExample() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const chartDashboardAnalytics2Options = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      color: '#4191ff',
      curve: 'smooth',
      width: 2
    },
    fill: {
      color: '#1bc943',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.3,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    colors: ['#1bc943'],
    legend: {
      show: false
    },
    xaxis: {
      crosshairs: {
        width: 1
      }
    },
    yaxis: {
      min: 0
    }
  };
  const chartDashboardAnalytics2Data = [
    {
      name: 'Weekly sales',
      data: [47, 38, 56, 24, 45, 54, 38, 56, 24, 65]
    }
  ];

  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={6}>
            <div className="mb-spacing-6-x2">
              <Card className="card-box">
                <div className="card-header">
                  <div className="card-header--title">
                    <small className="d-block text-uppercase mt-1">
                      Progress
                    </small>
                    <b>Users Analytics</b>
                  </div>
                  <div className="card-header--actions">
                    <div className="badge badge-pill badge-dark">Pending</div>
                  </div>
                </div>
                <List component="div" className="list-group-flush">
                  <ListItem className="py-3">
                    <Grid container spacing={0}>
                      <Grid
                        item
                        xl={6}
                        md={12}
                        className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon-wrapper mr-2">
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
                      </Grid>
                      <Grid
                        item
                        xl={6}
                        md={12}
                        className="pt-3 pt-xl-0 d-flex align-items-center">
                        <div className="align-box-row flex-grow-1">
                          <div className="d-flex flex-column flex-grow-1">
                            <div className="d-flex justify-content-between text-dark">
                              <div className="ml-auto">
                                <div className="font-weight-bold">
                                  <CountUp
                                    start={0}
                                    end={583}
                                    duration={4}
                                    separator=""
                                    decimals={0}
                                    decimal=","
                                    prefix=""
                                    suffix=""
                                  />
                                </div>
                              </div>
                            </div>
                            <LinearProgress
                              variant="determinate"
                              className="progress-sm progress-bar-rounded progress-bar-primary"
                              value={52}
                            />
                          </div>
                          <Button
                            size="small"
                            className="btn-neutral-primary ml-4">
                            View
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem className="py-3">
                    <Grid container spacing={0}>
                      <Grid
                        item
                        xl={6}
                        md={12}
                        className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon-wrapper mr-2">
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
                              Akeem Griffith
                            </a>
                            <span className="text-black-50 d-block">
                              Manager, Google Inc.
                            </span>
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xl={6}
                        md={12}
                        className="pt-3 pt-xl-0 d-flex align-items-center">
                        <div className="align-box-row flex-grow-1">
                          <div className="d-flex flex-column flex-grow-1">
                            <div className="d-flex justify-content-between text-dark">
                              <div className="ml-auto">
                                <div className="font-weight-bold">
                                  <CountUp
                                    start={0}
                                    end={340}
                                    duration={4}
                                    separator=""
                                    decimals={0}
                                    decimal=","
                                    prefix=""
                                    suffix=""
                                  />
                                </div>
                              </div>
                            </div>
                            <LinearProgress
                              variant="determinate"
                              className="progress-bar-rounded progress-sm progress-bar-danger"
                              value={38}
                            />
                          </div>
                          <Button
                            size="small"
                            className="btn-neutral-primary ml-4">
                            View
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem className="py-3">
                    <Grid container spacing={0}>
                      <Grid
                        item
                        xl={6}
                        md={12}
                        className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon-wrapper mr-2">
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
                              Abigayle Hicks
                            </a>
                            <span className="text-black-50 d-block">
                              Project Manager, Spotify
                            </span>
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xl={6}
                        md={12}
                        className="pt-3 pt-xl-0 d-flex align-items-center">
                        <div className="align-box-row flex-grow-1">
                          <div className="d-flex flex-column flex-grow-1">
                            <div className="d-flex justify-content-between text-dark">
                              <div className="ml-auto">
                                <div className="font-weight-bold">
                                  <CountUp
                                    start={0}
                                    end={473}
                                    duration={4}
                                    separator=""
                                    decimals={0}
                                    decimal=","
                                    prefix=""
                                    suffix=""
                                  />
                                </div>
                              </div>
                            </div>
                            <LinearProgress
                              variant="determinate"
                              className="progress-bar-rounded progress-sm progress-bar-warning"
                              value={34}
                            />
                          </div>
                          <Button
                            size="small"
                            className="btn-neutral-primary ml-4">
                            View
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem className="py-3">
                    <Grid container spacing={0}>
                      <Grid
                        item
                        xl={6}
                        md={12}
                        className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon-wrapper mr-2">
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
                              Gordon Barnett
                            </a>
                            <span className="text-black-50 d-block">
                              UI Developer, UiFort
                            </span>
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xl={6}
                        md={12}
                        className="pt-3 pt-xl-0 d-flex align-items-center">
                        <div className="align-box-row flex-grow-1">
                          <div className="d-flex flex-column flex-grow-1">
                            <div className="d-flex justify-content-between text-dark">
                              <div className="ml-auto">
                                <div className="font-weight-bold">
                                  <CountUp
                                    start={0}
                                    end={683}
                                    duration={6}
                                    delay={2}
                                    separator=" "
                                    decimals={0}
                                    decimal=","
                                    prefix=""
                                    suffix=""
                                  />
                                </div>
                              </div>
                            </div>
                            <LinearProgress
                              variant="determinate"
                              className="progress-bar-rounded progress-sm progress-bar-success"
                              value={48}
                            />
                          </div>
                          <Button
                            size="small"
                            className="btn-neutral-primary ml-4">
                            View
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Card>
            </div>
            <Grid container spacing={6}>
              <Grid item md={6}>
                <Card className="card-box card-box-border-bottom border-danger shadow-danger-sm mb-5">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="p-3">
                      <div className="text-black-50 text-uppercase pb-2 font-size-sm">
                        Accounts
                      </div>
                      <h3 className="font-weight-bold display-4 mb-0 text-black">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-up']}
                          className="font-size-lg mr-2 text-success"
                        />
                        <span>
                          <CountUp
                            start={0}
                            end={34}
                            duration={6}
                            delay={2}
                            separator=""
                            decimals={0}
                            decimal=","
                          />
                        </span>
                        <small className="opacity-6 pl-1 text-black-50">
                          %
                        </small>
                      </h3>
                    </div>
                    <CircularProgressbar
                      value={53}
                      text={53 + '%'}
                      strokeWidth={5}
                      className="m-3 circular-progress-sm circular-progress-danger"
                    />
                  </div>
                </Card>
              </Grid>
              <Grid item md={6}>
                <Card className="card-box card-box-border-bottom border-success shadow-success-sm mb-5">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="p-3">
                      <div className="text-black-50 text-uppercase pb-2 font-size-sm">
                        Subscriptions
                      </div>
                      <h3 className="font-weight-bold display-4 mb-0 text-black">
                        <span className="font-size-lg mr-2 text-success font-weight-bold">
                          +
                        </span>
                        <CountUp start={0} end={35} />
                        <small className="opacity-6 pl-1 text-black-50">
                          sales
                        </small>
                      </h3>
                    </div>
                    <CircularProgressbar
                      value={91}
                      text={91 + '%'}
                      strokeWidth={8}
                      className="m-3 circular-progress-sm circular-progress-success"
                    />
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={6}>
            <Card className="card-box">
              <div className="card-header">
                <div className="card-header--title">
                  <small className="d-block text-uppercase mt-1">Reports</small>
                  <b>Weekly Sales</b>
                </div>
                <div className="card-header--actions">
                  <Button
                    onClick={handleClick}
                    variant="text"
                    className="p-0 d-30 border-0 btn-transition-none text-second font-size-xl"
                    disableRipple>
                    <FontAwesomeIcon
                      icon={['fas', 'ellipsis-h']}
                      className="font-size-lg"
                    />
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={Boolean(anchorEl)}
                    classes={{ list: 'p-0' }}
                    onClose={handleClose}>
                    <div className="dropdown-menu-xl overflow-hidden p-0">
                      <div className="grid-menu grid-menu-2col">
                        <Grid container spacing={0}>
                          <Grid item sm={6}>
                            <Button
                              variant="text"
                              className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                              <FontAwesomeIcon
                                icon={['far', 'bell']}
                                className="h2 d-block mb-2 mx-auto mt-1 text-success"
                              />
                              <div className="font-weight-bold text-black">
                                Reports
                              </div>
                              <div className="font-size-md mb-1 text-black-50">
                                Monthly Stats
                              </div>
                            </Button>
                          </Grid>
                          <Grid item sm={6}>
                            <Button
                              variant="text"
                              className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                              <FontAwesomeIcon
                                icon={['far', 'file-excel']}
                                className="h2 d-block mx-auto mb-2 mt-1 text-success"
                              />
                              <div className="font-weight-bold text-black">
                                Statistics
                              </div>
                              <div className="font-size-md mb-1 text-black-50">
                                Customers stats
                              </div>
                            </Button>
                          </Grid>
                          <Grid item sm={6}>
                            <Button
                              variant="text"
                              className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                              <FontAwesomeIcon
                                icon={['far', 'eye']}
                                className="h2 d-block mb-2 mx-auto mt-1 text-success"
                              />
                              <div className="font-weight-bold text-black">
                                Projects
                              </div>
                              <div className="font-size-md mb-1 text-black-50">
                                Manage servers
                              </div>
                            </Button>
                          </Grid>
                          <Grid item sm={6}>
                            <Button
                              variant="text"
                              className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                              <FontAwesomeIcon
                                icon={['far', 'chart-bar']}
                                className="h2 d-block mx-auto mb-2 mt-1 text-success"
                              />
                              <div className="font-weight-bold text-black">
                                Tasks
                              </div>
                              <div className="font-size-md mb-1 text-black-50">
                                Pending items
                              </div>
                            </Button>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </Menu>
                </div>
              </div>
              <div className="px-5 pt-5 pb-2">
                <h1 className="display-2 font-weight-bold mb-4">
                  $
                  <span className="pl-1">
                    <CountUp
                      start={0}
                      end={477.693}
                      duration={4}
                      separator=""
                      decimals={3}
                      decimal=","
                      prefix=""
                      suffix=""
                    />
                  </span>
                </h1>
                <Grid container spacing={6}>
                  <Grid item sm={4}>
                    <div>
                      <span className="font-size-xl font-weight-bold">76%</span>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={76}
                      className="progress-animated-alt progress-bar-rounded progress-sm mb-2 progress-bar-success"
                    />
                    <div className="text-dark">Orders</div>
                  </Grid>
                  <Grid item sm={4}>
                    <div>
                      <span className="font-size-xl font-weight-bold">34%</span>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={34}
                      className="progress-bar-danger progress-bar-rounded progress-sm mb-2"
                    />
                    <div className="text-dark">Deliveries</div>
                  </Grid>
                  <Grid item sm={4}>
                    <div>
                      <span className="font-size-xl font-weight-bold">49%</span>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={49}
                      className="progress-bar-warning progress-bar-rounded progress-sm mb-2"
                    />
                    <div className="text-dark">Products</div>
                  </Grid>
                </Grid>
              </div>
              <div>
                <Chart
                  options={chartDashboardAnalytics2Options}
                  series={chartDashboardAnalytics2Data}
                  type="area"
                  height={194}
                />
              </div>
              <div className="card-footer p-3 text-center">
                <Button
                  size="small"
                  className="btn-outline-second"
                  variant="text">
                  <span className="btn-wrapper--label">
                    View complete report
                  </span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                  </span>
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
