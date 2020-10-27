import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Card, CardContent } from '@material-ui/core';

import Slider from 'react-slick';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';

import hero3 from '../../../assets/images/hero-bg/hero-3.jpg';

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
  const marketingTestimonials4 = {
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
      <div className="hero-wrapper bg-composed-wrapper bg-midnight-bloom pt-5 mb-spacing-6-x2">
        <div className="flex-grow-1 w-100 d-flex align-items-center">
          <div
            className="bg-composed-wrapper--image"
            style={{ backgroundImage: 'url(' + hero3 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-primary opacity-2" />
          <div className="bg-composed-wrapper--content py-5">
            <Container>
              <div className="text-white text-center">
                <h1 className="display-2 mb-2 px-4 font-weight-bold">
                  Our customers
                </h1>
                <h3 className="font-size-lg line-height-md font-weight-light d-block mb-0 text-white-50">
                  Read how customers around the world use our services to build
                  their projects
                </h3>
              </div>
              <Grid item md={10} xl={6} className="mx-auto">
                <Slider
                  {...marketingTestimonials4}
                  className="slider-dots-light slider-arrows-outside">
                  <div>
                    <Card className="m-5">
                      <CardContent>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="text-warning font-size-lg">
                            <FontAwesomeIcon icon={['fas', 'star']} />
                            <FontAwesomeIcon icon={['fas', 'star']} />
                            <FontAwesomeIcon icon={['fas', 'star']} />
                            <FontAwesomeIcon icon={['fas', 'star']} />
                            <FontAwesomeIcon icon={['fas', 'star']} />
                          </div>
                          <div>
                            <FontAwesomeIcon
                              icon={['fas', 'quote-right']}
                              className="text-dark font-size-xxl"
                            />
                          </div>
                        </div>
                        <blockquote className="mb-3 mt-2 font-size-lg text-black-50">
                          But I must explain to you how all this mistaken idea
                          was born and I will give you a complete account of the
                          system, and expound the actual teachings of the great
                          explorer of the truth.
                        </blockquote>
                        <div className="align-box-row">
                          <div className="avatar-icon-wrapper avatar-icon-lg">
                            <div className="avatar-icon rounded-circle">
                              <img src={avatar1} alt="..." />
                            </div>
                          </div>
                          <div className="pl-2">
                            <span className="d-block font-size-lg">
                              Mandy Erle
                              <small className="d-block text-black-50">
                                Mandy Company
                              </small>
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div>
                    <Card className="m-5">
                      <CardContent>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="text-warning font-size-lg">
                            <FontAwesomeIcon icon={['fas', 'star']} />
                            <FontAwesomeIcon icon={['fas', 'star']} />
                            <FontAwesomeIcon icon={['fas', 'star']} />
                            <FontAwesomeIcon icon={['fas', 'star']} />
                            <FontAwesomeIcon icon={['fas', 'star']} />
                          </div>
                          <div>
                            <FontAwesomeIcon
                              icon={['fas', 'quote-right']}
                              className="text-dark font-size-xxl"
                            />
                          </div>
                        </div>
                        <blockquote className="mb-3 mt-2 font-size-lg text-black-50">
                          But I must explain to you how all this mistaken idea
                          was born and I will give you a complete account of the
                          system, and expound the actual teachings of the great
                          explorer of the truth.
                        </blockquote>
                        <div className="align-box-row">
                          <div className="avatar-icon-wrapper avatar-icon-lg">
                            <div className="avatar-icon rounded-circle">
                              <img src={avatar2} alt="..." />
                            </div>
                          </div>
                          <div className="pl-2">
                            <span className="d-block font-size-lg">
                              Mandy Erle
                              <small className="d-block text-black-50">
                                Mandy Company
                              </small>
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </Slider>
              </Grid>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
