import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography, Card, List, ListItem } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <Card className="card-box p-0">
            <List
              component="div"
              className="nav-neutral-danger nav-lg nav-alt p-3">
              <Typography
                component="div"
                className="pb-2 text-uppercase font-weight-bold text-danger font-size-sm">
                <span>Navigation Menu</span>
              </Typography>
              <ListItem
                button
                selected
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <span>Analytics</span>
                <div className="ml-auto">
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-right']}
                    className="font-size-xs opacity-3"
                  />
                </div>
              </ListItem>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <span>Reports</span>
                <div className="ml-auto">
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-right']}
                    className="font-size-xs opacity-3"
                  />
                </div>
              </ListItem>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <span>Real Estate</span>
                <div className="ml-auto">
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-right']}
                    className="font-size-xs opacity-3"
                  />
                </div>
              </ListItem>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <span>Server Stats</span>
                <div className="ml-auto">
                  <div className="mr-3 badge badge-pill badge-danger">28</div>
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-right']}
                    className="font-size-xs opacity-3"
                  />
                </div>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card className="card-box p-0">
            <List
              component="div"
              className="nav-neutral-success nav-lg nav-pills-rounded p-3">
              <Typography
                component="div"
                className="pb-2 text-uppercase font-weight-bold text-success font-size-sm">
                <span>Navigation Menu</span>
              </Typography>
              <ListItem
                button
                selected
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <span>Analytics</span>
                <div className="ml-auto">
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-right']}
                    className="font-size-xs opacity-3"
                  />
                </div>
              </ListItem>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <span>Reports</span>
                <div className="ml-auto">
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-right']}
                    className="font-size-xs opacity-3"
                  />
                </div>
              </ListItem>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <span>Real Estate</span>
                <div className="ml-auto">
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-right']}
                    className="font-size-xs opacity-3"
                  />
                </div>
              </ListItem>
              <ListItem
                component="a"
                button
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <span>Server Stats</span>
                <div className="ml-auto">
                  <div className="mr-3 badge badge-pill badge-success">54</div>
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-right']}
                    className="font-size-xs opacity-3"
                  />
                </div>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
