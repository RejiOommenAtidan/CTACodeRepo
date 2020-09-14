import React from 'react';

import { LinearProgress } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-block mb-4">
        <LinearProgress
          variant="query"
          value={25}
          className="progress-bar-danger progress-sm"
        />
      </div>
      <div className="d-block mb-4">
        <LinearProgress
          variant="query"
          value={45}
          className="progress-bar-warning progress-sm"
        />
      </div>
      <div className="d-block mb-4">
        <LinearProgress
          variant="query"
          value={65}
          className="progress-bar-success progress-sm"
        />
      </div>
      <div className="d-block">
        <LinearProgress
          variant="query"
          value={85}
          className="progress-bar-first progress-sm"
        />
      </div>
    </>
  );
}
