import React from 'react';

import { PageTitle } from 'layout-components';

import DashboardStatistics1 from '../../example-components/DashboardStatistics/DashboardStatistics1';
import DashboardStatistics2 from '../../example-components/DashboardStatistics/DashboardStatistics2';
import DashboardStatistics3 from '../../example-components/DashboardStatistics/DashboardStatistics3';
import DashboardStatistics4 from '../../example-components/DashboardStatistics/DashboardStatistics4';
import DashboardStatistics5 from '../../example-components/DashboardStatistics/DashboardStatistics5';
import DashboardStatistics6 from '../../example-components/DashboardStatistics/DashboardStatistics6';
export default function DashboardStatistics() {
  return (
    <>
      <PageTitle
        titleHeading="Statistics"
        titleDescription="Another example for building a generic dashboard fast, beautiful and easy."
      />

      <DashboardStatistics1 />
      <DashboardStatistics2 />
      <DashboardStatistics3 />
      <DashboardStatistics4 />
      <DashboardStatistics5 />
      <DashboardStatistics6 />
    </>
  );
}
