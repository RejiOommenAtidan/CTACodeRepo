import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, List, ListItem } from '@material-ui/core';

import projectLogo from '../../../assets/images/react.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="bg-night-sky font-size-sm py-5">
        <div className="py-3">
          <a
            href="#/"
            onClick={(e) => e.preventDefault()}
            title="Bamburgh React Admin Dashboard with Material-UI PRO"
            className="d-70 d-block mx-auto bg-white rounded-circle">
            <img
              alt="Bamburgh React Admin Dashboard with Material-UI PRO"
              className="img-fluid p-2"
              src={projectLogo}
            />
          </a>
        </div>
        <Container className="pt-5">
          <Grid container spacing={6} className="pb-3">
            <Grid item md={6} xl={3}>
              <div className="my-4 my-xl-0">
                <h6 className="text-white font-weight-bold mb-3 text-uppercase">
                  Services
                </h6>
                <List
                  component="div"
                  className="nav-transparent-alt flex-column">
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
                    Products
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
                    Services
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
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
                  className="nav-transparent-alt flex-column">
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
                    Support center
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
                    Affiliates
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
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
                  className="nav-transparent-alt flex-column">
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
                    Exchange
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
                    Generic
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
                    Helpdesk
                  </ListItem>
                </List>
              </div>
            </Grid>
            <Grid item md={6} xl={3}>
              <div className="my-4 my-xl-0">
                <h6 className="text-white font-weight-bold mb-3 text-uppercase">
                  Social Connections
                </h6>
                <p className="text-white-50">
                  Stay up to date with our latest updates and releases!
                </p>
                <List
                  component="div"
                  className="nav-transparent-alt d-flex justify-content-start">
                  <ListItem
                    button
                    className="px-0 mr-3 text-white-50"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon
                      icon={['fab', 'facebook']}
                      className="font-size-lg"
                    />
                  </ListItem>
                  <ListItem
                    button
                    className="px-0 mr-3 text-white-50"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon
                      icon={['fab', 'twitter']}
                      className="font-size-lg"
                    />
                  </ListItem>
                  <ListItem
                    button
                    className="px-0 mr-3 text-white-50"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon
                      icon={['fab', 'google']}
                      className="font-size-lg"
                    />
                  </ListItem>
                  <ListItem
                    button
                    className="px-0 mr-3 text-white-50"
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
          <div className="divider mt-4 bg-white opacity-2" />
          <div className="divider mb-4 bg-white opacity-2" />
          <div className="py-3 d-block d-lg-flex align-items-center justify-content-between">
            <div className="text-center d-block mb-3 mb-md-0 text-white">
              Copyright &copy; 2020 - UiFort.com
            </div>
            <List
              component="div"
              className="nav-transparent-alt text-nowrap d-flex justify-content-center">
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
              className="nav-transparent-alt text-nowrap d-flex justify-content-center">
              <ListItem
                button
                className="text-white-50"
                href="#/"
                onClick={(e) => e.preventDefault()}>
                My Account
              </ListItem>
            </List>
          </div>
        </Container>
      </div>
    </>
  );
}
