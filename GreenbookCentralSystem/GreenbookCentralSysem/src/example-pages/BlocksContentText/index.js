import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import BlocksContentText1 from '../../example-components/BlocksContentText/BlocksContentText1';
import BlocksContentText2 from '../../example-components/BlocksContentText/BlocksContentText2';
import BlocksContentText3 from '../../example-components/BlocksContentText/BlocksContentText3';
import BlocksContentText4 from '../../example-components/BlocksContentText/BlocksContentText4';
import BlocksContentText5 from '../../example-components/BlocksContentText/BlocksContentText5';
import BlocksContentText6 from '../../example-components/BlocksContentText/BlocksContentText6';
export default function BlocksContentText() {
  return (
    <>
      <PageTitle
        titleHeading="Content Text"
        titleDescription="Take advantage of these extensive, easy to customize content text component blocks."
      />

      <ExampleWrapperSeamless>
        <BlocksContentText1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksContentText2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksContentText3 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksContentText4 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksContentText5 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksContentText6 />
      </ExampleWrapperSeamless>
    </>
  );
}
