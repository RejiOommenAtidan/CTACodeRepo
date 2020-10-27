import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import FormsInputMask1 from '../../example-components/FormsInputMask/FormsInputMask1';
export default function FormsInputMask() {
  return (
    <>
      <PageTitle
        titleHeading="Input Mask"
        titleDescription="Add all kind of input masks for inputs for a better user experience."
      />

      <ExampleWrapperSeamless>
        <FormsInputMask1 />
      </ExampleWrapperSeamless>
    </>
  );
}
