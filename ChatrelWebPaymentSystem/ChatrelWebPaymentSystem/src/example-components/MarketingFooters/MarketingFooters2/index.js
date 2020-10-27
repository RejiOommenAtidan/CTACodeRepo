import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Button, List, ListItem } from '@material-ui/core';

import projectLogo from '../../../assets/images/react.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="bg-second rounded py-5">
        <Container className="py-0 text-center text-xl-left py-xl-5">
          <Grid container spacing={6}>
            <Grid item xl={5} className="d-flex align-items-center">
              <div className="mb-5 mb-xl-0 w-100">
                <div className="app-nav-logo justify-content-center text-left justify-content-xl-left flex-column flex-xl-row">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    title="Bamburgh React Admin Dashboard with Material-UI PRO"
                    className="app-nav-logo">
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
                <p className="my-4 text-white-50">
                  I will give you a complete account of the system, and expound
                  the actual teachings.
                </p>
                <div>
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="btn-first mr-3">
                    Contact us
                  </Button>
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="btn-outline-first">
                    Affiliates
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xl={7} className="d-none d-md-flex align-items-center">
              <Grid container spacing={6} className="w-100">
                <Grid item md={4}>
                  <div className="divider-v divider-v-lg opacity-1 d-none d-xl-block" />
                  <div className="pl-0 pl-lg-3">
                    <h6 className="text-white font-weight-bold mb-3">
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
                        className="d-block d-xl-flex px-0 py-1 text-white-50">
                        Products
                      </ListItem>
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="d-block d-xl-flex px-0 py-1 text-white-50">
                        Services
                      </ListItem>
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="d-block d-xl-flex px-0 py-1 text-white-50">
                        About us
                      </ListItem>
                    </List>
                  </div>
                </Grid>
                <Grid item md={4}>
                  <div className="divider-v divider-v-lg opacity-1 d-none d-xl-block" />
                  <div className="pl-0 pl-lg-3">
                    <h6 className="text-white font-weight-bold mb-3">
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
                        className="d-block d-xl-flex px-0 py-1 text-white-50">
                        Support center
                      </ListItem>
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="d-block d-xl-flex px-0 py-1 text-white-50">
                        Affiliates
                      </ListItem>
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="d-block d-xl-flex px-0 py-1 text-white-50">
                        Contact us
                      </ListItem>
                    </List>
                  </div>
                </Grid>
                <Grid item md={4}>
                  <div className="pl-0 pl-lg-3">
                    <h6 className="text-white font-weight-bold mb-3">
                      UI Themes
                    </h6>
                    <List
                      component="div"
                      className="nav-transparent-alt flex-column">
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="d-block d-xl-flex px-0 py-1 text-white-50">
                        React themes
                      </ListItem>
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="d-block d-xl-flex px-0 py-1 text-white-50">
                        HTML5 themes
                      </ListItem>
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="d-block d-xl-flex px-0 py-1 text-white-50">
                        Angular themes
                      </ListItem>
                    </List>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div className="divider border-2 d-none d-md-block rounded-circle border-white bg-white opacity-2 mx-auto my-5 w-50" />
          <List
            component="div"
            className="nav-transparent-alt text-nowrap d-flex justify-content-center">
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
        </Container>
      </div>
    </>
  );
}
