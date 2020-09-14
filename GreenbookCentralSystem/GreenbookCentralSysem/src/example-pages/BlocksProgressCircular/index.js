import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import BlocksProgressCircular1 from '../../example-components/BlocksProgressCircular/BlocksProgressCircular1';
import BlocksProgressCircular2 from '../../example-components/BlocksProgressCircular/BlocksProgressCircular2';
import BlocksProgressCircular3 from '../../example-components/BlocksProgressCircular/BlocksProgressCircular3';
import BlocksProgressCircular4 from '../../example-components/BlocksProgressCircular/BlocksProgressCircular4';
import BlocksProgressCircular5 from '../../example-components/BlocksProgressCircular/BlocksProgressCircular5';
import BlocksProgressCircular6 from '../../example-components/BlocksProgressCircular/BlocksProgressCircular6';
import BlocksProgressCircular7 from '../../example-components/BlocksProgressCircular/BlocksProgressCircular7';
export default function BlocksProgressCircular() {
  return (
    <>
      <PageTitle
        titleHeading="Circular Progress"
        titleDescription="Take advantage of these extensive, easy to customize circular progress component blocks."
      />

      <ExampleWrapperSeamless>
        <BlocksProgressCircular1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksProgressCircular2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksProgressCircular3 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksProgressCircular4 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksProgressCircular5 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksProgressCircular6 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksProgressCircular7 />
      </ExampleWrapperSeamless>
    </>
  );
}
