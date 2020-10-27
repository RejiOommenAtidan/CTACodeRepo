import React, { Component } from 'react';

import { Grid } from '@material-ui/core';

import {
  Sparklines,
  SparklinesBars,
  SparklinesLine,
  SparklinesSpots
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

export default class LivePreviewExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    setInterval(
      () =>
        this.setState({
          data: this.state.data.concat([boxMullerRandom()])
        }),
      100
    );
  }

  render() {
    return (
      <>
        <div className="p-4 mb-spacing-6-x2">
          <Grid container spacing={6}>
            <Grid item md={4}>
              <Sparklines data={this.state.data} limit={20}>
                <SparklinesLine color="#1c8cdc" />
                <SparklinesSpots />
              </Sparklines>
            </Grid>
            <Grid item md={4}>
              <Sparklines data={this.state.data} limit={20}>
                <SparklinesBars
                  style={{ fill: '#41c3f9', fillOpacity: '.25' }}
                />
                <SparklinesLine style={{ stroke: '#41c3f9', fill: 'none' }} />
              </Sparklines>
            </Grid>
            <Grid item md={4}>
              <Sparklines data={this.state.data} limit={20}>
                <SparklinesLine
                  style={{ stroke: 'none', fill: '#8e44af', fillOpacity: '1' }}
                />
              </Sparklines>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}
