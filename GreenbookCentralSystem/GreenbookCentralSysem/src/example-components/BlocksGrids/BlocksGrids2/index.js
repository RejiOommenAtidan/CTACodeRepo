import React from 'react';

import { Card } from '@material-ui/core';

import GridOnTwoToneIcon from '@material-ui/icons/GridOnTwoTone';
import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';

import BusinessCenterTwoToneIcon from '@material-ui/icons/BusinessCenterTwoTone';
import LocalLibraryTwoToneIcon from '@material-ui/icons/LocalLibraryTwoTone';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box d-flex flex-row flex-wrap justify-content-center mb-spacing-6-x2">
        <div className="py-4 px-5 d-flex align-items-center">
          <NotificationsActiveTwoToneIcon className="d-50 text-dark opacity-2 mr-3" />
          <div>
            <span className="d-block opacity-7">Expenses</span>
            <span className="font-weight-bold font-size-lg text-danger">
              <small className="opacity-6 pr-1">$</small>1,693
            </span>
          </div>
        </div>
        <div className="py-4 px-5 d-flex align-items-center">
          <SettingsTwoToneIcon className="d-50 text-dark opacity-2 mr-3" />
          <div>
            <span className="d-block opacity-7">Revenue</span>
            <span className="font-weight-bold font-size-lg">
              <small className="opacity-6 pr-1">$</small>54,233
            </span>
          </div>
        </div>
        <div className="py-4 px-5 d-flex align-items-center">
          <GridOnTwoToneIcon className="d-50 text-dark opacity-2 mr-3" />
          <div>
            <span className="d-block opacity-7">Users</span>
            <span className="font-weight-bold font-size-lg">
              <small className="opacity-6 pr-1">$</small>658
            </span>
          </div>
        </div>
        <div className="py-4 px-5 d-flex align-items-center">
          <LocalLibraryTwoToneIcon className="d-50 text-dark opacity-2 mr-3" />
          <div>
            <span className="d-block opacity-7">Sales</span>
            <span className="font-weight-bold font-size-lg text-success">
              <small className="opacity-6 pr-1">$</small>385
            </span>
          </div>
        </div>
        <div className="py-4 px-5 d-flex align-items-center">
          <BusinessCenterTwoToneIcon className="d-50 text-dark opacity-2 mr-3" />
          <div>
            <span className="d-block opacity-7">Income</span>
            <span className="font-weight-bold font-size-lg">
              <small className="opacity-6 pr-1">$</small>3,217
            </span>
          </div>
        </div>
      </Card>
    </>
  );
}
