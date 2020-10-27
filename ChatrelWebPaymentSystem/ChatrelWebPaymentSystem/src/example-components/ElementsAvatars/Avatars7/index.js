import React from 'react';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="avatar-wrapper-overlap avatar-wrapper-overlap-hover mb-4">
          <div className="avatar-icon-wrapper avatar-icon-xl">
            <div className="avatar-icon">
              <img alt="..." src={avatar1} />
            </div>
          </div>
          <div className="avatar-icon-wrapper avatar-icon-xl">
            <div className="avatar-icon">
              <img alt="..." src={avatar5} />
            </div>
          </div>
          <div className="avatar-icon-wrapper avatar-icon-xl">
            <div className="avatar-icon">
              <img alt="..." src={avatar4} />
            </div>
          </div>
        </div>
      </div>
      <div className="divider mb-4" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="avatar-wrapper-overlap avatar-wrapper-overlap-hover mb-4">
          <div className="avatar-icon-wrapper avatar-icon-lg">
            <div className="avatar-icon rounded">
              <img alt="..." src={avatar2} />
            </div>
          </div>
          <div className="avatar-icon-wrapper avatar-icon-lg">
            <div className="avatar-icon rounded">
              <img alt="..." src={avatar6} />
            </div>
          </div>
          <div className="avatar-icon-wrapper avatar-icon-lg">
            <div className="avatar-icon rounded">
              <img alt="..." src={avatar3} />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="avatar-wrapper-overlap avatar-wrapper-overlap-hover mb-4">
          <div className="avatar-icon-wrapper">
            <div className="avatar-icon">
              <img alt="..." src={avatar2} />
            </div>
          </div>
          <div className="avatar-icon-wrapper">
            <div className="avatar-icon">
              <img alt="..." src={avatar7} />
            </div>
          </div>
          <div className="avatar-icon-wrapper">
            <div className="avatar-icon">
              <img alt="..." src={avatar4} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
