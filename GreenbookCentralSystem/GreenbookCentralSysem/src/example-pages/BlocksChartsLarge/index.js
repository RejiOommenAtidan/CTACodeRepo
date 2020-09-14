import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';
import { ExampleWrapperSeamless } from 'layout-components';

import BlocksChartsLarge1 from '../../example-components/BlocksChartsLarge/BlocksChartsLarge1';
import BlocksChartsLarge2 from '../../example-components/BlocksChartsLarge/BlocksChartsLarge2';
import BlocksChartsLarge3 from '../../example-components/BlocksChartsLarge/BlocksChartsLarge3';
import BlocksChartsLarge4 from '../../example-components/BlocksChartsLarge/BlocksChartsLarge4';
import BlocksChartsLarge5 from '../../example-components/BlocksChartsLarge/BlocksChartsLarge5';
import BlocksChartsLarge6 from '../../example-components/BlocksChartsLarge/BlocksChartsLarge6';
import BlocksChartsLarge7 from '../../example-components/BlocksChartsLarge/BlocksChartsLarge7';
import BlocksChartsLarge8 from '../../example-components/BlocksChartsLarge/BlocksChartsLarge8';
export default function BlocksChartsLarge() {
  return (
    <>
      <PageTitle
        titleHeading="Large Charts"
        titleDescription="Take advantage of these extensive, easy to customize large charts component blocks."
      />

      <Grid container spacing={6}>
        <Grid item xl={6}>
          <ExampleWrapperSeamless>
            <BlocksChartsLarge1 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <BlocksChartsLarge3 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <BlocksChartsLarge5 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <BlocksChartsLarge7 />
          </ExampleWrapperSeamless>
        </Grid>
        <Grid item xl={6}>
          <ExampleWrapperSeamless>
            <BlocksChartsLarge2 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <BlocksChartsLarge4 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <BlocksChartsLarge6 />
          </ExampleWrapperSeamless>
          <ExampleWrapperSeamless>
            <BlocksChartsLarge8 />
          </ExampleWrapperSeamless>
        </Grid>
      </Grid>
    </>
  );
}
