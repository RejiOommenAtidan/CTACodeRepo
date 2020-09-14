import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  IconButton,
  Popover,
  LinearProgress,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  Tooltip
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

export default function LivePreviewExample() {
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const [anchorEl5, setAnchorEl5] = useState(null);
  const [anchorEl6, setAnchorEl6] = useState(null);

  const handleClickPopover1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClosePopover1 = () => {
    setAnchorEl1(null);
  };

  const handleClickPopover2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClosePopover2 = () => {
    setAnchorEl2(null);
  };

  const handleClickPopover3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClosePopover3 = () => {
    setAnchorEl3(null);
  };

  const handleClickPopover4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };
  const handleClosePopover4 = () => {
    setAnchorEl4(null);
  };

  const handleClickPopover5 = (event) => {
    setAnchorEl5(event.currentTarget);
  };
  const handleClosePopover5 = () => {
    setAnchorEl5(null);
  };

  const handleClickPopover6 = (event) => {
    setAnchorEl6(event.currentTarget);
  };
  const handleClosePopover6 = () => {
    setAnchorEl6(null);
  };

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const open4 = Boolean(anchorEl4);
  const open5 = Boolean(anchorEl5);
  const open6 = Boolean(anchorEl6);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center py-4 flex-wrap">
        <Button
          variant="text"
          className="btn-outline-primary transition-none m-2"
          onClick={handleClickPopover1}>
          Example I
        </Button>
        <Button
          variant="text"
          className="btn-outline-primary transition-none m-2"
          onClick={handleClickPopover2}>
          Example II
        </Button>
        <Button
          variant="text"
          className="btn-outline-primary transition-none m-2"
          onClick={handleClickPopover3}>
          Example III
        </Button>
        <Button
          variant="text"
          className="btn-outline-primary transition-none m-2"
          onClick={handleClickPopover4}>
          Example IV
        </Button>
        <Button
          variant="text"
          className="btn-outline-primary transition-none m-2"
          onClick={handleClickPopover5}>
          Example V
        </Button>
        <Button
          variant="text"
          className="btn-outline-primary transition-none m-2"
          onClick={handleClickPopover6}>
          Example VI
        </Button>
      </div>

      <Popover
        classes={{ paper: 'popover-custom-wrapper popover-custom-lg' }}
        open={open1}
        anchorEl={anchorEl1}
        onClose={handleClosePopover1}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}>
        <List
          component="div"
          className="list-group-flush text-left bg-transparent">
          <ListItem className="d-block rounded-top">
            <div className="align-box-row">
              <div>
                <div className="avatar-icon-wrapper avatar-icon-md">
                  <div className="avatar-icon rounded-circle">
                    <img alt="..." src={avatar2} />
                  </div>
                </div>
              </div>
              <div className="pl-2">
                <span className="pb-1 d-block">
                  <span className="font-weight-bold">Emma Taylor</span>
                  <small className="text-black-50 pl-1">
                    (em.taylor@uifort.com)
                  </small>
                </span>
                <div className="badge badge-success">Active Account</div>
              </div>
            </div>
            <Alert
              severity="warning"
              icon={false}
              className="mb-1 mt-3 rounded">
              <div className="align-box-row text-warning">
                <div className="pl-2">
                  <FontAwesomeIcon icon={['far', 'bell']} />
                </div>
                <div className="pl-3">
                  <small>
                    <b className="d-block">Unpaid invoice</b>
                  </small>
                  <small>
                    This account will be disabled starting{' '}
                    <b>12 January 2021</b>.
                  </small>
                </div>
              </div>
            </Alert>
          </ListItem>
          <ListItem className="d-block bg-transparent p-0">
            <div className="grid-menu grid-menu-2col">
              <Grid container spacing={0}>
                <Grid item sm={6}>
                  <div className="text-center py-3">
                    <div>
                      <FontAwesomeIcon
                        icon={['far', 'chart-bar']}
                        className="font-size-xxl text-info"
                      />
                    </div>
                    <div className="mt-2 line-height-sm">
                      <b className="font-size-lg">$9,693</b>
                      <span className="text-black-50 d-block">revenue</span>
                    </div>
                  </div>
                </Grid>
                <Grid item sm={6}>
                  <div className="text-center py-3">
                    <div>
                      <FontAwesomeIcon
                        icon={['far', 'user']}
                        className="font-size-xxl text-success"
                      />
                    </div>
                    <div className="mt-2 line-height-sm">
                      <b className="font-size-lg">2,345</b>
                      <span className="text-black-50 d-block">users</span>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </ListItem>
          <ListItem className="d-block rounded-bottom p-2 text-center">
            <Button
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="btn-facebook m-2 d-40 p-0 btn-icon btn-animated-icon-sm">
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fab', 'facebook']} />
              </span>
            </Button>
            <Button
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="btn-dribbble m-2 d-40 p-0 btn-icon btn-animated-icon-sm">
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fab', 'dribbble']} />
              </span>
            </Button>
            <Button
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="btn-twitter m-2 d-40 p-0 btn-icon btn-animated-icon-sm">
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fab', 'twitter']} />
              </span>
            </Button>
          </ListItem>
        </List>
      </Popover>
      <Popover
        classes={{ paper: 'popover-custom-wrapper rounded popover-custom-md' }}
        open={open2}
        anchorEl={anchorEl2}
        onClose={handleClosePopover2}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}>
        <List
          component="div"
          className="list-group-flush text-left bg-transparent">
          <ListItem>
            <div className="align-box-row">
              <div className="align-self-start">
                <div className="bg-premium-dark text-center text-white font-size-lg d-40 rounded-circle">
                  <FontAwesomeIcon icon={['far', 'lightbulb']} />
                </div>
              </div>
              <div className="pl-3">
                <b>Blinded by desire</b>
                <p className="text-black-50 mt-1 mb-0">
                  A wonderful serenity has taken possession.
                </p>
                <div className="timeline-list mt-3">
                  <div className="timeline-item timeline-item-icon">
                    <div className="timeline-item--content">
                      <div className="timeline-item--icon-wrapper bg-danger text-white">
                        <FontAwesomeIcon icon={['far', 'gem']} />
                      </div>
                      <h4 className="timeline-item--label mb-2 font-weight-bold">
                        1998
                      </h4>
                      <p>
                        Bill Clinton's presidential scandal makes it online.
                      </p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-item--content">
                      <div className="timeline-item--icon" />
                      <h4 className="timeline-item--label mb-2 font-weight-bold">
                        Business investor meeting
                        <div className="badge badge-neutral-info text-info ml-2">
                          New
                        </div>
                      </h4>
                      <p>
                        Mosaic, the first graphical browser, is introduced to
                        the average consumer.
                      </p>
                      <div className="mt-3">
                        <Button
                          size="small"
                          color="primary"
                          variant="contained">
                          Submit Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ListItem>
        </List>
        <div className="card-footer bg-light p-3 text-center">
          <Button
            href="#/"
            onClick={(e) => e.preventDefault()}
            className="btn-second">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={['far', 'question-circle']} />
            </span>
            <span className="btn-wrapper--label">View details</span>
          </Button>
        </div>
      </Popover>

      <Popover
        open={open3}
        classes={{ paper: 'popover-custom-wrapper popover-custom-lg' }}
        anchorEl={anchorEl3}
        onClose={handleClosePopover3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}>
        <CardContent>
          <div className="chat-wrapper">
            <div className="chat-item p-2 mb-2">
              <div className="align-box-row">
                <div className="avatar-icon-wrapper avatar-icon-lg align-self-start">
                  <div className="avatar-icon rounded border-0">
                    <img alt="..." src={avatar7} />
                  </div>
                </div>
                <div>
                  <div className="chat-box bg-first text-white">
                    <p>Bye for now, talk to you later.</p>
                  </div>
                  <small className="mt-2 d-block text-black-50">
                    <FontAwesomeIcon
                      icon={['far', 'clock']}
                      className="mr-1 opacity-5"
                    />
                    11:01 AM | Yesterday
                  </small>
                </div>
              </div>
            </div>
            <div className="chat-item chat-item-reverse p-2 mb-2">
              <div className="align-box-row flex-row-reverse">
                <div className="avatar-icon-wrapper avatar-icon-lg align-self-start">
                  <div className="avatar-icon rounded border-0">
                    <img alt="..." src={avatar3} />
                  </div>
                </div>
                <div>
                  <div className="chat-box bg-first text-white">
                    <p>Almost forgot about your tasks.</p>
                    <p>
                      <b>Check the links below:</b>
                    </p>
                    <Card className="bg-premium-dark p-2 mt-3 mb-2">
                      <div className="text-center py-2">
                        <Tooltip
                          title="Menu Example"
                          classes={{ tooltip: 'tooltip-secondary' }}
                          arrow
                          placement="top">
                          <IconButton
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="btn-gradient m-1 p-0 btn-icon bg-grow-early d-inline-block text-center text-white font-sizelgxl d-40 rounded-circle">
                            <FontAwesomeIcon icon={['far', 'bell']} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title="Menu Example"
                          classes={{ tooltip: 'tooltip-secondary' }}
                          arrow
                          placement="top">
                          <IconButton
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="btn-gradient m-1 p-0 btn-icon bg-ripe-malin d-inline-block text-center text-white font-size-lg d-40 rounded-circle"
                            title="Menu Example">
                            <FontAwesomeIcon icon={['far', 'lightbulb']} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title="Menu Example"
                          classes={{ tooltip: 'tooltip-secondary' }}
                          arrow
                          placement="top">
                          <IconButton
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="btn-gradient m-1 p-0 btn-icon bg-plum-plate d-inline-block text-center text-white font-size-lg d-40 rounded-circle"
                            title="Menu Example">
                            <FontAwesomeIcon icon={['far', 'user']} />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </Card>
                  </div>
                  <small className="mt-2 d-block text-black-50">
                    <FontAwesomeIcon
                      icon={['far', 'clock']}
                      className="mr-1 opacity-5"
                    />
                    11:03 AM | Yesterday
                  </small>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <div className="divider" />
        <div className="card-footer bg-white p-3 text-center d-block">
          <Button
            href="#/"
            onClick={(e) => e.preventDefault()}
            className="btn-primary"
            size="small">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={['far', 'file-alt']} />
            </span>
            <span className="btn-wrapper--label">View History</span>
          </Button>
        </div>
      </Popover>

      <Popover
        open={open4}
        anchorEl={anchorEl4}
        classes={{ paper: 'popover-custom-wrapper popover-custom-lg' }}
        onClose={handleClosePopover4}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}>
        <List
          component="div"
          className="list-group-flush text-left bg-transparent">
          <ListItem className="rounded-top">
            <div className="align-box-row">
              <div>
                <div className="avatar-icon-wrapper avatar-icon-md">
                  <div className="avatar-icon rounded-circle">
                    <img alt="..." src={avatar2} />
                  </div>
                </div>
              </div>
              <div className="pl-2">
                <span className="pb-1 d-block font-weight-bold">
                  Bryan York
                </span>
                <small className="pb-1 text-black-50 d-block">
                  Bryan's description can go here...
                </small>
                <div className="divider my-2" />
                <small className="text-black-50">
                  Deadline: <b className="text-danger">12 July 2029</b>
                </small>
              </div>
            </div>
          </ListItem>
          <ListItem className="d-block bg-transparent py-2">
            <div className="align-box-row mb-1">
              <div>
                <small className="font-weight-bold">Orders</small>
              </div>
              <div className="ml-auto">
                <div className="font-weight-bold text-success">348</div>
              </div>
            </div>
            <LinearProgress
              variant="determinate"
              className="progress-bar-rounded progress-bar-sm progress-animated-alt progress-bar-success"
              value={43}
            />
            <div className="align-box-row progress-bar--label mt-1 text-muted">
              <small className="text-dark">0</small>
              <small className="ml-auto">100%</small>
            </div>
          </ListItem>
        </List>
        <div className="card-footer bg-white p-2 text-center d-block">
          <Button
            href="#/"
            onClick={(e) => e.preventDefault()}
            size="small"
            className="btn-success m-2">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={['fas', 'cog']} />
            </span>
            <span className="btn-wrapper--label">Refresh</span>
          </Button>
          <Button
            href="#/"
            onClick={(e) => e.preventDefault()}
            size="small"
            className="btn-danger m-2">
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={['fas', 'times']} />
            </span>
            <span className="btn-wrapper--label">Remove</span>
          </Button>
        </div>
      </Popover>
      <Popover
        open={open5}
        anchorEl={anchorEl5}
        classes={{
          paper:
            'popover-custom-wrapper popover-custom-lg overflow-hidden shadow-lg border-0'
        }}
        onClose={handleClosePopover5}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}>
        <div className="bg-second">
          <div className="py-3 text-center">
            <div className="m-3 d-inline-block text-center">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="btn-link p-0 bg-ripe-malin d-inline-block text-center text-white font-size-xl d-50 rounded border-0 btn-icon mb-2 hover-scale-rounded">
                <FontAwesomeIcon
                  icon={['far', 'gem']}
                  className="font-size-lg"
                />
              </a>
              <div className="d-block text-white-50">Tasks</div>
            </div>
            <div className="m-3 d-inline-block text-center">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="btn-link p-0 bg-grow-early d-inline-block text-center text-white font-size-xl d-50 rounded border-0 btn-icon mb-2 hover-scale-rounded">
                <FontAwesomeIcon
                  icon={['far', 'user']}
                  className="font-size-lg"
                />
              </a>
              <div className="d-block text-white-50">Users</div>
            </div>
            <div className="m-3 d-inline-block text-center">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="btn-link p-0 bg-arielle-smile d-inline-block text-center text-white font-size-xl d-50 rounded border-0 btn-icon mb-2 hover-scale-rounded">
                <FontAwesomeIcon
                  icon={['far', 'chart-bar']}
                  className="font-size-lg"
                />
              </a>
              <div className="d-block text-white-50">Issues</div>
            </div>
          </div>
          <div className="divider opacity-2 bg-white" />
          <div className="text-center">
            <Button
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="hover-scale-lg text-white"
              disableRipple>
              View more items
            </Button>
          </div>
        </div>
      </Popover>
      <Popover
        open={open6}
        classes={{ paper: 'popover-custom-wrapper popover-custom-lg border-0' }}
        anchorEl={anchorEl6}
        onClose={handleClosePopover6}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}>
        <div className="bg-midnight-bloom">
          <List
            component="div"
            className="list-group-flush text-left bg-transparent">
            <ListItem className="bg-transparent">
              <CardContent className="p-2">
                <div className="align-box-row align-items-start">
                  <div className="font-weight-bold">
                    <small className="text-white-50 d-block mb-1 text-uppercase">
                      New Accounts
                    </small>
                    <span className="font-size-xxl mt-1 text-white">
                      586,356
                    </span>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-white text-center text-success font-size-xl d-50 rounded-circle">
                      <FontAwesomeIcon icon={['far', 'lightbulb']} />
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <FontAwesomeIcon
                    icon={['fas', 'arrow-up']}
                    className="text-success"
                  />
                  <span className="text-white px-1">15.4%</span>
                  <span className="text-white-50">increase this month</span>
                </div>
              </CardContent>
            </ListItem>
          </List>
        </div>
      </Popover>
    </>
  );
}
