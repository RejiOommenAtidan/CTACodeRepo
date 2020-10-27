import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, CardContent, Button } from '@material-ui/core';

import CountUp from 'react-countup';
import { Line } from 'react-chartjs-2';

const data2Danger = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August'
  ],
  datasets: [
    {
      backgroundColor: 'rgba(248, 50, 69, 0.1)',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 2,
      borderColor: '#f83245',
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#f83245',
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#f83245',
      pointHoverBorderWidth: 0,
      pointRadius: 0,
      pointHitRadius: 0,
      data: [80, 81, 55, 65, 38, 53, 59, 77, 48],
      datalabels: {
        display: false
      }
    }
  ]
};
const data2DangerOptions = {
  layout: {
    padding: {
      left: -10,
      right: 0,
      top: 0,
      bottom: -10
    }
  },
  scales: {
    yAxes: [
      {
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ]
  },
  legend: {
    display: false
  },
  responsive: true,
  maintainAspectRatio: false
};

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box">
        <div className="card-header">
          <h4 className="font-size-lg mb-0 py-2 font-weight-bold">Reports</h4>
        </div>
        <CardContent className="pb-0">
          <Grid container spacing={0}>
            <Grid item md={6}>
              <div className="divider-v divider-v-md" />
              <div className="d-flex align-items-center justify-content-between p-3">
                <div>
                  <b>Reports</b>
                  <div className="text-black-50">Monthly sales reports</div>
                </div>
                <div className="font-weight-bold text-danger font-size-xl">
                  <CountUp
                    start={0}
                    end={2.363}
                    duration={6}
                    delay={2}
                    separator=""
                    decimals={3}
                    decimal=","
                  />
                </div>
              </div>
              <div className="divider" />
              <div className="d-flex align-items-center justify-content-between p-3">
                <div>
                  <b>User</b>
                  <div className="text-black-50">Visitors last week</div>
                </div>
                <div className="font-weight-bold text-success font-size-xl">
                  <CountUp
                    start={0}
                    end={584}
                    duration={6}
                    delay={2}
                    separator=""
                    decimals={0}
                    decimal=","
                  />
                </div>
              </div>
              <div className="divider" />
              <div className="d-flex align-items-center justify-content-between p-3">
                <div>
                  <b>Sales</b>
                  <div className="text-black-50">
                    Total average weekly report
                  </div>
                </div>
                <div className="font-weight-bold text-warning font-size-xl">
                  <CountUp
                    start={0}
                    end={483}
                    duration={6}
                    delay={2}
                    separator=""
                    decimals={0}
                    decimal=","
                  />
                </div>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="d-flex align-items-center justify-content-between p-3">
                <div>
                  <b>Stats</b>
                  <div className="text-black-50">Last month targets</div>
                </div>
                <div className="font-weight-bold text-warning font-size-xl">
                  $1,23M
                </div>
              </div>
              <div className="divider" />
              <div className="d-flex align-items-center justify-content-between p-3">
                <div>
                  <b>Payments</b>
                  <div className="text-black-50">Week's expenses</div>
                </div>
                <div className="font-weight-bold text-danger font-size-xl">
                  - $123,305
                </div>
              </div>
              <div className="divider" />
              <div className="d-flex align-items-center justify-content-between p-3">
                <div>
                  <b>Orders</b>
                  <div className="text-black-50">Total products ordered</div>
                </div>
                <div className="font-weight-bold text-warning font-size-xl">
                  65
                </div>
              </div>
            </Grid>
          </Grid>
          <div className="card-footer rounded bg-secondary border-0 my-3 p-4 text-center">
            <Button size="small" className="hover-scale-lg btn-second">
              <span className="btn-wrapper--label">View details</span>
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fas', 'arrow-right']} />
              </span>
            </Button>
          </div>
        </CardContent>
        <div className="sparkline-full-wrapper">
          <Line data={data2Danger} options={data2DangerOptions} />
        </div>
      </Card>
    </>
  );
}
