import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  InputAdornment,
  FormControlLabel,
  Dialog,
  Checkbox,
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

import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import ViewCompactTwoToneIcon from '@material-ui/icons/ViewCompactTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import LayersTwoToneIcon from '@material-ui/icons/LayersTwoTone';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';
import stock1 from '../../../assets/images/stock-photos/stock-1.jpg';
import svgImage1 from '../../../assets/images/illustrations/pack1/wireframe.svg';
import hero1 from '../../../assets/images/hero-bg/hero-1.jpg';
import hero3 from '../../../assets/images/hero-bg/hero-3.jpg';

import people3 from '../../../assets/images/stock-photos/people-3.jpg';
import people2 from '../../../assets/images/stock-photos/people-2.jpg';

export default function LivePreviewExample() {
  const [modal1, seModal1] = useState(false);
  const [modal2, seModal2] = useState(false);
  const [modal3, seModal3] = useState(false);
  const [modal4, seModal4] = useState(false);
  const [modal5, seModal5] = useState(false);

  const toggle1 = () => seModal1(!modal1);
  const toggle2 = () => seModal2(!modal2);
  const toggle3 = () => seModal3(!modal3);
  const toggle4 = () => seModal4(!modal4);
  const toggle5 = () => seModal5(!modal5);

  const [checked1, setChecked1] = useState(true);

  const handleChange1 = (event) => {
    setChecked1(event.target.checked);
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

  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button onClick={toggle1} className="btn-primary m-2">
          Open example I
        </Button>
        <Dialog
          scroll="body"
          maxWidth="lg"
          open={modal1}
          onClose={toggle1}
          classes={{
            paper: 'modal-content rounded border-0 bg-white p-3 p-xl-0'
          }}>
          <Grid container spacing={0}>
            <Grid item xl={5}>
              <div className="hero-wrapper bg-composed-wrapper bg-light-pure h-100 rounded br-xl-right-0">
                <div className="flex-grow-1 w-100 d-flex align-items-center">
                  <div
                    className="bg-composed-wrapper--image rounded br-xl-right-0"
                    style={{ backgroundImage: 'url(' + hero1 + ')' }}
                  />
                  <div className="bg-composed-wrapper--bg bg-second opacity-7 rounded br-xl-right-0" />
                  <div className="bg-composed-wrapper--content justify-content-center justify-content-xl-start text-center text-xl-left p-5">
                    <div className="d-flex justify-content-center justify-content-xl-start align-items-center">
                      <div className="badge badge-pill badge-success px-4 h-auto py-1">
                        New release
                      </div>
                      <Tooltip
                        placement="right"
                        title="More info placeholder!"
                        arrow>
                        <span className="text-black-50 ml-3">
                          <FontAwesomeIcon icon={['far', 'question-circle']} />
                        </span>
                      </Tooltip>
                    </div>
                    <div className="text-white mt-3">
                      <h1 className="display-4 my-3 font-weight-bold">
                        Bamburgh React Admin Dashboard with Material-UI PRO
                      </h1>
                      <p className="font-size-md mb-0 text-white-50">
                        View any of the 5+ live previews we&#39;ve set up to
                        learn why this dashboard template is the last one
                        you&#39;ll ever need!
                      </p>
                      <div className="divider border-1 mx-auto mx-xl-0 my-5 border-light opacity-2 rounded w-25" />
                      <div>
                        <Button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="btn-danger">
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
                  <List component="div" className="nav-transparent-alt d-flex">
                    <Tooltip arrow title="Facebook">
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="px-2 py-1 text-white-50">
                        <FontAwesomeIcon icon={['fab', 'facebook']} />
                      </ListItem>
                    </Tooltip>

                    <Tooltip arrow title="Twitter">
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="px-2 py-1 text-white-50">
                        <FontAwesomeIcon icon={['fab', 'twitter']} />
                      </ListItem>
                    </Tooltip>

                    <Tooltip arrow title="Google">
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="px-2 py-1 text-white-50">
                        <FontAwesomeIcon icon={['fab', 'google']} />
                      </ListItem>
                    </Tooltip>

                    <Tooltip arrow title="Instagram">
                      <ListItem
                        component="a"
                        button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="px-2 py-1 text-white-50">
                        <FontAwesomeIcon icon={['fab', 'instagram']} />
                      </ListItem>
                    </Tooltip>
                  </List>
                </div>
              </div>
            </Grid>
            <Grid item xl={7}>
              <div className="mt-4 mt-xl-0">
                <List className="nav-tabs nav-tabs-primary tabs-animated tabs-animated-line justify-content-center d-flex">
                  <ListItem
                    button
                    className="px-0 mx-3"
                    disableRipple
                    selected={activeTab === '0'}
                    onClick={() => {
                      toggle('0');
                    }}>
                    <span className="py-1 font-weight-bold">Overview</span>
                  </ListItem>
                  <ListItem
                    button
                    className="px-0 mx-3"
                    disableRipple
                    selected={activeTab === '1'}
                    onClick={() => {
                      toggle('1');
                    }}>
                    <span className="py-1 font-weight-bold">Sign in</span>
                  </ListItem>
                  <ListItem
                    button
                    className="px-0 mx-3"
                    disableRipple
                    selected={activeTab === '2'}
                    onClick={() => {
                      toggle('2');
                    }}>
                    <span className="py-1 font-weight-bold">
                      Recent activity
                    </span>
                  </ListItem>
                </List>

                <div
                  className={clsx('tab-item-wrapper', {
                    active: activeTab === '0'
                  })}
                  index={0}>
                  <div className="p-4">
                    <div className="mb-spacing-6">
                      <Grid container spacing={6}>
                        <Grid item md={4}>
                          <Card className="text-white-50 bg-second p-3">
                            <div className="display-3 text-white font-weight-bold">
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
                          <Card className="text-white-50 bg-second p-3">
                            <div className="display-3 text-white font-weight-bold">
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
                          <Card className="text-white-50 bg-second p-3">
                            <div className="display-3 text-white font-weight-bold">
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
                  </div>
                </div>
                <div
                  className={clsx('tab-item-wrapper', {
                    active: activeTab === '1'
                  })}
                  index={1}>
                  <Card className="shadow-none bg-transparent p-4 border-0">
                    <div>
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
                    </div>
                    <div>
                      <div className="text-center text-muted my-3">
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
                          className="font-weight-bold btn-second px-4 my-3">
                          Sign in
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
                <div
                  className={clsx('tab-item-wrapper', {
                    active: activeTab === '2'
                  })}
                  index={2}>
                  <div className="p-4">
                    <div className="mb-spacing-6">
                      <Grid container spacing={6}>
                        <Grid item md={6}>
                          <Card className="card-box">
                            <div className="card-indicator bg-first" />
                            <CardContent className="px-4 py-3">
                              <div className="pb-3 d-flex justify-content-between">
                                <a
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
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
                                <a
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
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
                            Mosaic, the first graphical browser, is introduced
                            to the average consumer.
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
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Dialog>

        <Button onClick={toggle2} className="btn-primary m-2">
          Open example II
        </Button>
        <Dialog
          scroll="body"
          maxWidth="lg"
          open={modal2}
          onClose={toggle2}
          classes={{ paper: 'modal-content border-0 rounded bg-white' }}>
          <Grid container spacing={0}>
            <Grid item xl={6} className="p-3 p-xl-0">
              <div className="hero-wrapper bg-composed-wrapper bg-grow-early h-100 rounded br-xl-right-0">
                <div className="flex-grow-1 w-100 d-flex align-items-center">
                  <div
                    className="bg-composed-wrapper--image rounded br-xl-right-0"
                    style={{ backgroundImage: 'url(' + hero3 + ')' }}
                  />
                  <div className="bg-composed-wrapper--bg bg-second opacity-5 rounded br-xl-right-0" />
                  <div className="bg-composed-wrapper--content text-center p-5">
                    <div className="text-white">
                      <h1 className="display-3 my-3 font-weight-bold">
                        Bamburgh React Admin Dashboard with Material-UI PRO
                      </h1>
                      <p className="font-size-lg mb-0 text-white-50">
                        Premium admin template powered by the most popular UI
                        components framework available for React: Material-UI.
                        Features hundreds of examples making web development
                        fast and easy. Start from one of the individual apps
                        included or from the general dashboard and build
                        beautiful scalable applications and presentation
                        websites.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hero-footer pb-4">
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="btn-success font-weight-bold rounded-lg px-4">
                    <span className="btn-wrapper--label">Continue reading</span>
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xl={6}>
              <div className="bg-white rounded br-xl-left-0">
                <div className="card-tr-actions">
                  <Tooltip arrow title="Send Message">
                    <Button
                      size="small"
                      className="btn-neutral-dark p-0 d-40 btn-icon">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['far', 'envelope']} />
                      </span>
                    </Button>
                  </Tooltip>
                </div>
                <div className="text-center pt-4">
                  <div className="avatar-icon-wrapper rounded-circle m-0">
                    <div className="d-block p-0 avatar-icon-wrapper m-0 d-90">
                      <div className="rounded-circle overflow-hidden">
                        <img alt="..." className="img-fluid" src={avatar7} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="badge badge-neutral-success my-2 text-success font-size-md px-4 py-1 h-auto">
                      Online
                    </div>
                  </div>
                  <h3 className="font-weight-bold mt-3">Lacie-Mae Mckay</h3>
                  <p className="mb-0 text-black-50">
                    Senior Frontend Developer at <b>Google Inc.</b>
                  </p>
                  <div className="pt-3">
                    <Tooltip arrow title="Github">
                      <Button className="btn-github d-50 m-2 p-0">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon
                            icon={['fab', 'github']}
                            className="font-size-lg"
                          />
                        </span>
                      </Button>
                    </Tooltip>
                    <Tooltip arrow title="Instagram">
                      <Button className="btn-instagram d-50 m-2 p-0">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon
                            icon={['fab', 'instagram']}
                            className="font-size-lg"
                          />
                        </span>
                      </Button>
                    </Tooltip>
                    <Tooltip arrow title="Google">
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
                        variant="text"
                        className="card card-box d-block text-left text-primary d-flex justify-content-center px-4 py-3">
                        <div>
                          <SettingsTwoToneIcon className="h1 d-block my-2 text-warning" />
                          <div className="font-weight-bold font-size-lg text-black">
                            Reports
                          </div>
                          <div className="font-size-md mb-1 text-black-50">
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
                        variant="text"
                        className="card card-box d-block text-left text-primary d-flex justify-content-center px-4 py-3">
                        <div>
                          <ViewCompactTwoToneIcon className="h1 d-block my-2 text-success" />
                          <div className="font-weight-bold font-size-lg text-black">
                            Statistics
                          </div>
                          <div className="font-size-md mb-1 text-black-50">
                            Customers stats
                          </div>
                        </div>
                      </Button>
                    </div>
                    <div className="w-50 p-2">
                      <Button
                        href="#/"
                        fullWidth
                        onClick={(e) => e.preventDefault()}
                        variant="text"
                        className="card card-box d-block text-left text-primary d-flex justify-content-center px-4 py-3">
                        <div>
                          <PeopleAltTwoToneIcon className="h1 d-block my-2 text-danger" />
                          <div className="font-weight-bold font-size-lg text-black">
                            Projects
                          </div>
                          <div className="font-size-md mb-1 text-black-50">
                            Manage servers
                          </div>
                        </div>
                      </Button>
                    </div>
                    <div className="w-50 p-2">
                      <Button
                        href="#/"
                        fullWidth
                        onClick={(e) => e.preventDefault()}
                        variant="text"
                        className="card card-box d-block text-left text-primary d-flex justify-content-center px-4 py-3">
                        <div>
                          <LayersTwoToneIcon className="h1 d-block my-2 text-first" />
                          <div className="font-weight-bold font-size-lg text-black">
                            Tasks
                          </div>
                          <div className="font-size-md mb-1 text-black-50">
                            Pending items
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Dialog>

        <Button onClick={toggle3} className="btn-primary m-2">
          Open example III
        </Button>
        <Dialog
          scroll="body"
          maxWidth="lg"
          open={modal3}
          onClose={toggle3}
          classes={{
            paper: 'modal-content border-0 bg-white rounded-lg p-3 p-xl-0'
          }}>
          <Grid container spacing={0}>
            <Grid item xl={5}>
              <div className="bg-white rounded-lg br-xl-right-0">
                <div className="p-4 text-center">
                  <div className="avatar-icon-wrapper rounded-circle mx-auto">
                    <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0 border-3 border-first">
                      <div className="rounded-circle border-3 border-white overflow-hidden">
                        <img alt="..." className="img-fluid" src={avatar5} />
                      </div>
                    </div>
                  </div>
                  <h4 className="font-size-lg font-weight-bold my-2">
                    Marion Devine
                  </h4>
                  <div className="text-center my-4">
                    <div className="badge badge-pill badge-neutral-first text-first mx-1">
                      Web developer
                    </div>
                    <div className="badge badge-pill badge-neutral-warning text-warning mx-1">
                      Javascript
                    </div>
                    <div className="badge badge-pill badge-neutral-danger text-danger mx-1">
                      Angular
                    </div>
                  </div>

                  <p className="text-muted mb-4">
                    I should be incapable of drawing a single stroke at the
                    present moment; and yet I feel that I never was a greater
                    artist than now.
                  </p>

                  <div className="divider my-4" />
                  <Grid container spacing={6}>
                    <Grid item lg={6}>
                      <span className="opacity-6 pb-2">Current month</span>
                      <div className="d-flex align-items-center justify-content-center">
                        <span className="font-weight-bold font-size-lg">
                          <small className="opacity-6 pr-1">$</small>
                          46,362
                        </span>
                        <div className="badge badge-neutral-danger ml-2 text-danger">
                          -8%
                        </div>
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <span className="opacity-6 pb-2">Last year</span>
                      <div className="d-flex align-items-center justify-content-center">
                        <span className="font-weight-bold font-size-lg">
                          <small className="opacity-6 pr-1">$</small>
                          34,546
                        </span>
                        <div className="badge badge-neutral-success text-success ml-2">
                          +13%
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <div className="divider my-4" />
                  <div className="font-weight-bold text-uppercase text-black-50 text-center mb-3">
                    Team members
                  </div>
                  <div className="avatar-wrapper-overlap d-flex justify-content-center mb-3">
                    <Tooltip
                      title="Chelsey Delaney"
                      classes={{ tooltip: 'tooltip-danger' }}
                      arrow>
                      <div className="avatar-icon-wrapper">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar1} />
                        </div>
                      </div>
                    </Tooltip>

                    <Tooltip
                      title="Laibah Santos"
                      classes={{ tooltip: 'tooltip-first' }}
                      arrow>
                      <div className="avatar-icon-wrapper">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar7} />
                        </div>
                      </div>
                    </Tooltip>

                    <Tooltip
                      title="Ksawery Weber"
                      classes={{ tooltip: 'tooltip-second' }}
                      arrow>
                      <div className="avatar-icon-wrapper">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar1} />
                        </div>
                      </div>
                    </Tooltip>

                    <Tooltip
                      title="Killian Magana"
                      classes={{ tooltip: 'tooltip-info' }}
                      arrow>
                      <div className="avatar-icon-wrapper">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar2} />
                        </div>
                      </div>
                    </Tooltip>

                    <Tooltip
                      title="Kean Banks"
                      classes={{ tooltip: 'tooltip-success' }}
                      arrow>
                      <div className="avatar-icon-wrapper">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar6} />
                        </div>
                      </div>
                    </Tooltip>
                  </div>
                  <div className="divider my-4" />
                  <Button variant="text" className="btn-outline-first mt-2">
                    View complete profile
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xl={7}>
              <div className="hero-wrapper bg-composed-wrapper h-100 rounded-lg br-xl-left-0">
                <div className="flex-grow-1 w-100 d-flex align-items-end">
                  <div className="bg-composed-wrapper--bg bg-sunrise-purple opacity-4 rounded-lg br-xl-left-0" />
                  <div className="bg-composed-wrapper--bg bg-second opacity-2 rounded-lg br-xl-left-0" />
                  <div
                    className="bg-composed-wrapper--image rounded-lg br-xl-left-0 opacity-9"
                    style={{ backgroundImage: 'url(' + people3 + ')' }}
                  />
                  <div className="bg-composed-wrapper--content text-center p-5">
                    <div className="text-white mt-3">
                      <h1 className="display-3 my-3 font-weight-bold">
                        Bamburgh React Admin Dashboard with Material-UI PRO
                      </h1>
                      <p className="font-size-lg mb-0 text-white-50">
                        View any of the 5+ live previews we&#39;ve set up to
                        learn why this dashboard template is the last one
                        you&#39;ll ever need!
                      </p>
                      <div className="divider border-1 mx-auto my-4 border-light opacity-2 rounded w-25" />
                      <div>
                        <Button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          size="large"
                          className="btn-success btn-pill">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['far', 'envelope']} />
                          </span>
                          <span className="btn-wrapper--label">
                            Get in touch
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Dialog>

        <Button onClick={toggle4} className="btn-primary m-2">
          Open example IV
        </Button>
        <Dialog
          scroll="body"
          maxWidth="md"
          open={modal4}
          onClose={toggle4}
          classes={{ paper: 'modal-content rounded border-0' }}>
          <Grid container spacing={0}>
            <Grid item xl={5} className="p-3 p-xl-0">
              <img
                alt="..."
                className="rounded br-xl-right-0 img-fit-container"
                src={stock1}
              />
            </Grid>
            <Grid item xl={7}>
              <div className="bg-white rounded br-xl-left-0">
                <div className="p-5">
                  <img
                    alt="..."
                    className="w-25 d-block img-fluid"
                    src={svgImage1}
                  />
                  <h1 className="display-4 my-3 font-weight-bold">
                    Bamburgh React Admin Dashboard with Material-UI PRO
                  </h1>
                  <p className="font-size-lg text-black">
                    View any of the 5+ live previews we&#39;ve set up to learn
                    why this dashboard template is the last one you&#39;ll ever
                    need!
                  </p>
                  <p className="font-size-sm mb-3 text-black-50">
                    Premium admin template powered by the most popular UI
                    components framework available for React: Material-UI.
                    Features hundreds of examples making web development fast
                    and easy. Start from one of the individual apps included or
                    from the general dashboard and build beautiful scalable
                    applications and presentation websites.
                  </p>
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    fullWidth
                    className="btn-primary">
                    Continue reading
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Dialog>

        <Button onClick={toggle5} className="btn-primary m-2">
          Open example V
        </Button>
        <Dialog
          scroll="body"
          maxWidth="lg"
          open={modal5}
          onClose={toggle5}
          classes={{ paper: 'modal-content border-0 p-4' }}>
          <div className="p-4">
            <Grid container spacing={6}>
              <Grid item lg={4}>
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="card-img-wrapper d-block rounded">
                  <div className="img-wrapper-overlay">
                    <div className="overlay-btn-wrapper">
                      <Button className="btn-first p-0 d-50 btn-icon btn-animated-icon rounded-circle">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon
                            icon={['fas', 'play-circle']}
                            className="font-size-xl"
                          />
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="card-badges card-badges-top">
                    <div className="badge badge-pill badge-success">New</div>
                  </div>
                  <img
                    alt="..."
                    className="card-img-top rounded"
                    src={people2}
                  />
                </a>
              </Grid>
              <Grid item lg={8}>
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="font-size-xxl d-block mb-4">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </a>
                <p className="text-black-50 font-size-lg mb-0">
                  Premium admin template powered by the most popular UI
                  components framework available for React: Material-UI.
                  Features hundreds of examples making web development fast and
                  easy. Start from one of the individual apps included or from
                  the general dashboard and build beautiful scalable
                  applications and presentation websites.
                </p>

                <div className="d-flex align-items-center mt-4">
                  <div className="avatar-icon-wrapper avatar-icon-lg  mr-3">
                    <div className="avatar-icon">
                      <img alt="..." src={avatar3} />
                    </div>
                  </div>
                  <div>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-weight-bold text-black"
                      title="...">
                      Aaron Mitchell
                    </a>
                    <span className="text-black-50 d-block">
                      UI Engineer, Google
                    </span>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Dialog>
      </div>
    </>
  );
}
