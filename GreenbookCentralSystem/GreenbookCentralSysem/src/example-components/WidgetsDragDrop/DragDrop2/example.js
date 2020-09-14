import React from 'react';
import Dustbin from './Dustbin';
import { Grid } from '@material-ui/core';
import Box from './Box';

const Container = () => (
  <div>
    <div className="text-center">
      <Box />
    </div>
    <div className="divider my-4" />
    <Grid container spacing={6}>
      <Grid item lg={6} className="d-flex justify-content-center">
        <Dustbin greedy={true}>
          <Dustbin greedy={true}>
            <Dustbin greedy={true} />
          </Dustbin>
        </Dustbin>
      </Grid>
      <Grid item lg={6} className="d-flex justify-content-center">
        <Dustbin>
          <Dustbin>
            <Dustbin />
          </Dustbin>
        </Dustbin>
      </Grid>
    </Grid>
  </div>
);
export default Container;
