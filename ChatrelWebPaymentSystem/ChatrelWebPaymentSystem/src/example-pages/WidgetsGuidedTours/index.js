import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import WidgetsGuidedTours1 from '../../example-components/WidgetsGuidedTours/GuidedTours1';
export default function WidgetsGuidedTours() {
  return (
    <>
      <PageTitle
        titleHeading="Guided Tours"
        titleDescription="These can be used with other components and elements to create stunning and unique new elements for your UIs."
      />

      <ExampleWrapperSimple sectionHeading="Basic">
        <WidgetsGuidedTours1 />
      </ExampleWrapperSimple>
    </>
  );
}
