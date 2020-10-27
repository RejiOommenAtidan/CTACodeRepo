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
      <Grid container spacing={6}>
        <Grid item lg={6}>
          <Card className="shadow-xxl p-3">
            <List className="nav-tabs nav-tabs-primary d-flex">
              <ListItem
                button
                disableRipple
                selected={activeTab === '0'}
                onClick={() => {
                  toggle('0');
                }}>
                Home
              </ListItem>
              <ListItem
                button
                disableRipple
                selected={activeTab === '1'}
                onClick={() => {
                  toggle('1');
                }}>
                Profile
              </ListItem>
              <ListItem
                button
                disableRipple
                selected={activeTab === '2'}
                onClick={() => {
                  toggle('2');
                }}>
                Messages
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
          <Card className="shadow-xxl p-3">
            <List className="nav-tabs nav-tabs-first d-flex justify-content-center">
              <ListItem
                button
                disableRipple
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
                disableRipple
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
                disableRipple
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
          <Card className="shadow-xxl p-3">
            <List className="nav-tabs nav-tabs-danger d-flex">
              <ListItem
                button
                disableRipple
                selected={activeTab === '0'}
                onClick={() => {
                  toggle('0');
                }}>
                <span className="px-2 py-1 font-weight-bold font-size-sm">
                  Home
                </span>
              </ListItem>
              <ListItem
                button
                disableRipple
                selected={activeTab === '1'}
                onClick={() => {
                  toggle('1');
                }}>
                <span className="px-2 py-1 font-weight-bold font-size-sm">
                  Profile
                </span>
              </ListItem>
              <ListItem
                button
                disableRipple
                selected={activeTab === '2'}
                onClick={() => {
                  toggle('2');
                }}>
                <span className="px-2 py-1 font-weight-bold font-size-sm">
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
                <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-danger shadow-danger-sm text-danger mb-2 d-90">
                  <FontAwesomeIcon
                    icon={['fas', 'lightbulb']}
                    className="d-flex align-self-center font-size-xxl"
                  />
                </div>
                <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-danger">
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
                <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-danger shadow-danger-sm text-danger mb-2 d-90">
                  <FontAwesomeIcon
                    icon={['far', 'user']}
                    className="d-flex align-self-center font-size-xxl"
                  />
                </div>
                <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-danger">
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
                <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-danger shadow-danger-sm text-danger mb-2 d-90">
                  <FontAwesomeIcon
                    icon={['far', 'gem']}
                    className="d-flex align-self-center font-size-xxl"
                  />
                </div>
                <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-danger">
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
          <Card className="shadow-xxl p-3">
            <List className="nav-tabs nav-tabs-success d-flex nav-justified">
              <ListItem
                button
                disableRipple
                selected={activeTab === '0'}
                onClick={() => {
                  toggle('0');
                }}>
                <span className="font-weight-bold font-size-md text-black text-capitalize px-2 py-1">
                  Home
                </span>
              </ListItem>
              <ListItem
                button
                disableRipple
                selected={activeTab === '1'}
                onClick={() => {
                  toggle('1');
                }}>
                <span className="font-weight-bold font-size-md text-black text-capitalize px-2 py-1">
                  Profile
                </span>
              </ListItem>
              <ListItem
                button
                disableRipple
                selected={activeTab === '2'}
                onClick={() => {
                  toggle('2');
                }}>
                <span className="font-weight-bold font-size-md text-black text-capitalize px-2 py-1">
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
                <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-success shadow-success-sm text-success mb-2 d-90">
                  <FontAwesomeIcon
                    icon={['fas', 'lightbulb']}
                    className="d-flex align-self-center font-size-xxl"
                  />
                </div>
                <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-success">
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
                <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-success shadow-success-sm text-success mb-2 d-90">
                  <FontAwesomeIcon
                    icon={['far', 'user']}
                    className="d-flex align-self-center font-size-xxl"
                  />
                </div>
                <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-success">
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
                <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-success shadow-success-sm text-success mb-2 d-90">
                  <FontAwesomeIcon
                    icon={['far', 'gem']}
                    className="d-flex align-self-center font-size-xxl"
                  />
                </div>
                <h6 className="font-weight-bold font-size-xxl mb-1 mt-3 text-success">
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
    </>
  );
}
