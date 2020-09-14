import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import PageAuthModals1 from '../../example-components/PageAuthModals/AuthModals1';
import PageAuthModals2 from '../../example-components/PageAuthModals/AuthModals2';
import PageAuthModals3 from '../../example-components/PageAuthModals/AuthModals3';
export default function PageAuthModals() {
  return (
    <>
      <PageTitle
        titleHeading="Auth Modals"
        titleDescription="Examples for creating modal dialogs with authentication fields."
      />

      <ExampleWrapperSimple sectionHeading="Login">
        <PageAuthModals1 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Register">
        <PageAuthModals2 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple sectionHeading="Recover Password">
        <PageAuthModals3 />
      </ExampleWrapperSimple>
    </>
  );
}
