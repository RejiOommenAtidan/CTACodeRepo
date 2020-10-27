import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

import Chart from 'react-apexcharts';

export default function LivePreviewExample() {
  const chartSparklinesSmall2AOptions = {
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
  const chartSparklinesSmall2AData = [
    {
      name: 'Orders',
      data: [47, 38, 56, 24, 56, 24, 65]
    }
  ];

  const chartSparklinesSmall2BOptions = {
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
  const chartSparklinesSmall2BData = [
    {
      name: 'Orders',
      data: [38, 44, 56, 47, 26, 24, 45]
    }
  ];

  const chartSparklinesSmall2COptions = {
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
  const chartSparklinesSmall2CData = [
    {
      name: 'Ethereum price:',
      data: [38, 43, 24, 56, 35, 56, 65]
    }
  ];

  const chartSparklinesSmall2DOptions = {
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
  const chartSparklinesSmall2DData = [
    {
      name: 'Ripple price:',
      data: [33, 56, 24, 23, 24, 65, 43]
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
                <div className="d-flex align-items-center pt-2 px-2">
                  <Chart
                    options={chartSparklinesSmall2AOptions}
                    series={chartSparklinesSmall2AData}
                    type="line"
                    height={90}
                  />
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xl={3} md={6}>
            <Card className="px-3 pt-3">
              <div className="d-flex justify-content-between">
                <div className="pr-4 flex-grow-1 text-nowrap">
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
                <div className="d-flex align-items-center pt-2 px-2">
                  <Chart
                    options={chartSparklinesSmall2BOptions}
                    series={chartSparklinesSmall2BData}
                    type="line"
                    height={90}
                  />
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xl={3} md={6}>
            <Card className="px-3 pt-3">
              <div className="d-flex justify-content-between">
                <div className="pr-4 flex-grow-1 text-nowrap">
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
                <div className="d-flex align-items-center pt-2 px-2">
                  <Chart
                    options={chartSparklinesSmall2COptions}
                    series={chartSparklinesSmall2CData}
                    type="line"
                    height={90}
                  />
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xl={3} md={6}>
            <Card className="px-3 pt-3">
              <div className="d-flex justify-content-between">
                <div className="pr-4 flex-grow-1 text-nowrap">
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
                <div className="d-flex align-items-center pt-2 px-2">
                  <Chart
                    options={chartSparklinesSmall2DOptions}
                    series={chartSparklinesSmall2DData}
                    type="line"
                    height={90}
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
