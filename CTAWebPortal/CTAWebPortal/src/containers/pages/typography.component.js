import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Demo from '../../components/demo.component';

import TypographyExample from './examples/typography-example';
import TypographyExampleRaw from './examples/typography-example-raw';

const TypographyPage = () => {

  return (
    <div>
      <section className="portal-pages__header">
        <div className="portal-pages__header-demo">
          <Typography variant="display4" gutterBottom>
            Tt
          </Typography>
        </div>
      </section>
      <Grid container spacing={0}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Paper className="portal-pages__content-inner">
            <Typography variant="headline" gutterBottom>Typography</Typography>

            <p>Portal comes with a wide range of options to setup a unique typography sensation.</p>

            <p>A <a href="https://material.google.com/style/typography.html#typography-styles">typographic scale</a> has a limited set of type sizes that work well together along with the layout grid.</p>

            <p>These sizes and styles were developed to balance content density and reading comfort under typical usage conditions.</p>

            <p>Too many type sizes and styles at once can spoil any layout.</p>
            <Demo index={1} js={TypographyExample} raw={TypographyExampleRaw} />
          </Paper>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
};

export default TypographyPage;
