import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  InputAdornment,
  LinearProgress,
  Card,
  Button,
  List,
  ListItem,
  TextField
} from '@material-ui/core';

import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';

export default function LivePreviewExample() {
  const [inputBg, setInputBg] = useState(false);
  const toggleInputBg = () => setInputBg(!inputBg);

  return (
    <>
      <div className="mb-spacing-6-x2">
        <Grid container spacing={6}>
          <Grid item xl={4} className="d-flex">
            <Card className="card-box w-100">
              <div className="card-header">
                <div className="card-header--title">
                  <small className="d-block text-uppercase mt-1">Status</small>
                  <b>Team Performance</b>
                </div>
                <div>
                  <Button className="btn-neutral-primary d-30 border-0 p-0 text-left d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                  </Button>
                </div>
              </div>

              <List component="div" className="list-group-flush">
                <ListItem
                  component="a"
                  button
                  href="#/"
                  disableRipple
                  onClick={(e) => e.preventDefault()}
                  className="d-flex bg-white hover-scale-rounded align-items-center py-3">
                  <div className="avatar-icon-wrapper avatar-initials d-50 mr-3">
                    <div className="avatar-icon rounded-circle text-white d-50 bg-warning">
                      GA
                    </div>
                  </div>
                  <div className="flex-fill">
                    <div className="font-weight-bold text-black">
                      Presentation UI
                    </div>
                    <LinearProgress
                      variant="determinate"
                      className="progress-xs progress-animated-alt my-2 progress-bar-success"
                      value={65}
                    />
                    <div className="d-flex justify-content-between font-size-xs">
                      <div className="text-success">Completed</div>
                      <div className="opacity-5">
                        15<sup>th</sup> Sep
                      </div>
                    </div>
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  disableRipple
                  onClick={(e) => e.preventDefault()}
                  className="d-flex bg-white hover-scale-rounded align-items-center py-3">
                  <div className="avatar-icon-wrapper avatar-initials d-50 mr-3">
                    <div className="avatar-icon rounded-circle text-white d-50 bg-first">
                      TH
                    </div>
                  </div>
                  <div className="flex-fill">
                    <div className="font-weight-bold text-black">
                      Review Comps.
                    </div>
                    <LinearProgress
                      variant="determinate"
                      className="progress-xs progress-animated-alt my-2 progress-bar-success"
                      value={34}
                    />
                    <div className="d-flex justify-content-between font-size-xs">
                      <div className="text-success">Completed</div>
                      <div className="opacity-5">
                        12<sup>th</sup> Aug
                      </div>
                    </div>
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  disableRipple
                  onClick={(e) => e.preventDefault()}
                  className="d-flex bg-white hover-scale-rounded align-items-center py-3">
                  <div className="avatar-icon-wrapper avatar-initials d-50 mr-3">
                    <div className="avatar-icon rounded-circle text-white d-50 bg-danger">
                      EA
                    </div>
                  </div>
                  <div className="flex-fill">
                    <div className="font-weight-bold text-black">
                      Build React UI
                    </div>
                    <LinearProgress
                      variant="determinate"
                      className="progress-xs my-2 progress-bar-warning"
                      value={71}
                    />
                    <div className="d-flex justify-content-between font-size-xs">
                      <div className="text-warning">Delayed</div>
                      <div className="opacity-5">
                        22<sup>th</sup> Sep
                      </div>
                    </div>
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  disableRipple
                  onClick={(e) => e.preventDefault()}
                  className="d-flex bg-white hover-scale-rounded align-items-center py-3">
                  <div className="avatar-icon-wrapper avatar-initials d-50 mr-3">
                    <div className="avatar-icon rounded-circle text-white d-50 bg-second">
                      HS
                    </div>
                  </div>
                  <div className="flex-fill">
                    <div className="font-weight-bold text-black">
                      Newsletters
                    </div>
                    <LinearProgress
                      variant="determinate"
                      className="progress-xs my-2 progress-bar-danger"
                      value={81}
                    />
                    <div className="d-flex justify-content-between font-size-xs">
                      <div className="text-danger">Overdue</div>
                      <div className="opacity-5">
                        16<sup>th</sup> Oct
                      </div>
                    </div>
                  </div>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item xl={4} className="d-flex">
            <Card className="card-box w-100">
              <div className="card-header">
                <div className="card-header--title">
                  <small className="d-block text-uppercase mt-1">
                    Messages
                  </small>
                  <b>Messenger Window</b>
                </div>
                <div className="avatar-icon-wrapper avatar-initials shadow-none d-40 mr-0">
                  <div className="avatar-icon text-white bg-night-sky d-40 font-size-sm">
                    ET
                  </div>
                  <div
                    className="badge badge-warning badge-position badge-position--bottom-center badge-circle-inner"
                    title="Badge bottom center">
                    Online
                  </div>
                </div>
              </div>
              <div
                className={clsx(
                  'd-flex transition-base align-items-center justify-content-between py-2 px-4',
                  { 'bg-secondary': !inputBg }
                )}>
                <div>
                  <Button
                    size="small"
                    className="btn-link p-0 btn-transition-none btn-link-danger">
                    <span className="btn-wrapper--label font-size-sm">
                      Delete all
                    </span>
                  </Button>
                </div>
                <div className="font-size-sm font-weight-bold">Emma Taylor</div>
              </div>
              <div className="divider" />
              <div
                className={clsx(
                  'd-flex align-items-center transition-base px-4 py-1',
                  { 'py-3 bg-secondary': inputBg }
                )}>
                <div className="search-wrapper w-100">
                  <TextField
                    variant="outlined"
                    size="small"
                    className="bg-white w-100"
                    classes={{ root: 'input-border-0' }}
                    id="input-with-icon-textfield225-1"
                    placeholder="Search messages..."
                    onFocus={toggleInputBg}
                    onBlur={toggleInputBg}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchTwoToneIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
              </div>
              <div className="divider" />
              <List component="div" className="list-group-flush">
                <ListItem
                  component="a"
                  button
                  href="#/"
                  disableRipple
                  onClick={(e) => e.preventDefault()}
                  className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center py-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon-wrapper d-50 mr-3">
                      <div className="avatar-icon rounded-circle d-50">
                        <img alt="..." src={avatar7} />
                      </div>
                    </div>
                    <div>
                      <div className="font-weight-bold font-size-sm text-black">
                        Siena Handley
                      </div>
                      <div className="d-flex align-items-center font-size-xs">
                        <div className="badge badge-success badge-circle border-white border-1 mr-2">
                          Completed
                        </div>
                        <div className="text-success">Online</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button size="small" className="btn-neutral-dark px-3">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fas', 'plus']} />
                      </span>
                      <span className="btn-wrapper--label">Add</span>
                    </Button>
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  disableRipple
                  onClick={(e) => e.preventDefault()}
                  className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center py-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon-wrapper d-50 mr-3">
                      <div className="avatar-icon rounded-circle d-50">
                        <img alt="..." src={avatar6} />
                      </div>
                    </div>
                    <div>
                      <div className="font-weight-bold font-size-sm text-black">
                        Karla Byrne
                      </div>
                      <div className="d-flex align-items-center font-size-xs">
                        <div className="badge badge-success badge-circle border-white border-1 mr-2">
                          Completed
                        </div>
                        <div className="text-success">Online</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button size="small" className="btn-neutral-dark px-3">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fas', 'plus']} />
                      </span>
                      <span className="btn-wrapper--label">Add</span>
                    </Button>
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  disableRipple
                  onClick={(e) => e.preventDefault()}
                  className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center py-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon-wrapper d-50 mr-3">
                      <div className="avatar-icon rounded-circle d-50">
                        <img alt="..." src={avatar5} />
                      </div>
                    </div>
                    <div>
                      <div className="font-weight-bold font-size-sm text-black">
                        Eden Hays
                      </div>
                      <div className="d-flex align-items-center font-size-xs">
                        <div className="badge badge-danger badge-circle border-white border-1 mr-2">
                          Completed
                        </div>
                        <div className="text-danger">Offline</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button
                      size="small"
                      className="btn-neutral-dark px-3"
                      disabled>
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fas', 'plus']} />
                      </span>
                      <span className="btn-wrapper--label">Add</span>
                    </Button>
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  disableRipple
                  onClick={(e) => e.preventDefault()}
                  className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center py-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar-icon-wrapper d-50 mr-3">
                      <div className="avatar-icon rounded-circle d-50">
                        <img alt="..." src={avatar4} />
                      </div>
                    </div>
                    <div>
                      <div className="font-weight-bold font-size-sm text-black">
                        Janine Benton
                      </div>
                      <div className="d-flex align-items-center font-size-xs">
                        <div className="badge badge-warning badge-circle border-white border-1 mr-2">
                          Completed
                        </div>
                        <div className="text-warning">In a meeting</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button size="small" className="btn-neutral-dark px-3">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fas', 'plus']} />
                      </span>
                      <span className="btn-wrapper--label">Add</span>
                    </Button>
                  </div>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item xl={4} className="d-flex">
            <Card className="card-box text-white bg-primary w-100">
              <div className="card-header border-0 bg-transparent">
                <div className="card-header--title">
                  <small className="d-block text-uppercase mt-1">Storage</small>
                  <b>Recent Files</b>
                </div>
                <div>
                  <Button className="btn-neutral-secondary d-30 border-0 p-0 text-left d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                  </Button>
                </div>
              </div>
              <div className="divider bg-white opacity-2" />
              <div className="px-4 py-2">
                <div className="rounded-sm p-3 bg-white-10 my-3 d-flex align-items-center justify-content-between shadow-sm-dark">
                  <div className="d-flex align-items-center">
                    <div className="mr-3">
                      <FontAwesomeIcon
                        icon={['far', 'file-excel']}
                        className="text-white opacity-4 display-3"
                      />
                    </div>
                    <div>
                      <div className="font-weight-bold font-size-sm">
                        feb2020_reports.xls
                      </div>
                      <div className="opacity-6 font-size-md">386 KB</div>
                    </div>
                  </div>
                  <div>
                    <Button className="btn-neutral-secondary bg-transparent text-white hover-scale-lg d-30 border-0 p-0 text-left d-flex justify-content-center align-items-center">
                      <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                    </Button>
                  </div>
                </div>
                <div className="rounded-sm p-3 bg-white-10 my-3 d-flex align-items-center justify-content-between shadow-sm-dark">
                  <div className="d-flex align-items-center">
                    <div className="mr-3">
                      <FontAwesomeIcon
                        icon={['far', 'file-word']}
                        className="text-white opacity-4 display-3"
                      />
                    </div>
                    <div>
                      <div className="font-weight-bold font-size-sm">
                        feb2020_pres_8.doc
                      </div>
                      <div className="opacity-6 font-size-md">1.34 MB</div>
                    </div>
                  </div>
                  <div>
                    <Button className="btn-neutral-secondary bg-transparent text-white hover-scale-lg d-30 border-0 p-0 text-left d-flex justify-content-center align-items-center">
                      <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                    </Button>
                  </div>
                </div>
                <div className="rounded-sm p-3 bg-white-10 my-3 d-flex align-items-center justify-content-between shadow-sm-dark">
                  <div className="d-flex align-items-center">
                    <div className="mr-3">
                      <FontAwesomeIcon
                        icon={['far', 'file-code']}
                        className="text-white opacity-4 display-3"
                      />
                    </div>
                    <div>
                      <div className="font-weight-bold font-size-sm">
                        homepage_new_12.tsx
                      </div>
                      <div className="opacity-6 font-size-md">85 KB</div>
                    </div>
                  </div>
                  <div>
                    <Button className="btn-neutral-secondary bg-transparent text-white hover-scale-lg d-30 border-0 p-0 text-left d-flex justify-content-center align-items-center">
                      <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                    </Button>
                  </div>
                </div>
                <div className="rounded-sm p-3 bg-white-10 my-3 d-flex align-items-center justify-content-between shadow-sm-dark">
                  <div className="d-flex align-items-center">
                    <div className="mr-3">
                      <FontAwesomeIcon
                        icon={['far', 'file-alt']}
                        className="text-white opacity-4 display-3"
                      />
                    </div>
                    <div>
                      <div className="font-weight-bold font-size-sm">
                        bamburgh-comps.sketch
                      </div>
                      <div className="opacity-6 font-size-md">58.33 MB</div>
                    </div>
                  </div>
                  <div>
                    <Button className="btn-neutral-secondary bg-transparent text-white hover-scale-lg d-30 border-0 p-0 text-left d-flex justify-content-center align-items-center">
                      <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
