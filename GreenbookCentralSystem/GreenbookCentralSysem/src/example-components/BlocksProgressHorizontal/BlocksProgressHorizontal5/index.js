import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  LinearProgress,
  Card,
  Button,
  List,
  ListItem
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <div className="card-header">
          <div className="card-header--title">
            <b>Monthly targets</b>
            <small className="d-block text-capitalize mt-1">
              Card with progress bars list items.
            </small>
          </div>

          <div className="card-header--actions">
            <Button
              size="small"
              className="btn-link d-30 btn-icon p-0 font-size-xl text-primary">
              <FontAwesomeIcon
                icon={['fas', 'ellipsis-h']}
                className="font-size-lg"
              />
            </Button>
          </div>
        </div>
        <div className="scroll-area shadow-overflow">
          <PerfectScrollbar options={{ wheelPropagation: false }}>
            <List component="div" className="list-group-flush">
              <ListItem className="py-2 d-block">
                <div className="align-box-row py-1">
                  <div>
                    <div className="font-weight-bold">Orders</div>
                  </div>
                  <div className="ml-auto">
                    <div className="font-size-xl font-weight-bold text-success">
                      348
                    </div>
                  </div>
                </div>
                <LinearProgress
                  variant="determinate"
                  className="progress-animated-alt progress-bar-success"
                  value={34}
                />
                <div className="align-box-row progress-bar--label mt-1 text-muted">
                  <small className="text-dark">0</small>
                  <div className="ml-auto">100%</div>
                </div>
              </ListItem>
              <ListItem className="py-2 d-block">
                <div className="align-box-row py-1">
                  <div>
                    <div className="font-weight-bold">Sales</div>
                  </div>
                  <div className="ml-auto">
                    <div className="font-size-xl font-weight-bold text-danger">
                      <small>$</small>
                      2.3M
                    </div>
                  </div>
                </div>
                <LinearProgress
                  variant="determinate"
                  className="progress-animated-alt progress-bar-danger"
                  value={39}
                />
                <div className="align-box-row progress-bar--label mt-1 text-muted">
                  <small className="text-dark">0</small>
                  <div className="ml-auto">100%</div>
                </div>
              </ListItem>
              <ListItem className="py-2 d-block">
                <div className="align-box-row py-1">
                  <div>
                    <div className="font-weight-bold">Users</div>
                  </div>
                  <div className="ml-auto">
                    <div className="font-size-xl font-weight-bold text-info">
                      <small>#</small>
                      87
                    </div>
                  </div>
                </div>
                <LinearProgress
                  variant="determinate"
                  className="progress-animated-alt progress-bar-info"
                  value={51}
                />
                <div className="align-box-row progress-bar--label mt-1 text-muted">
                  <small className="text-dark">0</small>
                  <div className="ml-auto">100%</div>
                </div>
              </ListItem>
              <ListItem className="py-2 d-block">
                <div className="align-box-row py-1">
                  <div>
                    <div className="font-weight-bold">Orders</div>
                  </div>
                  <div className="ml-auto">
                    <div className="font-size-xl font-weight-bold text-success">
                      348
                    </div>
                  </div>
                </div>
                <LinearProgress
                  variant="determinate"
                  className="progress-animated-alt progress-bar-success"
                  value={34}
                />
                <div className="align-box-row progress-bar--label mt-1 text-muted">
                  <small className="text-dark">0</small>
                  <div className="ml-auto">100%</div>
                </div>
              </ListItem>
              <ListItem className="py-2 d-block">
                <div className="align-box-row py-1">
                  <div>
                    <div className="font-weight-bold">Sales</div>
                  </div>
                  <div className="ml-auto">
                    <div className="font-size-xl font-weight-bold text-danger">
                      <small>$</small>
                      2.3M
                    </div>
                  </div>
                </div>
                <LinearProgress
                  variant="determinate"
                  className="progress-animated-alt progress-bar-danger"
                  value={39}
                />
                <div className="align-box-row progress-bar--label mt-1 text-muted">
                  <small className="text-dark">0</small>
                  <div className="ml-auto">100%</div>
                </div>
              </ListItem>
            </List>
          </PerfectScrollbar>
        </div>
        <div className="card-footer bg-secondary p-3 text-center">
          <Button className="btn-second">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon
                icon={['far', 'question-circle']}
                className="font-size-lg"
              />
            </span>
            <span className="btn-wrapper--label">View details</span>
          </Button>
        </div>
      </Card>
    </>
  );
}
