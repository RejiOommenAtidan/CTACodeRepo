import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import FormsDualListbox1 from '../../example-components/FormsDualListbox/FormsDualListbox1';
export default function FormsDualListbox() {
  return (
    <>
      <PageTitle
        titleHeading="Dual Listbox"
        titleDescription="This component provides two lists controls side-by-side that allows items in one list to be selected and moved."
      />

      <ExampleWrapperSimple>
        <FormsDualListbox1 />
      </ExampleWrapperSimple>
    </>
  );
}
