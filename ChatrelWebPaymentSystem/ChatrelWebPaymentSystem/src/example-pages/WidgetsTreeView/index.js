import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';

import { ExampleWrapperSimple } from 'layout-components';

import WidgetsTreeView1 from '../../example-components/WidgetsTreeView/TreeView1';
import WidgetsTreeView2 from '../../example-components/WidgetsTreeView/TreeView2';
import WidgetsTreeView3 from '../../example-components/WidgetsTreeView/TreeView3';
export default function WidgetsTreeView() {
  return (
    <>
      <PageTitle
        titleHeading="Tree View"
        titleDescription="Create stunning tree like views with this awesome React plugin."
      />

      <Grid container spacing={6}>
        <Grid item xl={4}>
          <ExampleWrapperSimple>
            <WidgetsTreeView1 />
          </ExampleWrapperSimple>
        </Grid>
        <Grid item xl={4}>
          <ExampleWrapperSimple>
            <WidgetsTreeView2 />
          </ExampleWrapperSimple>
        </Grid>
        <Grid item xl={4}>
          <ExampleWrapperSimple>
            <WidgetsTreeView3 />
          </ExampleWrapperSimple>
        </Grid>
      </Grid>
    </>
  );
}
