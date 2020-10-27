import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Typography,
  Tabs,
  Tab,
  ButtonGroup,
  Card,
  Menu,
  Button,
  List,
  ListItem,
  Tooltip
} from '@material-ui/core';

import Chart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';

import people3 from '../../../assets/images/stock-photos/people-3.jpg';
import people1 from '../../../assets/images/stock-photos/people-1.jpg';

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
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const chartComposed2Options = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      stacked: true
    },
    dataLabels: {
      enabled: true
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '65%'
      }
    },
    stroke: {
      show: false,
      width: 0,
      colors: ['transparent']
    },
    colors: ['#7a7b97', 'rgba(122, 123, 151, 0.15)'],
    fill: {
      opacity: 1
    },
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Last week',
      'Last month',
      'Last year',
      'Last quarter'
    ],
    legend: {
      show: false
    }
  };
  const chartComposed2Data = [
    {
      name: 'Net Profit',
      data: [2.3, 3.1, 4.0, 3.8, 5.1, 3.6, 4.0, 3.8, 5.1, 3.6, 3.2]
    },
    {
      name: 'Net Loss',
      data: [2.1, 2.1, 3.0, 2.8, 4.0, 3.8, 5.1, 3.6, 4.1, 2.6, 1.2]
    }
  ];

  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <div className="card-header border-0">
          <div className="card-header--title py-2 font-size-lg">
            Tasks for today
          </div>
          <div className="card-header--actions">
            <div>
              <Button
                onClick={handleClick}
                size="small"
                className="btn-neutral-first btn-transition-none">
                <span className="btn-wrapper--label">Actions</span>
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-down']}
                    className="opacity-8 font-size-xs"
                  />
                </span>
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
                <div className="dropdown-menu-xl p-2">
                  <List
                    component="div"
                    className="nav-neutral-first nav-lg nav-pills nav-pills-rounded flex-column">
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <span>View all reports</span>
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <span>View active items</span>
                      <div className="badge badge-second ml-auto">23</div>
                    </ListItem>

                    <div className="dropdown-divider" />

                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon">
                        <FontAwesomeIcon icon={['fas', 'download']} />
                      </div>
                      <span>Download</span>
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon">
                        <FontAwesomeIcon icon={['far', 'file-excel']} />
                      </div>
                      <span>Export to CSV</span>
                    </ListItem>
                  </List>
                </div>
              </Menu>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-composed-wrapper bg-night-sky border-0">
            <div className="bg-composed-img-5 bg-composed-wrapper--image" />
            <div className="bg-composed-wrapper--content text-light px-2 py-4">
              <h4 className="font-size-xl font-weight-bold mb-2">
                Notifications
              </h4>
              <p className="opacity-8 mb-0">
                You have <b className="text-success">472</b> new messages
              </p>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div className="p-3 z-over">
          <Tabs
            className="nav-tabs-primary"
            value={value}
            variant="fullWidth"
            onChange={handleChange}>
            <Tab label="Timeline" />
            <Tab label="Tasks" />
            <Tab label="Reports" />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <div className="scroll-area shadow-overflow">
            <PerfectScrollbar>
              <div className="timeline-list timeline-list-offset timeline-list-offset-dot">
                <div className="timeline-item">
                  <div className="timeline-item-offset">9:25</div>
                  <div className="timeline-item--content">
                    <div className="timeline-item--icon" />
                    <h4 className="timeline-item--label mb-2 font-weight-bold">
                      1991
                    </h4>
                    <p>The World Wide Web goes live with its first web page.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-item-offset">9:25</div>
                  <div className="timeline-item--content">
                    <div className="timeline-item--icon" />
                    <h4 className="timeline-item--label mb-2 font-weight-bold">
                      Java exam day
                    </h4>
                    <p>Bill Clinton's presidential scandal makes it online.</p>
                    <div className="avatar-wrapper-overlap mt-2 mb-1">
                      <div className="avatar-icon-wrapper avatar-icon-sm">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar1} />
                        </div>
                      </div>
                      <div className="avatar-icon-wrapper avatar-icon-sm">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar2} />
                        </div>
                      </div>
                      <div className="avatar-icon-wrapper avatar-icon-sm">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar6} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-item-offset">9:25</div>
                  <div className="timeline-item--content">
                    <div className="timeline-item--icon" />
                    <h4 className="timeline-item--label mb-2 font-weight-bold">
                      Business investor meeting
                    </h4>
                    <p>
                      Mosaic, the first graphical browser, is introduced to the
                      average consumer.
                    </p>
                    <div className="mt-3">
                      <a href="#/" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="img-fluid rounded mr-3 shadow-sm"
                          src={people1}
                          width="70"
                        />
                      </a>
                      <a href="#/" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="img-fluid rounded shadow-sm"
                          src={people3}
                          width="70"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-item-offset">9:25</div>
                  <div className="timeline-item--content">
                    <div className="timeline-item--icon" />
                    <h4 className="timeline-item--label mb-2 font-weight-bold">
                      Learning round table gathering
                    </h4>
                    <p>First ever iPod launches.</p>
                    <div className="mt-2">
                      <Button size="small" color="primary" variant="contained">
                        Submit Report
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-item-offset">9:25</div>
                  <div className="timeline-item--content">
                    <div className="timeline-item--icon" />
                    <h4 className="timeline-item--label mb-2 font-weight-bold">
                      2003
                    </h4>
                    <p>MySpace becomes the most popular social network.</p>
                  </div>
                </div>
              </div>
            </PerfectScrollbar>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="text-center my-5">
            <div className="avatar-icon-wrapper rounded-circle m-0">
              <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-danger text-danger m-0 d-130">
                <FontAwesomeIcon
                  icon={['fas', 'times']}
                  className="d-flex align-self-center display-3"
                />
              </div>
            </div>
            <h6 className="font-weight-bold font-size-lg mb-1 mt-4 text-black">
              Incoming messages
            </h6>
            <p className="text-black-50 mb-0">
              You have pending actions to take care of.
            </p>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className="text-center my-4">
            <ButtonGroup className="mx-auto" variant="text">
              <Button className="btn-outline-second active btn-transition-none">
                Income
              </Button>
              <Button className="btn-outline-second btn-transition-none">
                Expenses
              </Button>
            </ButtonGroup>
          </div>

          <div className="text-center text-black font-size-xl pb-2 font-weight-bold">
            Total Sales
            <small className="d-block text-black-50">
              Total performance for selected period
            </small>
          </div>
          <div className="px-2 pb-3 pt-2">
            <Chart
              options={chartComposed2Options}
              series={chartComposed2Data}
              type="bar"
              height={210}
            />
          </div>
        </TabPanel>

        <div className="text-center pt-3 pb-4">
          <Button className="btn-primary px-4 btn-gradient badge-wrapper bg-midnight-bloom">
            <Tooltip title="You have 472 new messages">
              <div className="badge badge-warning badge-position badge-position--top-right badge-circle-inner">
                New notifications
              </div>
            </Tooltip>
            <span className="btn-wrapper--label">Learn more</span>
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={['fas', 'arrow-right']} />
            </span>
          </Button>
        </div>
      </Card>
    </>
  );
}
