import React from 'react';

import { Grid } from '@material-ui/core';

import illustration1 from '../../../assets/images/illustrations/pack1/analysis.svg';
import illustration2 from '../../../assets/images/illustrations/pack1/businessman.svg';
import illustration3 from '../../../assets/images/illustrations/pack1/handshake.svg';
import illustration4 from '../../../assets/images/illustrations/pack1/moving.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6-x2">
        <Grid container spacing={6}>
          <Grid item md={6} xl={3}>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="d-block card card-box-hover-rise text-left hover-scale-sm card-box">
              <img
                src={illustration1}
                style={{ height: 110 }}
                alt="..."
                className="mt-3"
              />
              <div className="px-4 pt-2 pb-4">
                <div className="font-size-lg font-weight-bold mb-2">
                  Analytics
                </div>
                <p className="mb-0 text-black-50">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
              </div>
            </a>
          </Grid>
          <Grid item md={6} xl={3}>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="d-block card card-box-hover-rise text-left hover-scale-sm card-box">
              <img
                src={illustration2}
                style={{ height: 110 }}
                alt="..."
                className="mt-3"
              />
              <div className="px-4 pt-2 pb-4">
                <div className="font-size-lg font-weight-bold mb-2">
                  Budgets
                </div>
                <p className="mb-0 text-black-50">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
              </div>
            </a>
          </Grid>
          <Grid item md={6} xl={3}>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="d-block card card-box-hover-rise text-left hover-scale-sm card-box">
              <img
                src={illustration3}
                style={{ height: 110 }}
                alt="..."
                className="mt-3"
              />
              <div className="px-4 pt-2 pb-4">
                <div className="font-size-lg font-weight-bold mb-2">
                  Profiles
                </div>
                <p className="mb-0 text-black-50">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
              </div>
            </a>
          </Grid>
          <Grid item md={6} xl={3}>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="d-block card card-box-hover-rise text-left hover-scale-sm card-box">
              <img
                src={illustration4}
                style={{ height: 110 }}
                alt="..."
                className="mt-3"
              />
              <div className="px-4 pt-2 pb-4">
                <div className="font-size-lg font-weight-bold mb-2">
                  Performance
                </div>
                <p className="mb-0 text-black-50">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
              </div>
            </a>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
