import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

import CountUp from 'react-countup';
import Chart from 'react-apexcharts';

export default function LivePreviewExample() {
  const chartsSmall2AOptions = {
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
      color: '#f4772e',
      curve: 'smooth',
      width: 2
    },
    colors: ['#f4772e'],
    fill: {
      color: '#f4772e'
    },
    legend: {
      show: false
    },
    tooltip: {
      enabled: false
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
  const chartsSmall2AData = [
    {
      name: 'Sales',
      data: [32, 52, 45, 32, 54, 56, 28, 25, 36, 62]
    }
  ];

  const chartsSmall2BOptions = {
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
        columnWidth: '70%'
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
      'Sunday'
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
  const chartsSmall2BData = [
    {
      name: 'Net Profit',
      data: [2.3, 3.1, 4.0, 3.8, 5.1, 3.6, 3.2]
    },
    {
      name: 'Net Loss',
      data: [2.1, 2.1, 3.0, 2.8, 4.1, 2.6, 1.2]
    }
  ];

  const chartsSmall2COptions = {
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
      color: '#1bc943',
      curve: 'smooth',
      width: 2
    },
    colors: ['#1bc943'],
    fill: {
      color: '#1bc943',
      opacity: 0.3
    },
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
  const chartsSmall2CData = [
    {
      name: 'New accounts per day',
      data: [47, 45, 54, 38, 56, 24, 65]
    }
  ];
  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={4} lg={12} xl={4}>
          <Card className="card-box">
            <div className="card-content-overlay text-center py-4">
              <div className="d-60 rounded-circle bg-warning text-white btn-icon mx-auto text-center">
                <FontAwesomeIcon
                  icon={['far', 'bell']}
                  className="font-size-xxl"
                />
              </div>
              <div className="font-weight-bold display-2 mt-3">684,21</div>
              <div className="text-black-50 font-size-lg pb-3">
                Laptops sales
              </div>
              <div className="text-success font-weight-bold">+ 145%</div>
            </div>
            <div className="card-chart-overlay">
              <div>
                <Chart
                  options={chartsSmall2AOptions}
                  series={chartsSmall2AData}
                  type="area"
                  height={150}
                />
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item md={4} lg={12} xl={4}>
          <Card className="card-box">
            <div className="card-content-overlay text-center py-4">
              <div className="d-60 rounded-circle bg-first text-white btn-icon mx-auto text-center">
                <FontAwesomeIcon
                  icon={['far', 'lightbulb']}
                  className="font-size-xxl"
                />
              </div>
              <div className="font-weight-bold display-2 mt-3">
                <CountUp
                  start={0}
                  end={235.28}
                  duration={6}
                  delay={2}
                  separator=""
                  decimals={2}
                  decimal=","
                />
              </div>
              <div className="text-black-50 font-size-lg pb-3">Total sales</div>
              <div className="text-black">
                Down by <b className="text-danger">23%</b> last quarter
              </div>
            </div>
            <div className="card-chart-overlay opacity-1">
              <Chart
                options={chartsSmall2BOptions}
                series={chartsSmall2BData}
                type="bar"
                height={211}
              />
            </div>
          </Card>
        </Grid>
        <Grid item md={4} lg={12} xl={4}>
          <Card className="card-box">
            <div className="card-content-overlay text-center py-4">
              <div className="d-50 rounded-circle bg-success text-white btn-icon mx-auto text-center">
                <FontAwesomeIcon
                  icon={['far', 'user']}
                  className="font-size-xxl"
                />
              </div>
              <div className="font-weight-bold display-2 mt-3">
                <CountUp
                  start={0}
                  end={458.58}
                  duration={6}
                  delay={2}
                  separator=""
                  decimals={2}
                  decimal=","
                />
              </div>
              <div className="text-black-50 font-size-lg pb-3">
                New accounts
              </div>
              <div className="badge badge-warning h-auto py-1 font-size-xs px-4">
                24% down
              </div>
            </div>
            <div className="card-chart-overlay opacity-2">
              <Chart
                options={chartsSmall2COptions}
                series={chartsSmall2CData}
                type="area"
                height={196}
              />
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
