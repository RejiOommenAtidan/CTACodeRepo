import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button, Tooltip } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <Grid container spacing={0}>
          <Grid item xl={6} className="pt-3">
            <div className="divider-v divider-v-md" />
            <Grid container spacing={0} className="mt-2">
              <Grid item sm={6}>
                <div className="text-center">
                  <div>
                    <FontAwesomeIcon
                      icon={['far', 'user']}
                      className="font-size-xxl text-success"
                    />
                  </div>
                  <div className="mt-2 line-height-sm">
                    <b className="font-size-lg">2,345</b>
                    <span className="text-black-50 d-block">users</span>
                  </div>
                </div>
              </Grid>
              <Grid item sm={6}>
                <div className="text-center">
                  <div>
                    <FontAwesomeIcon
                      icon={['far', 'chart-bar']}
                      className="font-size-xxl text-info"
                    />
                  </div>
                  <div className="mt-2 line-height-sm">
                    <b className="font-size-lg">$9,693</b>
                    <span className="text-black-50 d-block">revenue</span>
                  </div>
                </div>
              </Grid>
            </Grid>
            <div className="divider my-3" />
            <div className="text-center">
              <Tooltip title="Menu Example">
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="btn-primary m-3 p-0 d-inline-flex align-items-center justify-content-center text-center font-size-xxl d-70 rounded">
                  <FontAwesomeIcon
                    icon={['far', 'building']}
                    className="font-size-lg"
                  />
                </Button>
              </Tooltip>
              <Tooltip title="Menu Example">
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="btn-success m-3 p-0 d-inline-flex align-items-center justify-content-center text-center font-size-xxl d-70 rounded">
                  <FontAwesomeIcon
                    icon={['far', 'lightbulb']}
                    className="font-size-lg"
                  />
                </Button>
              </Tooltip>
              <Tooltip title="Menu Example">
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="btn-danger m-3 p-0 d-inline-flex align-items-center justify-content-center text-center font-size-xxl d-70 rounded">
                  <FontAwesomeIcon
                    icon={['far', 'object-group']}
                    className="font-size-lg"
                  />
                </Button>
              </Tooltip>
            </div>
          </Grid>
          <Grid item xl={6} className="pt-3">
            <Grid container spacing={0} className="mt-2">
              <Grid item sm={6}>
                <div className="text-center">
                  <div>
                    <FontAwesomeIcon
                      icon={['far', 'user']}
                      className="font-size-xxl text-success"
                    />
                  </div>
                  <div className="mt-2 line-height-sm">
                    <b className="font-size-lg">2,345</b>
                    <span className="text-black-50 d-block">users</span>
                  </div>
                </div>
              </Grid>
              <Grid item sm={6}>
                <div className="text-center">
                  <div>
                    <FontAwesomeIcon
                      icon={['far', 'chart-bar']}
                      className="font-size-xxl text-info"
                    />
                  </div>
                  <div className="mt-2 line-height-sm">
                    <b className="font-size-lg">$9,693</b>
                    <span className="text-black-50 d-block">revenue</span>
                  </div>
                </div>
              </Grid>
            </Grid>
            <div className="divider my-3" />
            <div className="text-center">
              <Button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="btn-primary m-3 border-0 p-0 shadow-sm bg-sunny-morning d-inline-block text-center text-white font-size-xxl d-70 rounded">
                <FontAwesomeIcon
                  icon={['far', 'comment-dots']}
                  className="font-size-lg"
                />
              </Button>
              <Button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="btn-primary m-3 border-0 p-0 shadow-sm bg-strong-bliss d-inline-block text-center text-white font-size-xxl d-70 rounded">
                <FontAwesomeIcon
                  icon={['far', 'question-circle']}
                  className="font-size-lg"
                />
              </Button>
              <Button
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="btn-primary m-3 border-0 p-0 shadow-sm bg-night-sky d-inline-block text-center text-white font-size-xxl d-70 rounded">
                <FontAwesomeIcon
                  icon={['far', 'lightbulb']}
                  className="font-size-lg"
                />
              </Button>
            </div>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
