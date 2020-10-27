import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Button } from '@material-ui/core';

import hero7 from '../../../assets/images/hero-bg/hero-7.jpg';
import illustration1 from '../../../assets/images/illustrations/pack2/graduation.svg';

import MarketingHeaders1 from '../../MarketingHeaders/MarketingHeaders1';

export default function LivePreviewExample() {
  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-plum-plate">
        <Container className="py-2">
          <MarketingHeaders1 />
        </Container>
        <div className="divider bg-white-5" />
        <div className="hero-wrapper--content">
          <div
            className="bg-composed-wrapper--image"
            style={{ backgroundImage: 'url(' + hero7 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-second opacity-5" />
          <div className="bg-composed-wrapper--content">
            <Container className="text-white py-5 z-over">
              <Grid container spacing={6}>
                <Grid item lg={6} className="d-flex align-items-start">
                  <div className="text-center mb-5 mb-lg-0 pt-0 pt-xl-5">
                    <h2 className="display-3 font-weight-bold">
                      Bamburgh React Admin Dashboard with Material-UI PRO
                    </h2>
                    <p className="font-size-lg py-3 text-white-50">
                      View any of the 5+ live previews we&#39;ve set up to learn
                      why this dashboard template is the last one you&#39;ll
                      ever need!
                    </p>
                    <div className="mt-4">
                      <Button className="btn-first px-5 font-size-sm font-weight-bold btn-animated-icon text-uppercase rounded shadow-none py-3 hover-scale-sm hover-scale-lg mr-3">
                        <span className="btn-wrapper--label">Purchase now</span>
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                        </span>
                      </Button>
                    </div>
                  </div>
                </Grid>
                <Grid item lg={6} className="d-flex align-items-center">
                  <img
                    src={illustration1}
                    alt="..."
                    className="m-5 m-lg-0 img-fit-container"
                  />
                </Grid>
              </Grid>
            </Container>
            <div
              className="shape-container-top-1 z-below"
              style={{ marginTop: '-250px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="var(--light)"
                  fillOpacity="1"
                  d="M0,224L1440,96L1440,320L0,320Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
