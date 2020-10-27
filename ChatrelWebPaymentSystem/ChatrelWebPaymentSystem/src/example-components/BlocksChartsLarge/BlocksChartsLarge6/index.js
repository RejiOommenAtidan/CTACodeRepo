import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import Chart from 'react-apexcharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';

export default function LivePreviewExample() {
  const chartsLarge6Options = {
    chart: {
      foreColor: '#fff',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: false
      },
      dropShadow: {
        enabled: true,
        opacity: 0.07,
        blur: 4,
        left: 2,
        top: 3
      }
    },
    stroke: {
      width: 7,
      curve: 'smooth'
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      axisTicks: {
        color: 'rgba(255,255,255,.2)'
      },
      type: 'datetime',
      categories: [
        '1/11/2000',
        '2/11/2000',
        '3/11/2000',
        '4/11/2000',
        '5/11/2000',
        '6/11/2000',
        '7/11/2000',
        '8/11/2000',
        '9/11/2000',
        '10/11/2000',
        '11/11/2000',
        '12/11/2000',
        '1/11/2001',
        '2/11/2001',
        '3/11/2001',
        '4/11/2001',
        '5/11/2001',
        '6/11/2001'
      ],
      axisBorder: {
        color: 'rgba(255,255,255,.2)'
      }
    },
    markers: {
      size: 8,
      opacity: 0.3,
      colors: ['#84bfff'],
      strokeColor: '#fff',
      strokeWidth: 2,

      hover: {
        size: 12
      }
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#84bfff'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 60, 100]
      }
    },
    colors: ['#4191ff'],
    legend: {
      show: false
    }
  };
  const chartsLarge6Data = [
    {
      name: 'Likes',
      data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
    }
  ];

  return (
    <>
      <Card className="card-box p-4 bg-night-sky text-center">
        <div>
          <Chart
            options={chartsLarge6Options}
            series={chartsLarge6Data}
            type="line"
            height={308}
          />
        </div>

        <Grid container spacing={0} className="my-3">
          <Grid item sm={6}>
            <CircularProgressbar
              className="circular-progress-xl mb-4 mb-sm-0"
              value={54.71}
              text={54.71 + '%'}
              strokeWidth={8}
              styles={buildStyles({
                textColor: 'rgba(255,255,255,1)',
                pathColor: 'rgba(255,255,255,.4)',
                trailColor: 'rgba(255,255,255,.1)'
              })}
            />
          </Grid>
          <Grid item sm={6}>
            <CircularProgressbar
              className="circular-progress-xl"
              value={76.23}
              text={76.23 + '%'}
              strokeWidth={8}
              styles={buildStyles({
                textColor: 'rgba(255,255,255,1)',
                pathColor: 'rgba(255,255,255,.6)',
                trailColor: 'rgba(255,255,255,.1)'
              })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={6} className="mt-3">
          <Grid item md={6}>
            <Card className="shadow-sm rounded-lg p-4 mb-4 mb-md-0 text-left bg-white">
              <div className="card-tr-actions">
                <Button
                  variant="text"
                  className="p-0 d-30 border-0 btn-transition-none text-dark opacity-8"
                  disableRipple>
                  <FontAwesomeIcon
                    icon={['fas', 'ellipsis-h']}
                    className="font-size-lg"
                  />
                </Button>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div className="avatar-icon-wrapper mr-2">
                  <div className="avatar-icon">
                    <img alt="..." src={avatar2} />
                  </div>
                </div>
                <div>
                  <div className="font-weight-bold text-dark text-uppercase font-size-xs opacity-7 pb-1">
                    Customer
                  </div>
                  <span className="text-black font-size-lg sm-block">
                    Lee Demi
                  </span>
                </div>
              </div>
              <div className="align-bottom">
                <span className="font-size-xl font-weight-bold">1748</span>
                <span className="text-dark font-weight-bold font-size-sm opacity-7">
                  {' '}
                  / purchases
                </span>
              </div>
            </Card>
          </Grid>
          <Grid item md={6}>
            <Card className="shadow-sm rounded-lg p-4 text-left bg-white">
              <div className="card-tr-actions">
                <Button
                  variant="text"
                  className="p-0 d-30 border-0 btn-transition-none text-dark opacity-8"
                  disableRipple>
                  <FontAwesomeIcon
                    icon={['fas', 'ellipsis-h']}
                    className="font-size-lg"
                  />
                </Button>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div className="avatar-icon-wrapper mr-2">
                  <div className="avatar-icon">
                    <img alt="..." src={avatar1} />
                  </div>
                </div>
                <div>
                  <div className="font-weight-bold text-dark text-uppercase font-size-xs opacity-7 pb-1">
                    Client
                  </div>
                  <span className="text-black font-size-sm d-block">
                    Bryn Kay
                  </span>
                </div>
              </div>
              <div className="align-bottom">
                <span className="font-size-xl font-weight-bold">456</span>
                <span className="text-dark font-weight-bold font-size-sm opacity-7">
                  {' '}
                  / visits
                </span>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
