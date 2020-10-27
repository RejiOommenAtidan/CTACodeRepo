import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';
import { ExampleWrapperSimple } from 'layout-components';

import WidgetsCountup1 from '../../example-components/WidgetsCountup/Countup1';
import WidgetsCountup2 from '../../example-components/WidgetsCountup/Countup2';
import WidgetsCountup3 from '../../example-components/WidgetsCountup/Countup3';
import WidgetsCountup4 from '../../example-components/WidgetsCountup/Countup4';
import WidgetsCountup5 from '../../example-components/WidgetsCountup/Countup5';
export default function WidgetsCountup() {
  return (
    <>
      <PageTitle
        titleHeading="Count Up"
        titleDescription="Add animations to your numbers. It'll make your next app more user friendly."
      />

      <ExampleWrapperSimple>
        <WidgetsCountup1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSeamless>
        <WidgetsCountup2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <WidgetsCountup3 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <WidgetsCountup4 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <WidgetsCountup5 />
      </ExampleWrapperSeamless>
    </>
  );
}
