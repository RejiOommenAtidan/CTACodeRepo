import React from 'react';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="badge badge-primary badge-pill m-1">Primary</div>
        <div className="badge badge-second badge-pill m-1">Secondary</div>
        <div className="badge badge-success badge-pill m-1">Success</div>
        <div className="badge badge-danger badge-pill m-1">Danger</div>
        <div className="badge badge-warning badge-pill m-1">Warning</div>
        <div className="badge badge-info badge-pill m-1">Info</div>
        <div className="badge badge-dark badge-pill m-1">Dark</div>
      </div>
      <div className="divider my-4" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="badge badge-neutral-primary badge-pill m-1 text-primary">
          Primary
        </div>
        <div className="badge badge-neutral-second badge-pill m-1 text-second">
          Secondary
        </div>
        <div className="badge badge-neutral-success badge-pill m-1 text-success">
          Success
        </div>
        <div className="badge badge-neutral-danger badge-pill m-1 text-danger">
          Danger
        </div>
        <div className="badge badge-neutral-warning badge-pill m-1 text-warning">
          Warning
        </div>
        <div className="badge badge-neutral-info badge-pill m-1 text-info">
          Info
        </div>
        <div className="badge badge-neutral-dark badge-pill m-1 text-dark">
          Dark
        </div>
      </div>
    </>
  );
}
