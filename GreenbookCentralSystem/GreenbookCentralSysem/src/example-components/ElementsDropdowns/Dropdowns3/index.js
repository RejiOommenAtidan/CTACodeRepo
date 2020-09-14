import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, IconButton, Menu, Button, Tooltip } from '@material-ui/core';

export default function LivePreviewExample() {
  const [anchorElMenu1, setAnchorElMenu1] = useState(null);
  const [anchorElMenu2, setAnchorElMenu2] = useState(null);
  const [anchorElMenu3, setAnchorElMenu3] = useState(null);
  const [anchorElMenu4, setAnchorElMenu4] = useState(null);

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

  const handleClickMenu4 = (event) => {
    setAnchorElMenu4(event.currentTarget);
  };
  const handleCloseMenu4 = () => {
    setAnchorElMenu4(null);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="m-2">
          <Button className="btn-outline-primary" onClick={handleClickMenu1}>
            Grid 1
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
            <div className="dropdown-menu-xl p-0">
              <div className="grid-menu grid-menu-2col">
                <Grid container spacing={0}>
                  <Grid item sm={6}>
                    <div className="p-3">
                      <Button
                        variant="text"
                        className="btn-outline-primary border-0 w-100 d-block">
                        <span className="font-size-xxl d-block">
                          <FontAwesomeIcon icon={['far', 'bell']} />
                        </span>
                        <span>Primary</span>
                      </Button>
                    </div>
                  </Grid>
                  <Grid item sm={6}>
                    <div className="p-3">
                      <Button
                        variant="text"
                        className="btn-outline-info border-0 w-100 d-block">
                        <span className="font-size-xxl d-block">
                          <FontAwesomeIcon icon={['far', 'chart-bar']} />
                        </span>
                        <span>Info</span>
                      </Button>
                    </div>
                  </Grid>
                  <Grid item sm={6}>
                    <div className="p-3">
                      <Button
                        variant="text"
                        className="btn-outline-success border-0 w-100 d-block">
                        <span className="font-size-xxl d-block">
                          <FontAwesomeIcon icon={['far', 'lightbulb']} />
                        </span>
                        <span>Success</span>
                      </Button>
                    </div>
                  </Grid>
                  <Grid item sm={6}>
                    <div className="p-3">
                      <Button
                        variant="text"
                        className="btn-outline-danger border-0 w-100 d-block">
                        <span className="font-size-xxl d-block">
                          <FontAwesomeIcon icon={['far', 'user']} />
                        </span>
                        <span>Danger</span>
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Menu>
        </div>
        <div className="m-2">
          <Button className="btn-outline-primary" onClick={handleClickMenu2}>
            Grid 2
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
            <div className="dropdown-menu-xl overflow-hidden p-0">
              <div className="grid-menu grid-menu-2col">
                <Grid container spacing={0}>
                  <Grid item sm={6}>
                    <Button
                      variant="text"
                      className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                      <FontAwesomeIcon
                        icon={['far', 'bell']}
                        className="h2 d-block mb-2 mx-auto mt-1 text-success"
                      />
                      <div className="font-weight-bold text-black">Reports</div>
                      <div className="font-size-md mb-1 text-black-50">
                        Monthly Stats
                      </div>
                    </Button>
                  </Grid>
                  <Grid item sm={6}>
                    <Button
                      variant="text"
                      className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                      <FontAwesomeIcon
                        icon={['far', 'file-excel']}
                        className="h2 d-block mx-auto mb-2 mt-1 text-success"
                      />
                      <div className="font-weight-bold text-black">
                        Statistics
                      </div>
                      <div className="font-size-md mb-1 text-black-50">
                        Customers stats
                      </div>
                    </Button>
                  </Grid>
                  <Grid item sm={6}>
                    <Button
                      variant="text"
                      className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                      <FontAwesomeIcon
                        icon={['far', 'eye']}
                        className="h2 d-block mb-2 mx-auto mt-1 text-success"
                      />
                      <div className="font-weight-bold text-black">
                        Projects
                      </div>
                      <div className="font-size-md mb-1 text-black-50">
                        Manage servers
                      </div>
                    </Button>
                  </Grid>
                  <Grid item sm={6}>
                    <Button
                      variant="text"
                      className="btn-outline-secondary border-0 w-100 d-block btn-transition-none rounded-0 shadow-none py-4 px-1">
                      <FontAwesomeIcon
                        icon={['far', 'chart-bar']}
                        className="h2 d-block mx-auto mb-2 mt-1 text-success"
                      />
                      <div className="font-weight-bold text-black">Tasks</div>
                      <div className="font-size-md mb-1 text-black-50">
                        Pending items
                      </div>
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Menu>
        </div>
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="m-2">
          <Button className="btn-outline-primary" onClick={handleClickMenu3}>
            Bullets 1
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
            <div className="bg-night-sky menu-items-container border-0 dropdown-menu-xl">
              <div className="p-2 text-center">
                <Tooltip arrow title="Menu Item Tooltip">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="btn-link m-2 p-0 border-0 bg-love-kiss d-inline-flex align-items-center justify-content-center text-center d-50 rounded-circle card-box-hover-rise-alt">
                    <FontAwesomeIcon
                      icon={['far', 'question-circle']}
                      className="font-size-xl text-white"
                    />
                  </a>
                </Tooltip>
                <Tooltip arrow title="Menu Item Tooltip">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="btn-link m-2 p-0 border-0 bg-ripe-malin d-inline-flex align-items-center justify-content-center text-center d-50 rounded-circle card-box-hover-rise-alt">
                    <FontAwesomeIcon
                      icon={['far', 'building']}
                      className="font-size-xl text-white"
                    />
                  </a>
                </Tooltip>
                <Tooltip arrow title="Menu Item Tooltip">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="btn-link m-2 p-0 border-0 bg-grow-early d-inline-flex align-items-center justify-content-center text-center d-50 rounded-circle card-box-hover-rise-alt">
                    <FontAwesomeIcon
                      icon={['far', 'bell']}
                      className="font-size-xl text-white"
                    />
                  </a>
                </Tooltip>
                <Tooltip arrow title="Menu Item Tooltip">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="btn-link m-2 p-0 border-0 bg-arielle-smile d-inline-flex align-items-center justify-content-center text-center d-50 rounded-circle card-box-hover-rise-alt">
                    <FontAwesomeIcon
                      icon={['far', 'file-excel']}
                      className="font-size-xl text-white"
                    />
                  </a>
                </Tooltip>
                <Tooltip arrow title="Menu Item Tooltip">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="btn-link m-2 p-0 border-0 bg-night-fade d-inline-flex align-items-center justify-content-center text-center d-50 rounded-circle card-box-hover-rise-alt">
                    <FontAwesomeIcon
                      icon={['far', 'eye']}
                      className="font-size-xl text-white"
                    />
                  </a>
                </Tooltip>
                <Tooltip arrow title="Menu Item Tooltip">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="btn-link m-2 p-0 border-0 bg-strong-bliss d-inline-flex align-items-center justify-content-center text-center d-50 rounded-circle card-box-hover-rise-alt">
                    <FontAwesomeIcon
                      icon={['far', 'chart-bar']}
                      className="font-size-xl text-white"
                    />
                  </a>
                </Tooltip>
              </div>
            </div>
          </Menu>
        </div>
        <div className="m-2">
          <Button className="btn-outline-primary" onClick={handleClickMenu4}>
            Bullets 2
          </Button>
          <Menu
            anchorEl={anchorElMenu4}
            keepMounted
            open={Boolean(anchorElMenu4)}
            onClose={handleCloseMenu4}
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
            <div className="dropdown-menu-xl bg-slick-carbon p-0">
              <div className="px-3 py-3 text-center">
                <div className="mx-3 mb-2 mt-3 d-inline-block text-center">
                  <IconButton className="btn-primary p-0 bg-ripe-malin d-inline-block text-center text-white d-50 rounded btn-icon border-0 mb-2">
                    <FontAwesomeIcon
                      icon={['far', 'gem']}
                      className="font-size-xl"
                    />
                  </IconButton>
                  <div className="d-block text-white-50">Tasks</div>
                </div>
                <div className="mx-3 mb-2 mt-3 d-inline-block text-center">
                  <IconButton className="btn-primary p-0 bg-grow-early d-inline-block text-center text-white d-50 rounded btn-icon border-0 mb-2">
                    <FontAwesomeIcon
                      icon={['far', 'building']}
                      className="font-size-xl"
                    />
                  </IconButton>
                  <div className="d-block text-white-50">Reports</div>
                </div>
                <div className="mx-3 mb-2 mt-3 d-inline-block text-center">
                  <IconButton className="btn-primary p-0 bg-arielle-smile d-inline-block text-center text-white d-50 rounded btn-icon border-0 mb-2">
                    <FontAwesomeIcon
                      icon={['far', 'chart-bar']}
                      className="font-size-xl"
                    />
                  </IconButton>
                  <div className="d-block text-white-50">Stats</div>
                </div>
              </div>
              <div className="divider opacity-2 bg-white" />
              <div className="text-center py-3">
                <Button
                  onClick={(e) => e.preventDefault()}
                  variant="text"
                  size="small"
                  className="text-white btn-transparent">
                  View more items
                </Button>
              </div>
            </div>
          </Menu>
        </div>
      </div>
    </>
  );
}
