import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Button, List, ListItem } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="shadow-xxl">
        <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-4">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-1 text-black">
              Navigation Pills
            </h6>
            <p className="text-black-50 mb-0">
              This is yet another example for navigation
            </p>
          </div>
          <Button size="small" color="primary" variant="contained">
            View all
          </Button>
        </div>
        <div className="divider" />
        <div className="divider" />
        <div className="scroll-area shadow-overflow">
          <PerfectScrollbar>
            <List component="div" className="list-group-flush">
              <ListItem className="py-4 d-block">
                <div className="d-flex align-items-center flex-column flex-sm-row">
                  <div>
                    <div className="bg-premium-dark text-center text-white font-size-xl btn-icon d-50 rounded-circle mb-3 mb-sm-0">
                      <FontAwesomeIcon icon={['far', 'lightbulb']} />
                    </div>
                  </div>
                  <div className="pl-0 pl-sm-3">
                    <div className="d-block text-center d-sm-flex align-items-center">
                      <span className="font-size-lg">Business</span>
                      <div className="badge badge-neutral-info text-info ml-2">
                        New
                      </div>
                    </div>
                    <p className="text-black-50 mb-0">
                      Grow familiar with the countless...
                    </p>
                  </div>
                  <div className="mt-3 mt-sm-0 ml-sm-auto">
                    <Button
                      size="small"
                      variant="text"
                      className="btn-outline-second btn-animated-icon d-40 btn-pill p-0 btn-icon">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['far', 'comment-dots']} />
                      </span>
                    </Button>
                  </div>
                </div>
              </ListItem>
              <ListItem className="py-4 d-block">
                <div className="d-flex align-items-center flex-column flex-sm-row">
                  <div>
                    <div className="bg-warning text-center text-white font-size-xl btn-icon d-50 rounded-circle mb-3 mb-sm-0">
                      <FontAwesomeIcon icon={['far', 'eye']} />
                    </div>
                  </div>
                  <div className="pl-0 pl-sm-3">
                    <div className="d-block text-center d-sm-flex align-items-center">
                      <span className="font-size-lg">Images</span>
                    </div>
                    <p className="text-black-50 mb-0">
                      Absorbed in the exquisite sense...
                    </p>
                  </div>
                  <div className="mt-3 mt-sm-0 ml-sm-auto">
                    <Button
                      size="small"
                      variant="text"
                      className="btn-animated-icon d-40 btn-pill p-0 btn-icon btn-outline-warning">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['far', 'object-group']} />
                      </span>
                    </Button>
                  </div>
                </div>
              </ListItem>
              <ListItem className="py-4 d-block">
                <div className="d-flex align-items-center flex-column flex-sm-row">
                  <div>
                    <div className="bg-white border-primary border-2 text-center text-primary font-size-xl d-50 rounded-circle mb-3 mb-sm-0">
                      <FontAwesomeIcon icon={['fas', 'lemon']} />
                    </div>
                  </div>
                  <div className="pl-0 pl-sm-3">
                    <div className="d-block text-center d-sm-flex align-items-center">
                      <span className="font-size-lg">Finance</span>
                    </div>
                    <p className="text-black-50 mb-0">
                      A wonderful serenity has taken ...
                    </p>
                  </div>
                  <div className="mt-3 mt-sm-0 ml-sm-auto">
                    <Button
                      size="small"
                      variant="text"
                      className="btn-animated-icon d-40 btn-pill p-0 btn-icon btn-first">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fas', 'lemon']} />
                      </span>
                    </Button>
                  </div>
                </div>
              </ListItem>
              <ListItem className="py-4 d-block">
                <div className="d-flex align-items-center flex-column flex-sm-row">
                  <div>
                    <div className="bg-premium-dark text-center text-white font-size-xl btn-icon d-50 rounded-circle mb-3 mb-sm-0">
                      <FontAwesomeIcon icon={['far', 'lightbulb']} />
                    </div>
                  </div>
                  <div className="pl-0 pl-sm-3">
                    <div className="d-block text-center d-sm-flex align-items-center">
                      <span className="font-size-lg">Business</span>
                      <div className="badge badge-neutral-info text-info ml-2">
                        New
                      </div>
                    </div>
                    <p className="text-black-50 mb-0">
                      Grow familiar with the countless...
                    </p>
                  </div>
                  <div className="mt-3 mt-sm-0 ml-sm-auto">
                    <Button
                      size="small"
                      variant="text"
                      className="btn-outline-second btn-animated-icon d-40 btn-pill p-0 btn-icon">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['far', 'comment-dots']} />
                      </span>
                    </Button>
                  </div>
                </div>
              </ListItem>
              <ListItem className="py-4 d-block">
                <div className="d-flex align-items-center flex-column flex-sm-row">
                  <div>
                    <div className="bg-warning text-center text-white font-size-xl btn-icon d-50 rounded-circle mb-3 mb-sm-0">
                      <FontAwesomeIcon icon={['far', 'eye']} />
                    </div>
                  </div>
                  <div className="pl-0 pl-sm-3">
                    <div className="d-block text-center d-sm-flex align-items-center">
                      <span className="font-size-lg">Images</span>
                    </div>
                    <p className="text-black-50 mb-0">
                      Absorbed in the exquisite sense...
                    </p>
                  </div>
                  <div className="mt-3 mt-sm-0 ml-sm-auto">
                    <Button
                      size="small"
                      variant="text"
                      className="btn-animated-icon d-40 btn-pill p-0 btn-icon btn-outline-warning">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['far', 'object-group']} />
                      </span>
                    </Button>
                  </div>
                </div>
              </ListItem>
            </List>
          </PerfectScrollbar>
        </div>
        <div className="card-footer p-3 text-center">
          <Button size="small" className="py-2 px-4 btn-primary">
            <span className="btn-wrapper--label text-uppercase font-weight-bold">
              View more items
            </span>
          </Button>
        </div>
      </Card>
    </>
  );
}
