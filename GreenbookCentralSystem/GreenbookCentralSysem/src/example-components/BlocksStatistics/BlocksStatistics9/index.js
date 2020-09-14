import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={6} xl={3}>
          <Card className="card-box p-4">
            <div className="font-weight-bold font-size-sm text-uppercase text-second mt-2">
              Positive Reviews
            </div>
            <div className="d-flex py-4 align-items-center">
              <div className="d-60 rounded border-0 card-icon-wrapper flex-shrink-0 bg-first text-white btn-icon text-center shadow-first mr-3">
                <FontAwesomeIcon
                  icon={['far', 'comment-dots']}
                  className="display-4"
                />
              </div>
              <div className="display-3 font-weight-bold ml-1">0.16%</div>
            </div>
            <div className="text-black-50 font-weight-bold mb-2">
              <a
                className="text-first"
                href="#/"
                onClick={(e) => e.preventDefault()}>
                See reviews
              </a>{' '}
              that were left by past customers from USA.
            </div>
          </Card>
        </Grid>
        <Grid item md={6} xl={3}>
          <Card className="card-box p-4">
            <div className="font-weight-bold font-size-sm text-uppercase text-second mt-2">
              Bounce Rate
            </div>
            <div className="d-flex py-4 align-items-center">
              <div className="d-60 rounded border-0 card-icon-wrapper flex-shrink-0 bg-warning text-white btn-icon text-center shadow-warning mr-3">
                <FontAwesomeIcon
                  icon={['fas', 'map-marked-alt']}
                  className="display-4"
                />
              </div>
              <div className="display-3 font-weight-bold ml-1">12.87%</div>
            </div>
            <div className="text-black-50 font-weight-bold mb-2">
              <a
                className="text-first"
                href="#/"
                onClick={(e) => e.preventDefault()}>
                See visits
              </a>{' '}
              that had a higher than expected bounce rate.
            </div>
          </Card>
        </Grid>
        <Grid item md={6} xl={3}>
          <Card className="card-box p-4">
            <div className="font-weight-bold font-size-sm text-uppercase text-second mt-2">
              Active Referrals
            </div>
            <div className="d-flex py-4 align-items-center">
              <div className="d-60 rounded border-0 card-icon-wrapper flex-shrink-0 bg-danger text-white btn-icon text-center shadow-danger mr-3">
                <FontAwesomeIcon
                  icon={['far', 'envelope']}
                  className="display-4"
                />
              </div>
              <div className="display-3 font-weight-bold ml-1">175</div>
            </div>
            <div className="text-black-50 font-weight-bold mb-2">
              <a
                className="text-first"
                href="#/"
                onClick={(e) => e.preventDefault()}>
                See referring
              </a>{' '}
              domains that sent most visits last month.
            </div>
          </Card>
        </Grid>
        <Grid item md={6} xl={3}>
          <Card className="card-box p-4">
            <div className="font-weight-bold font-size-sm text-uppercase text-second mt-2">
              Opened Invites
            </div>
            <div className="d-flex py-4 align-items-center">
              <div className="d-60 rounded border-0 card-icon-wrapper flex-shrink-0 bg-success text-white btn-icon text-center shadow-success mr-3">
                <FontAwesomeIcon
                  icon={['fas', 'tachometer-alt']}
                  className="display-4"
                />
              </div>
              <div className="display-3 font-weight-bold ml-1">64.39%</div>
            </div>
            <div className="text-black-50 font-weight-bold mb-2">
              <a
                className="text-first"
                href="#/"
                onClick={(e) => e.preventDefault()}>
                See clients
              </a>{' '}
              that accepted your invitation to connect.
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
