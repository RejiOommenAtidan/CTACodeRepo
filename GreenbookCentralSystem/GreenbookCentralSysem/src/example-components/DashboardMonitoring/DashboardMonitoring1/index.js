import React, { useState } from 'react';

import { Grid, Card, List, ListItem } from '@material-ui/core';

import GaugeChart from 'react-gauge-chart';

import stock8 from '../../../assets/images/stock-photos/stock-6.jpg';
import logo6 from '../../../assets/images/stock-logos/netflix.svg';

import logo1 from '../../../assets/images/stock-logos/discord-icon.svg';
import logo2 from '../../../assets/images/stock-logos/google-icon.svg';
import logo3 from '../../../assets/images/stock-logos/spotify-icon.svg';
import logo4 from '../../../assets/images/stock-logos/slack-icon.svg';
import logo5 from '../../../assets/images/stock-logos/pinterest-icon.svg';

import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import Rating from '@material-ui/lab/Rating';

export default function LivePreviewExample() {
  const [value, setValue] = useState(2);

  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <Grid container spacing={0}>
          <Grid
            item
            xl={4}
            className="d-flex z-over align-items-center justify-content-center">
            <div className="text-center w-100 pt-4">
              <img
                alt="..."
                className="img-fluid mt-2 mx-auto"
                style={{ height: '35px' }}
                src={logo6}
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

              <List className="list-group-flush mb-4 mb-lg-0 text-left">
                <ListItem
                  component="a"
                  button
                  href="#/"
                  disableRipple
                  onClick={(e) => e.preventDefault()}
                  className="d-flex bg-white hover-scale-rounded align-items-center py-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon mr-3 d-50">
                      <img
                        className="img-fit-container"
                        alt="..."
                        src={logo1}
                      />
                    </div>
                    <div>
                      <div className="font-weight-bold text-black">
                        Build React Interface
                      </div>
                      <div className="text-black-50">Development</div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="badge badge-neutral-success text-success font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                      $3,884
                    </div>
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  disableRipple
                  onClick={(e) => e.preventDefault()}
                  className="d-flex bg-white hover-scale-rounded align-items-center py-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon mr-3 d-50">
                      <img
                        className="img-fit-container"
                        alt="..."
                        src={logo2}
                      />
                    </div>
                    <div>
                      <div className="font-weight-bold text-black">
                        Create Ads Campaign
                      </div>
                      <div className="text-black-50">Marketing</div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="badge badge-neutral-warning text-warning font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                      $8,362
                    </div>
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  disableRipple
                  onClick={(e) => e.preventDefault()}
                  className="d-flex bg-white hover-scale-rounded align-items-center py-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon mr-3 d-50">
                      <img
                        className="img-fit-container"
                        alt="..."
                        src={logo3}
                      />
                    </div>
                    <div>
                      <div className="font-weight-bold text-black">
                        Resolve All Github Issues
                      </div>
                      <div className="text-black-50">Bugfixes</div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="badge badge-neutral-success text-success font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                      $9,385
                    </div>
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  disableRipple
                  onClick={(e) => e.preventDefault()}
                  className="d-flex bg-white hover-scale-rounded align-items-center py-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon mr-3 d-50">
                      <img
                        className="img-fit-container"
                        alt="..."
                        src={logo4}
                      />
                    </div>
                    <div>
                      <div className="font-weight-bold text-black">
                        Build UI for Angular
                      </div>
                      <div className="text-black-50">Development</div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="badge badge-neutral-success text-success font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                      $1,964
                    </div>
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="rounded-bottom d-flex bg-white hover-scale-rounded align-items-center py-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon mr-3 d-50">
                      <img
                        className="img-fit-container"
                        alt="..."
                        src={logo5}
                      />
                    </div>
                    <div>
                      <div className="font-weight-bold text-black">
                        Create UI Designs
                      </div>
                      <div className="text-black-50">Marketing</div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="badge badge-neutral-danger text-danger font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                      $5,825
                    </div>
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
                          <div className="blob-icon-wrapper d-flex align-items-center justify-content-center">
                            <div className="badge-position d-50">
                              <NotificationsActiveTwoToneIcon className="w-50 h-50" />
                            </div>
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
                          <div className="badge badge-warning badge-position badge-position--top-right shadow-sm-dark badge-circle">
                            Finished
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
                          <div className="blob-icon-wrapper d-flex align-items-center justify-content-center">
                            <div className="badge-position d-50">
                              <SettingsTwoToneIcon className="w-50 h-50" />
                              <div className="badge badge-success badge-position shadow-sm-dark pulse-animation badge-position--bottom-right badge-circle">
                                Pending
                              </div>
                            </div>
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
