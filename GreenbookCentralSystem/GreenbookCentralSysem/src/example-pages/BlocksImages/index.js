import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import BlocksImages1 from '../../example-components/BlocksImages/BlocksImages1';
import BlocksImages2 from '../../example-components/BlocksImages/BlocksImages2';
import BlocksImages3 from '../../example-components/BlocksImages/BlocksImages3';
import BlocksImages4 from '../../example-components/BlocksImages/BlocksImages4';
import BlocksImages5 from '../../example-components/BlocksImages/BlocksImages5';
import BlocksImages6 from '../../example-components/BlocksImages/BlocksImages6';
import BlocksImages7 from '../../example-components/BlocksImages/BlocksImages7';
export default function BlocksImages() {
  return (
    <>
      <PageTitle
        titleHeading="Image Blocks"
        titleDescription="Take advantage of these extensive, easy to customize image component blocks."
      />

      <ExampleWrapperSeamless>
        <BlocksImages1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksImages2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksImages3 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksImages4 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksImages5 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksImages6 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <BlocksImages7 />
      </ExampleWrapperSeamless>
    </>
  );
}
