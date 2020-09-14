import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, IconButton, Card, Tooltip } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <Card className="card-box py-3">
            <div className="d-flex align-items-center justify-content-center flex-wrap">
              <Tooltip arrow title="Menu Item Example">
                <IconButton className="btn-primary btn-icon m-2 p-0 border-0 bg-love-kiss d-inline-flex align-items-center justify-content-center text-center d-50 rounded-circle card-box-hover-rise-alt">
                  <FontAwesomeIcon
                    icon={['far', 'question-circle']}
                    className="font-size-xl text-white"
                  />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Menu Item Example">
                <IconButton className="btn-primary btn-icon m-2 p-0 border-0 bg-ripe-malin d-inline-flex align-items-center justify-content-center text-center d-50 rounded-circle card-box-hover-rise-alt">
                  <FontAwesomeIcon
                    icon={['far', 'building']}
                    className="font-size-xl text-white"
                  />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Menu Item Example">
                <IconButton className="btn-primary btn-icon m-2 p-0 border-0 bg-grow-early d-inline-flex align-items-center justify-content-center text-center d-50 rounded-circle card-box-hover-rise-alt">
                  <FontAwesomeIcon
                    icon={['far', 'bell']}
                    className="font-size-xl text-white"
                  />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Menu Item Example">
                <IconButton className="btn-primary btn-icon m-2 p-0 border-0 bg-arielle-smile d-inline-flex align-items-center justify-content-center text-center d-50 rounded-circle card-box-hover-rise-alt">
                  <FontAwesomeIcon
                    icon={['far', 'file-excel']}
                    className="font-size-xl text-white"
                  />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Menu Item Example">
                <IconButton className="btn-primary btn-icon m-2 p-0 border-0 bg-night-fade d-inline-flex align-items-center justify-content-center text-center d-50 rounded-circle card-box-hover-rise-alt">
                  <FontAwesomeIcon
                    icon={['far', 'eye']}
                    className="font-size-xl text-white"
                  />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Menu Item Example">
                <IconButton className="btn-primary btn-icon m-2 p-0 border-0 bg-strong-bliss d-inline-flex align-items-center justify-content-center text-center d-50 rounded-circle card-box-hover-rise-alt">
                  <FontAwesomeIcon
                    icon={['far', 'chart-bar']}
                    className="font-size-xl text-white"
                  />
                </IconButton>
              </Tooltip>
            </div>
            <div className="divider my-3" />
            <div className="d-flex align-items-center justify-content-center flex-wrap">
              <IconButton className="btn-primary btn-icon m-2 p-0 border-0 bg-primary d-inline-flex align-items-center justify-content-center text-center d-70 rounded btn-animated-icon">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['far', 'bell']}
                    className="font-size-xxl text-white"
                  />
                </span>
              </IconButton>
              <IconButton className="btn-primary btn-icon m-2 p-0 border-0 bg-success d-inline-flex align-items-center justify-content-center text-center d-70 rounded btn-animated-icon">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['far', 'file-excel']}
                    className="font-size-xxl text-white"
                  />
                </span>
              </IconButton>
              <IconButton className="btn-primary btn-icon m-2 p-0 border-0 bg-warning d-inline-flex align-items-center justify-content-center text-center d-70 rounded btn-animated-icon">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['far', 'eye']}
                    className="font-size-xxl text-white"
                  />
                </span>
              </IconButton>
            </div>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card className="bg-premium-dark card-box py-3">
            <div className="d-flex align-items-center justify-content-center flex-wrap">
              <IconButton className="btn-primary p-0 btn-icon bg-ripe-malin d-inline-block text-center text-white font-size-xl d-50 rounded border-0 m-2 card-box-hover-rise-alt">
                <FontAwesomeIcon
                  icon={['far', 'gem']}
                  className="font-size-xl"
                />
              </IconButton>
              <IconButton className="btn-primary p-0 btn-icon bg-grow-early d-inline-block text-center text-white font-size-xl d-50 rounded border-0 m-2 card-box-hover-rise-alt">
                <FontAwesomeIcon
                  icon={['far', 'building']}
                  className="font-size-xl"
                />
              </IconButton>
              <IconButton className="btn-primary p-0 btn-icon bg-arielle-smile d-inline-block text-center text-white font-size-xl d-50 rounded border-0 m-2 card-box-hover-rise-alt">
                <FontAwesomeIcon
                  icon={['far', 'chart-bar']}
                  className="font-size-xl"
                />
              </IconButton>
            </div>
            <div className="divider my-3 bg-white opacity-2" />
            <div className="d-flex align-items-center justify-content-center flex-wrap">
              <IconButton className="btn-primary p-0 btn-icon bg-arielle-smile d-inline-block text-center text-white font-size-xl d-70 rounded border-0 m-2 btn-animated-icon">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['far', 'gem']}
                    className="font-size-xxl"
                  />
                </span>
              </IconButton>
              <IconButton className="btn-primary p-0 btn-icon bg-warm-flame d-inline-block text-center text-white font-size-xl d-70 rounded border-0 m-2 btn-animated-icon">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['far', 'building']}
                    className="font-size-xxl"
                  />
                </span>
              </IconButton>
              <IconButton className="btn-primary p-0 btn-icon bg-sunny-morning d-inline-block text-center text-white font-size-xl d-70 rounded border-0 m-2 btn-animated-icon">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['far', 'chart-bar']}
                    className="font-size-xxl"
                  />
                </span>
              </IconButton>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
