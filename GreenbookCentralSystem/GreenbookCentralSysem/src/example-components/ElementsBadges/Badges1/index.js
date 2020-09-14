import React from 'react';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="m-1 badge badge-primary">Primary</div>
        <div className="m-1 badge badge-second">Secondary</div>
        <div className="m-1 badge badge-success">Success</div>
        <div className="m-1 badge badge-danger">Danger</div>
        <div className="m-1 badge badge-warning">Warning</div>
        <div className="m-1 badge badge-info">Info</div>
        <div className="m-1 badge badge-dark">Dark</div>
      </div>

      <div className="divider my-4" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="m-1 text-primary badge badge-neutral-primary">
          Primary
        </div>
        <div className="m-1 text-second badge badge-neutral-second">
          Secondary
        </div>
        <div className="m-1 text-success badge badge-neutral-success">
          Success
        </div>
        <div className="m-1 text-danger badge badge-neutral-danger">Danger</div>
        <div className="m-1 text-warning badge badge-neutral-warning">
          Warning
        </div>
        <div className="m-1 text-info badge badge-neutral-info">Info</div>
        <div className="m-1 text-dark badge badge-neutral-dark">Dark</div>
      </div>
    </>
  );
}
