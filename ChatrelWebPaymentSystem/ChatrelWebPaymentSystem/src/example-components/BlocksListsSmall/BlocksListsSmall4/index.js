import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  CardContent,
  Menu,
  Button,
  List,
  ListItem
} from '@material-ui/core';

import CountUp from 'react-countup';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../../assets/images/avatars/avatar4.jpg';

export default function LivePreviewExample() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card className="card-box">
        <div className="card-header">
          <div className="card-header--title">
            <h4 className="font-size-lg mb-0 py-2 font-weight-bold">
              Users list
            </h4>
          </div>
          <div className="card-header--actions">
            <div>
              <Button
                onClick={handleClick}
                size="small"
                className="btn-neutral-dark">
                <span className="btn-wrapper--label">Export</span>
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-down']}
                    className="opacity-8 font-size-xs"
                  />
                </span>
              </Button>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                classes={{ list: 'p-0' }}
                onClose={handleClose}>
                <div className="dropdown-menu-xl">
                  <List
                    component="div"
                    className="nav-pills nav-neutral-dark flex-column px-3">
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <span>View all reports</span>
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      selected>
                      <span>View active items</span>
                      <div className="badge badge-pill badge-success ml-auto">
                        23
                      </div>
                    </ListItem>

                    <div className="divider" />

                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon">
                        <FontAwesomeIcon icon={['fas', 'download']} />
                      </div>
                      <span>Download</span>
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon">
                        <FontAwesomeIcon icon={['far', 'file-excel']} />
                      </div>
                      <span>Export to CSV</span>
                    </ListItem>
                  </List>
                </div>
              </Menu>
            </div>
          </div>
        </div>
        <CardContent>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex">
              <div className="d-flex align-items-center">
                <div className="avatar-icon-wrapper mr-2">
                  <div className="avatar-icon">
                    <img alt="..." src={avatar1} />
                  </div>
                </div>
                <div>
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold text-black"
                    title="...">
                    Isaiah Ruiz
                  </a>
                  <span className="text-black-50 d-block">
                    Senior Web Developer
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="font-weight-bold text-success font-size-lg pr-2">
                <CountUp
                  start={0}
                  end={2.363}
                  duration={6}
                  delay={2}
                  separator=""
                  decimals={3}
                  decimal=","
                />
              </div>
              <FontAwesomeIcon
                icon={['fas', 'arrow-down']}
                className="font-size-sm text-success opacity-5"
              />
            </div>
          </div>
          <div className="divider my-3" />
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex">
              <div className="d-flex align-items-center">
                <div className="avatar-icon-wrapper mr-2">
                  <div className="avatar-icon">
                    <img alt="..." src={avatar2} />
                  </div>
                </div>
                <div>
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold text-black"
                    title="...">
                    Inez Conley
                  </a>
                  <span className="text-black-50 d-block">Project Manager</span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="font-weight-bold text-danger font-size-lg pr-2">
                <CountUp
                  start={0}
                  end={584}
                  duration={6}
                  delay={2}
                  separator=""
                  prefix="+"
                  decimals={0}
                  decimal=","
                />
              </div>
              <FontAwesomeIcon
                icon={['fas', 'arrow-down']}
                className="font-size-sm text-danger opacity-5"
              />
            </div>
          </div>
          <div className="divider my-3" />
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex">
              <div className="d-flex align-items-center">
                <div className="avatar-icon-wrapper mr-2">
                  <div className="avatar-icon">
                    <img alt="..." src={avatar3} />
                  </div>
                </div>
                <div>
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold text-black"
                    title="...">
                    Adyan Sosa
                  </a>
                  <span className="text-black-50 d-block">
                    User Experience Designer
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="font-weight-bold text-warning font-size-lg pr-2">
                <CountUp
                  start={0}
                  end={483}
                  duration={6}
                  delay={2}
                  separator=""
                  decimals={0}
                  decimal=","
                />
              </div>
              <FontAwesomeIcon
                icon={['fas', 'arrow-up']}
                className="font-size-sm text-warning opacity-5"
              />
            </div>
          </div>
          <div className="divider my-3" />
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex">
              <div className="d-flex align-items-center">
                <div className="avatar-icon-wrapper mr-2">
                  <div className="avatar-icon">
                    <img alt="..." src={avatar4} />
                  </div>
                </div>
                <div>
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold text-black"
                    title="...">
                    Beck Simpson
                  </a>
                  <span className="text-black-50 d-block">
                    Senior Consultant
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="font-weight-bold text-first font-size-lg pr-2">
                {' '}
                $12,23M
              </div>
              <FontAwesomeIcon
                icon={['fas', 'arrow-up']}
                className="font-size-sm text-first opacity-5"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
