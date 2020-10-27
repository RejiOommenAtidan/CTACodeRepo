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
      <Card>
        <div className="bg-asteroid rounded py-5">
          <Container className="py-5">
            <div className="d-flex flex-wrap align-items-center justify-content-center">
              <div className="m-4 hover-scale-lg">
                <div className="rounded-sm btn-icon d-110 shadow-sm-dark bg-secondary hover-scale-rounded d-flex align-self-stretch">
                  <img
                    src={logo1}
                    style={{ height: 51 }}
                    className="m-auto img-fluid"
                    alt="..."
                  />
                </div>
              </div>
              <div className="m-4 hover-scale-lg">
                <div className="rounded-sm btn-icon d-110 shadow-sm-dark bg-secondary hover-scale-rounded d-flex align-self-stretch">
                  <img
                    src={logo2}
                    style={{ height: 51 }}
                    className="m-auto img-fluid"
                    alt="..."
                  />
                </div>
              </div>
              <div className="m-4 hover-scale-lg">
                <div className="rounded-sm btn-icon d-110 shadow-sm-dark bg-secondary hover-scale-rounded d-flex align-self-stretch">
                  <img
                    src={logo3}
                    style={{ height: 51 }}
                    className="m-auto img-fluid"
                    alt="..."
                  />
                </div>
              </div>
              <div className="m-4 hover-scale-lg">
                <div className="rounded-sm btn-icon d-110 shadow-sm-dark bg-secondary hover-scale-rounded d-flex align-self-stretch">
                  <img
                    src={logo4}
                    style={{ height: 51 }}
                    className="m-auto img-fluid"
                    alt="..."
                  />
                </div>
              </div>
              <div className="m-4 hover-scale-lg">
                <div className="rounded-sm btn-icon d-110 shadow-sm-dark bg-secondary hover-scale-rounded d-flex align-self-stretch">
                  <img
                    src={logo5}
                    style={{ height: 51 }}
                    className="m-auto img-fluid"
                    alt="..."
                  />
                </div>
              </div>
              <div className="m-4 hover-scale-lg">
                <div className="rounded-sm btn-icon d-110 shadow-sm-dark bg-secondary hover-scale-rounded d-flex align-self-stretch">
                  <img
                    src={logo6}
                    style={{ height: 51 }}
                    className="m-auto img-fluid"
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Card>
    </>
  );
}
