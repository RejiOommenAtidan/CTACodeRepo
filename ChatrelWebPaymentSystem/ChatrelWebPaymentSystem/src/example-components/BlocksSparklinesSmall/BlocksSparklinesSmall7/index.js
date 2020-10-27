import React from 'react';

import { Grid, Card } from '@material-ui/core';

import Chart from 'react-apexcharts';

export default function LivePreviewExample() {
  const chart18Options = {
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
      'Sunday',
      'Last Week',
      'Last Month'
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
  const chart18Data = [
    {
      name: 'Net Profit',
      data: [2.3, 3.1, 4.0, 3.8, 5.1, 3.1, 4.0, 3.8, 3.6, 3.2]
    },
    {
      name: 'Net Loss',
      data: [2.1, 2.1, 3.0, 2.8, 4.1, 2.6, 2.8, 4.1, 3.0, 1.2]
    }
  ];

  const chart33Options = {
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
      color: '#4191ff'
    },
    colors: ['#4191ff'],
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
  const chart33Data = [
    {
      name: 'New accounts per day',
      data: [47, 45, 54, 38, 56, 24, 65]
    }
  ];

  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <Card className="card-box">
            <div className="card-header-alt px-4 pt-4 pb-0">
              <h6 className="font-weight-bold font-size-lg mb-1 text-black">
                Weekly Sales
              </h6>
              <p className="text-black-50 mb-0">
                Reports for what we sold this week.
              </p>
            </div>
            <div className="px-4">
              <Chart
                options={chart18Options}
                series={chart18Data}
                type="bar"
                height={211}
              />
            </div>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card className="card-box">
            <div className="card-header-alt px-4 pt-4 pb-0">
              <h6 className="font-weight-bold font-size-lg mb-1 text-black">
                New Accounts
              </h6>
              <p className="text-black-50 mb-3">
                There were <b className="text-success">23</b> new accounts
                created.
              </p>
            </div>
            <div className="sparkline-full-wrapper h-auto">
              <Chart
                options={chart33Options}
                series={chart33Data}
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
