import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Button, List, ListItem, Divider } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';

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
            Vertical 1
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
            <div className="dropdown-menu-xl">
              <List
                component="div"
                className="nav-list-square nav-neutral-primary">
                <ListItem button>
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'chart-bar']} />
                  </div>
                  <span>Services</span>
                </ListItem>
                <Divider className="my-2" />
                <ListItem button>
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'question-circle']} />
                  </div>
                  <span>Layouts</span>
                  <div className="badge badge-warning ml-auto">512</div>
                </ListItem>
                <ListItem button>
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'user-circle']} />
                  </div>
                  <span>Reports</span>
                </ListItem>
                <ListItem className="nav-item--header">
                  <span>Others</span>
                </ListItem>
                <ListItem button>
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'object-group']} />
                  </div>
                  <span>Components</span>
                </ListItem>
                <ListItem button>
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'chart-bar']} />
                  </div>
                  <span>Services</span>
                </ListItem>
              </List>
            </div>
          </Menu>
        </div>
        <div className="m-2">
          <Button className="btn-outline-primary" onClick={handleClickMenu2}>
            Vertical 2
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
              <List
                component="div"
                className="nav-neutral-danger nav-pills flex-column p-3">
                <ListItem className="text-uppercase font-weight-bold text-danger opacity-7 py-2">
                  <span className="font-size-xs">Navigation</span>
                </ListItem>
                <ListItem button>
                  <span>My Account</span>
                </ListItem>
                <ListItem button>
                  <span>Profile settings</span>
                  <div className="badge badge-primary ml-auto">23</div>
                </ListItem>
                <ListItem button>
                  <span>Active tasks</span>
                </ListItem>
                <ListItem className="text-uppercase font-weight-bold text-danger opacity-7 py-2">
                  <span className="font-size-xs">Heading</span>
                </ListItem>
                <ListItem button>
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'bell']} />
                  </div>
                  <span>Customers</span>
                </ListItem>
                <ListItem button>
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'eye']} />
                  </div>
                  <span>Statistics</span>
                </ListItem>
              </List>
            </div>
          </Menu>
        </div>
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="m-2">
          <Button className="btn-outline-primary" onClick={handleClickMenu3}>
            Vertical 3
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
            <div className="dropdown-menu-xl p-0">
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
                  <List component="div" className="nav-list-square py-2">
                    <ListItem button>
                      <div className="nav-link-icon">
                        <FontAwesomeIcon icon={['far', 'chart-bar']} />
                      </div>
                      <span>Services</span>
                    </ListItem>
                    <ListItem button>
                      <div className="nav-link-icon">
                        <FontAwesomeIcon icon={['far', 'question-circle']} />
                      </div>
                      <span>Layouts</span>
                      <div className="badge badge-warning ml-auto">512</div>
                    </ListItem>
                    <ListItem button>
                      <div className="nav-link-icon">
                        <FontAwesomeIcon icon={['far', 'user-circle']} />
                      </div>
                      <span>Reports</span>
                    </ListItem>
                    <ListItem className="text-uppercase font-weight-bold text-dark opacity-7 py-2">
                      <span className="font-size-xs">Others</span>
                    </ListItem>
                    <ListItem button>
                      <div className="nav-link-icon">
                        <FontAwesomeIcon icon={['far', 'object-group']} />
                      </div>
                      <span>Components</span>
                    </ListItem>
                    <ListItem button>
                      <div className="nav-link-icon">
                        <FontAwesomeIcon icon={['far', 'chart-bar']} />
                      </div>
                      <span>Services</span>
                    </ListItem>
                  </List>
                </PerfectScrollbar>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <Button size="small" className="btn-neutral-success">
                  Action
                </Button>
                <Button
                  variant="text"
                  size="small"
                  className="btn-link btn-transparent btn-link-success px-0">
                  <span>View details</span>
                </Button>
              </div>
            </div>
          </Menu>
        </div>
        <div className="m-2">
          <Button className="btn-outline-primary" onClick={handleClickMenu4}>
            Vertical 4
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
            <div className="dropdown-menu-xl p-0">
              <div className="bg-composed-wrapper bg-dark mt-0">
                <div className="bg-composed-wrapper--image bg-composed-img-1" />
                <div className="bg-composed-wrapper--content text-white p-4">
                  <h5 className="mb-0 font-weight-bold">
                    Composed backgrounds
                  </h5>
                  <p className="mb-0 opacity-7">
                    Highly configurable & easy to integrate.
                  </p>
                </div>
              </div>
              <List component="div" className="p-0 nav-list-square">
                <ListItem button className="align-box-row">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon
                      icon={['far', 'file-pdf']}
                      className="text-black-50 font-size-xl mr-3"
                    />
                    Adobe_file.pdf
                    <div className="badge badge-neutral-info text-info ml-2">
                      New
                    </div>
                  </div>
                  <div className="ml-auto">
                    <FontAwesomeIcon
                      icon={['fas', 'angle-right']}
                      className="text-primary"
                    />
                  </div>
                </ListItem>
                <ListItem button className="align-box-row">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon
                      icon={['far', 'file-word']}
                      className="text-black-50 font-size-xl mr-3"
                    />
                    Word_file.docx
                  </div>
                  <div className="ml-auto">
                    <FontAwesomeIcon
                      icon={['fas', 'angle-right']}
                      className="text-primary"
                    />
                  </div>
                </ListItem>
                <ListItem button className="align-box-row">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon
                      icon={['far', 'file-excel']}
                      className="text-black-50 font-size-xl mr-3"
                    />
                    Excel_doc.csv
                    <div className="badge badge-neutral-success text-success ml-2">
                      Draft
                    </div>
                  </div>
                  <div className="ml-auto">
                    <FontAwesomeIcon
                      icon={['fas', 'angle-right']}
                      className="text-primary"
                    />
                  </div>
                </ListItem>
                <ListItem button className="align-box-row">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon
                      icon={['far', 'file-alt']}
                      className="text-black-50 font-size-xl mr-3"
                    />
                    Archive_docs.zip
                  </div>
                  <div className="ml-auto">
                    <FontAwesomeIcon
                      icon={['fas', 'angle-right']}
                      className="text-primary"
                    />
                  </div>
                </ListItem>
                <Divider />
                <ListItem button className="text-center d-block">
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-down']}
                    className="text-muted mr-3"
                  />
                  <small className="text-primary">
                    Show all files <b>(93)</b>
                  </small>
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-down']}
                    className="text-muted ml-3"
                  />
                </ListItem>
              </List>
            </div>
          </Menu>
        </div>
      </div>
    </>
  );
}
