import React from 'react';

import { Container, Card } from '@material-ui/core';

import logo1 from '../../../assets/images/stock-logos/netflix-icon.svg';
import logo2 from '../../../assets/images/stock-logos/airbnb-icon.svg';
import logo3 from '../../../assets/images/stock-logos/instagram-icon.svg';
import logo4 from '../../../assets/images/stock-logos/slack-icon.svg';
import logo5 from '../../../assets/images/stock-logos/google-icon.svg';
import logo6 from '../../../assets/images/stock-logos/microsoft-icon.svg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="mb-spacing-6-x2">
        <div className="py-5">
          <Container className="py-5">
            <div className="d-flex flex-wrap align-items-center justify-content-center">
              <div className="rounded-circle btn-icon d-110 shadow-xxl m-4 hover-scale-lg d-flex align-self-stretch">
                <img
                  src={logo1}
                  style={{ height: 46 }}
                  className="m-auto img-fluid"
                  alt="..."
                />
              </div>
              <div className="rounded-circle btn-icon d-80 shadow-xxl m-4 hover-scale-lg d-flex align-self-stretch">
                <img
                  src={logo2}
                  style={{ height: 49 }}
                  className="m-auto img-fluid"
                  alt="..."
                />
              </div>
              <div className="rounded-circle btn-icon d-140 shadow-xxl m-4 hover-scale-lg d-flex align-self-stretch">
                <img
                  src={logo3}
                  style={{ height: 51 }}
                  className="m-auto img-fluid"
                  alt="..."
                />
              </div>
              <div className="rounded-circle btn-icon d-70 shadow-xxl m-4 hover-scale-lg d-flex align-self-stretch">
                <img
                  src={logo4}
                  style={{ height: 55 }}
                  className="m-auto img-fluid"
                  alt="..."
                />
              </div>
              <div className="rounded-circle btn-icon d-110 shadow-xxl m-4 hover-scale-lg d-flex align-self-stretch">
                <img
                  src={logo5}
                  style={{ height: 41 }}
                  className="m-auto img-fluid"
                  alt="..."
                />
              </div>
              <div className="rounded-circle btn-icon d-100 shadow-xxl m-4 hover-scale-lg d-flex align-self-stretch">
                <img
                  src={logo6}
                  style={{ height: 51 }}
                  className="m-auto img-fluid"
                  alt="..."
                />
              </div>
            </div>
          </Container>
        </div>
      </Card>
    </>
  );
}
