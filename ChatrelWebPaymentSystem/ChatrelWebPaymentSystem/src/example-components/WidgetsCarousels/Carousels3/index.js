import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import Slider from 'react-slick';

import product1 from '../../../assets/images/stock-products/product-4.png';
import product2 from '../../../assets/images/stock-products/product-5.png';
import product3 from '../../../assets/images/stock-products/product-6.png';

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
  const widgetsCarousels3A = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SliderArrowNext />,
    prevArrow: <SliderArrowPrev />
  };

  return (
    <>
      <div className="mb-spacing-6-x2">
        <Grid container spacing={0}>
          <Grid item xl={6}>
            <div className="bg-light-pure shadow-xxl rounded-lg br-xl-right-0 p-5">
              <Grid item sm={10} md={8} xl={9} className="mx-auto">
                <Slider
                  className="rounded-lg overflow-hidden slider-arrows-outside slider-dots-outside slider-dots-light"
                  {...widgetsCarousels3A}>
                  <div>
                    <Card className="text-center m-3">
                      <div className="card-tr-actions">
                        <Button
                          className="btn-link p-0 font-size-xl"
                          variant="text">
                          <FontAwesomeIcon
                            icon={['far', 'heart']}
                            className="font-size-lg text-danger"
                          />
                        </Button>
                      </div>
                      <Card className="card-transparent mx-auto hover-scale-sm mt-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="card-img-wrapper card-box-hover rounded">
                          <img
                            alt="..."
                            className="card-img-top rounded-sm"
                            src={product1}
                            style={{ width: 100 }}
                          />
                        </a>
                      </Card>
                      <div className="card-header-alt d-flex flex-column justify-content-center p-3">
                        <h6 className="font-weight-bold font-size-lg mb-2 text-black">
                          Apple MacBook PRO
                        </h6>
                        <p className="text-black-50 font-size-sm mb-0">
                          You can build unlimited layout styles using any of the
                          500+ included components and elements. Powerful,
                          unique template built for React and Material-UI.
                        </p>
                      </div>

                      <div className="pb-3">
                        <div className="badge badge-neutral-primary text-primary badge-pill font-weight-normal font-size-sm font-weight-bold h-auto py-2 px-3">
                          $1,287
                        </div>
                      </div>

                      <div className="divider w-50 mx-auto" />

                      <div className="py-2 d-flex align-items-center justify-content-center">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle btn-swatch bg-danger">
                          &nbsp;
                        </a>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle btn-swatch bg-first">
                          &nbsp;
                        </a>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle btn-swatch bg-warning">
                          &nbsp;
                        </a>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle btn-swatch bg-deep-blue">
                          &nbsp;
                        </a>
                      </div>

                      <div className="divider w-50 mx-auto" />

                      <div className="py-3">
                        <Button className="btn-success text-uppercase font-weight-bold font-size-xs">
                          Buy Now
                        </Button>
                      </div>
                    </Card>
                  </div>
                  <div>
                    <Card className="text-center m-3">
                      <div className="card-tr-actions">
                        <Button
                          className="btn-link p-0 font-size-xl"
                          variant="text">
                          <FontAwesomeIcon
                            icon={['far', 'heart']}
                            className="font-size-lg text-danger"
                          />
                        </Button>
                      </div>
                      <Card className="card-transparent mx-auto hover-scale-sm mt-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="card-img-wrapper card-box-hover rounded">
                          <img
                            alt="..."
                            className="card-img-top rounded-sm"
                            src={product2}
                            style={{ width: 100 }}
                          />
                        </a>
                      </Card>
                      <div className="card-header-alt d-flex flex-column justify-content-center p-3">
                        <h6 className="font-weight-bold font-size-lg mb-2 text-black">
                          Headphones Pro 3
                        </h6>
                        <p className="text-black-50 font-size-sm mb-0">
                          You can build unlimited layout styles using any of the
                          500+ included components and elements. Powerful,
                          unique template built for React and Material-UI.
                        </p>
                      </div>

                      <div className="pb-3">
                        <div className="badge badge-neutral-primary text-primary badge-pill font-weight-normal font-size-sm font-weight-bold h-auto py-2 px-3">
                          $149
                        </div>
                      </div>

                      <div className="divider w-50 mx-auto" />

                      <div className="py-2 d-flex align-items-center justify-content-center">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle btn-swatch bg-danger">
                          &nbsp;
                        </a>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle btn-swatch bg-first">
                          &nbsp;
                        </a>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle btn-swatch bg-warning">
                          &nbsp;
                        </a>
                      </div>

                      <div className="divider w-50 mx-auto" />

                      <div className="py-3">
                        <Button className="btn-success text-uppercase font-weight-bold font-size-xs">
                          Buy Now
                        </Button>
                      </div>
                    </Card>
                  </div>
                  <div>
                    <Card className="text-center m-3">
                      <div className="card-tr-actions">
                        <Button
                          className="btn-link p-0 font-size-xl"
                          variant="text">
                          <FontAwesomeIcon
                            icon={['far', 'heart']}
                            className="font-size-lg text-danger"
                          />
                        </Button>
                      </div>
                      <Card className="card-transparent mx-auto hover-scale-sm mt-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="card-img-wrapper card-box-hover rounded">
                          <img
                            alt="..."
                            className="card-img-top rounded-sm"
                            src={product3}
                            style={{ width: 100 }}
                          />
                        </a>
                      </Card>
                      <div className="card-header-alt d-flex flex-column justify-content-center p-3">
                        <h6 className="font-weight-bold font-size-lg mb-2 text-black">
                          Apple iWatch IV
                        </h6>
                        <p className="text-black-50 font-size-sm mb-0">
                          You can build unlimited layout styles using any of the
                          500+ included components and elements. Powerful,
                          unique template built for React and Material-UI.
                        </p>
                      </div>

                      <div className="pb-3">
                        <div className="badge badge-neutral-primary text-primary badge-pill font-weight-normal font-size-sm font-weight-bold h-auto py-2 px-3">
                          $329
                        </div>
                      </div>

                      <div className="divider w-50 mx-auto" />

                      <div className="py-2 d-flex align-items-center justify-content-center">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle btn-swatch bg-danger">
                          &nbsp;
                        </a>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle btn-swatch bg-warning">
                          &nbsp;
                        </a>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle btn-swatch bg-deep-blue">
                          &nbsp;
                        </a>
                      </div>

                      <div className="divider w-50 mx-auto" />

                      <div className="py-3">
                        <Button className="btn-success text-uppercase font-weight-bold font-size-xs">
                          Buy Now
                        </Button>
                      </div>
                    </Card>
                  </div>
                </Slider>
              </Grid>
            </div>
          </Grid>
          <Grid item xl={6}>
            <div className="bg-white shadow-xxl rounded-lg br-xl-left-0 p-5">
              <Grid item sm={10} md={8} xl={9} className="mx-auto">
                <Slider
                  className="rounded-lg overflow-hidden slider-arrows-outside slider-arrows-dark slider-dots-outside"
                  {...widgetsCarousels3A}>
                  <div>
                    <Card className="bg-second text-center m-3">
                      <div className="card-tr-actions">
                        <Button
                          className="btn-link p-0 font-size-xl"
                          variant="text">
                          <FontAwesomeIcon
                            icon={['far', 'heart']}
                            className="font-size-lg text-danger"
                          />
                        </Button>
                      </div>
                      <Card className="card-transparent mx-auto hover-scale-sm mt-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="card-img-wrapper card-box-hover rounded">
                          <img
                            alt="..."
                            className="card-img-top rounded-sm"
                            src={product1}
                            style={{ width: 100 }}
                          />
                        </a>
                      </Card>
                      <div className="card-header-alt d-flex flex-column justify-content-center p-3">
                        <h6 className="font-weight-bold font-size-lg mb-2 text-white">
                          Apple MacBook PRO
                        </h6>
                        <p className="text-white-50 font-size-sm mb-0">
                          You can build unlimited layout styles using any of the
                          500+ included components and elements. Powerful,
                          unique template built for React and Material-UI.
                        </p>
                      </div>

                      <div className="pb-3">
                        <div className="badge bg-white-10 text-white badge-pill font-weight-normal font-size-sm font-weight-bold h-auto py-2 px-3">
                          $1,287
                        </div>
                      </div>

                      <div className="divider bg-white opacity-2 w-50 mx-auto" />

                      <div className="py-2 d-flex align-items-center justify-content-center">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle border-0 btn-swatch bg-danger">
                          &nbsp;
                        </a>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle border-0 btn-swatch bg-first">
                          &nbsp;
                        </a>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle border-0 btn-swatch bg-warning">
                          &nbsp;
                        </a>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle border-0 btn-swatch bg-deep-blue">
                          &nbsp;
                        </a>
                      </div>

                      <div className="divider bg-white opacity-2 w-50 mx-auto" />

                      <div className="py-3">
                        <Button className="btn-success text-uppercase font-weight-bold font-size-xs">
                          Buy Now
                        </Button>
                      </div>
                    </Card>
                  </div>
                  <div>
                    <Card className="bg-second text-center m-3">
                      <div className="card-tr-actions">
                        <Button
                          className="btn-link p-0 font-size-xl"
                          variant="text">
                          <FontAwesomeIcon
                            icon={['far', 'heart']}
                            className="font-size-lg text-danger"
                          />
                        </Button>
                      </div>
                      <Card className="card-transparent mx-auto hover-scale-sm mt-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="card-img-wrapper card-box-hover rounded">
                          <img
                            alt="..."
                            className="card-img-top rounded-sm"
                            src={product2}
                            style={{ width: 100 }}
                          />
                        </a>
                      </Card>
                      <div className="card-header-alt d-flex flex-column justify-content-center p-3">
                        <h6 className="font-weight-bold font-size-lg mb-2 text-white">
                          Headphones Pro 3
                        </h6>
                        <p className="text-white-50 font-size-sm mb-0">
                          You can build unlimited layout styles using any of the
                          500+ included components and elements. Powerful,
                          unique template built for React and Material-UI.
                        </p>
                      </div>

                      <div className="pb-3">
                        <div className="badge bg-white-10 text-white badge-pill font-weight-normal font-size-sm font-weight-bold h-auto py-2 px-3">
                          $149
                        </div>
                      </div>

                      <div className="divider bg-white opacity-2 w-50 mx-auto" />

                      <div className="py-2 d-flex align-items-center justify-content-center">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle border-0 btn-swatch bg-danger">
                          &nbsp;
                        </a>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle border-0 btn-swatch bg-first">
                          &nbsp;
                        </a>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle border-0 btn-swatch bg-warning">
                          &nbsp;
                        </a>
                      </div>

                      <div className="divider bg-white opacity-2 w-50 mx-auto" />

                      <div className="py-3">
                        <Button className="btn-success text-uppercase font-weight-bold font-size-xs">
                          Buy Now
                        </Button>
                      </div>
                    </Card>
                  </div>
                  <div>
                    <Card className="bg-second text-center m-3">
                      <div className="card-tr-actions">
                        <Button
                          className="btn-link p-0 font-size-xl"
                          variant="text">
                          <FontAwesomeIcon
                            icon={['far', 'heart']}
                            className="font-size-lg text-danger"
                          />
                        </Button>
                      </div>
                      <Card className="card-transparent mx-auto hover-scale-sm mt-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="card-img-wrapper card-box-hover rounded">
                          <img
                            alt="..."
                            className="card-img-top rounded-sm"
                            src={product3}
                            style={{ width: 100 }}
                          />
                        </a>
                      </Card>
                      <div className="card-header-alt d-flex flex-column justify-content-center p-3">
                        <h6 className="font-weight-bold font-size-lg mb-2 text-white">
                          Apple iWatch IV
                        </h6>
                        <p className="text-white-50 font-size-sm mb-0">
                          You can build unlimited layout styles using any of the
                          500+ included components and elements. Powerful,
                          unique template built for React and Material-UI.
                        </p>
                      </div>

                      <div className="pb-3">
                        <div className="badge bg-white-10 text-white badge-pill font-weight-normal font-size-sm font-weight-bold h-auto py-2 px-3">
                          $329
                        </div>
                      </div>

                      <div className="divider bg-white opacity-2 w-50 mx-auto" />

                      <div className="py-2 d-flex align-items-center justify-content-center">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle border-0 btn-swatch bg-danger">
                          &nbsp;
                        </a>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle border-0 btn-swatch bg-warning">
                          &nbsp;
                        </a>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="m-2 d-20 rounded-circle border-0 btn-swatch bg-deep-blue">
                          &nbsp;
                        </a>
                      </div>

                      <div className="divider bg-white opacity-2 w-50 mx-auto" />

                      <div className="py-3">
                        <Button className="btn-success text-uppercase font-weight-bold font-size-xs">
                          Buy Now
                        </Button>
                      </div>
                    </Card>
                  </div>
                </Slider>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
