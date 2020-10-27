import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import WidgetsDragDrop1 from '../../example-components/WidgetsDragDrop/DragDrop1';
import WidgetsDragDrop2 from '../../example-components/WidgetsDragDrop/DragDrop2';
export default function WidgetsDragDrop() {
  return (
    <>
      <PageTitle
        titleHeading="Drag & Drop"
        titleDescription="Enable draggable functionality on any DOM element. Move the draggable object by clicking on it with the mouse and dragging it anywhere within the viewport."
      />

      <ExampleWrapperSimple sectionHeading="Basic">
        <WidgetsDragDrop1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Lists">
        <WidgetsDragDrop2 />
      </ExampleWrapperSimple>
    </>
  );
}
