import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ListItem } from '@material-ui/core';

import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

export default function LivePreviewExample() {
  const attributes = {
    className: 'nav-item my-1'
  };
  const attributes3 = {
    className: 'd-block text-left p-3'
  };
  return (
    <>
      <div className="text-center">
        <span className="position-relative">
          <ContextMenuTrigger renderTag="span" id="ContextMenuTrigger1">
            <Button className="btn-primary m-2">Right click menu 1</Button>
          </ContextMenuTrigger>
          <ContextMenu
            className="rel-container rounded-sm shadow-xxl bg-white dropdown-menu nav nav-neutral-danger nav-pills flex-column p-3 dropdown-menu-lg"
            id="ContextMenuTrigger1">
            <MenuItem preventClose={true} attributes={attributes}>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="rounded-sm">
                <div className="nav-link-icon">
                  <FontAwesomeIcon icon={['far', 'object-group']} />
                </div>
                <span>Dashboard</span>
              </ListItem>
            </MenuItem>
            <MenuItem preventClose={true} attributes={attributes}>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="rounded-sm">
                <div className="nav-link-icon">
                  <FontAwesomeIcon icon={['far', 'building']} />
                </div>
                <span>Accounts</span>
              </ListItem>
            </MenuItem>
            <MenuItem className="my-3" divider />
            <MenuItem preventClose={true} attributes={attributes}>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="rounded-sm">
                <div className="nav-link-icon">
                  <FontAwesomeIcon icon={['far', 'keyboard']} />
                </div>
                <span>Reports</span>
              </ListItem>
            </MenuItem>
            <MenuItem preventClose={true} attributes={attributes}>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="rounded-sm">
                <div className="nav-link-icon">
                  <FontAwesomeIcon icon={['far', 'chart-bar']} />
                </div>
                <span>Deliveries</span>
              </ListItem>
            </MenuItem>
          </ContextMenu>
        </span>
        <span className="position-relative">
          <ContextMenuTrigger renderTag="span" id="ContextMenuTrigger2">
            <Button className="btn-primary m-2">Right click menu 2</Button>
          </ContextMenuTrigger>
          <ContextMenu
            className="rel-container shadow-sm rounded-lg bg-white dropdown-menu nav nav-neutral-warning nav-pills dropdown-menu-xl nav-pills-rounded flex-column p-3"
            id="ContextMenuTrigger2">
            <MenuItem preventClose={true} attributes={attributes}>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="rounded-lg">
                <div className="nav-link-icon">
                  <FontAwesomeIcon icon={['far', 'lightbulb']} />
                </div>
                <span>My Account</span>
              </ListItem>
            </MenuItem>
            <MenuItem preventClose={true} attributes={attributes}>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}
                selected
                className="rounded-lg">
                <div className="nav-link-icon">
                  <FontAwesomeIcon icon={['far', 'heart']} />
                </div>
                <span>Profile settings</span>
              </ListItem>
            </MenuItem>
            <MenuItem preventClose={true} attributes={attributes}>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="rounded-lg">
                <span className="d-flex align-items-center">
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'user']} />
                  </div>
                  <span>Active tasks</span>
                </span>
                <div className="badge badge-pill badge-success ml-auto">
                  New
                </div>
              </ListItem>
            </MenuItem>
            <MenuItem preventClose={true} attributes={attributes}>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="rounded-lg">
                <div className="nav-link-icon">
                  <FontAwesomeIcon icon={['far', 'bell']} />
                </div>
                <span>Customers</span>
              </ListItem>
            </MenuItem>
            <MenuItem preventClose={true} attributes={attributes}>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="rounded-lg">
                <div className="nav-link-icon">
                  <FontAwesomeIcon icon={['far', 'eye']} />
                </div>
                <span>Statistics</span>
              </ListItem>
            </MenuItem>
          </ContextMenu>
        </span>
        <span className="position-relative">
          <ContextMenuTrigger renderTag="span" id="ContextMenuTrigger3">
            <Button className="btn-primary m-2">Right click menu 3</Button>
          </ContextMenuTrigger>
          <ContextMenu
            className="rel-container shadow-lg rounded bg-white dropdown-menu py-0 list-group list-group-flush dropdown-menu-xl"
            id="ContextMenuTrigger3">
            <MenuItem preventClose={true} attributes={attributes3}>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="align-box-row w-100">
                <div className="mr-3">
                  <div className="bg-grow-early btn-icon text-center text-white font-size-xl d-50 rounded-circle">
                    <FontAwesomeIcon icon={['far', 'bell']} />
                  </div>
                </div>
                <div>
                  <div className="font-weight-bold text-primary d-block">
                    Sales
                  </div>
                  <small className="text-success">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-up']}
                      className="text-success mr-1"
                    />
                    <span>15.4% increase</span>
                  </small>
                </div>
              </a>
            </MenuItem>
            <MenuItem preventClose={true} attributes={attributes3}>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="align-box-row w-100">
                <div className="mr-3">
                  <div className="bg-warning btn-icon text-center text-white font-size-xl d-50 rounded-circle">
                    <FontAwesomeIcon icon={['far', 'chart-bar']} />
                  </div>
                </div>
                <div>
                  <div className="font-weight-bold text-primary d-block">
                    Expenses
                  </div>
                  <small className="text-warning">
                    <FontAwesomeIcon
                      icon={['fas', 'arrow-down']}
                      className="text-warning mr-1"
                    />
                    <span>5.2% down</span>
                  </small>
                </div>
              </a>
            </MenuItem>
          </ContextMenu>
        </span>
        <span className="position-relative">
          <ContextMenuTrigger renderTag="span" id="ContextMenuTrigger4">
            <Button className="btn-primary m-2">Right click menu 4</Button>
          </ContextMenuTrigger>
          <ContextMenu
            className="rel-container rounded modal-content bg-white dropdown-menu nav nav-neutral-primary nav-pills dropdown-menu-xl flex-column p-3"
            id="ContextMenuTrigger4">
            <MenuItem preventClose={true} attributes={attributes}>
              <span className="font-weight-bold px-2 pb-2 text-left w-100 d-block text-primary text-uppercase font-size-sm">
                Reports
              </span>
            </MenuItem>
            <MenuItem preventClose={true} attributes={attributes}>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="rounded-sm">
                <span>My Account</span>
              </ListItem>
            </MenuItem>
            <MenuItem preventClose={true} attributes={attributes}>
              <ListItem
                button
                selected
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <span>Profile settings</span>
                <div className="badge badge-first ml-auto">23</div>
              </ListItem>
            </MenuItem>
            <MenuItem preventClose={true} attributes={attributes}>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="rounded-sm">
                <span>Active tasks</span>
              </ListItem>
            </MenuItem>
            <MenuItem className="my-2" divider />
            <MenuItem preventClose={true} attributes={attributes}>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="rounded-sm">
                <div className="nav-link-icon">
                  <FontAwesomeIcon icon={['far', 'bell']} />
                </div>
                <span>Customers</span>
              </ListItem>
            </MenuItem>
            <MenuItem preventClose={true} attributes={attributes}>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="rounded-sm">
                <div className="nav-link-icon">
                  <FontAwesomeIcon icon={['far', 'eye']} />
                </div>
                <span>Statistics</span>
              </ListItem>
            </MenuItem>
          </ContextMenu>
        </span>
      </div>
    </>
  );
}
