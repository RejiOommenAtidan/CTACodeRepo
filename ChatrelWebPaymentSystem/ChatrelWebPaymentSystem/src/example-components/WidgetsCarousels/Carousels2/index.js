import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Card } from '@material-ui/core';

import Slider from 'react-slick';

function SliderArrowNext(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={['fas', 'chevron-right']} />
    </div>
  );
}

function SliderArrowPrev(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={['fas', 'chevron-left']} />
    </div>
  );
}

export default function LivePreviewExample() {
  const widgetsCarousels2A = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SliderArrowNext />,
    prevArrow: <SliderArrowPrev />,
    responsive: [
      {
        breakpoint: 1450,
        settings: { slidesToShow: 2, slidesToScroll: 1 }
      },
      {
        breakpoint: 1300,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <>
      <Card className="mb-spacing-6-x2">
        <Container className="py-3">
          <Slider className="overflow-hidden" {...widgetsCarousels2A}>
            <div>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="mx-3 mx-xl-5 my-5 card shadow-xxl card-border-top br-tl br-tr card-box-hover-rise border-primary text-center p-3 p-xl-4 mb-5 d-block">
                <div className="d-50 btn-icon rounded-circle bg-primary text-white mb-4 mx-auto">
                  <FontAwesomeIcon
                    icon={['far', 'keyboard']}
                    className="font-size-xl"
                  />
                </div>
                <h5 className="font-weight-bold font-size-lg text-second mb-0">
                  Profiles
                </h5>
                <p className="text-second opacity-8 mt-3 mb-4">
                  You can build unlimited layout styles using any of the 500+
                  included components and elements. Powerful, unique template
                  built for React and Material-UI.
                </p>
                <div className="rounded-pill py-1 px-4 text-uppercase font-size-xs bg-neutral-dark text-second d-inline-flex font-weight-bold">
                  PROMO
                </div>
              </a>
            </div>
            <div>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="mx-3 mx-xl-5 my-5 card shadow-xxl card-border-top br-tl br-tr card-box-hover-rise border-danger text-center p-3 p-xl-4 mb-5 d-block">
                <div className="d-50 btn-icon rounded-circle bg-danger text-white mb-4 mx-auto">
                  <FontAwesomeIcon
                    icon={['far', 'envelope']}
                    className="font-size-xl"
                  />
                </div>
                <h5 className="font-weight-bold font-size-lg text-second mb-0">
                  Applications
                </h5>
                <p className="text-second opacity-8 mt-3 mb-4">
                  You can build unlimited layout styles using any of the 500+
                  included components and elements. Powerful, unique template
                  built for React and Material-UI.
                </p>
                <div className="rounded-pill py-1 px-4 text-uppercase font-size-xs bg-neutral-dark text-second d-inline-flex font-weight-bold">
                  ADS
                </div>
              </a>
            </div>
            <div>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="mx-3 mx-xl-5 my-5 card shadow-xxl card-border-top br-tl br-tr card-box-hover-rise border-success text-center p-3 p-xl-4 mb-5 d-block">
                <div className="d-50 btn-icon rounded-circle bg-success text-white mb-4 mx-auto">
                  <FontAwesomeIcon
                    icon={['far', 'address-card']}
                    className="font-size-xl"
                  />
                </div>
                <h5 className="font-weight-bold font-size-lg text-second mb-0">
                  Settings
                </h5>
                <p className="text-second opacity-8 mt-3 mb-4">
                  You can build unlimited layout styles using any of the 500+
                  included components and elements. Powerful, unique template
                  built for React and Material-UI.
                </p>
                <div className="rounded-pill py-1 px-4 text-uppercase font-size-xs bg-neutral-dark text-second d-inline-flex font-weight-bold">
                  SEO
                </div>
              </a>
            </div>
            <div>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="mx-3 mx-xl-5 my-5 card shadow-xxl card-border-top br-tl br-tr card-box-hover-rise border-first text-center p-3 p-xl-4 mb-5 d-block">
                <div className="d-50 btn-icon rounded-circle bg-first text-white mb-4 mx-auto">
                  <FontAwesomeIcon
                    icon={['far', 'lightbulb']}
                    className="font-size-xl"
                  />
                </div>
                <h5 className="font-weight-bold font-size-lg text-second mb-0">
                  Invoices
                </h5>
                <p className="text-second opacity-8 mt-3 mb-4">
                  You can build unlimited layout styles using any of the 500+
                  included components and elements. Powerful, unique template
                  built for React and Material-UI.
                </p>
                <div className="rounded-pill py-1 px-4 text-uppercase font-size-xs bg-neutral-dark text-second d-inline-flex font-weight-bold">
                  Stats
                </div>
              </a>
            </div>
            <div>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="mx-3 mx-xl-5 my-5 card shadow-xxl card-border-top br-tl br-tr card-box-hover-rise border-warning text-center p-3 p-xl-4 mb-5 d-block">
                <div className="d-50 btn-icon rounded-circle bg-warning text-white mb-4 mx-auto">
                  <FontAwesomeIcon
                    icon={['far', 'object-group']}
                    className="font-size-xl"
                  />
                </div>
                <h5 className="font-weight-bold font-size-lg text-second mb-0">
                  Campaigns
                </h5>
                <p className="text-second opacity-8 mt-3 mb-4">
                  You can build unlimited layout styles using any of the 500+
                  included components and elements. Powerful, unique template
                  built for React and Material-UI.
                </p>
                <div className="rounded-pill py-1 px-4 text-uppercase font-size-xs bg-neutral-dark text-second d-inline-flex font-weight-bold">
                  Earnings
                </div>
              </a>
            </div>
            <div>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="mx-3 mx-xl-5 my-5 card shadow-xxl card-border-top br-tl br-tr card-box-hover-rise border-info text-center p-3 p-xl-4 mb-5 d-block">
                <div className="d-50 btn-icon rounded-circle bg-info text-white mb-4 mx-auto">
                  <FontAwesomeIcon
                    icon={['fas', 'bomb']}
                    className="font-size-xl"
                  />
                </div>
                <h5 className="font-weight-bold font-size-lg text-second mb-0">
                  Performance
                </h5>
                <p className="text-second opacity-8 mt-3 mb-4">
                  You can build unlimited layout styles using any of the 500+
                  included components and elements. Powerful, unique template
                  built for React and Material-UI.
                </p>
                <div className="rounded-pill py-1 px-4 text-uppercase font-size-xs bg-neutral-dark text-second d-inline-flex font-weight-bold">
                  Clicks
                </div>
              </a>
            </div>
          </Slider>
        </Container>
      </Card>
    </>
  );
}
