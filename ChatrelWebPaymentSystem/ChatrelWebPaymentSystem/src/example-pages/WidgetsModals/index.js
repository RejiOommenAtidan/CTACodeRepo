import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import WidgetsModals1 from '../../example-components/WidgetsModals/Modals1';
import WidgetsModals2 from '../../example-components/WidgetsModals/Modals2';
import WidgetsModals3 from '../../example-components/WidgetsModals/Modals3';
import WidgetsModals4 from '../../example-components/WidgetsModals/Modals4';
export default function WidgetsModals() {
  return (
    <>
      <PageTitle
        titleHeading="Modal Dialogs"
        titleDescription="Wide selection of modal dialogs styles and animations available."
      />

      <ExampleWrapperSimple>
        <WidgetsModals1 />
      </ExampleWrapperSimple>

      <ExampleWrapperSimple sectionHeading="Borderless">
        <WidgetsModals2 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Colors">
        <WidgetsModals3 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Actions Confirmations">
        <WidgetsModals4 />
      </ExampleWrapperSimple>
    </>
  );
}
