import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, CardContent } from '@material-ui/core';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';

import stock4 from '../../../assets/images/stock-photos/stock-4.jpg';
import stock5 from '../../../assets/images/stock-photos/stock-5.jpg';
import stock6 from '../../../assets/images/stock-photos/stock-6.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={4} lg={6}>
            <a
              className="card card-box-hover-rise bg-white"
              href="#/"
              onClick={(e) => e.preventDefault()}>
              <div className="card-badges">
                <div className="badge badge-pill badge-warning">Warning</div>
              </div>
              <img alt="..." className="card-img-top" src={stock4} />
              <CardContent className="card-body-avatar px-4 pb-4">
                <div className="avatar-icon-wrapper rounded-pill border-white border-3 avatar-icon-wrapper--sm">
                  <div className="avatar-icon rounded-pill">
                    <img alt="..." src={avatar2} />
                  </div>
                </div>
                <h5 className="card-title font-weight-bold font-size-xl">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h5>
                <p className="card-text">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <div className="card-date text-black-50 mt-2">
                  <FontAwesomeIcon icon={['far', 'clock']} className="mr-1" />
                  <small>added moments ago</small>
                </div>
              </CardContent>
            </a>
          </Grid>
          <Grid item xl={4} lg={6}>
            <a
              className="card card-box-hover-rise bg-white"
              href="#/"
              onClick={(e) => e.preventDefault()}>
              <div className="card-badges">
                <div className="badge badge-pill badge-success mr-2">
                  Success
                </div>
                <div className="badge badge-pill badge-neutral-info text-info">
                  Info
                </div>
              </div>
              <img alt="..." className="card-img-top" src={stock5} />
              <CardContent className="card-body-avatar px-4 pb-4">
                <div className="avatar-icon-wrapper rounded-pill border-white border-3 avatar-icon-wrapper--sm">
                  <div className="avatar-icon rounded-pill">
                    <img alt="..." src={avatar1} />
                  </div>
                </div>
                <h5 className="card-title font-weight-bold font-size-xl">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h5>
                <p className="card-text">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <div className="card-date text-black-50 mt-2">
                  <FontAwesomeIcon icon={['far', 'clock']} className="mr-1" />
                  <small>added moments ago</small>
                </div>
              </CardContent>
            </a>
          </Grid>
          <Grid item xl={4} lg={12}>
            <a
              className="card card-box-hover-rise bg-white"
              href="#/"
              onClick={(e) => e.preventDefault()}>
              <div className="card-badges">
                <div className="badge badge-danger">Danger</div>
              </div>
              <img alt="..." className="card-img-top" src={stock6} />
              <CardContent className="card-body-avatar px-4 pb-4">
                <div className="avatar-icon-wrapper rounded-pill border-white border-3 avatar-icon-wrapper--sm">
                  <div className="avatar-icon rounded-pill">
                    <img alt="..." src={avatar3} />
                  </div>
                </div>
                <h5 className="card-title font-weight-bold font-size-xl">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h5>
                <p className="card-text">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <div className="card-date text-black-50 mt-2">
                  <FontAwesomeIcon icon={['far', 'clock']} className="mr-1" />
                  <small>added moments ago</small>
                </div>
              </CardContent>
            </a>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
