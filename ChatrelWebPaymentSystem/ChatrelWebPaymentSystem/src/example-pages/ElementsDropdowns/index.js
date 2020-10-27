import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';

import { ExampleWrapperSimple } from 'layout-components';

import ElementsDropdowns1 from '../../example-components/ElementsDropdowns/Dropdowns1';
import ElementsDropdowns2 from '../../example-components/ElementsDropdowns/Dropdowns2';
import ElementsDropdowns3 from '../../example-components/ElementsDropdowns/Dropdowns3';
import ElementsDropdowns4 from '../../example-components/ElementsDropdowns/Dropdowns4';
import ElementsDropdowns5 from '../../example-components/ElementsDropdowns/Dropdowns5';
import ElementsDropdowns6 from '../../example-components/ElementsDropdowns/Dropdowns6';
export default function ElementsDropdowns() {
  return (
    <>
      <PageTitle
        titleHeading="Dropdowns"
        titleDescription="A drop-down list is a graphical control element, similar to a list box, that allows the user to choose one value from a list."
      />

      <Grid container spacing={6}>
        <Grid item md={6}>
          <ExampleWrapperSimple>
            <ElementsDropdowns1 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsDropdowns3 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsDropdowns5 />
          </ExampleWrapperSimple>
        </Grid>
        <Grid item md={6}>
          <ExampleWrapperSimple>
            <ElementsDropdowns2 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsDropdowns4 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsDropdowns6 />
          </ExampleWrapperSimple>
        </Grid>
      </Grid>
    </>
  );
}
