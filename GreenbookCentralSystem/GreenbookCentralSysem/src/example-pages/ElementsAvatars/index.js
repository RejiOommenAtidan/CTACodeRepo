import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';

import { ExampleWrapperSimple } from 'layout-components';

import ElementsAvatars1 from '../../example-components/ElementsAvatars/Avatars1';
import ElementsAvatars2 from '../../example-components/ElementsAvatars/Avatars2';
import ElementsAvatars3 from '../../example-components/ElementsAvatars/Avatars3';
import ElementsAvatars4 from '../../example-components/ElementsAvatars/Avatars4';
import ElementsAvatars5 from '../../example-components/ElementsAvatars/Avatars5';
import ElementsAvatars6 from '../../example-components/ElementsAvatars/Avatars6';
import ElementsAvatars7 from '../../example-components/ElementsAvatars/Avatars7';
import ElementsAvatars8 from '../../example-components/ElementsAvatars/Avatars8';
export default function ElementsAvatars() {
  return (
    <>
      <PageTitle
        titleHeading="Avatars"
        titleDescription="Image or letters avatars with multiple sizes, borders and possibility to group them."
      />

      <Grid container spacing={6}>
        <Grid item md={6}>
          <ExampleWrapperSimple>
            <ElementsAvatars1 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsAvatars3 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsAvatars5 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsAvatars7 />
          </ExampleWrapperSimple>
        </Grid>
        <Grid item md={6}>
          <ExampleWrapperSimple>
            <ElementsAvatars2 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsAvatars4 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsAvatars6 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ElementsAvatars8 />
          </ExampleWrapperSimple>
        </Grid>
      </Grid>
    </>
  );
}
