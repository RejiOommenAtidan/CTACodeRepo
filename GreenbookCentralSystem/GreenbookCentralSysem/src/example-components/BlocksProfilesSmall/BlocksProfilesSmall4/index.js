import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, CardContent, Button } from '@material-ui/core';

import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

import stock2 from '../../../assets/images/stock-photos/stock-7.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item lg={6}>
          <Card>
            <div className="card-img-wrapper h-280px">
              <div className="card-badges">
                <div className="badge badge-pill badge-success mr-2">New</div>
                <div className="badge badge-pill badge-neutral-info text-info">
                  Update Available
                </div>
              </div>
              <img
                alt="..."
                className="card-img-top img-fit-container"
                src={stock2}
              />
            </div>
            <CardContent className="p-5 card-body-avatar">
              <div className="avatar-icon-wrapper shadow-sm-dark border-white rounded">
                <div className="avatar-icon rounded">
                  <img alt="..." src={avatar5} />
                </div>
              </div>
              <div className="pt-4">
                <h3 className="font-weight-bold font-size-xl my-3">
                  Bradleigh Whitmore
                </h3>
                <p className="font-size-lg text-black-50 mb-0">
                  Premium admin template powered by the most popular UI
                  components framework available for React: Material-UI.
                  Features hundreds of examples making web development fast and
                  easy. Start from one of the individual apps included or from
                  the general dashboard and build beautiful scalable
                  applications and presentation websites.
                </p>
              </div>
              <div className="pt-4">
                <Button className="btn-primary d-50 px-4 line-height-1 py-0 w-auto hover-scale-sm">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['far', 'comment-dots']} />
                  </span>
                  <span className="btn-wrapper--label">Send Message</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6}>
          <Card>
            <div className="card-img-wrapper card-box-hover-rise-alt-lg h-280px">
              <div className="card-badges">
                <div className="badge badge-pill badge-danger">
                  Profile Update
                </div>
              </div>
              <img
                alt="..."
                className="card-img-top img-fit-container"
                src={stock2}
              />
            </div>
            <CardContent className="p-5 card-body-avatar">
              <div className="avatar-icon-wrapper shadow-sm-dark border-white rounded-circle">
                <div className="avatar-icon rounded-circle">
                  <img alt="..." src={avatar7} />
                </div>
              </div>
              <div className="pt-4">
                <h3 className="font-weight-bold font-size-xl my-3">
                  Shelly Hays
                </h3>
                <p className="font-size-lg text-black-50 mb-0">
                  Premium admin template powered by the most popular UI
                  components framework available for React: Material-UI.
                  Features hundreds of examples making web development fast and
                  easy. Start from one of the individual apps included or from
                  the general dashboard and build beautiful scalable
                  applications and presentation websites.
                </p>
              </div>
              <div className="pt-4">
                <Button className="btn-primary d-50 px-4 line-height-1 py-0 w-auto hover-scale-sm">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['far', 'comment-dots']} />
                  </span>
                  <span className="btn-wrapper--label">Send Message</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
