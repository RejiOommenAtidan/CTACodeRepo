import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import ElementsUtilitiesHelpers1 from '../../example-components/ElementsUtilitiesHelpers/UtilitiesHelpers1';
import ElementsUtilitiesHelpers2 from '../../example-components/ElementsUtilitiesHelpers/UtilitiesHelpers2';
import ElementsUtilitiesHelpers3 from '../../example-components/ElementsUtilitiesHelpers/UtilitiesHelpers3';
import ElementsUtilitiesHelpers4 from '../../example-components/ElementsUtilitiesHelpers/UtilitiesHelpers4';
import ElementsUtilitiesHelpers5 from '../../example-components/ElementsUtilitiesHelpers/UtilitiesHelpers5';
export default function ElementsUtilitiesHelpers() {
  return (
    <>
      <PageTitle
        titleHeading="Utilities & Helpers"
        titleDescription="These are helpers that speed up the dev time for various components and effects."
      />
      <ExampleWrapperSimple>
        <ElementsUtilitiesHelpers1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsUtilitiesHelpers2 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsUtilitiesHelpers3 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsUtilitiesHelpers4 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsUtilitiesHelpers5 />
      </ExampleWrapperSimple>
    </>
  );
}
