import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import GaugeChart from 'react-gauge-chart';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={4}>
          <Card className="p-4 text-center">
            <div className="card-tr-actions">
              <div className="badge badge-neutral-success text-success">
                + 0.32%
              </div>
            </div>
            <div className="d-60 rounded-sm border-0 mb-4 mx-auto card-icon-wrapper bg-success text-white btn-icon text-center shadow-success">
              <FontAwesomeIcon
                icon={['far', 'bell']}
                className="font-size-xl"
              />
            </div>
            <div className="display-4 mt-2 text-second font-weight-bold">
              Hal9000
            </div>
            <div className="text-black-50 pt-2">
              This server has a <b className="text-success">regular</b> load at
              the moment.
            </div>
            <div className="py-4 my-2">
              <GaugeChart
                hideText
                id="chartsGauges2A"
                nrOfLevels={6}
                colors={['#1bc943', '#f4772e', '#f83245']}
                arcWidth={0.3}
                percent={0.27}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <Button
                size="small"
                variant="text"
                className="btn-outline-second btn-pill">
                Server Dashboard
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xl={4}>
          <Card className="p-4 text-center">
            <div className="card-tr-actions">
              <div className="badge badge-neutral-warning text-warning">
                + 57.32%
              </div>
            </div>
            <div className="d-60 rounded-sm border-0 mx-auto mb-4 card-icon-wrapper pulse-animation bg-danger text-white btn-icon text-center shadow-danger">
              <FontAwesomeIcon
                icon={['fas', 'exclamation']}
                className="font-size-xl"
              />
            </div>
            <div className="display-4 mt-2 text-second font-weight-bold">
              Optimus
            </div>
            <div className="text-black-50 pt-2">
              This server has a <b className="text-danger">high</b> load at the
              moment.
            </div>
            <div className="py-4 my-2">
              <GaugeChart
                hideText
                id="chartsGauges2B"
                nrOfLevels={6}
                colors={[
                  'rgba(248,50,69,0.1)',
                  'rgba(248,50,69,0.5)',
                  'rgba(248,50,69,0.99)'
                ]}
                arcWidth={0.3}
                percent={0.89}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <Button
                size="small"
                variant="text"
                className="btn-outline-second btn-pill">
                Server Dashboard
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xl={4}>
          <Card className="bg-deep-blue text-center p-4">
            <div className="card-tr-actions">
              <div className="badge badge-second text-white">+ 57.32%</div>
            </div>
            <div className="d-60 rounded-sm border-0 mx-auto mb-4 card-icon-wrapper bg-plum-plate text-white btn-icon text-center shadow-sm">
              <FontAwesomeIcon
                icon={['far', 'user']}
                className="font-size-xl"
              />
            </div>
            <div className="display-4 mt-2 text-second font-weight-bold">
              Kitt2
            </div>
            <div className="text-black-50 pt-2">
              This server has a <b className="text-white">low</b> load at the
              moment.
            </div>
            <div className="py-4 my-2">
              <GaugeChart
                hideText
                id="chartsGauges2C"
                nrOfLevels={6}
                colors={[
                  'rgba(255,255,255,0.2)',
                  'rgba(255,255,255,0.5)',
                  'rgba(255,255,255,0.8)'
                ]}
                arcWidth={0.3}
                percent={0.55}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <Button
                size="small"
                variant="text"
                className="btn-outline-second btn-pill">
                Server Dashboard
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
