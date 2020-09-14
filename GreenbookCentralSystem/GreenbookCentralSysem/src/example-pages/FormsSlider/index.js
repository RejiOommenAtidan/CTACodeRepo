import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import FormsSlider1 from '../../example-components/FormsSlider/FormsSlider1';
import FormsSlider2 from '../../example-components/FormsSlider/FormsSlider2';
import FormsSlider3 from '../../example-components/FormsSlider/FormsSlider3';
import FormsSlider4 from '../../example-components/FormsSlider/FormsSlider4';
import FormsSlider5 from '../../example-components/FormsSlider/FormsSlider5';
export default function FormsSlider() {
  return (
    <>
      <PageTitle
        titleHeading="Range Sliders"
        titleDescription="Create sliders and range sliders with these React form widgets."
      />

      <ExampleWrapperSimple>
        <FormsSlider1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <FormsSlider2 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <FormsSlider3 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <FormsSlider4 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <FormsSlider5 />
      </ExampleWrapperSimple>
    </>
  );
}
