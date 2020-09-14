import React, { useState } from 'react';

import { LinearProgress } from '@material-ui/core';

export default function LivePreviewExample() {
  const [completed, setCompleted] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const progress = React.useRef(() => {});
  React.useEffect(() => {
    progress.current = () => {
      if (completed > 100) {
        setCompleted(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setCompleted(completed + diff);
        setBuffer(completed + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    function tick() {
      progress.current();
    }
    const timer = setInterval(tick, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="d-block mb-4">
        <LinearProgress
          variant="buffer"
          value={completed}
          valueBuffer={buffer}
          className="progress-sm progress-bar-success"
        />
      </div>
      <div className="d-block mb-4">
        <LinearProgress
          variant="buffer"
          value={completed}
          valueBuffer={buffer}
          className="progress-sm progress-bar-first"
        />
      </div>
      <div className="d-block mb-4">
        <LinearProgress
          variant="buffer"
          value={completed}
          valueBuffer={buffer}
          className="progress-sm progress-bar-dark"
        />
      </div>
      <div className="d-block">
        <LinearProgress
          variant="buffer"
          value={completed}
          valueBuffer={buffer}
          className="progress-sm progress-bar-info"
        />
      </div>
    </>
  );
}
