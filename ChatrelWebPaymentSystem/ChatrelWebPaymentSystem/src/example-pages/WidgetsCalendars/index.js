import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';
import { ExampleWrapperSimple } from 'layout-components';

import WidgetsCalendars1 from '../../example-components/WidgetsCalendars/Calendars1';
import WidgetsCalendars2 from '../../example-components/WidgetsCalendars/Calendars2';
export default function WidgetsCalendars() {
  return (
    <>
      <PageTitle
        titleHeading="Calendars"
        titleDescription="Calendars are used in a lot of apps. We thought to include some for your easy to use implementations."
      />

      <ExampleWrapperSeamless>
        <WidgetsCalendars1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSimple>
        <WidgetsCalendars2 />
      </ExampleWrapperSimple>
    </>
  );
}
