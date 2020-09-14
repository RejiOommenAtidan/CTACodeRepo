import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import BlocksGrids1 from '../../example-components/BlocksGrids/BlocksGrids1';
import BlocksGrids2 from '../../example-components/BlocksGrids/BlocksGrids2';
import BlocksGrids3 from '../../example-components/BlocksGrids/BlocksGrids3';
import BlocksGrids4 from '../../example-components/BlocksGrids/BlocksGrids4';
import BlocksGrids5 from '../../example-components/BlocksGrids/BlocksGrids5';
import BlocksGrids6 from '../../example-components/BlocksGrids/BlocksGrids6';
export default function BlocksGrids() {
  return (
    <>
      <PageTitle
        titleHeading="Grid Blocks"
        titleDescription="Take advantage of these extensive, easy to customize grid component blocks."
      />

      <ExampleWrapperSeamless>
        <BlocksGrids1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksGrids2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksGrids3 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksGrids4 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksGrids5 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksGrids6 />
      </ExampleWrapperSeamless>
    </>
  );
}
