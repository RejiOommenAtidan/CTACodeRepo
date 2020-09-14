import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';
import { ExampleWrapperSeamless } from 'layout-components';

import BlocksSparklinesLarge1 from '../../example-components/BlocksSparklinesLarge/BlocksSparklinesLarge1';
import BlocksSparklinesLarge2 from '../../example-components/BlocksSparklinesLarge/BlocksSparklinesLarge2';
import BlocksSparklinesLarge3 from '../../example-components/BlocksSparklinesLarge/BlocksSparklinesLarge3';
import BlocksSparklinesLarge4 from '../../example-components/BlocksSparklinesLarge/BlocksSparklinesLarge4';
import BlocksSparklinesLarge5 from '../../example-components/BlocksSparklinesLarge/BlocksSparklinesLarge5';
import BlocksSparklinesLarge6 from '../../example-components/BlocksSparklinesLarge/BlocksSparklinesLarge6';
export default function BlocksSparklinesLarge() {
  return (
    <>
      <PageTitle
        titleHeading="Large Sparklines"
        titleDescription="Take advantage of these extensive, easy to customize large sparklines component blocks."
      />

      <ExampleWrapperSeamless>
        <BlocksSparklinesLarge1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksSparklinesLarge2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksSparklinesLarge3 />
      </ExampleWrapperSeamless>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <ExampleWrapperSeamless>
            <BlocksSparklinesLarge4 />
          </ExampleWrapperSeamless>
        </Grid>
        <Grid item md={6}>
          <ExampleWrapperSeamless>
            <BlocksSparklinesLarge5 />
          </ExampleWrapperSeamless>
        </Grid>
      </Grid>
      <ExampleWrapperSeamless>
        <BlocksSparklinesLarge6 />
      </ExampleWrapperSeamless>
    </>
  );
}
