import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import FormsValidation1 from '../../example-components/FormsValidation/FormsValidation1';
import FormsValidation2 from '../../example-components/FormsValidation/FormsValidation2';
export default function FormsValidation() {
  return (
    <>
      <PageTitle
        titleHeading="Validation"
        titleDescription="Inline validation is very easy to implement using our UI framework."
      />

      <ExampleWrapperSimple>
        <FormsValidation1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <FormsValidation2 />
      </ExampleWrapperSimple>
    </>
  );
}
