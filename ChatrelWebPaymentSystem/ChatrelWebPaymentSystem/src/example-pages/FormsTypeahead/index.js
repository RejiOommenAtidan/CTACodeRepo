import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';
import { ExampleWrapperSimple } from 'layout-components';

import FormsTypeahead1 from '../../example-components/FormsTypeahead/FormsTypeahead1';
import FormsTypeahead2 from '../../example-components/FormsTypeahead/FormsTypeahead2';
import FormsTypeahead3 from '../../example-components/FormsTypeahead/FormsTypeahead3';
import FormsTypeahead4 from '../../example-components/FormsTypeahead/FormsTypeahead4';
export default function FormsTypeahead() {
  return (
    <>
      <PageTitle
        titleHeading="Typeahead"
        titleDescription="Create beautiful suggestion inputs for React form elements."
      />

      <ExampleWrapperSimple>
        <FormsTypeahead1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <FormsTypeahead2 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <FormsTypeahead3 />
      </ExampleWrapperSimple>
      <ExampleWrapperSeamless>
        <FormsTypeahead4 />
      </ExampleWrapperSeamless>
    </>
  );
}
