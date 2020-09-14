import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import BlocksChartsSmall1 from '../../example-components/BlocksChartsSmall/BlocksChartsSmall1';
import BlocksChartsSmall2 from '../../example-components/BlocksChartsSmall/BlocksChartsSmall2';
import BlocksChartsSmall3 from '../../example-components/BlocksChartsSmall/BlocksChartsSmall3';
import BlocksChartsSmall4 from '../../example-components/BlocksChartsSmall/BlocksChartsSmall4';
import BlocksChartsSmall5 from '../../example-components/BlocksChartsSmall/BlocksChartsSmall5';
import BlocksChartsSmall6 from '../../example-components/BlocksChartsSmall/BlocksChartsSmall6';
export default function BlocksChartsSmall() {
  return (
    <>
      <PageTitle
        titleHeading="Small Charts"
        titleDescription="Take advantage of these extensive, easy to customize small charts component blocks."
      />

      <ExampleWrapperSeamless>
        <BlocksChartsSmall1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksChartsSmall2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksChartsSmall3 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksChartsSmall4 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksChartsSmall5 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksChartsSmall6 />
      </ExampleWrapperSeamless>
    </>
  );
}
