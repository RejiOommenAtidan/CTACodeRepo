import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';
import { ExampleWrapperSeamless } from 'layout-components';

import BlocksProgressHorizontal1 from '../../example-components/BlocksProgressHorizontal/BlocksProgressHorizontal1';
import BlocksProgressHorizontal2 from '../../example-components/BlocksProgressHorizontal/BlocksProgressHorizontal2';
import BlocksProgressHorizontal3 from '../../example-components/BlocksProgressHorizontal/BlocksProgressHorizontal3';
import BlocksProgressHorizontal4 from '../../example-components/BlocksProgressHorizontal/BlocksProgressHorizontal4';
import BlocksProgressHorizontal5 from '../../example-components/BlocksProgressHorizontal/BlocksProgressHorizontal5';
import BlocksProgressHorizontal6 from '../../example-components/BlocksProgressHorizontal/BlocksProgressHorizontal6';
import BlocksProgressHorizontal7 from '../../example-components/BlocksProgressHorizontal/BlocksProgressHorizontal7';
import BlocksProgressHorizontal8 from '../../example-components/BlocksProgressHorizontal/BlocksProgressHorizontal8';
export default function BlocksProgressHorizontal() {
  return (
    <>
      <PageTitle
        titleHeading="Horizontal Progress"
        titleDescription="Take advantage of these extensive, easy to customize horizontal progress component blocks."
      />

      <ExampleWrapperSeamless>
        <BlocksProgressHorizontal1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksProgressHorizontal2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksProgressHorizontal3 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksProgressHorizontal4 />
      </ExampleWrapperSeamless>
      <Grid container spacing={6}>
        <Grid item lg={6}>
          <ExampleWrapperSeamless>
            <BlocksProgressHorizontal5 />
          </ExampleWrapperSeamless>
        </Grid>
        <Grid item lg={6}>
          <ExampleWrapperSeamless>
            <BlocksProgressHorizontal6 />
          </ExampleWrapperSeamless>
        </Grid>
      </Grid>
      <ExampleWrapperSeamless>
        <BlocksProgressHorizontal7 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksProgressHorizontal8 />
      </ExampleWrapperSeamless>
    </>
  );
}
