import React, { useState } from 'react';
import clsx from 'clsx';
import { Collapse } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import SidebarUserbox from '../SidebarUserbox';
import ChevronRightTwoToneIcon from '@material-ui/icons/ChevronRightTwoTone';
import { useSelector } from 'react-redux';
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
// import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
 import PaymentIcon from '@material-ui/icons/Payment';
// import AssessmentIcon from '@material-ui/icons/Assessment';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const SidebarMenu = (props) => {
  const authUser = useSelector(state => state.UserAuthenticationReducer.oUserAuth);

  const { setSidebarToggleMobile, sidebarUserbox } = props;
  const toggleSidebarMobile = () => setSidebarToggleMobile(false);

  const [madebOpen, setMadebOpen] = useState(false);
  const toggleMadeb = (event) => {
    setMadebOpen(!madebOpen);
    event.preventDefault();
  };
  const [reportOpen, setReportOpen] = useState(false);
  const toggleReport = (event) => {
    setReportOpen(!reportOpen);
    event.preventDefault();
  };
  const [reportMadebOpen, setReportMadebOpen] = useState(false);
  const toggleReportMadeb = (event) => {
    setReportMadebOpen(!reportMadebOpen);
    event.preventDefault();
  };
  const [mastersOpen, setMastersOpen] = useState(false);
  const toggleMasters = (event) => {
    setMastersOpen(!mastersOpen);
    event.preventDefault();
  };

  const [bookSerialOpen, setbookSerialOpen] = useState(false);
  const toggleBookSerial = (event) => {
    setbookSerialOpen(!bookSerialOpen);
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
            {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 1)) !== undefined
              &&
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
              </li>}
            {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 2)) !== undefined
              &&
              <li>
                <NavLink
                  activeClassName="active"
                  onClick={toggleSidebarMobile}
                  className="nav-link-simple"
                  to="/Search">
                  <span className="sidebar-icon">
                    <SearchIcon />
                  </span>
                Search
              </NavLink>
              </li>}
            {authUser
              &&
              ((authUser.lFeatureUserrights.find(x => x.nFeatureID === 3)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 4)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 5)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 6)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 7)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 8)) !== undefined)
              &&
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
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 3)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Sarso">
                          Sarso Madeb
                    </NavLink>
                      </li>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 4)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Norchoe">
                          Norchoe Madeb
                    </NavLink>
                      </li>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 5)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Bhorlak">
                          Bhorlak Madeb
                    </NavLink>
                      </li>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 6)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/BookFull">
                          Book Full
                    </NavLink>
                      </li>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 7)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/BriefGB">
                          Brief GB
                    </NavLink>
                      </li>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 8)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Abroad">
                          Abroad
                    </NavLink>
                      </li>}
                  </ul>
                </Collapse>
              </li>}
            {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 9)) !== undefined
              &&
              <li>
                <NavLink
                  activeClassName="active"
                  onClick={toggleSidebarMobile}
                  className="nav-link-simple"
                  to="/GiveGBID">
                  <span className="sidebar-icon">
                    <FormatListNumberedIcon />
                  </span>
                  Give GB ID
                </NavLink>
              </li>}
            {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 10)) !== undefined
              &&
              <li>
                <NavLink
                  activeClassName="active"
                  onClick={toggleSidebarMobile}
                  className="nav-link-simple"
                  to="/SarsoNewGBEntry">
                  <span className="sidebar-icon">
                    <AddBoxIcon />
                  </span>
                    New Entry
                  </NavLink>
              </li>}
            {authUser &&
              ((authUser.lFeatureUserrights.find(x => x.nFeatureID === 11)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 12)) !== undefined)
              &&
              <li>
                <a
                  href="#/"
                  onClick={toggleBookSerial}
                  className={clsx({ active: bookSerialOpen })}>
                  <span className="sidebar-icon">
                    <AppsIcon />
                  </span>
                  <span className="sidebar-item-label">Book Serial Numbers</span>
                  <span className="sidebar-icon-indicator">
                    <ChevronRightTwoToneIcon />
                  </span>
                </a>
                <Collapse in={bookSerialOpen}>
                  <ul>
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 11)) !== undefined
                      &&
                      <li>
                        <NavLink
                          activeClassName="active"
                          onClick={toggleSidebarMobile}
                          className="nav-link-simple"
                          to="/NewGreenBookSerial">
                          {/*<span className="sidebar-icon">
                            <FormatListNumberedRtlIcon />
                    </span>*/}
                      Give Book Serial Number
                    </NavLink>
                      </li>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 12)) !== undefined
                      &&
                      <li>
                        <NavLink
                          activeClassName="active"
                          onClick={toggleSidebarMobile}
                          className="nav-link-simple"
                          to="/GreenBookSerial">
                          {/*<span className="sidebar-icon">
                            <FormatListNumberedRtlIcon />
                    </span>*/}
                        Edit Book Serial Number
                      </NavLink>
                      </li>}
                  </ul>
                </Collapse>
              </li>}
            {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 13)) !== undefined
              &&
              <li>
                <NavLink
                  activeClassName="active"
                  onClick={toggleSidebarMobile}
                  className="nav-link-simple"
                  to="/Print">
                  <span className="sidebar-icon">
                    <PrintIcon />
                  </span>
                Print
              </NavLink>
              </li>}
            {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 14)) !== undefined
              &&
              <li>
                <NavLink
                  activeClassName="active"
                  onClick={toggleSidebarMobile}
                  className="nav-link-simple"
                  to="/IssueBook">
                  <span className="sidebar-icon">
                    <MenuBookIcon />
                  </span>
                Issue Book
              </NavLink>
              </li>}
            {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 15)) !== undefined
              &&
              <li>
                <NavLink
                  activeClassName="active"
                  onClick={toggleSidebarMobile}
                  className="nav-link-simple"
                  to="/MakeList">
                  <span className="sidebar-icon">
                    <ListAltIcon />
                  </span>
                Make List
              </NavLink>
              </li>}
            {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 16)) !== undefined
              &&
              <li>
                <NavLink
                  activeClassName="active"
                  onClick={toggleSidebarMobile}
                  className="nav-link-simple"
                  to="/Greenbooks">
                  <span className="sidebar-icon">
                    <FormatListNumberedIcon />
                  </span>
                  Edit GB
                </NavLink>
              </li>}
            {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 17)) !== undefined
              &&
              <li>
                <NavLink
                  activeClassName="active"
                  onClick={toggleSidebarMobile}
                  className="nav-link-simple"
                  to="/DeleteGB">
                  <span className="sidebar-icon">
                    <DeleteIcon />
                  </span>
                    Delete
                  </NavLink>
              </li>}
            {authUser &&
              ((authUser.lFeatureUserrights.find(x => x.nFeatureID === 18)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 19)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 20)) !== undefined)
              &&
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
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 18)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Users">
                          Manage Users
                    </NavLink>
                      </li>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 19)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/FeatureRights">
                          Manage Feature Rights
                    </NavLink>
                      </li>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 20)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/UserRights">
                          Manage Roles
                    </NavLink>
                      </li>}
                  </ul>
                </Collapse>
              </li>}
            {authUser &&
              ((authUser.lFeatureUserrights.find(x => x.nFeatureID === 21)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 22)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 23)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 24)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 25)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 26)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 27)) !== undefined
                //||
                //(authUser.lFeatureUserrights.find(x => x.nFeatureID === 28)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 29)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 30)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 31)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 32)) !== undefined)
              &&
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
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 21)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Region">
                          Region
                      </NavLink>
                      </li>
                    }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 22)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/AuthRegion">
                          Authority Region
                      </NavLink>
                      </li>
                    }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 23)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Country">
                          Country
                      </NavLink>
                      </li>
                    }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 24)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Occupation">
                          Occupation
                      </NavLink>
                      </li>
                    }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 25)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Province">
                          Province
                      </NavLink>
                      </li>
                    }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 26)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Qualification">
                          Qualification
                      </NavLink>
                      </li>
                    }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 27)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Relation">
                          Relation
                      </NavLink>
                      </li>
                    }
                    {/*{
                      authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 28)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Feature">
                          Feature
                      </NavLink>
                      </li>
                    }*/}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 29)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/MadebType">
                          Madeb Type
                      </NavLink>
                      </li>
                    }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 30)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/TypeIssued">
                          Type Issued
                      </NavLink>
                      </li>
                    }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 31)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/ChatrelMaster">
                          Chatrel Configuration
                      </NavLink>
                      </li>
                    }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 32)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/CTAConfig">
                          CTA Configuration
                      </NavLink>
                      </li>
                    }
                  </ul>
                </Collapse>
              </li>}

            {/*<li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Edit">
                <span className="sidebar-icon">
                  <EditIcon />
                </span>
                Edit
              </NavLink>
            </li>*/}

            {/*<li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Payments">
                <span className="sidebar-icon">
                  <PaymentIcon />
                </span>
                Payment
              </NavLink>
            </li>*/}

            {/*<li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Reports">
                <span className="sidebar-icon">
                  <AssessmentIcon />
                </span>
                Reports
              </NavLink>
            </li>*/}
            { /* authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 37)) !== undefined
              &&*/
              <li>
                <NavLink
                  activeClassName="active"
                  onClick={toggleSidebarMobile}
                  className="nav-link-simple"
                  to="/Chatrel">
                  <span className="sidebar-icon">
                    <PaymentIcon />
                  </span>
                Chatrel
              </NavLink>
            </li>}
            {authUser &&
              ((authUser.lFeatureUserrights.find(x => x.nFeatureID === 33)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 34)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 35)) !== undefined
                ||
               /* (authUser.lFeatureUserrights.find(x => x.nFeatureID === 36)) !== undefined
                ||*/
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 37)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 38)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 39)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 40)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 41)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 42)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 43)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 44)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 45)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 47)) !== undefined)
              &&
              <li>
                <a
                  href="#/"
                  onClick={toggleReport}
                  className={clsx({ active: reportOpen })}>
                  <span className="sidebar-icon">
                    <PeopleIcon />
                  </span>
                  <span className="sidebar-item-label">Reports</span>
                  <span className="sidebar-icon-indicator">
                    <ChevronRightTwoToneIcon />
                  </span>
                </a>
                <Collapse in={reportOpen}>
                  <ul>
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 33)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Reports/GreenBookIssuedOverall">
                          Green Book Issued Overall
                    </NavLink>
                      </li>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 34)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Reports/GreenBookIssuedIndividual">
                          Green Book Issued Individual
                    </NavLink>
                      </li>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 35)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Reports/ChangesLog">
                          Changes Log
                    </NavLink>
                      </li>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 36)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Reports/ChildChangesLog">
                          Child Changes Log
                    </NavLink>
                      </li>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 37)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Reports/NewEntryFromDay">
                          New Entry From Day
                    </NavLink>
                      </li>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 38)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Reports/Below6Years">
                          Below 6 Year Region/Country Wise
                    </NavLink>
                      </li>}
                  {  authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 47)) !== undefined
                      && 
                     <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Reports/DeletedGB">
                          Deleted Green Book Report 
                    </NavLink>
                      </li>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 39)) !== undefined
                      &&
                      <li>
                        <NavLink
                          onClick={toggleSidebarMobile}
                          to="/Reports/Deceased">
                          Deceased Region/Country Wise
                    </NavLink>
                      </li>}
                    {authUser &&
                      ((authUser.lFeatureUserrights.find(x => x.nFeatureID === 40)) !== undefined
                        ||
                        (authUser.lFeatureUserrights.find(x => x.nFeatureID === 41)) !== undefined
                        ||
                        (authUser.lFeatureUserrights.find(x => x.nFeatureID === 42)) !== undefined
                        ||
                        (authUser.lFeatureUserrights.find(x => x.nFeatureID === 43)) !== undefined
                        ||
                        (authUser.lFeatureUserrights.find(x => x.nFeatureID === 44)) !== undefined
                        ||
                        (authUser.lFeatureUserrights.find(x => x.nFeatureID === 45)) !== undefined)
                      &&
                      <li>
                        <a
                          href="#/"
                          onClick={toggleReportMadeb}
                          className={clsx({ active: reportMadebOpen })}>

                          <span className="sidebar-item-label">Madeb Report</span>
                          <span className="sidebar-icon-indicator">
                            <ChevronRightTwoToneIcon />
                          </span>
                        </a>
                        <Collapse in={reportMadebOpen}>
                          <ul>
                            {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 40)) !== undefined
                              &&
                              <li>
                                <NavLink
                                  onClick={toggleSidebarMobile}
                                  to="/Reports/Madeb/Sarso">
                                  Sarso Report
                    </NavLink>
                              </li>}
                            {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 41)) !== undefined
                              &&
                              <li>
                                <NavLink
                                  onClick={toggleSidebarMobile}
                                  to="/Reports/Madeb/Norchoe">
                                  Norchoe Report
                    </NavLink>
                              </li>}
                            {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 42)) !== undefined
                              &&
                              <li>
                                <NavLink
                                  onClick={toggleSidebarMobile}
                                  to="/Reports/Madeb/Bhorlak">
                                  Bhorlak Report
                    </NavLink>
                              </li>}
                            {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 43)) !== undefined
                              &&
                              <li>
                                <NavLink
                                  onClick={toggleSidebarMobile}
                                  to="/Reports/Madeb/BookFull">
                                  Book Full Report
                    </NavLink>
                              </li>}
                            {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 44)) !== undefined
                              &&
                              <li>
                                <NavLink
                                  onClick={toggleSidebarMobile}
                                  to="/Reports/Madeb/BriefGB">
                                  Brief GB Report
                    </NavLink>
                              </li>}
                            {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 45)) !== undefined
                              &&
                              <li>
                                <NavLink
                                  onClick={toggleSidebarMobile}
                                  to="/Reports/Madeb/Abroad">
                                  Abroad Report
                    </NavLink>
                              </li>}

                          </ul>
                        </Collapse>
                      </li>}

                  </ul>
                </Collapse>
              </li>}
            {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 46)) !== undefined
              &&
              <li>
                <NavLink
                  activeClassName="active"
                  onClick={toggleSidebarMobile}
                  className="nav-link-simple"
                  to="/ChangePassword">
                  <span className="sidebar-icon">
                    <VpnKeyIcon />
                  </span>
                        Change Password
                      </NavLink>
              </li>}
            <div style={{ paddingTop: '100px' }}>
            </div>
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
