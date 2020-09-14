import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';
import { ExampleWrapperSeamless } from 'layout-components';

import BlocksListsLarge1 from '../../example-components/BlocksListsLarge/BlocksListsLarge1';
import BlocksListsLarge2 from '../../example-components/BlocksListsLarge/BlocksListsLarge2';
import BlocksListsLarge3 from '../../example-components/BlocksListsLarge/BlocksListsLarge3';
import BlocksListsLarge4 from '../../example-components/BlocksListsLarge/BlocksListsLarge4';
import BlocksListsLarge5 from '../../example-components/BlocksListsLarge/BlocksListsLarge5';
import BlocksListsLarge6 from '../../example-components/BlocksListsLarge/BlocksListsLarge6';
import BlocksListsLarge7 from '../../example-components/BlocksListsLarge/BlocksListsLarge7';
import BlocksListsLarge8 from '../../example-components/BlocksListsLarge/BlocksListsLarge8';
import BlocksListsLarge9 from '../../example-components/BlocksListsLarge/BlocksListsLarge9';
export default function BlocksListsLarge() {
  return (
    <>
      <PageTitle
        titleHeading="Large Lists"
        titleDescription="Take advantage of these extensive, easy to customize large lists component blocks."
      />

      <Grid container spacing={6}>
        <Grid item lg={6}>
          <ExampleWrapperSeamless>
            <BlocksListsLarge1 />
          </ExampleWrapperSeamless>
        </Grid>
        <Grid item lg={6}>
          <ExampleWrapperSeamless>
            <BlocksListsLarge2 />
          </ExampleWrapperSeamless>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xl={6}>
          <ExampleWrapperSeamless>
            <BlocksListsLarge3 />
          </ExampleWrapperSeamless>
        </Grid>
        <Grid item xl={6}>
          <ExampleWrapperSeamless>
            <BlocksListsLarge4 />
          </ExampleWrapperSeamless>
        </Grid>
        <Grid item xl={7}>
          <ExampleWrapperSeamless>
            <BlocksListsLarge5 />
          </ExampleWrapperSeamless>
        </Grid>
        <Grid item xl={5}>
          <ExampleWrapperSeamless>
            <BlocksListsLarge6 />
          </ExampleWrapperSeamless>
        </Grid>
      </Grid>
      <ExampleWrapperSeamless>
        <BlocksListsLarge7 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksListsLarge8 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksListsLarge9 />
      </ExampleWrapperSeamless>
    </>
  );
}
