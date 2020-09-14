import React from 'react';

import { Card, List, ListItem } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="p-4 mb-5">
        <List
          component="div"
          className="nav-line nav-tabs-second d-flex align-items-center">
          <ListItem button disableRipple selected>
            <span>Home</span>
            <div className="divider" />
          </ListItem>
          <ListItem button disableRipple>
            <span>Profile</span>
            <div className="divider" />
          </ListItem>
          <ListItem button disableRipple>
            <span>Messages</span>
            <div className="divider" />
          </ListItem>
        </List>
        <div className="divider my-4" />
        <List
          component="div"
          className="nav-line nav-tabs-success d-flex align-items-center">
          <ListItem button selected>
            <span className="font-weight-bold text-uppercase font-size-sm">
              Home
            </span>
            <div className="divider" />
          </ListItem>
          <ListItem button disableRipple>
            <span className="font-weight-bold text-uppercase font-size-sm">
              Profile
            </span>
            <div className="divider" />
          </ListItem>
          <ListItem button disableRipple>
            <span className="font-weight-bold text-uppercase font-size-sm">
              Messages
            </span>
            <div className="divider" />
          </ListItem>
        </List>
        <div className="divider my-4" />
        <List
          component="div"
          className="nav-line nav-tabs-danger d-flex align-items-center">
          <ListItem button selected>
            <span className="font-weight-bold font-size-sm">Home</span>
            <div className="divider" />
          </ListItem>
          <ListItem button disableRipple>
            <span className="font-weight-bold font-size-sm">Profile</span>
            <div className="divider" />
          </ListItem>
          <ListItem button disableRipple>
            <span className="font-weight-bold font-size-sm">Messages</span>
            <div className="divider" />
          </ListItem>
        </List>
      </Card>
    </>
  );
}
