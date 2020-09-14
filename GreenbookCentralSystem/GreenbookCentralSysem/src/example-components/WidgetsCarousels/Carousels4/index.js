import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from '@material-ui/core';

import Slider from 'react-slick';

import logo1 from '../../../assets/images/stock-logos/netflix.svg';
import logo2 from '../../../assets/images/stock-logos/airbnb.svg';
import logo3 from '../../../assets/images/stock-logos/instagram.svg';
import logo4 from '../../../assets/images/stock-logos/slack.svg';

import stock1 from '../../../assets/images/stock-photos/stock-1.jpg';
import stock2 from '../../../assets/images/stock-photos/stock-2.jpg';
import stock3 from '../../../assets/images/stock-photos/stock-3.jpg';
import stock4 from '../../../assets/images/stock-photos/stock-4.jpg';

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
  const widgetsCarousels4A = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SliderArrowNext />,
    prevArrow: <SliderArrowPrev />,
    responsive: [
      {
        breakpoint: 1450,
        settings: { slidesToShow: 3, slidesToScroll: 1 }
      },
      {
        breakpoint: 1100,
        settings: { slidesToShow: 2, slidesToScroll: 1 }
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <>
      <Card className="bg-night-sky py-4 mb-spacing-6-x2">
        <div className="py-4">
          <Slider
            className="rounded-lg overflow-hidden slider-arrows-outside slider-dots-outside slider-dots-light"
            {...widgetsCarousels4A}>
            <div>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card bg-white m-3 shadow-sm-dark card-box-hover-rise">
                <img src={stock1} className="card-img-top" alt="..." />
                <div className="p-3 bg-secondary rounded-bottom p-xl-4">
                  <img src={logo1} alt="..." style={{ height: 25 }} />
                  <p className="text-second opacity-8 mt-4 mb-0">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                </div>
              </a>
            </div>
            <div>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card bg-white m-3 shadow-sm-dark card-box-hover-rise">
                <img src={stock2} className="card-img-top" alt="..." />
                <div className="p-3 bg-secondary rounded-bottom p-xl-4">
                  <img src={logo2} alt="..." style={{ height: 25 }} />
                  <p className="text-second opacity-8 mt-4 mb-0">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                </div>
              </a>
            </div>
            <div>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card bg-white m-3 shadow-sm-dark card-box-hover-rise">
                <img src={stock3} className="card-img-top" alt="..." />
                <div className="p-3 bg-secondary rounded-bottom p-xl-4">
                  <img src={logo3} alt="..." style={{ height: 25 }} />
                  <p className="text-second opacity-8 mt-4 mb-0">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                </div>
              </a>
            </div>
            <div>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card bg-white m-3 shadow-sm-dark card-box-hover-rise">
                <img src={stock4} className="card-img-top" alt="..." />
                <div className="p-3 bg-secondary rounded-bottom p-xl-4">
                  <img src={logo4} alt="..." style={{ height: 25 }} />
                  <p className="text-second opacity-8 mt-4 mb-0">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                </div>
              </a>
            </div>
            <div>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card bg-white m-3 shadow-sm-dark card-box-hover-rise">
                <img src={stock1} className="card-img-top" alt="..." />
                <div className="p-3 bg-secondary rounded-bottom p-xl-4">
                  <img src={logo1} alt="..." style={{ height: 25 }} />
                  <p className="text-second opacity-8 mt-4 mb-0">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                </div>
              </a>
            </div>
            <div>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card bg-white m-3 shadow-sm-dark card-box-hover-rise">
                <img src={stock2} className="card-img-top" alt="..." />
                <div className="p-3 bg-secondary rounded-bottom p-xl-4">
                  <img src={logo2} alt="..." style={{ height: 25 }} />
                  <p className="text-second opacity-8 mt-4 mb-0">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                </div>
              </a>
            </div>
            <div>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card bg-white m-3 shadow-sm-dark card-box-hover-rise">
                <img src={stock3} className="card-img-top" alt="..." />
                <div className="p-3 bg-secondary rounded-bottom p-xl-4">
                  <img src={logo3} alt="..." style={{ height: 25 }} />
                  <p className="text-second opacity-8 mt-4 mb-0">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                </div>
              </a>
            </div>
            <div>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="card bg-white m-3 shadow-sm-dark card-box-hover-rise">
                <img src={stock4} className="card-img-top" alt="..." />
                <div className="p-3 bg-secondary rounded-bottom p-xl-4">
                  <img src={logo4} alt="..." style={{ height: 25 }} />
                  <p className="text-second opacity-8 mt-4 mb-0">
                    You can build unlimited layout styles using any of the 500+
                    included components and elements. Powerful, unique template
                    built for React and Material-UI.
                  </p>
                </div>
              </a>
            </div>
          </Slider>
        </div>
      </Card>
    </>
  );
}
