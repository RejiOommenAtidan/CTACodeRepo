import React from 'react';

import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="avatar-icon-wrapper shadow-lg border-white rounded m-3 border-3">
          <div className="avatar-icon shadow-none d-90 rounded">
            <img alt="..." src={avatar5} />
          </div>
        </div>

        <div className="avatar-icon-wrapper border-white m-3">
          <div className="avatar-icon shadow-sm d-100">
            <img alt="..." src={avatar6} />
          </div>
        </div>
      </div>
    </>
  );
}
