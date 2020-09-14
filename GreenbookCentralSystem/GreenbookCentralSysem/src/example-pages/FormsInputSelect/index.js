import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import FormsInputSelect1 from '../../example-components/FormsInputSelect/FormsInputSelect1';
import FormsInputSelect2 from '../../example-components/FormsInputSelect/FormsInputSelect2';
import FormsInputSelect3 from '../../example-components/FormsInputSelect/FormsInputSelect3';
export default function FormsInputSelect() {
  return (
    <>
      <PageTitle
        titleHeading="Input Select"
        titleDescription="Create fancy multi select dropdown menus for a better user experience."
      />

      <ExampleWrapperSeamless>
        <FormsInputSelect1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <FormsInputSelect2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <FormsInputSelect3 />
      </ExampleWrapperSeamless>
    </>
  );
}
