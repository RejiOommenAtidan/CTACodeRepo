import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Demo from '../../../components/demo.component';

import ButtonsFlatExample from './examples/buttons-flat-example';
import ButtonsFlatExampleRaw from './examples/buttons-flat-example-raw';

import ButtonsRaisedExample from './examples/buttons-raised-example';
import ButtonsRaisedExampleRaw from './examples/buttons-raised-example-raw';

import ButtonsFloatingExample from './examples/buttons-floating-example';
import ButtonsFloatingExampleRaw from './examples/buttons-floating-example-raw';

import ButtonsTransitionExample from './examples/buttons-transition-example';
import ButtonsTransitionExampleRaw from './examples/buttons-transition-example-raw';

import ButtonsSizesExample from './examples/buttons-sizes-example';
import ButtonsSizesExampleRaw from './examples/buttons-sizes-example-raw';

import ButtonsIconExample from './examples/buttons-icon-example';
import ButtonsIconExampleRaw from './examples/buttons-icon-example-raw';

import ButtonsLabelExample from './examples/buttons-label-example';
import ButtonsLabelExampleRaw from './examples/buttons-label-example-raw';


const Button = () => (
  <div>
    <section className="portal-pages__header">
      <div className="portal-pages__header-demo">
        <ButtonsFlatExample />
      </div>
    </section>
    <Grid container spacing={0}>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Paper className="portal-pages__content-inner">
          <Typography variant="headline" gutterBottom>Buttons</Typography>
          <p>Buttons communicate the action that will occur when the user touches them.</p>
          <p>
            Material buttons trigger an ink reaction on press. They may display text, imagery, or both.
            Flat buttons and raised buttons are the most commonly used types.
          </p>
          <h2>Flat Buttons</h2>
          <p>
            Flat buttons are text-only buttons. They may be used in dialogs, toolbars, or inline.
            They do not lift, but fill with color on press.
          </p>
          <Demo index={1} js={ButtonsFlatExample} raw={ButtonsFlatExampleRaw} />

          <h2>Raised Buttons</h2>
          <p>Raised buttons are rectangular-shaped buttons. They may be used inline. They lift and display ink reactions on press.</p>
          <Demo index={2} js={ButtonsRaisedExample} raw={ButtonsRaisedExampleRaw} />

          <h2>Floating Action Buttons</h2>
          <p>
            A floating action button represents the primary action in an application. Shaped like a circled icon
            floating above the UI, it has an ink wash upon focus and lifts upon selection.
            When pressed, it may contain more related actions.
          </p>
          <p>Only one floating action button is recommended per screen to represent the most common action.</p>
          <Demo index={3} js={ButtonsFloatingExample} raw={ButtonsFloatingExampleRaw} />

          <p>The floating action button animates onto the screen as an expanding piece of material, by default.</p>
          <p>
            A floating action button that spans multiple lateral screens (such as tabbed screens) should briefly disappear,
            then reappear if its action changes.
          </p>
          <p>
            The Zoom transition can be used to achieve this. Note that since both the exiting and entering animations
            are triggered at the same time, we use <code>enterDelay</code> to allow the outgoing Floating Action
            Button's animation to finish before the new one enters.
          </p>
          <Demo index={4} js={ButtonsTransitionExample} raw={ButtonsTransitionExampleRaw} />

          <h2>Sizes</h2>
          <p>Fancy larger or smaller buttons? Use the <code>size</code> or the <code>mini</code> property.</p>
          <Demo index={5} js={ButtonsSizesExample} raw={ButtonsSizesExampleRaw} />

          <h2>Icon Buttons</h2>
          <p>Icon buttons are commonly found in app bars and toolbars.</p>
          <p>
            Icons are also appropriate for toggle buttons that allow a single choice to be selected or deselected,
            such as adding or removing a star to an item.
          </p>
          <Demo index={6} js={ButtonsIconExample} raw={ButtonsIconExampleRaw} />

          <h2>Buttons with icons and label</h2>
          <p>
            Sometimes you might want to have icons for certain button to enhance the UX of the application as
            humans recognize logos more than plain text. For example, if you have a delete button you can label
            it with a dustbin icon.
          </p>
          <Demo index={7} js={ButtonsLabelExample} raw={ButtonsLabelExampleRaw} />
        </Paper>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  </div>
);


export default Button;
