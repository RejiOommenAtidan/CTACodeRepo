import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  IconButton,
  Typography,
  Card,
  CardContent,
  Menu,
  Button,
  List,
  ListItem,
  Divider
} from '@material-ui/core';

import Chart from 'react-apexcharts';

import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

export default function LivePreviewExample() {
  const [anchorElMenu1, setAnchorElMenu1] = useState(null);
  const [anchorElMenu2, setAnchorElMenu2] = useState(null);
  const [anchorElMenu3, setAnchorElMenu3] = useState(null);
  const [anchorElMenu4, setAnchorElMenu4] = useState(null);

  const handleClickMenu1 = (event) => {
    setAnchorElMenu1(event.currentTarget);
  };
  const handleCloseMenu1 = () => {
    setAnchorElMenu1(null);
  };

  const handleClickMenu2 = (event) => {
    setAnchorElMenu2(event.currentTarget);
  };
  const handleCloseMenu2 = () => {
    setAnchorElMenu2(null);
  };

  const handleClickMenu3 = (event) => {
    setAnchorElMenu3(event.currentTarget);
  };
  const handleCloseMenu3 = () => {
    setAnchorElMenu3(null);
  };

  const handleClickMenu4 = (event) => {
    setAnchorElMenu4(event.currentTarget);
  };
  const handleCloseMenu4 = () => {
    setAnchorElMenu4(null);
  };

  const chartDataOptions = {
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
    colors: ['#3c44b1'],
    stroke: {
      color: '#4191ff',
      curve: 'smooth',
      width: 4
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
  const chartData = [
    {
      name: 'Customers',
      data: [47, 38, 56, 24, 45, 54, 38, 47, 38, 56, 24, 56, 24, 65]
    }
  ];

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="m-2">
          <Button className="btn-outline-primary" onClick={handleClickMenu1}>
            Blocks 1
          </Button>
          <Menu
            anchorEl={anchorElMenu1}
            keepMounted
            open={Boolean(anchorElMenu1)}
            onClose={handleCloseMenu1}
            classes={{ list: 'p-0' }}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}>
            <div className="dropdown-menu-xl p-0">
              <CardContent className="p-0">
                <Grid container spacing={0} className="mt-4">
                  <Grid item sm={6}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'chart-bar']}
                          className="font-size-xxl text-danger"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg">3,568</b>
                        <span className="text-black-50 d-block">sales</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={6}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'object-group']}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg">$9,693</b>
                        <span className="text-black-50 d-block">revenue</span>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <div className="divider mt-4" />
                <div className="text-center py-4">
                  <Button size="small" className="btn-primary">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['far', 'eye']} />
                    </span>
                    <span className="btn-wrapper--label">Generate reports</span>
                  </Button>
                </div>
              </CardContent>
              <div className="card-footer bg-light text-center">
                <div className="pt-4 pr-2 pl-2">
                  <Chart
                    options={chartDataOptions}
                    series={chartData}
                    type="line"
                    height={80}
                  />
                </div>
              </div>
            </div>
          </Menu>
        </div>
        <div className="m-2">
          <Button className="btn-outline-primary" onClick={handleClickMenu2}>
            Blocks 2
          </Button>
          <Menu
            anchorEl={anchorElMenu2}
            keepMounted
            open={Boolean(anchorElMenu2)}
            onClose={handleCloseMenu2}
            classes={{ list: 'p-0' }}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}>
            <div className="dropdown-menu-xl p-0">
              <Typography
                component="div"
                className="pt-3 px-3 pb-0 d-flex text-primary font-weight-bold align-items-center">
                <div>Profile options</div>
                <div className="ml-auto font-size-xs">
                  <a href="#/" onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={['fas', 'plus-circle']} />
                  </a>
                </div>
              </Typography>
              <List
                component="div"
                className="nav-pills p-2 nav-neutral-primary">
                <ListItem button>My Account</ListItem>
                <ListItem button>Profile settings</ListItem>
                <ListItem button>Active tasks</ListItem>
              </List>
              <Divider />
              <div className="bg-light p-0">
                <div className="grid-menu grid-menu-2col">
                  <div className="py-3">
                    <div className="d-flex justify-content-center">
                      <div className="d-flex align-items-center">
                        <div>
                          <FontAwesomeIcon
                            icon={['far', 'chart-bar']}
                            className="font-size-xxl text-info"
                          />
                        </div>
                        <div className="pl-3 line-height-sm">
                          <b className="font-size-lg">$9,693</b>
                          <span className="text-black-50 d-block">revenue</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Divider />
              <div className="p-3 text-center">
                <Button
                  className="p-0 d-40 btn-icon btn-facebook"
                  title="Facebook">
                  <FontAwesomeIcon icon={['fab', 'facebook']} />
                </Button>
                <Button
                  className="p-0 d-40 btn-icon btn-dribbble mx-2"
                  title="Dribbble">
                  <FontAwesomeIcon icon={['fab', 'dribbble']} />
                </Button>
                <Button
                  className="p-0 d-40 btn-icon btn-twitter"
                  title="Twitter">
                  <FontAwesomeIcon icon={['fab', 'twitter']} />
                </Button>
              </div>
            </div>
          </Menu>
        </div>
      </div>
      <div className="divider my-3" />

      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="m-2">
          <Button className="btn-outline-primary" onClick={handleClickMenu3}>
            Blocks 3
          </Button>
          <Menu
            anchorEl={anchorElMenu3}
            keepMounted
            open={Boolean(anchorElMenu3)}
            onClose={handleCloseMenu3}
            classes={{ list: 'p-0' }}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}>
            <div className="dropdown-menu-xl overflow-hidden p-3">
              <div className="text-left bg-transparent">
                <div className="align-box-row">
                  <div className="align-self-start">
                    <div className="bg-premium-dark text-center text-white font-size-lg d-40 rounded-circle">
                      <FontAwesomeIcon icon={['far', 'lightbulb']} />
                    </div>
                  </div>
                  <div className="pl-3">
                    <b>Blinded by desire</b>
                    <p className="text-black-50 mt-1 mb-0">
                      A wonderful serenity has taken possession.
                    </p>
                    <div className="timeline-list mt-3">
                      <div className="timeline-item timeline-item-icon">
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon-wrapper bg-danger text-white">
                            <FontAwesomeIcon icon={['far', 'gem']} />
                          </div>
                          <h4 className="timeline-item--label mb-2 font-weight-bold">
                            1998
                          </h4>
                          <p>
                            Bill Clinton's presidential scandal makes it online.
                          </p>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon" />
                          <h4 className="timeline-item--label mb-2 font-weight-bold">
                            Business investor meeting
                            <div className="badge badge-neutral-info text-info ml-2">
                              New
                            </div>
                          </h4>
                          <p>
                            Mosaic, the first graphical browser, is introduced
                            to the average consumer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Menu>
        </div>
        <div className="m-2">
          <Button className="btn-outline-primary" onClick={handleClickMenu4}>
            Blocks 4
          </Button>
          <Menu
            anchorEl={anchorElMenu4}
            keepMounted
            open={Boolean(anchorElMenu4)}
            onClose={handleCloseMenu4}
            classes={{ list: 'p-0' }}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}>
            <div className="dropdown-menu-xxl p-0">
              <CardContent className="p-3">
                <div className="chat-wrapper">
                  <div className="chat-item p-2 mb-2">
                    <div className="align-box-row">
                      <div className="avatar-icon-wrapper avatar-icon-lg align-self-start">
                        <div className="avatar-icon rounded border-0">
                          <img alt="..." src={avatar7} />
                        </div>
                      </div>
                      <div>
                        <div className="chat-box bg-first text-white">
                          <p>Bye for now, talk to you later.</p>
                        </div>
                        <small className="mt-2 d-block text-black-50">
                          <FontAwesomeIcon
                            icon={['far', 'clock']}
                            className="mr-1 opacity-5"
                          />
                          11:01 AM | Yesterday
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="chat-item chat-item-reverse p-2 mb-2">
                    <div className="align-box-row flex-row-reverse">
                      <div className="avatar-icon-wrapper avatar-icon-lg align-self-start">
                        <div className="avatar-icon rounded border-0">
                          <img alt="..." src={avatar3} />
                        </div>
                      </div>
                      <div>
                        <div className="chat-box bg-first text-white">
                          <p>Almost forgot about your tasks.</p>
                          <p>
                            <b>Check the links below:</b>
                          </p>
                          <Card className="bg-premium-dark p-2 mt-3 mb-2">
                            <div className="text-center py-2">
                              <IconButton className="btn-primary p-0 btn-icon bg-ripe-malin d-inline-block text-center text-white d-40 btn-pill border-0 m-2 card-box-hover-rise-alt">
                                <FontAwesomeIcon
                                  icon={['far', 'gem']}
                                  className="font-size-sm"
                                />
                              </IconButton>
                              <IconButton className="btn-primary p-0 btn-icon bg-grow-early d-inline-block text-center text-white d-40 btn-pill border-0 m-2 card-box-hover-rise-alt">
                                <FontAwesomeIcon
                                  icon={['far', 'building']}
                                  className="font-size-sm"
                                />
                              </IconButton>
                              <IconButton className="btn-primary p-0 btn-icon bg-plum-plate d-inline-block text-center text-white d-40 btn-pill border-0 m-2 card-box-hover-rise-alt">
                                <FontAwesomeIcon
                                  icon={['far', 'chart-bar']}
                                  className="font-size-sm"
                                />
                              </IconButton>
                            </div>
                          </Card>
                        </div>
                        <small className="mt-2 d-block text-black-50">
                          <FontAwesomeIcon
                            icon={['far', 'clock']}
                            className="mr-1 opacity-5"
                          />
                          11:03 AM | Yesterday
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="divider" />
              <div className="card-footer bg-white p-3 text-center d-block">
                <Button className="btn-primary" size="small">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon
                      icon={['far', 'object-group']}
                      className="mr-1"
                    />
                  </span>
                  <span className="btn-wrapper--label">View History</span>
                </Button>
              </div>
            </div>
          </Menu>
        </div>
      </div>
    </>
  );
}
