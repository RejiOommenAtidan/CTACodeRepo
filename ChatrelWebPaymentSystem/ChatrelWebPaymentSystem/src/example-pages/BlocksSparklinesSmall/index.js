import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import BlocksSparklinesSmall1 from '../../example-components/BlocksSparklinesSmall/BlocksSparklinesSmall1';
import BlocksSparklinesSmall2 from '../../example-components/BlocksSparklinesSmall/BlocksSparklinesSmall2';
import BlocksSparklinesSmall3 from '../../example-components/BlocksSparklinesSmall/BlocksSparklinesSmall3';
import BlocksSparklinesSmall4 from '../../example-components/BlocksSparklinesSmall/BlocksSparklinesSmall4';
import BlocksSparklinesSmall5 from '../../example-components/BlocksSparklinesSmall/BlocksSparklinesSmall5';
import BlocksSparklinesSmall6 from '../../example-components/BlocksSparklinesSmall/BlocksSparklinesSmall6';
import BlocksSparklinesSmall7 from '../../example-components/BlocksSparklinesSmall/BlocksSparklinesSmall7';
export default function BlocksSparklinesSmall() {
  return (
    <>
      <PageTitle
        titleHeading="Small Sparklines"
        titleDescription="Take advantage of these extensive, easy to customize small sparklines component blocks."
      />

      <ExampleWrapperSeamless>
        <BlocksSparklinesSmall1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksSparklinesSmall2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksSparklinesSmall3 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksSparklinesSmall4 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksSparklinesSmall5 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksSparklinesSmall6 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksSparklinesSmall7 />
      </ExampleWrapperSeamless>
    </>
  );
}
