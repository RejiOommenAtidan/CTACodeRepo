import React from 'react';

import { Grid } from '@material-ui/core';

import stock1 from '../../../assets/images/stock-photos/stock-6.jpg';
import stock2 from '../../../assets/images/stock-photos/stock-7.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={0}>
          <Grid item xl={6} className="overflow-hidden d-flex">
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="d-block w-100 hover-scale-rounded">
              <img src={stock1} className="img-fit-container" alt="..." />
            </a>
          </Grid>
          <Grid item xl={6} className="bg-white d-flex align-items-center">
            <div className="p-4 p-lg-5">
              <h1 className="display-4 font-weight-bold mb-4">
                Bamburgh React Admin Dashboard with Material-UI PRO
              </h1>
              <p className="font-size-xl text-black-50">
                Premium admin template powered by the most popular UI components
                framework available for React: Material-UI. Features hundreds of
                examples making web development fast and easy. Start from one of
                the individual apps included or from the general dashboard and
                build beautiful scalable applications and presentation websites.
              </p>
              <div className="d-flex text-black-50 font-size-lg align-items-center flex-wrap mt-4">
                <div className="pr-5">
                  <div className="display-4 font-weight-bold text-success pb-2">
                    +300
                  </div>
                  <div>components</div>
                </div>
                <div className="pr-5">
                  <div className="display-4 font-weight-bold text-success pb-2">
                    +10
                  </div>
                  <div>applications</div>
                </div>
                <div className="pr-5">
                  <div className="display-4 font-weight-bold text-success pb-2">
                    +90
                  </div>
                  <div>widgets</div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xl={6}
            className="bg-second d-flex align-items-center text-white">
            <div className="p-4 text-center p-lg-5">
              <h1 className="display-4 font-weight-bold mb-4">
                Bamburgh React Admin Dashboard with Material-UI PRO
              </h1>
              <p className="font-size-xl text-white-50">
                Premium admin template powered by the most popular UI components
                framework available for React: Material-UI. Features hundreds of
                examples making web development fast and easy. Start from one of
                the individual apps included or from the general dashboard and
                build beautiful scalable applications and presentation websites.
              </p>
              <div className="d-flex text-white-50 font-size-lg justify-content-center align-items-center flex-wrap mt-4">
                <div className="px-3 text-left">
                  <div className="display-4 font-weight-bold text-warning pb-2">
                    +300
                  </div>
                  <div>components</div>
                </div>
                <div className="px-3 text-left">
                  <div className="display-4 font-weight-bold text-warning pb-2">
                    +10
                  </div>
                  <div>applications</div>
                </div>
                <div className="px-3 text-left">
                  <div className="display-4 font-weight-bold text-warning pb-2">
                    +90
                  </div>
                  <div>widgets</div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xl={6} className="overflow-hidden d-flex">
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="d-block w-100 hover-scale-rounded">
              <img src={stock2} className="img-fit-container" alt="..." />
            </a>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
