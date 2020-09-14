import React, { useState } from 'react';

import { LinearProgress } from '@material-ui/core';

export default function LivePreviewExample() {
  const [completed, setCompleted] = useState(0);

  React.useEffect(() => {
    function progress() {
      setCompleted((oldCompleted) => {
        if (oldCompleted === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="d-block mb-4">
        <LinearProgress
          variant="determinate"
          value={completed}
          className="progress-bar-warning progress-bar-rounded">
          34%
        </LinearProgress>
      </div>
      <div className="d-block mb-4">
        <LinearProgress
          variant="determinate"
          value={completed}
          className="progress-animated-alt progress-lg progress-bar-danger">
          76%
        </LinearProgress>
      </div>

      <div className="d-block">
        <LinearProgress
          variant="determinate"
          value={completed}
          className="progress-animated-alt progress-sm progress-bar-success"
        />
      </div>
    </>
  );
}
