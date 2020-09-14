import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import BlocksNavigation1 from '../../example-components/BlocksNavigation/BlocksNavigation1';
import BlocksNavigation2 from '../../example-components/BlocksNavigation/BlocksNavigation2';
import BlocksNavigation3 from '../../example-components/BlocksNavigation/BlocksNavigation3';
import BlocksNavigation4 from '../../example-components/BlocksNavigation/BlocksNavigation4';
import BlocksNavigation5 from '../../example-components/BlocksNavigation/BlocksNavigation5';
import BlocksNavigation6 from '../../example-components/BlocksNavigation/BlocksNavigation6';
export default function BlocksNavigation() {
  return (
    <>
      <PageTitle
        titleHeading="Navigation Blocks"
        titleDescription="Take advantage of these extensive, easy to customize navigation component blocks."
      />

      <ExampleWrapperSeamless>
        <BlocksNavigation1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksNavigation2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksNavigation3 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksNavigation4 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksNavigation5 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksNavigation6 />
      </ExampleWrapperSeamless>
    </>
  );
}
