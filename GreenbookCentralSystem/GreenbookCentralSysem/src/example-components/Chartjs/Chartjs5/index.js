import React from 'react';

import { Polar } from 'react-chartjs-2';

const data = {
  datasets: [
    {
      data: [11, 16, 7, 3, 14],
      backgroundColor: ['#f83245', '#4BC0C0', '#f4772e', '#E7E9ED', '#4191ff'],
      label: 'My dataset' // for legend
    }
  ],
  labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue']
};

export default function LivePreviewExample() {
  return (
    <>
      <Polar data={data} />
    </>
  );
}
