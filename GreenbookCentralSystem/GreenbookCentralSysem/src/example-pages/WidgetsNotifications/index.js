import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import WidgetsNotifications1 from '../../example-components/WidgetsNotifications/Notifications1';
import WidgetsNotifications2 from '../../example-components/WidgetsNotifications/Notifications2';
import WidgetsNotifications3 from '../../example-components/WidgetsNotifications/Notifications3';
import WidgetsNotifications4 from '../../example-components/WidgetsNotifications/Notifications4';
import WidgetsNotifications5 from '../../example-components/WidgetsNotifications/Notifications5';
import WidgetsNotifications6 from '../../example-components/WidgetsNotifications/Notifications6';
export default function WidgetsNotifications() {
  return (
    <>
      <PageTitle
        titleHeading="Notifications"
        titleDescription="Show beautiful, animated growl like notifications or alerts on your pages screens."
      />

      <ExampleWrapperSimple sectionHeading="Basic Alerts">
        <WidgetsNotifications1 />
      </ExampleWrapperSimple>

      <ExampleWrapperSimple>
        <WidgetsNotifications2 />
      </ExampleWrapperSimple>

      <ExampleWrapperSimple sectionHeading="Dismissible Alerts">
        <WidgetsNotifications3 />
      </ExampleWrapperSimple>

      <ExampleWrapperSimple>
        <WidgetsNotifications4 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <WidgetsNotifications5 />
      </ExampleWrapperSimple>

      <ExampleWrapperSimple>
        <WidgetsNotifications6 />
      </ExampleWrapperSimple>
    </>
  );
}
