import React from 'react';

import { Grid, Card, CardContent, Button } from '@material-ui/core';

import stock1 from '../../../assets/images/stock-photos/stock-1.jpg';
import stock2 from '../../../assets/images/stock-photos/stock-2.jpg';
import stock3 from '../../../assets/images/stock-photos/stock-3.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={4} lg={6}>
            <Card className="card-transparent overflow-visible">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card-img-wrapper rounded card-box-hover-rise-alt">
                <div className="card-badges card-badges-bottom">
                  <div className="badge badge-pill badge-warning">Warning</div>
                </div>
                <img src={stock1} className="card-img-top rounded" alt="..." />
              </a>
              <CardContent className="text-center">
                <h5 className="card-title px-2 font-weight-bold font-size-lg">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h5>
                <p className="card-text">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button
                  size="small"
                  variant="text"
                  className="btn-outline-first hover-scale-sm btn-pill mt-1">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={4} lg={6}>
            <Card className="card-transparent overflow-visible">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card-img-wrapper rounded card-box-hover-rise-alt">
                <div className="card-badges card-badges-bottom">
                  <div className="badge badge-pill badge-success mr-2">
                    Success
                  </div>
                  <div className="badge badge-pill badge-neutral-info text-info">
                    Info
                  </div>
                </div>
                <img src={stock2} className="card-img-top rounded" alt="..." />
              </a>
              <CardContent className="text-center">
                <h5 className="card-title px-2 font-weight-bold font-size-lg">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h5>
                <p className="card-text">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button
                  size="small"
                  variant="text"
                  className="btn-outline-first hover-scale-sm btn-pill mt-1">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={4} lg={12}>
            <Card className="card-transparent overflow-visible">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card-img-wrapper rounded card-box-hover-rise-alt">
                <div className="card-badges card-badges-bottom">
                  <div className="badge badge-danger">Danger</div>
                </div>
                <img src={stock3} className="card-img-top rounded" alt="..." />
              </a>
              <CardContent className="text-center">
                <h5 className="card-title px-2 font-weight-bold font-size-lg">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h5>
                <p className="card-text">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <Button
                  size="small"
                  variant="text"
                  className="btn-outline-first hover-scale-sm btn-pill mt-1">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
