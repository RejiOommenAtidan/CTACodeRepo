import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, LinearProgress, Card, Button } from '@material-ui/core';

import Chart from 'react-apexcharts';

export default function LivePreviewExample() {
  const chartDashboardStatistics3AOptions = {
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
    colors: ['rgba(255,255,255,.75)'],
    stroke: {
      color: 'rgba(255,255,255,.75)',
      curve: 'smooth',
      width: 4
    },
    xaxis: {
      crosshairs: {
        width: 1
      }
    },
    yaxis: {
      min: 0
    },
    legend: {
      show: false
    }
  };
  const chartDashboardStatistics3AData = [
    {
      name: 'Orders',
      data: [47, 54, 38, 56, 25, 19, 56, 27, 45, 54, 38, 26, 56, 65]
    }
  ];

  const chartDashboardStatistics3BOptions = {
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
    markers: {
      size: 0
    },
    colors: ['#f4772e'],
    stroke: {
      color: '#4191ff',
      width: 3
    },
    legend: {
      show: false
    },
    xaxis: {
      crosshairs: {
        width: 0
      }
    },
    yaxis: {
      min: 0
    }
  };
  const chartDashboardStatistics3BData = [
    {
      name: 'Orders',
      data: [47, 38, 56, 24, 56, 24, 65]
    }
  ];

  const chartDashboardStatistics3COptions = {
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
    markers: {
      size: 0
    },
    colors: ['#11c5db'],
    stroke: {
      color: '#11c5db',
      width: 3
    },
    legend: {
      show: false
    },
    xaxis: {
      crosshairs: {
        width: 0
      }
    },
    yaxis: {
      min: 0
    }
  };
  const chartDashboardStatistics3CData = [
    {
      name: 'Orders',
      data: [38, 44, 56, 47, 26, 24, 45]
    }
  ];

  const chartDashboardStatistics3DOptions = {
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
    markers: {
      size: 0
    },
    colors: ['#1bc943'],
    stroke: {
      color: '#1bc943',
      width: 3
    },
    legend: {
      show: false
    },
    xaxis: {
      crosshairs: {
        width: 0
      }
    },
    yaxis: {
      min: 0
    }
  };
  const chartDashboardStatistics3DData = [
    {
      name: 'Ethereum price:',
      data: [38, 43, 24, 56, 35, 56, 65]
    }
  ];

  const chartDashboardStatistics3EOptions = {
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
    markers: {
      size: 0
    },
    colors: ['#4191ff'],
    stroke: {
      color: '#4191ff',
      width: 3
    },
    legend: {
      show: false
    },
    xaxis: {
      crosshairs: {
        width: 0
      }
    },
    yaxis: {
      min: 0
    }
  };
  const chartDashboardStatistics3EData = [
    {
      name: 'Ripple price:',
      data: [33, 56, 24, 23, 24, 65, 43]
    }
  ];

  const chartDashboardStatistics3FOptions = {
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
    markers: {
      size: 0
    },
    colors: ['#f83245'],
    stroke: {
      color: '#f83245',
      width: 3
    },
    legend: {
      show: false
    },
    xaxis: {
      crosshairs: {
        width: 0
      }
    },
    yaxis: {
      min: 0
    }
  };
  const chartDashboardStatistics3FData = [
    {
      name: 'Tether price:',
      data: [32, 43, 33, 61, 23, 24, 39]
    }
  ];

  const chartDashboardStatistics3GOptions = {
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
    markers: {
      size: 0
    },
    colors: ['#070919'],
    stroke: {
      color: '#070919',
      width: 3
    },
    legend: {
      show: false
    },
    xaxis: {
      crosshairs: {
        width: 0
      }
    },
    yaxis: {
      min: 0
    }
  };
  const chartDashboardStatistics3GData = [
    {
      name: 'Litecoin price:',
      data: [24, 33, 24, 56, 23, 65, 43]
    }
  ];
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={6}>
            <Card className="card-box bg-deep-sky mb-5">
              <div className="card-header-alt d-flex justify-content-between p-4">
                <div>
                  <h6 className="font-weight-bold font-size-lg mb-1 text-white">
                    Total Orders
                  </h6>
                  <p className="text-white-50 mb-0">
                    These are the order totals for last month
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <Button className="btn-link btn-link-light text-white p-0 font-size-xl">
                    <FontAwesomeIcon
                      icon={['fas', 'ellipsis-h']}
                      className="font-size-lg"
                    />
                  </Button>
                </div>
              </div>
              <div className="divider opacity-3" />
              <div className="bg-white-10 px-3 px-lg-5 pt-2 m-0">
                <Chart
                  options={chartDashboardStatistics3AOptions}
                  series={chartDashboardStatistics3AData}
                  type="line"
                  height={190}
                />
              </div>
              <div className="divider opacity-3" />
              <div className="p-4 text-center">
                <Grid container spacing={6}>
                  <Grid item md={4}>
                    <div className="mb-1 font-weight-bold font-size-xl text-white">
                      88%
                    </div>
                    <LinearProgress
                      variant="determinate"
                      className="bg-white-10 progress-constrained progress-bar-rounded progress-bar-success"
                      value={88}
                    />
                    <div className="text-white-50 pt-2">Sales</div>
                  </Grid>
                  <Grid item md={4}>
                    <div className="mb-1 font-weight-bold font-size-xl text-white">
                      61%
                    </div>
                    <LinearProgress
                      variant="determinate"
                      className="bg-white-10 progress-constrained progress-bar-rounded progress-bar-warning"
                      value={61}
                    />
                    <div className="text-white-50 pt-2">Profiles</div>
                  </Grid>
                  <Grid item md={4}>
                    <div className="mb-1 font-weight-bold font-size-xl text-white">
                      53%
                    </div>
                    <LinearProgress
                      variant="determinate"
                      className="bg-white-10 progress-constrained progress-bar-rounded progress-bar-first"
                      value={53}
                    />
                    <div className="text-white-50 pt-2">Tickets</div>
                  </Grid>
                </Grid>
              </div>
            </Card>
          </Grid>
          <Grid item xl={6}>
            <Grid container spacing={6}>
              <Grid item lg={6}>
                <Card className="px-3 pt-3">
                  <div className="d-flex justify-content-between">
                    <div className="pr-5 flex-grow-1 text-nowrap">
                      <div className="text-uppercase text-black-50 font-weight-bold font-size-sm mb-2">
                        Bitcoin
                      </div>
                      <div className="font-weight-bold">
                        <div className="text-success">
                          <span>54%</span>
                          <FontAwesomeIcon
                            icon={['fas', 'angle-up']}
                            className="ml-2"
                          />
                        </div>
                        <div className="font-size-xl mb-0">$8,764</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center pt-2 px-3">
                      <Chart
                        options={chartDashboardStatistics3BOptions}
                        series={chartDashboardStatistics3BData}
                        type="line"
                        height={90}
                      />
                    </div>
                  </div>
                </Card>
              </Grid>
              <Grid item lg={6}>
                <Card className="px-3 pt-3">
                  <div className="d-flex justify-content-between">
                    <div className="pr-5 flex-grow-1 text-nowrap">
                      <div className="text-uppercase text-black-50 font-weight-bold font-size-sm mb-2">
                        Cardano
                      </div>
                      <div className="font-weight-bold">
                        <div className="text-success">
                          <span>67%</span>
                          <FontAwesomeIcon
                            icon={['fas', 'angle-up']}
                            className="ml-2"
                          />
                        </div>
                        <div className="font-size-xl mb-0">$6,324</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center pt-2 px-3">
                      <Chart
                        options={chartDashboardStatistics3COptions}
                        series={chartDashboardStatistics3CData}
                        type="line"
                        height={90}
                      />
                    </div>
                  </div>
                </Card>
              </Grid>
              <Grid item lg={6}>
                <Card className="px-3 pt-3">
                  <div className="d-flex justify-content-between">
                    <div className="pr-5 flex-grow-1 text-nowrap">
                      <div className="text-uppercase text-black-50 font-weight-bold font-size-sm mb-2">
                        Ethereum
                      </div>
                      <div className="font-weight-bold">
                        <div className="text-danger">
                          <span>32%</span>
                          <FontAwesomeIcon
                            icon={['fas', 'angle-down']}
                            className="ml-2"
                          />
                        </div>
                        <div className="font-size-xl mb-0">$456</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center pt-2 px-3">
                      <Chart
                        options={chartDashboardStatistics3DOptions}
                        series={chartDashboardStatistics3DData}
                        type="line"
                        height={90}
                      />
                    </div>
                  </div>
                </Card>
              </Grid>
              <Grid item lg={6}>
                <Card className="px-3 pt-3">
                  <div className="d-flex justify-content-between">
                    <div className="pr-5 flex-grow-1 text-nowrap">
                      <div className="text-uppercase text-black-50 font-weight-bold font-size-sm mb-2">
                        Ripple
                      </div>
                      <div className="font-weight-bold">
                        <div className="text-danger">
                          <span>21%</span>
                          <FontAwesomeIcon
                            icon={['fas', 'angle-down']}
                            className="ml-2"
                          />
                        </div>
                        <div className="font-size-xl mb-0">$674</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center pt-2 px-3">
                      <Chart
                        options={chartDashboardStatistics3EOptions}
                        series={chartDashboardStatistics3EData}
                        type="line"
                        height={90}
                      />
                    </div>
                  </div>
                </Card>
              </Grid>
              <Grid item lg={6}>
                <Card className="px-3 pt-3">
                  <div className="d-flex justify-content-between">
                    <div className="pr-5 flex-grow-1 text-nowrap">
                      <div className="text-uppercase text-black-50 font-weight-bold font-size-sm mb-2">
                        Tether
                      </div>
                      <div className="font-weight-bold">
                        <div className="text-success">
                          <span>15%</span>
                          <FontAwesomeIcon
                            icon={['fas', 'angle-up']}
                            className="ml-2"
                          />
                        </div>
                        <div className="font-size-xl mb-0">$12</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center pt-2 px-3">
                      <Chart
                        options={chartDashboardStatistics3FOptions}
                        series={chartDashboardStatistics3FData}
                        type="line"
                        height={90}
                      />
                    </div>
                  </div>
                </Card>
              </Grid>
              <Grid item lg={6}>
                <Card className="px-3 pt-3">
                  <div className="d-flex justify-content-between">
                    <div className="pr-5 flex-grow-1 text-nowrap">
                      <div className="text-uppercase text-black-50 font-weight-bold font-size-sm mb-2">
                        Litecoin
                      </div>
                      <div className="font-weight-bold">
                        <div className="text-warning">
                          <span>0%</span>
                          <FontAwesomeIcon
                            icon={['fas', 'angle-right']}
                            className="ml-2"
                          />
                        </div>
                        <div className="font-size-xl mb-0">76</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center pt-2 px-3">
                      <Chart
                        options={chartDashboardStatistics3GOptions}
                        series={chartDashboardStatistics3GData}
                        type="line"
                        height={90}
                      />
                    </div>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
