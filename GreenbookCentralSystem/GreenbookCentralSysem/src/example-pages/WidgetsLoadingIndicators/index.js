import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';
import { ExampleWrapperSimple } from 'layout-components';

import WidgetsLoadingIndicators1 from '../../example-components/WidgetsLoadingIndicators/LoadingIndicators1';
import WidgetsLoadingIndicators2 from '../../example-components/WidgetsLoadingIndicators/LoadingIndicators2';
import WidgetsLoadingIndicators3 from '../../example-components/WidgetsLoadingIndicators/LoadingIndicators3';
import WidgetsLoadingIndicators4 from '../../example-components/WidgetsLoadingIndicators/LoadingIndicators4';
export default function WidgetsLoadingIndicators() {
  return (
    <>
      <PageTitle
        titleHeading="Loading Indicators"
        titleDescription="Use these loading indicators in combination with other elements to show current app status to users."
      />

      <ExampleWrapperSimple sectionHeading="Basic">
        <WidgetsLoadingIndicators1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Block loading">
        <WidgetsLoadingIndicators2 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Indicators colors">
        <WidgetsLoadingIndicators3 />
      </ExampleWrapperSimple>
      <ExampleWrapperSeamless sectionHeading="Skeleton loading">
        <WidgetsLoadingIndicators4 />
      </ExampleWrapperSeamless>
    </>
  );
}
