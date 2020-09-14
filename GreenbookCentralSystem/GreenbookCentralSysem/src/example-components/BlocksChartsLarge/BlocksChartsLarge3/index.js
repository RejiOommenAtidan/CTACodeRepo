import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  LinearProgress,
  Card,
  CardContent,
  Button
} from '@material-ui/core';

import Chart from 'react-apexcharts';

export default function LivePreviewExample() {
  const chartsLarge3Options = {
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
    grid: {
      strokeDashArray: '5',
      borderColor: 'rgba(125, 138, 156, 0.3)'
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    fill: {
      color: '#3c44b1',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.2,
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    colors: ['#3c44b1'],
    legend: {
      show: false
    },
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  };
  const chartsLarge3Data = [
    {
      name: 'Net Profit',
      data: [3.3, 3.1, 4.0, 5.8, 2.1, 3.6, 3.2]
    },
    {
      name: 'Net Loss',
      data: [2.1, 2.1, 2.8, 2.8, 4.3, 2.7, 1.4]
    }
  ];

  return (
    <>
      <Card className="card-box">
        <div className="card-header">
          <div className="card-header--title">
            <h4 className="font-size-lg mb-0 py-2 font-weight-bold">
              Income Reports
            </h4>
          </div>
          <div className="card-header--actions">
            <Button size="small" className="btn-neutral-primary">
              <span className="btn-wrapper--label">Export</span>
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon
                  icon={['fas', 'chevron-down']}
                  className="opacity-8 font-size-xs"
                />
              </span>
            </Button>
          </div>
        </div>
        <CardContent className="pb-1 font-weight-bold">
          <Grid container spacing={6} className="pt-3">
            <Grid item sm={6} md={5}>
              <div className="pb-4 px-3">
                <span className="text-dark pb-4">YoY Income</span>
                <span className="font-size-lg d-block">
                  <small>$</small> 165,239
                </span>
              </div>
              <div className="pb-4 px-3">
                <span className="text-dark pb-4">Orders Volume</span>
                <span className="font-size-lg d-block">
                  <small>$</small> 384
                </span>
              </div>
            </Grid>
            <Grid item sm={6} md={7}>
              <div className="pb-4 px-3">
                <span className="text-dark pb-4">Best Seller</span>
                <span className="font-size-lg d-block">Personal Computer</span>
              </div>
              <div className="pb-4 px-3">
                <span className="text-dark pb-4">Sales Target</span>
                <span className="d-flex align-items-center font-size-lg d-block">
                  <LinearProgress
                    variant="determinate"
                    value={65}
                    className="progress-bar-animated progress-bar-striped progress-bar-warning progress-sm flex-grow-1 progress-bar-rounded"
                  />
                  <span className="pl-3">65%</span>
                </span>
              </div>
            </Grid>
          </Grid>
          <Chart
            options={chartsLarge3Options}
            series={chartsLarge3Data}
            type="area"
            height={317}
          />
        </CardContent>
      </Card>
    </>
  );
}
