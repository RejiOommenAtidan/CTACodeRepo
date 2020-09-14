import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        <div className="position-relative p-3 text-center">
          <div className="avatar-icon-wrapper rounded-circle d-80 mx-auto">
            <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0">
              <div className="rounded-circle overflow-hidden">
                <img alt="..." className="img-fluid" src={avatar1} />
              </div>
            </div>
          </div>
          <div className="font-weight-bold mt-1">Marion Devine</div>
          <div className="font-size-sm text-black-50">
            <FontAwesomeIcon
              icon={['fas', 'star']}
              className="text-warning mr-1"
            />
            <span>4.8</span>
            <span className="px-1">|</span>
            34 Jobs
          </div>
        </div>
        <div className="position-relative p-3 text-center">
          <div className="avatar-icon-wrapper rounded-circle d-80 mx-auto">
            <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0">
              <div className="rounded-circle overflow-hidden">
                <img alt="..." className="img-fluid" src={avatar2} />
              </div>
            </div>
          </div>
          <div className="font-weight-bold mt-1">Monique Hanna</div>
          <div className="font-size-sm text-black-50">
            <FontAwesomeIcon
              icon={['fas', 'star']}
              className="text-warning mr-1"
            />
            <span>5.0</span>
            <span className="px-1">|</span>
            81 Jobs
          </div>
        </div>
      </div>
    </>
  );
}
