import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Card,
  CardContent,
  Menu,
  Button,
  List,
  ListItem
} from '@material-ui/core';

import CountUp from 'react-countup';
import { Line } from 'react-chartjs-2';

const chartSparklinesSmall6Danger = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August'
  ],
  datasets: [
    {
      backgroundColor: 'rgba(248, 50, 69, 0.1)',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 2,
      borderColor: '#f83245',
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#f83245',
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#f83245',
      pointHoverBorderWidth: 0,
      pointRadius: 0,
      pointHitRadius: 0,
      data: [80, 81, 55, 65, 38, 53, 59, 77, 48],
      datalabels: {
        display: false
      }
    }
  ]
};
const chartSparklinesSmall6DangerOptions = {
  layout: {
    padding: {
      left: -10,
      right: 0,
      top: 0,
      bottom: -10
    }
  },
  scales: {
    yAxes: [
      {
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ]
  },
  legend: {
    display: false
  },
  responsive: true,
  maintainAspectRatio: false
};

const chartSparklinesSmall6Success = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August'
  ],
  datasets: [
    {
      backgroundColor: 'rgba(27, 201, 67, 0.1)',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 2,
      borderColor: '#1bc943',
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#1bc943',
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#1bc943',
      pointHoverBorderWidth: 0,
      pointRadius: 0,
      pointHitRadius: 0,
      data: [65, 59, 80, 81, 55, 38, 59, 80, 46],
      datalabels: {
        display: false
      }
    }
  ]
};
const chartSparklinesSmall6SuccessOptions = {
  layout: {
    padding: {
      left: -10,
      right: 0,
      top: 0,
      bottom: -10
    }
  },
  scales: {
    yAxes: [
      {
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ]
  },
  legend: {
    display: false
  },
  responsive: true,
  maintainAspectRatio: false
};

const chartSparklinesSmall6Warning = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August'
  ],
  datasets: [
    {
      backgroundColor: 'rgba(244, 119, 46, 0.1)',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 2,
      borderColor: '#f4772e',
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#f4772e',
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#f4772e',
      pointHoverBorderWidth: 0,
      pointRadius: 0,
      pointHitRadius: 0,
      data: [80, 81, 55, 65, 38, 53, 59, 77, 48],
      datalabels: {
        display: false
      }
    }
  ]
};
const chartSparklinesSmall6WarningOptions = {
  layout: {
    padding: {
      left: -10,
      right: 0,
      top: 0,
      bottom: -10
    }
  },
  scales: {
    yAxes: [
      {
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ]
  },
  legend: {
    display: false
  },
  responsive: true,
  maintainAspectRatio: false
};

export default function LivePreviewExample() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={4}>
          <Card className="card-box">
            <CardContent>
              <div className="d-flex align-items-center justify-content-between">
                <div className="font-weight-bold font-size-md m-0">
                  Bandwidth allocation
                </div>
                <div>
                  <Button
                    onClick={handleClick}
                    size="small"
                    className="btn-neutral-dark">
                    Export
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-down']}
                      className="opacity-8 font-size-xs ml-2"
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
                    <div className="dropdown-menu-xl">
                      <List
                        component="div"
                        className="nav-pills nav-neutral-dark flex-column px-3">
                        <ListItem
                          component="a"
                          button
                          href="#/"
                          onClick={(e) => e.preventDefault()}>
                          <span>View all reports</span>
                        </ListItem>
                        <ListItem
                          component="a"
                          button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          selected>
                          <span>View active items</span>
                          <div className="badge badge-pill badge-success ml-auto">
                            23
                          </div>
                        </ListItem>
                        <ListItem
                          component="a"
                          button
                          href="#/"
                          onClick={(e) => e.preventDefault()}>
                          <div className="nav-link-icon">
                            <FontAwesomeIcon icon={['fas', 'download']} />
                          </div>
                          <span>Download</span>
                        </ListItem>
                        <ListItem
                          component="a"
                          button
                          href="#/"
                          onClick={(e) => e.preventDefault()}>
                          <div className="nav-link-icon">
                            <FontAwesomeIcon icon={['far', 'file-excel']} />
                          </div>
                          <span>Export to CSV</span>
                        </ListItem>
                      </List>
                    </div>
                  </Menu>
                </div>
              </div>
              <div className="mt-5">
                <span className="display-3 text-primary font-weight-bold d-block">
                  12,56k
                </span>
                <span className="text-black-50">
                  Successful production deployments
                </span>
              </div>
            </CardContent>
            <div className="sparkline-full-wrapper sparkline-full-wrapper--sm">
              <Line
                data={chartSparklinesSmall6Success}
                options={chartSparklinesSmall6SuccessOptions}
              />
            </div>
          </Card>
        </Grid>
        <Grid item xl={4}>
          <Card className="card-box">
            <CardContent>
              <div className="d-flex align-items-center justify-content-between">
                <div className="font-weight-bold font-size-md m-0">
                  Production servers
                </div>
                <div>
                  <Button
                    onClick={handleClick}
                    size="small"
                    className="btn-neutral-danger">
                    Export
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-down']}
                      className="opacity-8 font-size-xs ml-2"
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
                    <div className="dropdown-menu-xl">
                      <List
                        component="div"
                        className="nav-pills nav-neutral-success flex-column px-3">
                        <ListItem
                          component="a"
                          button
                          href="#/"
                          onClick={(e) => e.preventDefault()}>
                          <span>View all reports</span>
                        </ListItem>
                        <ListItem
                          component="a"
                          button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          selected>
                          <span>View active items</span>
                          <div className="badge badge-pill badge-success ml-auto">
                            23
                          </div>
                        </ListItem>
                        <ListItem
                          component="a"
                          button
                          href="#/"
                          onClick={(e) => e.preventDefault()}>
                          <div className="nav-link-icon">
                            <FontAwesomeIcon icon={['fas', 'download']} />
                          </div>
                          <span>Download</span>
                        </ListItem>
                        <ListItem
                          component="a"
                          button
                          href="#/"
                          onClick={(e) => e.preventDefault()}>
                          <div className="nav-link-icon">
                            <FontAwesomeIcon icon={['far', 'file-excel']} />
                          </div>
                          <span>Export to CSV</span>
                        </ListItem>
                      </List>
                    </div>
                  </Menu>
                </div>
              </div>
              <div className="mt-5">
                <span className="display-3 text-danger font-weight-bold d-block">
                  <CountUp
                    start={0}
                    end={35}
                    duration={6}
                    delay={2}
                    separator=""
                    prefix="+"
                    suffix="%"
                    decimals={0}
                    decimal=","
                  />
                </span>
                <span className="text-black-50">Returning clients reports</span>
              </div>
            </CardContent>
            <div className="sparkline-full-wrapper">
              <Line
                data={chartSparklinesSmall6Danger}
                options={chartSparklinesSmall6DangerOptions}
              />
            </div>
          </Card>
        </Grid>
        <Grid item xl={4}>
          <Card className="card-box">
            <CardContent>
              <div className="d-flex align-items-center justify-content-between">
                <div className="font-weight-bold font-size-md m-0">
                  Returning customers
                </div>
                <Button
                  size="small"
                  className="btn-first text-uppercase font-weight-bold font-size-xs">
                  <FontAwesomeIcon
                    icon={['far', 'chart-bar']}
                    className="opacity-8 mr-1"
                  />
                  Generate
                </Button>
              </div>
              <div className="mt-5">
                <span className="display-3 text-warning font-weight-bold d-block">
                  <CountUp
                    start={0}
                    end={1.253}
                    duration={6}
                    delay={2}
                    separator=""
                    prefix="+"
                    suffix="%"
                    decimals={3}
                    decimal=","
                  />
                </span>
                <span className="text-warning opacity-7">
                  Pending services integrations
                </span>
              </div>
            </CardContent>
            <div className="sparkline-full-wrapper sparkline-full-wrapper--lg">
              <Line
                data={chartSparklinesSmall6Warning}
                options={chartSparklinesSmall6WarningOptions}
              />
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
