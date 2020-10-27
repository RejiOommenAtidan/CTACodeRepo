import React from 'react';

import { Button } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';

import avatar6 from '../../../assets/images/avatars/avatar6.jpg';

import people3 from '../../../assets/images/stock-photos/people-3.jpg';
import people2 from '../../../assets/images/stock-photos/people-2.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="timeline-list timeline-list-horizontal">
        <div className="scroll-area-sm shadow-overflow-horizontal">
          <PerfectScrollbar
            options={{ suppressScrollY: true, useBothWheelAxes: true }}>
            <ul className="w-100">
              <li className="timeline-item">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon" />
                  <h4 className="timeline-item--label mb-2 font-weight-bold">
                    Lunch with investors
                  </h4>
                  <p>
                    Mosaic, the first graphical browser, is introduced to the
                    average consumer.
                  </p>
                </div>
              </li>
              <li className="timeline-item">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon bg-danger" />
                  <h4 className="timeline-item--label mb-2 font-weight-bold">
                    Create new accounts
                  </h4>
                  <p>MySpace becomes the most popular social network.</p>
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
              <li className="timeline-item">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon" />
                  <h4 className="timeline-item--label mb-2 font-weight-bold">
                    Lunch with investors
                  </h4>
                  <p>
                    Mosaic, the first graphical browser, is introduced to the
                    average consumer.
                  </p>
                  <div className="mt-2">
                    <Button size="small" className="btn-primary">
                      Submit Report
                    </Button>
                  </div>
                </div>
              </li>
              <li className="timeline-item">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon bg-midnight-bloom" />
                  <h4 className="timeline-item--label mb-2 font-weight-bold">
                    Learning round table gathering
                  </h4>
                  <p>Bill Clinton's presidential scandal makes it online.</p>
                  <div className="avatar-wrapper-overlap d-flex justify-content-center mt-2 mb-1">
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
              </li>
              <li className="timeline-item">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon" />
                  <h4 className="timeline-item--label mb-2 font-weight-bold">
                    Lunch with investors
                  </h4>
                  <p>
                    Mosaic, the first graphical browser, is introduced to the
                    average consumer.
                  </p>
                </div>
              </li>
              <li className="timeline-item">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon bg-danger" />
                  <h4 className="timeline-item--label mb-2 font-weight-bold">
                    Create new accounts
                  </h4>
                  <p>MySpace becomes the most popular social network.</p>
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
              <li className="timeline-item">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon" />
                  <h4 className="timeline-item--label mb-2 font-weight-bold">
                    Lunch with investors
                  </h4>
                  <p>
                    Mosaic, the first graphical browser, is introduced to the
                    average consumer.
                  </p>
                  <div className="mt-2">
                    <Button size="small" className="btn-primary">
                      Submit Report
                    </Button>
                  </div>
                </div>
              </li>
              <li className="timeline-item">
                <div className="timeline-item--content">
                  <div className="timeline-item--icon bg-midnight-bloom" />
                  <h4 className="timeline-item--label mb-2 font-weight-bold">
                    Learning round table gathering
                  </h4>
                  <p>Bill Clinton's presidential scandal makes it online.</p>
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
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </div>
    </>
  );
}
