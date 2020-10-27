import React from 'react';

import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="avatar-icon-wrapper rounded m-2">
          <span className="badge-position badge-position--top-right badge-circle-inner badge badge-danger">
            Offline
          </span>
          <div className="rounded overflow-hidden d-90 bg-neutral-first font-size-lg text-center font-weight-bold text-first d-flex justify-content-center flex-column">
            <span>TY</span>
          </div>
        </div>
        <div className="avatar-icon-wrapper rounded m-2">
          <span className="badge-position badge-position--bottom-right badge-circle badge badge-success">
            Online
          </span>
          <div className="rounded overflow-hidden d-90 bg-neutral-success font-size-xl text-center font-weight-bold text-success d-flex justify-content-center flex-column">
            <span>HS</span>
          </div>
        </div>
      </div>
      <div className="divider my-4" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="avatar-icon-wrapper rounded-circle m-2">
          <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0 border-3 border-danger">
            <div className="rounded-circle border-3 border-white overflow-hidden">
              <img alt="..." className="img-fluid" src={avatar4} />
            </div>
          </div>
        </div>
        <div className="avatar-icon-wrapper rounded-circle m-2">
          <div className="d-block badge-wrapper p-0 avatar-icon-wrapper rounded-circle m-0 border-3 border-info">
            <span className="badge-position badge-position--bottom-center badge-circle-inner badge badge-info">
              New notifications
            </span>
            <div className="rounded-circle border-3 border-white overflow-hidden">
              <img alt="..." className="img-fluid" src={avatar6} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
