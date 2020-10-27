import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button, List, ListItem } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <Card className="card-box p-0">
            <div className="bg-composed-wrapper bg-malibu-beach">
              <div className="bg-composed-wrapper--image bg-composed-img-2" />
              <div className="bg-composed-wrapper--content text-light p-5">
                <h5 className="mb-2 font-size-xl font-weight-bold">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h5>
                <p className="mb-0 font-size-lg opacity-8">
                  These are examples of vertical navigation menus with composed
                  card headers.
                </p>
              </div>
            </div>
            <div className="scroll-area-sm shadow-overflow">
              <PerfectScrollbar options={{ wheelPropagation: false }}>
                <List
                  component="div"
                  className="nav-neutral-first nav-lg nav-alt pr-3 py-3">
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
                      <div className="mr-3 badge badge-pill badge-danger">
                        37
                      </div>
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
                </List>
              </PerfectScrollbar>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <Button className="btn-neutral-first" size="small">
                <span>View details</span>
              </Button>
              <Button size="small" className="btn-first">
                Save now
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card className="card-box p-0">
            <div className="bg-composed-wrapper bg-danger">
              <div className="bg-composed-wrapper--image bg-composed-img-3" />
              <div className="bg-composed-wrapper--content text-center text-light p-5">
                <h5 className="mb-2 font-size-xl font-weight-bold">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h5>
                <p className="mb-0 font-size-lg opacity-8">
                  These are examples of scrollable vertical navigation menus
                  with composed card headers.
                </p>
              </div>
            </div>
            <div className="scroll-area-sm shadow-overflow">
              <PerfectScrollbar options={{ wheelPropagation: false }}>
                <List
                  component="div"
                  className="nav-neutral-danger nav-lg nav-pills-rounded p-3">
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
                      <FontAwesomeIcon icon={['far', 'question-circle']} />
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
                      <div className="mr-3 badge badge-pill badge-primary">
                        82
                      </div>
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
                      <FontAwesomeIcon icon={['far', 'question-circle']} />
                    </div>
                    <span>Real Estate</span>
                    <div className="ml-auto">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                  </ListItem>
                </List>
              </PerfectScrollbar>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <Button className="btn-neutral-danger" size="small">
                <span>View details</span>
              </Button>
              <Button size="small" className="btn-danger">
                Save now
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
