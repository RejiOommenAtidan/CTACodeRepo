import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';
import { ExampleWrapperSeamless } from 'layout-components';

import ElementsRibbons1 from '../../example-components/ElementsRibbons/Ribbons1';
import ElementsRibbons2 from '../../example-components/ElementsRibbons/Ribbons2';
import ElementsRibbons3 from '../../example-components/ElementsRibbons/Ribbons3';
import ElementsRibbons4 from '../../example-components/ElementsRibbons/Ribbons4';
import ElementsRibbons5 from '../../example-components/ElementsRibbons/Ribbons5';
import ElementsRibbons6 from '../../example-components/ElementsRibbons/Ribbons6';
export default function ElementsRibbons() {
  return (
    <>
      <PageTitle
        titleHeading="Ribbons"
        titleDescription="Symbols that can be used to add an extra touch to our React cards or elements."
      />
      <Grid container spacing={6}>
        <Grid item md={6}>
          <ExampleWrapperSeamless>
            <ElementsRibbons1 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <ElementsRibbons3 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <ElementsRibbons5 />
          </ExampleWrapperSeamless>
        </Grid>
        <Grid item md={6}>
          <ExampleWrapperSeamless>
            <ElementsRibbons2 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <ElementsRibbons4 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <ElementsRibbons6 />
          </ExampleWrapperSeamless>
        </Grid>
      </Grid>
    </>
  );
}
