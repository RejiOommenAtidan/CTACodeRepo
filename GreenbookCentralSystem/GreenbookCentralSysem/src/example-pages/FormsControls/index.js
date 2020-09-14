import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import FormsControls1 from '../../example-components/FormsControls/FormsControls1';
import FormsControls2 from '../../example-components/FormsControls/FormsControls2';
export default function FormsControls() {
  return (
    <>
      <PageTitle
        titleHeading="Form Controls"
        titleDescription="Wide selection of forms controls, using a standardised code base, specifically for React."
      />

      <ExampleWrapperSeamless>
        <FormsControls1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <FormsControls2 />
      </ExampleWrapperSeamless>
    </>
  );
}
