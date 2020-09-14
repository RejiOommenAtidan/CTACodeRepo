import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import MarketingPartners1 from '../../example-components/MarketingPartners/MarketingPartners1';
import MarketingPartners2 from '../../example-components/MarketingPartners/MarketingPartners2';
import MarketingPartners3 from '../../example-components/MarketingPartners/MarketingPartners3';
import MarketingPartners4 from '../../example-components/MarketingPartners/MarketingPartners4';
import MarketingPartners5 from '../../example-components/MarketingPartners/MarketingPartners5';
export default function MarketingPartners() {
  return (
    <>
      <PageTitle
        titleHeading="Partners Sections"
        titleDescription="Build presentation or marketing websites using these wonderful UI Kit components."
      />

      <ExampleWrapperSeamless>
        <MarketingPartners1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingPartners2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingPartners3 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingPartners4 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingPartners5 />
      </ExampleWrapperSeamless>
    </>
  );
}
