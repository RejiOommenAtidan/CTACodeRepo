import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography, Card, List, ListItem } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <Card className="card-box p-0">
            <List component="div" className="nav-second p-3">
              <Typography
                component="div"
                className="pb-2 text-uppercase font-weight-bold text-second font-size-sm">
                <span>Navigation Menu</span>
              </Typography>
              <ListItem
                button
                selected
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <div className="nav-link-icon opacity-7">
                  <FontAwesomeIcon icon={['far', 'chart-bar']} />
                </div>
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
                <div className="nav-link-icon opacity-7">
                  <FontAwesomeIcon icon={['far', 'question-circle']} />
                </div>
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
                <div className="nav-link-icon opacity-7">
                  <FontAwesomeIcon icon={['far', 'user-circle']} />
                </div>
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
                <div className="nav-link-icon opacity-7">
                  <FontAwesomeIcon icon={['far', 'object-group']} />
                </div>
                <span>Server Stats</span>
                <div className="ml-auto">
                  <div className="mr-3 badge badge-pill badge-first">85</div>
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
            <List component="div" className="nav-info nav-pills-rounded p-3">
              <Typography
                component="div"
                className="pb-2 text-uppercase font-weight-bold text-info font-size-sm">
                <span>Navigation Menu</span>
              </Typography>
              <ListItem
                button
                selected
                href="#/"
                onClick={(e) => e.preventDefault()}>
                <div className="nav-link-icon opacity-7">
                  <FontAwesomeIcon icon={['far', 'chart-bar']} />
                </div>
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
                <div className="nav-link-icon opacity-7">
                  <FontAwesomeIcon icon={['far', 'question-circle']} />
                </div>
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
                <div className="nav-link-icon opacity-7">
                  <FontAwesomeIcon icon={['far', 'user-circle']} />
                </div>
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
                <div className="nav-link-icon opacity-7">
                  <FontAwesomeIcon icon={['far', 'object-group']} />
                </div>
                <span>Server Stats</span>
                <div className="ml-auto">
                  <div className="mr-3 badge badge-pill badge-primary">36</div>
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
