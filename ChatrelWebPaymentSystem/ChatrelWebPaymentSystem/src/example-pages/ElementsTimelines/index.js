import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';
import { ExampleWrapperSimple } from 'layout-components';

import ElementsTimelines1 from '../../example-components/ElementsTimelines/Timelines1';
import ElementsTimelines2 from '../../example-components/ElementsTimelines/Timelines2';
import ElementsTimelines3 from '../../example-components/ElementsTimelines/Timelines3';
import ElementsTimelines4 from '../../example-components/ElementsTimelines/Timelines4';
import ElementsTimelines5 from '../../example-components/ElementsTimelines/Timelines5';
import ElementsTimelines6 from '../../example-components/ElementsTimelines/Timelines6';
import ElementsTimelines7 from '../../example-components/ElementsTimelines/Timelines7';
import ElementsTimelines8 from '../../example-components/ElementsTimelines/Timelines8';
export default function ElementsTimelines() {
  return (
    <>
      <PageTitle
        titleHeading="Timelines"
        titleDescription="Timelines are used to show lists of notifications, tasks or actions in a beautiful way."
      />
      <ExampleWrapperSimple>
        <ElementsTimelines1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSeamless>
        <ElementsTimelines2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSimple>
        <ElementsTimelines3 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsTimelines4 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsTimelines5 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsTimelines6 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsTimelines7 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsTimelines8 />
      </ExampleWrapperSimple>
    </>
  );
}
