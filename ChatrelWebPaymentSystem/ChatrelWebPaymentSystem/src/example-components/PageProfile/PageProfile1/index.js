import React, { useEffect, useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Container,
  InputAdornment,
  ButtonGroup,
  Card,
  Button,
  List,
  ListItem,
  TextField
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDropzone } from 'react-dropzone';
import CountUp from 'react-countup';

import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import PublishTwoToneIcon from '@material-ui/icons/PublishTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import CheckIcon from '@material-ui/icons/Check';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';

import hero1 from '../../../assets/images/hero-bg/hero-8.jpg';
import stock3 from '../../../assets/images/stock-photos/stock-6.jpg';

import stock1 from '../../../assets/images/stock-photos/stock-4.jpg';
import stock2 from '../../../assets/images/stock-photos/stock-5.jpg';

import people1 from '../../../assets/images/stock-photos/people-1.jpg';

import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone';
import TrendingDownTwoToneIcon from '@material-ui/icons/TrendingDownTwoTone';

import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';

import people3 from '../../../assets/images/stock-photos/people-3.jpg';
import people2 from '../../../assets/images/stock-photos/people-2.jpg';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

export default function LivePreviewExample() {
  const [inputBg, setInputBg] = useState(false);
  const toggleInputBg = () => setInputBg(!inputBg);

  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [activeTab2, setActiveTab2] = useState('1');

  const toggle2 = (tab) => {
    if (activeTab2 !== tab) setActiveTab2(tab);
  };

  const [files, setFiles] = useState([]);
  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
    getRootProps,
    getInputProps
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs = files.map((file) => (
    <div
      key={file.name}
      className="rounded-circle avatar-image overflow-hidden d-140 bg-neutral-success text-center font-weight-bold text-success d-flex justify-content-center align-items-center">
      <img
        className="img-fluid img-fit-container rounded-sm"
        src={file.preview}
        alt="..."
      />
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <>
      <div className="app-inner-content-layout">
        <div className="app-inner-content-layout--main bg-white p-0">
          <div className="hero-wrapper mx-5 rounded-bottom shadow-xxl bg-composed-wrapper bg-second">
            <div className="flex-grow-1 w-100 d-flex align-items-center">
              <div
                className="bg-composed-wrapper--image rounded-bottom opacity-3"
                style={{ backgroundImage: 'url(' + hero1 + ')' }}
              />
              <div className="bg-composed-wrapper--bg rounded-bottom bg-deep-sky opacity-4" />
              <div className="bg-composed-wrapper--content px-3 pt-5">
                <Container className="pt-4">
                  <div className="d-block d-md-flex align-items-start">
                    <div className="dropzone rounded-circle shadow-sm-dark mr-md-3">
                      <div
                        {...getRootProps({
                          className: 'dropzone-upload-wrapper'
                        })}>
                        <input {...getInputProps()} />
                        <div className="dropzone-inner-wrapper d-140 rounded-circle dropzone-avatar">
                          <div className="avatar-icon-wrapper d-140 rounded-circle m-2">
                            <Button
                              onClick={open}
                              className="btn-first avatar-button badge shadow-sm-dark btn-icon badge-position badge-position--bottom-right border-0 text-indent-0 d-40 badge-circle badge-first text-white">
                              <PublishTwoToneIcon className="d-20" />
                            </Button>

                            <div>
                              {isDragAccept && (
                                <div className="rounded-circle overflow-hidden d-140 bg-success text-center font-weight-bold text-white d-flex justify-content-center align-items-center">
                                  <CheckIcon className="d-40" />
                                </div>
                              )}
                              {isDragReject && (
                                <div className="rounded-circle overflow-hidden d-140 bg-danger text-center font-weight-bold text-white d-flex justify-content-center align-items-center">
                                  <CloseTwoToneIcon className="d-60" />
                                </div>
                              )}
                              {!isDragActive && (
                                <div className="rounded-circle overflow-hidden d-140 bg-second text-center font-weight-bold text-white-50 d-flex justify-content-center align-items-center">
                                  <AccountCircleTwoToneIcon className="d-50" />
                                </div>
                              )}
                            </div>

                            {thumbs.length > 0 && <div>{thumbs}</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex text-white flex-column pl-md-2">
                      <div className="d-block d-md-flex align-items-center">
                        <div className="my-3 my-md-0">
                          <div className="d-flex align-items-end">
                            <div className="font-size-xxl font-weight-bold">
                              @emmaTaylor_1ET
                            </div>
                          </div>
                          <div className="font-weight-bold mt-1 font-size-lg text-white-50">
                            Emma Taylor
                          </div>
                        </div>
                        <div className="ml-auto">
                          <Button
                            size="small"
                            className="btn-first mr-4 shadow-none rounded-lg text-uppercase line-height-1 font-weight-bold font-size-xs px-3 w-auto py-0 d-40">
                            Profile
                          </Button>
                          <Button
                            size="small"
                            className="btn-first mr-4 shadow-none rounded-lg text-uppercase line-height-1 font-weight-bold font-size-xs px-3 w-auto py-0 d-40">
                            History
                          </Button>
                          <Button className="btn-icon rounded-lg shadow-none hover-scale-lg d-40 p-0 btn-success">
                            <FontAwesomeIcon icon={['fas', 'plus']} />
                          </Button>
                        </div>
                      </div>
                      <div className="d-flex font-size-xl py-4 align-items-center">
                        <div className="mr-2">
                          438{' '}
                          <span className="font-size-sm text-white-50">
                            projects
                          </span>
                        </div>
                        <div className="mr-2">
                          12,459{' '}
                          <span className="font-size-sm text-white-50">
                            messages
                          </span>
                        </div>
                        <div className="mr-2">
                          84{' '}
                          <span className="font-size-sm text-white-50">
                            issues
                          </span>
                        </div>
                      </div>
                      <div className="font-size-lg">
                        Premium admin template powered by the most popular UI
                        components framework available for React: Material-UI.
                        Features hundreds of examples making web development
                        fast and easy. Start from one of the individual apps
                        included or from the general dashboard and build
                        beautiful scalable applications and presentation
                        websites.
                      </div>
                    </div>
                  </div>

                  <List className="d-flex nav-tabs justify-content-center nav-tabs-success tabs-animated tabs-animated-shadow my-5">
                    <ListItem
                      button
                      selected={activeTab2 === '1'}
                      className="bg-white-10 mx-3 rounded-lg"
                      onClick={() => {
                        toggle2('1');
                      }}>
                      <span className="font-size-lg text-white px-2 py-1">
                        Dashboard
                      </span>
                      <div className="divider" />
                    </ListItem>

                    <ListItem
                      button
                      selected={activeTab2 === '2'}
                      className="bg-white-10 mx-3 rounded-lg"
                      onClick={() => {
                        toggle2('2');
                      }}>
                      <span className="font-size-lg text-white px-2 py-1">
                        Recent Posts
                      </span>
                      <div className="divider" />
                    </ListItem>

                    <ListItem
                      button
                      selected={activeTab2 === '3'}
                      className="bg-white-10 mx-3 rounded-lg"
                      onClick={() => {
                        toggle2('3');
                      }}>
                      <span className="font-size-lg text-white px-2 py-1">
                        Timeline
                      </span>
                      <div className="divider" />
                    </ListItem>

                    <ListItem
                      button
                      selected={activeTab2 === '4'}
                      className="bg-white-10 mx-3 rounded-lg"
                      onClick={() => {
                        toggle2('4');
                      }}>
                      <span className="font-size-lg text-white px-2 py-1">
                        Friends
                      </span>
                      <div className="divider" />
                    </ListItem>
                  </List>
                </Container>
              </div>
            </div>
          </div>
          <Container className="z-over py-5">
            <div
              className={clsx('tab-item-wrapper overflow-visible d-none', {
                'd-block active': activeTab2 === '1'
              })}
              index={1}>
              <div className="mb-spacing-6-x2">
                <Grid container spacing={6}>
                  <Grid item lg={4}>
                    <Card className="card-box p-4">
                      <div className="card-tr-actions">
                        <Button
                          className="p-0 d-20 mr-1 btn-transition-none opacity-6 btn-link"
                          variant="text">
                          <FontAwesomeIcon
                            icon={['far', 'heart']}
                            className="font-size-sm"
                          />
                        </Button>
                        <Button
                          className="p-0 d-20 btn-transition-none opacity-6 btn-link"
                          variant="text">
                          <FontAwesomeIcon
                            icon={['fas', 'user']}
                            className="font-size-sm"
                          />
                        </Button>
                      </div>
                      <div className="d-flex align-items-center justify-content-between py-2">
                        <div className="d-50 rounded-circle border-0 my-2 card-icon-wrapper bg-second text-white btn-icon text-center">
                          <FontAwesomeIcon
                            icon={['far', 'bell']}
                            className="font-size-xl"
                          />
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="badge rounded-circle badge-success d-20 btn-icon p-0 mr-0 mr-xl-2">
                            <FontAwesomeIcon
                              icon={['fas', 'check']}
                              className="font-size-sm"
                            />
                          </div>
                          <span className="font-size-xs text-dark d-none d-xl-block">
                            Target achieved
                          </span>
                        </div>
                      </div>
                      <div className="font-size-xl font-weight-bold pt-2 text-black">
                        Recent Visitors
                      </div>
                      <div className="opacity-7">Today's analytics</div>
                    </Card>
                  </Grid>
                  <Grid item lg={4}>
                    <Card className="card-box p-4">
                      <div className="card-tr-actions">
                        <Button
                          className="p-0 d-20 mr-1 btn-transition-none opacity-6 btn-link"
                          variant="text">
                          <FontAwesomeIcon
                            icon={['far', 'heart']}
                            className="font-size-sm"
                          />
                        </Button>
                        <Button
                          className="p-0 d-20 btn-transition-none opacity-6 btn-link"
                          variant="text">
                          <FontAwesomeIcon
                            icon={['fas', 'user']}
                            className="font-size-sm"
                          />
                        </Button>
                      </div>
                      <div className="d-flex align-items-center justify-content-between py-2">
                        <div className="d-50 rounded-circle border-0 my-2 card-icon-wrapper bg-info text-white btn-icon text-center">
                          <FontAwesomeIcon
                            icon={['fas', 'camera-retro']}
                            className="font-size-xl"
                          />
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="badge rounded-circle badge-success d-20 btn-icon p-0 mr-0 mr-xl-2">
                            <FontAwesomeIcon
                              icon={['fas', 'check']}
                              className="font-size-sm"
                            />
                          </div>
                          <span className="font-size-xs text-dark d-none d-xl-block">
                            Target achieved
                          </span>
                        </div>
                      </div>
                      <div className="font-size-xl font-weight-bold pt-2 text-black">
                        Today's Revenue
                      </div>
                      <div className="opacity-7">Successful orders</div>
                    </Card>
                  </Grid>
                  <Grid item lg={4}>
                    <Card className="card-box p-4">
                      <div className="card-tr-actions">
                        <Button
                          className="p-0 d-20 mr-1 btn-transition-none opacity-6 btn-link"
                          variant="text">
                          <FontAwesomeIcon
                            icon={['far', 'heart']}
                            className="font-size-sm"
                          />
                        </Button>
                        <Button
                          className="p-0 d-20 btn-transition-none opacity-6 btn-link"
                          variant="text">
                          <FontAwesomeIcon
                            icon={['fas', 'user']}
                            className="font-size-sm"
                          />
                        </Button>
                      </div>
                      <div className="d-flex align-items-center justify-content-between py-2">
                        <div className="d-50 rounded-circle border-0 my-2 card-icon-wrapper bg-warning text-white btn-icon text-center">
                          <FontAwesomeIcon
                            icon={['far', 'lightbulb']}
                            className="font-size-xl"
                          />
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="badge rounded-circle badge-danger d-20 btn-icon p-0 mr-0 mr-xl-2">
                            <FontAwesomeIcon
                              icon={['fas', 'times']}
                              className="font-size-sm"
                            />
                          </div>
                          <span className="font-size-xs text-danger d-none d-xl-block">
                            Target failed
                          </span>
                        </div>
                      </div>
                      <div className="font-size-xl font-weight-bold pt-2 text-black">
                        New Customers
                      </div>
                      <div className="opacity-7">Latest statistics</div>
                    </Card>
                  </Grid>
                </Grid>
              </div>
              <Card className="card-box mb-spacing-6-x2">
                <Grid container spacing={0}>
                  <Grid item xl={4} className="p-4">
                    <div className="divider-v divider-v-lg" />

                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <b>Reports</b>
                        <div className="text-black-50">
                          Monthly sales reports
                        </div>
                      </div>
                      <div className="font-weight-bold text-danger font-size-xl">
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
                      <div>
                        <b>User</b>
                        <div className="text-black-50">Visitors last week</div>
                      </div>
                      <div className="font-weight-bold text-success font-size-xl">
                        <CountUp
                          start={0}
                          end={987}
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
                      <div>
                        <b>Sales</b>
                        <div className="text-black-50">
                          Total average weekly report
                        </div>
                      </div>
                      <div className="font-weight-bold text-warning font-size-xl">
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
                  </Grid>
                  <Grid item xl={4} className="p-4">
                    <div className="divider-v divider-v-lg" />

                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <b>Stats</b>
                        <div className="text-black-50">Last month targets</div>
                      </div>
                      <div className="font-weight-bold text-warning font-size-xl">
                        $1,23M
                      </div>
                    </div>
                    <div className="divider my-3" />
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <b>Payments</b>
                        <div className="text-black-50">Week's expenses</div>
                      </div>
                      <div className="font-weight-bold text-danger font-size-xl">
                        - $123,305
                      </div>
                    </div>
                    <div className="divider my-3" />
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <b>Orders</b>
                        <div className="text-black-50">
                          Total products ordered
                        </div>
                      </div>
                      <div className="font-weight-bold text-warning font-size-xl">
                        65
                      </div>
                    </div>
                  </Grid>
                  <Grid item xl={4} className="p-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <b>Deliveries</b>
                        <div className="text-black-50">
                          Deliveries total report
                        </div>
                      </div>
                      <div className="font-weight-bold text-info font-size-xl">
                        $33,1k
                      </div>
                    </div>
                    <div className="divider my-3" />
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <b>Tasks</b>
                        <div className="text-black-50">
                          Pending task actions
                        </div>
                      </div>
                      <div className="font-weight-bold text-success font-size-xl">
                        34
                      </div>
                    </div>
                    <div className="divider my-3" />
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <b>Issues</b>
                        <div className="text-black-50">
                          Server errors and issues
                        </div>
                      </div>
                      <div className="font-weight-bold text-danger font-size-xl">
                        346
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Card>
              <div className="mb-spacing-6-x2">
                <Grid container spacing={6}>
                  <Grid item lg={6} className="d-flex">
                    <Card className="w-100 shadow-xxl mb-5">
                      <div className="card-header">
                        <div className="card-header--title">
                          <small className="d-block text-uppercase mt-1">
                            Activity
                          </small>
                          <b>Your recent activities</b>
                        </div>
                      </div>
                      <div className="bg-secondary py-2 text-center px-4">
                        <ButtonGroup size="small">
                          <Button
                            className={clsx(
                              'btn-transition-none btn-primary font-size-sm',
                              { active: activeTab === '1' }
                            )}
                            onClick={() => {
                              toggle('1');
                            }}>
                            Activity
                          </Button>
                          <Button
                            className={clsx(
                              'btn-transition-none btn-primary font-size-sm',
                              { active: activeTab === '2' }
                            )}
                            onClick={() => {
                              toggle('2');
                            }}>
                            Trading
                          </Button>
                        </ButtonGroup>
                      </div>
                      <div className="divider" />

                      <div
                        className={clsx('tab-item-wrapper', {
                          active: activeTab === '1'
                        })}
                        index={1}>
                        <div className="pl-3">
                          <div className="scroll-area shadow-overflow">
                            <PerfectScrollbar>
                              <div className="timeline-list timeline-list-offset timeline-list-offset-dot py-3">
                                <div className="timeline-item">
                                  <div className="timeline-item-offset">
                                    12 Feb
                                  </div>
                                  <div className="timeline-item--content">
                                    <div className="timeline-item--icon" />
                                    <h4 className="timeline-item--label mb-2 font-weight-bold">
                                      <div className="badge badge-success">
                                        sell/market
                                      </div>
                                    </h4>
                                    <p>
                                      You sold <b>12 ETH</b> for <b>3478 USD</b>
                                      .
                                    </p>
                                  </div>
                                </div>
                                <div className="timeline-item">
                                  <div className="timeline-item-offset">
                                    11 Feb
                                  </div>
                                  <div className="timeline-item--content">
                                    <div className="timeline-item--icon" />
                                    <h4 className="timeline-item--label mb-2 font-weight-bold">
                                      Invite code sent
                                    </h4>
                                    <p>Your friends joined the platform.</p>
                                    <div className="avatar-wrapper-overlap mt-2 mb-1">
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
                                  <div className="timeline-item-offset">
                                    9 Feb
                                  </div>
                                  <div className="timeline-item--content">
                                    <div className="timeline-item--icon" />
                                    <h4 className="timeline-item--label mb-2 font-weight-bold">
                                      Uploaded documents
                                    </h4>
                                    <p>
                                      You uploaded the following documents onto
                                      the crypto platform:
                                    </p>
                                    <div className="mt-3">
                                      <a
                                        href="#/"
                                        onClick={(e) => e.preventDefault()}>
                                        <img
                                          alt="..."
                                          className="img-fluid rounded mr-3 shadow-sm"
                                          src={people1}
                                          width="70"
                                        />
                                      </a>
                                      <a
                                        href="#/"
                                        onClick={(e) => e.preventDefault()}>
                                        <img
                                          alt="..."
                                          className="img-fluid rounded shadow-sm"
                                          src={people3}
                                          width="70"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="timeline-item">
                                  <div className="timeline-item-offset">
                                    9 Feb
                                  </div>
                                  <div className="timeline-item--content">
                                    <div className="timeline-item--icon" />
                                    <h4 className="timeline-item--label mb-2 font-weight-bold">
                                      Profile verification
                                    </h4>
                                    <p>
                                      You partially submitted the required
                                      documents.
                                    </p>
                                    <div className="mt-2">
                                      <Button
                                        size="small"
                                        className="btn-warning">
                                        Submit remaining docs
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                <div className="timeline-item">
                                  <div className="timeline-item-offset">
                                    6 Feb
                                  </div>
                                  <div className="timeline-item--content">
                                    <div className="timeline-item--icon" />
                                    <h4 className="timeline-item--label mb-2 font-weight-bold">
                                      Joined bamburgh
                                    </h4>
                                    <p>
                                      Welcome to the platform. Enjoy your stay
                                      here!
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </PerfectScrollbar>
                          </div>
                        </div>
                        <div className="card-footer p-3 text-center">
                          <Button
                            size="small"
                            className="py-2 px-4 btn-primary">
                            <span className="btn-wrapper--label text-uppercase font-weight-bold">
                              View all activity
                            </span>
                          </Button>
                        </div>
                      </div>
                      <div
                        className={clsx('tab-item-wrapper', {
                          active: activeTab === '2'
                        })}
                        index={2}>
                        <div className="scroll-area shadow-overflow">
                          <PerfectScrollbar>
                            <List component="div" className="list-group-flush">
                              <ListItem className="d-flex justify-content-between align-items-center py-3">
                                <div className="d-flex align-items-center mr-4">
                                  <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill font-size-lg mr-3 bg-success">
                                    <TrendingDownTwoToneIcon />
                                  </div>
                                  <div>
                                    <div className="font-weight-bold">
                                      Received Bitcoin
                                    </div>
                                    <span className="text-black opacity-5 d-block">
                                      To <b>My Bitcoin Wallet</b>
                                    </span>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center">
                                  <div className="text-right mr-3">
                                    <div className="font-weight-bold font-size-lg">
                                      0.234894 BTC
                                    </div>
                                    <div className="font-weight-bold text-black opacity-4">
                                      $438
                                    </div>
                                  </div>
                                </div>
                              </ListItem>
                              <ListItem className="d-flex justify-content-between align-items-center py-3">
                                <div className="d-flex align-items-center mr-4">
                                  <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill font-size-lg mr-3 bg-first">
                                    <TrendingUpTwoToneIcon />
                                  </div>
                                  <div>
                                    <div className="font-weight-bold">
                                      Sent Ethereum
                                    </div>
                                    <span className="text-black opacity-5 d-block">
                                      From <b>Ether Wallet</b>
                                    </span>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center">
                                  <div className="text-right mr-3">
                                    <div className="font-weight-bold font-size-lg">
                                      1.3984 ETH
                                    </div>
                                    <div className="font-weight-bold text-black opacity-4">
                                      $1,495 USD
                                    </div>
                                  </div>
                                </div>
                              </ListItem>
                              <ListItem className="d-flex justify-content-between align-items-center py-3">
                                <div className="d-flex align-items-center mr-4">
                                  <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill font-size-lg mr-3 bg-danger">
                                    <ArrowBackTwoToneIcon />
                                  </div>
                                  <div>
                                    <div className="font-weight-bold">
                                      Withdraw to bank account
                                    </div>
                                    <span className="text-black opacity-5 d-block">
                                      From <b>Total Balance</b>
                                    </span>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center">
                                  <div className="text-right mr-3">
                                    <div className="font-weight-bold text-danger font-size-lg">
                                      -23,549 USD
                                    </div>
                                  </div>
                                </div>
                              </ListItem>
                              <ListItem className="py-4 text-center text-black-50 d-block">
                                You've reached the end of the trading list!
                              </ListItem>
                            </List>
                          </PerfectScrollbar>
                        </div>
                        <div className="card-footer p-3 text-center">
                          <Button
                            size="small"
                            className="py-2 px-4 btn-primary">
                            <span className="btn-wrapper--label text-uppercase font-weight-bold">
                              View all transactions
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                  <Grid item lg={6}>
                    <Card className="overflow-visible shadow-xxl w-100">
                      <div className="card-header d-flex justify-content-between align-items-center">
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
                        <div className="font-size-sm font-weight-bold">
                          Emma Taylor
                        </div>
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
                            <Button
                              size="small"
                              className="btn-neutral-dark px-3">
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
                            <Button
                              size="small"
                              className="btn-neutral-dark px-3">
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
                            <Button
                              size="small"
                              className="btn-neutral-dark px-3">
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
                </Grid>
              </div>
            </div>
            <div
              className={clsx('tab-item-wrapper overflow-visible d-none', {
                'd-block active': activeTab2 === '4'
              })}
              index={4}>
              <Grid container spacing={6}>
                <Grid item xl={6}>
                  <Card className="card-box p-4">
                    <div className="d-flex align-items-center justify-content-between py-2">
                      <div className="d-flex align-items-center">
                        <div className="avatar-icon-wrapper d-50 mr-3 avatar-initials">
                          <div className="avatar-icon rounded-circle d-50 shadow-sm font-weight-normal text-white bg-danger">
                            TS
                          </div>
                        </div>
                        <div>
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold"
                            title="...">
                            Shanelle Wynn
                          </a>
                          <span className="text-black-50 d-block">
                            UI Engineer, Apple Inc.
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="badge rounded-circle badge-neutral-success text-success d-30 btn-icon p-0 mr-1">
                          <FontAwesomeIcon icon={['fas', 'check']} />
                        </div>
                        <span className="font-size-xs text-success">
                          Profile Verified
                        </span>
                      </div>
                    </div>
                    <div className="divider mx-auto my-3 w-100" />
                    <div className="text-center">
                      <Button
                        className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none btn-outline-primary border-0"
                        variant="text">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['far', 'eye']} />
                        </span>
                      </Button>
                      <Button
                        className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none btn-outline-primary border-0"
                        variant="text">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['far', 'heart']} />
                        </span>
                      </Button>
                      <Button
                        className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none btn-outline-primary border-0"
                        variant="text">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['fas', 'user']} />
                        </span>
                      </Button>
                    </div>
                    <div className="divider mx-auto my-3 w-100" />
                    <Grid container spacing={6} className="text-center">
                      <Grid item sm={4}>
                        <div className="text-black-50">Projects</div>
                        <b className="font-size-lg">381</b>
                      </Grid>
                      <Grid item sm={4}>
                        <div className="text-black-50">Reviews</div>
                        <b className="font-size-lg">129</b>
                      </Grid>
                      <Grid item sm={4}>
                        <div className="text-black-50">Revenue</div>
                        <b className="font-size-lg">$691</b>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xl={6}>
                  <Card className="card-box p-4">
                    <div className="d-flex align-items-center justify-content-between py-2">
                      <div className="d-flex align-items-center">
                        <div className="avatar-icon-wrapper d-50 mr-3">
                          <div className="avatar-icon rounded-circle d-50 shadow-sm">
                            <img alt="..." src={avatar2} />
                          </div>
                        </div>
                        <div>
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold"
                            title="...">
                            Richard Doyle
                          </a>
                          <span className="text-black-50 d-block">
                            Senior Consultant, Google
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="badge rounded-circle badge-neutral-warning text-warning d-30 btn-icon p-0 mr-1">
                          <FontAwesomeIcon icon={['far', 'clock']} />
                        </div>
                        <span className="font-size-xs text-warning">
                          Review Pending
                        </span>
                      </div>
                    </div>
                    <div className="divider mx-auto my-3 w-100" />
                    <div className="text-center">
                      <Button
                        className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none btn-outline-primary border-0"
                        variant="text">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['far', 'eye']} />
                        </span>
                      </Button>
                      <Button
                        className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none btn-outline-primary border-0"
                        variant="text">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['far', 'heart']} />
                        </span>
                      </Button>
                      <Button
                        className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none btn-outline-primary border-0"
                        variant="text">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['fas', 'user']} />
                        </span>
                      </Button>
                    </div>
                    <div className="divider mx-auto my-3 w-100" />
                    <Grid container spacing={6} className="text-center">
                      <Grid item sm={4}>
                        <div className="text-black-50">Projects</div>
                        <b className="font-size-lg">34</b>
                      </Grid>
                      <Grid item sm={4}>
                        <div className="text-black-50">Reviews</div>
                        <b className="font-size-lg">21</b>
                      </Grid>
                      <Grid item sm={4}>
                        <div className="text-black-50">Revenue</div>
                        <b className="font-size-lg">$283</b>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xl={6}>
                  <Card className="card-box p-4">
                    <div className="d-flex align-items-center justify-content-between py-2">
                      <div className="d-flex align-items-center">
                        <div className="avatar-icon-wrapper d-50 mr-3">
                          <div className="avatar-icon rounded-circle d-50 shadow-sm">
                            <img alt="..." src={avatar7} />
                          </div>
                        </div>
                        <div>
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold"
                            title="...">
                            Johnny Becks
                          </a>
                          <span className="text-black-50 d-block">
                            Lead UX Designer, Spotify
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="badge rounded-circle badge-neutral-danger text-danger d-30 btn-icon p-0 mr-1">
                          <FontAwesomeIcon icon={['fas', 'times']} />
                        </div>
                        <span className="font-size-xs text-danger">
                          Rejected
                        </span>
                      </div>
                    </div>
                    <div className="divider mx-auto my-3 w-100" />
                    <div className="text-center">
                      <Button
                        disabled
                        className="p-0 d-30 btn-icon rounded-sm border-0 mx-1 btn-transition-none btn-outline-primary">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['far', 'eye']} />
                        </span>
                      </Button>
                      <Button
                        disabled
                        className="p-0 d-30 btn-icon rounded-sm border-0 mx-1 btn-transition-none btn-outline-primary">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['far', 'heart']} />
                        </span>
                      </Button>
                      <Button
                        disabled
                        className="p-0 d-30 btn-icon rounded-sm border-0 mx-1 btn-transition-none btn-outline-primary">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['fas', 'user']} />
                        </span>
                      </Button>
                    </div>
                    <div className="divider mx-auto my-3 w-100" />
                    <Grid
                      container
                      spacing={6}
                      className="text-center opacity-6">
                      <Grid item sm={4}>
                        <div className="text-black-50">Projects</div>
                        <b className="font-size-lg">0</b>
                      </Grid>
                      <Grid item sm={4}>
                        <div className="text-black-50">Reviews</div>
                        <b className="font-size-lg">0</b>
                      </Grid>
                      <Grid item sm={4}>
                        <div className="text-black-50">Revenue</div>
                        <b className="font-size-lg">$0</b>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xl={6}>
                  <Card className="card-box p-4">
                    <div className="d-flex align-items-center justify-content-between py-2">
                      <div className="d-flex align-items-center">
                        <div className="avatar-icon-wrapper d-50 mr-3 avatar-initials">
                          <div className="avatar-icon rounded-circle d-50 shadow-sm font-weight-normal text-white bg-danger">
                            TS
                          </div>
                        </div>
                        <div>
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold"
                            title="...">
                            Shanelle Wynn
                          </a>
                          <span className="text-black-50 d-block">
                            UI Engineer, Apple Inc.
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="badge rounded-circle badge-neutral-success text-success d-30 btn-icon p-0 mr-1">
                          <FontAwesomeIcon icon={['fas', 'check']} />
                        </div>
                        <span className="font-size-xs text-success">
                          Profile Verified
                        </span>
                      </div>
                    </div>
                    <div className="divider mx-auto my-3 w-100" />
                    <div className="text-center">
                      <Button
                        className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none btn-outline-primary border-0"
                        variant="text">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['far', 'eye']} />
                        </span>
                      </Button>
                      <Button
                        className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none btn-outline-primary border-0"
                        variant="text">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['far', 'heart']} />
                        </span>
                      </Button>
                      <Button
                        className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none btn-outline-primary border-0"
                        variant="text">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['fas', 'user']} />
                        </span>
                      </Button>
                    </div>
                    <div className="divider mx-auto my-3 w-100" />
                    <Grid container spacing={6} className="text-center">
                      <Grid item sm={4}>
                        <div className="text-black-50">Projects</div>
                        <b className="font-size-lg">381</b>
                      </Grid>
                      <Grid item sm={4}>
                        <div className="text-black-50">Reviews</div>
                        <b className="font-size-lg">129</b>
                      </Grid>
                      <Grid item sm={4}>
                        <div className="text-black-50">Revenue</div>
                        <b className="font-size-lg">$691</b>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xl={6}>
                  <Card className="card-box p-4">
                    <div className="d-flex align-items-center justify-content-between py-2">
                      <div className="d-flex align-items-center">
                        <div className="avatar-icon-wrapper d-50 mr-3">
                          <div className="avatar-icon rounded-circle d-50 shadow-sm">
                            <img alt="..." src={avatar2} />
                          </div>
                        </div>
                        <div>
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold"
                            title="...">
                            Richard Doyle
                          </a>
                          <span className="text-black-50 d-block">
                            Senior Consultant, Google
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="badge rounded-circle badge-neutral-warning text-warning d-30 btn-icon p-0 mr-1">
                          <FontAwesomeIcon icon={['far', 'clock']} />
                        </div>
                        <span className="font-size-xs text-warning">
                          Review Pending
                        </span>
                      </div>
                    </div>
                    <div className="divider mx-auto my-3 w-100" />
                    <div className="text-center">
                      <Button
                        className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none btn-outline-primary border-0"
                        variant="text">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['far', 'eye']} />
                        </span>
                      </Button>
                      <Button
                        className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none btn-outline-primary border-0"
                        variant="text">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['far', 'heart']} />
                        </span>
                      </Button>
                      <Button
                        className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none btn-outline-primary border-0"
                        variant="text">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['fas', 'user']} />
                        </span>
                      </Button>
                    </div>
                    <div className="divider mx-auto my-3 w-100" />
                    <Grid container spacing={6} className="text-center">
                      <Grid item sm={4}>
                        <div className="text-black-50">Projects</div>
                        <b className="font-size-lg">34</b>
                      </Grid>
                      <Grid item sm={4}>
                        <div className="text-black-50">Reviews</div>
                        <b className="font-size-lg">21</b>
                      </Grid>
                      <Grid item sm={4}>
                        <div className="text-black-50">Revenue</div>
                        <b className="font-size-lg">$283</b>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xl={6}>
                  <Card className="card-box p-4">
                    <div className="d-flex align-items-center justify-content-between py-2">
                      <div className="d-flex align-items-center">
                        <div className="avatar-icon-wrapper d-50 mr-3">
                          <div className="avatar-icon rounded-circle d-50 shadow-sm">
                            <img alt="..." src={avatar7} />
                          </div>
                        </div>
                        <div>
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold"
                            title="...">
                            Johnny Becks
                          </a>
                          <span className="text-black-50 d-block">
                            Lead UX Designer, Spotify
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="badge rounded-circle badge-neutral-danger text-danger d-30 btn-icon p-0 mr-1">
                          <FontAwesomeIcon icon={['fas', 'times']} />
                        </div>
                        <span className="font-size-xs text-danger">
                          Rejected
                        </span>
                      </div>
                    </div>
                    <div className="divider mx-auto my-3 w-100" />
                    <div className="text-center">
                      <Button
                        disabled
                        className="p-0 d-30 btn-icon rounded-sm border-0 mx-1 btn-transition-none btn-outline-primary">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['far', 'eye']} />
                        </span>
                      </Button>
                      <Button
                        disabled
                        className="p-0 d-30 btn-icon rounded-sm border-0 mx-1 btn-transition-none btn-outline-primary">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['far', 'heart']} />
                        </span>
                      </Button>
                      <Button
                        disabled
                        className="p-0 d-30 btn-icon rounded-sm border-0 mx-1 btn-transition-none btn-outline-primary">
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['fas', 'user']} />
                        </span>
                      </Button>
                    </div>
                    <div className="divider mx-auto my-3 w-100" />
                    <Grid
                      container
                      spacing={6}
                      className="text-center opacity-6">
                      <Grid item sm={4}>
                        <div className="text-black-50">Projects</div>
                        <b className="font-size-lg">0</b>
                      </Grid>
                      <Grid item sm={4}>
                        <div className="text-black-50">Reviews</div>
                        <b className="font-size-lg">0</b>
                      </Grid>
                      <Grid item sm={4}>
                        <div className="text-black-50">Revenue</div>
                        <b className="font-size-lg">$0</b>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </div>
            <div
              className={clsx('tab-item-wrapper overflow-visible d-none', {
                'd-block active': activeTab2 === '3'
              })}
              index={3}>
              <div className="py-5">
                <div className="pt-3 pb-1">
                  <div className="timeline-list timeline-list-horizontal">
                    <ul className="d-flex justify-content-center flex-wrap">
                      <li className="timeline-item timeline-item-icon">
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon-wrapper bg-danger text-white">
                            <FontAwesomeIcon icon={['far', 'gem']} />
                          </div>
                          <h4 className="timeline-item--label mb-2 font-weight-bold">
                            Lunch with investors
                          </h4>
                          <p>
                            Mosaic, the first graphical browser, is introduced
                            to the average consumer.
                          </p>
                        </div>
                      </li>
                      <li className="timeline-item timeline-item-icon">
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon-wrapper bg-success text-white">
                            <FontAwesomeIcon icon={['far', 'keyboard']} />
                          </div>
                          <h4 className="timeline-item--label mb-2 font-weight-bold">
                            Create new accounts
                          </h4>
                          <p>
                            MySpace becomes the most popular social network.
                          </p>
                          <div className="mt-3">
                            <a href="#/" onClick={(e) => e.preventDefault()}>
                              <img
                                alt="..."
                                className="img-fluid rounded mr-3 shadow-sm"
                                src={people3}
                                width="70"
                              />
                            </a>
                            <a href="#/" onClick={(e) => e.preventDefault()}>
                              <img
                                alt="..."
                                className="img-fluid rounded shadow-sm"
                                src={people2}
                                width="70"
                              />
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="timeline-item timeline-item-icon">
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon-wrapper bg-midnight-bloom text-white">
                            <FontAwesomeIcon icon={['far', 'bell']} />
                          </div>
                          <h4 className="timeline-item--label mb-2 font-weight-bold">
                            Lunch with investors
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
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={clsx('tab-item-wrapper overflow-visible d-none', {
                'd-block active': activeTab2 === '2'
              })}
              index={2}>
              <Grid container spacing={6}>
                <Grid item lg={6}>
                  <Card className="shadow-sm rounded-lg overflow-hidden mb-5">
                    <div className="card-img-wrapper rounded">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="img-wrapper-overlay p-4 p-xl-5 img-wrapper-overlay--visible rounded">
                        <div className="overlay-btn-wrapper card-body text-white text-center">
                          <h5 className="px-2 font-weight-bold display-4 mb-4">
                            Bamburgh React Admin Dashboard with Material-UI PRO
                          </h5>
                          <p className="font-size-lg text-white-50 mb-0">
                            Premium admin template powered by the most popular
                            UI components framework available for React:
                            Material-UI. Features hundreds of examples making
                            web development fast and easy. Start from one of the
                            individual apps included or from the general
                            dashboard and build beautiful scalable applications
                            and presentation websites.
                          </p>
                          <div className="mt-4">
                            <div className="avatar-icon-wrapper mx-auto mb-2">
                              <div className="avatar-icon shadow-sm-dark">
                                <img alt="..." src={avatar6} />
                              </div>
                            </div>
                            <div>Dalia Finney</div>
                          </div>
                        </div>
                        <div className="card-badges card-badges-top">
                          <div className="badge badge-pill badge-danger">
                            Development
                          </div>
                        </div>
                      </a>
                      <img
                        src={stock1}
                        className="card-overlay-image img-fit-container rounded"
                        alt="..."
                      />
                    </div>
                  </Card>
                  <Card className="shadow-sm rounded-lg overflow-hidden mb-5">
                    <div className="card-img-wrapper rounded">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="p-4 p-lg-5 img-wrapper-overlay img-wrapper-overlay--visible shadow-none rounded">
                        <div className="overlay-btn-wrapper d-block p-3 p-lg-5 text-left text-white">
                          <h5 className="font-weight-bold display-3 mb-3">
                            Bamburgh React Admin Dashboard with Material-UI PRO
                          </h5>
                          <p className="font-size-lg mb-3">
                            You can build unlimited layout styles using any of
                            the 500+ included components and elements. Powerful,
                            unique template built for React and Material-UI.
                          </p>
                          <p className="font-size-md text-white-50">
                            Premium admin template powered by the most popular
                            UI components framework available for React:
                            Material-UI. Features hundreds of examples making
                            web development fast and easy. Start from one of the
                            individual apps included or from the general
                            dashboard and build beautiful scalable applications
                            and presentation websites.
                          </p>
                          <p className="font-size-md text-white-50">
                            View any of the 5+ live previews we&#39;ve set up to
                            learn why this dashboard template is the last one
                            you&#39;ll ever need!
                          </p>

                          <div className="divider bg-white opacity-1 my-4" />
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <div className="avatar-icon-wrapper mr-3">
                                <div className="avatar-icon shadow-sm-dark">
                                  <img alt="..." src={avatar3} />
                                </div>
                              </div>
                              <div className="font-size-lg">Shanelle Wynn</div>
                            </div>
                            <div className="d-flex align-items-center text-white-50">
                              <FontAwesomeIcon
                                icon={['far', 'clock']}
                                className="mr-2"
                              />
                              <small>5 days ago</small>
                            </div>
                          </div>
                        </div>
                        <div className="card-badges card-badges-top">
                          <div className="badge badge-pill badge-success">
                            Marketing
                          </div>
                        </div>
                      </a>
                      <img
                        src={stock3}
                        className="card-overlay-image img-fit-container rounded"
                        alt="..."
                      />
                    </div>
                  </Card>
                </Grid>
                <Grid item lg={6}>
                  <Card className="shadow-sm rounded-lg overflow-hidden hover-scale-sm mb-5">
                    <div className="card-img-wrapper rounded">
                      <div className="img-wrapper-overlay align-items-end img-wrapper-overlay--visible p-4 p-xl-5">
                        <div className="overlay-btn-wrapper p-4 card-body text-white">
                          <h5 className="px-2 font-weight-bold display-4 mb-4">
                            Bamburgh React Admin Dashboard with Material-UI PRO
                          </h5>
                          <p className="font-size-lg mb-0 text-white-50">
                            Premium admin template powered by the most popular
                            UI components framework available for React:
                            Material-UI. Features hundreds of examples making
                            web development fast and easy. Start from one of the
                            individual apps included or from the general
                            dashboard and build beautiful scalable applications
                            and presentation websites.
                          </p>
                          <div className="mt-4">
                            <div className="avatar-icon-wrapper mx-auto mb-2">
                              <div className="avatar-icon shadow-sm-dark">
                                <img alt="..." src={avatar7} />
                              </div>
                            </div>
                            <div>Miranda Lawson</div>
                          </div>
                        </div>
                      </div>
                      <div className="card-badges">
                        <div className="badge badge-pill badge-neutral-success text-success">
                          Marketing
                        </div>
                      </div>
                      <img
                        src={stock2}
                        className="card-overlay-image img-fit-container rounded"
                        alt="..."
                      />
                    </div>
                  </Card>
                  <Card className="shadow-sm rounded-lg overflow-hidden mb-5">
                    <div className="card-img-wrapper rounded">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="img-wrapper-overlay img-wrapper-overlay--visible shadow-none rounded">
                        <div className="overlay-btn-wrapper p-4 p-lg-5 text-left text-white">
                          <div className="d-flex align-items-center">
                            <div className="avatar-icon-wrapper mr-3">
                              <div className="avatar-icon shadow-sm-dark">
                                <img alt="..." src={avatar3} />
                              </div>
                            </div>
                            <div>
                              <div>Shanelle Wynn</div>
                              <span className="text-white-50">
                                UI Engineer, Apple Inc.
                              </span>
                            </div>
                          </div>

                          <div className="divider bg-white opacity-2 my-3 my-lg-5" />

                          <h5 className="font-weight-bold display-3">
                            Bamburgh React Admin Dashboard with Material-UI PRO
                          </h5>
                          <p className="font-size-lg my-3 text-white-50">
                            View any of the 5+ live previews we&#39;ve set up to
                            learn why this dashboard template is the last one
                            you&#39;ll ever need!
                          </p>
                          <p className="text-light">
                            Premium admin template powered by the most popular
                            UI components framework available for React:
                            Material-UI. Features hundreds of examples making
                            web development fast and easy. Start from one of the
                            individual apps included or from the general
                            dashboard and build beautiful scalable applications
                            and presentation websites.
                          </p>

                          <div className="divider bg-white opacity-2 my-3 my-lg-5" />

                          <div className="d-flex align-items-center text-white-50">
                            <FontAwesomeIcon
                              icon={['far', 'clock']}
                              className="mr-2"
                            />
                            <small>added 3 days ago</small>
                          </div>
                        </div>
                        <div className="card-badges card-badges-bottom">
                          <div className="badge badge-first">Articles</div>
                        </div>
                      </a>
                      <img
                        src={stock3}
                        className="card-overlay-image img-fit-container rounded"
                        alt="..."
                      />
                    </div>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Container>

          <div
            className="hero-wrapper bg-composed-wrapper bg-second z-below"
            style={{ marginTop: '-150px' }}>
            <div className="hero-wrapper--content flex-column">
              <div className="shape-container-bottom-2 w-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill="var(--white)"
                    fillOpacity="1"
                    d="M0,288L34.3,250.7C68.6,213,137,139,206,144C274.3,149,343,235,411,229.3C480,224,549,128,617,101.3C685.7,75,754,117,823,122.7C891.4,128,960,96,1029,112C1097.1,128,1166,192,1234,186.7C1302.9,181,1371,107,1406,69.3L1440,32L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path>
                </svg>
              </div>
              <div
                className="bg-composed-wrapper--image opacity-3"
                style={{ backgroundImage: 'url(' + hero1 + ')' }}
              />
              <div className="bg-composed-wrapper--bg bg-deep-sky opacity-4" />
              <div className="bg-composed-wrapper--content pb-5">
                <Container className="py-5 text-center">
                  <div className="py-5 py-sm-0">
                    <div>
                      <h4 className="font-weight-bold text-white display-4">
                        Monthly Subscription
                      </h4>
                      <Grid item md={8} lg={6} className="mx-auto">
                        <p className="text-white opacity-8 mt-3 mb-5 font-size-xl">
                          View any of the 5+ live previews we&#39;ve set up to
                          learn why this dashboard template is the last one
                          you&#39;ll ever need!
                        </p>
                      </Grid>
                    </div>
                    <Button className="btn-success px-5 font-size-lg shadow-sm-dark py-3 btn-pill mx-2">
                      Buy Now
                    </Button>
                    <Button className="btn-primary bg-white px-4 text-second shadow-sm font-weight-bold py-2 btn-pill mx-2">
                      Learn more
                    </Button>
                  </div>
                </Container>
              </div>
              <div className="shape-container-top-1 w-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill="var(--white)"
                    fillOpacity="1"
                    d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,202.7C672,213,768,235,864,213.3C960,192,1056,128,1152,133.3C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
