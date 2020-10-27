import React from 'react';

import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <CircularProgressbarWithChildren
          value={34}
          strokeWidth={7}
          className="m-3 circular-progress-second">
          <div className="badge badge-pill badge-second">34</div>
        </CircularProgressbarWithChildren>
        <CircularProgressbarWithChildren
          value={58}
          strokeWidth={6}
          className="m-3 circular-progress-success">
          <div className="badge badge-pill badge-success">58</div>
        </CircularProgressbarWithChildren>
        <CircularProgressbarWithChildren
          value={48}
          strokeWidth={4}
          className="m-3 circular-progress-warning">
          <div className="badge badge-pill badge-warning">48</div>
        </CircularProgressbarWithChildren>
        <CircularProgressbarWithChildren
          value={28}
          strokeWidth={8}
          className="m-3 circular-progress-danger">
          <div className="badge badge-pill badge-danger">28</div>
        </CircularProgressbarWithChildren>
        <CircularProgressbarWithChildren
          value={84}
          strokeWidth={12}
          className="m-3 circular-progress-first">
          <div className="badge badge-pill badge-first">84</div>
        </CircularProgressbarWithChildren>
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <CircularProgressbarWithChildren
          circleRatio={0.75}
          styles={buildStyles({ rotation: 1 / 2 + 1 / 8 })}
          value={34}
          strokeWidth={5}
          className="m-3 circle-progress-sm circular-progress-first">
          <div className="badge badge-first">34 %</div>
        </CircularProgressbarWithChildren>
        <CircularProgressbarWithChildren
          circleRatio={0.75}
          styles={buildStyles({ rotation: 1 / 2 + 1 / 8 })}
          value={58}
          strokeWidth={5}
          className="m-3 circular-progress-second">
          <div className="badge badge-second">58 %</div>
        </CircularProgressbarWithChildren>
        <CircularProgressbarWithChildren
          circleRatio={0.75}
          styles={buildStyles({ rotation: 1 / 2 + 1 / 8 })}
          value={48}
          strokeWidth={5}
          className="m-3 circular-progress-lg circular-progress-dark">
          <div className="badge badge-dark">48 %</div>
        </CircularProgressbarWithChildren>
        <CircularProgressbarWithChildren
          circleRatio={0.75}
          styles={buildStyles({ rotation: 1 / 2 + 1 / 8 })}
          value={28}
          strokeWidth={5}
          className="m-3 circular-progress-primary">
          <div className="badge badge-primary">28 %</div>
        </CircularProgressbarWithChildren>
        <CircularProgressbarWithChildren
          circleRatio={0.75}
          styles={buildStyles({ rotation: 1 / 2 + 1 / 8 })}
          value={84}
          strokeWidth={5}
          className="m-3 circle-progress-sm circular-progress-info">
          <div className="badge badge-info">84 %</div>
        </CircularProgressbarWithChildren>
      </div>
    </>
  );
}
