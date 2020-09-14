import React from 'react';

import { Card, List, ListItem } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="p-4 mb-5">
        <List
          component="div"
          className="nav-line-alt nav-line d-flex align-items-center">
          <ListItem button selected>
            <span className="px-3">Home</span>
            <div className="divider" />
          </ListItem>
          <ListItem button disableRipple>
            <span className="px-3">Profile</span>
            <div className="divider" />
          </ListItem>
          <ListItem button disableRipple>
            <span className="px-3">Messages</span>
            <div className="divider" />
          </ListItem>
        </List>
      </Card>
      <Card className="p-4 mb-5">
        <List
          component="div"
          className="tabs-animated tabs-animated-line nav-tabs d-flex align-items-center">
          <ListItem button selected>
            <span className="px-3">Home</span>
            <div className="divider" />
          </ListItem>
          <ListItem button disableRipple>
            <span className="px-3">Profile</span>
            <div className="divider" />
          </ListItem>
          <ListItem button disableRipple>
            <span className="px-3">Messages</span>
            <div className="divider" />
          </ListItem>
        </List>
      </Card>
    </>
  );
}
