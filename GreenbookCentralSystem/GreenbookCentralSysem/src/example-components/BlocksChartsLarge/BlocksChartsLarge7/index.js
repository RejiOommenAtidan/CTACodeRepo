import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, LinearProgress, Card, Button } from '@material-ui/core';

import Chart from 'react-apexcharts';

export default function LivePreviewExample() {
  const chartsLarge7Options = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      stacked: true
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        startingShape: 'rounded',
        columnWidth: '60%',
        distributed: true
      }
    },
    colors: ['#09125c', '#1c3585', '#2e59ad', '#648ac6'],
    fill: {
      opacity: 1
    },
    legend: {
      show: false
    }
  };
  const chartsLarge7Data = [
    {
      name: 'Net Profit',
      data: [2.3, 3.1, 4.0, 3.8, 5.1, 3.6, 4.0, 4.1]
    },
    {
      name: 'Weekly Stats',
      data: [2.3, 3.1, 5.1, 3.6, 4.0, 4.0, 3.8, 4.3]
    },
    {
      name: 'Sales reports',
      data: [2.3, 3.1, 5.1, 3.6, 4.0, 4.0, 3.8, 4.0]
    },
    {
      name: 'Net Loss',
      data: [2.1, 2.1, 3.0, 2.8, 4.0, 3.8, 5.1, 3.6]
    }
  ];

  return (
    <>
      <Card>
        <div className="card-header-alt d-flex align-items-center justify-content-between p-4">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-1 text-black">
              Revenue progress
            </h6>
            <p className="text-black-50 mb-0">
              Our company revenues, split by progress
            </p>
          </div>
          <div>
            <Button size="small" className="btn-outline-second" variant="text">
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fas', 'arrow-down']} />
              </span>
              <span className="btn-wrapper--label">Download report</span>
            </Button>
          </div>
        </div>
        <div className="divider" />
        <div className="p-5">
          <Grid container spacing={6}>
            <Grid item lg={7}>
              <div className="mb-4">
                <div className="line-height-1">
                  <span className="font-size-lg font-weight-bold pr-3">
                    54,126
                  </span>
                  <span className="text-black-50">dribbble.com</span>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="flex-grow-1">
                    <LinearProgress
                      variant="determinate"
                      value={50}
                      className="progress-bar-rounded progress-xs progress-bar-success"
                    />
                  </div>
                  <div className="text-success font-weight-bold pl-3">50%</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="line-height-1">
                  <span className="font-size-lg font-weight-bold pr-3">
                    12,345
                  </span>
                  <span className="text-black-50">amazon.com</span>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="flex-grow-1">
                    <LinearProgress
                      variant="determinate"
                      value={76}
                      className="progress-bar-info progress-xs progress-bar-rounded"
                    />
                  </div>
                  <div className="text-info font-weight-bold pl-3">76%</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="line-height-1">
                  <span className="font-size-lg font-weight-bold pr-3">
                    34,985
                  </span>
                  <span className="text-black-50">facebook.com</span>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="flex-grow-1">
                    <LinearProgress
                      variant="determinate"
                      value={87}
                      className="progress-bar-first progress-bar-rounded progress-xs"
                    />
                  </div>
                  <div className="text-first font-weight-bold pl-3">87%</div>
                </div>
              </div>
              <div>
                <div className="line-height-1">
                  <span className="font-size-lg font-weight-bold pr-3">
                    76,381
                  </span>
                  <span className="text-black-50">youtube.com</span>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="flex-grow-1">
                    <LinearProgress
                      variant="determinate"
                      value={59}
                      className="progress-bar-danger progress-bar-rounded progress-xs"
                    />
                  </div>
                  <div className="text-danger font-weight-bold pl-3">59%</div>
                </div>
              </div>
            </Grid>
            <Grid item lg={5}>
              <div className="px-3 mt-3 mt-lg-0 rounded bg-light">
                <Chart
                  options={chartsLarge7Options}
                  series={chartsLarge7Data}
                  type="bar"
                  height={230}
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="divider" />
        <div className="text-center p-4">
          <Button className="btn-first">
            <span className="btn-wrapper--label">View complete report</span>
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={['fas', 'arrow-right']} />
            </span>
          </Button>
        </div>
      </Card>
    </>
  );
}
