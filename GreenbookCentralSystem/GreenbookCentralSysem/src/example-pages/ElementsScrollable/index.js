import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';
import { ExampleWrapperSeamless } from 'layout-components';

import ElementsScrollable1 from '../../example-components/ElementsScrollable/Scrollable1';
import ElementsScrollable2 from '../../example-components/ElementsScrollable/Scrollable2';
import ElementsScrollable3 from '../../example-components/ElementsScrollable/Scrollable3';
import ElementsScrollable4 from '../../example-components/ElementsScrollable/Scrollable4';
import ElementsScrollable5 from '../../example-components/ElementsScrollable/Scrollable5';
import ElementsScrollable6 from '../../example-components/ElementsScrollable/Scrollable6';
import ElementsScrollable7 from '../../example-components/ElementsScrollable/Scrollable7';
import ElementsScrollable8 from '../../example-components/ElementsScrollable/Scrollable8';
export default function ElementsScrollable() {
  return (
    <>
      <PageTitle
        titleHeading="Scrollable"
        titleDescription="Add scrolling areas to any elements with custom scrollbars or default browser ones."
      />
      <Grid container spacing={6}>
        <Grid item md={6}>
          <ExampleWrapperSeamless>
            <ElementsScrollable1 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <ElementsScrollable3 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <ElementsScrollable5 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <ElementsScrollable7 />
          </ExampleWrapperSeamless>
        </Grid>
        <Grid item md={6}>
          <ExampleWrapperSeamless>
            <ElementsScrollable2 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <ElementsScrollable4 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <ElementsScrollable6 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <ElementsScrollable8 />
          </ExampleWrapperSeamless>
        </Grid>
      </Grid>
    </>
  );
}
