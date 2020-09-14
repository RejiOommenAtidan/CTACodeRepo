import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, List, ListItem } from '@material-ui/core';

import GaugeChart from 'react-gauge-chart';

import stock8 from '../../../assets/images/stock-photos/stock-6.jpg';
import logo1 from '../../../assets/images/stock-logos/coinbase.svg';
import Rating from '@material-ui/lab/Rating';

import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';

export default function LivePreviewExample() {
  const [value, setValue] = useState(2);

  return (
    <>
      <Card className="card-box">
        <Grid container spacing={0}>
          <Grid
            item
            xl={4}
            className="d-flex align-items-center justify-content-center">
            <div className="w-100 text-center pt-4 pb-3">
              <img
                alt="..."
                className="img-fluid mx-auto"
                style={{ height: '35px' }}
                src={logo1}
              />

              <div className="pt-3 mx-auto font-size-xl">
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </div>

              <p className="font-size-lg text-dark px-3 my-4">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>

              <List
                component="div"
                className="nav-pills nav-neutral-primary nav-lg nav-alt flex-column pr-4">
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  selected>
                  <span>Analytics</span>
                  <div className="ml-auto">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <span>Reports Management</span>
                  <div className="ml-auto">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <span>Real Estate</span>
                  <div className="ml-auto">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <span>Server Status</span>
                  <div className="ml-auto">
                    <div className="badge badge-danger mr-3">23</div>
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid item xl={8}>
            <div className="hero-wrapper bg-composed-wrapper h-100 rounded br-xl-left-0">
              <div className="flex-grow-1 w-100 d-flex align-items-end">
                <div
                  className="bg-composed-wrapper--image rounded br-xl-left-0 opacity-9 bg-composed-filter-rm"
                  style={{ backgroundImage: 'url(' + stock8 + ')' }}
                />
                <div className="bg-composed-wrapper--bg bg-second opacity-4 rounded br-xl-left-0" />
                <div className="bg-composed-wrapper--bg bg-night-sky opacity-5 rounded br-xl-left-0" />
                <div className="bg-composed-wrapper--bg bg-mixed-hopes opacity-5 rounded br-xl-left-0" />
                <div className="bg-composed-wrapper--content align-self-center p-4 p-xl-5">
                  <Grid container spacing={6}>
                    <Grid item md={6}>
                      <Card className="bg-second card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 mb-4 mb-md-0 d-block">
                        <div className="d-100 object-skew hover-scale-sm icon-blob btn-icon text-danger mx-auto">
                          <svg
                            className="blob-wrapper opacity-1"
                            viewBox="0 0 600 600"
                            xmlns="http://www.w3.org/2000/svg">
                            <g transform="translate(300,300)">
                              <path
                                d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                                fill="currentColor"
                              />
                            </g>
                          </svg>
                          <div className="blob-icon-wrapper">
                            <NotificationsActiveTwoToneIcon />
                          </div>
                        </div>
                        <h5 className="font-weight-bold font-size-lg text-white mb-2">
                          Gent Data Center
                        </h5>
                        <p className="mb-4 text-white-50">
                          View any of the 5+ live previews we&#39;ve set up to
                          learn why this dashboard template is the last one
                          you&#39;ll ever need!
                        </p>
                        <GaugeChart
                          id="chartsGauges1A"
                          nrOfLevels={24}
                          colors={['rgba(255,0,3,0.6)', 'rgba(255,236,64,0.8)']}
                          arcWidth={0.3}
                          percent={0.67}
                        />
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="badge-wrapper transition-base rounded-pill py-2 px-4 text-capitalize font-size-sm bg-white-10 text-white mt-3 d-inline-flex">
                          <span>View Dashboard</span>
                          <div
                            className="badge badge-warning badge-position badge-position--top-right badge-circle-inner"
                            id="NewNotificationsTooltip1">
                            New notifications
                          </div>
                        </a>
                      </Card>
                    </Grid>
                    <Grid item md={6}>
                      <Card className="bg-second card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 d-block">
                        <div className="d-100 object-skew hover-scale-sm icon-blob btn-icon text-warning mx-auto">
                          <svg
                            className="blob-wrapper opacity-1"
                            viewBox="0 0 600 600"
                            xmlns="http://www.w3.org/2000/svg">
                            <g transform="translate(300,300)">
                              <path
                                d="M155,-128.8C192.2,-77,207.7,-13,197.7,50.9C187.7,114.8,152.2,178.6,96.7,208.2C41.1,237.9,-34.6,233.4,-102.6,204C-170.6,174.7,-231.1,120.6,-246.7,55.4C-262.4,-9.9,-233.2,-86.3,-184.6,-140.7C-136,-195.2,-68,-227.6,-4.6,-223.9C58.9,-220.3,117.8,-180.6,155,-128.8Z"
                                fill="currentColor"
                              />
                            </g>
                          </svg>
                          <div className="blob-icon-wrapper">
                            <SettingsTwoToneIcon />
                          </div>
                        </div>
                        <h5 className="font-weight-bold font-size-lg text-white mb-2">
                          Berlin Data Center
                        </h5>
                        <p className="mb-4 text-white-50">
                          View any of the 5+ live previews we&#39;ve set up to
                          learn why this dashboard template is the last one
                          you&#39;ll ever need!
                        </p>
                        <GaugeChart
                          id="chartsGauges1B"
                          nrOfLevels={24}
                          colors={['rgba(0,2,255,0.6)', 'rgba(255,11,244,0.8)']}
                          arcWidth={0.3}
                          percent={0.43}
                        />
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="transition-base rounded-pill py-2 px-4 text-capitalize font-size-sm bg-white-10 text-white mt-3 d-inline-flex">
                          <span>View Dashboard</span>
                        </a>
                      </Card>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
