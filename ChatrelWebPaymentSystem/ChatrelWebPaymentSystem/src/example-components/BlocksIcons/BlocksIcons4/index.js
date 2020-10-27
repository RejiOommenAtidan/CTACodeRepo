import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={4}>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="card bg-white btn rounded text-left bg-white p-4">
              <div className="d-flex align-items-center">
                <div className="d-70 rounded-circle bg-success text-white mr-3 text-center">
                  <FontAwesomeIcon
                    icon={['far', 'user']}
                    className="font-size-lg"
                  />
                </div>
                <div className="flex-grow-1">
                  <div className="text-black-50 pb-1">Project management</div>
                  <div className="text-success">+ 5,72%</div>
                </div>
                <div className="font-size-sm opacity-5">
                  <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                </div>
              </div>
            </a>
          </Grid>
          <Grid item xl={4}>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="card bg-white btn rounded text-left bg-white p-4">
              <div className="d-flex align-items-center">
                <div className="d-70 rounded-circle bg-warning text-white mr-3 text-center">
                  <FontAwesomeIcon
                    icon={['far', 'bell']}
                    className="font-size-lg"
                  />
                </div>
                <div className="flex-grow-1">
                  <div className="text-black-50 pb-1">Analytics statistics</div>
                  <div className="text-warning">457 new users</div>
                </div>
                <div className="font-size-sm opacity-5">
                  <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                </div>
              </div>
            </a>
          </Grid>
          <Grid item xl={4}>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="card bg-white btn rounded text-left bg-white p-4">
              <div className="d-flex align-items-center">
                <div className="d-70 rounded-circle bg-neutral-first text-first mr-3 text-center">
                  <FontAwesomeIcon
                    icon={['far', 'lightbulb']}
                    className="font-size-lg"
                  />
                </div>
                <div className="flex-grow-1">
                  <div className="text-black-50 pb-1">Tasks overview</div>
                  <div className="text-danger">
                    <div className="badge badge-pill badge-danger mr-1">
                      23 tasks
                    </div>
                    due today
                  </div>
                </div>
                <div className="font-size-sm opacity-5">
                  <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                </div>
              </div>
            </a>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
