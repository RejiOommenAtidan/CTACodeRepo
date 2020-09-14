import React from 'react';

import { Grid, Card, Button } from '@material-ui/core';

import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import AlarmAddOutlinedIcon from '@material-ui/icons/AlarmAddOutlined';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';

import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import TuneIcon from '@material-ui/icons/Tune';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="p-4 card-box">
        <Grid container spacing={6}>
          <Grid item xl={6}>
            <div className="d-flex align-items-center justify-content-center flex-wrap">
              <div className="w-50 p-2">
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="d-block btn-gradient bg-night-sky text-left px-4 py-3 w-100 rounded-lg shadow-none">
                  <div>
                    <AccountBalanceWalletOutlinedIcon className="h1 d-block my-2 text-warning" />
                    <div className="font-weight-bold font-size-md font-size-md">
                      Reports
                    </div>
                    <div className="font-size-md mb-1 opacity-8">
                      Monthly Stats
                    </div>
                  </div>
                </Button>
              </div>
              <div className="w-50 p-2">
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="d-block btn-gradient bg-midnight-bloom text-left px-4 py-3 w-100 rounded-lg shadow-none">
                  <div>
                    <AlarmAddOutlinedIcon className="h1 d-block my-2 text-success" />
                    <div className="font-weight-bold font-size-md font-size-md">
                      Statistics
                    </div>
                    <div className="font-size-md mb-1 opacity-8">
                      Customers stats
                    </div>
                  </div>
                </Button>
              </div>
              <div className="w-50 p-2">
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="d-block btn-gradient bg-vicious-stance text-left px-4 py-3 w-100 rounded-lg shadow-none">
                  <div>
                    <CakeOutlinedIcon className="h1 d-block my-2 text-danger" />
                    <div className="font-weight-bold font-size-md font-size-md">
                      Projects
                    </div>
                    <div className="font-size-md mb-1 opacity-8">
                      Manage servers
                    </div>
                  </div>
                </Button>
              </div>
              <div className="w-50 p-2">
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="d-block btn-gradient bg-royal text-left px-4 py-3 w-100 rounded-lg shadow-none">
                  <div>
                    <ContactsOutlinedIcon className="h1 d-block my-2 text-first" />
                    <div className="font-weight-bold font-size-md font-size-md">
                      Tasks
                    </div>
                    <div className="font-size-md mb-1 opacity-8">
                      Pending items
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xl={6}>
            <div className="d-flex align-items-center justify-content-center flex-wrap">
              <div className="w-50 p-2">
                <Button
                  href="#/"
                  fullWidth
                  onClick={(e) => e.preventDefault()}
                  variant="outlined"
                  className="card card-box d-block text-left p-3 text-success">
                  <div>
                    <AirportShuttleIcon className="h1 d-block my-2 text-success" />
                    <div className="font-weight-bold font-size-md text-black">
                      Projects
                    </div>
                    <div className="font-size-md mb-1 text-black opacity-8">
                      Newest tasks
                    </div>
                  </div>
                </Button>
              </div>
              <div className="w-50 p-2">
                <Button
                  href="#/"
                  fullWidth
                  onClick={(e) => e.preventDefault()}
                  variant="outlined"
                  className="card card-box d-block text-left p-3 text-danger">
                  <div>
                    <CheckCircleOutlineIcon className="h1 d-block my-2 text-danger" />
                    <div className="font-weight-bold font-size-md text-black">
                      Helpdesk
                    </div>
                    <div className="font-size-md mb-1 text-black opacity-8">
                      Tickets overview
                    </div>
                  </div>
                </Button>
              </div>
              <div className="w-50 p-2">
                <Button
                  href="#/"
                  fullWidth
                  onClick={(e) => e.preventDefault()}
                  variant="outlined"
                  className="card card-box d-block text-left p-3 text-warning">
                  <div>
                    <DeveloperBoardIcon className="h1 d-block my-2 text-warning" />
                    <div className="font-weight-bold font-size-md text-black">
                      CRM UI
                    </div>
                    <div className="font-size-md mb-1 text-black opacity-8">
                      Daily operations
                    </div>
                  </div>
                </Button>
              </div>
              <div className="w-50 p-2">
                <Button
                  href="#/"
                  fullWidth
                  onClick={(e) => e.preventDefault()}
                  variant="outlined"
                  className="card card-box d-block text-left p-3 text-first">
                  <div>
                    <TuneIcon className="h1 d-block my-2 text-first" />
                    <div className="font-weight-bold font-size-md text-black">
                      Customers
                    </div>
                    <div className="font-size-md mb-1 text-black opacity-8">
                      Manage data
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
