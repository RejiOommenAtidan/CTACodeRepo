import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import FormsToggleSwitch1 from '../../example-components/FormsToggleSwitch/FormsToggleSwitch1';
import FormsToggleSwitch2 from '../../example-components/FormsToggleSwitch/FormsToggleSwitch2';
import FormsToggleSwitch3 from '../../example-components/FormsToggleSwitch/FormsToggleSwitch3';
export default function FormsToggleSwitch() {
  return (
    <>
      <PageTitle
        titleHeading="Toggle Switch"
        titleDescription="Instead of regular checkboxes, use these toggle widgets for a better UX"
      />

      <ExampleWrapperSimple>
        <FormsToggleSwitch1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <FormsToggleSwitch2 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <FormsToggleSwitch3 />
      </ExampleWrapperSimple>
    </>
  );
}
