import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';
import { ExampleWrapperSimple } from 'layout-components';

import WidgetsContextMenus1 from '../../example-components/WidgetsContextMenus/ContextMenus1';
import WidgetsContextMenus2 from '../../example-components/WidgetsContextMenus/ContextMenus2';
export default function WidgetsContextMenus() {
  return (
    <>
      <PageTitle
        titleHeading="Context Menus"
        titleDescription="A context menu is a popup menu that appears upon user interaction, such as a right-click mouse operation."
      />

      <ExampleWrapperSimple>
        <WidgetsContextMenus1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSeamless>
        <WidgetsContextMenus2 />
      </ExampleWrapperSeamless>
    </>
  );
}
