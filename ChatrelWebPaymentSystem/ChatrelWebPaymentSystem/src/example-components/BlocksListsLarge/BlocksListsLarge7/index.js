import React from 'react';

import {
  Grid,
  LinearProgress,
  Card,
  Button,
  List,
  ListItem
} from '@material-ui/core';

import CountUp from 'react-countup';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';

import logo1 from '../../../assets/images/stock-logos/discord-icon.svg';
import logo2 from '../../../assets/images/stock-logos/google-icon.svg';
import logo3 from '../../../assets/images/stock-logos/spotify-icon.svg';
import logo4 from '../../../assets/images/stock-logos/slack-icon.svg';
import logo5 from '../../../assets/images/stock-logos/pinterest-icon.svg';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={5}>
          <Card className="card-box">
            <div className="card-header">
              <div className="card-header--title text-center">
                <small className="d-block text-uppercase mt-1">Estimates</small>
                <b>Products Roadmap</b>
              </div>
            </div>

            <List component="div" className="list-group-flush">
              <ListItem
                component="a"
                button
                href="#/"
                disableRipple
                onClick={(e) => e.preventDefault()}
                className="d-flex bg-white hover-scale-rounded align-items-center py-3">
                <div className="d-flex align-items-center">
                  <div className="avatar-icon mr-3 d-50">
                    <img className="img-fit-container" alt="..." src={logo1} />
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
                    <img className="img-fit-container" alt="..." src={logo2} />
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
                    <img className="img-fit-container" alt="..." src={logo3} />
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
                    <img className="img-fit-container" alt="..." src={logo4} />
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
                disableRipple
                onClick={(e) => e.preventDefault()}
                className="d-flex bg-white hover-scale-rounded align-items-center py-3">
                <div className="d-flex align-items-center">
                  <div className="avatar-icon mr-3 d-50">
                    <img className="img-fit-container" alt="..." src={logo5} />
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
          </Card>
        </Grid>
        <Grid item xl={7}>
          <Card className="card-box">
            <div className="card-header bg-light">
              <div className="card-header--title">
                <small className="d-block text-uppercase mt-1">Progress</small>
                <b>Users Analytics</b>
              </div>
              <div className="card-header--actions">
                <div className="badge badge-pill badge-dark">Pending</div>
              </div>
            </div>
            <List component="div" className="list-group-flush">
              <ListItem className="py-3">
                <Grid container spacing={0}>
                  <Grid
                    item
                    xl={6}
                    md={12}
                    className="d-flex align-items-center">
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
                  </Grid>
                  <Grid
                    item
                    xl={6}
                    md={12}
                    className="pt-3 pt-xl-0 d-flex align-items-center">
                    <div className="align-box-row flex-grow-1">
                      <div className="d-flex flex-column flex-grow-1">
                        <div className="d-flex justify-content-between text-dark">
                          <div className="ml-auto">
                            <div className="font-weight-bold">
                              <CountUp
                                start={0}
                                end={583}
                                duration={4}
                                separator=""
                                decimals={0}
                                decimal=","
                                prefix=""
                                suffix=""
                              />
                            </div>
                          </div>
                        </div>
                        <LinearProgress
                          variant="determinate"
                          className="progress-sm progress-bar-rounded progress-bar-primary"
                          value={52}
                        />
                      </div>
                      <Button size="small" className="btn-neutral-primary ml-4">
                        View
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem className="py-3">
                <Grid container spacing={0}>
                  <Grid
                    item
                    xl={6}
                    md={12}
                    className="d-flex align-items-center">
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
                  </Grid>
                  <Grid
                    item
                    xl={6}
                    md={12}
                    className="pt-3 pt-xl-0 d-flex align-items-center">
                    <div className="align-box-row flex-grow-1">
                      <div className="d-flex flex-column flex-grow-1">
                        <div className="d-flex justify-content-between text-dark">
                          <div className="ml-auto">
                            <div className="font-weight-bold">
                              <CountUp
                                start={0}
                                end={340}
                                duration={4}
                                separator=""
                                decimals={0}
                                decimal=","
                                prefix=""
                                suffix=""
                              />
                            </div>
                          </div>
                        </div>
                        <LinearProgress
                          variant="determinate"
                          className="progress-bar-rounded progress-sm progress-bar-danger"
                          value={38}
                        />
                      </div>
                      <Button size="small" className="btn-neutral-danger ml-4">
                        View
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem className="py-3">
                <Grid container spacing={0}>
                  <Grid
                    item
                    xl={6}
                    md={12}
                    className="d-flex align-items-center">
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
                  </Grid>
                  <Grid
                    item
                    xl={6}
                    md={12}
                    className="pt-3 pt-xl-0 d-flex align-items-center">
                    <div className="align-box-row flex-grow-1">
                      <div className="d-flex flex-column flex-grow-1">
                        <div className="d-flex justify-content-between text-dark">
                          <div className="ml-auto">
                            <div className="font-weight-bold">
                              <CountUp
                                start={0}
                                end={473}
                                duration={4}
                                separator=""
                                decimals={0}
                                decimal=","
                                prefix=""
                                suffix=""
                              />
                            </div>
                          </div>
                        </div>
                        <LinearProgress
                          variant="determinate"
                          className="progress-bar-rounded progress-sm progress-bar-warning"
                          value={34}
                        />
                      </div>
                      <Button size="small" className="btn-neutral-warning ml-4">
                        View
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem className="py-3">
                <Grid container spacing={0}>
                  <Grid
                    item
                    xl={6}
                    md={12}
                    className="d-flex align-items-center">
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
                          Tyrell Macleod
                        </a>
                        <span className="text-black-50 d-block">
                          DevOps, Netflix
                        </span>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xl={6}
                    md={12}
                    className="pt-3 pt-xl-0 d-flex align-items-center">
                    <div className="align-box-row flex-grow-1">
                      <div className="d-flex flex-column flex-grow-1">
                        <div className="d-flex justify-content-between text-dark">
                          <div className="ml-auto">
                            <div className="font-weight-bold">
                              <CountUp
                                start={0}
                                end={836}
                                duration={6}
                                delay={2}
                                separator=""
                                decimals={0}
                                decimal=","
                              />
                            </div>
                          </div>
                        </div>
                        <LinearProgress
                          variant="determinate"
                          className="progress-bar-rounded progress-sm progress-bar-first"
                          value={83}
                        />
                      </div>
                      <Button size="small" className="btn-neutral-first ml-4">
                        View
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem className="py-3">
                <Grid container spacing={0}>
                  <Grid
                    item
                    xl={6}
                    md={12}
                    className="d-flex align-items-center">
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
                          Huw Conley
                        </a>
                        <span className="text-black-50 d-block">
                          Manager, Dribbble
                        </span>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xl={6}
                    md={12}
                    className="pt-3 pt-xl-0 d-flex align-items-center">
                    <div className="align-box-row flex-grow-1">
                      <div className="d-flex flex-column flex-grow-1">
                        <div className="d-flex justify-content-between text-dark">
                          <div className="ml-auto">
                            <div className="font-weight-bold">
                              <CountUp
                                start={0}
                                end={236}
                                duration={6}
                                delay={2}
                                separator=""
                                prefix="+"
                                suffix="%"
                                decimals={0}
                                decimal=","
                              />
                            </div>
                          </div>
                        </div>
                        <LinearProgress
                          variant="determinate"
                          className="progress-bar-rounded progress-sm progress-bar-success"
                          value={62}
                        />
                      </div>
                      <Button size="small" className="btn-neutral-success ml-4">
                        View
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
