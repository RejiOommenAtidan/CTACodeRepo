import React from 'react';

import { Grid, Card, CardContent } from '@material-ui/core';

import stock1 from '../../../assets/images/stock-photos/stock-5.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="p-5 mb-spacing-6-x2">
        <Grid container spacing={0} className="align-items-center">
          <Grid item xl={6}>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="d-flex h-280px rounded card-box-hover-rise">
              <img
                src={stock1}
                alt="Bamburgh React Admin Dashboard with Material-UI PRO"
                className="img-fit-container rounded"
              />
            </a>
          </Grid>
          <Grid item xl={6}>
            <CardContent className="px-0 px-xl-4 pt-4 pb-xl-4">
              <a href="#/" onClick={(e) => e.preventDefault()}>
                <h2 className="font-weight-bold mb-4">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h2>
              </a>
              <p className="text-black-50 font-size-lg">
                Premium admin template powered by the most popular UI components
                framework available for React: Material-UI. Features hundreds of
                examples making web development fast and easy. Start from one of
                the individual apps included or from the general dashboard and
                build beautiful scalable applications and presentation websites.
              </p>
              <div className="d-flex mt-4 justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="avatar-icon-wrapper d-30 mr-2">
                    <div className="badge badge-danger badge-circle">
                      Offline
                    </div>
                    <div className="avatar-icon d-30 rounded-circle">
                      <img alt="..." src={avatar7} />
                    </div>
                  </div>
                  <div>Emma Taylor</div>
                </div>
                <div className="text-black-50 opacity-7">16 July, 2020</div>
              </div>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
