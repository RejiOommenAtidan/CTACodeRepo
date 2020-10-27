import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  InputAdornment,
  FormControlLabel,
  Typography,
  Checkbox,
  Tabs,
  Tab,
  LinearProgress,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  Tooltip,
  TextField
} from '@material-ui/core';

import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';
import hero1 from '../../../assets/images/hero-bg/hero-1.jpg';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}>
      {value === index && <div>{children}</div>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default function LivePreviewExample() {
  const [checked1, setChecked1] = useState(true);

  const handleChange1 = (event) => {
    setChecked1(event.target.checked);
  };

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [completed, setCompleted] = useState(0);

  React.useEffect(() => {
    function progress() {
      setCompleted((oldCompleted) => {
        if (oldCompleted === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Card className="card-box">
        <Grid container spacing={0}>
          <Grid item xl={5}>
            <div className="hero-wrapper bg-composed-wrapper bg-plum-plate h-100 m-4 m-xl-0 rounded-lg br-xl-right-0">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div
                  className="bg-composed-wrapper--image rounded-lg br-xl-right-0"
                  style={{ backgroundImage: 'url(' + hero1 + ')' }}
                />
                <div className="bg-composed-wrapper--bg bg-second opacity-5 rounded-lg br-xl-right-0" />
                <div className="bg-composed-wrapper--content p-4 p-lg-5">
                  <div className="d-flex align-items-center">
                    <div className="badge badge-pill badge-second px-4 h-auto py-1">
                      New release
                    </div>
                    <Tooltip
                      placement="right"
                      arrow
                      title="More info placeholder!">
                      <span className="text-white-50 pl-3" placement="right">
                        <FontAwesomeIcon icon={['far', 'question-circle']} />
                      </span>
                    </Tooltip>
                  </div>
                  <div className="text-white mt-3">
                    <h1 className="display-3 my-3 font-weight-bold">
                      Bamburgh React Admin Dashboard with Material-UI PRO
                    </h1>
                    <p className="font-size-lg mb-0 text-white-50">
                      Premium admin template powered by the most popular UI
                      components framework available for React: Material-UI.
                      Features hundreds of examples making web development fast
                      and easy. Start from one of the individual apps included
                      or from the general dashboard and build beautiful scalable
                      applications and presentation websites.
                    </p>
                    <div className="divider border-2 my-4 border-light opacity-2 rounded w-25" />
                    <div>
                      <Button className="hover-scale-lg btn-warning">
                        <span className="btn-wrapper--label">
                          Browse gallery
                        </span>
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-footer pb-4">
                <List component="div" className="nav-transparent">
                  <Tooltip title="Facebook" arrow>
                    <ListItem
                      button
                      className="btn-link btn-icon d-40 p-0 font-size-lg text-white-50">
                      <FontAwesomeIcon icon={['fab', 'facebook']} />
                    </ListItem>
                  </Tooltip>
                  <Tooltip title="Twitter" arrow>
                    <ListItem
                      button
                      className="btn-link btn-icon d-40 p-0 font-size-lg text-white-50">
                      <FontAwesomeIcon icon={['fab', 'twitter']} />
                    </ListItem>
                  </Tooltip>

                  <Tooltip title="Google" arrow>
                    <ListItem
                      button
                      className="btn-link btn-icon d-40 p-0 font-size-lg text-white-50">
                      <FontAwesomeIcon icon={['fab', 'google']} />
                    </ListItem>
                  </Tooltip>

                  <Tooltip title="Instagram" arrow>
                    <ListItem
                      button
                      className="btn-link btn-icon d-40 p-0 font-size-lg text-white-50">
                      <FontAwesomeIcon icon={['fab', 'instagram']} />
                    </ListItem>
                  </Tooltip>
                </List>
              </div>
            </div>
          </Grid>
          <Grid item xl={7}>
            <div className="mt-4 mt-xl-0">
              <div className="tabs-bordered p-4">
                <Tabs
                  className="nav-tabs-primary"
                  value={value}
                  variant="fullWidth"
                  onChange={handleChange}>
                  <Tab label="Overview" />
                  <Tab label="Sign in" />
                  <Tab label="Recent activity" />
                </Tabs>
              </div>
            </div>
            <div className="p-4 pt-0">
              <TabPanel value={value} index={0}>
                <div className="mb-spacing-6">
                  <Grid container spacing={6}>
                    <Grid item md={4}>
                      <Card className="card-box text-black-50 p-3">
                        <div className="display-3 text-black font-weight-bold">
                          31
                        </div>
                        <div className="divider mt-2 mb-3 border-2 w-25 bg-first rounded border-first" />
                        <div className="font-weight-bold font-size-sm text-uppercase">
                          Implemented
                          <br />
                          bugfixes
                        </div>
                      </Card>
                    </Grid>
                    <Grid item md={4}>
                      <Card className="card-box text-black-50 p-3">
                        <div className="display-3 text-black font-weight-bold">
                          68
                        </div>
                        <div className="divider mt-2 mb-3 border-2 w-25 bg-success rounded border-success" />
                        <div className="font-weight-bold font-size-sm text-uppercase">
                          Unresolved
                          <br />
                          tickets
                        </div>
                      </Card>
                    </Grid>
                    <Grid item md={4}>
                      <Card className="card-box text-black-50 p-3">
                        <div className="display-3 text-black font-weight-bold">
                          57
                        </div>
                        <div className="divider mt-2 mb-3 border-2 w-25 bg-warning rounded border-warning" />
                        <div className="font-weight-bold font-size-sm text-uppercase">
                          Support
                          <br />
                          requests
                        </div>
                      </Card>
                    </Grid>
                  </Grid>
                </div>
                <Card className="card-box mb-4">
                  <CardContent>
                    <div className="text-left mb-3">
                      <div className="mt-1">
                        <FontAwesomeIcon
                          icon={['fas', 'lemon']}
                          className="font-size-xxl text-danger"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg text-black">3,568</b>
                        <span className="text-black-50 pl-1">clicks</span>
                      </div>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={completed}
                      className="progress-animated-alt progress-lg progress-bar-danger">
                      76%
                    </LinearProgress>
                  </CardContent>
                </Card>
                <div className="text-center">
                  <Button variant="text" className="btn-outline-primary">
                    Create new report
                  </Button>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Card className="shadow-none border-0">
                  <CardContent className="py-0">
                    <div className="card-header d-block p-3 pt-0 rounded bg-light">
                      <div className="text-muted text-center mb-3">
                        <small>Sign in with</small>
                      </div>
                      <div className="text-center">
                        <Button className="btn-facebook mr-2">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['fab', 'facebook']} />
                          </span>
                          <span className="btn-wrapper--label">Facebook</span>
                        </Button>
                        <Button className="btn-twitter ml-2">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['fab', 'twitter']} />
                          </span>
                          <span className="btn-wrapper--label">Twitter</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardContent>
                    <div className="text-center text-muted mb-3">
                      <small>Or sign in with credentials</small>
                    </div>
                    <div className="mb-3">
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="textfield-email"
                        label="Email address"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailOutlineTwoToneIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="textfield-password"
                        label="Password"
                        type="password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockTwoToneIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center font-size-md">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked1}
                            onChange={handleChange1}
                            value="checked1"
                            color="primary"
                          />
                        }
                        label="Remember me"
                      />
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="text-first">
                          Recover password
                        </a>
                      </div>
                    </div>
                    <div className="text-center">
                      <Button
                        variant="contained"
                        size="large"
                        className="font-weight-bold btn-second px-4 my-2">
                        Sign in
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="mb-spacing-6">
                  <Grid container spacing={6}>
                    <Grid item md={6}>
                      <Card className="card-box">
                        <div className="card-indicator bg-first" />
                        <CardContent className="px-4 py-3">
                          <div className="pb-3 d-flex justify-content-between">
                            <a href="#/" onClick={(e) => e.preventDefault()}>
                              Presentation site design
                            </a>
                          </div>
                          <div className="d-flex align-items-center justify-content-start">
                            <div className="badge badge-first px-3">
                              On hold
                            </div>
                            <div className="font-size-sm text-danger px-2">
                              <FontAwesomeIcon
                                icon={['far', 'clock']}
                                className="mr-1"
                              />
                              14:22
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item md={6}>
                      <Card className="card-box">
                        <div className="card-indicator bg-success" />
                        <CardContent className="px-4 py-3">
                          <div className="pb-3 d-flex justify-content-between">
                            <a href="#/" onClick={(e) => e.preventDefault()}>
                              Create UI mockups
                            </a>
                          </div>
                          <div className="d-flex align-items-center justify-content-start">
                            <div className="badge badge-success px-3">
                              Fixed
                            </div>
                            <div className="font-size-sm text-dark px-2">
                              <FontAwesomeIcon
                                icon={['far', 'clock']}
                                className="mr-1"
                              />
                              09:41
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </div>
                <div className="timeline-list mt-4">
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
                  <div className="timeline-item mb-3">
                    <div className="timeline-item--content">
                      <div className="timeline-item--icon" />
                      <h4 className="timeline-item--label mb-2 font-weight-bold">
                        Java exam day
                      </h4>
                      <p>
                        Bill Clinton's presidential scandal makes it online.
                      </p>
                      <div className="avatar-wrapper-overlap mt-2 mb-1">
                        <div className="avatar-icon-wrapper avatar-icon-sm">
                          <div className="avatar-icon">
                            <img alt="..." src={avatar1} />
                          </div>
                        </div>
                        <div className="avatar-icon-wrapper avatar-icon-sm">
                          <div className="avatar-icon">
                            <img alt="..." src={avatar7} />
                          </div>
                        </div>
                        <div className="avatar-icon-wrapper avatar-icon-sm">
                          <div className="avatar-icon">
                            <img alt="..." src={avatar1} />
                          </div>
                        </div>
                        <div className="avatar-icon-wrapper avatar-icon-sm">
                          <div className="avatar-icon">
                            <img alt="..." src={avatar2} />
                          </div>
                        </div>
                        <div className="avatar-icon-wrapper avatar-icon-sm">
                          <div className="avatar-icon">
                            <img alt="..." src={avatar6} />
                          </div>
                        </div>
                      </div>
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
                      <div className="mt-2">
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
              </TabPanel>
            </div>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
