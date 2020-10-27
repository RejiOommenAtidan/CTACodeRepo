import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';
import { ExampleWrapperSimple } from 'layout-components';
import Alert from '@material-ui/lab/Alert';

import MarketingFeatureSections1 from '../../example-components/MarketingFeatureSections/MarketingFeatureSections1';
import MarketingFeatureSections2 from '../../example-components/MarketingFeatureSections/MarketingFeatureSections2';
import MarketingFeatureSections3 from '../../example-components/MarketingFeatureSections/MarketingFeatureSections3';
import MarketingFeatureSections4 from '../../example-components/MarketingFeatureSections/MarketingFeatureSections4';
import MarketingFeatureSections5 from '../../example-components/MarketingFeatureSections/MarketingFeatureSections5';
import MarketingFeatureSections6 from '../../example-components/MarketingFeatureSections/MarketingFeatureSections6';
import MarketingFeatureSections7 from '../../example-components/MarketingFeatureSections/MarketingFeatureSections7';
import MarketingFeatureSections8 from '../../example-components/MarketingFeatureSections/MarketingFeatureSections8';
import MarketingFeatureSections9 from '../../example-components/MarketingFeatureSections/MarketingFeatureSections9';
import MarketingFeatureSections10 from '../../example-components/MarketingFeatureSections/MarketingFeatureSections10';
export default function MarketingFeatureSections() {
  return (
    <>
      <PageTitle
        titleHeading="Features Sections"
        titleDescription="Build presentation or marketing websites using these wonderful UI Kit components."
      />

      <Alert
        className="alerts-alternate text-center p-3 mb-5"
        severity="warning">
        The feature sections are best viewed on a full width viewport, like we
        set up in the UI Kit example pages.
      </Alert>

      <ExampleWrapperSimple>
        <MarketingFeatureSections1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSeamless>
        <MarketingFeatureSections2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingFeatureSections3 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingFeatureSections4 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingFeatureSections5 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingFeatureSections6 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingFeatureSections7 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingFeatureSections8 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingFeatureSections9 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingFeatureSections10 />
      </ExampleWrapperSeamless>
    </>
  );
}
