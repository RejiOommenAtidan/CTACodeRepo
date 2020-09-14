import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Button } from '@material-ui/core';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';

import avatar6 from '../../../assets/images/avatars/avatar6.jpg';

import people3 from '../../../assets/images/stock-photos/people-3.jpg';
import people1 from '../../../assets/images/stock-photos/people-1.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item lg={4}>
          <div className="timeline-list timeline-list-offset mb-5">
            <div className="timeline-item timeline-item-icon">
              <div className="timeline-item-offset">9:25</div>
              <div className="timeline-item--content">
                <div className="timeline-item--icon-wrapper bg-primary text-white">
                  <FontAwesomeIcon icon={['far', 'building']} />
                </div>
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  Business meeting
                </h4>
                <p>The World Wide Web goes live with its first web page.</p>
              </div>
            </div>
            <div className="timeline-item timeline-item-icon">
              <div className="timeline-item-offset">12:35</div>
              <div className="timeline-item--content">
                <div className="timeline-item--icon-wrapper bg-danger text-white">
                  <FontAwesomeIcon icon={['far', 'gem']} />
                </div>
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  Reports generation date
                </h4>
                <p>Bill Clinton's presidential scandal makes it online.</p>
              </div>
            </div>
            <div className="timeline-item timeline-item-icon">
              <div className="timeline-item-offset">13:00</div>
              <div className="timeline-item--content">
                <div className="timeline-item--icon-wrapper bg-warning text-white">
                  <FontAwesomeIcon icon={['far', 'object-group']} />
                </div>
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  Lunch with investors
                </h4>
                <p>
                  Mosaic, the first graphical browser, is introduced to the
                  average consumer.
                </p>
              </div>
            </div>
            <div className="timeline-item timeline-item-icon">
              <div className="timeline-item-offset">15:20</div>
              <div className="timeline-item--content">
                <div className="timeline-item--icon-wrapper bg-premium-dark text-white">
                  <FontAwesomeIcon icon={['far', 'bell']} />
                </div>
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  Team meeting
                </h4>
                <p>First ever iPod launches.</p>
              </div>
            </div>
            <div className="timeline-item timeline-item-icon">
              <div className="timeline-item-offset">17:00</div>
              <div className="timeline-item--content">
                <div className="timeline-item--icon-wrapper bg-amy-crisp text-white">
                  <FontAwesomeIcon icon={['far', 'keyboard']} />
                </div>
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  Create new accounts
                </h4>
                <p>MySpace becomes the most popular social network.</p>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={4}>
          <div className="timeline-list timeline-list-offset timeline-list-offset-dot mb-5">
            <div className="timeline-item">
              <div className="timeline-item-offset">9:25</div>
              <div className="timeline-item--content">
                <div className="timeline-item--icon" />
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  1991
                </h4>
                <p>The World Wide Web goes live with its first web page.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-offset">9:25</div>
              <div className="timeline-item--content">
                <div className="timeline-item--icon" />
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  Java exam day
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
            </div>
            <div className="timeline-item">
              <div className="timeline-item-offset">9:25</div>
              <div className="timeline-item--content">
                <div className="timeline-item--icon" />
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  Business investor meeting
                </h4>
                <p>
                  Mosaic, the first graphical browser, is introduced to the
                  average consumer.
                </p>
                <div className="mt-3">
                  <a href="#/" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="img-fluid rounded mr-3 shadow-sm"
                      src={people1}
                      width="70"
                    />
                  </a>
                  <a href="#/" onClick={(e) => e.preventDefault()}>
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
              <div className="timeline-item-offset">9:25</div>
              <div className="timeline-item--content">
                <div className="timeline-item--icon" />
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  Learning round table gathering
                </h4>
                <p>First ever iPod launches.</p>
                <div className="mt-2">
                  <Button size="small" className="btn-primary">
                    Submit Report
                  </Button>
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-offset">9:25</div>
              <div className="timeline-item--content">
                <div className="timeline-item--icon" />
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  2003
                </h4>
                <p>MySpace becomes the most popular social network.</p>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={4}>
          <div className="timeline-list timeline-list-offset timeline-list-offset-dot mb-5">
            <div className="timeline-item">
              <div className="timeline-item-offset">9:25</div>
              <div className="timeline-item--content">
                <div className="timeline-item--icon bg-danger" />
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  1991
                </h4>
                <p>The World Wide Web goes live with its first web page.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-offset">9:25</div>
              <div className="timeline-item--content">
                <div className="timeline-item--icon bg-first" />
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  Java exam day
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
            </div>
            <div className="timeline-item">
              <div className="timeline-item-offset">9:25</div>
              <div className="timeline-item--content">
                <div className="timeline-item--icon bg-success" />
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  Business investor meeting
                </h4>
                <p>
                  Mosaic, the first graphical browser, is introduced to the
                  average consumer.
                </p>
                <div className="mt-3">
                  <a href="#/" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="img-fluid rounded mr-3 shadow-sm"
                      src={people1}
                      width="70"
                    />
                  </a>
                  <a href="#/" onClick={(e) => e.preventDefault()}>
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
              <div className="timeline-item-offset">9:25</div>
              <div className="timeline-item--content">
                <div className="timeline-item--icon bg-second" />
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  Learning round table gathering
                </h4>
                <p>First ever iPod launches.</p>
                <div className="mt-2">
                  <Button size="small" className="btn-primary">
                    Submit Report
                  </Button>
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item-offset">9:25</div>
              <div className="timeline-item--content">
                <div className="timeline-item--icon bg-info" />
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  2003
                </h4>
                <p>MySpace becomes the most popular social network.</p>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
