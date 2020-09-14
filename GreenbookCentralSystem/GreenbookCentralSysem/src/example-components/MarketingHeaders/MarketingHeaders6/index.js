import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse, Grid, Button, List, ListItem } from '@material-ui/core';

import projectLogo from '../../../assets/images/react.svg';

import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';

import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import BusinessCenterTwoToneIcon from '@material-ui/icons/BusinessCenterTwoTone';
import LocalLibraryTwoToneIcon from '@material-ui/icons/LocalLibraryTwoTone';
import GridOnTwoToneIcon from '@material-ui/icons/GridOnTwoTone';

export default function LivePreviewExample() {
  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse);

  return (
    <>
      <div className="header-nav-wrapper header-nav-wrapper-lg rounded navbar-light">
        <div className="app-nav-logo">
          <a
            href="#/"
            onClick={(e) => e.preventDefault()}
            title="Bamburgh React Admin Dashboard with Material-UI PRO"
            className="app-nav-logo app-nav-logo--dark">
            <div className="app-nav-logo--icon rounded-sm bg-secondary border-0">
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
                className="font-size-lg text-second font-weight-bold rounded-sm"
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
                className="font-size-lg text-second font-weight-bold rounded-sm">
                Landings
                <span className="opacity-5 dropdown-arrow">
                  <FontAwesomeIcon icon={['fas', 'angle-down']} />
                </span>
              </a>
              <div className="submenu-dropdown submenu-dropdown--xxl">
                <Grid container spacing={0}>
                  <Grid item lg={6} className="z-over">
                    <div className="shadow-xxl bg-white rounded">
                      <div className="px-4 text-uppercase pt-4 pb-2 text-primary font-weight-bold font-size-sm">
                        Applications
                      </div>
                      <List
                        component="div"
                        className="nav-pills nav-neutral-primary nav-lg flex-column px-3 pb-3">
                        <ListItem
                          component="a"
                          button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="px-3">
                          <div className="d-flex">
                            <BusinessCenterTwoToneIcon className="text-black-50" />
                            <div className="pl-3 text-black">
                              <div className="font-weight-bold">General</div>
                              <div className="text-black-50 font-size-sm">
                                Multi-purpose user interface for dashboards
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
                              <div className="font-weight-bold">Messenger</div>
                              <div className="text-black-50 font-size-sm">
                                Niche application UI for building chat windows
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
                              <div className="font-weight-bold">Commerce</div>
                              <div className="text-black-50 font-size-sm">
                                Build a commerce related app with this template
                              </div>
                            </div>
                          </div>
                        </ListItem>
                      </List>
                    </div>
                  </Grid>
                  <Grid item lg={6} className="d-flex align-items-center">
                    <div className="shadow-xxl w-100 bg-dark rounded-right p-3">
                      <List
                        component="div"
                        className="nav-pills nav-neutral-second nav-lg flex-column p-0">
                        <ListItem
                          component="a"
                          button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="text-white-50 px-3">
                          <div className="d-flex">
                            <NotificationsActiveTwoToneIcon className="text-white-50" />
                            <div className="pl-3 text-white">
                              <div className="font-weight-bold">Crypto</div>
                              <div className="text-white-50 font-size-sm">
                                User interface inspired by a cryptocurrency
                                exchange
                              </div>
                            </div>
                          </div>
                        </ListItem>

                        <ListItem
                          component="a"
                          button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="text-white-50 px-3">
                          <div className="d-flex">
                            <LocalLibraryTwoToneIcon className="text-white-50" />
                            <div className="pl-3 text-white">
                              <div className="font-weight-bold">
                                Learning
                                <span className="ml-3 badge badge-danger">
                                  Soon
                                </span>
                              </div>
                              <div className="text-white-50 font-size-sm">
                                Courses platform template to start development
                                faster
                              </div>
                            </div>
                          </div>
                        </ListItem>

                        <ListItem
                          component="a"
                          button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="text-white-50 px-3">
                          <div className="d-flex">
                            <SettingsTwoToneIcon className="text-white-50" />
                            <div className="pl-3 text-white">
                              <div className="font-weight-bold">
                                Banking
                                <span className="ml-3 badge badge-danger">
                                  Soon
                                </span>
                              </div>
                              <div className="text-white-50 font-size-sm">
                                Financial dashboard template inspired by banking
                                apps
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
                className="font-size-lg text-second font-weight-bold rounded-sm"
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
              className="rounded-sm btn-icon d-40 text-nowrap font-size-lg shadow-xxl btn-success">
              <FontAwesomeIcon icon={['far', 'user-circle']} />
            </Button>
          </span>
          <span className="d-block d-lg-none">
            <button
              onClick={toggle}
              className={clsx('navbar-toggler hamburger hamburger--elastic', {
                'is-active': collapse
              })}>
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
        </div>
      </div>
      <div
        className={clsx('collapse-page-trigger', { 'is-active': collapse })}
        onClick={toggle}
      />
    </>
  );
}
