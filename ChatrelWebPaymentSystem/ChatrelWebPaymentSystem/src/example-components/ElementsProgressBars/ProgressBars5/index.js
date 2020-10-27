import React, { useState } from 'react';

import { CircularProgress } from '@material-ui/core';

export default function LivePreviewExample() {
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    function tick() {
      // reset when reaching 100%
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <CircularProgress
          variant="determinate"
          value={progress}
          className="m-3 progress-xs"
          color="primary"
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          className="m-3 progress-sm"
          color="secondary"
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          className="m-3"
          color="primary"
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          className="m-3 progress-lg"
          color="primary"
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <CircularProgress
          variant="static"
          value={47}
          className="m-3 progress-xs progress-bar-danger"
        />
        <CircularProgress
          variant="static"
          value={54}
          className="m-3 progress-sm progress-bar-success"
        />
        <CircularProgress
          variant="static"
          value={89}
          className="m-3 progress-bar-primary"
        />
        <CircularProgress
          variant="static"
          value={50}
          className="m-3 progress-lg progress-bar-warning"
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <CircularProgress
          variant="static"
          value={48}
          className="m-3 progress-lg progress-bar-info"
        />
        <CircularProgress
          variant="static"
          value={53}
          className="m-3 progress-lg progress-bar-dark"
        />
        <CircularProgress
          variant="static"
          value={94}
          className="m-3 progress-lg progress-bar-danger"
        />
      </div>
    </>
  );
}
