import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import MarketingTestimonials1 from '../../example-components/MarketingTestimonials/MarketingTestimonials1';
import MarketingTestimonials2 from '../../example-components/MarketingTestimonials/MarketingTestimonials2';
import MarketingTestimonials3 from '../../example-components/MarketingTestimonials/MarketingTestimonials3';
import MarketingTestimonials4 from '../../example-components/MarketingTestimonials/MarketingTestimonials4';
import MarketingTestimonials5 from '../../example-components/MarketingTestimonials/MarketingTestimonials5';
export default function MarketingTestimonials() {
  return (
    <>
      <PageTitle
        titleHeading="Testimonials Sections"
        titleDescription="Build presentation or marketing websites using these wonderful UI Kit components."
      />

      <ExampleWrapperSeamless>
        <MarketingTestimonials1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingTestimonials2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingTestimonials3 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingTestimonials4 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <MarketingTestimonials5 />
      </ExampleWrapperSeamless>
    </>
  );
}
