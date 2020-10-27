import React from 'react';

import { Card } from '@material-ui/core';

import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import AlarmAddOutlinedIcon from '@material-ui/icons/AlarmAddOutlined';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';

import Brightness7TwoToneIcon from '@material-ui/icons/Brightness7TwoTone';
import DirectionsBoatTwoToneIcon from '@material-ui/icons/DirectionsBoatTwoTone';
import EventAvailableTwoToneIcon from '@material-ui/icons/EventAvailableTwoTone';
import HomeWorkTwoToneIcon from '@material-ui/icons/HomeWorkTwoTone';

import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import TuneIcon from '@material-ui/icons/Tune';

export default function LivePreviewExample() {
  return (
    <>
      <div className="icon-demo-box">
        <Card className="p-2 text-primary">
          <AccountBalanceWalletOutlinedIcon />
        </Card>
        <Card className="p-2 text-success">
          <AlarmAddOutlinedIcon />
        </Card>
        <Card className="p-2 text-warning">
          <CakeOutlinedIcon />
        </Card>
        <Card className="p-2 text-danger">
          <ContactsOutlinedIcon />
        </Card>
        <Card className="p-2 text-dark">
          <Brightness7TwoToneIcon />
        </Card>
        <Card className="p-2 text-info">
          <DirectionsBoatTwoToneIcon />
        </Card>
        <Card className="p-2 text-first">
          <EventAvailableTwoToneIcon />
        </Card>
        <Card className="p-2 text-second">
          <HomeWorkTwoToneIcon />
        </Card>
        <Card className="p-2">
          <AirportShuttleIcon />
        </Card>
        <Card className="p-2">
          <CheckCircleOutlineIcon />
        </Card>
        <Card className="p-2">
          <DeveloperBoardIcon />
        </Card>
        <Card className="p-2">
          <TuneIcon />
        </Card>
      </div>
    </>
  );
}
