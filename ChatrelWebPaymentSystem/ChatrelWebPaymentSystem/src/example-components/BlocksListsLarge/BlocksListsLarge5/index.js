import React from 'react';

import { Card, Button, List, ListItem } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';

import stock1 from '../../../assets/images/stock-photos/stock-1.jpg';
import stock2 from '../../../assets/images/stock-photos/stock-2.jpg';
import stock3 from '../../../assets/images/stock-photos/stock-3.jpg';
import stock4 from '../../../assets/images/stock-photos/stock-4.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box">
        <div className="card-header bg-white">
          <div className="card-header--title">
            <small className="d-block text-uppercase mt-1">Targets</small>
            <b>Monthly Stats</b>
          </div>
          <div className="card-header--actions">
            <Button
              selected
              component="a"
              href="#/"
              onClick={(e) => e.preventDefault()}
              size="small"
              className="btn-neutral-primary">
              See all
            </Button>
          </div>
        </div>
        <div className="scroll-area-lg shadow-overflow">
          <PerfectScrollbar options={{ wheelPropagation: false }}>
            <List component="div" className="list-group-flush">
              <ListItem className="py-4 d-block">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <div>
                      <Card className="card-transparent mb-3 mb-sm-0">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="card-img-wrapper card-box-hover-rise rounded-sm">
                          <img
                            alt="..."
                            className="card-img-top rounded-sm"
                            src={stock1}
                            style={{ width: 140 }}
                          />
                        </a>
                      </Card>
                    </div>
                    <div className="pl-0 pl-sm-4">
                      <b className="font-weight-bold font-size-lg text-black">
                        Bamburgh React Admin Dashboard with Material-UI PRO
                      </b>
                      <p className="text-black-50 mb-0">
                        View any of the 5+ live previews we&#39;ve set up to
                        learn why this dashboard template is the last one
                        you&#39;ll ever need!
                      </p>
                      <small className="text-black-50 pt-1 d-block">
                        Created on: <b className="text-first">23 Feb 2021</b>
                      </small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="text-right pl-3">
                      <span className="font-weight-bold font-size-lg">
                        12,349
                      </span>
                      <span className="text-black-50 d-block">visits</span>
                    </div>
                  </div>
                </div>
              </ListItem>
              <ListItem className="py-4 d-block">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <div>
                      <Card className="card-transparent mb-3 mb-sm-0">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="card-img-wrapper card-box-hover-rise rounded-sm">
                          <img
                            alt="..."
                            className="card-img-top rounded-sm"
                            src={stock2}
                            style={{ width: 140 }}
                          />
                        </a>
                      </Card>
                    </div>
                    <div className="pl-0 pl-sm-4">
                      <b className="font-weight-bold font-size-lg text-black">
                        Bamburgh React Admin Dashboard with Material-UI PRO
                      </b>
                      <p className="text-black-50 mb-0">
                        View any of the 5+ live previews we&#39;ve set up to
                        learn why this dashboard template is the last one
                        you&#39;ll ever need!
                      </p>
                      <small className="text-black-50 pt-1 d-block">
                        Created on: <b className="text-first">24 Feb 2021</b>
                      </small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="text-right pr-3 pl-3">
                      <span className="font-weight-bold font-size-lg text-danger">
                        345
                      </span>
                      <span className="text-black-50 d-block">reports</span>
                    </div>
                  </div>
                </div>
              </ListItem>
              <ListItem className="py-4 d-block">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <div>
                      <Card className="card-transparent mb-3 mb-sm-0">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="card-img-wrapper card-box-hover-rise rounded-sm">
                          <img
                            alt="..."
                            className="card-img-top rounded-sm"
                            src={stock3}
                            style={{ width: 140 }}
                          />
                        </a>
                      </Card>
                    </div>
                    <div className="pl-0 pl-sm-4">
                      <b className="font-weight-bold font-size-lg text-black">
                        Bamburgh React Admin Dashboard with Material-UI PRO
                      </b>
                      <p className="text-black-50 mb-0">
                        View any of the 5+ live previews we&#39;ve set up to
                        learn why this dashboard template is the last one
                        you&#39;ll ever need!
                      </p>
                      <small className="text-black-50 pt-1 d-block">
                        Created on: <b className="text-first">23 Feb 2021</b>
                      </small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="text-right pl-3">
                      <span className="font-weight-bold font-size-lg">
                        12,349
                      </span>
                      <span className="text-black-50 d-block">visits</span>
                    </div>
                  </div>
                </div>
              </ListItem>
              <ListItem className="py-4 d-block">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <div>
                      <Card className="card-transparent mb-3 mb-sm-0">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="card-img-wrapper card-box-hover-rise rounded-sm">
                          <img
                            alt="..."
                            className="card-img-top rounded-sm"
                            src={stock4}
                            style={{ width: 140 }}
                          />
                        </a>
                      </Card>
                    </div>
                    <div className="pl-0 pl-sm-4">
                      <b className="font-weight-bold font-size-lg text-black">
                        Bamburgh React Admin Dashboard with Material-UI PRO
                      </b>
                      <p className="text-black-50 mb-0">
                        View any of the 5+ live previews we&#39;ve set up to
                        learn why this dashboard template is the last one
                        you&#39;ll ever need!
                      </p>
                      <small className="text-black-50 pt-1 d-block">
                        Created on: <b className="text-first">24 Feb 2021</b>
                      </small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="text-right pr-3 pl-3">
                      <span className="font-weight-bold font-size-lg text-danger">
                        345
                      </span>
                      <span className="text-black-50 d-block">reports</span>
                    </div>
                  </div>
                </div>
              </ListItem>
            </List>
          </PerfectScrollbar>
        </div>
        <div className="card-footer p-3 border-0 d-flex justify-content-between">
          <Button size="small" className="btn-neutral-danger">
            <span>Delete</span>
          </Button>
          <Button size="small" className="btn-first">
            View details
          </Button>
        </div>
      </Card>
    </>
  );
}
