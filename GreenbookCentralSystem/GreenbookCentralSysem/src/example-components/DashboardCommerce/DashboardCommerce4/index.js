import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, CardContent, Button, List } from '@material-ui/core';

import Chart from 'react-apexcharts';
import { Line } from 'react-chartjs-2';
import CountUp from 'react-countup';
import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import PerfectScrollbar from 'react-perfect-scrollbar';

const chartDashboardCommerce4B = {
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
const chartDashboardCommerce4BOptions = {
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
  const chartDashboardCommerce4AOptions = {
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
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '60%'
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    colors: ['#3c44b1', 'rgba(122, 123, 151, 0.4)'],
    fill: {
      opacity: 1
    },
    legend: {
      show: false
    },
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Last Week',
      'Last Month',
      'Last Year',
      'Last Decade'
    ],
    xaxis: {
      crosshairs: {
        width: 1
      }
    },
    yaxis: {
      min: 0
    }
  };
  const chartDashboardCommerce4AData = [
    {
      name: 'Net Profit',
      data: [2.3, 3.1, 4.0, 3.8, 5.1, 3.6, 4.0, 3.8, 5.1, 3.6, 3.2]
    },
    {
      name: 'Net Loss',
      data: [2.1, 2.1, 3.0, 2.8, 4.0, 3.8, 5.1, 3.6, 4.1, 2.6, 1.2]
    }
  ];

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={6}>
          <Card className="card-box">
            <div className="card-header pr-2">
              <div className="card-header--title py-2 font-size-lg font-weight-bold">
                Top sellers
              </div>
              <div className="card-header--actions">
                <Button size="small" className="btn-neutral-primary mr-3">
                  View all
                </Button>
              </div>
            </div>
            <div className="px-4 pt-4 bg-secondary">
              <div className="align-box-row">
                <div className="font-weight-bold">
                  <small className="text-black-50 d-block mt-2 mb-2 text-uppercase font-weight-bold">
                    New Accounts
                  </small>
                  <span className="font-size-xxl ">45,372</span>
                </div>
                <div className="ml-auto">
                  <div className="bg-white text-center text-primary font-size-xl d-50 rounded-circle">
                    <FontAwesomeIcon icon={['far', 'lightbulb']} />
                  </div>
                </div>
              </div>
              <div className="mt-1">
                <FontAwesomeIcon
                  icon={['fas', 'arrow-up']}
                  className="text-danger"
                />
                <span className="text-success px-1">15.4%</span>
                <span className="text-black-50">increase this month</span>
              </div>
              <div>
                <Chart
                  options={chartDashboardCommerce4AOptions}
                  series={chartDashboardCommerce4AData}
                  type="bar"
                  height={130}
                />
              </div>
            </div>
            <div className="divider bg-dark opacity-3" />
            <div className="text-uppercase px-3 pt-3 pb-1 text-black-50">
              Top sellers
            </div>
            <div className="scroll-area-sm shadow-overflow rounded-bottom">
              <PerfectScrollbar>
                <List component="div" className="list-group-flush">
                  <li className="d-flex justify-content-between align-items-center py-2 pl-3 pr-4">
                    <div className="d-flex align-items-center flex-grow-1">
                      <CircularProgressbarWithChildren
                        value={32}
                        styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                        strokeWidth={6}
                        className="circular-progress-xs circular-progress-danger justify-content-center d-flex">
                        <div className="bg-danger text-white mr-3 rounded-circle d-30 btn-icon mx-auto">
                          <FontAwesomeIcon
                            icon={['fas', 'chevron-down']}
                            className="font-size-xs"
                          />
                        </div>
                      </CircularProgressbarWithChildren>
                      <div className="pb-1 pl-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Shanelle Wynn
                        </a>
                        <div>
                          <div className="font-size-sm mt-1 badge badge-neutral-dark">
                            168
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-black font-size-lg d-flex align-items-center">
                      <span className="opacity-6 pr-1">$</span>
                      <CountUp
                        start={0}
                        end={587}
                        duration={4}
                        separator=""
                        decimals={0}
                        decimal=","
                        prefix=""
                        suffix=""
                      />
                    </div>
                  </li>
                  <li className="d-flex justify-content-between align-items-center py-2 pl-3 pr-4">
                    <div className="d-flex align-items-center flex-grow-1">
                      <CircularProgressbarWithChildren
                        value={32}
                        styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                        strokeWidth={6}
                        className="circular-progress-xs circular-progress-warning justify-content-center d-flex">
                        <div className="bg-success text-white mr-3 rounded-circle d-30 btn-icon mx-auto">
                          <FontAwesomeIcon
                            icon={['fas', 'chevron-up']}
                            className="font-size-xs"
                          />
                        </div>
                      </CircularProgressbarWithChildren>
                      <div className="pb-1 pl-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Shawn Galloway
                        </a>
                        <div>
                          <div className="font-size-sm mt-1 badge badge-neutral-dark">
                            567
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-black font-size-lg d-flex align-items-center">
                      <span className="opacity-6 pr-1">$</span>
                      <CountUp
                        start={0}
                        end={3463}
                        duration={4}
                        separator=""
                        decimals={3}
                        decimal=","
                        prefix=""
                        suffix=""
                      />
                    </div>
                  </li>
                  <li className="d-flex justify-content-between align-items-center py-2 pl-3 pr-4">
                    <div className="d-flex align-items-center flex-grow-1">
                      <CircularProgressbarWithChildren
                        value={32}
                        styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                        strokeWidth={6}
                        className="circular-progress-xs circular-progress-success justify-content-center d-flex">
                        <div className="bg-success text-white mr-3 rounded-circle d-30 btn-icon mx-auto">
                          <FontAwesomeIcon
                            icon={['fas', 'arrow-up']}
                            className="font-size-xs"
                          />
                        </div>
                      </CircularProgressbarWithChildren>
                      <div className="pb-1 pl-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Latisha Allison
                        </a>
                        <div>
                          <div className="font-size-sm mt-1 badge badge-neutral-dark">
                            937
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-black font-size-lg d-flex align-items-center">
                      <span className="opacity-6 pr-1">$</span>
                      <CountUp
                        start={0}
                        end={762}
                        duration={4}
                        separator=""
                        decimals={0}
                        decimal=","
                        prefix=""
                        suffix=""
                      />
                    </div>
                  </li>
                  <li className="d-flex justify-content-between align-items-center py-2 pl-3 pr-4">
                    <div className="d-flex align-items-center flex-grow-1">
                      <CircularProgressbarWithChildren
                        value={32}
                        styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                        strokeWidth={6}
                        className="circular-progress-xs circular-progress-success justify-content-center d-flex">
                        <div className="bg-warning text-white mr-3 rounded-circle d-30 btn-icon mx-auto">
                          <FontAwesomeIcon
                            icon={['far', 'dot-circle']}
                            className="font-size-xs"
                          />
                        </div>
                      </CircularProgressbarWithChildren>
                      <div className="pb-1 pl-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Lilly-Mae White
                        </a>
                        <div>
                          <div className="font-size-sm mt-1 badge badge-neutral-dark">
                            367
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-black font-size-lg d-flex align-items-center">
                      <span className="opacity-6 pr-1">$</span>
                      <CountUp
                        start={0}
                        end={5743}
                        duration={4}
                        separator=""
                        decimals={3}
                        decimal=","
                        prefix=""
                        suffix=""
                      />
                    </div>
                  </li>
                  <li className="d-flex justify-content-between align-items-center py-2 pl-3 pr-4">
                    <div className="d-flex align-items-center flex-grow-1">
                      <CircularProgressbarWithChildren
                        value={32}
                        styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                        strokeWidth={6}
                        className="circular-progress-xs circular-progress-warning justify-content-center d-flex">
                        <div className="bg-success text-white mr-3 rounded-circle d-30 btn-icon mx-auto">
                          <FontAwesomeIcon
                            icon={['fas', 'chevron-up']}
                            className="font-size-xs"
                          />
                        </div>
                      </CircularProgressbarWithChildren>
                      <div className="pb-1 pl-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Julie Prosser
                        </a>
                        <div>
                          <div className="font-size-sm mt-1 badge badge-neutral-dark">
                            283
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-black font-size-lg d-flex align-items-center">
                      <span className="opacity-6 pr-1">$</span>
                      <CountUp
                        start={0}
                        end={3463}
                        duration={4}
                        separator=""
                        decimals={3}
                        decimal=","
                        prefix=""
                        suffix=""
                      />
                    </div>
                  </li>
                  <li className="d-flex justify-content-between align-items-center py-2 pl-3 pr-4">
                    <div className="d-flex align-items-center flex-grow-1">
                      <CircularProgressbarWithChildren
                        value={32}
                        styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                        strokeWidth={6}
                        className="circular-progress-xs circular-progress-danger justify-content-center d-flex">
                        <div className="bg-danger text-white mr-3 rounded-circle d-30 btn-icon mx-auto">
                          <FontAwesomeIcon
                            icon={['fas', 'chevron-down']}
                            className="font-size-xs"
                          />
                        </div>
                      </CircularProgressbarWithChildren>
                      <div className="pb-1 pl-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="...">
                          Amin Hamer
                        </a>
                        <div>
                          <div className="font-size-sm mt-1 badge badge-neutral-dark">
                            793
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-black font-size-lg d-flex align-items-center">
                      <span className="opacity-6 pr-1">$</span>
                      <CountUp
                        start={0}
                        end={1587}
                        duration={6}
                        delay={2}
                        separator=""
                        decimals={3}
                        decimal=","
                      />
                    </div>
                  </li>
                </List>
              </PerfectScrollbar>
            </div>
          </Card>
        </Grid>
        <Grid item xl={6}>
          <Card className="card-box">
            <div className="card-header">
              <h4 className="font-size-lg mb-0 py-2 font-weight-bold">
                Reports
              </h4>
            </div>
            <CardContent className="pb-0">
              <Grid container spacing={0}>
                <Grid item md={6}>
                  <div className="divider-v divider-v-md" />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div>
                      <b>Reports</b>
                      <div className="text-black-50">Monthly sales</div>
                    </div>
                    <div className="font-weight-bold text-danger font-size-xl">
                      <CountUp
                        start={0}
                        end={2.363}
                        duration={6}
                        delay={2}
                        separator=""
                        decimals={3}
                        decimal=","
                      />
                    </div>
                  </div>
                  <div className="divider" />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div>
                      <b>User</b>
                      <div className="text-black-50">Weekly visitors</div>
                    </div>
                    <div className="font-weight-bold text-success font-size-xl">
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
                  </div>
                  <div className="divider" />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div>
                      <b>Sales</b>
                      <div className="text-black-50">Weekly report</div>
                    </div>
                    <div className="font-weight-bold text-warning font-size-xl">
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
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div>
                      <b>Stats</b>
                      <div className="text-black-50">YoY targets</div>
                    </div>
                    <div className="font-weight-bold text-warning font-size-xl">
                      $1,23M
                    </div>
                  </div>
                  <div className="divider" />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div>
                      <b>Payments</b>
                      <div className="text-black-50">Current Expenses</div>
                    </div>
                    <div className="font-weight-bold text-danger font-size-xl">
                      - $12,35
                    </div>
                  </div>
                  <div className="divider" />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div>
                      <b>Orders</b>
                      <div className="text-black-50">Products ordered</div>
                    </div>
                    <div className="font-weight-bold text-warning font-size-xl">
                      65
                    </div>
                  </div>
                </Grid>
              </Grid>
              <div className="card-footer rounded bg-secondary border-0 my-3 p-4 text-center">
                <Button size="small" className="hover-scale-lg btn-second">
                  <span className="btn-wrapper--label">View details</span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                  </span>
                </Button>
              </div>
            </CardContent>
            <div className="sparkline-full-wrapper">
              <Line
                data={chartDashboardCommerce4B}
                options={chartDashboardCommerce4BOptions}
              />
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
