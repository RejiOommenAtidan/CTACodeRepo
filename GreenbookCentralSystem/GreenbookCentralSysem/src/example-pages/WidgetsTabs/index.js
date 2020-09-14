import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import WidgetsTabs1 from '../../example-components/WidgetsTabs/Tabs1';
import WidgetsTabs2 from '../../example-components/WidgetsTabs/Tabs2';
import WidgetsTabs3 from '../../example-components/WidgetsTabs/Tabs3';
import WidgetsTabs4 from '../../example-components/WidgetsTabs/Tabs4';
import WidgetsTabs5 from '../../example-components/WidgetsTabs/Tabs5';
export default function WidgetsTabs() {
  return (
    <>
      <PageTitle
        titleHeading="Tabs"
        titleDescription="Tabs are used to split content between multiple sections. Wide variety available."
      />

      <ExampleWrapperSeamless>
        <WidgetsTabs1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <WidgetsTabs2 />
      </ExampleWrapperSeamless>

      <ExampleWrapperSeamless>
        <WidgetsTabs3 />
      </ExampleWrapperSeamless>

      <ExampleWrapperSeamless>
        <WidgetsTabs4 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <WidgetsTabs5 />
      </ExampleWrapperSeamless>
    </>
  );
}
