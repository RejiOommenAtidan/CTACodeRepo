import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import WidgetsTooltips1 from '../../example-components/WidgetsTooltips/Tooltips1';
import WidgetsTooltips2 from '../../example-components/WidgetsTooltips/Tooltips2';
import WidgetsTooltips3 from '../../example-components/WidgetsTooltips/Tooltips3';
export default function WidgetsTooltips() {
  return (
    <>
      <PageTitle
        titleHeading="Tooltips"
        titleDescription="The tooltip or infotip or a hint is a common graphical user interface element."
      />

      <ExampleWrapperSimple>
        <WidgetsTooltips1 />
      </ExampleWrapperSimple>

      <ExampleWrapperSimple>
        <WidgetsTooltips2 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <WidgetsTooltips3 />
      </ExampleWrapperSimple>
    </>
  );
}
