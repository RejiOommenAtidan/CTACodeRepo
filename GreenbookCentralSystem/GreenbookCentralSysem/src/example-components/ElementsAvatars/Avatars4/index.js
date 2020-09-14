import React from 'react';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';

import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="mb-4">
          <div className="avatar-icon-wrapper avatar-icon-xl">
            <div className="avatar-icon rounded">
              <img src={avatar1} alt="..." />
            </div>
          </div>
          <div className="avatar-icon-wrapper avatar-icon-lg">
            <div className="avatar-icon rounded">
              <img src={avatar7} alt="..." />
            </div>
          </div>
          <div className="avatar-icon-wrapper">
            <div className="avatar-icon rounded">
              <img src={avatar1} alt="..." />
            </div>
          </div>
          <div className="avatar-icon-wrapper avatar-icon-sm">
            <div className="avatar-icon rounded">
              <img src={avatar2} alt="..." />
            </div>
          </div>
          <div className="avatar-icon-wrapper avatar-icon-xs">
            <div className="avatar-icon rounded">
              <img src={avatar3} alt="..." />
            </div>
          </div>
        </div>
      </div>
      <div className="divider mb-4" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div>
          <div className="avatar-icon-wrapper avatar-icon-xl">
            <div className="avatar-icon">
              <img src={avatar1} alt="..." />
            </div>
          </div>
          <div className="avatar-icon-wrapper avatar-icon-lg">
            <div className="avatar-icon">
              <img src={avatar7} alt="..." />
            </div>
          </div>
          <div className="avatar-icon-wrapper">
            <div className="avatar-icon">
              <img src={avatar1} alt="..." />
            </div>
          </div>
          <div className="avatar-icon-wrapper avatar-icon-sm">
            <div className="avatar-icon">
              <img src={avatar2} alt="..." />
            </div>
          </div>
          <div className="avatar-icon-wrapper avatar-icon-xs">
            <div className="avatar-icon">
              <img src={avatar3} alt="..." />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
