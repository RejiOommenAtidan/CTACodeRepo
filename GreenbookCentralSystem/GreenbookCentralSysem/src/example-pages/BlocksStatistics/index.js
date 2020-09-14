import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import BlocksStatistics1 from '../../example-components/BlocksStatistics/BlocksStatistics1';
import BlocksStatistics2 from '../../example-components/BlocksStatistics/BlocksStatistics2';
import BlocksStatistics3 from '../../example-components/BlocksStatistics/BlocksStatistics3';
import BlocksStatistics4 from '../../example-components/BlocksStatistics/BlocksStatistics4';
import BlocksStatistics5 from '../../example-components/BlocksStatistics/BlocksStatistics5';
import BlocksStatistics6 from '../../example-components/BlocksStatistics/BlocksStatistics6';
import BlocksStatistics7 from '../../example-components/BlocksStatistics/BlocksStatistics7';
import BlocksStatistics8 from '../../example-components/BlocksStatistics/BlocksStatistics8';
import BlocksStatistics9 from '../../example-components/BlocksStatistics/BlocksStatistics9';
export default function BlocksStatistics() {
  return (
    <>
      <PageTitle
        titleHeading="Statistics Blocks"
        titleDescription="Take advantage of these extensive, easy to customize statistics component blocks."
      />

      <ExampleWrapperSeamless>
        <BlocksStatistics1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksStatistics2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksStatistics3 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksStatistics4 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksStatistics5 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksStatistics6 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksStatistics7 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksStatistics8 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksStatistics9 />
      </ExampleWrapperSeamless>
    </>
  );
}
