import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, CardContent } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="bg-plum-plate p-5 rounded">
        <Grid container spacing={6}>
          <Grid item xl={3} md={6}>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="card bg-white card-box card-box-border-bottom border-success card-box-hover-rise-alt">
              <CardContent>
                <div className="align-box-row">
                  <div className="text-left">
                    <div className="mt-1">
                      <FontAwesomeIcon
                        icon={['far', 'user']}
                        className="font-size-xxl text-success"
                      />
                    </div>
                    <div className="mt-2 line-height-sm">
                      <b className="font-size-lg text-black pr-1">2,345</b>
                      <span className="text-black-50">users</span>
                    </div>
                  </div>
                  <div className="ml-auto card-hover-indicator">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xl"
                    />
                  </div>
                </div>
              </CardContent>
            </a>
          </Grid>
          <Grid item xl={3} md={6}>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="card bg-white card-box card-box-border-bottom border-danger card-box-hover-rise-alt">
              <CardContent>
                <div className="align-box-row">
                  <div className="text-left">
                    <div className="mt-1">
                      <FontAwesomeIcon
                        icon={['far', 'keyboard']}
                        className="font-size-xxl text-danger"
                      />
                    </div>
                    <div className="mt-2 line-height-sm">
                      <b className="font-size-lg text-black pr-1">3,568</b>
                      <span className="text-black-50">clicks</span>
                    </div>
                  </div>
                  <div className="ml-auto card-hover-indicator">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xl"
                    />
                  </div>
                </div>
              </CardContent>
            </a>
          </Grid>
          <Grid item xl={3} md={6}>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="card bg-white card-box card-box-border-bottom border-warning card-box-hover-rise-alt">
              <CardContent>
                <div className="align-box-row">
                  <div className="text-left">
                    <div className="mt-1">
                      <FontAwesomeIcon
                        icon={['far', 'chart-bar']}
                        className="font-size-xxl text-warning"
                      />
                    </div>
                    <div className="mt-2 line-height-sm">
                      <b className="font-size-lg text-black pr-1">$9,693</b>
                      <span className="text-black-50">revenue</span>
                    </div>
                  </div>
                  <div className="ml-auto card-hover-indicator">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xl"
                    />
                  </div>
                </div>
              </CardContent>
            </a>
          </Grid>
          <Grid item xl={3} md={6}>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="card bg-white card-box card-box-border-bottom border-info card-box-hover-rise-alt">
              <CardContent>
                <div className="align-box-row">
                  <div className="text-left">
                    <div className="mt-1">
                      <FontAwesomeIcon
                        icon={['far', 'building']}
                        className="font-size-xxl text-info"
                      />
                    </div>
                    <div className="mt-2 line-height-sm">
                      <b className="font-size-lg text-black pr-1">431</b>
                      <span className="text-black-50">sales</span>
                    </div>
                  </div>
                  <div className="ml-auto card-hover-indicator">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xl"
                    />
                  </div>
                </div>
              </CardContent>
            </a>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
