import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, List, ListItem } from '@material-ui/core';

import projectLogo from '../../../assets/images/react.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="bg-vicious-stance font-size-sm">
        <Container className="py-5">
          <div className="app-nav-logo d-flex w-100 pb-5 justify-content-center">
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              title="Bamburgh React Admin Dashboard with Material-UI PRO"
              className="d-inline-flex">
              <div className="app-nav-logo--icon rounded-circle">
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
          <div className="pt-4">
            <Grid container spacing={0} className="text-center w-100">
              <Grid item md={6} xl={3}>
                <div className="my-4 my-xl-0">
                  <h6 className="text-white font-weight-bold mb-3 text-uppercase">
                    Services
                  </h6>
                  <List
                    component="div"
                    className="nav-transparent-alt flex-column justify-content-center">
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 d-block text-white-50 text-center">
                      Products
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 d-block text-white-50 text-center">
                      Services
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 d-block text-white-50 text-center">
                      About us
                    </ListItem>
                  </List>
                </div>
              </Grid>
              <Grid item md={6} xl={3}>
                <div className="my-4 my-xl-0">
                  <h6 className="text-white font-weight-bold mb-3 text-uppercase">
                    Support
                  </h6>
                  <List
                    component="div"
                    className="nav-transparent-alt flex-column justify-content-center">
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 d-block text-white-50 text-center">
                      Support center
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 d-block text-white-50 text-center">
                      Affiliates
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 d-block text-white-50 text-center">
                      Contact us
                    </ListItem>
                  </List>
                </div>
              </Grid>
              <Grid item md={6} xl={3}>
                <div className="my-4 my-xl-0">
                  <h6 className="text-white font-weight-bold mb-3 text-uppercase">
                    Applications
                  </h6>
                  <List
                    component="div"
                    className="nav-transparent-alt flex-column justify-content-center">
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 d-block text-white-50 text-center">
                      Exchange
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 d-block text-white-50 text-center">
                      Generic
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 d-block text-white-50 text-center">
                      Helpdesk
                    </ListItem>
                  </List>
                </div>
              </Grid>
              <Grid item md={6} xl={3}>
                <div className="my-4 my-xl-0">
                  <h6 className="text-white font-weight-bold mb-3 text-uppercase pl-2">
                    Social Connections
                  </h6>
                  <p className="text-white-50">
                    Stay up to date with our latest updates and releases!
                  </p>
                  <List
                    component="div"
                    className="nav-transparent text-nowrap d-flex justify-content-center">
                    <ListItem
                      button
                      className="text-white-50"
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <FontAwesomeIcon
                        icon={['fab', 'facebook']}
                        className="font-size-lg"
                      />
                    </ListItem>
                    <ListItem
                      button
                      className="text-white-50"
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <FontAwesomeIcon
                        icon={['fab', 'twitter']}
                        className="font-size-lg"
                      />
                    </ListItem>
                    <ListItem
                      button
                      className="text-white-50"
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <FontAwesomeIcon
                        icon={['fab', 'google']}
                        className="font-size-lg"
                      />
                    </ListItem>
                    <ListItem
                      button
                      className="text-white-50"
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <FontAwesomeIcon
                        icon={['fab', 'instagram']}
                        className="font-size-lg"
                      />
                    </ListItem>
                  </List>
                </div>
              </Grid>
            </Grid>
            <div className="divider mb-4 mt-5 bg-white opacity-2" />
            <div className="py-3 d-block d-lg-flex font-size-xs justify-content-between">
              <div className="text-center d-block mb-3 mb-md-0 text-white">
                Copyright &copy; 2020 - UiFort.com
              </div>
              <List
                component="div"
                className="nav-transparent text-nowrap d-flex justify-content-center">
                <ListItem
                  button
                  className="text-white-50"
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  Privacy Policy
                </ListItem>
                <ListItem
                  button
                  className="text-white-50"
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  Terms of Service
                </ListItem>
              </List>
              <List
                component="div"
                className="nav-transparent text-nowrap d-flex justify-content-center">
                <ListItem
                  button
                  className="text-white-50"
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  My Account
                </ListItem>
              </List>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
