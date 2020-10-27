import React from 'react';

import { Grid, LinearProgress, Card } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item md={6} xl={3}>
            <Card className="p-3">
              <div className="align-box-row">
                <div className="text-first font-size-xl font-weight-bold pr-2">
                  55%
                </div>
                <div className="flex-grow-1">
                  <LinearProgress
                    variant="determinate"
                    className="progress-animated-alt progress-bar-rounded progress-sm progress-bar-first"
                    value={55}
                  />
                </div>
              </div>
              <div className="text-black-50 pt-2">Expenses target</div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="p-3">
              <div className="align-box-row">
                <div className="text-success font-size-xl font-weight-bold pr-2">
                  76%
                </div>
                <div className="flex-grow-1">
                  <LinearProgress
                    variant="determinate"
                    className="progress-animated-alt progress-bar-rounded progress-sm progress-bar-success"
                    value={76}
                  />
                </div>
              </div>
              <div className="text-black-50 pt-2">Sales target</div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="p-3 bg-asteroid">
              <div className="align-box-row">
                <div className="text-danger font-size-xl font-weight-bold pr-2">
                  61%
                </div>
                <div className="flex-grow-1">
                  <LinearProgress
                    variant="determinate"
                    className="progress-animated-alt progress-bar-rounded bg-white-50 progress-sm progress-bar-danger"
                    value={61}
                  />
                </div>
              </div>
              <div className="text-white-50 pt-2">Income target</div>
            </Card>
          </Grid>
          <Grid item md={6} xl={3}>
            <Card className="p-3 bg-midnight-bloom">
              <div className="align-box-row">
                <div className="text-warning font-size-xl font-weight-bold pr-2">
                  83%
                </div>
                <div className="flex-grow-1">
                  <LinearProgress
                    variant="determinate"
                    className="progress-animated-alt progress-bar-rounded bg-white-50 progress-sm progress-bar-warning"
                    value={83}
                  />
                </div>
              </div>
              <div className="text-white-50 pt-2">Spendings target</div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
