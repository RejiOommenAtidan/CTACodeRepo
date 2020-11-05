import React, { useState } from 'react';

import clsx from 'clsx';

import { Collapse } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';

import SidebarUserbox from '../SidebarUserbox';

import ChevronRightTwoToneIcon from '@material-ui/icons/ChevronRightTwoTone';
import VerifiedUserTwoToneIcon from '@material-ui/icons/VerifiedUserTwoTone';
import RoomTwoToneIcon from '@material-ui/icons/RoomTwoTone';
import CameraAltTwoToneIcon from '@material-ui/icons/CameraAltTwoTone';
import CollectionsTwoToneIcon from '@material-ui/icons/CollectionsTwoTone';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import BusinessCenterTwoToneIcon from '@material-ui/icons/BusinessCenterTwoTone';
import AssessmentTwoToneIcon from '@material-ui/icons/AssessmentTwoTone';
import MoveToInboxTwoToneIcon from '@material-ui/icons/MoveToInboxTwoTone';
import BallotTwoToneIcon from '@material-ui/icons/BallotTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import DepartureBoardTwoToneIcon from '@material-ui/icons/DepartureBoardTwoTone';
import LibraryBooksTwoToneIcon from '@material-ui/icons/LibraryBooksTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import DevicesOtherTwoToneIcon from '@material-ui/icons/DevicesOtherTwoTone';
import LinkTwoToneIcon from '@material-ui/icons/LinkTwoTone';

import SecurityTwoToneIcon from '@material-ui/icons/SecurityTwoTone';
import CameraTwoToneIcon from '@material-ui/icons/CameraTwoTone';

import HomeIcon from '@material-ui/icons/Home';

import { useSelector, useDispatch } from 'react-redux';
import { storeCurrentGBDetails } from '../../actions/transactions/CurrentGBDetailsAction';
import {storeGoogleCreds} from '../../actions/transactions/CurrentGBDetailsAction';

const SidebarMenu = (props) => {
  const { setSidebarToggleMobile, sidebarUserbox } = props;

  const toggleSidebarMobile = () => setSidebarToggleMobile(false);

  const [dashboardOpen, setDashboardOpen] = useState(false);
  const toggleDashboard = (event) => {
    setDashboardOpen(!dashboardOpen);
    event.preventDefault();
  };

  const [elementsOpen, setElementsOpen] = useState(false);
  const toggleElements = (event) => {
    setElementsOpen(!elementsOpen);
    event.preventDefault();
  };

  const [pagesOpen, setPagesOpen] = useState(false);
  const togglePages = (event) => {
    setPagesOpen(!pagesOpen);
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
  const dispatch = useDispatch();
  const userObj = useSelector(state => state.GBDetailsReducer.oGBDetails);
  const selfPayment =() =>{
    
    let obj={
      nGBID:userObj.nGBID,
      from:'Chatrel for Self'
    }
    toggleSidebarMobile();
    dispatch(storeCurrentGBDetails(obj));

  }
  
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
                onClick={()=>{selfPayment(); }}
                className="nav-link-simple"
                to="/PaymentPage">
                <span className="sidebar-icon">
                  <HomeIcon />
                </span>
                Chatrel for Self
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Family">
                <span className="sidebar-icon">
                  <HomeIcon />
                </span>
                 Chatrel for Family
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Friends">
                <span className="sidebar-icon">
                  <HomeIcon />
                </span>
                Chatrel for Friends
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/PaymentHistory">
                <span className="sidebar-icon">
                  <HomeIcon />
                </span>
                Chatrel History
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
