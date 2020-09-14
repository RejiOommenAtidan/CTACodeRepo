import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, List, ListItem } from '@material-ui/core';

export default function LivePreviewExample() {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item lg={6}>
            <Card className="shadow-xxl">
              <List className="nav-tabs nav-tabs-first tabs-animated tabs-bordered tabs-animated-shadow d-flex">
                <ListItem
                  button
                  selected={activeTab === '0'}
                  onClick={() => {
                    toggle('0');
                  }}>
                  <span>Home</span>
                </ListItem>
                <ListItem
                  button
                  selected={activeTab === '1'}
                  onClick={() => {
                    toggle('1');
                  }}>
                  <span>Profile</span>
                </ListItem>
                <ListItem
                  button
                  selected={activeTab === '2'}
                  onClick={() => {
                    toggle('2');
                  }}>
                  <span>Messages</span>
                </ListItem>
              </List>

              <div
                className={clsx('tab-item-wrapper', {
                  active: activeTab === '0'
                })}
                index={0}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-first shadow-first-sm text-first mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['fas', 'lightbulb']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-first">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </div>
              <div
                className={clsx('tab-item-wrapper', {
                  active: activeTab === '1'
                })}
                index={1}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-first shadow-first-sm text-first mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['far', 'user']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-first">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </div>
              <div
                className={clsx('tab-item-wrapper', {
                  active: activeTab === '2'
                })}
                index={2}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-first shadow-first-sm text-first mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['far', 'gem']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-first">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Card className="shadow-xxl">
              <List className="nav-tabs justify-content-center d-flex nav-tabs-primary tabs-animated tabs-bordered tabs-animated-shadow">
                <ListItem
                  button
                  selected={activeTab === '0'}
                  onClick={() => {
                    toggle('0');
                  }}>
                  <span className="font-weight-bold text-uppercase font-size-sm">
                    Home
                  </span>
                </ListItem>
                <ListItem
                  button
                  selected={activeTab === '1'}
                  onClick={() => {
                    toggle('1');
                  }}>
                  <span className="font-weight-bold text-uppercase font-size-sm">
                    Profile
                  </span>
                </ListItem>
                <ListItem
                  button
                  selected={activeTab === '2'}
                  onClick={() => {
                    toggle('2');
                  }}>
                  <span className="font-weight-bold text-uppercase font-size-sm">
                    Messages
                  </span>
                </ListItem>
              </List>

              <div
                className={clsx('tab-item-wrapper', {
                  active: activeTab === '0'
                })}
                index={0}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-primary shadow-primary-sm text-primary mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['fas', 'lightbulb']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-primary">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </div>
              <div
                className={clsx('tab-item-wrapper', {
                  active: activeTab === '1'
                })}
                index={1}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-primary shadow-primary-sm text-primary mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['far', 'user']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-primary">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </div>
              <div
                className={clsx('tab-item-wrapper', {
                  active: activeTab === '2'
                })}
                index={2}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-primary shadow-primary-sm text-primary mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['far', 'gem']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-primary">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Card className="shadow-xxl">
              <List className="nav-tabs nav-tabs-warning tabs-animated tabs-animated-line justify-content-center d-flex">
                <ListItem
                  button
                  selected={activeTab === '0'}
                  onClick={() => {
                    toggle('0');
                  }}>
                  <span className="px-3 py-2 font-weight-bold">Home</span>
                </ListItem>
                <ListItem
                  button
                  selected={activeTab === '1'}
                  onClick={() => {
                    toggle('1');
                  }}>
                  <span className="px-3 py-2 font-weight-bold">Profile</span>
                </ListItem>
                <ListItem
                  button
                  selected={activeTab === '2'}
                  onClick={() => {
                    toggle('2');
                  }}>
                  <span className="px-3 py-2 font-weight-bold">Messages</span>
                </ListItem>
              </List>

              <div
                className={clsx('tab-item-wrapper', {
                  active: activeTab === '0'
                })}
                index={0}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-warning shadow-warning-sm text-warning mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['fas', 'lightbulb']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-warning">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </div>
              <div
                className={clsx('tab-item-wrapper', {
                  active: activeTab === '1'
                })}
                index={1}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-warning shadow-warning-sm text-warning mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['far', 'user']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-warning">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </div>
              <div
                className={clsx('tab-item-wrapper', {
                  active: activeTab === '2'
                })}
                index={2}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-warning shadow-warning-sm text-warning mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['far', 'gem']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-warning">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Card className="shadow-xxl">
              <List className="nav-tabs justify-content-center nav-tabs-dark tabs-animated tabs-animated-line d-flex">
                <ListItem
                  button
                  selected={activeTab === '0'}
                  onClick={() => {
                    toggle('0');
                  }}>
                  <span className="font-size-lg text-black text-capitalize px-3 py-2">
                    Home
                  </span>
                </ListItem>
                <ListItem
                  button
                  selected={activeTab === '1'}
                  onClick={() => {
                    toggle('1');
                  }}>
                  <span className="font-size-lg text-black text-capitalize px-3 py-2">
                    Profile
                  </span>
                </ListItem>
                <ListItem
                  button
                  selected={activeTab === '2'}
                  onClick={() => {
                    toggle('2');
                  }}>
                  <span className="font-size-lg text-black text-capitalize px-3 py-2">
                    Messages
                  </span>
                </ListItem>
              </List>

              <div
                className={clsx('tab-item-wrapper', {
                  active: activeTab === '0'
                })}
                index={0}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-dark shadow-dark-sm text-dark mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['fas', 'lightbulb']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-dark">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </div>
              <div
                className={clsx('tab-item-wrapper', {
                  active: activeTab === '1'
                })}
                index={1}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-dark shadow-dark-sm text-dark mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['far', 'user']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-dark">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </div>
              <div
                className={clsx('tab-item-wrapper', {
                  active: activeTab === '2'
                })}
                index={2}>
                <div className="text-center my-5">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-dark shadow-dark-sm text-dark mb-2 d-90">
                    <FontAwesomeIcon
                      icon={['far', 'gem']}
                      className="d-flex align-self-center font-size-xxl"
                    />
                  </div>
                  <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-dark">
                    Tabbed Section
                  </h6>
                  <p className="text-black-50 font-size-lg mb-0">
                    You have pending actions to take care of.
                  </p>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
