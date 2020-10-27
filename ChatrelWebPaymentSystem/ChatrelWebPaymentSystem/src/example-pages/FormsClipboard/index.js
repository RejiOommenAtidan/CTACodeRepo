import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import FormsClipboard1 from '../../example-components/FormsClipboard/FormsClipboard1';
import FormsClipboard2 from '../../example-components/FormsClipboard/FormsClipboard2';
export default function FormsClipboard() {
  return (
    <>
      <PageTitle
        titleHeading="Clipboard"
        titleDescription="You can copy/paste text with this great form widget."
      />

      <ExampleWrapperSimple>
        <FormsClipboard1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <FormsClipboard2 />
      </ExampleWrapperSimple>
    </>
  );
}
