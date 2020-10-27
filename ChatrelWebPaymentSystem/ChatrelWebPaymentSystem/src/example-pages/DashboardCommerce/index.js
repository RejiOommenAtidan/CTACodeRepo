import React from 'react';

import { PageTitle } from 'layout-components';

import DashboardCommerce1 from '../../example-components/DashboardCommerce/DashboardCommerce1';
import DashboardCommerce2 from '../../example-components/DashboardCommerce/DashboardCommerce2';
import DashboardCommerce3 from '../../example-components/DashboardCommerce/DashboardCommerce3';
import DashboardCommerce4 from '../../example-components/DashboardCommerce/DashboardCommerce4';
import DashboardCommerce5 from '../../example-components/DashboardCommerce/DashboardCommerce5';
import DashboardCommerce6 from '../../example-components/DashboardCommerce/DashboardCommerce6';
export default function DashboardCommerce() {
  return (
    <>
      <PageTitle
        titleHeading="Commerce"
        titleDescription="Dashboard section built in a few minutes using only included elements."
      />

      <DashboardCommerce1 />
      <DashboardCommerce2 />
      <DashboardCommerce3 />
      <DashboardCommerce4 />
      <DashboardCommerce5 />
      <DashboardCommerce6 />
    </>
  );
}
