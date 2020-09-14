import React from 'react';

import { Grid, Card, CardContent, Button } from '@material-ui/core';

import CountUp from 'react-countup';
import { Line } from 'react-chartjs-2';

const chartDashboardStatistics5A = {
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
const chartDashboardStatistics5AOptions = {
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

const chartDashboardStatistics5B = {
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
const chartDashboardStatistics5BOptions = {
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

const chartDashboardStatistics5C = {
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
const chartDashboardStatistics5COptions = {
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
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={4}>
            <Card className="card-box">
              <CardContent>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="font-weight-bold font-size-md m-0">
                    Bandwidth allocation
                  </div>
                  <div>
                    <Button size="small" className="btn-neutral-success">
                      Export
                    </Button>
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
              <div className="sparkline-full-wrapper">
                <Line
                  data={chartDashboardStatistics5B}
                  options={chartDashboardStatistics5BOptions}
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
                    <Button size="small" className="btn-neutral-danger">
                      Export
                    </Button>
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
                  <span className="text-black-50">
                    Returning clients reports
                  </span>
                </div>
              </CardContent>
              <div className="sparkline-full-wrapper">
                <Line
                  data={chartDashboardStatistics5A}
                  options={chartDashboardStatistics5AOptions}
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
                  <Button size="small" className="btn-neutral-warning">
                    Export
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
                      decimals={3}
                      decimal=","
                    />
                  </span>
                  <span className="text-warning opacity-7">
                    Pending services integrations
                  </span>
                </div>
              </CardContent>
              <div className="sparkline-full-wrapper">
                <Line
                  data={chartDashboardStatistics5C}
                  options={chartDashboardStatistics5COptions}
                />
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
