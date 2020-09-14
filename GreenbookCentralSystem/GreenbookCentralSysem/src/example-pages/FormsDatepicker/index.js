import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';
import { ExampleWrapperSeamless } from 'layout-components';

import FormsDatepicker1 from '../../example-components/FormsDatepicker/FormsDatepicker1';
import FormsDatepicker2 from '../../example-components/FormsDatepicker/FormsDatepicker2';
export default function FormsDatepicker() {
  return (
    <>
      <PageTitle
        titleHeading="Datepicker"
        titleDescription="Build beautiful datepickers perfectly integrated in the general style of the application."
      />

      <Grid container spacing={6}>
        <Grid item lg={6}>
          <ExampleWrapperSeamless>
            <FormsDatepicker1 />
          </ExampleWrapperSeamless>
        </Grid>
        <Grid item lg={6}>
          <ExampleWrapperSeamless>
            <FormsDatepicker2 />
          </ExampleWrapperSeamless>
        </Grid>
      </Grid>
    </>
  );
}
