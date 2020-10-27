import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

import Chart from 'react-apexcharts';

export default function LivePreviewExample() {
  const chartSparklinesSmall3AOptions = {
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
        startingShape: 'rounded',
        endingShape: 'rounded',
        columnWidth: '60%'
      }
    },
    colors: ['#f4772e'],
    fill: {
      opacity: 1
    },
    stroke: {
      color: '#f4772e',
      width: 0
    },
    legend: {
      show: false
    },
    markers: {
      size: 0
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
  const chartSparklinesSmall3AData = [
    {
      name: 'Orders',
      data: [47, 38, 56, 24, 56, 24, 65]
    }
  ];

  const chartSparklinesSmall3BOptions = {
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
        startingShape: 'rounded',
        endingShape: 'rounded',
        columnWidth: '60%'
      }
    },
    colors: ['#1bc943'],
    fill: {
      opacity: 1
    },
    stroke: {
      color: '#1bc943',
      width: 3
    },
    legend: {
      show: false
    },
    markers: {
      size: 0
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
  const chartSparklinesSmall3BData = [
    {
      name: 'Orders',
      data: [0, 10, 22, 46, 47, 26, 24, 45]
    }
  ];

  const chartSparklinesSmall3COptions = {
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
    colors: ['#4191ff'],
    stroke: {
      color: '#4191ff',
      width: 3
    },
    markers: {
      size: 0
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
  const chartSparklinesSmall3CData = [
    {
      name: 'Orders',
      data: [0, 7, 18, 28, 23, 24, 65, 43]
    }
  ];

  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={3} md={6}>
            <Card className="px-3 pt-3">
              <div className="d-flex justify-content-between">
                <div className="pr-4 flex-grow-1 text-nowrap">
                  <div className="text-uppercase font-weight-bold font-size-xs opacity-8 mb-2">
                    Customers
                  </div>
                  <div className="font-weight-bold">
                    <div className="font-size-xxl mb-1">345</div>
                    <div className="text-success">
                      <span>54%</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-up']}
                        className="ml-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center pt-2 px-2">
                  <Chart
                    options={chartSparklinesSmall3AOptions}
                    series={chartSparklinesSmall3AData}
                    type="bar"
                    height={104}
                  />
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xl={3} md={6}>
            <Card className="pl-3 pt-3">
              <div className="d-flex justify-content-between">
                <div className="pr-4 flex-grow-1 text-nowrap">
                  <div className="text-uppercase font-weight-bold font-size-xs opacity-8 mb-2">
                    Orders
                  </div>
                  <div className="font-weight-bold">
                    <div className="font-size-xxl mb-1">254</div>
                    <div className="text-success">
                      <span>67%</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-up']}
                        className="ml-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center pt-2">
                  <Chart
                    options={chartSparklinesSmall3BOptions}
                    series={chartSparklinesSmall3BData}
                    type="area"
                    height={104}
                  />
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xl={3} md={6}>
            <Card className="px-3 pt-3">
              <div className="d-flex justify-content-between">
                <div className="pr-4 flex-grow-1 text-nowrap">
                  <div className="text-uppercase font-weight-bold font-size-xs opacity-8 mb-2">
                    Growth
                  </div>
                  <div className="font-weight-bold">
                    <div className="font-size-xxl mb-1">$456</div>
                    <div className="text-danger">
                      <span>32%</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-down']}
                        className="ml-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center pt-2 px-2">
                  <Chart
                    options={chartSparklinesSmall3BOptions}
                    series={chartSparklinesSmall3BData}
                    type="bar"
                    height={104}
                  />
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xl={3} md={6}>
            <Card className="pl-3 pt-3">
              <div className="d-flex justify-content-between">
                <div className="pr-4 flex-grow-1 text-nowrap">
                  <div className="text-uppercase font-weight-bold font-size-xs opacity-8 mb-2">
                    Expenses
                  </div>
                  <div className="font-weight-bold">
                    <div className="font-size-xxl mb-1">$674</div>
                    <div className="text-danger">
                      <span>21%</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-down']}
                        className="ml-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center pt-2">
                  <Chart
                    options={chartSparklinesSmall3COptions}
                    series={chartSparklinesSmall3CData}
                    type="area"
                    height={104}
                  />
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
