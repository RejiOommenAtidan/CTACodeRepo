import React, { useState } from 'react';

import clsx from 'clsx';

import { Collapse } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';

import SidebarUserbox from '../SidebarUserbox';

import ChevronRightTwoToneIcon from '@material-ui/icons/ChevronRightTwoTone';


import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';
import SearchIcon from '@material-ui/icons/Search';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import PrintIcon from '@material-ui/icons/Print';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleIcon from '@material-ui/icons/People';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PaymentIcon from '@material-ui/icons/Payment';
import AssessmentIcon from '@material-ui/icons/Assessment';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


const SidebarMenu = (props) => {
  const { setSidebarToggleMobile, sidebarUserbox } = props;

  const toggleSidebarMobile = () => setSidebarToggleMobile(false);

  const [madebOpen, setMadebOpen] = useState(false);
  const toggleMadeb = (event) => {
    setMadebOpen(!madebOpen);
    event.preventDefault();
  };

  const [mastersOpen, setMastersOpen] = useState(false);
  const toggleMasters = (event) => {
    setMastersOpen(!mastersOpen);
    event.preventDefault();
  };

  const [usersOpen, setUsersOpen] = useState(false);
  const toggleUsers = (event) => {
    setUsersOpen(!usersOpen);
    event.preventDefault();
  };

  const [otherPagesOpen, setOtherPagesOpen] = useState(false);
  const toggleOtherPages = (event) => {
    setOtherPagesOpen(!otherPagesOpen);
    event.preventDefault();
  };

  const [applicationOpen, setApplicationOpen] = useState(false);
  const toggleApplication = (event) => {
    setApplicationOpen(!applicationOpen);
    event.preventDefault();
  };

  const [designSystemOpen, setDesignSystemOpen] = useState(false);
  const toggleDesignSystem = (event) => {
    setDesignSystemOpen(!designSystemOpen);
    event.preventDefault();
  };

  const [blocksOpen, setBlocksOpen] = useState(false);
  const toggleBlocks = (event) => {
    setBlocksOpen(!blocksOpen);
    event.preventDefault();
  };

  const [levelsOpen, setLevelsOpen] = useState(false);
  const toggleLevels = (event) => {
    setLevelsOpen(!levelsOpen);
    event.preventDefault();
  };

  const [widgetsOpen, setWidgetsOpen] = useState(false);
  const toggleWidgets = (event) => {
    setWidgetsOpen(!widgetsOpen);
    event.preventDefault();
  };

  const [chartsOpen, setChartsOpen] = useState(false);
  const toggleCharts = (event) => {
    setChartsOpen(!chartsOpen);
    event.preventDefault();
  };

  const [uiKitComponentsOpen, setUiKitComponents] = useState(false);
  const toggleUiKitComponents = (event) => {
    setUiKitComponents(!uiKitComponentsOpen);
    event.preventDefault();
  };

  const [formsComponentsOpen, setFormsComponents] = useState(false);
  const toggleFormsComponents = (event) => {
    setFormsComponents(!formsComponentsOpen);
    event.preventDefault();
  };

  const [collapsedLayoutOpen, setCollapsedLayoutOpen] = useState(false);
  const toggleCollapsedLayout = (event) => {
    setCollapsedLayoutOpen(!collapsedLayoutOpen);
    event.preventDefault();
  };

  const [pagesLoginOpen, setPagesLoginOpen] = useState(false);
  const togglePagesLogin = (event) => {
    setPagesLoginOpen(!pagesLoginOpen);
    event.preventDefault();
  };

  const [pagesRegisterOpen, setPagesRegisterOpen] = useState(false);
  const togglePagesRegister = (event) => {
    setPagesRegisterOpen(!pagesRegisterOpen);
    event.preventDefault();
  };

  const [pagesRecoverOpen, setPagesRecoverOpen] = useState(false);
  const togglePagesRecover = (event) => {
    setPagesRecoverOpen(!pagesRecoverOpen);
    event.preventDefault();
  };

  return (
    <>
      <PerfectScrollbar>
        {sidebarUserbox && <SidebarUserbox />}
        <div className="sidebar-navigation">
          <ul>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Home">
                <span className="sidebar-icon">
                  <HomeIcon />
                </span>
                Home
               
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Overview">
                <span className="sidebar-icon">
                  <SearchIcon />
                </span>
                Search
                
              </NavLink>
            </li>
            <li>
              <a
                href="#/"
                onClick={toggleMadeb}
                className={clsx({ active: madebOpen })}>
                <span className="sidebar-icon">
                  <ListIcon />
                </span>
                <span className="sidebar-item-label">Madeb</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRightTwoToneIcon />
                </span>
              </a>
              <Collapse in={madebOpen}>
                <ul>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardMonitoring">
                      Sarso Madeb
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardCommerce">
                      Norchoe Madeb
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardAnalytics">
                      Bhorlak Madeb
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardStatistics">
                      Book Full
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardStatistics">
                      Brief GB
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardStatistics">
                      Abroad
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
            <li>
              <a
                href="#/"
                onClick={toggleMasters}
                className={clsx({ active: mastersOpen })}>
                <span className="sidebar-icon">
                  <AppsIcon />
                </span>
                <span className="sidebar-item-label">Masters</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRightTwoToneIcon />
                </span>
              </a>
              <Collapse in={mastersOpen}>
                <ul>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardMonitoring">
                      Region
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardCommerce">
                      Authority
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/Country">
                      Country
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardStatistics">
                      Occupation
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardStatistics">
                      Provinces
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardStatistics">
                      Qualification
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Overview">
                <span className="sidebar-icon">
                  <FormatListNumberedIcon />
                </span>
                Give GB Number
               
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/NewEntry">
                <span className="sidebar-icon">
                  <AddBoxIcon />
                </span>
                New Entry
                
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Overview">
                <span className="sidebar-icon">
                  <FormatListNumberedRtlIcon />
                </span>
                Give Serial Number
                
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Overview">
                <span className="sidebar-icon">
                  <PrintIcon />
                </span>
                Print
                
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Overview">
                <span className="sidebar-icon">
                  <MenuBookIcon />
                </span>
                Issue Book
                
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Overview">
                <span className="sidebar-icon">
                  <ListAltIcon />
                </span>
                Make List
                
              </NavLink>
            </li>
            <li>
              <a
                href="#/"
                onClick={toggleUsers}
                className={clsx({ active: usersOpen })}>
                <span className="sidebar-icon">
                  <PeopleIcon />
                </span>
                <span className="sidebar-item-label">Users</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRightTwoToneIcon />
                </span>
              </a>
              <Collapse in={usersOpen}>
                <ul>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardMonitoring">
                      Add/Edit
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardCommerce">
                      Manage Roles
                    </NavLink>
                  </li>
                 
                </ul>
              </Collapse>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Overview">
                <span className="sidebar-icon">
                  <EditIcon />
                </span>
                Edit
                
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Overview">
                <span className="sidebar-icon">
                  <DeleteIcon />
                </span>
                Delete
                
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Overview">
                <span className="sidebar-icon">
                  <PaymentIcon />
                </span>
                Payment
                
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Overview">
                <span className="sidebar-icon">
                  <AssessmentIcon />
                </span>
                Reports
                
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Overview">
                <span className="sidebar-icon">
                  <VpnKeyIcon />
                </span>
                Change Password
                
              </NavLink>
            </li>
            
          </ul>
        </div>
      </PerfectScrollbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  sidebarUserbox: state.ThemeOptions.sidebarUserbox,

  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
