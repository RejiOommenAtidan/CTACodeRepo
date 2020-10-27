import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Dialog,
  Menu,
  Button,
  List,
  ListItem,
  Tooltip
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';

import avatar1 from '../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import avatar5 from '../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../assets/images/avatars/avatar7.jpg';

import people3 from '../../assets/images/stock-photos/people-3.jpg';

import HomeWorkTwoToneIcon from '@material-ui/icons/HomeWorkTwoTone';

const PageTitle = (props) => {
  const {
    pageTitleStyle,
    pageTitleBackground,
    pageTitleShadow,
    pageTitleIconBox,
    pageTitleDescription,
    titleHeading,
    titleDescription,
    children
  } = props;
  const [modal1, setModal1] = useState(false);
  const toggle1 = () => setModal1(!modal1);
  const [anchorEl, setAnchorEl] = useState(null);

  function openUserMenu(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <>
      <div
        className={clsx('app-page-title', pageTitleStyle, pageTitleBackground, {
          'app-page-title--shadow': pageTitleShadow
        })}>
        <div>
          <div className="app-page-title--first">
            {pageTitleIconBox && (
              <div className="app-page-title--iconbox d-70">
                <div className="d-70 d-flex align-items-center justify-content-center display-1">
                  <HomeWorkTwoToneIcon className="text-primary" />
                </div>
              </div>
            )}
            <div className="app-page-title--heading">
              <h1>{titleHeading}</h1>
              {pageTitleDescription && (
                <div className="app-page-title--description">
                  {titleDescription}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          {children}
          <Button
            variant="contained"
            onClick={openUserMenu}
            size="small"
            className="btn-primary d-40 py-0 px-4 w-auto mx-0 mr-3 mr-lg-0 mx-lg-3">
            <span className="btn-wrapper--label">Actions</span>
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['fas', 'angle-down']}
                className="opacity-5"
              />
            </span>
          </Button>
          <Menu
            id="userMenu"
            component="div"
            anchorEl={anchorEl}
            keepMounted
            getContentAnchorEl={null}
            classes={{ list: 'p-0' }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <div className="dropdown-menu-xl outline-none p-0">
              <div className="bg-composed-wrapper bg-vicious-stance mt-0">
                <div className="bg-composed-wrapper--image bg-composed-img-5" />
                <div className="bg-composed-wrapper--content text-white text-center p-4">
                  <h5 className="mb-1">Scrollable</h5>
                  <p className="mb-0 opacity-7">
                    This menu box is scrollable (sm)
                  </p>
                </div>
              </div>
              <div className="scroll-area-sm shadow-overflow">
                <PerfectScrollbar>
                  <List component="div" className="flex-column">
                    <ListItem button className="rounded-0">
                      <div className="nav-link-icon opacity-6">
                        <FontAwesomeIcon icon={['far', 'chart-bar']} />
                      </div>
                      <span>Services</span>
                    </ListItem>
                    <ListItem button className="rounded-0">
                      <div className="nav-link-icon opacity-6">
                        <FontAwesomeIcon icon={['far', 'question-circle']} />
                      </div>
                      <span>Layouts</span>
                      <span className="ml-auto badge badge-warning">512</span>
                    </ListItem>
                    <ListItem button className="rounded-0">
                      <div className="nav-link-icon opacity-6">
                        <FontAwesomeIcon icon={['far', 'user-circle']} />
                      </div>
                      <span>Reports</span>
                    </ListItem>
                    <ListItem className="rounded-0">
                      <span className="font-weight-bold text-uppercase font-size-xs text-dark">
                        Others
                      </span>
                    </ListItem>
                    <ListItem button className="rounded-0">
                      <div className="nav-link-icon opacity-6">
                        <FontAwesomeIcon icon={['far', 'object-group']} />
                      </div>
                      <span>Components</span>
                    </ListItem>
                    <ListItem button className="rounded-0">
                      <div className="nav-link-icon opacity-6">
                        <FontAwesomeIcon icon={['far', 'chart-bar']} />
                      </div>
                      <span>Services</span>
                    </ListItem>
                  </List>
                </PerfectScrollbar>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <Button
                  size="small"
                  className="btn-transparent px-0 btn-link btn-link-primary">
                  <span>View details</span>
                </Button>
                <Button
                  size="small"
                  className="btn-transition-none"
                  variant="contained"
                  color="primary">
                  Save
                </Button>
              </div>
            </div>
          </Menu>

          <Tooltip title="Add new entry">
            <Button
              variant="contained"
              size="small"
              className="d-40 btn-success"
              onClick={toggle1}>
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fas', 'plus']} className="opacity-8" />
              </span>
            </Button>
          </Tooltip>
        </div>
      </div>
      <Dialog
        scroll="body"
        classes={{ paper: 'bg-transparent' }}
        maxWidth="xl"
        open={modal1}
        onClose={toggle1}>
        <Grid container spacing={0}>
          <Grid item lg={5}>
            <div className="bg-white rounded-left">
              <div className="p-4 text-center">
                <div className="avatar-icon-wrapper rounded-circle mx-auto">
                  <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0 border-3 border-first">
                    <div className="rounded-circle border-3 border-white overflow-hidden">
                      <img alt="..." className="img-fluid" src={avatar5} />
                    </div>
                  </div>
                </div>
                <h4 className="font-size-lg font-weight-bold my-2">
                  Marion Devine
                </h4>
                <div className="text-center my-4">
                  <div className="badge badge-pill badge-neutral-first text-first mx-1">
                    Web developer
                  </div>
                  <div className="badge badge-pill badge-neutral-warning text-warning mx-1">
                    Javascript
                  </div>
                  <div className="badge badge-pill badge-neutral-danger text-danger mx-1">
                    Angular
                  </div>
                </div>

                <p className="text-muted mb-4">
                  I should be incapable of drawing a single stroke at the
                  present moment; and yet I feel that I never was a greater
                  artist than now.
                </p>

                <div className="divider my-4" />
                <Grid container>
                  <Grid item lg={6}>
                    <span className="opacity-6 pb-2">Current month</span>
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="font-weight-bold font-size-lg">
                        <small className="opacity-6 pr-1">$</small>
                        46,362
                      </span>
                      <div className="badge badge-neutral-danger ml-2 text-danger">
                        -8%
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={6}>
                    <span className="opacity-6 pb-2">Last year</span>
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="font-weight-bold font-size-lg">
                        <small className="opacity-6 pr-1">$</small>
                        34,546
                      </span>
                      <div className="badge badge-neutral-success text-success ml-2">
                        +13%
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <div className="divider my-4" />
                <div className="font-weight-bold text-uppercase text-black-50 text-center mb-3">
                  Team members
                </div>
                <div className="avatar-wrapper-overlap d-flex justify-content-center mb-3">
                  <Tooltip title="Chelsey Delaney" arrow>
                    <div className="avatar-icon-wrapper">
                      <div className="avatar-icon">
                        <img alt="..." src={avatar1} />
                      </div>
                    </div>
                  </Tooltip>

                  <Tooltip title="Laibah Santos" arrow>
                    <div className="avatar-icon-wrapper">
                      <div className="avatar-icon">
                        <img alt="..." src={avatar7} />
                      </div>
                    </div>
                  </Tooltip>

                  <Tooltip title="Ksawery Weber" arrow>
                    <div className="avatar-icon-wrapper">
                      <div className="avatar-icon">
                        <img alt="..." src={avatar1} />
                      </div>
                    </div>
                  </Tooltip>

                  <Tooltip title="Killian Magana" arrow>
                    <div className="avatar-icon-wrapper">
                      <div className="avatar-icon">
                        <img alt="..." src={avatar2} />
                      </div>
                    </div>
                  </Tooltip>

                  <Tooltip title="Kean Banks" arrow>
                    <div className="avatar-icon-wrapper">
                      <div className="avatar-icon">
                        <img alt="..." src={avatar6} />
                      </div>
                    </div>
                  </Tooltip>
                </div>
                <div className="divider my-4" />
                <Button variant="text" className="btn-outline-first mt-2">
                  View complete profile
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item lg={7}>
            <div className="hero-wrapper bg-composed-wrapper h-100 rounded-right">
              <div className="flex-grow-1 w-100 d-flex align-items-end">
                <div
                  className="bg-composed-wrapper--image rounded-right opacity-9 bg-composed-filter-rm"
                  style={{ backgroundImage: 'url(' + people3 + ')' }}
                />
                <div className="bg-composed-wrapper--content text-center p-5">
                  <div className="text-white mt-3">
                    <h1 className="display-3 my-3 font-weight-bold">
                      Wonderful serenity has possession
                    </h1>
                    <p className="font-size-lg mb-0 text-white opacity-7">
                      View any of the 5+ live previews we&#39;ve set up to learn
                      why this dashboard template is the last one you&#39;ll
                      ever need!
                    </p>
                    <div className="divider border-1 mx-auto my-4 border-light opacity-2 rounded w-25" />
                    <div>
                      <Button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        size="large"
                        className="btn-pill btn-success">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['far', 'envelope']} />
                        </span>
                        <span className="btn-wrapper--label">Get in touch</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  pageTitleStyle: state.ThemeOptions.pageTitleStyle,
  pageTitleBackground: state.ThemeOptions.pageTitleBackground,
  pageTitleShadow: state.ThemeOptions.pageTitleShadow,
  pageTitleIconBox: state.ThemeOptions.pageTitleIconBox,
  pageTitleDescription: state.ThemeOptions.pageTitleDescription
});

export default connect(mapStateToProps)(PageTitle);
