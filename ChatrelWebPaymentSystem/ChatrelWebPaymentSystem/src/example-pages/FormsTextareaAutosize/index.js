import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import FormsTextareaAutosize1 from '../../example-components/FormsTextareaAutosize/FormsTextareaAutosize1';
import FormsTextareaAutosize2 from '../../example-components/FormsTextareaAutosize/FormsTextareaAutosize2';
export default function FormsTextareaAutosize() {
  return (
    <>
      <PageTitle
        titleHeading="Textarea Autosize"
        titleDescription="Create textareas that grow in height based on their content."
      />

      <ExampleWrapperSeamless>
        <FormsTextareaAutosize1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <FormsTextareaAutosize2 />
      </ExampleWrapperSeamless>
    </>
  );
}
