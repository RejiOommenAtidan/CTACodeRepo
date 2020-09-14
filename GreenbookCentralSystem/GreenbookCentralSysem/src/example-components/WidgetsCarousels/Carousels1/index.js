import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import Slider from 'react-slick';

import stock1 from '../../../assets/images/stock-photos/stock-4.jpg';
import stock2 from '../../../assets/images/stock-photos/stock-5.jpg';
import stock3 from '../../../assets/images/stock-photos/stock-2.jpg';

import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';

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
  const widgetsCarousels1A = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SliderArrowNext />,
    prevArrow: <SliderArrowPrev />
  };

  const widgetsCarousels1B = {
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
        <Grid container spacing={6} className="align-items-center">
          <Grid item lg={6}>
            <Slider
              className="rounded-lg overflow-hidden mb-lg-0 slider-dots-light"
              {...widgetsCarousels1A}>
              <div>
                <Card className="shadow-none rounded-lg overflow-hidden">
                  <div className="card-img-wrapper rounded">
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="img-wrapper-overlay p-4 p-xl-5 img-wrapper-overlay--visible rounded">
                      <div className="overlay-btn-wrapper card-body text-white text-center">
                        <h5 className="px-2 font-weight-bold display-4 mb-4">
                          Bamburgh React Admin Dashboard with Material-UI PRO
                        </h5>
                        <p className="font-size-lg text-white-50 mb-0">
                          Premium admin template powered by the most popular UI
                          components framework available for React: Material-UI.
                          Features hundreds of examples making web development
                          fast and easy. Start from one of the individual apps
                          included or from the general dashboard and build
                          beautiful scalable applications and presentation
                          websites.
                        </p>
                        <div className="mt-4">
                          <div className="avatar-icon-wrapper mx-auto mb-2">
                            <div className="avatar-icon shadow-sm-dark">
                              <img alt="..." src={avatar6} />
                            </div>
                          </div>
                          <div>Dalia Finney</div>
                        </div>
                      </div>
                      <div className="card-badges card-badges-top">
                        <div className="badge badge-pill badge-danger">
                          Development
                        </div>
                      </div>
                    </a>
                    <img
                      src={stock1}
                      className="card-overlay-image img-fit-container rounded"
                      alt="..."
                    />
                  </div>
                </Card>
              </div>
              <div>
                <Card className="shadow-none rounded-lg overflow-hidden">
                  <div className="card-img-wrapper rounded">
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="img-wrapper-overlay p-4 p-xl-5 img-wrapper-overlay--visible rounded">
                      <div className="overlay-btn-wrapper card-body text-white text-center">
                        <h5 className="px-2 font-weight-bold display-4 mb-4">
                          Bamburgh React Admin Dashboard with Material-UI PRO
                        </h5>
                        <p className="font-size-lg text-white-50 mb-0">
                          Premium admin template powered by the most popular UI
                          components framework available for React: Material-UI.
                          Features hundreds of examples making web development
                          fast and easy. Start from one of the individual apps
                          included or from the general dashboard and build
                          beautiful scalable applications and presentation
                          websites.
                        </p>
                        <div className="mt-4">
                          <div className="avatar-icon-wrapper mx-auto mb-2">
                            <div className="avatar-icon shadow-sm-dark">
                              <img alt="..." src={avatar7} />
                            </div>
                          </div>
                          <div>Miranda Lawson</div>
                        </div>
                      </div>
                      <div className="card-badges">
                        <div className="badge badge-pill badge-neutral-success text-success">
                          Marketing
                        </div>
                      </div>
                    </a>
                    <img
                      src={stock2}
                      className="card-overlay-image img-fit-container rounded"
                      alt="..."
                    />
                  </div>
                </Card>
              </div>
            </Slider>
          </Grid>
          <Grid item lg={6}>
            <Card className="shadow-xxl d-block p-4">
              <Slider
                className="rounded-lg overflow-hidden slider-dots-light"
                {...widgetsCarousels1B}>
                <div>
                  <Card className="shadow-none">
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="card-img-wrapper h-320px">
                      <div className="img-wrapper-overlay">
                        <div className="overlay-btn-wrapper">
                          <Button className="btn-facebook m-2 btn-icon hover-scale-lg btn-animated-icon d-50 p-0 border-0 rounded-lg">
                            <span className="btn-wrapper--icon d-flex">
                              <FontAwesomeIcon
                                icon={['fab', 'facebook']}
                                className="font-size-lg"
                              />
                            </span>
                          </Button>
                          <Button className="btn-twitter m-2 btn-icon hover-scale-lg btn-animated-icon d-50 p-0 border-0 rounded-lg">
                            <span className="btn-wrapper--icon d-flex">
                              <FontAwesomeIcon
                                icon={['fab', 'twitter']}
                                className="font-size-lg"
                              />
                            </span>
                          </Button>
                        </div>
                      </div>
                      <div className="card-badges card-badges-bottom">
                        <div className="badge badge-pill badge-warning">
                          Pending
                        </div>
                      </div>
                      <img src={stock1} className="w-auto rounded" alt="..." />
                    </a>
                  </Card>
                </div>
                <div>
                  <Card className="shadow-none">
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="card-img-wrapper h-320px">
                      <div className="img-wrapper-overlay">
                        <div className="overlay-btn-wrapper">
                          <div className="avatar-icon-wrapper mx-auto mb-2">
                            <div className="avatar-icon">
                              <img alt="..." src={avatar5} />
                            </div>
                          </div>
                          <div className="font-size-lg font-weight-bold">
                            Darrel Devlin
                          </div>
                          <div className="text-white-50 pb-4">
                            Senior UX Developer, Apple Inc.
                          </div>
                          <Button
                            size="small"
                            className="btn-info btn-pill px-4 hover-scale-sm">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon icon={['fas', 'download']} />
                            </span>
                            <span className="btn-wrapper--label">
                              View Profile
                            </span>
                          </Button>
                        </div>
                      </div>
                      <div className="card-badges">
                        <div className="badge badge-pill badge-neutral-info text-info">
                          Articles
                        </div>
                      </div>
                      <img
                        src={stock2}
                        className="card-img-top rounded"
                        alt="..."
                      />
                    </a>
                  </Card>
                </div>
                <div>
                  <Card className="shadow-none">
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="card-img-wrapper h-320px">
                      <div className="img-wrapper-overlay">
                        <div className="overlay-btn-wrapper">
                          <Button
                            variant="text"
                            className="btn-outline-secondary shadow-sm-dark btn-pill d-inline-flex justify-content-center align-items-center border-2 p-0 d-40 m-1">
                            <FontAwesomeIcon icon={['far', 'comment-dots']} />
                          </Button>
                          <Button
                            variant="text"
                            className="btn-outline-secondary shadow-sm-dark btn-pill d-inline-flex justify-content-center align-items-center border-2 p-0 d-40 m-1">
                            <FontAwesomeIcon icon={['far', 'envelope']} />
                          </Button>
                        </div>
                      </div>
                      <div className="card-badges card-badges-bottom">
                        <div className="badge badge-danger">Overdue</div>
                      </div>
                      <img
                        src={stock3}
                        className="card-img-top rounded"
                        alt="..."
                      />
                    </a>
                  </Card>
                </div>
              </Slider>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
