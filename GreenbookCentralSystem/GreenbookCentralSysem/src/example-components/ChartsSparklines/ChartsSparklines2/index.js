import React from 'react';

import { Grid } from '@material-ui/core';

import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

function boxMullerRandom() {
  let phase = false,
    x1,
    x2,
    w;

  return (function () {
    if ((phase = !phase)) {
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1.0);

      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      return x1 * w;
    } else {
      return x2 * w;
    }
  })();
}

function randomData(n = 30) {
  return Array.apply(0, Array(n)).map(boxMullerRandom);
}

const sampleData1 = randomData(30);
const sampleData2 = randomData(32);
const sampleData3 = randomData(28);

export default function LivePreviewExample() {
  return (
    <>
      <div className="p-4 mb-spacing-6-x2">
        <Grid container spacing={6}>
          <Grid item md={4}>
            <Sparklines data={sampleData1}>
              <SparklinesLine style={{ fill: 'none' }} />
              <SparklinesSpots />
            </Sparklines>
          </Grid>
          <Grid item md={4}>
            <Sparklines data={sampleData2}>
              <SparklinesLine color="#56b45d" />
              <SparklinesSpots style={{ fill: '#56b45d' }} />
            </Sparklines>
          </Grid>
          <Grid item md={4}>
            <Sparklines data={sampleData3} margin={6}>
              <SparklinesLine
                style={{ strokeWidth: 3, stroke: '#336aff', fill: 'none' }}
              />
              <SparklinesSpots
                size={4}
                style={{ stroke: '#336aff', strokeWidth: 3, fill: 'white' }}
              />
            </Sparklines>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
