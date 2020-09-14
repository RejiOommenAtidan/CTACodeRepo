import React from 'react';

import { Card } from '@material-ui/core';

import people1 from '../../../assets/images/stock-photos/people-1.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="overflow-visible">
        <span className="ribbon-horizontal ribbon-horizontal--first">
          <span>Special Offer</span>
        </span>
        <div className="card-img-wrapper">
          <img src={people1} className="card-img-top rounded" alt="..." />
        </div>
      </Card>
    </>
  );
}
