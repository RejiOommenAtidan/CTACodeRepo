import React from 'react';

import { PageTitle } from 'layout-components';

import DashboardMonitoring1 from '../../example-components/DashboardMonitoring/DashboardMonitoring1';
import DashboardMonitoring2 from '../../example-components/DashboardMonitoring/DashboardMonitoring2';
import DashboardMonitoring3 from '../../example-components/DashboardMonitoring/DashboardMonitoring3';
import DashboardMonitoring4 from '../../example-components/DashboardMonitoring/DashboardMonitoring4';
import DashboardMonitoring5 from '../../example-components/DashboardMonitoring/DashboardMonitoring5';
import DashboardMonitoring6 from '../../example-components/DashboardMonitoring/DashboardMonitoring6';
export default function DashboardMonitoring() {
  return (
    <>
      <PageTitle
        titleHeading="Monitoring"
        titleDescription="This dashboard was built using the included components and blocks."
      />

      <DashboardMonitoring1 />
      <DashboardMonitoring2 />
      <DashboardMonitoring3 />
      <DashboardMonitoring4 />
      <DashboardMonitoring5 />
      <DashboardMonitoring6 />
    </>
  );
}
