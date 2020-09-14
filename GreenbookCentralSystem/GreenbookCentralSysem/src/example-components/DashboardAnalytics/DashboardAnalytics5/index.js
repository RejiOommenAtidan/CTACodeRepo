import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button, List, ListItem } from '@material-ui/core';

import Chart from 'react-apexcharts';
import CountUp from 'react-countup';
import Trend from 'react-trend';
import PerfectScrollbar from 'react-perfect-scrollbar';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';

export default function LivePreviewExample() {
  const chartDashboardAnalytics5Options = {
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
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '65%'
      }
    },
    stroke: {
      color: '#4191ff',
      curve: 'smooth',
      width: 2
    },
    colors: ['#4191ff'],
    fill: {
      color: '#4191ff',
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
    legend: {
      show: false
    },
    tooltip: {
      enabled: false
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
  const chartDashboardAnalytics5Data = [
    {
      name: 'Sales',
      data: [32, 52, 45, 32, 54, 56, 28, 25, 36, 62]
    }
  ];

  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={5}>
            <Card>
              <div className="card-tr-actions">
                <Button
                  variant="text"
                  className="p-0 d-30 border-0 btn-transition-none text-first font-size-xl">
                  <FontAwesomeIcon
                    icon={['fas', 'ellipsis-h']}
                    className="font-size-lg"
                  />
                </Button>
              </div>
              <div className="card-header-alt px-4 pt-4 pb-0">
                <h6 className="font-weight-bold font-size-lg mb-1 text-black">
                  Weekly Sales
                </h6>
                <p className="text-black-50 mb-0">
                  Reports for what we sold this week.
                </p>
              </div>
              <div>
                <Chart
                  options={chartDashboardAnalytics5Options}
                  series={chartDashboardAnalytics5Data}
                  type="area"
                  height={136}
                />
              </div>
              <div className="scroll-area-sm shadow-overflow">
                <PerfectScrollbar>
                  <List component="div" className="list-group-flush">
                    <ListItem className="d-flex justify-content-between align-items-center py-3">
                      <div className="d-flex align-items-center">
                        <div className="avatar-icon-wrapper mr-2">
                          <div className="avatar-icon">
                            <img alt="..." src={avatar2} />
                          </div>
                        </div>
                        <div>
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Shanelle Wynn
                          </a>
                          <span className="text-black-50 d-block">
                            UI Engineer, Apple Inc.
                          </span>
                        </div>
                      </div>
                      <Button size="small" className="btn-neutral-dark ml-4">
                        View
                      </Button>
                    </ListItem>
                    <ListItem className="d-flex justify-content-between align-items-center py-3">
                      <div className="d-flex align-items-center">
                        <div className="avatar-icon-wrapper mr-2">
                          <div className="avatar-icon">
                            <img alt="..." src={avatar3} />
                          </div>
                        </div>
                        <div>
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Akeem Griffith
                          </a>
                          <span className="text-black-50 d-block">
                            Manager, Google Inc.
                          </span>
                        </div>
                      </div>
                      <Button size="small" className="btn-neutral-dark ml-4">
                        View
                      </Button>
                    </ListItem>
                    <ListItem className="d-flex justify-content-between align-items-center py-3">
                      <div className="d-flex align-items-center">
                        <div className="avatar-icon-wrapper mr-2">
                          <div className="avatar-icon">
                            <img alt="..." src={avatar4} />
                          </div>
                        </div>
                        <div>
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Abigayle Hicks
                          </a>
                          <span className="text-black-50 d-block">
                            Project Manager, Spotify
                          </span>
                        </div>
                      </div>
                      <Button size="small" className="btn-neutral-dark ml-4">
                        View
                      </Button>
                    </ListItem>
                    <ListItem className="d-flex justify-content-between align-items-center py-3">
                      <div className="d-flex align-items-center">
                        <div className="avatar-icon-wrapper mr-2">
                          <div className="avatar-icon">
                            <img alt="..." src={avatar1} />
                          </div>
                        </div>
                        <div>
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Reece Corbett
                          </a>
                          <span className="text-black-50 d-block">
                            Senior Designer, Amazon Inc.
                          </span>
                        </div>
                      </div>
                      <div>
                        <Button size="small" className="btn-neutral-dark ml-4">
                          View
                        </Button>
                      </div>
                    </ListItem>
                    <ListItem className="d-flex justify-content-between align-items-center py-3">
                      <div className="d-flex align-items-center">
                        <div className="avatar-icon-wrapper mr-2">
                          <div className="avatar-icon">
                            <img alt="..." src={avatar5} />
                          </div>
                        </div>
                        <div>
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Reece Corbett
                          </a>
                          <span className="text-black-50 d-block">
                            Senior Designer, Amazon Inc.
                          </span>
                        </div>
                      </div>
                      <Button size="small" className="btn-neutral-dark ml-4">
                        View
                      </Button>
                    </ListItem>
                  </List>
                </PerfectScrollbar>
              </div>
              <div className="card-footer p-3 text-center">
                <Button size="small" variant="contained" color="primary">
                  <span className="btn-wrapper--label">View all employees</span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                  </span>
                </Button>
              </div>
            </Card>
          </Grid>
          <Grid item xl={7}>
            <Grid container spacing={6}>
              <Grid item md={6}>
                <Card className="card-box mb-spacing-6-x2">
                  <div className="card-header-alt px-4 pt-4 pb-0 d-flex align-items-start justify-content-between">
                    <div>
                      <h3 className="font-weight-bold display-4 mb-0 text-black">
                        <CountUp
                          start={0}
                          end={895}
                          duration={6}
                          delay={2}
                          separator=""
                          decimals={0}
                          decimal=","
                        />
                      </h3>
                      <p className="font-size-lg text-black-50 mb-0">
                        Total Orders
                      </p>
                    </div>
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      className="text-uppercase font-size-xs">
                      <small className="font-weight-bold">Details</small>
                    </Button>
                  </div>
                  <div className="pr-5 pb-3">
                    <Trend
                      data={[5, 10, 5, 13, 5.6, 8, 5, 5.6, 11]}
                      autoDraw
                      autoDrawDuration={3000}
                      autoDrawEasing="ease-in"
                      height={120}
                      radius={15}
                      smooth
                      stroke="var(--primary)"
                      strokeLinecap="round"
                      strokeWidth={4}
                    />
                  </div>
                </Card>
                <Card className="card-box bg-midnight-bloom">
                  <div className="card-header-alt px-4 pt-4 pb-0">
                    <h3 className="font-weight-bold display-4 mb-0 text-white">
                      <CountUp
                        start={0}
                        end={586}
                        duration={6}
                        delay={2}
                        separator=""
                        decimals={0}
                        decimal=","
                      />
                    </h3>
                    <p className="font-size-lg text-white-50 mb-0">
                      Total Visitors
                    </p>
                  </div>
                  <div className="pr-5 pb-3">
                    <Trend
                      data={[6, 8, 5, 5, 5.6, 13, 5.6, 12, 10]}
                      autoDraw
                      autoDrawDuration={3000}
                      autoDrawEasing="ease-in"
                      height={120}
                      radius={15}
                      smooth
                      stroke="var(--white)"
                      strokeLinecap="round"
                      strokeWidth={4}
                    />
                  </div>
                </Card>
              </Grid>
              <Grid item md={6}>
                <Card className="card-box bg-danger mb-spacing-6-x2">
                  <div className="card-header-alt px-4 pt-4 pb-0">
                    <h3 className="font-weight-bold display-4 mb-0 text-white">
                      <CountUp
                        start={0}
                        end={183.954}
                        duration={6}
                        delay={2}
                        separator=""
                        decimals={3}
                        decimal=","
                      />
                    </h3>
                    <p className="font-size-lg text-white-50 mb-0">
                      Total Deliveries
                    </p>
                  </div>
                  <div className="pr-5 pb-3">
                    <Trend
                      data={[5, 8, 5.6, 13, 5.6, 8, 6, 12, 10]}
                      autoDraw
                      autoDrawDuration={3000}
                      autoDrawEasing="ease-in"
                      height={120}
                      radius={15}
                      smooth
                      stroke="var(--white)"
                      strokeLinecap="round"
                      strokeWidth={4}
                    />
                  </div>
                </Card>
                <Card className="card-box bg-night-sky">
                  <div className="card-header-alt px-4 pt-4 pb-0">
                    <h3 className="font-weight-bold display-4 mb-0 text-white">
                      <CountUp
                        start={0}
                        end={13.253}
                        duration={6}
                        delay={2}
                        separator=""
                        decimals={3}
                        decimal=","
                      />
                    </h3>
                    <p className="font-size-lg text-white-50 mb-0">
                      Total Budget
                    </p>
                  </div>
                  <div className="pr-5 pb-3">
                    <Trend
                      data={[5, 5.6, 13, 5.6, 8, 6, 8, 12, 10]}
                      autoDraw
                      autoDrawDuration={3000}
                      autoDrawEasing="ease-in"
                      height={120}
                      radius={15}
                      smooth
                      stroke="var(--white)"
                      strokeLinecap="round"
                      strokeWidth={4}
                    />
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
