import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Typography,
  Tabs,
  Tab,
  LinearProgress,
  ButtonGroup,
  Card,
  Button,
  List,
  ListItem
} from '@material-ui/core';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';

import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}>
      {value === index && <div>{children}</div>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default function LivePreviewExample() {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={6}>
          <Card className="card-box">
            <div className="card-header">
              <div className="card-header--title">
                <b>Monthly targets</b>
                <small className="d-block text-capitalize mt-1">
                  Card with progress bars list items.
                </small>
              </div>
              <div className="card-header--actions">
                <ButtonGroup size="small" variant="text">
                  <Button
                    className={clsx('btn-dark btn-transition-none', {
                      active: activeTab === '0'
                    })}
                    onClick={() => {
                      toggle('0');
                    }}>
                    Tab 1
                  </Button>
                  <Button
                    className={clsx('btn-dark btn-transition-none', {
                      active: activeTab === '1'
                    })}
                    onClick={() => {
                      toggle('1');
                    }}>
                    Tab 2
                  </Button>
                </ButtonGroup>
              </div>
            </div>

            <div
              className={clsx('tab-item-wrapper', {
                active: activeTab === '0'
              })}
              index={0}>
              <List component="div" className="list-group-flush">
                <ListItem className="py-2 d-block">
                  <div className="align-box-row mb-1">
                    <div>
                      <div className="font-weight-bold">Orders</div>
                    </div>
                    <div className="ml-auto">
                      <div className="font-size-xl font-weight-bold text-success">
                        348
                      </div>
                    </div>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    className="progress-animated-alt progress-bar-success"
                    value={34}
                  />
                  <div className="align-box-row mt-1 text-muted">
                    <small className="text-dark">0</small>
                    <div className="ml-auto">100%</div>
                  </div>
                </ListItem>
                <ListItem className="py-2 d-block">
                  <div className="align-box-row mb-1">
                    <div>
                      <div className="font-weight-bold">Sales</div>
                    </div>
                    <div className="ml-auto">
                      <div className="font-size-xl font-weight-bold text-danger">
                        <small>$</small>
                        2.3M
                      </div>
                    </div>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    className="progress-animated-alt progress-bar-danger"
                    value={39}
                  />
                  <div className="align-box-row mt-1 text-muted">
                    <small className="text-dark">0</small>
                    <div className="ml-auto">100%</div>
                  </div>
                </ListItem>
                <ListItem className="py-2 d-block">
                  <div className="align-box-row mb-1">
                    <div>
                      <div className="font-weight-bold">Users</div>
                    </div>
                    <div className="ml-auto">
                      <div className="font-size-xl font-weight-bold text-info">
                        <small>#</small>
                        87
                      </div>
                    </div>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    className="progress-animated-alt progress-bar-info"
                    value={51}
                  />
                  <div className="align-box-row mt-1 text-muted">
                    <small className="text-dark">0</small>
                    <div className="ml-auto">100%</div>
                  </div>
                </ListItem>
              </List>
            </div>
            <div
              className={clsx('tab-item-wrapper', {
                active: activeTab === '1'
              })}
              index={1}>
              <List component="div" className="list-group-flush">
                <ListItem className="d-block">
                  <div className="align-box-row">
                    <div className="mr-4">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="avatar-icon-wrapper avatar-icon-lg m-0">
                        <div className="dot-badge" />
                        <div className="avatar-icon">
                          <img alt="..." src={avatar7} />
                        </div>
                      </a>
                    </div>
                    <div className="flex-grow-1">
                      <LinearProgress
                        variant="determinate"
                        className="progress-bar-rounded progress-animated-alt progress-bar-success"
                        value={61}
                      />
                    </div>
                    <div className="line-height-sm text-center ml-4">
                      <small className="text-black-50 d-block text-uppercase">
                        Totals
                      </small>
                      <b className="font-size-lg text-success">
                        <small className="pr-1 text-black-50">$</small>
                        1,628
                      </b>
                    </div>
                  </div>
                </ListItem>
                <ListItem className="d-block">
                  <div className="align-box-row">
                    <div className="mr-4">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="avatar-icon-wrapper avatar-icon-lg m-0">
                        <div className="dot-badge" />
                        <div className="avatar-icon">
                          <img alt="..." src={avatar5} />
                        </div>
                      </a>
                    </div>
                    <div className="flex-grow-1">
                      <LinearProgress
                        variant="determinate"
                        className="progress-animated-alt progress-bar-rounded progress-bar-info"
                        value={44}
                      />
                    </div>
                    <div className="line-height-sm text-center ml-4">
                      <small className="text-black-50 d-block text-uppercase">
                        Totals
                      </small>
                      <b className="font-size-lg text-info">
                        <small className="text-black-50 pr-1">$</small>
                        7,389
                      </b>
                    </div>
                  </div>
                </ListItem>
                <ListItem className="d-block">
                  <div className="align-box-row">
                    <div className="mr-4">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="avatar-icon-wrapper avatar-icon-lg m-0">
                        <div className="dot-badge" />
                        <div className="avatar-icon">
                          <img alt="..." src={avatar1} />
                        </div>
                      </a>
                    </div>
                    <div className="flex-grow-1">
                      <LinearProgress
                        variant="determinate"
                        className="progress-bar-rounded progress-animated-alt progress-bar-danger"
                        value={29}
                      />
                    </div>
                    <div className="line-height-sm text-center ml-4">
                      <small className="text-black-50 d-block text-uppercase">
                        Totals
                      </small>
                      <b className="font-size-lg text-danger">
                        <small className="text-black-50 pr-1">$</small>
                        8,493
                      </b>
                    </div>
                  </div>
                </ListItem>
              </List>
            </div>

            <div className="card-footer bg-light p-4 text-center">
              <Button size="small" className="btn-second">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['far', 'question-circle']} />
                </span>
                <span className="btn-wrapper--label">View details</span>
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xl={6}>
          <Card className="card-box">
            <div className="tabs-bordered p-4">
              <Tabs
                className="nav-tabs-success"
                value={value}
                variant="fullWidth"
                onChange={handleChange}>
                <Tab label="Overview" />
                <Tab label="Sign in" />
                <Tab label="Recent activity" />
              </Tabs>
            </div>
            <div className="p-4 pt-0">
              <TabPanel value={value} index={0}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-success shadow-success-sm text-success mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['fas', 'lightbulb']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-success">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-success shadow-success-sm text-success mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['fas', 'user']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-success">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-success shadow-success-sm text-success mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['fas', 'gem']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-success">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </TabPanel>
            </div>
          </Card>
        </Grid>
        <Grid item xl={6}>
          <Card className="card-box">
            <div className="px-4 pt-4">
              <Tabs
                className="nav-tabs-primary"
                value={value}
                onChange={handleChange}>
                <Tab label="Overview" />
                <Tab label="Sign in" />
                <Tab label="Recent activity" />
              </Tabs>
            </div>
            <div className="p-4 pt-0">
              <TabPanel value={value} index={0}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-primary shadow-primary-sm text-primary mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['fas', 'lightbulb']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-primary">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-primary shadow-primary-sm text-primary mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['fas', 'user']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-primary">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-primary shadow-primary-sm text-primary mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['fas', 'gem']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-primary">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </TabPanel>
            </div>
          </Card>
        </Grid>
        <Grid item xl={6}>
          <Card className="card-box">
            <div className="px-4 pt-4">
              <Tabs
                className="nav-tabs-second"
                value={value}
                centered
                onChange={handleChange}>
                <Tab label="Overview" />
                <Tab label="Sign in" />
                <Tab label="Recent activity" />
              </Tabs>
            </div>
            <div className="p-4 pt-0">
              <TabPanel value={value} index={0}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-second shadow-second-sm text-second mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['fas', 'lightbulb']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-second">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-second shadow-second-sm text-second mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['fas', 'user']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-second">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-second shadow-second-sm text-second mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['fas', 'gem']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-second">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </TabPanel>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
