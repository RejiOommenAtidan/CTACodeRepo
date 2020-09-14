import React from 'react';

import { Grid, Card } from '@material-ui/core';

import { CircularProgressbar } from 'react-circular-progressbar';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={3} md={6}>
            <Card className="text-center p-3">
              <div className="mx-auto pb-3 pt-2">
                <CircularProgressbar
                  value={39}
                  text={39 + '%'}
                  strokeWidth={8}
                  className="circular-progress-xl circular-progress-primary"
                />
              </div>
              <div className="text-black-50 mt-2">Project management</div>
            </Card>
          </Grid>
          <Grid item xl={3} md={6}>
            <Card className="text-center p-3">
              <div className="mx-auto pb-3 pt-2">
                <CircularProgressbar
                  value={81}
                  text={81 + '%'}
                  strokeWidth={8}
                  className="circular-progress-xl circular-progress-danger"
                />
              </div>
              <div className="text-black-50 mt-2">Recent messages</div>
            </Card>
          </Grid>
          <Grid item xl={3} md={6}>
            <Card className="bg-premium-dark text-center p-3">
              <div className="mx-auto pb-3 pt-2">
                <CircularProgressbar
                  value={44}
                  text={44 + '%'}
                  strokeWidth={8}
                  className="circular-progress-xl circular-progress-success"
                />
              </div>
              <div className="text-white-50 mt-2">Task manager</div>
            </Card>
          </Grid>
          <Grid item xl={3} md={6}>
            <Card className="bg-night-sky text-center p-3">
              <div className="mx-auto pb-3 pt-2">
                <CircularProgressbar
                  value={56}
                  text={56 + '%'}
                  strokeWidth={8}
                  className="circular-progress-xl circular-progress-warning"
                />
              </div>
              <div className="text-white-50 mt-2">Analytics statistics</div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
