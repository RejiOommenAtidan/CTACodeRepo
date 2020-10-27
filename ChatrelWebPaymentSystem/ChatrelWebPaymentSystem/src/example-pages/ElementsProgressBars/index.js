import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';

import { ExampleWrapperSimple } from 'layout-components';

import ElementsProgressBars1 from '../../example-components/ElementsProgressBars/ProgressBars1';
import ElementsProgressBars2 from '../../example-components/ElementsProgressBars/ProgressBars2';
import ElementsProgressBars3 from '../../example-components/ElementsProgressBars/ProgressBars3';
import ElementsProgressBars4 from '../../example-components/ElementsProgressBars/ProgressBars4';
import ElementsProgressBars5 from '../../example-components/ElementsProgressBars/ProgressBars5';
import ElementsProgressBars6 from '../../example-components/ElementsProgressBars/ProgressBars6';
import ElementsProgressBars7 from '../../example-components/ElementsProgressBars/ProgressBars7';
import ElementsProgressBars8 from '../../example-components/ElementsProgressBars/ProgressBars8';
export default function ElementsProgressBars() {
  return (
    <>
      <PageTitle
        titleHeading="Progress Bars"
        titleDescription="You can use the progress bars on their own or in combination with other widgets."
      />
      <Grid container spacing={6}>
        <Grid item md={6}>
          <ExampleWrapperSimple>
            <ElementsProgressBars1 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsProgressBars3 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsProgressBars5 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsProgressBars7 />
          </ExampleWrapperSimple>
        </Grid>
        <Grid item md={6}>
          <ExampleWrapperSimple>
            <ElementsProgressBars2 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsProgressBars4 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsProgressBars6 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsProgressBars8 />
          </ExampleWrapperSimple>
        </Grid>
      </Grid>
    </>
  );
}
