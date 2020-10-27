import React from 'react';

import { Grid, Container, Button } from '@material-ui/core';

import hero8 from '../../../assets/images/hero-bg/hero-8.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-second">
        <div className="hero-wrapper--content flex-column">
          <div className="shape-container-bottom-2 w-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="var(--light)"
                fillOpacity="1"
                d="M0,288L34.3,250.7C68.6,213,137,139,206,144C274.3,149,343,235,411,229.3C480,224,549,128,617,101.3C685.7,75,754,117,823,122.7C891.4,128,960,96,1029,112C1097.1,128,1166,192,1234,186.7C1302.9,181,1371,107,1406,69.3L1440,32L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path>
            </svg>
          </div>
          <div
            className="bg-composed-wrapper--image opacity-3"
            style={{ backgroundImage: 'url(' + hero8 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-deep-sky opacity-4" />
          <div className="bg-composed-wrapper--content pb-5">
            <Container className="py-5 text-center">
              <div className="py-5 py-sm-0">
                <div>
                  <h4 className="font-weight-bold text-white display-4">
                    Monthly Subscription
                  </h4>
                  <Grid item md={8} lg={6} className="mx-auto">
                    <p className="text-white opacity-8 mt-3 mb-5 font-size-xl">
                      View any of the 5+ live previews we&#39;ve set up to learn
                      why this dashboard template is the last one you&#39;ll
                      ever need!
                    </p>
                  </Grid>
                </div>
                <Button className="btn-success px-5 font-size-lg shadow-sm-dark py-3 btn-pill mx-2">
                  Buy Now
                </Button>
                <Button className="btn-primary bg-white px-4 text-second shadow-sm font-weight-bold py-2 btn-pill mx-2">
                  Learn more
                </Button>
              </div>
            </Container>
          </div>
          <div className="shape-container-top-1 w-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="var(--light)"
                fillOpacity="1"
                d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,202.7C672,213,768,235,864,213.3C960,192,1056,128,1152,133.3C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
