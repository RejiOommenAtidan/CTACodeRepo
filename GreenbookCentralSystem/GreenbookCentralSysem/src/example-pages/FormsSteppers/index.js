import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import FormsSteppers1 from '../../example-components/FormsSteppers/FormsSteppers1';
export default function FormsSteppers() {
  return (
    <>
      <PageTitle
        titleHeading="Content Steppers"
        titleDescription="Easily create beautiful form multi step wizards or presentation steps."
      />

      <ExampleWrapperSeamless>
        <FormsSteppers1 />
      </ExampleWrapperSeamless>
    </>
  );
}
