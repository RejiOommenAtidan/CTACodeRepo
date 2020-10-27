import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, LinearProgress, Card, Button } from '@material-ui/core';

import Chart from 'react-apexcharts';

export default function LivePreviewExample() {
  const chartSparklinesLarge2AOptions = {
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
  const chartSparklinesLarge2AData = [
    {
      name: 'Customers',
      data: [47, 38, 56, 24, 45, 54, 38, 47, 38, 56, 24, 56, 24, 65]
    }
  ];

  const chartSparklinesLarge2BOptions = {
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
  const chartSparklinesLarge2BData = [
    {
      name: 'Orders',
      data: [47, 54, 38, 56, 25, 19, 56, 27, 45, 54, 38, 26, 56, 65]
    }
  ];

  return (
    <>
      <div className="mb-spacing-6-x2">
        <Grid container spacing={6}>
          <Grid item xl={6}>
            <Card className="card-box">
              <div className="card-header-alt d-flex justify-content-between p-4">
                <div>
                  <h6 className="font-weight-bold font-size-lg mb-1 text-black">
                    Weekly Sales
                  </h6>
                  <p className="text-black-50 mb-0">
                    Reports for what we sold this week
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <Button className="btn-link d-40 btn-icon p-0 font-size-xl">
                    <FontAwesomeIcon
                      icon={['fas', 'ellipsis-h']}
                      className="font-size-lg"
                    />
                  </Button>
                </div>
              </div>
              <div className="divider" />
              <div className="px-3 px-lg-5 py-2 m-0 bg-secondary">
                <Chart
                  options={chartSparklinesLarge2AOptions}
                  series={chartSparklinesLarge2AData}
                  type="line"
                  height={110}
                />
              </div>
              <div className="divider" />
              <div className="p-4 text-center">
                <Grid container spacing={6}>
                  <Grid item md={4}>
                    <div className="mb-1 font-weight-bold font-size-xl">
                      76%
                    </div>
                    <LinearProgress
                      variant="determinate"
                      className="bg-secondary progress-constrained progress-bar-rounded progress-bar-rounded-alt progress-bar-danger"
                      value={76}
                    />
                    <div className="text-black-50 pt-2">Sales</div>
                  </Grid>
                  <Grid item md={4}>
                    <div className="mb-1 font-weight-bold font-size-xl">
                      23%
                    </div>
                    <LinearProgress
                      variant="determinate"
                      className="bg-secondary progress-constrained progress-bar-rounded progress-bar-rounded-alt progress-bar-info"
                      value={23}
                    />
                    <div className="text-black-50 pt-2">Profiles</div>
                  </Grid>
                  <Grid item md={4}>
                    <div className="mb-1 font-weight-bold font-size-xl">
                      51%
                    </div>
                    <LinearProgress
                      variant="determinate"
                      className="bg-secondary progress-constrained progress-bar-rounded progress-bar-rounded-alt progress-bar-warning"
                      value={51}
                    />
                    <div className="text-black-50 pt-2">Tickets</div>
                  </Grid>
                </Grid>
              </div>
            </Card>
          </Grid>
          <Grid item xl={6}>
            <Card className="card-box bg-deep-sky">
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
                  <Button className="btn-link d-40 btn-icon text-white p-0 font-size-xl">
                    <FontAwesomeIcon
                      icon={['fas', 'ellipsis-h']}
                      className="font-size-lg"
                    />
                  </Button>
                </div>
              </div>
              <div className="divider opacity-3" />
              <div className="bg-white-10 px-3 px-lg-5 py-2 m-0">
                <Chart
                  options={chartSparklinesLarge2BOptions}
                  series={chartSparklinesLarge2BData}
                  type="line"
                  height={110}
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
        </Grid>
      </div>
    </>
  );
}
