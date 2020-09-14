import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Collapse,
  Grid,
  Container,
  Button,
  List,
  ListItem
} from '@material-ui/core';

import projectLogo from '../../../assets/images/react.svg';

import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';

import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import BusinessCenterTwoToneIcon from '@material-ui/icons/BusinessCenterTwoTone';
import LocalLibraryTwoToneIcon from '@material-ui/icons/LocalLibraryTwoTone';
import GridOnTwoToneIcon from '@material-ui/icons/GridOnTwoTone';

import hero5 from '../../../assets/images/hero-bg/hero-5.jpg';
import particles3 from '../../../assets/images/hero-bg/particles-3.svg';

export default function LivePreviewExample() {
  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse);

  return (
    <>
      <div className="hero-wrapper overflow-hidden bg-composed-wrapper bg-second mb-5">
        <div className="hero-wrapper--content">
          <div className="bg-composed-wrapper--bg bg-second opacity-4" />
          <div
            className="bg-composed-wrapper--image bg-composed-filter-rm"
            style={{ backgroundImage: 'url(' + hero5 + ')' }}
          />
          <div
            className="bg-composed-wrapper--image opacity-6"
            style={{ backgroundImage: 'url(' + particles3 + ')' }}
          />
          <div className="bg-composed-wrapper--content">
            <div className="header-nav-wrapper bg-white px-4 shadow-lg header-nav-wrapper-lg navbar-light">
              <div className="app-nav-logo">
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  title="Bamburgh React Admin Dashboard with Material-UI PRO"
                  className="app-nav-logo app-nav-logo--dark">
                  <div className="app-nav-logo--icon rounded-sm bg-white border-0">
                    <img
                      alt="Bamburgh React Admin Dashboard with Material-UI PRO"
                      src={projectLogo}
                    />
                  </div>
                  <div className="app-nav-logo--text">
                    <span>General</span>

                    <b>bamburgh</b>
                  </div>
                </a>
              </div>
              <div className="header-nav-menu d-none d-lg-block">
                <ul className="d-flex nav nav-neutral-first justify-content-center">
                  <li>
                    <a
                      className="font-size-lg text-first rounded"
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      Pages
                      <span className="opacity-5 dropdown-arrow">
                        <FontAwesomeIcon icon={['fas', 'angle-down']} />
                      </span>
                    </a>
                    <div className="submenu-dropdown">
                      <div className="shadow-xxl bg-white rounded">
                        <List
                          component="div"
                          className="nav-pills nav-neutral-primary nav-lg flex-column p-3">
                          <ListItem
                            component="a"
                            button
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="px-4 d-flex align-items-center">
                            <span>Courses</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </ListItem>
                          <ListItem
                            component="a"
                            button
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="px-4 d-flex align-items-center">
                            <span>Listings</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </ListItem>
                          <ListItem
                            component="a"
                            button
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="px-4 d-flex align-items-center">
                            <span>Workplace</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </ListItem>
                          <ListItem
                            component="a"
                            button
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="px-4 d-flex align-items-center">
                            <span>Software</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </ListItem>
                          <ListItem
                            component="a"
                            button
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="px-4 d-flex align-items-center">
                            <span>Exchanges</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </ListItem>
                          <ListItem
                            component="a"
                            button
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="px-4 d-flex align-items-center">
                            <span>Services</span>
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right']}
                              className="opacity-6 ml-auto"
                            />
                          </ListItem>
                        </List>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-size-lg text-first rounded">
                      Landings
                      <span className="opacity-5 dropdown-arrow">
                        <FontAwesomeIcon icon={['fas', 'angle-down']} />
                      </span>
                    </a>
                    <div className="submenu-dropdown submenu-dropdown--xxl">
                      <Grid container spacing={0}>
                        <Grid item lg={6} className="z-over">
                          <div className="shadow-sm-dark bg-white rounded">
                            <div className="px-4 text-uppercase pt-4 pb-2 text-primary font-weight-bold font-size-sm">
                              Applications
                            </div>
                            <List
                              component="div"
                              className="nav-pills nav-neutral-first nav-lg flex-column px-3 pb-3">
                              <ListItem
                                component="a"
                                button
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className="px-3">
                                <div className="d-flex">
                                  <BusinessCenterTwoToneIcon className="text-black-50" />
                                  <div className="pl-3 text-black">
                                    <div className="font-weight-bold">
                                      General
                                    </div>
                                    <div className="text-black-50 font-size-sm">
                                      Multi-purpose user interface for
                                      dashboards
                                    </div>
                                  </div>
                                </div>
                              </ListItem>

                              <ListItem
                                component="a"
                                button
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className="px-3">
                                <div className="d-flex">
                                  <PeopleAltTwoToneIcon className="text-black-50" />
                                  <div className="pl-3 text-black">
                                    <div className="font-weight-bold">
                                      Messenger
                                    </div>
                                    <div className="text-black-50 font-size-sm">
                                      Niche application UI for building chat
                                      windows
                                    </div>
                                  </div>
                                </div>
                              </ListItem>

                              <ListItem
                                component="a"
                                button
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className="px-3">
                                <div className="d-flex">
                                  <GridOnTwoToneIcon className="text-black-50" />
                                  <div className="pl-3 text-black">
                                    <div className="font-weight-bold">
                                      Commerce
                                    </div>
                                    <div className="text-black-50 font-size-sm">
                                      Build a commerce related app with this
                                      template
                                    </div>
                                  </div>
                                </div>
                              </ListItem>
                            </List>
                          </div>
                        </Grid>
                        <Grid item lg={6} className="d-flex align-items-center">
                          <div className="shadow-sm-dark w-100 bg-secondary rounded-right p-3">
                            <List
                              component="div"
                              className="nav-pills nav-neutral-first nav-lg flex-column p-0">
                              <ListItem
                                component="a"
                                button
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className="px-3">
                                <div className="d-flex">
                                  <NotificationsActiveTwoToneIcon />
                                  <div className="pl-3">
                                    <div className="font-weight-bold">
                                      Crypto
                                    </div>
                                    <div className="text-black-50 font-size-sm">
                                      User interface inspired by a
                                      cryptocurrency exchange
                                    </div>
                                  </div>
                                </div>
                              </ListItem>

                              <ListItem
                                component="a"
                                button
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className="px-3">
                                <div className="d-flex">
                                  <LocalLibraryTwoToneIcon />
                                  <div className="pl-3">
                                    <div className="font-weight-bold">
                                      Learning
                                      <span className="ml-3 badge badge-danger">
                                        Soon
                                      </span>
                                    </div>
                                    <div className="text-black-50 font-size-sm">
                                      Courses platform template to start
                                      development faster
                                    </div>
                                  </div>
                                </div>
                              </ListItem>

                              <ListItem
                                component="a"
                                button
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className="px-3">
                                <div className="d-flex">
                                  <SettingsTwoToneIcon />
                                  <div className="pl-3">
                                    <div className="font-weight-bold">
                                      Banking
                                      <span className="ml-3 badge badge-danger">
                                        Soon
                                      </span>
                                    </div>
                                    <div className="text-black-50 font-size-sm">
                                      Financial dashboard template inspired by
                                      banking apps
                                    </div>
                                  </div>
                                </div>
                              </ListItem>
                            </List>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </li>
                  <li>
                    <a
                      className="font-size-lg text-first rounded"
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      Blocks
                    </a>
                  </li>
                </ul>
              </div>
              <div className="header-nav-actions flex-grow-0 flex-lg-grow-1">
                <span className="d-none d-lg-block">
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="rounded-sm btn-icon d-40 text-nowrap font-size-lg shadow-xxl btn-first">
                    <FontAwesomeIcon icon={['far', 'user-circle']} />
                  </Button>
                </span>
                <span className="d-block d-lg-none">
                  <button
                    onClick={toggle}
                    className={clsx(
                      'navbar-toggler hamburger hamburger--elastic',
                      { 'is-active': collapse }
                    )}>
                    <span className="hamburger-box">
                      <span className="hamburger-inner" />
                    </span>
                  </button>
                </span>
              </div>
              <div className="d-flex d-lg-none">
                <Collapse
                  in={collapse}
                  className="nav-collapsed-wrapper navbar-collapse">
                  <div className="nav-inner-wrapper">
                    <Button
                      onClick={toggle}
                      className="btn-danger btn-icon d-40 shadow-sm hover-scale-lg btn-animated-icon-sm nav-toggle-inner-btn p-0">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fas', 'times']} />
                      </span>
                    </Button>

                    <List
                      component="div"
                      className="nav-pills nav-neutral-primary nav-lg flex-column p-3">
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="px-4 d-flex align-items-center">
                        <span>Courses</span>
                        <FontAwesomeIcon
                          icon={['fas', 'angle-right']}
                          className="opacity-6 ml-auto"
                        />
                      </ListItem>
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="px-4 d-flex align-items-center">
                        <span>Listings</span>
                        <FontAwesomeIcon
                          icon={['fas', 'angle-right']}
                          className="opacity-6 ml-auto"
                        />
                      </ListItem>
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="px-4 d-flex align-items-center">
                        <span>Workplace</span>
                        <FontAwesomeIcon
                          icon={['fas', 'angle-right']}
                          className="opacity-6 ml-auto"
                        />
                      </ListItem>
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="px-4 d-flex align-items-center">
                        <span>Software</span>
                        <FontAwesomeIcon
                          icon={['fas', 'angle-right']}
                          className="opacity-6 ml-auto"
                        />
                      </ListItem>
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="px-4 d-flex align-items-center">
                        <span>Exchanges</span>
                        <FontAwesomeIcon
                          icon={['fas', 'angle-right']}
                          className="opacity-6 ml-auto"
                        />
                      </ListItem>
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="px-4 d-flex align-items-center">
                        <span>Services</span>
                        <FontAwesomeIcon
                          icon={['fas', 'angle-right']}
                          className="opacity-6 ml-auto"
                        />
                      </ListItem>
                    </List>
                  </div>
                </Collapse>
                <div
                  className={clsx('collapse-page-trigger', {
                    'is-active': collapse
                  })}
                  onClick={toggle}
                />
              </div>
            </div>
            <div className="py-3 text-center text-white py-xl-5">
              <div className="py-2" />
              <Container className="py-3 py-xl-5">
                <Grid container spacing={6}>
                  <Grid item lg={10} xl={8} className="mx-auto">
                    <div className="font-size-sm d-inline-flex bg-white-10 px-4 rounded-lg text-white py-2 text-uppercase">
                      Examples
                    </div>
                    <h3 className="display-3 font-weight-bold my-4 text-uppercase">
                      How can we help?
                    </h3>
                    <p className="text-white-50 line-height-2 font-size-xxl px-3 px-xl-5 mb-0">
                      View any of the 5+ live previews we&#39;ve set up to learn
                      why this dashboard template is the last one you&#39;ll
                      ever need!
                    </p>
                  </Grid>
                </Grid>
              </Container>
              <div className="py-5" />
            </div>
            <div className="shape-container-top-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="var(--light)"
                  fillOpacity="1"
                  d="M0,64L120,58.7C240,53,480,43,720,48C960,53,1200,75,1320,85.3L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
