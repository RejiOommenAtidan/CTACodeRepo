import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import FormsColorpicker1 from '../../example-components/FormsColorpicker/FormsColorpicker1';
import FormsColorpicker2 from '../../example-components/FormsColorpicker/FormsColorpicker2';
export default function FormsColorpicker() {
  return (
    <>
      <PageTitle
        titleHeading="Colorpicker"
        titleDescription="Color Pickers following the design from Photoshop, Sketch, Chrome, Twitter and more."
      />

      <ExampleWrapperSimple>
        <FormsColorpicker1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <FormsColorpicker2 />
      </ExampleWrapperSimple>
    </>
  );
}
