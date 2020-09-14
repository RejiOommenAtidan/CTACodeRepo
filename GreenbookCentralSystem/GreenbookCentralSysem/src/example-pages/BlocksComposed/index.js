import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';
import { ExampleWrapperSeamless } from 'layout-components';

import BlocksComposed1 from '../../example-components/BlocksComposed/BlocksComposed1';
import BlocksComposed2 from '../../example-components/BlocksComposed/BlocksComposed2';
import BlocksComposed3 from '../../example-components/BlocksComposed/BlocksComposed3';
import BlocksComposed4 from '../../example-components/BlocksComposed/BlocksComposed4';
import BlocksComposed5 from '../../example-components/BlocksComposed/BlocksComposed5';
import BlocksComposed6 from '../../example-components/BlocksComposed/BlocksComposed6';
import BlocksComposed7 from '../../example-components/BlocksComposed/BlocksComposed7';
import BlocksComposed8 from '../../example-components/BlocksComposed/BlocksComposed8';
export default function BlocksComposed() {
  return (
    <>
      <PageTitle
        titleHeading="Composed Blocks"
        titleDescription="Take advantage of these extensive, easy to customize composed component blocks."
      />

      <ExampleWrapperSeamless>
        <BlocksComposed7 />
      </ExampleWrapperSeamless>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item xl={6}>
            <ExampleWrapperSeamless>
              <BlocksComposed1 />
            </ExampleWrapperSeamless>
            <ExampleWrapperSeamless>
              <BlocksComposed3 />
            </ExampleWrapperSeamless>
            <ExampleWrapperSeamless>
              <BlocksComposed5 />
            </ExampleWrapperSeamless>
          </Grid>
          <Grid item xl={6}>
            <ExampleWrapperSeamless>
              <BlocksComposed2 />
            </ExampleWrapperSeamless>
            <ExampleWrapperSeamless>
              <BlocksComposed6 />
            </ExampleWrapperSeamless>
            <ExampleWrapperSeamless>
              <BlocksComposed8 />
            </ExampleWrapperSeamless>
          </Grid>
        </Grid>
      </div>
      <ExampleWrapperSeamless>
        <BlocksComposed4 />
      </ExampleWrapperSeamless>
    </>
  );
}
