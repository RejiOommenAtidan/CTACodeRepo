import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';

import { ExampleWrapperSimple } from 'layout-components';

import ElementsButtons1 from '../../example-components/ElementsButtons/Buttons1';
import ElementsButtons2 from '../../example-components/ElementsButtons/Buttons2';
import ElementsButtons3 from '../../example-components/ElementsButtons/Buttons3';
import ElementsButtons4 from '../../example-components/ElementsButtons/Buttons4';
import ElementsButtons5 from '../../example-components/ElementsButtons/Buttons5';
import ElementsButtons6 from '../../example-components/ElementsButtons/Buttons6';
import ElementsButtons7 from '../../example-components/ElementsButtons/Buttons7';
import ElementsButtons8 from '../../example-components/ElementsButtons/Buttons8';
import ElementsButtons9 from '../../example-components/ElementsButtons/Buttons9';
import ElementsButtons10 from '../../example-components/ElementsButtons/Buttons10';
import ElementsButtons11 from '../../example-components/ElementsButtons/Buttons11';
import ElementsButtons12 from '../../example-components/ElementsButtons/Buttons12';
import ElementsButtons13 from '../../example-components/ElementsButtons/Buttons13';
import ElementsButtons14 from '../../example-components/ElementsButtons/Buttons14';
export default function ElementsButtons() {
  return (
    <>
      <PageTitle
        titleHeading="Buttons"
        titleDescription="Wide selection of buttons that feature different styles for backgrounds, borders and hover options!"
      />
      <Grid container spacing={6}>
        <Grid item md={6}>
          <ExampleWrapperSimple>
            <ElementsButtons1 />
          </ExampleWrapperSimple>
        </Grid>
        <Grid item md={6}>
          <ExampleWrapperSimple>
            <ElementsButtons2 />
          </ExampleWrapperSimple>
        </Grid>
      </Grid>
      <ExampleWrapperSimple>
        <ElementsButtons3 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsButtons4 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsButtons5 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsButtons6 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsButtons7 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsButtons8 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsButtons9 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsButtons10 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsButtons11 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsButtons12 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsButtons13 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsButtons14 />
      </ExampleWrapperSimple>
    </>
  );
}
