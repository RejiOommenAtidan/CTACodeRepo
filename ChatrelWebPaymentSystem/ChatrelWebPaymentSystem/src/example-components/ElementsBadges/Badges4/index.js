import React from 'react';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="badge badge-primary m-1 badge-circle">Primary</div>
        <div className="badge badge-second m-1 badge-circle">Secondary</div>
        <div className="badge badge-success m-1 badge-circle">Success</div>
        <div className="badge badge-danger m-1 badge-circle">Danger</div>
        <div className="badge badge-warning m-1 badge-circle">Warning</div>
        <div className="badge badge-info m-1 badge-circle">Info</div>
        <div className="badge badge-dark m-1 badge-circle">Dark</div>
      </div>

      <div className="divider my-3" />

      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="badge badge-primary m-1 badge-circle-inner">
          Primary
        </div>
        <div className="badge badge-second m-1 badge-circle-inner">
          Secondary
        </div>
        <div className="badge badge-success m-1 badge-circle-inner">
          Success
        </div>
        <div className="badge badge-danger m-1 badge-circle-inner">Danger</div>
        <div className="badge badge-warning m-1 badge-circle-inner">
          Warning
        </div>
        <div className="badge badge-info m-1 badge-circle-inner">Info</div>
        <div className="badge badge-dark m-1 badge-circle-inner">Dark</div>
      </div>
    </>
  );
}
