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

  return (
    <>
      <PerfectScrollbar>
        {sidebarUserbox && <SidebarUserbox />}
        <div className="sidebar-navigation">
          <div className="sidebar-header">
            <span>Navigation menu</span>
          </div>
          <ul>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Overview">
                <span className="sidebar-icon">
                  <BallotTwoToneIcon />
                </span>
                Overview
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRightTwoToneIcon />
                </span>
              </NavLink>
            </li>
            <li>
              <a
                href="#/"
                onClick={toggleDashboard}
                className={clsx({ active: dashboardOpen })}>
                <span className="sidebar-icon">
                  <VerifiedUserTwoToneIcon />
                </span>
                <span className="sidebar-item-label">Dashboards</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRightTwoToneIcon />
                </span>
              </a>
              <Collapse in={dashboardOpen}>
                <ul>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardMonitoring">
                      Monitoring
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardCommerce">
                      Commerce
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardAnalytics">
                      Analytics
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardStatistics">
                      Statistics
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
            <li>
              <a
                href="#/"
                onClick={toggleApplication}
                className={clsx({ active: applicationOpen })}>
                <span className="sidebar-icon">
                  <SecurityTwoToneIcon />
                </span>
                <span className="sidebar-item-label">
                  Applications
                  <div className="badge badge-danger rounded-circle mr-4">
                    7
                  </div>
                </span>
                <span className="sidebar-icon-indicator">
                  <ChevronRightTwoToneIcon />
                </span>
              </a>
              <Collapse in={applicationOpen}>
                <ul>
                  <li>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="active">
                      <span className="sidebar-icon">
                        <LinkTwoToneIcon />
                      </span>
                      <span className="sidebar-item-label">General</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://demo.uifort.com/bamburgh-react-crypto-application-pro-demo"
                      target="_blank"
                      rel="noopener noreferrer">
                      <span className="sidebar-icon">
                        <LinkTwoToneIcon />
                      </span>
                      <span className="sidebar-item-label">Crypto</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://demo.uifort.com/bamburgh-react-messenger-application-pro-demo"
                      target="_blank"
                      rel="noopener noreferrer">
                      <span className="sidebar-icon">
                        <LinkTwoToneIcon />
                      </span>
                      <span className="sidebar-item-label">
                        Messenger
                        <div className="badge badge-success">New</div>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://demo.uifort.com/bamburgh-react-commerce-application-pro-demo"
                      target="_blank"
                      rel="noopener noreferrer">
                      <span className="sidebar-icon">
                        <LinkTwoToneIcon />
                      </span>
                      <span className="sidebar-item-label">Commerce</span>
                    </a>
                  </li>
                </ul>
              </Collapse>
            </li>
          </ul>
          <div className="sidebar-header">
            <span>Blocks</span>
          </div>
          <ul>
            <li>
              <a
                href="#/"
                onClick={toggleElements}
                className={clsx({ active: elementsOpen })}>
                <span className="sidebar-icon">
                  <CameraAltTwoToneIcon />
                </span>
                <span className="sidebar-item-label">Elements</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRightTwoToneIcon />
                </span>
              </a>
              <Collapse in={elementsOpen}>
                <ul>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/ElementsAvatars">
                      Avatars
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/ElementsBadges">
                      Badges
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/ElementsButtons">
                      Buttons
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/ElementsDropdowns">
                      Dropdowns
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/ElementsIcons">
                      Icons
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/ElementsNavigationMenus">
                      Navigation Menus
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/ElementsPagination">
                      Pagination
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/ElementsProgressBars">
                      Progress Bars
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/ElementsRatings">
                      Ratings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/ElementsRibbons">
                      Ribbons
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/ElementsScrollable">
                      Scrollable Boxes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/ElementsSearchBars">
                      Search Bars
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/ElementsTimelines">
                      Timelines
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/ElementsUtilitiesHelpers">
                      Utilities & Helpers
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
            <li>
              <a
                href="#/"
                onClick={toggleBlocks}
                className={clsx({ active: blocksOpen })}>
                <span className="sidebar-icon">
                  <CollectionsTwoToneIcon />
                </span>
                <span className="sidebar-item-label">Data Display</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRightTwoToneIcon />
                </span>
              </a>
              <Collapse in={blocksOpen}>
                <ul>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/BlocksChartsLarge">
                      Charts Large
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/BlocksChartsSmall">
                      Charts Small
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/BlocksComposed">
                      Composed Cards
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/BlocksContentText">
                      Content Text
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/BlocksGrids">
                      Grids
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/BlocksIcons">
                      Icon Cards
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/BlocksImages">
                      Image Cards
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/BlocksListsLarge">
                      Lists Large
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/BlocksListsSmall">
                      Lists Small
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/BlocksNavigation">
                      Navigation
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/BlocksProfilesSmall">
                      Profile Cards
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/BlocksProgressCircular">
                      Progress Circular
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/BlocksProgressHorizontal">
                      Progress Horizontal
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/BlocksSparklinesLarge">
                      Sparklines Large
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/BlocksSparklinesSmall">
                      Sparklines Small
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/BlocksStatistics">
                      Statistics
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
            <li>
              <a
                href="#/"
                onClick={toggleUiKitComponents}
                className={clsx({ active: uiKitComponentsOpen })}>
                <span className="sidebar-icon">
                  <FavoriteTwoToneIcon />
                </span>
                <span className="sidebar-item-label">Marketing</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRightTwoToneIcon />
                </span>
              </a>
              <Collapse in={uiKitComponentsOpen}>
                <ul>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/MarketingCta">
                      Call to Action
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/MarketingFeatureSections">
                      Feature Sections
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/MarketingFooters">
                      Footers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/MarketingHeaders">
                      Headers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/MarketingHero">
                      Hero Sections
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/MarketingIcons">
                      Icon Boxes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/MarketingPartners">
                      Partners
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/MarketingPricingTables">
                      Pricing Tables
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/MarketingTestimonials">
                      Testimonials
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
          </ul>
          <div className="sidebar-header">
            <span>Components</span>
          </div>
          <ul>
            <li>
              <a
                href="#/"
                onClick={toggleWidgets}
                className={clsx({ active: widgetsOpen })}>
                <span className="sidebar-icon">
                  <BusinessCenterTwoToneIcon />
                </span>
                <span className="sidebar-item-label">Widgets</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRightTwoToneIcon />
                </span>
              </a>
              <Collapse in={widgetsOpen}>
                <ul>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/WidgetsAccordions">
                      Accordions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/WidgetsCalendars">
                      Calendars
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/WidgetsCarousels">
                      Carousels
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/WidgetsContextMenus">
                      Context Menus
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/WidgetsCountUp">
                      Count Up
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/WidgetsDragDrop">
                      Drag & Drop
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/WidgetsGuidedTours">
                      Guided Tours
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/WidgetsImageCrop">
                      Image Crop
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/WidgetsLoadingIndicators">
                      Loading Indicators
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/WidgetsModals">
                      Modal Dialogs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/WidgetsNotifications">
                      Notifications
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/WidgetsPopovers">
                      Popovers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/WidgetsTabs">
                      Tabs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/WidgetsTooltips">
                      Tooltips
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/WidgetsTreeView">
                      Tree View
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
            <li>
              <a
                href="#/"
                onClick={toggleCharts}
                className={clsx({ active: chartsOpen })}>
                <span className="sidebar-icon">
                  <AssessmentTwoToneIcon />
                </span>
                <span className="sidebar-item-label">Charts</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRightTwoToneIcon />
                </span>
              </a>
              <Collapse in={chartsOpen}>
                <ul>
                  <li>
                    <NavLink
                      activeClassName="active"
                      onClick={toggleSidebarMobile}
                      to="/ChartsApex">
                      ApexCharts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      activeClassName="active"
                      onClick={toggleSidebarMobile}
                      to="/Chartjs">
                      Chart.js
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      activeClassName="active"
                      onClick={toggleSidebarMobile}
                      to="/ChartsGauges">
                      Gauges
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      activeClassName="active"
                      onClick={toggleSidebarMobile}
                      to="/ChartsSparklines">
                      Sparklines
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
                to="/Tables">
                <span className="sidebar-icon">
                  <MoveToInboxTwoToneIcon />
                </span>
                Tables
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRightTwoToneIcon />
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/Maps">
                <span className="sidebar-icon">
                  <RoomTwoToneIcon />
                </span>
                Maps
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRightTwoToneIcon />
                </span>
              </NavLink>
            </li>
          </ul>
          <div className="sidebar-header">
            <span>Forms</span>
          </div>
          <ul>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/FormsControls">
                <span className="sidebar-icon">
                  <SettingsTwoToneIcon />
                </span>
                Controls
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRightTwoToneIcon />
                </span>
              </NavLink>
            </li>
            <li>
              <a
                href="#/"
                onClick={toggleFormsComponents}
                className={clsx({ active: formsComponentsOpen })}>
                <span className="sidebar-icon">
                  <DepartureBoardTwoToneIcon />
                </span>
                <span className="sidebar-item-label">Components</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRightTwoToneIcon />
                </span>
              </a>
              <Collapse in={formsComponentsOpen}>
                <ul>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/FormsClipboard">
                      Clipboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/FormsColorpicker">
                      Colorpicker
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/FormsDatepicker">
                      Datepicker
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/FormsDualListbox">
                      Dual Listbox
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/FormsInputMask">
                      Input Mask
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/FormsInputSelect">
                      Input Select
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/FormsSlider">
                      Slider
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/FormsSteppers">
                      Steppers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/FormsTextareaAutosize">
                      Textarea Autosize
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/FormsTimepicker">
                      Timepicker
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/FormsToggleSwitch">
                      Toggle Switch
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/FormsTypeahead">
                      Typeahead
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/FormsUpload">
                      Upload
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/FormsValidation">
                      Validation
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/FormsWysiwygEditor">
                      WYSIWYG Editors
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
          </ul>
          <div className="sidebar-header">
            <span>Pages</span>
          </div>
          <ul>
            <li>
              <a
                href="#/"
                onClick={toggleCollapsedLayout}
                className={clsx({ active: collapsedLayoutOpen })}>
                <span className="sidebar-icon">
                  <LibraryBooksTwoToneIcon />
                </span>
                <span className="sidebar-item-label">Apps</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRightTwoToneIcon />
                </span>
              </a>
              <Collapse in={collapsedLayoutOpen}>
                <ul>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/PageCalendar">
                      Calendar
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/PageChat">
                      Chat
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/PageFileManager">
                      File Manager
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/PageProjects">
                      Projects
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
            <li>
              <a
                href="#/"
                onClick={togglePages}
                className={clsx({ active: pagesOpen })}>
                <span className="sidebar-icon">
                  <AccountCircleTwoToneIcon />
                </span>
                <span className="sidebar-item-label">Auth</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRightTwoToneIcon />
                </span>
              </a>
              <Collapse in={pagesOpen}>
                <ul>
                  <li>
                    <a
                      href="#/"
                      onClick={togglePagesLogin}
                      className={clsx('pr-0', { active: pagesLoginOpen })}>
                      <span className="sidebar-item-label">Login</span>
                      <span className="sidebar-icon-indicator">
                        <ChevronRightTwoToneIcon />
                      </span>
                    </a>
                    <Collapse in={pagesLoginOpen}>
                      <ul>
                        <li>
                          <NavLink
                            onClick={toggleSidebarMobile}
                            to="/PageLoginBasic">
                            Basic
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={toggleSidebarMobile}
                            to="/PageLoginCover">
                            Cover
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={toggleSidebarMobile}
                            to="/PageLoginIllustration">
                            Illustration
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={toggleSidebarMobile}
                            to="/PageLoginOverlay">
                            Overlay
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={toggleSidebarMobile}
                            to="/PageAuthModals">
                            Modal Dialogs
                          </NavLink>
                        </li>
                      </ul>
                    </Collapse>
                  </li>
                  <li>
                    <a
                      href="#/"
                      onClick={togglePagesRegister}
                      className={clsx('pr-0', { active: pagesRegisterOpen })}>
                      <span className="sidebar-item-label">Register</span>
                      <span className="sidebar-icon-indicator">
                        <ChevronRightTwoToneIcon />
                      </span>
                    </a>
                    <Collapse in={pagesRegisterOpen}>
                      <ul>
                        <li>
                          <NavLink
                            onClick={toggleSidebarMobile}
                            to="/PageRegisterBasic">
                            Basic
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={toggleSidebarMobile}
                            to="/PageRegisterCover">
                            Cover
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={toggleSidebarMobile}
                            to="/PageRegisterIllustration">
                            Illustration
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={toggleSidebarMobile}
                            to="/PageRegisterOverlay">
                            Overlay
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={toggleSidebarMobile}
                            to="/PageAuthModals">
                            Modal Dialogs
                          </NavLink>
                        </li>
                      </ul>
                    </Collapse>
                  </li>
                  <li>
                    <a
                      href="#/"
                      onClick={togglePagesRecover}
                      className={clsx('pr-0', { active: pagesRecoverOpen })}>
                      <span className="sidebar-item-label">Recover</span>
                      <span className="sidebar-icon-indicator">
                        <ChevronRightTwoToneIcon />
                      </span>
                    </a>
                    <Collapse in={pagesRecoverOpen}>
                      <ul>
                        <li>
                          <NavLink
                            onClick={toggleSidebarMobile}
                            to="/PageRecoverBasic">
                            Basic
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={toggleSidebarMobile}
                            to="/PageRecoverCover">
                            Cover
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={toggleSidebarMobile}
                            to="/PageRecoverIllustration">
                            Illustration
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={toggleSidebarMobile}
                            to="/PageRecoverOverlay">
                            Overlay
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={toggleSidebarMobile}
                            to="/PageAuthModals">
                            Modal Dialogs
                          </NavLink>
                        </li>
                      </ul>
                    </Collapse>
                  </li>
                </ul>
              </Collapse>
            </li>
            <li>
              <a
                href="#/"
                onClick={toggleOtherPages}
                className={clsx({ active: otherPagesOpen })}>
                <span className="sidebar-icon">
                  <DevicesOtherTwoToneIcon />
                </span>
                <span className="sidebar-item-label">Others</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRightTwoToneIcon />
                </span>
              </a>
              <Collapse in={otherPagesOpen}>
                <ul className="pb-0">
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/PageProfile">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/PageInvoice">
                      Invoice
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/PageError404">
                      Error 404 Basic
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/PageError500">
                      Error 500 Cover
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/PageError505">
                      Error 505 Illustration
                    </NavLink>
                  </li>
                  <li>
                    <a
                      href="#/"
                      onClick={toggleLevels}
                      className={clsx('pr-0', { active: levelsOpen })}>
                      <span className="sidebar-item-label">
                        Unlimited Levels
                      </span>
                      <span className="sidebar-icon-indicator">
                        <ChevronRightTwoToneIcon />
                      </span>
                    </a>
                    <Collapse in={levelsOpen}>
                      <ul>
                        <li>
                          <a href="#/" onClick={(e) => e.preventDefault()}>
                            Second level link 1
                          </a>
                        </li>
                        <li>
                          <a href="#/" onClick={(e) => e.preventDefault()}>
                            Second level link 2
                          </a>
                        </li>
                      </ul>
                    </Collapse>
                  </li>
                </ul>
              </Collapse>
            </li>
          </ul>
          <div className="sidebar-menu-box">
            <div className="sidebar-header">
              <span>Resources</span>
            </div>
            <ul>
              <li>
                <a
                  className="font-weight-normal"
                  href="https://material-ui.com/store/items/bamburgh-react-admin-dashboard-pro"
                  rel="noopener noreferrer"
                  target="_blank">
                  <span className="sidebar-icon">
                    <LinkTwoToneIcon />
                  </span>
                  <span className="sidebar-item-label">Product Page</span>
                </a>
              </li>
              <li>
                <a
                  className="font-weight-normal"
                  href="https://docs.uifort.com/bamburgh-react-admin-dashboard-pro-docs"
                  target="_blank"
                  rel="noopener noreferrer">
                  <span className="sidebar-icon">
                    <LinkTwoToneIcon />
                  </span>
                  <span className="sidebar-item-label">Documentation</span>
                </a>
              </li>
              <li>
                <a
                  className="font-weight-normal"
                  href="https://docs.uifort.com/bamburgh-react-admin-dashboard-pro-docs/TechnicalSupport"
                  target="_blank"
                  rel="noopener noreferrer">
                  <span className="sidebar-icon">
                    <LinkTwoToneIcon />
                  </span>
                  <span className="sidebar-item-label">
                    Changelog
                    <div className="badge badge-success">1.0.0</div>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#/"
                  onClick={toggleDesignSystem}
                  className={clsx('font-weight-normal', {
                    active: designSystemOpen
                  })}>
                  <span className="sidebar-icon">
                    <CameraTwoToneIcon />
                  </span>
                  <span className="sidebar-item-label text-capitalize">
                    Dropdowns Examples
                  </span>
                  <span className="sidebar-icon-indicator">
                    <ChevronRightTwoToneIcon />
                  </span>
                </a>
                <Collapse in={designSystemOpen}>
                  <ul className="pb-0">
                    <li>
                      <a href="#/" onClick={(e) => e.preventDefault()}>
                        <span className="sidebar-icon">
                          <LinkTwoToneIcon />
                        </span>
                        <span className="sidebar-item-label">
                          Second Level Link 1
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#/" onClick={(e) => e.preventDefault()}>
                        <span className="sidebar-icon">
                          <LinkTwoToneIcon />
                        </span>
                        <span className="sidebar-item-label">
                          Second Level Link 1
                        </span>
                      </a>
                    </li>
                  </ul>
                </Collapse>
              </li>
            </ul>
          </div>
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
