import React from 'react';

import { Grid, Card, Button } from '@material-ui/core';

import Chart from 'react-apexcharts';

import logo3 from '../../../assets/images/stock-logos/spotify-icon.svg';
import logo5 from '../../../assets/images/stock-logos/pinterest-icon.svg';

export default function LivePreviewExample() {
  const chartSmall4AOptions = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },

    stroke: {
      color: '#f83245',
      curve: 'smooth',
      width: 2
    },
    colors: ['#f83245'],
    markers: {
      size: 0
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
  const chartSmall4AData = [
    {
      name: 'Revenue',
      data: [45, 56, 24, 56, 54, 38, 47, 38, 56, 24, 38, 47, 24, 65]
    }
  ];

  const chartSmall4BOptions = {
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
      width: 2
    },
    colors: ['#1bc943'],
    markers: {
      size: 0
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
  const chartSmall4BData = [
    {
      name: 'Sales',
      data: [45, 56, 24, 54, 38, 47, 38, 56, 24, 38, 56, 47, 24, 65]
    }
  ];

  const chartSmall4COptions = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },

    stroke: {
      color: '#4191ff',
      curve: 'smooth',
      width: 2
    },
    colors: ['#4191ff'],
    markers: {
      size: 0
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
  const chartSmall4CData = [
    {
      name: 'Tests',
      data: [24, 54, 38, 47, 56, 47, 45, 56, 38, 56, 24, 38, 24, 65]
    }
  ];

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={4}>
          <Card className="shadow-xxl">
            <div className="d-flex align-items-center p-3">
              <div className="avatar-icon-wrapper d-50 mr-2">
                <div className="avatar-icon d-50">
                  <img className="img-fit-container" alt="..." src={logo3} />
                </div>
                <div className="badge badge-danger badge-position badge-position--bottom-center badge-circle-inner">
                  Offline
                </div>
              </div>
              <div>
                <div className="font-weight-bold text-black">Spotify</div>
                <div className="text-dark opacity-7">New customer</div>
              </div>
            </div>
            <div className="divider" />
            <div className="px-3 py-2">
              <Chart
                options={chartSmall4AOptions}
                series={chartSmall4AData}
                type="line"
                height={80}
              />
            </div>
            <div className="divider" />
            <div className="d-flex p-3 justify-content-between">
              <Button size="small" className="btn-neutral-danger">
                Delete
              </Button>
              <Button size="small" color="primary" variant="contained">
                View details
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xl={4}>
          <Card className="shadow-xxl">
            <div className="d-flex align-items-center p-3">
              <div className="avatar-icon-wrapper avatar-initials shadow-none d-50 mr-2">
                <div className="avatar-icon text-white bg-serious-blue d-50 font-weight-bold">
                  EJ
                </div>
              </div>
              <div>
                <div className="font-weight-bold text-black">Eric Johnson</div>
                <div className="text-dark opacity-7">Established author</div>
              </div>
            </div>
            <div className="divider" />
            <div className="px-3 py-2">
              <Chart
                options={chartSmall4BOptions}
                series={chartSmall4BData}
                type="line"
                height={80}
              />
            </div>
            <div className="divider" />
            <div className="d-flex p-3 justify-content-between">
              <Button size="small" className="btn-neutral-danger">
                Delete
              </Button>
              <Button size="small" color="primary" variant="contained">
                View details
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xl={4}>
          <Card className="shadow-xxl">
            <div className="d-flex align-items-center p-3">
              <div className="avatar-icon-wrapper d-50 mr-2">
                <div className="avatar-icon d-50">
                  <img className="img-fit-container" alt="..." src={logo5} />
                </div>
              </div>
              <div>
                <div className="font-weight-bold text-black">Pinterest</div>
                <div className="text-warning opacity-8">Overdue bills</div>
              </div>
            </div>
            <div className="divider" />
            <div className="px-3 py-2">
              <Chart
                options={chartSmall4COptions}
                series={chartSmall4CData}
                type="line"
                height={80}
              />
            </div>
            <div className="divider" />
            <div className="d-flex p-3 justify-content-between">
              <Button size="small" className="btn-neutral-danger">
                Delete
              </Button>
              <Button size="small" color="primary" variant="contained">
                View details
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
