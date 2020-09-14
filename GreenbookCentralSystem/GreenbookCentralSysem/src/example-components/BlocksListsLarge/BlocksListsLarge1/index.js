import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Menu, Button, List, ListItem } from '@material-ui/core';

import Chart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';

export default function LivePreviewExample() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const chartListsLarge1Options = {
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
  const chartListsLarge1Data = [
    {
      name: 'Sales',
      data: [32, 52, 45, 32, 54, 56, 28, 25, 36, 62]
    }
  ];

  return (
    <>
      <Card className="shadow-xxl">
        <div className="card-tr-actions">
          <Button
            variant="text"
            onClick={handleClick}
            className="p-0 d-30 border-0 btn-transition-none text-first"
            disableRipple>
            <FontAwesomeIcon
              icon={['fas', 'ellipsis-h']}
              className="font-size-lg"
            />
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorEl)}
            classes={{ list: 'p-0' }}
            onClose={handleClose}>
            <div className="dropdown-menu-xl overflow-hidden p-0">
              <div className="grid-menu grid-menu-2col">
                <Grid container spacing={0}>
                  <Grid item sm={6}>
                    <Button
                      variant="text"
                      className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                      <FontAwesomeIcon
                        icon={['far', 'bell']}
                        className="h2 d-block mb-2 mx-auto mt-1 text-first"
                      />
                      <div className="font-weight-bold text-black">Reports</div>
                      <div className="font-size-md mb-1 text-black-50">
                        Monthly Stats
                      </div>
                    </Button>
                  </Grid>
                  <Grid item sm={6}>
                    <Button
                      variant="text"
                      className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                      <FontAwesomeIcon
                        icon={['far', 'file-excel']}
                        className="h2 d-block mx-auto mb-2 mt-1 text-first"
                      />
                      <div className="font-weight-bold text-black">
                        Statistics
                      </div>
                      <div className="font-size-md mb-1 text-black-50">
                        Customers stats
                      </div>
                    </Button>
                  </Grid>
                  <Grid item sm={6}>
                    <Button
                      variant="text"
                      className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                      <FontAwesomeIcon
                        icon={['far', 'eye']}
                        className="h2 d-block mb-2 mx-auto mt-1 text-first"
                      />
                      <div className="font-weight-bold text-black">
                        Projects
                      </div>
                      <div className="font-size-md mb-1 text-black-50">
                        Manage servers
                      </div>
                    </Button>
                  </Grid>
                  <Grid item sm={6}>
                    <Button
                      variant="text"
                      className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                      <FontAwesomeIcon
                        icon={['far', 'chart-bar']}
                        className="h2 d-block mx-auto mb-2 mt-1 text-first"
                      />
                      <div className="font-weight-bold text-black">Tasks</div>
                      <div className="font-size-md mb-1 text-black-50">
                        Pending items
                      </div>
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Menu>
        </div>
        <div className="card-header-alt px-4 pt-4 pb-2">
          <h6 className="font-weight-bold font-size-lg mb-1 text-black">
            Weekly Sales
          </h6>
          <p className="text-black-50 mb-0">
            Reports for what we sold this week.
          </p>
        </div>
        <div>
          <Chart
            options={chartListsLarge1Options}
            series={chartListsLarge1Data}
            type="area"
            height={160}
          />
        </div>
        <div className="scroll-area shadow-overflow">
          <PerfectScrollbar options={{ wheelPropagation: false }}>
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
            </List>
          </PerfectScrollbar>
        </div>
        <div className="card-footer p-3 text-center">
          <Button size="small" color="primary" variant="contained">
            <span className="btn-wrapper--label">View all employees</span>
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={['fas', 'arrow-right']} />
            </span>
          </Button>
        </div>
      </Card>
    </>
  );
}
