import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Demo from '../../../components/demo.component';

import SimpleExample from './examples/autocomplete-simple-example';
import SimpleExampleRaw from './examples/autocomplete-simple-example-raw';

import AutosuggestExample from './examples/autocomplete-autosuggest-example';
import AutosuggestExampleRaw from './examples/autocomplete-autosuggest-example-raw';

const Autocomplete = () => (
  <div>
    <section className="portal-pages__header">
      <div className="portal-pages__header-demo">
        <AutosuggestExample />
      </div>
    </section>
    <Grid container spacing={0}>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Paper className="portal-pages__content-inner">
          <Typography variant="headline" gutterBottom>Autocomplete</Typography>
          <p>
            Input text can be used with autocomplete to help users who have limited literacy or who write in a foreign language.
            For example, autocomplete can:
          </p>
          <ul>
            <li>Suggest input as it’s typed (refreshing suggestions with each keystroke)</li>
            <li>Fill a field with default input text</li>
            <li>Pressing the return button accepts the current autocomplete suggestion.</li>
          </ul>
          <p>
            The autocomplete is a normal text input enhanced by a panel of suggested options.
            Material-UI does not provide any high-level API for solving this problem.
            We encourage people relying on the solutions the React community has built.
          </p>
          <h2>Downshift</h2>
          <p>
            In the following example, we demonstrate how to use <a href="https://github.com/paypal/downshift">downshift</a>.
          </p>
          <Demo index={1} js={SimpleExample} raw={SimpleExampleRaw} />
          <h2>react-autosuggest</h2>
          <p>
            In the following example, we demonstrate how to use
            <a href="https://github.com/moroshko/react-autosuggest">react-autosuggest</a>.
            It's also using <a href="https://www.npmjs.com/package/autosuggest-highlight">autosuggest-highlight</a>
            for the highlighting logic.
          </p>
          <Demo index={2} js={AutosuggestExample} raw={AutosuggestExampleRaw} />
        </Paper>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  </div>
);

export default Autocomplete;
