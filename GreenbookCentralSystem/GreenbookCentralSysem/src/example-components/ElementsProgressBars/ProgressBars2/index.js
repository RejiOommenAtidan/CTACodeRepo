import React from 'react';

import { LinearProgress } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-block mb-4">
        <LinearProgress
          variant="determinate"
          value={25}
          className="progress-bar-rounded progress-xs progress-bar-danger"
        />
      </div>
      <div className="d-block mb-4">
        <LinearProgress
          variant="determinate"
          value={45}
          className="progress-bar-rounded progress-sm progress-bar-success"
        />
      </div>
      <div className="d-block mb-4">
        <LinearProgress
          variant="determinate"
          value={65}
          className="progress-bar-rounded progress-bar-first"
        />
      </div>
      <div className="d-block">
        <LinearProgress
          variant="determinate"
          value={85}
          className="progress-bar-rounded progress-lg progress-bar-second"
        />
      </div>
    </>
  );
}
