import React from 'react';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="mb-4">
          <div className="avatar-icon-wrapper avatar-initials avatar-icon-xl">
            <div className="avatar-icon rounded text-white bg-dark">EA</div>
          </div>
          <div className="avatar-icon-wrapper avatar-initials avatar-icon-lg">
            <div className="avatar-icon rounded text-white bg-primary">DK</div>
          </div>
          <div className="avatar-icon-wrapper avatar-initials">
            <div className="avatar-icon rounded text-white bg-danger">RH</div>
          </div>
          <div className="avatar-icon-wrapper avatar-initials avatar-icon-sm">
            <div className="avatar-icon rounded text-white bg-second">GG</div>
          </div>
          <div className="avatar-icon-wrapper avatar-initials avatar-icon-xs">
            <div className="avatar-icon rounded text-white bg-first">M</div>
          </div>
        </div>
      </div>
      <div className="mb-4 divider" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="mb-4">
          <div className="avatar-icon-wrapper avatar-initials avatar-icon-xl">
            <div className="avatar-icon text-white bg-success">AD</div>
          </div>
          <div className="avatar-icon-wrapper avatar-initials avatar-icon-lg">
            <div className="avatar-icon text-white bg-second">H</div>
          </div>
          <div className="avatar-icon-wrapper avatar-initials">
            <div className="avatar-icon text-white bg-warning">T</div>
          </div>
          <div className="avatar-icon-wrapper avatar-initials avatar-icon-sm">
            <div className="avatar-icon text-white bg-primary">RX</div>
          </div>
          <div className="avatar-icon-wrapper avatar-initials avatar-icon-xs">
            <div className="avatar-icon text-white bg-dark">H</div>
          </div>
        </div>
      </div>
      <div className="mb-4 divider" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div>
          <div className="avatar-icon-wrapper avatar-initials avatar-icon-lg">
            <div className="avatar-icon rounded text-white bg-dark">
              <span className="font-size-md">TE</span>
              <span
                className="badge badge-first badge-position badge-position--bottom-center badge-circle-inner"
                title="Badge bottom center">
                Badge bottom center
              </span>
            </div>
          </div>
          <div className="avatar-icon-wrapper avatar-initials avatar-icon-lg">
            <div className="avatar-icon text-dark bg-light">
              <span className="font-size-sm font-weight-bold">GGH</span>
              <span className="badge badge-danger badge-circle">Offline</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
