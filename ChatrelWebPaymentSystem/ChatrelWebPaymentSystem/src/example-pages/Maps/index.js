import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import Maps1 from '../../example-components/Maps/Maps1';
import Maps2 from '../../example-components/Maps/Maps2';
export default function Maps() {
  return (
    <>
      <PageTitle
        titleHeading="Maps"
        titleDescription="Implement in your applications Google or vector maps."
      />

      <ExampleWrapperSimple>
        <Maps1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <Maps2 />
      </ExampleWrapperSimple>
    </>
  );
}
