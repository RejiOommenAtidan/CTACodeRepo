import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Button, List, ListItem, Tooltip } from '@material-ui/core';

import CountUp from 'react-countup';
import Chart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function LivePreviewExample() {
  const chartListsLarge2Options = {
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
        endingShape: 'rounded',
        columnWidth: '70%'
      }
    },
    stroke: {
      show: true,
      color: '#f4772e',
      curve: 'smooth',
      width: 2
    },
    fill: {
      color: '#f4772e',
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
    colors: ['#f4772e'],
    legend: {
      show: false
    },
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    xaxis: {
      crosshairs: {
        width: 1
      }
    },
    yaxis: {
      min: 0
    }
  };
  const chartListsLarge2Data = [
    {
      name: 'Sales',
      data: [32, 52, 45, 32, 54, 56, 28, 25, 36, 62]
    }
  ];

  return (
    <>
      <Card className="shadow-xxl">
        <div className="card-header pr-2 d-flex justify-content-between">
          <div className="card-header--title py-2 font-size-lg font-weight-bold">
            Top grossing products
          </div>
          <div className="card-header--actions">
            <Tooltip title="View all participants" arrow placement="top">
              <Button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="btn-first font-size-lg btn-icon btn-animated-icon mr-2 d-40 p-0 border-0">
                <span className="d-flex btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'plus']} />
                </span>
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="px-4 pt-4 pb-3">
          <div className="text-uppercase text-black-50">Monthly Sales</div>
          <div className="d-flex align-items-center pt-1 font-weight-bold display-4">
            <FontAwesomeIcon
              icon={['far', 'dot-circle']}
              className="text-warning mr-2 font-size-md"
            />
            $8,489
            <span className="text-success pl-2 font-size-md">+ 54</span>
          </div>
        </div>
        <div>
          <Chart
            options={chartListsLarge2Options}
            series={chartListsLarge2Data}
            type="area"
            height={115}
          />
        </div>
        <div className="text-uppercase px-3 pt-3 pb-1 text-black-50">
          Top sellers
        </div>
        <div className="scroll-area-sm shadow-overflow">
          <PerfectScrollbar options={{ wheelPropagation: false }}>
            <List component="div" className="list-group-flush">
              <ListItem className="d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center">
                  <CircularProgressbar
                    value={64}
                    styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                    strokeWidth={6}
                    className="circular-progress-xs circular-progress-primary"
                  />
                  <div className="pl-3">
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
                <div className="text-dark d-flex align-items-center">
                  <small className="pr-1">$</small>
                  <span>
                    <CountUp
                      start={0}
                      end={587}
                      duration={4}
                      separator=""
                      decimals={0}
                      decimal=","
                      prefix=""
                      suffix=""
                    />
                  </span>
                  <span className="text-danger bg-neutral-danger ml-2 rounded d-30 btn-icon">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-down']}
                      className="font-size-sm"
                    />
                  </span>
                </div>
              </ListItem>
              <ListItem className="d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center">
                  <CircularProgressbar
                    value={44}
                    styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                    strokeWidth={6}
                    className="circular-progress-xs circular-progress-primary"
                  />
                  <div className="pl-3">
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-weight-bold text-black"
                      title="...">
                      Shawn Galloway
                    </a>
                    <span className="text-black-50 d-block">
                      Frontend Engineer
                    </span>
                  </div>
                </div>
                <div className="text-dark d-flex align-items-center">
                  <small className="pr-1">$</small>
                  <span>
                    <CountUp
                      start={0}
                      end={3463}
                      duration={4}
                      separator=""
                      decimals={3}
                      decimal=","
                      prefix=""
                      suffix=""
                    />
                  </span>
                  <span className="text-success bg-neutral-success ml-2 rounded d-30 btn-icon">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-up']}
                      className="font-size-sm"
                    />
                  </span>
                </div>
              </ListItem>
              <ListItem className="d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center">
                  <CircularProgressbar
                    value={32}
                    styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                    strokeWidth={6}
                    className="circular-progress-xs circular-progress-primary"
                  />
                  <div className="pl-3">
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-weight-bold text-black"
                      title="...">
                      Latisha Allison
                    </a>
                    <span className="text-black-50 d-block">UX Designer</span>
                  </div>
                </div>
                <div className="text-dark d-flex align-items-center">
                  <small className="pr-1">$</small>
                  <span>
                    <CountUp
                      start={0}
                      end={762}
                      duration={4}
                      separator=""
                      decimals={0}
                      decimal=","
                      prefix=""
                      suffix=""
                    />
                  </span>
                  <span className="text-success bg-neutral-success ml-2 rounded d-30 btn-icon">
                    <FontAwesomeIcon
                      icon={['fas', 'arrow-up']}
                      className="font-size-sm"
                    />
                  </span>
                </div>
              </ListItem>
              <ListItem className="d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center">
                  <CircularProgressbar
                    value={83}
                    styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                    strokeWidth={6}
                    className="circular-progress-xs circular-progress-primary"
                  />
                  <div className="pl-3">
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-weight-bold text-black"
                      title="...">
                      Lilly-Mae White
                    </a>
                    <span className="text-black-50 d-block">
                      Frontend Engineer
                    </span>
                  </div>
                </div>
                <div className="text-dark d-flex align-items-center">
                  <small className="pr-1">$</small>
                  <span>
                    <CountUp
                      start={0}
                      end={5743}
                      duration={4}
                      separator=""
                      decimals={3}
                      decimal=","
                      prefix=""
                      suffix=""
                    />
                  </span>
                  <span className="text-warning bg-neutral-warning ml-2 rounded d-30 btn-icon">
                    <FontAwesomeIcon
                      icon={['far', 'dot-circle']}
                      className="font-size-sm"
                    />
                  </span>
                </div>
              </ListItem>
              <ListItem className="d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center">
                  <CircularProgressbar
                    value={77}
                    styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                    strokeWidth={6}
                    className="circular-progress-xs circular-progress-primary"
                  />
                  <div className="pl-3">
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-weight-bold text-black"
                      title="...">
                      Julie Prosser
                    </a>
                    <span className="text-black-50 d-block">
                      Frontend Engineer
                    </span>
                  </div>
                </div>
                <div className="text-dark d-flex align-items-center">
                  <small className="pr-1">$</small>
                  <span>
                    <CountUp
                      start={0}
                      end={3463}
                      duration={4}
                      separator=""
                      decimals={3}
                      decimal=","
                      prefix=""
                      suffix=""
                    />
                  </span>
                  <span className="text-success bg-neutral-success ml-2 rounded d-30 btn-icon">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-up']}
                      className="font-size-sm"
                    />
                  </span>
                </div>
              </ListItem>
              <ListItem className="d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center">
                  <CircularProgressbar
                    value={91}
                    styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                    strokeWidth={6}
                    className="circular-progress-xs circular-progress-primary"
                  />
                  <div className="pl-3">
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-weight-bold text-black"
                      title="...">
                      Amin Hamer
                    </a>
                    <span className="text-black-50 d-block">
                      Senior Project Manager
                    </span>
                  </div>
                </div>
                <div className="text-dark d-flex align-items-center">
                  <small className="pr-1">$</small>
                  <span>
                    <CountUp
                      start={0}
                      end={1587}
                      duration={6}
                      delay={2}
                      separator=""
                      decimals={3}
                      decimal=","
                    />
                  </span>
                  <span className="text-danger bg-neutral-danger ml-2 rounded d-30 btn-icon">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-down']}
                      className="font-size-sm"
                    />
                  </span>
                </div>
              </ListItem>
            </List>
          </PerfectScrollbar>
        </div>
        <div className="card-footer p-3 text-center">
          <Button size="small" color="primary" variant="contained">
            <span className="btn-wrapper--label">All products</span>
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={['fas', 'arrow-right']} />
            </span>
          </Button>
        </div>
      </Card>
    </>
  );
}
