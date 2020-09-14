import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, List, ListItem } from '@material-ui/core';

import CountUp from 'react-countup';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item lg={6}>
            <Card className="card-box overflow-hidden">
              <div className="card-header-alt px-4 py-3">
                <div className="font-weight-bold font-size-lg mb-0 text-black">
                  Highest Paying
                </div>
                <p className="text-black-50 mb-0 pt-1">
                  Expenses split based on customers
                </p>
              </div>
              <div className="divider" />
              <div className="scroll-area shadow-overflow">
                <PerfectScrollbar options={{ wheelPropagation: false }}>
                  <List component="div" className="list-group-flush">
                    <li className="d-flex justify-content-between align-items-center pl-3 pr-4 py-3">
                      <div className="d-flex align-items-center">
                        <CircularProgressbar
                          value={55}
                          text={55 + '%'}
                          styles={buildStyles({ textColor: 'var(--dark)' })}
                          strokeWidth={4}
                          className="circular-progress-xs circular-progress-first"
                        />

                        <div className="pb-1 pl-3">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Shanelle Wynn
                          </a>
                          <div>
                            <div className="badge badge-neutral-dark">$168</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-black font-size-lg d-flex align-items-center">
                        <small className="opacity-6 pr-1">$</small>
                        <span>
                          <CountUp
                            start={0}
                            end={587}
                            duration={4}
                            separator=""
                            decimals={0}
                            decimal=","
                            prefix=""
                            suffix=""
                          />
                        </span>
                        <span className="text-danger pl-2">
                          <FontAwesomeIcon
                            icon={['fas', 'chevron-down']}
                            className="font-size-sm"
                          />
                        </span>
                      </div>
                    </li>
                    <li className="d-flex justify-content-between align-items-center pl-3 pr-4 py-3">
                      <div className="d-flex align-items-center">
                        <CircularProgressbar
                          value={75}
                          text={75 + '%'}
                          styles={buildStyles({ textColor: 'var(--dark)' })}
                          strokeWidth={4}
                          className="circular-progress-xs circular-progress-first"
                        />

                        <div className="pb-1 pl-3">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Shawn Galloway
                          </a>
                          <div>
                            <div className="badge badge-neutral-dark">$567</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-black font-size-lg d-flex align-items-center">
                        <small className="opacity-6 pr-1">$</small>
                        <span>
                          <CountUp
                            start={0}
                            end={3463}
                            duration={4}
                            separator=""
                            decimals={3}
                            decimal=","
                            prefix=""
                            suffix=""
                          />
                        </span>
                        <span className="text-success pl-2">
                          <FontAwesomeIcon
                            icon={['fas', 'chevron-up']}
                            className="font-size-sm"
                          />
                        </span>
                      </div>
                    </li>
                    <li className="d-flex justify-content-between align-items-center pl-3 pr-4 py-3">
                      <div className="d-flex align-items-center">
                        <CircularProgressbar
                          value={46}
                          text={46 + '%'}
                          styles={buildStyles({ textColor: 'var(--dark)' })}
                          strokeWidth={4}
                          className="circular-progress-xs circular-progress-first"
                        />
                        <div className="pb-1 pl-3">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Latisha Allison
                          </a>
                          <div>
                            <div className="badge badge-neutral-dark">$937</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-black font-size-lg d-flex align-items-center">
                        <small className="opacity-6 pr-1">$</small>
                        <span>
                          <CountUp
                            start={0}
                            end={762}
                            duration={4}
                            separator=""
                            decimals={0}
                            decimal=","
                            prefix=""
                            suffix=""
                          />
                        </span>
                        <span className="text-success pl-2">
                          <FontAwesomeIcon
                            icon={['fas', 'arrow-up']}
                            className="font-size-sm"
                          />
                        </span>
                      </div>
                    </li>
                    <li className="d-flex justify-content-between align-items-center pl-3 pr-4 py-3">
                      <div className="d-flex align-items-center">
                        <CircularProgressbar
                          value={60}
                          text={60 + '%'}
                          styles={buildStyles({ textColor: 'var(--dark)' })}
                          strokeWidth={4}
                          className="circular-progress-xs circular-progress-first"
                        />
                        <div className="pb-1 pl-3">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Lilly-Mae White
                          </a>
                          <div>
                            <div className="badge badge-neutral-dark">$367</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-black font-size-lg d-flex align-items-center">
                        <small className="opacity-6 pr-1">$</small>
                        <span>
                          <CountUp
                            start={0}
                            end={5743}
                            duration={4}
                            separator=""
                            decimals={3}
                            decimal=","
                            prefix=""
                            suffix=""
                          />
                        </span>
                        <span className="text-warning pl-2">
                          <FontAwesomeIcon
                            icon={['far', 'dot-circle']}
                            className="font-size-sm"
                          />
                        </span>
                      </div>
                    </li>
                    <li className="d-flex justify-content-between align-items-center pl-3 pr-4 py-3">
                      <div className="d-flex align-items-center">
                        <CircularProgressbar
                          value={19}
                          text={19 + '%'}
                          styles={buildStyles({ textColor: 'var(--dark)' })}
                          strokeWidth={4}
                          className="circular-progress-xs circular-progress-first"
                        />
                        <div className="pb-1 pl-3">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Julie Prosser
                          </a>
                          <div>
                            <div className="badge badge-neutral-dark">$283</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-black font-size-lg d-flex align-items-center">
                        <small className="opacity-6 pr-1">$</small>
                        <span>
                          <CountUp
                            start={0}
                            end={3463}
                            duration={4}
                            separator=""
                            decimals={3}
                            decimal=","
                            prefix=""
                            suffix=""
                          />
                        </span>
                        <span className="text-success pl-2">
                          <FontAwesomeIcon
                            icon={['fas', 'chevron-up']}
                            className="font-size-sm"
                          />
                        </span>
                      </div>
                    </li>
                    <li className="d-flex justify-content-between align-items-center pl-3 pr-4 py-3">
                      <div className="d-flex align-items-center">
                        <CircularProgressbar
                          value={37}
                          text={37 + '%'}
                          styles={buildStyles({ textColor: 'var(--dark)' })}
                          strokeWidth={4}
                          className="circular-progress-xs circular-progress-first"
                        />
                        <div className="pb-1 pl-3">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Amin Hamer
                          </a>
                          <div>
                            <div className="badge badge-neutral-dark">$793</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-black font-size-lg d-flex align-items-center">
                        <small className="opacity-6 pr-1">$</small>
                        <span>
                          <CountUp
                            start={0}
                            end={1587}
                            duration={6}
                            delay={2}
                            separator=""
                            decimals={3}
                            decimal=","
                          />
                        </span>
                        <span className="text-danger pl-2">
                          <FontAwesomeIcon
                            icon={['fas', 'chevron-down']}
                            className="font-size-sm"
                          />
                        </span>
                      </div>
                    </li>
                  </List>
                </PerfectScrollbar>
              </div>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Card className="card-box overflow-hidden">
              <div className="card-header-alt px-4 py-3">
                <div className="font-weight-bold font-size-lg mb-0 text-black">
                  Recent Customers
                </div>
                <p className="text-black-50 mb-0 pt-1">
                  These are the latest customer orders
                </p>
              </div>
              <div className="divider" />
              <div className="scroll-area shadow-overflow">
                <PerfectScrollbar options={{ wheelPropagation: false }}>
                  <List component="div" className="list-group-flush">
                    <ListItem className="d-flex justify-content-between align-items-center py-3">
                      <div className="d-flex align-items-center">
                        <CircularProgressbar
                          value={55}
                          strokeWidth={5}
                          className="circular-progress-xs circular-progress-first"
                        />
                        <div className="pb-1 pl-3">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Shanelle Wynn
                          </a>
                          <span className="text-black-50 d-block">
                            UI Engineer, Apple Inc.
                          </span>
                        </div>
                      </div>
                      <div className="text-black-50 d-flex align-items-center">
                        <small className="opacity-6 pr-1">$</small>
                        <span>
                          <CountUp
                            start={0}
                            end={587}
                            duration={4}
                            separator=""
                            decimals={0}
                            decimal=","
                            prefix=""
                            suffix=""
                          />
                        </span>
                        <span className="text-danger pl-1">
                          <FontAwesomeIcon
                            icon={['fas', 'chevron-down']}
                            className="font-size-sm"
                          />
                        </span>
                      </div>
                    </ListItem>
                    <ListItem className="d-flex justify-content-between align-items-center py-3">
                      <div className="d-flex align-items-center">
                        <CircularProgressbar
                          value={49}
                          strokeWidth={5}
                          className="circular-progress-xs circular-progress-first"
                        />
                        <div className="pb-1 pl-3">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Shawn Galloway
                          </a>
                          <span className="text-black-50 d-block">
                            Frontend Engineer
                          </span>
                        </div>
                      </div>
                      <div className="text-black-50 d-flex align-items-center">
                        <small className="opacity-6 pr-1">$</small>
                        <span>
                          <CountUp
                            start={0}
                            end={3463}
                            duration={4}
                            separator=""
                            decimals={3}
                            decimal=","
                            prefix=""
                            suffix=""
                          />
                        </span>
                        <span className="text-success pl-1">
                          <FontAwesomeIcon
                            icon={['fas', 'chevron-up']}
                            className="font-size-sm"
                          />
                        </span>
                      </div>
                    </ListItem>
                    <ListItem className="d-flex justify-content-between align-items-center py-3">
                      <div className="d-flex align-items-center">
                        <CircularProgressbar
                          value={78}
                          strokeWidth={5}
                          className="circular-progress-xs circular-progress-first"
                        />
                        <div className="pb-1 pl-3">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Latisha Allison
                          </a>
                          <span className="text-black-50 d-block">
                            UX Designer
                          </span>
                        </div>
                      </div>
                      <div className="text-black-50 d-flex align-items-center">
                        <small className="opacity-6 pr-1">$</small>
                        <span>
                          <CountUp
                            start={0}
                            end={762}
                            duration={4}
                            separator=""
                            decimals={0}
                            decimal=","
                            prefix=""
                            suffix=""
                          />
                        </span>
                        <span className="text-success pl-1">
                          <FontAwesomeIcon
                            icon={['fas', 'arrow-up']}
                            className="font-size-sm"
                          />
                        </span>
                      </div>
                    </ListItem>
                    <ListItem className="d-flex justify-content-between align-items-center py-3">
                      <div className="d-flex align-items-center">
                        <CircularProgressbar
                          value={69}
                          strokeWidth={5}
                          className="circular-progress-xs circular-progress-first"
                        />
                        <div className="pb-1 pl-3">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Lilly-Mae White
                          </a>
                          <span className="text-black-50 d-block">
                            Frontend Engineer
                          </span>
                        </div>
                      </div>
                      <div className="text-black-50 d-flex align-items-center">
                        <small className="opacity-6 pr-1">$</small>
                        <span>
                          <CountUp
                            start={0}
                            end={5743}
                            duration={4}
                            separator=""
                            decimals={3}
                            decimal=","
                            prefix=""
                            suffix=""
                          />
                        </span>
                        <span className="text-warning pl-1">
                          <FontAwesomeIcon
                            icon={['far', 'dot-circle']}
                            className="font-size-sm"
                          />
                        </span>
                      </div>
                    </ListItem>
                    <ListItem className="d-flex justify-content-between align-items-center py-3">
                      <div className="d-flex align-items-center">
                        <CircularProgressbar
                          value={96}
                          strokeWidth={5}
                          className="circular-progress-xs circular-progress-first"
                        />
                        <div className="pb-1 pl-3">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Julie Prosser
                          </a>
                          <span className="text-black-50 d-block">
                            Frontend Engineer
                          </span>
                        </div>
                      </div>
                      <div className="text-black-50 d-flex align-items-center">
                        <small className="opacity-6 pr-1">$</small>
                        <span>
                          <CountUp
                            start={0}
                            end={3463}
                            duration={4}
                            separator=""
                            decimals={3}
                            decimal=","
                            prefix=""
                            suffix=""
                          />
                        </span>
                        <span className="text-success pl-1">
                          <FontAwesomeIcon
                            icon={['fas', 'chevron-up']}
                            className="font-size-sm"
                          />
                        </span>
                      </div>
                    </ListItem>
                    <ListItem className="d-flex justify-content-between align-items-center py-3">
                      <div className="d-flex align-items-center">
                        <CircularProgressbar
                          value={38}
                          strokeWidth={5}
                          className="circular-progress-xs circular-progress-first"
                        />
                        <div className="pb-1 pl-3">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title="...">
                            Amin Hamer
                          </a>
                          <span className="text-black-50 d-block">
                            Senior Project Manager
                          </span>
                        </div>
                      </div>
                      <div className="text-black-50 d-flex align-items-center">
                        <small className="opacity-6 pr-1">$</small>
                        <span>
                          <CountUp
                            start={0}
                            end={1587}
                            duration={6}
                            delay={2}
                            separator=""
                            decimals={3}
                            decimal=","
                          />
                        </span>
                        <span className="text-danger pl-1">
                          <FontAwesomeIcon
                            icon={['fas', 'chevron-down']}
                            className="font-size-sm"
                          />
                        </span>
                      </div>
                    </ListItem>
                  </List>
                </PerfectScrollbar>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
