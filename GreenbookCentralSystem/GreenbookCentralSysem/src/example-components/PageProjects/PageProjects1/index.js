import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Table,
  Grid,
  InputAdornment,
  ButtonGroup,
  Card,
  Button,
  List,
  ListItem,
  TextField
} from '@material-ui/core';

import Pagination from '@material-ui/lab/Pagination';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import Trend from 'react-trend';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

import GridOnTwoToneIcon from '@material-ui/icons/GridOnTwoTone';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import ViewCompactTwoToneIcon from '@material-ui/icons/ViewCompactTwoTone';

export default function LivePreviewExample() {
  const [inputBg, setInputBg] = useState(false);
  const toggleInputBg = () => setInputBg(!inputBg);

  const [searchStatus3, setSearchStatus3] = useState(false);
  const toggleSearch3 = () => setSearchStatus3(!searchStatus3);

  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);

  const toggleSidebarMenu = () => setIsSidebarMenuOpen(!isSidebarMenuOpen);

  return (
    <>
      <div className="app-inner-content-layout app-inner-content-layout-fixed">
        <div className="d-flex d-lg-none p-4 order-0 justify-content-end align-items-center">
          <Button
            onClick={toggleSidebarMenu}
            size="small"
            className="btn-primary p-0 btn-icon d-40">
            <FontAwesomeIcon icon={['fas', 'ellipsis-v']} />
          </Button>
        </div>
        <div className="app-inner-content-layout--main bg-white p-0">
          <PerfectScrollbar>
            <div className="card-header d-block text-center text-sm-left d-sm-flex justify-content-between rounded-0 bg-white px-5 py-4 border-bottom">
              <div className="font-weight-bold display-4 mb-3 mb-sm-0">
                Projects
              </div>
              <div>
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  size="small"
                  className="btn-primary">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'plus']} />
                  </span>
                  <span className="btn-wrapper--label">Create New Project</span>
                </Button>
              </div>
            </div>
            <div className="px-5 pt-5">
              <Card className="d-block d-md-flex text-center text-md-left card-box p-4 align-items-center bg-secondary justify-content-between flex-row">
                <div className="d-block d-md-flex align-items-center">
                  <div>
                    <b className="font-size-lg">374</b> total projects
                  </div>
                  <div className="mx-4 d-none d-md-block">
                    <div className="divider-v bg-dark opacity-3 position-relative" />
                    <div className="divider-v bg-dark opacity-3 position-relative" />
                  </div>
                  <div className="d-flex d-md-block justify-content-center py-3 py-md-0">
                    <div
                      className={clsx('search-wrapper search-wrapper--grow', {
                        'is-active': searchStatus3
                      })}>
                      <TextField
                        variant="outlined"
                        size="small"
                        classes={{ root: 'bg-white' }}
                        className="w-100"
                        placeholder="Search projects..."
                        id="input-with-icon-textfield22-3"
                        onFocus={toggleSearch3}
                        onBlur={toggleSearch3}
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
                </div>
                <div>
                  <ButtonGroup variant="text">
                    <Button
                      className={clsx(
                        'btn-primary btn-transition-none d-40 p-0 btn-icon btn-animated-icon-sm',
                        { active: activeTab === '1' }
                      )}
                      onClick={() => {
                        toggle('1');
                      }}>
                      <span className="btn-wrapper--icon d-20 d-flex align-items-center justify-content-center">
                        <ViewCompactTwoToneIcon />
                      </span>
                    </Button>
                    <Button
                      className={clsx(
                        'btn-primary btn-transition-none d-40 p-0 btn-icon btn-animated-icon-sm',
                        { active: activeTab === '2' }
                      )}
                      onClick={() => {
                        toggle('2');
                      }}>
                      <span className="btn-wrapper--icon d-20 d-flex align-items-center justify-content-center">
                        <GridOnTwoToneIcon />
                      </span>
                    </Button>
                  </ButtonGroup>
                </div>
              </Card>
            </div>

            <div
              className={clsx('tab-item-wrapper', {
                active: activeTab === '1'
              })}
              index={1}>
              <div className="p-5">
                <div className="text-center">
                  <h5 className="text-first font-weight-bold font-size-xxl">
                    In Progress
                  </h5>
                  <p className="text-black-50 font-size-lg">
                    These are the projects you are currently working on.
                  </p>
                </div>
                <Grid container spacing={6}>
                  <Grid item md={4} lg={12} xl={4}>
                    <Card className="card-box card-box-border-bottom border-first my-4">
                      <div className="text-center py-3">
                        <div className="d-60 rounded-circle border-0 my-2 card-icon-wrapper bg-plum-plate text-white btn-icon mx-auto text-center">
                          <FontAwesomeIcon
                            icon={['far', 'bell']}
                            className="font-size-xxl"
                          />
                        </div>
                        <div className="font-size-xl font-weight-bold pt-2 text-black">
                          Recent Visitors
                        </div>
                        <div className="opacity-5 pb-3">Today's analytics</div>
                        <div className="d-flex justify-content-center">
                          <div className="avatar-wrapper-overlap avatar-wrapper-overlap-hover my-2">
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar1} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar2} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar4} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="divider mx-auto w-50 my-3" />
                        <div className="text-center">
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-first"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'eye']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-first"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'heart']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-first"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['fas', 'user']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                  <Grid item md={4} lg={12} xl={4}>
                    <Card className="card-box card-box-border-bottom border-first my-4">
                      <div className="text-center py-3">
                        <div className="d-60 rounded-circle border-0 my-2 card-icon-wrapper bg-happy-fisher text-white btn-icon mx-auto text-center">
                          <FontAwesomeIcon
                            icon={['fas', 'cubes']}
                            className="font-size-xl"
                          />
                        </div>
                        <div className="font-size-xl font-weight-bold pt-2 text-black">
                          New Customers
                        </div>
                        <div className="opacity-5 pb-3">Latest analytics</div>
                        <div className="d-flex justify-content-center">
                          <div className="avatar-wrapper-overlap avatar-wrapper-overlap-hover my-2">
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar5} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar7} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar6} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="divider mx-auto w-50 my-3" />
                        <div className="text-center">
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-first"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'eye']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-first"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'heart']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-first"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['fas', 'user']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                  <Grid item md={4} lg={12} xl={4}>
                    <Card className="card-box card-box-border-bottom border-first my-4">
                      <div className="text-center py-3">
                        <div className="d-60 rounded-circle border-0 my-2 card-icon-wrapper bg-love-kiss text-white btn-icon mx-auto text-center">
                          <FontAwesomeIcon
                            icon={['fas', 'shapes']}
                            className="font-size-xl"
                          />
                        </div>
                        <div className="font-size-xl font-weight-bold pt-2 text-black">
                          Today's Revenue
                        </div>
                        <div className="opacity-5 pb-3">Successful orders</div>
                        <div className="d-flex justify-content-center">
                          <div className="avatar-wrapper-overlap avatar-wrapper-overlap-hover my-2">
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar7} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar2} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar1} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="divider mx-auto w-50 my-3" />
                        <div className="text-center">
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-first"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'eye']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-first"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'heart']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-first"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['fas', 'user']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                </Grid>
              </div>
              <div className="divider opacity-3 rounded-lg m-4" />
              <div className="p-5">
                <div className="text-center">
                  <h5 className="text-danger font-weight-bold font-size-xxl">
                    Overdue
                  </h5>
                  <p className="text-black-50 font-size-lg">
                    You should look at finishing these soon, as they are already
                    overdue!
                  </p>
                </div>
                <Grid container spacing={6}>
                  <Grid item md={4} lg={12} xl={4}>
                    <Card className="card-box my-4 card-box-border-bottom border-danger">
                      <div className="text-center py-3">
                        <div className="d-60 rounded-circle border-0 my-2 card-icon-wrapper bg-plum-plate text-white btn-icon mx-auto text-center">
                          <FontAwesomeIcon
                            icon={['far', 'bell']}
                            className="font-size-xxl"
                          />
                        </div>
                        <div className="font-size-xl font-weight-bold pt-2 text-black">
                          Recent Visitors
                        </div>
                        <div className="opacity-5 pb-3">Today's analytics</div>
                        <div className="d-flex justify-content-center">
                          <div className="avatar-wrapper-overlap avatar-wrapper-overlap-hover my-2">
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar1} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar2} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar4} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="divider mx-auto w-50 my-3" />
                        <div className="text-center">
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-danger"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'eye']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-danger"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'heart']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-danger"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['fas', 'user']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                  <Grid item md={4} lg={12} xl={4}>
                    <Card className="card-box my-4 card-box-border-bottom border-danger">
                      <div className="text-center py-3">
                        <div className="d-60 rounded-circle border-0 my-2 card-icon-wrapper bg-happy-fisher text-white btn-icon mx-auto text-center">
                          <FontAwesomeIcon
                            icon={['fas', 'cubes']}
                            className="font-size-xl"
                          />
                        </div>
                        <div className="font-size-xl font-weight-bold pt-2 text-black">
                          New Customers
                        </div>
                        <div className="opacity-5 pb-3">Latest analytics</div>
                        <div className="d-flex justify-content-center">
                          <div className="avatar-wrapper-overlap avatar-wrapper-overlap-hover my-2">
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar5} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar7} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar6} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="divider mx-auto w-50 my-3" />
                        <div className="text-center">
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-danger"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'eye']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-danger"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'heart']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-danger"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['fas', 'user']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                  <Grid item md={4} lg={12} xl={4}>
                    <Card className="card-box my-4 card-box-border-bottom border-danger">
                      <div className="text-center py-3">
                        <div className="d-60 rounded-circle border-0 my-2 card-icon-wrapper bg-love-kiss text-white btn-icon mx-auto text-center">
                          <FontAwesomeIcon
                            icon={['fas', 'shapes']}
                            className="font-size-xl"
                          />
                        </div>
                        <div className="font-size-xl font-weight-bold pt-2 text-black">
                          Today's Revenue
                        </div>
                        <div className="opacity-5 pb-3">Successful orders</div>
                        <div className="d-flex justify-content-center">
                          <div className="avatar-wrapper-overlap avatar-wrapper-overlap-hover my-2">
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar7} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar6} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar1} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="divider mx-auto w-50 my-3" />
                        <div className="text-center">
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-danger"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'eye']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-danger"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'heart']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-danger"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['fas', 'user']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                </Grid>
              </div>
              <div className="divider opacity-3 rounded-lg m-3" />
              <div className="p-5">
                <div className="text-center">
                  <h5 className="text-success font-weight-bold font-size-xxl">
                    Completed
                  </h5>
                  <p className="text-black-50 font-size-lg">
                    Projects that you completed successfully.
                  </p>
                </div>
                <Grid container spacing={6}>
                  <Grid item md={4} lg={12} xl={4}>
                    <Card className="card-box card-box-border-bottom border-success my-4">
                      <div className="text-center py-3">
                        <div className="d-60 rounded-circle border-0 my-2 card-icon-wrapper bg-plum-plate text-white btn-icon mx-auto text-center">
                          <FontAwesomeIcon
                            icon={['far', 'bell']}
                            className="font-size-xxl"
                          />
                        </div>
                        <div className="font-size-xl font-weight-bold pt-2 text-black">
                          Recent Visitors
                        </div>
                        <div className="opacity-5 pb-3">Today's analytics</div>
                        <div className="d-flex justify-content-center">
                          <div className="avatar-wrapper-overlap avatar-wrapper-overlap-hover my-2">
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar1} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar2} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar4} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="divider mx-auto w-50 my-3" />
                        <div className="text-center">
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-success"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'eye']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-success"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'heart']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-success"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['fas', 'user']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                  <Grid item md={4} lg={12} xl={4}>
                    <Card className="card-box card-box-border-bottom border-success my-4">
                      <div className="text-center py-3">
                        <div className="d-60 rounded-circle border-0 my-2 card-icon-wrapper bg-happy-fisher text-white btn-icon mx-auto text-center">
                          <FontAwesomeIcon
                            icon={['fas', 'cubes']}
                            className="font-size-xl"
                          />
                        </div>
                        <div className="font-size-xl font-weight-bold pt-2 text-black">
                          New Customers
                        </div>
                        <div className="opacity-5 pb-3">Latest analytics</div>
                        <div className="d-flex justify-content-center">
                          <div className="avatar-wrapper-overlap avatar-wrapper-overlap-hover my-2">
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar5} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar7} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar6} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="divider mx-auto w-50 my-3" />
                        <div className="text-center">
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-success"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'eye']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-success"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'heart']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-success"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['fas', 'user']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                  <Grid item md={4} lg={12} xl={4}>
                    <Card className="card-box card-box-border-bottom border-success my-4">
                      <div className="text-center py-3">
                        <div className="d-60 rounded-circle border-0 my-2 card-icon-wrapper bg-love-kiss text-white btn-icon mx-auto text-center">
                          <FontAwesomeIcon
                            icon={['fas', 'shapes']}
                            className="font-size-xl"
                          />
                        </div>
                        <div className="font-size-xl font-weight-bold pt-2 text-black">
                          Today's Revenue
                        </div>
                        <div className="opacity-5 pb-3">Successful orders</div>
                        <div className="d-flex justify-content-center">
                          <div className="avatar-wrapper-overlap avatar-wrapper-overlap-hover my-2">
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar7} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar6} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon">
                              <div className="avatar-icon rounded-circle">
                                <img alt="..." src={avatar1} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="divider mx-auto w-50 my-3" />
                        <div className="text-center">
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-success"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'eye']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-success"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['far', 'heart']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                          <Button
                            className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-success"
                            variant="outlined">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon
                                icon={['fas', 'user']}
                                className="font-size-sm"
                              />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div
              className={clsx('tab-item-wrapper', {
                active: activeTab === '2'
              })}
              index={2}>
              <div className="p-5">
                <Table className="table table-alternate-spaced text-nowrap mb-0">
                  <thead className="bg-white font-size-sm text-uppercase">
                    <tr>
                      <th className="bg-white text-left px-4">Project</th>
                      <th className="bg-white text-center">Due Date</th>
                      <th className="bg-white text-center">Team</th>
                      <th className="bg-white text-center">Status</th>
                      <th
                        className="bg-white text-center"
                        style={{ width: '15%' }}>
                        Trends
                      </th>
                      <th className="bg-white text-right px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4">
                        <div className="d-flex align-items-center">
                          <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-plum-plate">
                            <FontAwesomeIcon
                              icon={['far', 'bell']}
                              className="font-size-xxl"
                            />
                          </div>
                          <div>
                            <div className="font-weight-bold">
                              Recent Visitors
                            </div>
                            <div className="opacity-7">Today's analytics</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <span>14 October</span>
                      </td>
                      <td className="text-center">
                        <div className="avatar-wrapper-overlap avatar-icon-sm avatar-wrapper-overlap-hover my-2">
                          <div className="avatar-icon-wrapper avatar-icon">
                            <div className="avatar-icon rounded-circle">
                              <img alt="..." src={avatar1} />
                            </div>
                          </div>
                          <div className="avatar-icon-wrapper avatar-icon">
                            <div className="avatar-icon rounded-circle">
                              <img alt="..." src={avatar2} />
                            </div>
                          </div>
                          <div className="avatar-icon-wrapper avatar-icon">
                            <div className="avatar-icon rounded-circle">
                              <img alt="..." src={avatar4} />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="px-4 py-1 h-auto text-first border-1 border-first badge badge-neutral-first">
                          In Progress
                        </div>
                      </td>
                      <td>
                        <Trend
                          data={[0, 10, 5, 22, 3.6, 11]}
                          autoDraw
                          autoDrawDuration={3000}
                          autoDrawEasing="ease-in"
                          radius={15}
                          smooth
                          stroke="var(--first)"
                          strokeLinecap="round"
                          strokeWidth={5}
                        />
                      </td>
                      <td className="text-center px-4">
                        <Button
                          className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-first"
                          variant="outlined">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon
                              icon={['far', 'eye']}
                              className="font-size-sm"
                            />
                          </span>
                        </Button>
                        <Button
                          className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-first"
                          variant="outlined">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon
                              icon={['far', 'heart']}
                              className="font-size-sm"
                            />
                          </span>
                        </Button>
                        <Button
                          className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-first"
                          variant="outlined">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon
                              icon={['fas', 'user']}
                              className="font-size-sm"
                            />
                          </span>
                        </Button>
                      </td>
                    </tr>
                    <tr className="divider"></tr>
                    <tr>
                      <td className="px-4">
                        <div className="d-flex align-items-center">
                          <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-happy-fisher">
                            <FontAwesomeIcon
                              icon={['fas', 'cubes']}
                              className="font-size-xxl"
                            />
                          </div>
                          <div>
                            <div className="font-weight-bold">
                              New Customers
                            </div>
                            <div className="opacity-7">Latest analytics</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <span>18 October</span>
                      </td>
                      <td className="text-center">
                        <div className="avatar-wrapper-overlap avatar-icon-sm avatar-wrapper-overlap-hover my-2">
                          <div className="avatar-icon-wrapper avatar-icon">
                            <div className="avatar-icon rounded-circle">
                              <img alt="..." src={avatar6} />
                            </div>
                          </div>
                          <div className="avatar-icon-wrapper avatar-icon">
                            <div className="avatar-icon rounded-circle">
                              <img alt="..." src={avatar5} />
                            </div>
                          </div>
                          <div className="avatar-icon-wrapper avatar-icon">
                            <div className="avatar-icon rounded-circle">
                              <img alt="..." src={avatar4} />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="px-4 py-1 h-auto text-success border-1 border-success badge badge-neutral-success">
                          Completed
                        </div>
                      </td>
                      <td>
                        <Trend
                          data={[6, 4, 9, 4, 7.5, 11]}
                          autoDraw
                          autoDrawDuration={3000}
                          autoDrawEasing="ease-in"
                          radius={15}
                          smooth
                          stroke="var(--success)"
                          strokeLinecap="round"
                          strokeWidth={5}
                        />
                      </td>
                      <td className="text-center px-4">
                        <Button
                          className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-success"
                          variant="outlined">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon
                              icon={['far', 'eye']}
                              className="font-size-sm"
                            />
                          </span>
                        </Button>
                        <Button
                          className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-success"
                          variant="outlined">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon
                              icon={['far', 'heart']}
                              className="font-size-sm"
                            />
                          </span>
                        </Button>
                        <Button
                          className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-success"
                          variant="outlined">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon
                              icon={['fas', 'user']}
                              className="font-size-sm"
                            />
                          </span>
                        </Button>
                      </td>
                    </tr>
                    <tr className="divider"></tr>
                    <tr>
                      <td className="px-4">
                        <div className="d-flex align-items-center">
                          <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-love-kiss">
                            <FontAwesomeIcon
                              icon={['fas', 'shapes']}
                              className="font-size-xl"
                            />
                          </div>
                          <div>
                            <div className="font-weight-bold">
                              Recent Visitors
                            </div>
                            <div className="opacity-7">Today's analytics</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <span>27 December</span>
                      </td>
                      <td className="text-center">
                        <div className="avatar-wrapper-overlap avatar-icon-sm avatar-wrapper-overlap-hover my-2">
                          <div className="avatar-icon-wrapper avatar-icon">
                            <div className="avatar-icon rounded-circle">
                              <img alt="..." src={avatar1} />
                            </div>
                          </div>
                          <div className="avatar-icon-wrapper avatar-icon">
                            <div className="avatar-icon rounded-circle">
                              <img alt="..." src={avatar2} />
                            </div>
                          </div>
                          <div className="avatar-icon-wrapper avatar-icon">
                            <div className="avatar-icon rounded-circle">
                              <img alt="..." src={avatar3} />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="px-4 py-1 h-auto text-danger border-1 border-danger badge badge-neutral-danger">
                          Overdue
                        </div>
                      </td>
                      <td>
                        <Trend
                          data={[3, 7, 5, 12, 4.9, 9]}
                          autoDraw
                          autoDrawDuration={3000}
                          autoDrawEasing="ease-in"
                          radius={15}
                          smooth
                          stroke="var(--danger)"
                          strokeLinecap="round"
                          strokeWidth={5}
                        />
                      </td>
                      <td className="text-center px-4">
                        <Button
                          className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-danger"
                          variant="outlined">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon
                              icon={['far', 'eye']}
                              className="font-size-sm"
                            />
                          </span>
                        </Button>
                        <Button
                          className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-danger"
                          variant="outlined">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon
                              icon={['far', 'heart']}
                              className="font-size-sm"
                            />
                          </span>
                        </Button>
                        <Button
                          className="p-0 d-30 mx-1 btn-transition-none border-0 btn-outline-danger"
                          variant="outlined">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon
                              icon={['fas', 'user']}
                              className="font-size-sm"
                            />
                          </span>
                        </Button>
                      </td>
                    </tr>
                    <tr className="divider"></tr>
                  </tbody>
                </Table>

                <div className="d-flex mt-4 align-items-center justify-content-center flex-wrap">
                  <Pagination className="pagination-primary" count={10} />
                </div>
              </div>
            </div>
          </PerfectScrollbar>
        </div>
        <div
          className={clsx(
            'app-inner-content-layout--sidebar app-inner-content-layout--sidebar__xl pos-r bg-white border-left',
            { 'layout-sidebar-open': isSidebarMenuOpen }
          )}>
          <PerfectScrollbar>
            <div className="d-block d-lg-flex align-items-center p-4 justify-content-center">
              <div className="text-center text-lg-left mr-lg-4">
                <div className="font-size-lg text-black-50">Welcome back,</div>
                <div className="display-4 font-weight-bold">Emma</div>
                <div>
                  <Button
                    className="btn-link px-0 font-size-sm btn-link-first"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <span>View profile</span>
                  </Button>
                </div>
              </div>
              <div className="d-flex mt-3 mt-lg-0 justify-content-center align-items-center">
                <CircularProgressbarWithChildren
                  value={81}
                  strokeWidth={8}
                  className="d-110 circular-progress-success">
                  <div className="avatar-icon-wrapper rounded-circle shadow-none d-90">
                    <div className="avatar-icon rounded-circle d-90">
                      <img src={avatar1} alt="..." />
                    </div>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </div>

            <div className="divider my-2 mx-3" />

            <div className="p-4">
              <Grid container spacing={6}>
                <Grid item sm={6}>
                  <div className="pb-3">
                    <div className="font-size-lg text-black-50">Overdue</div>
                    <Card className="border-0 shadow-none my-2 overflow-visible">
                      <div className="card-indicator bg-danger" />
                      <div className="display-3 line-height-1 font-weight-bold ml-3">
                        5
                      </div>
                    </Card>
                  </div>
                </Grid>
                <Grid item sm={6}>
                  <div className="pb-3">
                    <div className="font-size-lg text-black-50">Completed</div>
                    <Card className="border-0 shadow-none my-2 overflow-visible">
                      <div className="card-indicator bg-success" />
                      <div className="display-3 line-height-1 font-weight-bold ml-3">
                        298
                      </div>
                    </Card>
                  </div>
                </Grid>
                <Grid item sm={6}>
                  <div className="pb-3">
                    <div className="font-size-lg text-black-50">
                      In Progress
                    </div>
                    <Card className="border-0 shadow-none my-2 overflow-visible">
                      <div className="card-indicator bg-first" />
                      <div className="display-3 line-height-1 font-weight-bold ml-3">
                        12
                      </div>
                    </Card>
                  </div>
                </Grid>
                <Grid item sm={6}>
                  <div className="pb-3">
                    <div className="font-size-lg text-black-50">Cancelled</div>
                    <Card className="border-0 shadow-none my-2 overflow-visible">
                      <div className="card-indicator bg-warning" />
                      <div className="display-3 line-height-1 font-weight-bold ml-3">
                        31
                      </div>
                    </Card>
                  </div>
                </Grid>
              </Grid>
            </div>

            <div className="divider mt-2" />

            <div>
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
              <div className="divider bg-dark opacity-3" />
              <List component="div" className="list-group-flush">
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="d-flex justify-content-between align-items-center py-3">
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
                      className="btn-neutral-dark btn-pill btn-icon d-30 p-0">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fas', 'plus']} />
                      </span>
                    </Button>
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="d-flex justify-content-between align-items-center py-3">
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
                      className="btn-neutral-dark btn-pill btn-icon d-30 p-0">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fas', 'plus']} />
                      </span>
                    </Button>
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="d-flex justify-content-between align-items-center py-3">
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
                      className="btn-neutral-dark btn-pill btn-icon d-30 p-0"
                      disabled>
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fas', 'plus']} />
                      </span>
                    </Button>
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="d-flex justify-content-between align-items-center py-3">
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
                      className="btn-neutral-dark btn-pill btn-icon d-30 p-0">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fas', 'plus']} />
                      </span>
                    </Button>
                  </div>
                </ListItem>
              </List>
            </div>
          </PerfectScrollbar>
        </div>
        <div
          onClick={toggleSidebarMenu}
          className={clsx('sidebar-inner-layout-overlay', {
            active: isSidebarMenuOpen
          })}
        />
      </div>
    </>
  );
}
