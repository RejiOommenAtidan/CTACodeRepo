import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardContent, Button, List, ListItem } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box">
        <div className="card-header bg-secondary">
          <div className="card-header--title">
            <h5 className="mb-0 py-2 font-weight-bold">Latest actions</h5>
          </div>
          <div className="card-header--actions">
            <Button className="btn-primary" size="small">
              <span className="btn-wrapper--label">Export</span>
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon
                  icon={['fas', 'chevron-down']}
                  className="opacity-8 font-size-xs"
                />
              </span>
            </Button>
          </div>
        </div>
        <CardContent className="p-0">
          <List component="div" className="list-group-flush mb-2">
            <ListItem className="py-3 border-0">
              <div className="align-box-row w-100">
                <div className="mr-3">
                  <div className="bg-neutral-dark text-primary text-center font-size-xl d-60 rounded-sm">
                    <FontAwesomeIcon icon={['far', 'bell']} />
                  </div>
                </div>
                <div>
                  <div className="font-weight-bold d-block opacity-8">
                    Customers
                  </div>
                  <div className="text-dark opacity-5">
                    On the other hand, we denounce with righteous indignation.
                  </div>
                </div>
              </div>
            </ListItem>
            <div className="divider" />
            <ListItem className="py-3 border-0">
              <div className="align-box-row w-100">
                <div className="mr-3">
                  <div className="bg-neutral-dark text-primary text-center font-size-xl d-60 rounded-sm">
                    <FontAwesomeIcon icon={['far', 'object-group']} />
                  </div>
                </div>
                <div>
                  <div className="font-weight-bold d-block opacity-8">
                    New articles
                  </div>
                  <div className="text-dark opacity-5">
                    Dislike men who are so beguiled and demoralized by the
                    charms.
                  </div>
                </div>
              </div>
            </ListItem>
            <div className="divider" />
            <ListItem className="py-3 border-0">
              <div className="align-box-row w-100">
                <div className="mr-3">
                  <div className="bg-neutral-dark text-primary text-center font-size-xl d-60 rounded-sm">
                    <FontAwesomeIcon icon={['far', 'chart-bar']} />
                  </div>
                </div>
                <div>
                  <div className="font-weight-bold d-block opacity-8">
                    Blog posts
                  </div>
                  <div className="text-dark opacity-5">
                    Pleasure of the moment, so blinded by desire, that they
                    foresee.
                  </div>
                </div>
              </div>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </>
  );
}
