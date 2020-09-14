import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import WidgetsPopovers1 from '../../example-components/WidgetsPopovers/Popovers1';
import WidgetsPopovers2 from '../../example-components/WidgetsPopovers/Popovers2';
import WidgetsPopovers3 from '../../example-components/WidgetsPopovers/Popovers3';
export default function WidgetsPopovers() {
  return (
    <>
      <PageTitle
        titleHeading="Popovers"
        titleDescription="Add small overlay content, like those found in iOS, to any element for housing secondary information."
      />

      <ExampleWrapperSimple>
        <WidgetsPopovers1 />
      </ExampleWrapperSimple>

      <ExampleWrapperSimple>
        <WidgetsPopovers2 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <WidgetsPopovers3 />
      </ExampleWrapperSimple>
    </>
  );
}
