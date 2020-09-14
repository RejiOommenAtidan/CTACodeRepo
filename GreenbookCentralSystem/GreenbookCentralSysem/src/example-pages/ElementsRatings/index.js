import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';

import { ExampleWrapperSimple } from 'layout-components';

import ElementsRatings1 from '../../example-components/ElementsRatings/Ratings1';
import ElementsRatings2 from '../../example-components/ElementsRatings/Ratings2';
import ElementsRatings3 from '../../example-components/ElementsRatings/Ratings3';
import ElementsRatings4 from '../../example-components/ElementsRatings/Ratings4';
import ElementsRatings5 from '../../example-components/ElementsRatings/Ratings5';
import ElementsRatings6 from '../../example-components/ElementsRatings/Ratings6';
export default function ElementsRatings() {
  return (
    <>
      <PageTitle
        titleHeading="Ratings"
        titleDescription="Display beautiful ratings with custom icons, stars and colors."
      />

      <Grid container spacing={6}>
        <Grid item md={6}>
          <ExampleWrapperSimple>
            <ElementsRatings1 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsRatings3 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsRatings5 />
          </ExampleWrapperSimple>
        </Grid>
        <Grid item md={6}>
          <ExampleWrapperSimple>
            <ElementsRatings2 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsRatings4 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsRatings6 />
          </ExampleWrapperSimple>
        </Grid>
      </Grid>
    </>
  );
}
