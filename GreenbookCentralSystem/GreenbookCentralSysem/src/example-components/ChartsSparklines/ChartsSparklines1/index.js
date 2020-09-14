import React from 'react';

import { Grid, Card } from '@material-ui/core';

import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine
} from 'react-sparklines';

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
      <Card className="p-4 mb-spacing-6-x2 bg-second">
        <Grid container spacing={6}>
          <Grid item md={4}>
            <Sparklines data={sampleData1} height={50}>
              <SparklinesLine style={{ stroke: 'white', fill: 'none' }} />
              <SparklinesReferenceLine
                style={{
                  stroke: 'white',
                  strokeOpacity: 0.75,
                  strokeDasharray: '2, 2'
                }}
              />
            </Sparklines>
          </Grid>
          <Grid item md={4}>
            <Sparklines data={sampleData2} height={50}>
              <SparklinesLine style={{ stroke: 'white', fill: 'none' }} />
              <SparklinesReferenceLine
                style={{
                  stroke: 'white',
                  strokeOpacity: 0.75,
                  strokeDasharray: '2, 2'
                }}
              />
            </Sparklines>
          </Grid>
          <Grid item md={4}>
            <Sparklines data={sampleData3} height={50}>
              <SparklinesLine style={{ stroke: 'white', fill: 'none' }} />
              <SparklinesReferenceLine
                style={{
                  stroke: 'white',
                  strokeOpacity: 0.75,
                  strokeDasharray: '2, 2'
                }}
              />
            </Sparklines>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
