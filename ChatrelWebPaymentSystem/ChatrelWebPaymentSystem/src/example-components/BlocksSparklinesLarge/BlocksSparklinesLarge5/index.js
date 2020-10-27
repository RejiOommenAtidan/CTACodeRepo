import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardContent, Button, Tooltip } from '@material-ui/core';

import Chart from 'react-apexcharts';

export default function LivePreviewExample() {
  const chartSparklineLarge5Options = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },

    stroke: {
      color: '#1bc943',
      curve: 'smooth',
      width: 4
    },
    colors: ['#1bc943'],
    fill: {
      color: '1bc943',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.7,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100]
      }
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
  const chartSparklineLarge5Data = [
    {
      name: 'Monthly Analytics',
      data: [47, 38, 56, 24, 45, 54, 38, 56, 24, 65]
    }
  ];

  return (
    <>
      <Card className="card-box">
        <div className="card-header bg-light">
          <div className="card-header--title">
            <small>Statistics</small>
            <b>Users overview</b>
          </div>
          <div className="card-header--actions">
            <Tooltip title="View options">
              <Button
                variant="text"
                className="p-0 d-30 border-0 btn-transition-none text-primary"
                disableRipple>
                <FontAwesomeIcon
                  icon={['fas', 'ellipsis-h']}
                  className="font-size-lg"
                />
              </Button>
            </Tooltip>
          </div>
        </div>
        <CardContent className="pb-0">
          <div className="align-box-row">
            <div className="font-weight-bold">
              <small className="text-black-50 d-block mt-2 mb-2 text-uppercase">
                New Accounts
              </small>
              <span className="font-size-xxl ">586,356</span>
            </div>
            <div className="ml-auto">
              <div className="bg-first text-center text-white font-size-xl d-50 rounded-circle">
                <FontAwesomeIcon icon={['far', 'building']} />
              </div>
            </div>
          </div>
          <div className="mt-1">
            <FontAwesomeIcon
              icon={['fas', 'arrow-up']}
              className="text-danger"
            />
            <span className="text-success px-1">15.4%</span>
            <span className="text-black-50">increase this month</span>
          </div>
          <div className="mt-4">
            <Button
              variant="text"
              className="btn-outline-primary btn-pill mb-3">
              <span className="btn-wrapper--label">View complete report</span>
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fas', 'angle-right']} />
              </span>
            </Button>
          </div>
        </CardContent>
        <Chart
          options={chartSparklineLarge5Options}
          series={chartSparklineLarge5Data}
          type="area"
          height={172}
        />
      </Card>
    </>
  );
}
