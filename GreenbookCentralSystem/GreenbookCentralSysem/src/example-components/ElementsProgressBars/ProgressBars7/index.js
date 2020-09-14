import React from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <CircularProgressbar
          value={34}
          text={34 + '%'}
          strokeWidth={6}
          className="m-3 circular-progress-primary"
        />
        <CircularProgressbar
          value={58}
          text={58 + '%'}
          strokeWidth={6}
          className="m-3 circular-progress-danger"
        />
        <CircularProgressbar
          value={48}
          text={48 + '%'}
          strokeWidth={6}
          className="m-3 circular-progress-success"
        />
        <CircularProgressbar
          value={28}
          text={28 + '%'}
          strokeWidth={6}
          className="m-3 circular-progress-warning"
        />
        <CircularProgressbar
          value={84}
          text={84 + '%'}
          strokeWidth={6}
          className="m-3 circular-progress-first"
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <CircularProgressbar
          value={34}
          text={34 + '%'}
          strokeWidth={8}
          className="m-3 circular-progress-xs circular-progress-primary"
        />
        <CircularProgressbar
          value={58}
          text={58 + '%'}
          strokeWidth={8}
          className="m-3 circular-progress-sm circular-progress-danger"
        />
        <CircularProgressbar
          value={48}
          text={48 + '%'}
          strokeWidth={8}
          className="m-3 circular-progress-success"
        />
        <CircularProgressbar
          value={28}
          text={28 + '%'}
          strokeWidth={8}
          className="m-3 circular-progress-lg circular-progress-warning"
        />
        <CircularProgressbar
          value={84}
          text={84 + '%'}
          strokeWidth={5}
          className="m-3 circular-progress-xl circular-progress-first"
        />
      </div>
    </>
  );
}
