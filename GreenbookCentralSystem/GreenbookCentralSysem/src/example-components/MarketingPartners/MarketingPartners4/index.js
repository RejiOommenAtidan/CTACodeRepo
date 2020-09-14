import React from 'react';

import logo1 from '../../../assets/images/stock-logos/netflix.svg';
import logo2 from '../../../assets/images/stock-logos/airbnb.svg';
import logo3 from '../../../assets/images/stock-logos/instagram.svg';
import logo4 from '../../../assets/images/stock-logos/slack.svg';
import logo5 from '../../../assets/images/stock-logos/google.svg';
import logo6 from '../../../assets/images/stock-logos/stripe.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="rounded bg-deep-blue mb-spacing-6-x2">
        <div className="py-5">
          <div className="d-flex align-items-center justify-content-center flex-wrap">
            <div className="p-3 m-3 d-flex align-self-stretch">
              <div className="hover-scale-rounded object-skew shadow-sm bg-white opacity-9 rounded-sm p-4">
                <img
                  src={logo1}
                  style={{ height: 40 }}
                  className="m-auto img-fluid text-white"
                  alt="..."
                />
              </div>
            </div>
            <div className="p-3 m-3 d-flex align-self-stretch">
              <div className="hover-scale-rounded object-skew shadow-sm bg-white opacity-9 rounded-sm p-4">
                <img
                  src={logo2}
                  style={{ height: 40 }}
                  className="m-auto img-fluid text-white"
                  alt="..."
                />
              </div>
            </div>
            <div className="p-3 m-3 d-flex align-self-stretch">
              <div className="hover-scale-rounded object-skew shadow-sm bg-white opacity-9 rounded-sm p-4">
                <img
                  src={logo3}
                  style={{ height: 40 }}
                  className="m-auto img-fluid text-white"
                  alt="..."
                />
              </div>
            </div>
            <div className="p-3 m-3 d-flex align-self-stretch">
              <div className="hover-scale-rounded object-skew shadow-sm bg-white opacity-9 rounded-sm p-4">
                <img
                  src={logo4}
                  style={{ height: 40 }}
                  className="m-auto img-fluid text-white"
                  alt="..."
                />
              </div>
            </div>
            <div className="p-3 m-3 d-flex align-self-stretch">
              <div className="hover-scale-rounded object-skew shadow-sm bg-white opacity-9 rounded-sm p-4">
                <img
                  src={logo5}
                  style={{ height: 40 }}
                  className="m-auto img-fluid text-white"
                  alt="..."
                />
              </div>
            </div>
            <div className="p-3 m-3 d-flex align-self-stretch">
              <div className="hover-scale-rounded object-skew shadow-sm bg-white opacity-9 rounded-sm p-4">
                <img
                  src={logo6}
                  style={{ height: 40 }}
                  className="m-auto img-fluid text-white"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
