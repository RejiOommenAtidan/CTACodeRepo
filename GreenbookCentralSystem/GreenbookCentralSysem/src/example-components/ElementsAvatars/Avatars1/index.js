import React from 'react';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="avatar-icon-wrapper">
          <div className="avatar-icon">
            <img src={avatar1} alt="..." />
          </div>
        </div>
        <div className="avatar-icon-wrapper">
          <div className="avatar-icon">
            <img src={avatar2} alt="..." />
          </div>
        </div>
        <div className="avatar-icon-wrapper">
          <div className="avatar-icon">
            <img src={avatar3} alt="..." />
          </div>
        </div>
        <div className="avatar-icon-wrapper">
          <div className="avatar-icon">
            <img src={avatar4} alt="..." />
          </div>
        </div>
        <div className="avatar-icon-wrapper">
          <div className="avatar-icon">
            <img src={avatar5} alt="..." />
          </div>
        </div>
        <div className="avatar-icon-wrapper">
          <div className="avatar-icon">
            <img src={avatar6} alt="..." />
          </div>
        </div>
      </div>
    </>
  );
}
