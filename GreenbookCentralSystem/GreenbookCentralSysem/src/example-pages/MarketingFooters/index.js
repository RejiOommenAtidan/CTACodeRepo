import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import MarketingFooters1 from '../../example-components/MarketingFooters/MarketingFooters1';
import MarketingFooters2 from '../../example-components/MarketingFooters/MarketingFooters2';
import MarketingFooters3 from '../../example-components/MarketingFooters/MarketingFooters3';
import MarketingFooters4 from '../../example-components/MarketingFooters/MarketingFooters4';
import MarketingFooters5 from '../../example-components/MarketingFooters/MarketingFooters5';
import MarketingFooters6 from '../../example-components/MarketingFooters/MarketingFooters6';
export default function MarketingFooters() {
  return (
    <>
      <PageTitle
        titleHeading="Footer Sections"
        titleDescription="Build presentation or marketing websites using these wonderful UI Kit components."
      />

      <ExampleWrapperSeamless>
        <MarketingFooters1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingFooters2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingFooters3 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingFooters4 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingFooters5 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingFooters6 />
      </ExampleWrapperSeamless>
    </>
  );
}
