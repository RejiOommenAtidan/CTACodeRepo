import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Demo from '../../../components/demo.component';

import AvatarsImageExample from './examples/avatars-image-example';
import AvatarsImageExampleRaw from './examples/avatars-image-example-raw';

import AvatarsIconExample from './examples/avatars-icon-example';
import AvatarsIconExampleRaw from './examples/avatars-icon-example-raw';

import AvatarsLetterExample from './examples/avatars-letter-example';
import AvatarsLetterExampleRaw from './examples/avatars-letter-example-raw';

const Avatars = () => (
  <div>
    <section className="portal-pages__header">
      <div className="portal-pages__header-demo">
        <AvatarsImageExample />
      </div>
    </section>
    <Grid container spacing={0}>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Paper className="portal-pages__content-inner">
          <Typography variant="headline" gutterBottom>Avatars</Typography>
          <p>Avatars are found throughout material design with uses in everything from tables to dialog menus.</p>
          <h2>Image avatars</h2>
          <p>Image avatars can be created by passing standard <code>img</code> props <code>src</code> or <code>srcSet</code> into the component.</p>
          <Demo index={1} js={AvatarsImageExample} raw={AvatarsImageExampleRaw} />

          <h2>Icon avatars</h2>
          <p>Icon avatars are created by passing an icon as <code>children</code>.</p>
          <Demo index={2} js={AvatarsIconExample} raw={AvatarsIconExampleRaw} />

          <h2>Letter avatars</h2>
          <p>Avatars containing simple characters can be created by passing your string as <code>children</code>.</p>
          <Demo index={3} js={AvatarsLetterExample} raw={AvatarsLetterExampleRaw} />
        </Paper>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  </div>
);

export default Avatars;
