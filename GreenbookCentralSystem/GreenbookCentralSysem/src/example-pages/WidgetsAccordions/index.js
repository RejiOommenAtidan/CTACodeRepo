import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';
import { ExampleWrapperSeamless } from 'layout-components';

import WidgetsAccordions1 from '../../example-components/WidgetsAccordions/Accordions1';
import WidgetsAccordions2 from '../../example-components/WidgetsAccordions/Accordions2';
import WidgetsAccordions3 from '../../example-components/WidgetsAccordions/Accordions3';
import WidgetsAccordions4 from '../../example-components/WidgetsAccordions/Accordions4';

export default function WidgetsAccordions() {
  return (
    <>
      <PageTitle
        titleHeading="Accordions"
        titleDescription="Accordions represent collapsable component with extended functionality."
      />

      <Grid container spacing={6}>
        <Grid item xl={6}>
          <ExampleWrapperSeamless>
            <WidgetsAccordions1 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <WidgetsAccordions3 />
          </ExampleWrapperSeamless>
        </Grid>
        <Grid item xl={6}>
          <ExampleWrapperSeamless>
            <WidgetsAccordions2 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <WidgetsAccordions4 />
          </ExampleWrapperSeamless>
        </Grid>
      </Grid>
    </>
  );
}
