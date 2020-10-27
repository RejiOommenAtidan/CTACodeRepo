import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import FormsTimepicker1 from '../../example-components/FormsTimepicker/FormsTimepicker1';
export default function FormsTimepicker() {
  return (
    <>
      <PageTitle
        titleHeading="Timepicker"
        titleDescription="The timepicker component is a plugin that helps users easily input time entries."
      />

      <ExampleWrapperSeamless>
        <FormsTimepicker1 />
      </ExampleWrapperSeamless>
    </>
  );
}
