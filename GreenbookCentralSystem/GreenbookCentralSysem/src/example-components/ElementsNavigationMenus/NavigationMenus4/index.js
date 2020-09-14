import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography, Card, List, ListItem } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <Card className="card-box p-0">
            <List component="div" className="nav-neutral-primary p-3">
              <Typography
                component="div"
                className="pb-2 text-uppercase font-weight-bold text-primary font-size-sm">
                <span>Navigation Menu</span>
              </Typography>
              <ListItem
                button
                selected
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="pl-2">
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
                onClick={(e) => e.preventDefault()}
                className="pl-2">
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
                onClick={(e) => e.preventDefault()}
                className="pl-2">
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
                onClick={(e) => e.preventDefault()}
                className="pl-2">
                <div className="mr-2">
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-right']}
                    className="font-size-xs opacity-3"
                  />
                </div>
                <span>Server Stats</span>
                <div className="ml-auto badge badge-pill badge-primary">8</div>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card className="card-box p-0">
            <List component="div" className="nav-neutral-first p-3">
              <Typography
                component="div"
                className="pb-2 text-uppercase font-weight-bold text-first font-size-sm">
                <span>Navigation Menu</span>
              </Typography>
              <ListItem
                button
                selected
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="pl-2">
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
                onClick={(e) => e.preventDefault()}
                className="pl-2">
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
                onClick={(e) => e.preventDefault()}
                className="pl-2">
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
                onClick={(e) => e.preventDefault()}
                className="pl-2">
                <div className="mr-2">
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-right']}
                    className="font-size-xs opacity-3"
                  />
                </div>
                <span>Server Stats</span>
                <div className="ml-auto badge badge-pill badge-first">8</div>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
