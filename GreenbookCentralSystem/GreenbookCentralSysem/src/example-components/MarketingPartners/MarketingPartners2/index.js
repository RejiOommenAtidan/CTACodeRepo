import React from 'react';

import { Container } from '@material-ui/core';

import logo1 from '../../../assets/images/stock-logos/netflix.svg';
import logo2 from '../../../assets/images/stock-logos/airbnb.svg';
import logo3 from '../../../assets/images/stock-logos/instagram.svg';
import logo4 from '../../../assets/images/stock-logos/slack.svg';
import logo5 from '../../../assets/images/stock-logos/google.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="shadow-xxl rounded bg-white mb-spacing-6-x2">
        <div className="py-5">
          <Container>
            <div className="d-flex align-items-center justify-content-center flex-wrap">
              <div className="p-3 m-3 d-flex align-self-stretch">
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="bg-filter-grayscale opacity-8 hover-scale-lg">
                  <img
                    src={logo1}
                    style={{ height: 40 }}
                    className="m-auto img-fluid"
                    alt="..."
                  />
                </a>
              </div>
              <div className="p-3 m-3 d-flex align-self-stretch">
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="bg-filter-grayscale opacity-8 hover-scale-lg">
                  <img
                    src={logo2}
                    style={{ height: 40 }}
                    className="m-auto img-fluid"
                    alt="..."
                  />
                </a>
              </div>
              <div className="p-3 m-3 d-flex align-self-stretch">
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="bg-filter-grayscale opacity-8 hover-scale-lg">
                  <img
                    src={logo3}
                    style={{ height: 40 }}
                    className="m-auto img-fluid"
                    alt="..."
                  />
                </a>
              </div>
              <div className="p-3 m-3 d-flex align-self-stretch">
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="bg-filter-grayscale opacity-8 hover-scale-lg">
                  <img
                    src={logo4}
                    style={{ height: 40 }}
                    className="m-auto img-fluid"
                    alt="..."
                  />
                </a>
              </div>
              <div className="p-3 m-3 d-flex align-self-stretch">
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="bg-filter-grayscale opacity-8 hover-scale-lg">
                  <img
                    src={logo5}
                    style={{ height: 40 }}
                    className="m-auto img-fluid"
                    alt="..."
                  />
                </a>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
