import React from 'react';

import { Grid, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item lg={4}>
          <Card className="card-box bg-royal shadow-xxl text-center p-4 text-white">
            <span className="ribbon-vertical ribbon-vertical--success ribbon-vertical--left text-uppercase">
              <span>-30%</span>
            </span>
            <h5 className="display-5 font-weight-bold mb-4">
              Developer Subscription
            </h5>
            <div className="divider bg-white-10 mb-4" />
            <div>
              <div className="mb-2">
                <span className="display-2 font-weight-bold">$69</span>
                <span className="opacity-8">/ month</span>
              </div>
              <ul className="list-unstyled opacity-6 mb-4">
                <li>Commercial license included</li>
              </ul>
            </div>
            <div className="divider bg-white-10 mb-4" />
            <div className="mb-3 font-size-lg font-weight-bold">
              License active for next <b>65</b> days
            </div>
            <Button className="btn-success font-weight-bold shadow-sm-dark text-uppercase font-size-sm d-inline-block">
              Renew License
            </Button>
          </Card>
        </Grid>
        <Grid item lg={4}>
          <Card className="card-box bg-second shadow-xxl text-center p-4 text-white">
            <span className="ribbon-angle ribbon-angle--top-right ribbon-danger">
              <small>New</small>
            </span>
            <h5 className="display-5 font-weight-bold mb-4">
              Enterprise Subscription
            </h5>
            <div className="divider bg-white-10 mb-4" />
            <div>
              <div className="mb-2">
                <span className="display-2 font-weight-bold">$99</span>
                <span className="opacity-8">/ month</span>
              </div>
              <ul className="list-unstyled opacity-6 mb-4">
                <li>Commercial license included</li>
              </ul>
            </div>
            <div className="divider bg-white-10 mb-4" />
            <div className="mb-3 font-size-lg font-weight-bold">
              License active for next <b>65</b> days
            </div>
            <Button className="btn-danger font-weight-bold shadow-sm-dark text-uppercase font-size-sm d-inline-block">
              Renew License
            </Button>
          </Card>
        </Grid>
        <Grid item lg={4}>
          <Card className="card-box bg-deep-sky text-center p-4 text-white">
            <span className="ribbon-angle ribbon-angle--top-left ribbon-warning">
              <small>New</small>
            </span>
            <h5 className="display-5 font-weight-bold mb-4">
              Enterprise Subscription
            </h5>
            <div className="divider bg-white-10 mb-4" />
            <div>
              <div className="mb-2">
                <span className="display-2 font-weight-bold">$139</span>
                <span className="opacity-8">/ month</span>
              </div>
              <ul className="list-unstyled opacity-6 mb-4">
                <li>Commercial license included</li>
              </ul>
            </div>
            <div className="divider bg-white-10 mb-4" />
            <div className="mb-3 font-size-lg font-weight-bold">
              License active for next <b>65</b> days
            </div>
            <Button className="btn-warning font-weight-bold shadow-sm-dark text-uppercase font-size-sm d-inline-block">
              Renew License
            </Button>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
