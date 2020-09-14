import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Checkbox, Card, Button, Tooltip } from '@material-ui/core';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import AlarmAddOutlinedIcon from '@material-ui/icons/AlarmAddOutlined';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';

import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import ViewCompactTwoToneIcon from '@material-ui/icons/ViewCompactTwoTone';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={6}>
          <Card className="card-box pt-4">
            <div className="card-tr-actions">
              <Checkbox color="primary" id="checkboxProjects3" />
            </div>
            <div className="d-flex align-items-center px-4 mb-3">
              <div className="avatar-icon-wrapper rounded mr-3">
                <div className="d-block p-0 avatar-icon-wrapper m-0 d-100">
                  <div className="rounded overflow-hidden">
                    <img alt="..." className="img-fluid" src={avatar1} />
                  </div>
                </div>
              </div>
              <div className="w-100">
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="font-weight-bold font-size-lg"
                  title="...">
                  Kate Winchester
                </a>
                <span className="text-black-50 d-block pb-1">
                  Freelance Designer, Mutual Inc.
                </span>
                <div className="d-flex align-items-center pt-2">
                  <Button size="small" className="btn-primary mr-3 shadow-none">
                    Chat
                  </Button>
                  <Button size="small" className="btn-neutral-success">
                    View
                  </Button>
                </div>
              </div>
            </div>
            <div className="my-3 font-size-sm p-3 mx-4 bg-secondary rounded-sm">
              <div className="d-flex justify-content-between">
                <span className="font-weight-bold">Email:</span>
                <span className="text-black-50">russotry@russo.com</span>
              </div>
              <div className="d-flex justify-content-between py-2">
                <span className="font-weight-bold">Job Description:</span>
                <span className="text-black-50">Project Manager</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="font-weight-bold">Location:</span>
                <span className="text-black-50">San Francisco, USA</span>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-center flex-wrap mb-1 mx-2">
              <div className="w-50 p-3">
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
              <div className="w-50 p-3">
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
              <div className="w-50 p-3">
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
              <div className="w-50 p-3">
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
          </Card>
        </Grid>
        <Grid item xl={6}>
          <Card className="card-box pt-4 mb-5">
            <div className="card-tr-actions">
              <Tooltip title="Send Message" placement="top" arrow>
                <Button
                  size="small"
                  className="btn-neutral-dark d-40 p-0 btn-icon">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['far', 'envelope']} />
                  </span>
                </Button>
              </Tooltip>
            </div>
            <div className="text-center">
              <div className="avatar-icon-wrapper rounded-circle m-0">
                <div className="d-block p-0 avatar-icon-wrapper m-0 d-90">
                  <div className="rounded-circle overflow-hidden">
                    <img alt="..." className="img-fluid" src={avatar7} />
                  </div>
                </div>
              </div>
              <div>
                <div className="badge badge-neutral-success my-2 text-success font-size-sm px-4 py-1 h-auto">
                  Online
                </div>
              </div>
              <h3 className="font-weight-bold mt-3">Lacie-Mae Mckay</h3>
              <p className="mb-0 text-black-50">
                Senior Frontend Developer at <b>Google Inc.</b>
              </p>
              <div className="pt-3">
                <Tooltip title="Github">
                  <Button className="btn-github d-50 m-2 p-0">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'github']}
                        className="font-size-lg"
                      />
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip title="Instagram" arrow>
                  <Button className="btn-instagram d-50 m-2 p-0">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'instagram']}
                        className="font-size-lg"
                      />
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip title="Google" arrow>
                  <Button className="btn-google d-50 m-2 p-0">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'google']}
                        className="font-size-lg"
                      />
                    </span>
                  </Button>
                </Tooltip>
              </div>
              <div className="d-flex p-4 bg-secondary card-footer mt-4 flex-wrap">
                <div className="w-50 p-2">
                  <Button
                    href="#/"
                    fullWidth
                    onClick={(e) => e.preventDefault()}
                    variant="outlined"
                    className="card card-box d-block text-left p-3 text-primary">
                    <div>
                      <ViewCompactTwoToneIcon className="h1 d-block my-2 text-primary" />
                      <div className="font-weight-bold font-size-md text-black">
                        Reports
                      </div>
                      <div className="font-size-md mb-1 text-black opacity-8">
                        Monthly Stats
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
                      <SettingsTwoToneIcon className="h1 d-block my-2 text-warning" />
                      <div className="font-weight-bold font-size-md text-black">
                        Statistics
                      </div>
                      <div className="font-size-md mb-1 text-black opacity-8">
                        Customers stats
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
