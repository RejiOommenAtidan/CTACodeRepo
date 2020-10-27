import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import WidgetsCarousels1 from '../../example-components/WidgetsCarousels/Carousels1';
import WidgetsCarousels2 from '../../example-components/WidgetsCarousels/Carousels2';
import WidgetsCarousels3 from '../../example-components/WidgetsCarousels/Carousels3';
import WidgetsCarousels4 from '../../example-components/WidgetsCarousels/Carousels4';
import WidgetsCarousels5 from '../../example-components/WidgetsCarousels/Carousels5';
export default function WidgetsCarousels() {
  return (
    <>
      <PageTitle
        titleHeading="Carousels"
        titleDescription="Create easy, simple to use and beautiful slideshows & carousels with these components."
      />

      <ExampleWrapperSeamless>
        <WidgetsCarousels1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <WidgetsCarousels2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <WidgetsCarousels3 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <WidgetsCarousels4 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <WidgetsCarousels5 />
      </ExampleWrapperSeamless>
    </>
  );
}
