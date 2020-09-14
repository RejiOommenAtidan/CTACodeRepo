import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import FormsWysiwygEditor1 from '../../example-components/FormsWysiwygEditor/FormsWysiwygEditor1';
import FormsWysiwygEditor2 from '../../example-components/FormsWysiwygEditor/FormsWysiwygEditor2';
export default function FormsWysiwygEditor() {
  return (
    <>
      <PageTitle
        titleHeading="WYSIWYG Editors"
        titleDescription="Create beautiful suggestion inputs for React form elements."
      />

      <ExampleWrapperSimple>
        <FormsWysiwygEditor1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <FormsWysiwygEditor2 />
      </ExampleWrapperSimple>
    </>
  );
}
