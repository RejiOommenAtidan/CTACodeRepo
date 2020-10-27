import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  LinearProgress,
  Menu,
  Button,
  List,
  ListItem,
  Divider
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import avatar2 from '../../../assets/images/avatars/avatar2.jpg';

export default function LivePreviewExample() {
  const [anchorElMenu1, setAnchorElMenu1] = useState(null);
  const [anchorElMenu2, setAnchorElMenu2] = useState(null);
  const [anchorElMenu3, setAnchorElMenu3] = useState(null);

  const handleClickMenu1 = (event) => {
    setAnchorElMenu1(event.currentTarget);
  };
  const handleCloseMenu1 = () => {
    setAnchorElMenu1(null);
  };

  const handleClickMenu2 = (event) => {
    setAnchorElMenu2(event.currentTarget);
  };
  const handleCloseMenu2 = () => {
    setAnchorElMenu2(null);
  };

  const handleClickMenu3 = (event) => {
    setAnchorElMenu3(event.currentTarget);
  };
  const handleCloseMenu3 = () => {
    setAnchorElMenu3(null);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="m-2">
          <Button className="btn-outline-primary" onClick={handleClickMenu1}>
            Profile 1
          </Button>
          <Menu
            anchorEl={anchorElMenu1}
            keepMounted
            open={Boolean(anchorElMenu1)}
            onClose={handleCloseMenu1}
            classes={{ list: 'p-0' }}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}>
            <div className="dropdown-menu-xxl p-0">
              <List component="div" className="text-left d-block p-0">
                <ListItem className="pb-0 pt-3 d-block">
                  <div className="align-box-row">
                    <div>
                      <div className="avatar-icon-wrapper avatar-icon-md">
                        <div className="avatar-icon rounded-circle">
                          <img alt="..." src={avatar2} />
                        </div>
                      </div>
                    </div>
                    <div className="pl-3">
                      <span className="pb-1 font-weight-bold d-block">
                        John Doe{' '}
                        <small className="d-block text-black-50">
                          (john@example.com)
                        </small>
                      </span>
                      <span className="badge badge-success">
                        Active Account
                      </span>
                    </div>
                  </div>
                  <Alert className="my-3 text-warning" severity="warning">
                    <b className="pb-1">Unpaid invoice</b>
                    This account will be disabled starting 12 January 2021
                  </Alert>
                </ListItem>
                <Divider />
                <ListItem className="d-block p-0">
                  <div className="grid-menu grid-menu-2col">
                    <Grid container spacing={0}>
                      <Grid item sm={6}>
                        <div className="py-3 text-center">
                          <div>
                            <FontAwesomeIcon
                              icon={['far', 'chart-bar']}
                              className="font-size-xxl text-info"
                            />
                          </div>
                          <div className="mt-2 line-height-sm">
                            <b className="font-size-lg">$9,693</b>
                            <span className="text-black-50 d-block">
                              revenue
                            </span>
                          </div>
                        </div>
                      </Grid>
                      <Grid item sm={6}>
                        <div className="py-3 text-center">
                          <div>
                            <FontAwesomeIcon
                              icon={['far', 'user']}
                              className="font-size-xxl text-success"
                            />
                          </div>
                          <div className="mt-2 line-height-sm">
                            <b className="font-size-lg">2,345</b>
                            <span className="text-black-50 d-block">users</span>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </ListItem>
                <Divider />
                <ListItem className="d-block p-3 text-center">
                  <Button className="btn-icon p-0 d-40 btn-facebook">
                    <FontAwesomeIcon icon={['fab', 'facebook']} />
                  </Button>
                  <Button className="btn-icon p-0 d-40 btn-dribbble mx-2">
                    <FontAwesomeIcon icon={['fab', 'dribbble']} />
                  </Button>
                  <Button className="btn-icon p-0 d-40 btn-twitter">
                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                  </Button>
                </ListItem>
              </List>
            </div>
          </Menu>
        </div>

        <div className="m-2">
          <Button className="btn-outline-primary" onClick={handleClickMenu2}>
            Profile 2
          </Button>
          <Menu
            anchorEl={anchorElMenu2}
            keepMounted
            open={Boolean(anchorElMenu2)}
            onClose={handleCloseMenu2}
            classes={{ list: 'p-0' }}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}>
            <div className="dropdown-menu-xl p-0">
              <List component="div" className="text-left bg-transparent">
                <ListItem className="d-block">
                  <div className="align-box-row">
                    <div className="avatar-icon-wrapper avatar-icon-md">
                      <div className="avatar-icon rounded-circle">
                        <img alt="..." src={avatar2} />
                      </div>
                    </div>
                    <div className="pl-2">
                      <span className="pb-1 font-weight-bold d-block">
                        John Doe
                      </span>
                      <small className="pb-1 text-black-50 d-block">
                        John's bio description here...
                      </small>
                      <div className="divider my-2" />
                      <small className="text-black-50">
                        Deadline: <b className="text-danger">12 July 2029</b>
                      </small>
                    </div>
                  </div>
                </ListItem>
                <ListItem className="d-block bg-secondary py-2">
                  <div className="align-box-row mb-1">
                    <div>
                      <small className="font-weight-bold">Orders</small>
                    </div>
                    <div className="ml-auto">
                      <div className="font-weight-bold text-success">348</div>
                    </div>
                  </div>
                  <LinearProgress
                    className="progress-sm"
                    color="secondary"
                    value={75}
                  />
                  <div className="align-box-row mt-1 text-muted">
                    <small className="text-dark">0</small>
                    <small className="ml-auto">100%</small>
                  </div>
                </ListItem>
              </List>
              <div className="card-footer bg-white p-3 text-center d-block">
                <Button size="small" className="btn-success mr-1">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'cog']} spin />
                  </span>
                  <span className="btn-wrapper--label">Refresh</span>
                </Button>
                <Button size="small" className="btn-danger ml-1">
                  Remove
                </Button>
              </div>
            </div>
          </Menu>
        </div>
      </div>
      <div className="divider my-3" />

      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="m-2">
          <Button className="btn-outline-primary" onClick={handleClickMenu3}>
            Statistics Box
          </Button>
          <Menu
            anchorEl={anchorElMenu3}
            keepMounted
            open={Boolean(anchorElMenu3)}
            onClose={handleCloseMenu3}
            classes={{ list: 'p-0' }}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}>
            <div className="dropdown-menu-lg bg-vicious-stance overflow-hidden p-0">
              <div className="text-left p-4">
                <div className="align-box-row align-items-start">
                  <div className="font-weight-bold">
                    <small className="text-white-50 d-block mb-1 text-uppercase">
                      New Accounts
                    </small>
                    <span className="font-size-xxl mt-1 text-white">
                      586,356
                    </span>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-white text-center text-success font-size-xl d-50 rounded-circle">
                      <FontAwesomeIcon icon={['far', 'lightbulb']} />
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <FontAwesomeIcon
                    icon={['fas', 'arrow-up']}
                    className="text-success pr-1"
                  />
                  <span className="text-white px-1">15.4%</span>
                  <span className="text-white-50">increase</span>
                </div>
              </div>
            </div>
          </Menu>
        </div>
      </div>
    </>
  );
}
