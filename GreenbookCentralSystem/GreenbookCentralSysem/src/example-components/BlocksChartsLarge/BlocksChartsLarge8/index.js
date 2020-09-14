import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import { Line } from 'react-chartjs-2';
import CountUp from 'react-countup';
const chartsLarge8Data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderColor: '#7a7b97',
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#7a7b97',
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 3,
      pointHoverRadius: 6,
      pointHoverBorderWidth: 3,
      pointRadius: 4,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#7a7b97',
      data: [65, 59, 80, 81, 56, 55, 40],
      datalabels: {
        display: false
      },
      label: "Today's Earnings"
    },
    {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderColor: '#4191ff',
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#4191ff',
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 3,
      pointHoverRadius: 6,
      pointHoverBorderWidth: 3,
      pointRadius: 4,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#4191ff',
      data: [65, 81, 56, 59, 80, 55, 40],
      datalabels: {
        display: false
      },
      label: 'Current Week'
    },
    {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderColor: '#f4772e',
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#f4772e',
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 3,
      pointHoverRadius: 6,
      pointHoverBorderWidth: 3,
      pointRadius: 4,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#f4772e',
      data: [28, 48, 19, 86, 27, 40, 90],
      datalabels: {
        display: false
      },
      label: 'Previous Week'
    }
  ]
};
const chartsLarge8Options = {
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  },
  scales: {
    yAxes: [
      {
        ticks: {
          display: true,
          beginAtZero: true
        },
        gridLines: {
          display: true,
          color: 'rgba(28,63,116,0.17)',
          drawBorder: false
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          display: true,
          beginAtZero: true
        },
        gridLines: {
          display: true,
          color: 'rgba(28,63,116,0.1)',
          drawBorder: false
        }
      }
    ]
  },
  legend: {
    display: false
  },
  datalabels: {
    display: false
  },
  responsive: true,
  maintainAspectRatio: false
};
export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box">
        <div className="card-header-alt d-flex align-items-center justify-content-between p-4">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-1 text-black">
              Sales
            </h6>
            <p className="text-black-50 mb-0">
              Last 7 days sales statistics report
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
        <div className="p-4">
          <div className="rounded p-4 mb-4 bg-secondary text-center border-light border-1">
            <Grid container spacing={6}>
              <Grid item sm={4}>
                <div className="text-dark pb-1">Today's Earnings</div>
                <div className="font-size-lg d-flex align-items-center justify-content-center text-second">
                  <span className="mr-2 badge badge-circle badge-dark">
                    Badge dark
                  </span>
                  <small className="opacity-6 pr-1">$</small>
                  <span>
                    <CountUp
                      start={0}
                      end={8.49}
                      duration={4}
                      separator=""
                      decimals={3}
                      decimal=","
                      prefix=""
                      suffix=""
                    />
                  </span>
                </div>
              </Grid>
              <Grid item sm={4}>
                <div className="text-dark pb-1">Current Week</div>
                <div className="font-size-lg d-flex align-items-center justify-content-center text-second">
                  <div className="badge badge-first mr-2 badge-circle">
                    Badge first
                  </div>
                  <small className="opacity-6 pr-1">$</small>
                  <span>
                    <CountUp
                      start={0}
                      end={34.543}
                      duration={6}
                      delay={2}
                      separator=""
                      decimals={3}
                      decimal=","
                    />
                  </span>
                </div>
              </Grid>
              <Grid item sm={4}>
                <div className="text-dark pb-1">Previous Week</div>
                <div className="font-size-lg d-flex align-items-center justify-content-center text-second">
                  <span className="mr-2 badge badge-circle badge-warning">
                    Badge warning
                  </span>
                  <small className="opacity-6 pr-1">$</small>
                  <span>
                    <CountUp
                      start={0}
                      end={76.645}
                      duration={6}
                      delay={2}
                      separator=""
                      decimals={3}
                      decimal=","
                    />
                  </span>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className="d-block">
            <Line
              data={chartsLarge8Data}
              height={250}
              options={chartsLarge8Options}
            />
          </div>
        </div>
      </Card>
    </>
  );
}
