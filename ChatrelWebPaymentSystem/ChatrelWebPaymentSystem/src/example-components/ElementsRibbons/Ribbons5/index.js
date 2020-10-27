import React from 'react';

import { Card } from '@material-ui/core';

import stock1 from '../../../assets/images/stock-photos/stock-1.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="overflow-visible card-transparent">
        <span className="ribbon-vertical ribbon-vertical--primary text-uppercase">
          <span>New</span>
        </span>
        <div className="card-img-wrapper">
          <div className="card-badges card-badges-bottom">
            <div className="badge badge-pill badge-success mr-2">Success</div>
            <div className="badge badge-pill badge-neutral-info text-info">
              Info
            </div>
          </div>
          <img src={stock1} className="card-img-top rounded" alt="..." />
        </div>
      </Card>
    </>
  );
}
