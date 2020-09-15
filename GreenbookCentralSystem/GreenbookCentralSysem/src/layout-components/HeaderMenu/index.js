import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Box,
  Typography,
  Popover,
  Menu,
  Button,
  List,
  ListItem,
  Divider
} from '@material-ui/core';

import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import CollectionsTwoToneIcon from '@material-ui/icons/CollectionsTwoTone';
import DnsTwoToneIcon from '@material-ui/icons/DnsTwoTone';
import HomeWorkTwoToneIcon from '@material-ui/icons/HomeWorkTwoTone';

const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'mega-menu-popover' : undefined;

  const [anchorElMenu, setAnchorElMenu] = useState(null);

  const handleClickMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  return (
    <>
      <div className="app-header-menu">
        <Button
          size="small"
          onClick={handleClick}
          className="btn-transition-none btn-neutral-primary mr-3">
          Mega menu
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}>
          <div className="popover-custom-xxl p-0">
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <div className="divider-v divider-v-lg" />
                <List component="div" className="nav-neutral-first p-3">
                  <Typography
                    component="div"
                    className="pb-2 text-capitalize text-first font-size-lg">
                    <span>Dashboards</span>
                  </Typography>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Analytics</span>
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Reports</span>
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Real Estate</span>
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Server Stats</span>
                    <div className="ml-auto badge badge-pill badge-success">
                      8
                    </div>
                  </ListItem>
                  <Divider className="mt-3 mb-2" />
                  <ListItem className="px-0 pb-0">
                    <Button size="small" className="btn-outline-first w-100">
                      <span className="btn-wrapper--label">Learn more</span>
                    </Button>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
                <div className="divider-v divider-v-lg" />
                <List component="div" className="nav-neutral-success p-3">
                  <Typography className="pb-2 text-capitalize text-success font-size-lg">
                    <span>Applications</span>
                  </Typography>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Calendar</span>
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Chat</span>
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Contacts</span>
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>File Manager</span>
                  </ListItem>
                  <Divider className="mt-3 mb-2" />
                  <ListItem className="px-0 pb-0">
                    <Button size="small" className="btn-outline-success w-100">
                      <span className="btn-wrapper--label">Learn more</span>
                    </Button>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
                <List component="div" className="nav-neutral-danger p-3">
                  <Typography className="pb-2 text-capitalize text-danger font-size-lg">
                    <span>Components</span>
                  </Typography>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Cards examples</span>
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Tables</span>
                    <div className="ml-auto badge badge-pill badge-neutral-danger text-danger">
                      New
                    </div>
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Form wizards</span>
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Pricing tables</span>
                  </ListItem>
                  <Divider className="mt-3 mb-2" />
                  <ListItem className="px-0 pb-0">
                    <Button size="small" className="btn-outline-danger w-100">
                      <span className="btn-wrapper--label">Learn more</span>
                    </Button>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </div>
        </Popover>

        <Button
          onClick={handleClickMenu}
          size="small"
          className="btn-transition-none btn-neutral-primary mr-3">
          Dashboards
        </Button>
        <Menu
          anchorEl={anchorElMenu}
          keepMounted
          open={Boolean(anchorElMenu)}
          onClose={handleCloseMenu}
          classes={{ list: 'p-0' }}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}>
          <Box className="overflow-hidden border-0 bg-midnight-bloom p-3 dropdown-mega-menu-md">
            <div className="text-center">
              <div className="font-weight-bold font-size-xl mb-1 text-white">
                Dashboards
              </div>
              <p className="text-white-50 mb-3">
                There are <b className="text-white">multiple</b> dashboard
                layouts available!
              </p>
            </div>
            <div className="d-flex flex-wrap">
              <div className="w-50 p-2">
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="d-block bg-white p-3 text-primary">
                  <div>
                    <CalendarTodayTwoToneIcon className="h1 d-block my-2 text-success" />
                    <div className="text-black font-size-md font-weight-bold">
                      Projects
                    </div>
                  </div>
                </Button>
              </div>
              <div className="w-50 p-2">
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="d-block bg-white p-3 text-primary">
                  <div>
                    <CollectionsTwoToneIcon className="h1 d-block my-2 text-danger" />
                    <div className="text-black font-size-md font-weight-bold">
                      Helpdesk
                    </div>
                  </div>
                </Button>
              </div>
              <div className="w-50 p-2">
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="d-block bg-white p-3 text-primary">
                  <div>
                    <DnsTwoToneIcon className="h1 d-block my-2 text-warning" />
                    <div className="text-black font-size-md font-weight-bold">
                      CRM UI
                    </div>
                  </div>
                </Button>
              </div>
              <div className="w-50 p-2">
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="d-block bg-white p-3 text-primary">
                  <div>
                    <HomeWorkTwoToneIcon className="h1 d-block my-2 text-first" />
                    <div className="text-black font-size-md font-weight-bold">
                      Customers
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </Box>
        </Menu>
      </div>
    </>
  );
};

export default HeaderMenu;
