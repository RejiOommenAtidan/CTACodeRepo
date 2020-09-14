import React from 'react';

import { LinearProgress } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-block mb-4">
        <LinearProgress
          variant="determinate"
          value={25}
          className="progress-bar-primary progress-xs"
        />
      </div>
      <div className="d-block mb-4">
        <LinearProgress
          variant="determinate"
          value={45}
          className="progress-bar-primary progress-sm"
        />
      </div>
      <div className="d-block mb-4">
        <LinearProgress
          variant="determinate"
          value={65}
          className="progress-bar-primary"
        />
      </div>
      <div className="d-block">
        <LinearProgress
          variant="determinate"
          value={85}
          className="progress-bar-primary progress-lg"
        />
      </div>
    </>
  );
}
