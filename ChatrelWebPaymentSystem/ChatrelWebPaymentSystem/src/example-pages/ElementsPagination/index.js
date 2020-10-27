import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import ElementsPagination1 from '../../example-components/ElementsPagination/Pagination1';
import ElementsPagination2 from '../../example-components/ElementsPagination/Pagination2';
import ElementsPagination3 from '../../example-components/ElementsPagination/Pagination3';
export default function ElementsPagination() {
  return (
    <>
      <PageTitle
        titleHeading="Pagination"
        titleDescription="Basic and dynamic pagination for use in your next awesome application."
      />
      <ExampleWrapperSimple>
        <ElementsPagination1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsPagination2 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ElementsPagination3 />
      </ExampleWrapperSimple>
    </>
  );
}
