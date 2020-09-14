import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  Tooltip
} from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box">
        <div className="card-header bg-secondary">
          <div className="card-header--title">
            <h5 className="mb-0 py-2 font-weight-bold">Pricing Plans</h5>
          </div>
          <div className="card-header--actions">
            <Button
              size="small"
              className="btn-success py-1 px-3 text-uppercase font-size-xs">
              Add new
            </Button>
          </div>
        </div>
        <CardContent className="p-0">
          <List component="div" className="list-group-flush my-3">
            <ListItem className="list-group-item-action hover-show-hide-container d-flex justify-content-between align-items-center py-3 border-0">
              <div className="badge badge-success badge-circle mt-2 mr-2 align-self-start">
                Basic
              </div>
              <div className="font-weight-bold flex-grow-1">
                <div className="text-second font-size-lg">Basic</div>
                <span className="opacity-8">
                  <FontAwesomeIcon icon={['far', 'user']} className="mr-1" />
                  <b className="pr-1">3847</b>
                  subscribers
                </span>
              </div>
              <div className="text-right hover-hide-wrapper">
                <div className="font-weight-bold text-second">$176.00</div>
                <span className="opacity-7">per month</span>
              </div>
              <div className="text-right hover-show-wrapper">
                <Tooltip
                  title="View details"
                  classes={{ tooltip: 'tooltip-first' }}
                  arrow>
                  <Button className="bg-white border-dark text-first d-40 rounded-circle btn-icon btn-animated-icon p-0 ml-1">
                    <FontAwesomeIcon
                      icon={['far', 'user']}
                      className="font-size-md mx-auto"
                    />
                  </Button>
                </Tooltip>
                <Tooltip
                  title="Remove"
                  classes={{ tooltip: 'tooltip-danger' }}
                  arrow>
                  <Button className="bg-white border-dark text-danger d-40 rounded-circle btn-icon btn-animated-icon p-0 ml-1">
                    <FontAwesomeIcon
                      icon={['fas', 'times']}
                      className="font-size-md mx-auto"
                    />
                  </Button>
                </Tooltip>
              </div>
            </ListItem>
            <ListItem className="list-group-item-action hover-show-hide-container d-flex justify-content-between align-items-center py-3 border-0">
              <div className="badge badge-danger badge-circle mt-2 mr-2 align-self-start">
                Basic
              </div>
              <div className="font-weight-bold flex-grow-1">
                <div className="text-second font-size-lg">Premium</div>
                <span className="opacity-8">
                  <FontAwesomeIcon icon={['far', 'user']} className="mr-1" />
                  <b className="pr-1">346</b>
                  subscribers
                </span>
              </div>
              <div className="text-right hover-hide-wrapper">
                <div className="font-weight-bold text-second">$567.00</div>
                <span className="opacity-7">per month</span>
              </div>
              <div className="text-right hover-show-wrapper">
                <Tooltip
                  title="View Details"
                  classes={{ tooltip: 'tooltip-first' }}
                  arrow>
                  <Button className="bg-white border-dark text-first d-40 rounded-circle btn-icon btn-animated-icon p-0 ml-1">
                    <FontAwesomeIcon
                      icon={['far', 'user']}
                      className="font-size-md mx-auto"
                    />
                  </Button>
                </Tooltip>
                <Tooltip
                  title="Remove"
                  classes={{ tooltip: 'tooltip-danger' }}
                  arrow>
                  <Button className="bg-white border-dark text-danger d-40 rounded-circle btn-icon btn-animated-icon p-0 ml-1">
                    <FontAwesomeIcon
                      icon={['fas', 'times']}
                      className="font-size-md mx-auto"
                    />
                  </Button>
                </Tooltip>
              </div>
            </ListItem>
            <ListItem className="list-group-item-action hover-show-hide-container d-flex justify-content-between align-items-center py-3 border-0">
              <div className="badge badge-first badge-circle mt-2 mr-2 align-self-start">
                Basic
              </div>
              <div className="font-weight-bold flex-grow-1">
                <div className="text-second font-size-lg">Ultra</div>
                <span className="opacity-8">
                  <FontAwesomeIcon icon={['far', 'user']} className="mr-1" />
                  <b className="pr-1">1,659</b>
                  subscribers
                </span>
              </div>
              <div className="text-right hover-hide-wrapper">
                <div className="font-weight-bold text-second">$893.00</div>
                <span className="opacity-7">per month</span>
              </div>
              <div className="text-right hover-show-wrapper">
                <Tooltip
                  title="View Details"
                  classes={{ tooltip: 'tooltip-first' }}
                  arrow>
                  <Button className="bg-white border-dark text-first d-40 rounded-circle btn-icon btn-animated-icon p-0 ml-1">
                    <FontAwesomeIcon
                      icon={['far', 'user']}
                      className="font-size-md mx-auto"
                    />
                  </Button>
                </Tooltip>
                <Tooltip
                  title="Remove"
                  classes={{ tooltip: 'tooltip-danger' }}
                  arrow>
                  <Button className="bg-white border-dark text-danger d-40 rounded-circle btn-icon btn-animated-icon p-0 ml-1">
                    <FontAwesomeIcon
                      icon={['fas', 'times']}
                      className="font-size-md mx-auto"
                    />
                  </Button>
                </Tooltip>
              </div>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </>
  );
}
