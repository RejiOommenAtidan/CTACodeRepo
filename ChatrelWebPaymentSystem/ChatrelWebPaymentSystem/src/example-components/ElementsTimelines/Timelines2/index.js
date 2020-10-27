import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item lg={6}>
          <Card className="card-box p-4 mb-5">
            <div className="timeline-list pt-0 mb-4">
              <div className="timeline-item mb-0 py-0">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon timeline-icon-alternate" />
                  <h4 className="timeline-item--label mb-0">
                    <div className="font-size-lg d-40 text-center">
                      <FontAwesomeIcon
                        icon={['far', 'bell']}
                        className="text-info"
                      />
                    </div>
                    <div className="d-flex align-items-center flex-grow-1 justify-content-between">
                      <span className="font-size-md text-black-50">
                        Quick wafting zephyrs vex bold Jim
                      </span>
                      <span className="opacity-5">12 days</span>
                    </div>
                  </h4>
                </div>
              </div>
              <div className="timeline-item mb-0 py-0">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon timeline-icon-alternate" />
                  <h4 className="timeline-item--label mb-0">
                    <div className="font-size-lg d-40 text-center">
                      <FontAwesomeIcon
                        icon={['far', 'keyboard']}
                        className="text-danger"
                      />
                    </div>
                    <div className="d-flex align-items-center flex-grow-1 justify-content-between">
                      <span className="font-size-md text-black-50">
                        Cozy sphinx waves quart jug of bad milk
                      </span>
                      <span className="opacity-5">12 days</span>
                    </div>
                  </h4>
                </div>
              </div>
              <div className="timeline-item mb-0 py-0">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon timeline-icon-alternate" />
                  <h4 className="timeline-item--label mb-0">
                    <div className="font-size-lg d-40 text-center">
                      <FontAwesomeIcon
                        icon={['far', 'envelope']}
                        className="text-warning"
                      />
                    </div>
                    <div className="d-flex align-items-center flex-grow-1 justify-content-between">
                      <span className="font-size-md text-black-50">
                        Two driven jocks help fax my big quiz
                      </span>
                      <span className="opacity-5">12 days</span>
                    </div>
                  </h4>
                </div>
              </div>
            </div>
            <div className="timeline-list pt-0 timeline-list--success">
              <div className="timeline-item mb-0 py-0">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon timeline-icon-alternate" />
                  <h4 className="timeline-item--label mb-0">
                    <div className="font-size-lg d-40 text-center">
                      <FontAwesomeIcon
                        icon={['far', 'address-card']}
                        className="text-first"
                      />
                    </div>
                    <div className="d-flex align-items-center flex-grow-1 justify-content-between">
                      <span className="font-size-md text-black-50">
                        Business investor meeting
                      </span>
                      <span className="opacity-5">12 days</span>
                    </div>
                  </h4>
                </div>
              </div>
              <div className="timeline-item mb-0 py-0">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon timeline-icon-alternate" />
                  <h4 className="timeline-item--label mb-0">
                    <div className="font-size-lg d-40 text-center">
                      <FontAwesomeIcon
                        icon={['far', 'calendar-alt']}
                        className="text-danger"
                      />
                    </div>
                    <div className="d-flex align-items-center flex-grow-1 justify-content-between">
                      <span className="font-size-md text-black-50">
                        Learning round table gathering
                        <div className="badge badge-neutral-danger text-danger ml-2">
                          New
                        </div>
                      </span>
                      <span className="opacity-5">12 days</span>
                    </div>
                  </h4>
                </div>
              </div>
              <div className="timeline-item mb-0 py-0">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon timeline-icon-alternate" />
                  <h4 className="timeline-item--label mb-0">
                    <div className="font-size-lg d-40 text-center">
                      <FontAwesomeIcon
                        icon={['far', 'keyboard']}
                        className="text-success"
                      />
                    </div>
                    <div className="d-flex align-items-center flex-grow-1 justify-content-between">
                      <span className="font-size-md text-black-50">
                        DJs flock by when MTV ax quiz prog
                      </span>
                      <span className="opacity-5">12 days</span>
                    </div>
                  </h4>
                </div>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item lg={6}>
          <Card className="card-box p-4 mb-5">
            <div className="timeline-list pt-0">
              <div className="timeline-item mb-0 py-0">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon timeline-icon-alternate bg-warning" />
                  <h4 className="timeline-item--label mb-0">
                    <div className="font-size-lg d-40 text-center">
                      <FontAwesomeIcon
                        icon={['far', 'images']}
                        className="text-warning"
                      />
                    </div>
                    <div className="d-flex align-items-center flex-grow-1 justify-content-between">
                      <span className="font-size-md text-black-50">
                        The jay, pig, fox, zebra, and my wolves quack
                        <div className="badge badge-success ml-2">New</div>
                      </span>
                      <span className="opacity-5">12 days</span>
                    </div>
                  </h4>
                </div>
              </div>
              <div className="timeline-item mb-0 py-0">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon timeline-icon-alternate bg-success" />
                  <h4 className="timeline-item--label mb-0">
                    <div className="font-size-lg d-40 text-center">
                      <FontAwesomeIcon
                        icon={['far', 'clock']}
                        className="text-success"
                      />
                    </div>
                    <div className="d-flex align-items-center flex-grow-1 justify-content-between">
                      <span className="font-size-md text-black-50">
                        Watch "Jeopardy! ", Alex Trebek's fun TV quiz game
                      </span>
                      <span className="opacity-5">12 days</span>
                    </div>
                  </h4>
                </div>
              </div>
              <div className="timeline-item mb-0 py-0">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon timeline-icon-alternate" />
                  <h4 className="timeline-item--label mb-0">
                    <div className="font-size-lg d-40 text-center">
                      <FontAwesomeIcon
                        icon={['far', 'bell']}
                        className="text-primary"
                      />
                    </div>
                    <div className="d-flex align-items-center flex-grow-1 justify-content-between">
                      <span className="font-size-md text-black-50">
                        Cozy sphinx waves quart jug of bad milk
                        <div className="badge badge-info ml-2">New</div>
                      </span>
                      <span className="opacity-5">12 days</span>
                    </div>
                  </h4>
                </div>
              </div>
              <div className="timeline-item mb-0 py-0">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon timeline-icon-alternate" />
                  <h4 className="timeline-item--label mb-0">
                    <div className="font-size-lg d-40 text-center">
                      <FontAwesomeIcon
                        icon={['far', 'map']}
                        className="text-dark"
                      />
                    </div>
                    <div className="d-flex align-items-center flex-grow-1 justify-content-between">
                      <span className="font-size-md text-black-50">
                        Learning round table gathering
                      </span>
                      <span className="opacity-5">12 days</span>
                    </div>
                  </h4>
                </div>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
