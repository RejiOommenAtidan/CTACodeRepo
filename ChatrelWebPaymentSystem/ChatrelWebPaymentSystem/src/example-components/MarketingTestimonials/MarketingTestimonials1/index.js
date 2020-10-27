import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Card, CardContent } from '@material-ui/core';

import Slider from 'react-slick';

import people2 from '../../../assets/images/stock-photos/people-2.jpg';
import people3 from '../../../assets/images/stock-photos/people-3.jpg';
import people1 from '../../../assets/images/stock-photos/people-1.jpg';

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
  const marketingTestimonials1 = {
    dots: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SliderArrowNext />,
    prevArrow: <SliderArrowPrev />,
    responsive: [
      {
        breakpoint: 1100,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <>
      <Container className="py-5 mb-spacing-6-x2">
        <div className="text-center">
          <h1 className="display-3 text-black mb-2 font-weight-bold">
            Our customer stories
          </h1>
          <p className="font-size-xl mb-0 mb-lg-5 text-black-50">
            Read how customers around the world use our services to build their
            projects
          </p>
        </div>
        <Slider
          {...marketingTestimonials1}
          className="slider-arrows-outside slider-arrows-dark slider-dots-outside">
          <div>
            <Card className="m-4">
              <CardContent>
                <div className="align-box-row align-items-start">
                  <div>
                    <Card className="card-transparent">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="card-img-wrapper rounded">
                        <img
                          src={people1}
                          className="card-img-top rounded-circle"
                          style={{ width: 80 }}
                          alt="..."
                        />
                      </a>
                    </Card>
                  </div>
                  <div className="pl-4">
                    <FontAwesomeIcon
                      icon={['fas', 'quote-right']}
                      className="text-primary font-size-xxl"
                    />
                    <div className="my-3 text-warning font-size-lg">
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star-half-alt']} />
                    </div>
                    <blockquote className="my-3 text-black-50">
                      I will give you a complete account of the system, and
                      expound the actual teachings.
                    </blockquote>
                    <div className="font-size-lg font-weight-bold">
                      John Doe
                      <small className="text-black-50 pl-2">ACME Company</small>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="m-4">
              <CardContent>
                <div className="align-box-row align-items-start">
                  <div>
                    <Card className="card-transparent">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="card-img-wrapper rounded">
                        <img
                          src={people2}
                          className="card-img-top rounded-circle"
                          style={{ width: 80 }}
                          alt="..."
                        />
                      </a>
                    </Card>
                  </div>
                  <div className="pl-4">
                    <FontAwesomeIcon
                      icon={['fas', 'quote-right']}
                      className="text-primary font-size-xxl"
                    />
                    <div className="my-3 text-warning font-size-lg">
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                    </div>
                    <blockquote className="my-3 text-black-50">
                      But who has any right to find fault with a man who chooses
                      to enjoy a pleasure that has.
                    </blockquote>
                    <div className="font-size-lg font-weight-bold">
                      Alexandros Hebert
                      <small className="text-black-50 pl-2">
                        Bailey Company
                      </small>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="m-4">
              <CardContent>
                <div className="align-box-row align-items-start">
                  <div>
                    <Card className="card-transparent">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="card-img-wrapper rounded">
                        <img
                          src={people3}
                          className="card-img-top rounded-circle"
                          style={{ width: 80 }}
                          alt="..."
                        />
                      </a>
                    </Card>
                  </div>
                  <div className="pl-4">
                    <FontAwesomeIcon
                      icon={['fas', 'quote-right']}
                      className="text-primary font-size-xxl"
                    />
                    <div className="my-3 text-warning font-size-lg">
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star-half-alt']} />
                    </div>
                    <blockquote className="my-3 text-black-50">
                      Nor again is there anyone who loves or pursues or desires
                      to obtain pain of itself.
                    </blockquote>
                    <div className="font-size-lg font-weight-bold">
                      Jimi Tomlinson
                      <small className="text-black-50 pl-2">Wood Company</small>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="m-4">
              <CardContent>
                <div className="align-box-row align-items-start">
                  <div>
                    <Card className="card-transparent">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="card-img-wrapper rounded">
                        <img
                          src={people1}
                          className="card-img-top rounded-circle"
                          style={{ width: 80 }}
                          alt="..."
                        />
                      </a>
                    </Card>
                  </div>
                  <div className="pl-4">
                    <FontAwesomeIcon
                      icon={['fas', 'quote-right']}
                      className="text-primary font-size-xxl"
                    />
                    <div className="my-3 text-warning font-size-lg">
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                    </div>
                    <blockquote className="my-3 text-black-50">
                      I will give you a complete account of the system, and
                      expound the actual teachings.
                    </blockquote>
                    <div className="font-size-lg font-weight-bold">
                      Kaylee Magana
                      <small className="text-black-50 pl-2">
                        Espinosa Company
                      </small>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Slider>
      </Container>
    </>
  );
}
