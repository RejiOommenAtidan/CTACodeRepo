import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardContent } from '@material-ui/core';

import CountUp from 'react-countup';
import { Line } from 'react-chartjs-2';

const data3Success = {
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
      backgroundColor: 'rgba(27, 201, 67, 0.1)',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 2,
      borderColor: '#1bc943',
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#1bc943',
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#1bc943',
      pointHoverBorderWidth: 0,
      pointRadius: 0,
      pointHitRadius: 0,
      data: [65, 59, 80, 81, 55, 38, 59, 80, 46]
    }
  ]
};
const data3SuccessOptions = {
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
          <h4 className="font-size-lg mb-0 py-2 font-weight-bold">Updates</h4>
        </div>
        <CardContent className="pb-0">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={['far', 'comment-dots']}
                className="font-size-lg d-block mr-3 text-dark opacity-5"
              />
              <b>Reports</b>
            </div>
            <div className="font-weight-bold text-danger font-size-lg">
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
          <div className="divider my-3" />
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={['far', 'chart-bar']}
                className="font-size-lg d-block mr-3 text-dark opacity-5"
              />
              <b>User</b>
            </div>
            <div className="font-weight-bold text-success font-size-lg">
              <CountUp
                start={0}
                end={643}
                duration={6}
                delay={2}
                separator=""
                decimals={0}
                decimal=","
              />
            </div>
          </div>
          <div className="divider my-3" />
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={['far', 'address-card']}
                className="font-size-lg d-block mr-3 text-dark opacity-5"
              />
              <b>Sales</b>
            </div>
            <div className="font-weight-bold text-warning font-size-lg">
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
          <div className="divider my-3" />
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={['far', 'object-group']}
                className="font-size-lg d-block mr-3 text-dark opacity-5"
              />
              <b>Stats</b>
            </div>
            <div className="font-weight-bold text-first font-size-lg">
              {' '}
              $1,23M
            </div>
          </div>
        </CardContent>
        <div className="sparkline-full-wrapper" style={{ height: 103 }}>
          <Line data={data3Success} options={data3SuccessOptions} />
        </div>
      </Card>
    </>
  );
}
