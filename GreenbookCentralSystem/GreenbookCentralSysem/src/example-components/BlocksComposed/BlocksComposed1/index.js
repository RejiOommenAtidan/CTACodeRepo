import React from 'react';

import {
  Grid,
  LinearProgress,
  ButtonGroup,
  Card,
  Button
} from '@material-ui/core';

import Chart from 'react-apexcharts';

export default function LivePreviewExample() {
  const chartComposed1Options = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#3c44b1', '#4191ff'],
    fill: {
      opacity: 1,
      colors: ['#3c44b1', '#4191ff']
    },
    grid: {
      strokeDashArray: '5',
      borderColor: 'rgba(125, 138, 156, 0.3)'
    },
    stroke: {
      show: true,
      width: 3,
      colors: ['#3c44b1', '#4191ff']
    },
    legend: {
      show: false
    },
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  };
  const chartComposed1Data = [
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
      <Card className="card-box mb-spacing-6-x2">
        <div className="card-header border-0">
          <div className="card-header--title py-2 font-size-lg">
            Sales Statistics
          </div>
        </div>
        <div className="divider" />
        <div className="px-4 m-0">
          <Chart
            options={chartComposed1Options}
            series={chartComposed1Data}
            type="area"
            height={232}
          />
        </div>
        <div className="bg-neutral-dark mt-2 text-center">
          <ButtonGroup
            size="small"
            className="m-4"
            variant="contained"
            color="primary">
            <Button className="btn-transition-none">Last week</Button>
            <Button className="btn-transition-none">Last month</Button>
          </ButtonGroup>
        </div>
        <div className="p-4">
          <h6 className="font-weight-bold font-size-lg mb-1 text-black">
            Performance
          </h6>
          <p className="text-black-50 mb-0">
            Portfolio performance for selected period.
          </p>
        </div>
        <div className="divider" />
        <Grid container spacing={0}>
          <Grid item lg={6}>
            <div className="p-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="font-weight-bold">Orders</div>
                <div className="font-size-lg font-weight-bold text-danger">
                  345
                </div>
              </div>
              <div>
                <LinearProgress
                  variant="determinate"
                  className="progress-sm progress-bar-danger"
                  value={65}
                />
                <div className="align-box-row progress-bar--label mt-2 text-muted">
                  <div>Target</div>
                  <div className="ml-auto">100%</div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6}>
            <div className="p-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="font-weight-bold">Customers</div>
                <div className="font-size-lg font-weight-bold text-warning">
                  435
                </div>
              </div>
              <div>
                <LinearProgress
                  variant="determinate"
                  className="progress-sm progress-bar-warning"
                  value={44}
                />
                <div className="align-box-row progress-bar--label mt-2 text-muted">
                  <div>Target</div>
                  <div className="ml-auto">100%</div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
