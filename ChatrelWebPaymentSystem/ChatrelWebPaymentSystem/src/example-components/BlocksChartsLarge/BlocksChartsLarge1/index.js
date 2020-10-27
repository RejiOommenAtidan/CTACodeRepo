import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import Chart from 'react-apexcharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function LivePreviewExample() {
  const chartsLarge1Options = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: false
      },
      stacked: false
    },
    dataLabels: {
      enabled: false
    },

    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '50%'
      }
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent']
    },
    colors: ['#3c44b1', 'rgba(60, 68, 177, 0.27)'],
    fill: {
      opacity: 1
    },
    grid: {
      strokeDashArray: '5',
      borderColor: 'rgba(125, 138, 156, 0.3)'
    },
    legend: {
      show: false
    },
    labels: [
      '1 July',
      '2 July',
      '3 July',
      '4 July',
      '5 July',
      '6 July',
      '7 July',
      '8 July',
      '9 July',
      '10 July',
      '11 July'
    ],
    xaxis: {
      crosshairs: {
        width: 1
      },
      type: 'datetime'
    },
    yaxis: {
      min: 0
    }
  };
  const chartsLarge1Data = [
    {
      name: 'Local',
      data: [
        4232.3,
        3563.1,
        2564.0,
        4673.8,
        7585.1,
        4673.6,
        3454.0,
        7473.8,
        4675.1,
        4353.6,
        3653.2
      ]
    },
    {
      name: 'External',
      data: [
        2552.1,
        3462.1,
        7433.0,
        2342.8,
        8634.0,
        4823.8,
        6095.1,
        3953.6,
        8934.1,
        2392.6,
        6831.2
      ]
    }
  ];

  return (
    <>
      <Card className="card-box p-4 text-center">
        <div className="card-tr-actions">
          <Button
            variant="text"
            className="p-0 d-30 border-0 btn-transition-none text-primary"
            disableRipple>
            <FontAwesomeIcon
              icon={['fas', 'ellipsis-h']}
              className="font-size-lg"
            />
          </Button>
        </div>
        <h6 className="text-uppercase font-weight-bold mb-1 text-black">
          Visitors locations
        </h6>

        <div className="py-3">
          <Chart
            options={chartsLarge1Options}
            series={chartsLarge1Data}
            type="bar"
            height={359}
          />
        </div>

        <Grid container spacing={0}>
          <Grid
            item
            md={6}
            className="d-flex justify-content-center pb-4 pb-md-0 mb-4 mb-md-0">
            <div className="divider-v divider-v-md" />
            <div>
              <div className="line-height-normal d-flex align-items-center justify-content-center text-uppercase text-black-50 pb-3">
                <div className="badge badge-primary badge-circle mr-2">
                  Local
                </div>
                <span className="font-weight-bold text-primary font-size-xs">
                  Local Visitors
                </span>
              </div>
              <CircularProgressbar
                className="circular-progress-xl"
                value={34}
                text={34 + '%'}
                strokeWidth={8}
                styles={buildStyles({
                  textColor: 'var(--primary)',
                  pathColor: 'var(--primary)',
                  trailColor: 'var(--light)'
                })}
              />
            </div>
          </Grid>
          <Grid item md={6} className="d-flex justify-content-center">
            <div>
              <div className="line-height-normal d-flex align-items-center justify-content-center text-uppercase text-black-50 pb-3">
                <div className="badge badge-neutral-primary badge-circle mr-2">
                  External
                </div>
                <span className="font-weight-bold text-success font-size-xs">
                  External Visitors
                </span>
              </div>
              <CircularProgressbar
                className="circular-progress-xl"
                value={65}
                text={65 + '%'}
                strokeWidth={8}
                styles={buildStyles({
                  textColor: 'var(--success)',
                  pathColor: 'var(--success)',
                  trailColor: 'var(--light)'
                })}
              />
            </div>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
