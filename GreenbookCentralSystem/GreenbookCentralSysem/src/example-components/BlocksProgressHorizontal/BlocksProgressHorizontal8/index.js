import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, LinearProgress, Card, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={4}>
          <Card className="p-4">
            <div className="d-flex justify-content-between">
              <div className="d-60 rounded-sm border-0 mb-4 card-icon-wrapper bg-warning text-white btn-icon text-center shadow-warning">
                <FontAwesomeIcon
                  icon={['far', 'bell']}
                  className="font-size-xl"
                />
              </div>
              <div className="badge badge-neutral-warning text-warning">
                + 57.32%
              </div>
            </div>
            <div className="display-4 mt-2 text-second font-weight-bold">
              bamburgh
            </div>
            <div className="pt-2 text-black-50">
              View any of the 5+ live previews we&#39;ve set up to learn why
              this dashboard template is the last one you&#39;ll ever need!
            </div>
            <div className="py-4 my-2">
              <LinearProgress
                variant="determinate"
                className="bg-secondary progress-constrained progress-bar-rounded progress-bar-rounded-alt d-flex justify-content-start progress-bar-warning"
                value={67}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <Button size="small" className="btn-warning btn-pill">
                View Project
              </Button>
              <div className="text-dark opacity-6">In Progress</div>
            </div>
          </Card>
        </Grid>
        <Grid item xl={4}>
          <Card className="p-4">
            <div className="d-flex justify-content-between">
              <div className="d-60 rounded-sm border-0 mb-4 card-icon-wrapper bg-first text-white btn-icon text-center shadow-first">
                <FontAwesomeIcon
                  icon={['far', 'lightbulb']}
                  className="font-size-xl"
                />
              </div>
              <div className="badge badge-neutral-warning text-warning">
                + 57.32%
              </div>
            </div>
            <div className="display-4 mt-2 text-second font-weight-bold">
              bamburgh
            </div>
            <div className="pt-2 text-black-50">
              View any of the 5+ live previews we&#39;ve set up to learn why
              this dashboard template is the last one you&#39;ll ever need!
            </div>
            <div className="py-4 my-2">
              <LinearProgress
                variant="determinate"
                className="bg-secondary progress-constrained progress-bar-rounded progress-bar-rounded-alt d-flex justify-content-start progress-bar-danger"
                value={83}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <Button size="small" className="btn-danger btn-pill">
                View Project
              </Button>
              <div className="text-danger">Overdue</div>
            </div>
          </Card>
        </Grid>
        <Grid item xl={4}>
          <Card className="bg-deep-blue p-4">
            <div className="d-flex justify-content-between">
              <div className="d-60 rounded-sm border-0 mb-4 card-icon-wrapper bg-plum-plate text-white btn-icon text-center shadow-sm">
                <FontAwesomeIcon
                  icon={['far', 'user']}
                  className="font-size-xl"
                />
              </div>
              <div className="badge badge-second text-white">+ 57.32%</div>
            </div>
            <div className="display-4 mt-2 text-second font-weight-bold">
              bamburgh
            </div>
            <div className="pt-2 text-black-50">
              View any of the 5+ live previews we&#39;ve set up to learn why
              this dashboard template is the last one you&#39;ll ever need!
            </div>
            <div className="py-4 my-2">
              <LinearProgress
                variant="determinate"
                className="bg-white-10 progress-constrained progress-bar-rounded d-flex justify-content-start progress-bar-white"
                value={88}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <Button
                size="small"
                className="btn-first overflow-hidden btn-gradient bg-plum-plate shadow-none btn-pill">
                View Project
              </Button>
              <div className="test-second opacity-8">Finished</div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
