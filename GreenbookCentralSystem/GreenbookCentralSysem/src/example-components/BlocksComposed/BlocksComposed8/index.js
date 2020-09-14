import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, LinearProgress, Card, Button } from '@material-ui/core';

import CountUp from 'react-countup';
import Chart from 'react-apexcharts';

export default function LivePreviewExample() {
  const chartComposed8Options = {
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
      color: '#1bc943',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.3,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    colors: ['#1bc943'],
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
  const chartComposed8Data = [
    {
      name: 'Weekly sales',
      data: [47, 38, 56, 24, 45, 54, 38, 56, 24, 65]
    }
  ];

  return (
    <>
      <Card>
        <div className="card-header-alt d-flex justify-content-between p-4">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-1 text-black">
              Weekly Sales
            </h6>
            <p className="text-black-50 mb-0">
              Reports for what we sold this week.
            </p>
          </div>
          <div className="d-flex align-items-center">
            <Button
              variant="text"
              className="p-0 d-30 border-0 btn-transition-none font-size-xl text-second"
              disableRipple>
              <FontAwesomeIcon
                icon={['fas', 'ellipsis-h']}
                className="font-size-lg"
              />
            </Button>
          </div>
        </div>
        <div className="divider" />
        <div className="divider" />
        <div className="px-5 pt-5 pb-3">
          <h1 className="display-2 font-weight-bold mb-5">
            $
            <span className="pl-1">
              <CountUp
                start={0}
                end={477.693}
                duration={4}
                separator=""
                decimals={3}
                decimal=","
                prefix=""
                suffix=""
              />
            </span>
          </h1>
          <Grid container spacing={6}>
            <Grid item md={4}>
              <div>
                <span className="font-size-xl font-weight-bold">76%</span>
              </div>
              <LinearProgress
                variant="determinate"
                value={76}
                className="progress-animated-alt progress-bar-rounded progress-sm mb-2 progress-bar-success"
              />
              <div className="text-dark">Orders</div>
            </Grid>
            <Grid item md={4}>
              <div>
                <span className="font-size-xl font-weight-bold">34%</span>
              </div>
              <LinearProgress
                variant="determinate"
                value={34}
                className="progress-bar-danger progress-bar-rounded progress-sm mb-2"
              />
              <div className="text-dark">Deliveries</div>
            </Grid>
            <Grid item md={4}>
              <div>
                <span className="font-size-xl font-weight-bold">49%</span>
              </div>
              <LinearProgress
                variant="determinate"
                value={49}
                className="progress-bar-warning progress-bar-rounded progress-sm mb-2"
              />
              <div className="text-dark">Products</div>
            </Grid>
          </Grid>
        </div>
        <div>
          <Chart
            options={chartComposed8Options}
            series={chartComposed8Data}
            type="area"
            height={181}
          />
        </div>
        <div className="card-footer p-3 text-center">
          <Button size="small" variant="text" className="btn-outline-second">
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
