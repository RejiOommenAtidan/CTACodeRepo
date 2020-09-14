import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, CardContent, Button } from '@material-ui/core';

import Chart from 'react-apexcharts';

export default function LivePreviewExample() {
  const chartSparklinesLarge1AOptions = {
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
    colors: ['#3c44b1'],
    stroke: {
      color: '#4191ff',
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
  const chartSparklinesLarge1AData = [
    {
      name: 'Customers',
      data: [47, 38, 56, 24, 45, 54, 38, 47, 38, 56, 24, 56, 24, 65]
    }
  ];

  const chartSparklinesLarge1BOptions = {
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
    colors: ['#1bc943'],
    stroke: {
      color: '#1bc943',
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
  const chartSparklinesLarge1BData = [
    {
      name: 'Sales',
      data: [38, 44, 47, 38, 57, 38, 51, 27, 22, 45, 54, 56]
    }
  ];

  const chartSparklinesLarge1COptions = {
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
    colors: ['#f4772e'],
    stroke: {
      color: '#4191ff',
      curve: 'smooth',
      width: 3
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
  const chartSparklinesLarge1CData = [
    {
      name: 'Sales',
      data: [47, 38, 56, 24, 45, 54, 38, 47, 38, 56, 24, 56, 24, 65]
    }
  ];

  const chartSparklinesLarge1DOptions = {
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
    colors: ['#f83245'],
    stroke: {
      color: '#f83245',
      curve: 'smooth',
      width: 3
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
  const chartSparklinesLarge1DData = [
    {
      name: 'Transactions',
      data: [33, 65, 45, 27, 53, 48, 38, 54, 32, 37, 24, 32, 46, 54]
    }
  ];

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={6}>
          <Card className="card-box">
            <CardContent className="p-0">
              <div className="p-4">
                <Grid container spacing={0}>
                  <Grid item sm={4}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'user']}
                          className="font-size-xxl text-success"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg">2,345</b>
                        <span className="text-black-50 d-block">users</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={4}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'keyboard']}
                          className="font-size-xxl text-danger"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg">3,568</b>
                        <span className="text-black-50 d-block">clicks</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={4}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'chart-bar']}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg">$9,693</b>
                        <span className="text-black-50 d-block">revenue</span>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className="divider" />
              <div className="text-center py-4">
                <Button size="small" color="primary" variant="contained">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['far', 'eye']} />
                  </span>
                  <span className="btn-wrapper--label">Generate reports</span>
                </Button>
              </div>
            </CardContent>
            <div className="divider" />
            <div className="card-footer border-0 bg-light text-center">
              <div className="pt-4 px-4">
                <Chart
                  options={chartSparklinesLarge1AOptions}
                  series={chartSparklinesLarge1AData}
                  type="line"
                  height={100}
                />
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xl={6}>
          <Card className="card-box">
            <CardContent className="p-0">
              <div className="p-4">
                <Grid container spacing={0}>
                  <Grid item sm={6}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'user']}
                          className="font-size-xxl text-success"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg">2,345</b>
                        <span className="text-black-50 d-block">users</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={6}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'chart-bar']}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg">$9,693</b>
                        <span className="text-black-50 d-block">revenue</span>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className="divider" />
              <div className="text-center bg-secondary py-4">
                <Button size="small" className="btn-success">
                  <span className="btn-wrapper--label">View recent sales</span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                  </span>
                </Button>
              </div>
            </CardContent>
            <div className="divider" />
            <div className="card-footer border-0 bg-white text-center">
              <div className="pt-4 px-4">
                <Chart
                  options={chartSparklinesLarge1BOptions}
                  series={chartSparklinesLarge1BData}
                  type="line"
                  height={100}
                />
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xl={6}>
          <Card className="card-box">
            <CardContent className="pb-1">
              <Grid container spacing={0}>
                <Grid item sm={4}>
                  <div className="text-center">
                    <div>
                      <FontAwesomeIcon
                        icon={['far', 'user']}
                        className="font-size-xxl text-success"
                      />
                    </div>
                    <div className="mt-3 line-height-sm">
                      <b className="font-size-lg">2,345</b>
                      <span className="text-black-50 d-block">users</span>
                    </div>
                  </div>
                </Grid>
                <Grid item sm={4}>
                  <div className="text-center">
                    <div>
                      <FontAwesomeIcon
                        icon={['far', 'keyboard']}
                        className="font-size-xxl text-danger"
                      />
                    </div>
                    <div className="mt-3 line-height-sm">
                      <b className="font-size-lg">3,568</b>
                      <span className="text-black-50 d-block">clicks</span>
                    </div>
                  </div>
                </Grid>
                <Grid item sm={4}>
                  <div className="text-center">
                    <div>
                      <FontAwesomeIcon
                        icon={['far', 'chart-bar']}
                        className="font-size-xxl text-info"
                      />
                    </div>
                    <div className="mt-3 line-height-sm">
                      <b className="font-size-lg">$9,693</b>
                      <span className="text-black-50 d-block">revenue</span>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <div className="pt-4 px-4">
                <Chart
                  options={chartSparklinesLarge1COptions}
                  series={chartSparklinesLarge1CData}
                  type="line"
                  height={100}
                />
              </div>
            </CardContent>
            <div className="divider" />
            <div className="my-2 text-center">
              <FontAwesomeIcon
                icon={['fas', 'arrow-down']}
                className="text-danger"
              />
              <span className="text-danger px-1">-15.4%</span>
              <span className="text-black-50">new sales today</span>
            </div>
            <div className="divider" />
            <div className="card-footer border-0 bg-light p-4 text-center">
              <Button className="btn-first btn-pill hover-scale-sm px-4">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'download']} />
                </span>
                <span className="btn-wrapper--label">Create Report</span>
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xl={6}>
          <Card className="card-box">
            <CardContent className="pb-1">
              <Grid container spacing={6}>
                <Grid item sm={6}>
                  <div className="text-center">
                    <div>
                      <FontAwesomeIcon
                        icon={['far', 'user']}
                        className="font-size-xxl text-success"
                      />
                    </div>
                    <div className="mt-3 line-height-sm">
                      <b className="font-size-lg">2,345</b>
                      <span className="text-black-50 d-block">users</span>
                    </div>
                  </div>
                </Grid>
                <Grid item sm={6}>
                  <div className="text-center">
                    <div>
                      <FontAwesomeIcon
                        icon={['far', 'chart-bar']}
                        className="font-size-xxl text-info"
                      />
                    </div>
                    <div className="mt-3 line-height-sm">
                      <b className="font-size-lg">$9,693</b>
                      <span className="text-black-50 d-block">revenue</span>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <div className="pt-4 px-4">
                <Chart
                  options={chartSparklinesLarge1DOptions}
                  series={chartSparklinesLarge1DData}
                  type="line"
                  height={100}
                />
              </div>
            </CardContent>
            <div className="divider" />
            <div className="py-2 bg-secondary text-center">
              <FontAwesomeIcon
                icon={['fas', 'arrow-up']}
                className="text-success"
              />
              <span className="text-success px-1">+24.6%</span>
              <span className="text-black-50">transactions</span>
            </div>
            <div className="divider" />
            <div className="card-footer border-0 bg-white p-4 text-center">
              <Button className="btn-danger btn-pill hover-scale-sm px-4">
                <span className="btn-wrapper--label">View latest sales</span>
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
