import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Button } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import CountUp from 'react-countup';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../../assets/images/avatars/avatar4.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box p-0 mb-spacing-6-x2 overflow-hidden">
        <div className="card-header bg-secondary">
          <div className="card-header--title">
            <h5 className="font-size-lg mb-0 line-height-1 py-2 font-weight-bold">
              Statistics
            </h5>
          </div>
          <div>
            <Button className="btn-neutral-dark btn-pill" size="small">
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon
                  icon={['fas', 'arrow-down']}
                  className="font-size-xs"
                />
              </span>
              <span className="btn-wrapper--label">View details</span>
            </Button>
          </div>
        </div>
        <div className="shadow-overflow">
          <PerfectScrollbar
            className="scroll-area-sm"
            option={{ wheelPropagation: false }}>
            <div className="d-flex align-items-center justify-content-between px-4 py-3">
              <div className="d-flex">
                <div className="d-flex align-items-center">
                  <div className="avatar-icon-wrapper mr-2">
                    <div className="avatar-icon">
                      <img alt="..." src={avatar1} />
                    </div>
                  </div>
                  <div>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-weight-bold text-black"
                      title="...">
                      Isaiah Ruiz
                    </a>
                    <span className="text-black-50 d-block">
                      Senior Web Developer
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="font-weight-bold text-success font-size-lg pr-2">
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
                <FontAwesomeIcon
                  icon={['fas', 'arrow-down']}
                  className="font-size-sm text-success opacity-5"
                />
              </div>
            </div>
            <div className="divider" />
            <div className="d-flex align-items-center justify-content-between px-4 py-3">
              <div className="d-flex">
                <div className="d-flex align-items-center">
                  <div className="avatar-icon-wrapper mr-2">
                    <div className="avatar-icon">
                      <img alt="..." src={avatar2} />
                    </div>
                  </div>
                  <div>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-weight-bold text-black"
                      title="...">
                      Inez Conley
                    </a>
                    <span className="text-black-50 d-block">
                      Project Manager
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="font-weight-bold text-danger font-size-lg pr-2">
                  <CountUp
                    start={0}
                    end={584}
                    duration={6}
                    delay={2}
                    separator=""
                    prefix="+"
                    decimals={0}
                    decimal=","
                  />
                </div>
                <FontAwesomeIcon
                  icon={['fas', 'arrow-down']}
                  className="font-size-sm text-danger opacity-5"
                />
              </div>
            </div>
            <div className="divider" />
            <div className="d-flex align-items-center justify-content-between px-4 py-3">
              <div className="d-flex">
                <div className="d-flex align-items-center">
                  <div className="avatar-icon-wrapper mr-2">
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
                      Adyan Sosa
                    </a>
                    <span className="text-black-50 d-block">
                      User Experience Designer
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="font-weight-bold text-warning font-size-lg pr-2">
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
                <FontAwesomeIcon
                  icon={['fas', 'arrow-up']}
                  className="font-size-sm text-warning opacity-5"
                />
              </div>
            </div>
            <div className="divider" />
            <div className="d-flex align-items-center justify-content-between px-4 py-3">
              <div className="d-flex">
                <div className="d-flex align-items-center">
                  <div className="avatar-icon-wrapper mr-2">
                    <div className="avatar-icon">
                      <img alt="..." src={avatar4} />
                    </div>
                  </div>
                  <div>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-weight-bold text-black"
                      title="...">
                      Beck Simpson
                    </a>
                    <span className="text-black-50 d-block">
                      Senior Consultant
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="font-weight-bold text-first font-size-lg pr-2">
                  {' '}
                  $12,23M
                </div>
                <FontAwesomeIcon
                  icon={['fas', 'arrow-up']}
                  className="font-size-sm text-first opacity-5"
                />
              </div>
            </div>
          </PerfectScrollbar>
        </div>
      </Card>
    </>
  );
}
