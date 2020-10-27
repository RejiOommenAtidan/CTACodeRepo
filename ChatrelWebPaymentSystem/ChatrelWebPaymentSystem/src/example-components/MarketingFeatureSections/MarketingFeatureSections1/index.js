import React from 'react';

import { Grid, Container } from '@material-ui/core';

import Slider from 'react-slick';
import illustration1 from '../../../assets/images/illustrations/pack2/financial_analyst.svg';
export default function LivePreviewExample() {
  return (
    <>
      <div className="feature-box py-3 py-xl-5">
        <Container className="py-3 py-xl-5">
          <Grid container spacing={6}>
            <Grid item xl={6}>
              <div className="py-0 pb-5 py-xl-5">
                <div className="pr-0 pr-xl-5">
                  <h1 className="display-3 mb-3 font-weight-bold">
                    Bamburgh React Admin Dashboard with Material-UI PRO
                  </h1>
                  <p className="font-size-lg text-black-50">
                    View any of the 5+ live previews we&#39;ve set up to learn
                    why this dashboard template is the last one you&#39;ll ever
                    need!
                  </p>
                </div>
                <div className="d-block mt-4">
                  <Slider
                    slidesToShow={2}
                    slidesToScroll={2}
                    dots={true}
                    className="slick-slider slider-dots-outside slick-slider-left">
                    <div>
                      <div className="feature-box pr-4">
                        <h3 className="font-size-lg font-weight-bold my-3">
                          <a
                            className="text-first"
                            href="#/"
                            onClick={(e) => e.preventDefault()}>
                            Elements
                          </a>
                        </h3>
                        <p className="text-black-50 mb-3">
                          It takes a trivial example, which of us ever
                          undertakes.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="feature-box pr-4">
                        <h3 className="font-size-lg font-weight-bold my-3">
                          <a
                            className="text-first"
                            href="#/"
                            onClick={(e) => e.preventDefault()}>
                            Widgets
                          </a>
                        </h3>
                        <p className="text-black-50 mb-3">
                          Occur in which toil and pain can procure him some
                          great pleasure.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="feature-box pr-4">
                        <h3 className="font-size-lg font-weight-bold my-3">
                          <a
                            className="text-first"
                            href="#/"
                            onClick={(e) => e.preventDefault()}>
                            Components
                          </a>
                        </h3>
                        <p className="text-black-50 mb-3">
                          Nor again is there anyone who loves or pursues or
                          desires.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="feature-box pr-4">
                        <h3 className="font-size-lg font-weight-bold my-3">
                          <a
                            className="text-first"
                            href="#/"
                            onClick={(e) => e.preventDefault()}>
                            Pages
                          </a>
                        </h3>
                        <p className="text-black-50 mb-3">
                          On the other hand, we denounce with righteous
                          indignation.
                        </p>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </Grid>
            <Grid item xl={6} className="d-none d-xl-flex align-items-center">
              <img alt="..." className="w-100" src={illustration1} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
