import React from 'react';

import { Card } from '@material-ui/core';

import stock2 from '../../../assets/images/stock-photos/stock-2.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="overflow-visible card-transparent">
        <span className="ribbon-vertical ribbon-vertical--info ribbon-vertical--right text-uppercase">
          <span>-30%</span>
        </span>
        <div className="card-img-wrapper">
          <div className="card-badges card-badges-bottom">
            <div className="badge badge-pill badge-first">New</div>
          </div>
          <img src={stock2} className="card-img-top rounded" alt="..." />
        </div>
      </Card>
    </>
  );
}
