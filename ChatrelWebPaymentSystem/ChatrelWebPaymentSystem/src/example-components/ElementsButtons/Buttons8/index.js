import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex justify-content-center">
        <a
          href="#/"
          onClick={(e) => e.preventDefault()}
          className="active m-3 btn-input-select">
          <div className="selected-icon">
            <FontAwesomeIcon icon={['fas', 'check']} />
          </div>
          <div className="d-30 text-white d-flex align-items-center justify-content-center rounded-pill bg-warning">
            <FontAwesomeIcon icon={['fab', 'bitcoin']} />
          </div>
          <div className="font-weight-bold mt-2">Bitcoin</div>
          <div className="opacity-6">$7856.44</div>
        </a>
        <a
          href="#/"
          onClick={(e) => e.preventDefault()}
          className="m-3 btn-input-select">
          <div className="selected-icon">
            <FontAwesomeIcon icon={['fas', 'check']} />
          </div>
          <div className="d-30 text-white d-flex align-items-center justify-content-center rounded-pill bg-first">
            <FontAwesomeIcon icon={['fab', 'ethereum']} />
          </div>
          <div className="font-weight-bold mt-2">Ethereum</div>
          <div className="opacity-6">$273.28</div>
        </a>
      </div>
      <div className="divider my-3" />
      <div className="d-flex justify-content-center">
        <a
          href="#/"
          onClick={(e) => e.preventDefault()}
          className="m-3 btn-input-select">
          <div className="selected-icon">
            <FontAwesomeIcon icon={['fas', 'check']} />
          </div>
          <div className="d-30 text-white d-flex align-items-center justify-content-center rounded-pill bg-second">
            <FontAwesomeIcon icon={['fas', 'dollar-sign']} />
          </div>
          <div className="font-weight-bold mt-2">USD Wallet</div>
          <div className="opacity-6">$1589.29</div>
        </a>
        <a
          href="#/"
          onClick={(e) => e.preventDefault()}
          className="active m-3 btn-input-select">
          <div className="selected-icon">
            <FontAwesomeIcon icon={['fas', 'check']} />
          </div>
          <div className="d-30 text-dark d-flex align-items-center justify-content-center rounded-pill bg-light">
            <FontAwesomeIcon icon={['fas', 'university']} />
          </div>
          <div className="font-weight-bold mt-2">Bank IBAN</div>
          <div className="opacity-6">***1111</div>
        </a>
        <a
          href="#/"
          onClick={(e) => e.preventDefault()}
          className="m-3 btn-input-select">
          <div className="d-30 d-flex align-items-center justify-content-center rounded-pill bg-secondary text-primary">
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </div>
          <div className="font-weight-bold text-primary opacity-6 mt-2">
            Add new
          </div>
        </a>
      </div>
    </>
  );
}
