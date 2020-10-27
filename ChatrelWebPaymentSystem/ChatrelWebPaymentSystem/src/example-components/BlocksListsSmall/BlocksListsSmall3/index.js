import React from 'react';

import { Card, CardContent } from '@material-ui/core';

import CountUp from 'react-countup';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import ViewCompactTwoToneIcon from '@material-ui/icons/ViewCompactTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import LayersTwoToneIcon from '@material-ui/icons/LayersTwoTone';
export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box">
        <div className="card-header">
          <h4 className="font-size-lg mb-0 py-2 font-weight-bold">
            Latest issues
          </h4>
        </div>
        <CardContent>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex">
              <SettingsTwoToneIcon className="h1 d-block mr-3 text-warning" />
              <div>
                <b>Reports</b>
                <div className="text-black-50">Monthly sales reports</div>
              </div>
            </div>
            <div className="font-weight-bold text-danger font-size-lg">
              <CountUp
                start={0}
                end={2.363}
                duration={6}
                delay={2}
                separator=""
                decimals={3}
                decimal=","
              />
            </div>
          </div>
          <div className="divider my-3" />
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex">
              <ViewCompactTwoToneIcon className="h1 d-block mr-3 text-success" />
              <div>
                <b>User</b>
                <div className="text-black-50">Visitors last week</div>
              </div>
            </div>
            <div className="font-weight-bold text-success font-size-lg">
              <CountUp
                start={0}
                end={643}
                duration={6}
                delay={2}
                separator=""
                decimals={0}
                decimal=","
              />
            </div>
          </div>
          <div className="divider my-3" />
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex">
              <PeopleAltTwoToneIcon className="h1 d-block mr-3 text-danger" />
              <div>
                <b>Sales</b>
                <div className="text-black-50">Total average weekly report</div>
              </div>
            </div>
            <div className="font-weight-bold text-warning font-size-lg">
              <CountUp
                start={0}
                end={483}
                duration={6}
                delay={2}
                separator=""
                decimals={0}
                decimal=","
              />
            </div>
          </div>
          <div className="divider my-3" />
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex">
              <LayersTwoToneIcon className="h1 d-block mr-3 text-first" />
              <div>
                <b>Stats</b>
                <div className="text-black-50">Last month targets</div>
              </div>
            </div>
            <div className="font-weight-bold text-first font-size-lg">
              {' '}
              $1,23M
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
