import React from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';

import { NavLink } from 'react-router-dom';

import projectLogo from '../../assets/images/react.svg';

import VerifiedUserTwoToneIcon from '@material-ui/icons/VerifiedUserTwoTone';
import RoomTwoToneIcon from '@material-ui/icons/RoomTwoTone';
import CameraAltTwoToneIcon from '@material-ui/icons/CameraAltTwoTone';
import CollectionsTwoToneIcon from '@material-ui/icons/CollectionsTwoTone';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import BusinessCenterTwoToneIcon from '@material-ui/icons/BusinessCenterTwoTone';
import AssessmentTwoToneIcon from '@material-ui/icons/AssessmentTwoTone';
import CameraTwoToneIcon from '@material-ui/icons/CameraTwoTone';

const SidebarCollapsed = (props) => {
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };

  const {
    sidebarShadow,
    sidebarStyle,
    sidebarToggleMobile,
    setSidebarToggleMobile
  } = props;

  return (
    <>
      <div
        className={clsx(
          'app-sidebar app-sidebar--collapsed app-sidebar--mini',
          sidebarStyle,
          { 'app-sidebar--shadow': sidebarShadow }
        )}>
        <div className="app-sidebar--header">
          <div className="app-sidebar-logo">
            <NavLink
              to="/DashboardAnalytics"
              title="Bamburgh React Admin Dashboard with Material-UI PRO"
              className="app-sidebar-logo">
              <div className="app-sidebar-logo--icon">
                <img
                  alt="Bamburgh React Admin Dashboard with Material-UI PRO"
                  src={projectLogo}
                />
              </div>
            </NavLink>
          </div>
        </div>

        <div className="app-sidebar--content">
          <PerfectScrollbar>
            <ul className="mt-2 sidebar-menu-collapsed">
              <li>
                <Tooltip
                  classes={{ tooltip: 'tooltip-secondary text-nowrap' }}
                  arrow
                  placement="right"
                  title="Chat">
                  <NavLink activeClassName="active" to="/PageChat">
                    <span>
                      <VerifiedUserTwoToneIcon />
                    </span>
                  </NavLink>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  classes={{ tooltip: 'tooltip-secondary text-nowrap' }}
                  arrow
                  placement="right"
                  title="Calendar">
                  <NavLink activeClassName="active" to="/PageCalendar">
                    <span>
                      <RoomTwoToneIcon />
                    </span>
                  </NavLink>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  classes={{ tooltip: 'tooltip-secondary text-nowrap' }}
                  arrow
                  placement="right"
                  title="File Manager">
                  <NavLink activeClassName="active" to="/PageFileManager">
                    <span>
                      <CameraAltTwoToneIcon />
                    </span>
                  </NavLink>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  classes={{ tooltip: 'tooltip-secondary text-nowrap' }}
                  arrow
                  placement="right"
                  title="Projects">
                  <NavLink activeClassName="active" to="/PageProjects">
                    <span>
                      <CollectionsTwoToneIcon />
                    </span>
                  </NavLink>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  classes={{ tooltip: 'tooltip-secondary text-nowrap' }}
                  arrow
                  placement="right"
                  title="Profile">
                  <NavLink activeClassName="active" to="/PageProfile">
                    <span>
                      <FavoriteTwoToneIcon />
                    </span>
                  </NavLink>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  classes={{ tooltip: 'tooltip-secondary text-nowrap' }}
                  arrow
                  placement="right"
                  title="Monitoring Dashboard">
                  <NavLink activeClassName="active" to="/DashboardMonitoring">
                    <span>
                      <BusinessCenterTwoToneIcon />
                    </span>
                  </NavLink>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  classes={{ tooltip: 'tooltip-secondary text-nowrap' }}
                  arrow
                  placement="right"
                  title="Analytics Dashboard">
                  <NavLink activeClassName="active" to="/DashboardAnalytics">
                    <span>
                      <AssessmentTwoToneIcon />
                    </span>
                  </NavLink>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  classes={{ tooltip: 'tooltip-secondary text-nowrap' }}
                  arrow
                  placement="right"
                  title="Statistics Dashboard">
                  <NavLink activeClassName="active" to="/DashboardStatistics">
                    <span>
                      <CameraTwoToneIcon />
                    </span>
                  </NavLink>
                </Tooltip>
              </li>
            </ul>
            <div className="text-center mb-2">
              <Tooltip
                classes={{ tooltip: 'tooltip-secondary text-nowrap' }}
                arrow
                placement="right"
                title="Back to dashboard">
                <Button
                  component={NavLink}
                  variant="contained"
                  className="btn-warning btn-icon m-1 p-0 shadow-none text-center font-size-lg d-40 rounded"
                  to="/DashboardAnalytics">
                  <FontAwesomeIcon icon={['fas', 'arrow-left']} />
                </Button>
              </Tooltip>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
      <div
        onClick={toggleSidebarMobile}
        className={clsx('app-sidebar-overlay', {
          'is-active': sidebarToggleMobile
        })}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  sidebarShadow: state.ThemeOptions.sidebarShadow,
  sidebarStyle: state.ThemeOptions.sidebarStyle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCollapsed);
