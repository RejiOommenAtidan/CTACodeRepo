import React from 'react';

import { PageTitle } from 'layout-components';

import PageInvoice1 from '../../example-components/PageInvoice/PageInvoice1';
export default function PageInvoice() {
  return (
    <>
      <PageTitle
        titleHeading="Invoice"
        titleDescription="This pages contains an example invoice design."
      />

      <PageInvoice1 />
    </>
  );
}
