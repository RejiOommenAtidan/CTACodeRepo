import React from 'react';

import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['Red', 'Green', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#f83245', '#4191ff', '#f4772e'],
      hoverBackgroundColor: ['#f83245', '#4191ff', '#f4772e']
    }
  ]
};

export default function LivePreviewExample() {
  return (
    <>
      <Doughnut data={data} />
    </>
  );
}
