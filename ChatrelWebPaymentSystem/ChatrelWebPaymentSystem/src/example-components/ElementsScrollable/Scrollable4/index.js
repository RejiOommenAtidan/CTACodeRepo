import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Button, Tooltip } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';

import avatar7 from '../../../assets/images/avatars/avatar7.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';

import people3 from '../../../assets/images/stock-photos/people-3.jpg';
import people2 from '../../../assets/images/stock-photos/people-2.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box p-0 mb-spacing-6-x2">
        <div className="card-header">
          <div className="card-header--title">
            <small>Timelines</small>
            <b>Dustin's Recent Actions</b>
          </div>
          <div className="card-actions-pane">
            <Tooltip
              title="Download Timeline"
              classes={{ tooltip: 'tooltip-success' }}
              arrow>
              <Button className="btn-neutral-success btn-icon btn-animated-icon btn-transition-none btn-pill d-40 p-0">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['fas', 'download']}
                    className="font-size-xs"
                  />
                </span>
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="shadow-overflow">
          <PerfectScrollbar
            className="scroll-area-sm"
            option={{ wheelPropagation: false }}>
            <div className="p-3">
              <div className="timeline-list">
                <div className="timeline-item timeline-item-icon">
                  <div className="timeline-item--content">
                    <div className="timeline-item--icon-wrapper bg-primary text-white">
                      <FontAwesomeIcon icon={['far', 'building']} />
                    </div>
                    <h4 className="timeline-item--label mb-2 font-weight-bold">
                      1991
                    </h4>
                    <p>The World Wide Web goes live with its first web page.</p>
                  </div>
                </div>
                <div className="timeline-item timeline-item-icon">
                  <div className="timeline-item--content">
                    <div className="timeline-item--icon-wrapper bg-danger text-white">
                      <FontAwesomeIcon icon={['far', 'gem']} />
                    </div>
                    <h4 className="timeline-item--label mb-2 font-weight-bold">
                      1998
                    </h4>
                    <p>Bill Clinton's presidential scandal makes it online.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-item--content">
                    <div className="timeline-item--icon" />
                    <h4 className="timeline-item--label mb-2 font-weight-bold">
                      1991
                    </h4>
                    <p>The World Wide Web goes live with its first web page.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-item--content">
                    <div className="timeline-item--icon" />
                    <h4 className="timeline-item--label mb-2 font-weight-bold">
                      Java exam day
                    </h4>
                    <p>Bill Clinton's presidential scandal makes it online.</p>
                    <div className="avatar-wrapper-overlap mt-2 mb-1">
                      <div className="avatar-icon-wrapper avatar-icon-sm">
                        <div className="avatar-icon">
                          <img src={avatar1} alt="..." />
                        </div>
                      </div>
                      <div className="avatar-icon-wrapper avatar-icon-sm">
                        <div className="avatar-icon">
                          <img src={avatar7} alt="..." />
                        </div>
                      </div>
                      <div className="avatar-icon-wrapper avatar-icon-sm">
                        <div className="avatar-icon">
                          <img src={avatar1} alt="..." />
                        </div>
                      </div>
                      <div className="avatar-icon-wrapper avatar-icon-sm">
                        <div className="avatar-icon">
                          <img src={avatar2} alt="..." />
                        </div>
                      </div>
                      <div className="avatar-icon-wrapper avatar-icon-sm">
                        <div className="avatar-icon">
                          <img src={avatar6} alt="..." />
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
                      Mosaic, the first graphical browser, is introduced to the
                      average consumer.
                    </p>
                    <div className="mt-3">
                      <a href="#/" onClick={(e) => e.preventDefault()}>
                        <img
                          src={people3}
                          alt="..."
                          width="70"
                          className="img-fluid rounded mr-3 shadow-sm"
                        />
                      </a>
                      <a href="#/" onClick={(e) => e.preventDefault()}>
                        <img
                          src={people2}
                          alt="..."
                          width="70"
                          className="img-fluid rounded shadow-sm"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="timeline-item timeline-item-icon">
                  <div className="timeline-item--content">
                    <div className="timeline-item--icon-wrapper bg-amy-crisp text-white">
                      <FontAwesomeIcon icon={['far', 'keyboard']} />
                    </div>
                    <h4 className="timeline-item--label mb-2 font-weight-bold">
                      2003
                    </h4>
                    <p>MySpace becomes the most popular social network.</p>
                  </div>
                </div>
              </div>
            </div>
          </PerfectScrollbar>
        </div>
        <div className="card-footer py-3 d-flex justify-content-center">
          <Button size="small" className="btn-success">
            <small className="font-size-xs font-weight-bold text-uppercase">
              View details
            </small>
          </Button>
        </div>
      </Card>
    </>
  );
}
