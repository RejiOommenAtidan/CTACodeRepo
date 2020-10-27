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

import { FlagIcon } from 'react-flag-kit';
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
      <div className="header-top-section bg-white-5 py-2">
        <Container className="d-flex header-nav-menu justify-content-between align-items-center navbar-dark">
          <ul className="d-flex">
            <li className="ml-0">
              <Button
                variant="text"
                className="rounded-sm d-30 p-0 btn-icon btn-transition-none"
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['fas', 'user']}
                    className="font-size-sm"
                  />
                </span>
              </Button>
            </li>
            <li>
              <Button
                variant="text"
                className="rounded-sm d-30 p-0 btn-icon btn-transition-none"
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['far', 'bell']}
                    className="font-size-sm"
                  />
                </span>
              </Button>
            </li>
          </ul>
          <ul className="d-flex">
            <li>
              <a
                className="rounded-sm py-1 px-3 font-size-xs text-uppercase"
                href="#/"
                onClick={(e) => e.preventDefault()}>
                Languages
                <span className="opacity-5 dropdown-arrow">
                  <FontAwesomeIcon icon={['fas', 'angle-down']} />
                </span>
              </a>
              <div className="submenu-dropdown submenu-dropdown--sm">
                <div className="shadow-sm-dark bg-white rounded-sm">
                  <List
                    component="div"
                    className="nav-pills nav-neutral-primary flex-column p-2">
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-3 d-flex align-items-center">
                      <span className="mr-3">
                        <FlagIcon code="US" size={28} />
                      </span>
                      <span>English</span>
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-3 d-flex align-items-center">
                      <span className="mr-3">
                        <FlagIcon code="ES" size={28} />
                      </span>
                      <span>Spanish</span>
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-3 d-flex align-items-center">
                      <span className="mr-3">
                        <FlagIcon code="DE" size={28} />
                      </span>
                      <span>German</span>
                    </ListItem>
                  </List>
                </div>
              </div>
            </li>
            <li className="mr-0">
              <a
                className="rounded-sm py-1 px-3 font-size-xs text-uppercase"
                href="#/"
                onClick={(e) => e.preventDefault()}>
                Settings
              </a>
            </li>
          </ul>
        </Container>
      </div>
      <div className="divider bg-white opacity-1" />
      <Container>
        <div className="header-nav-wrapper header-nav-wrapper-lg rounded navbar-dark">
          <div className="app-nav-logo">
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              title="Bamburgh React Admin Dashboard with Material-UI PRO"
              className="app-nav-logo">
              <div className="app-nav-logo--icon rounded-sm">
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
            <ul className="d-flex justify-content-center">
              <li>
                <a
                  className="rounded-sm"
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  Pages
                  <span className="opacity-5 dropdown-arrow">
                    <FontAwesomeIcon icon={['fas', 'angle-down']} />
                  </span>
                </a>
                <div className="submenu-dropdown">
                  <div className="shadow-sm-dark bg-white rounded">
                    <List
                      component="div"
                      className="nav-pills nav-neutral-warning nav-pills-rounded nav-lg flex-column p-3">
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
                  className="rounded-sm">
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
                          className="nav-pills nav-neutral-warning nav-lg flex-column px-3 pb-3">
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
                                <div className="font-weight-bold">
                                  Messenger
                                </div>
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
                      <div className="shadow-sm-dark w-100 bg-second rounded-right p-3">
                        <List
                          component="div"
                          className="nav-pills nav-neutral-secondary nav-lg flex-column p-0">
                          <ListItem
                            component="a"
                            button
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="px-3 text-white-50">
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
                            className="px-3 text-white-50">
                            <div className="d-flex">
                              <LocalLibraryTwoToneIcon className="text-white-50" />
                              <div className="pl-3 text-white">
                                <div className="font-weight-bold">
                                  Learning
                                  <span className="ml-3 badge badge-info">
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
                            className="px-3 text-white-50">
                            <div className="d-flex">
                              <SettingsTwoToneIcon className="text-white-50" />
                              <div className="pl-3 text-white">
                                <div className="font-weight-bold">
                                  Banking
                                  <span className="ml-3 badge badge-info">
                                    Soon
                                  </span>
                                </div>
                                <div className="text-white-50 font-size-sm">
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
                  className="rounded-sm"
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
                className="text-uppercase font-weight-bold text-nowrap font-size-xs shadow-sm-dark btn-warning">
                My account
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
                  className="nav-pills nav-neutral-warning nav-pills-rounded nav-lg flex-column p-3">
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
      </Container>
      <div
        className={clsx('collapse-page-trigger', { 'is-active': collapse })}
        onClick={toggle}
      />
    </>
  );
}
