import React from 'react';

import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(248,50,69,0.2)',
      borderColor: '#f83245',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(248,50,69,0.4)',
      hoverBorderColor: '#f83245',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export default function LivePreviewExample() {
  return (
    <>
      <Bar
        data={data}
        height={350}
        options={{
          maintainAspectRatio: false
        }}
      />
    </>
  );
}
