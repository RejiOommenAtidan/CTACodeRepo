import React from 'react';

import { Card, List, ListItem } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="p-4 mb-5">
        <List
          component="div"
          className="nav-tabs tabs-animated nav-tabs-primary tabs-animated-shadow d-flex align-items-center">
          <ListItem button selected>
            <span>Home</span>
          </ListItem>
          <ListItem button>
            <span>Profile</span>
          </ListItem>
          <ListItem button>
            <span>Messages</span>
          </ListItem>
        </List>
        <div className="divider my-4" />
        <List
          component="div"
          className="nav-tabs tabs-animated nav-tabs-first tabs-animated-shadow d-flex align-items-center">
          <ListItem button selected>
            <span className="font-weight-bold text-uppercase font-size-sm">
              Home
            </span>
          </ListItem>
          <ListItem button>
            <span className="font-weight-bold text-uppercase font-size-sm">
              Profile
            </span>
          </ListItem>
          <ListItem button>
            <span className="font-weight-bold text-uppercase font-size-sm">
              Messages
            </span>
          </ListItem>
        </List>
        <div className="divider my-4" />
        <List
          component="div"
          className="nav-tabs tabs-animated nav-tabs-danger tabs-animated-shadow d-flex align-items-center">
          <ListItem button selected>
            <span className="px-3 font-weight-bold font-size-sm">Home</span>
          </ListItem>
          <ListItem button>
            <span className="px-3 font-weight-bold font-size-sm">Profile</span>
          </ListItem>
          <ListItem button>
            <span className="px-3 font-weight-bold font-size-sm">Messages</span>
          </ListItem>
        </List>
      </Card>
    </>
  );
}
