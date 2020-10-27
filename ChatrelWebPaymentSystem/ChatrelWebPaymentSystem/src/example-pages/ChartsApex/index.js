import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';

import { ExampleWrapperSimple } from 'layout-components';
import Alert from '@material-ui/lab/Alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ChartsApex1 from '../../example-components/ChartsApex/ChartsApex1';
import ChartsApex2 from '../../example-components/ChartsApex/ChartsApex2';
import ChartsApex3 from '../../example-components/ChartsApex/ChartsApex3';
import ChartsApex4 from '../../example-components/ChartsApex/ChartsApex4';
import ChartsApex5 from '../../example-components/ChartsApex/ChartsApex5';
import ChartsApex6 from '../../example-components/ChartsApex/ChartsApex6';
import ChartsApex7 from '../../example-components/ChartsApex/ChartsApex7';
import ChartsApex8 from '../../example-components/ChartsApex/ChartsApex8';
export default function ChartsApex() {
  return (
    <>
      <PageTitle
        titleHeading="Apex Charts"
        titleDescription="Modern solution for building animated charts for React."
      />

      <Alert icon={false} className="alerts-alternate mb-5" severity="warning">
        <div className="d-flex align-items-center align-content-start">
          <span className="font-size-lg d-block d-40 btn-icon mr-3 text-center bg-danger text-white rounded-sm">
            <FontAwesomeIcon icon={['fas', 'exclamation']} />
          </span>
          <span>
            Check out the the <b>Data Blocks</b> and <b>Marketing</b> sections
            to see more examples with these components in action, integrated
            together with others.
          </span>
        </div>
      </Alert>

      <Grid container spacing={6}>
        <Grid item lg={6}>
          <ExampleWrapperSimple>
            <ChartsApex1 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ChartsApex3 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ChartsApex5 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ChartsApex7 />
          </ExampleWrapperSimple>
        </Grid>
        <Grid item lg={6}>
          <ExampleWrapperSimple>
            <ChartsApex2 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ChartsApex4 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ChartsApex6 />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple>
            <ChartsApex8 />
          </ExampleWrapperSimple>
        </Grid>
      </Grid>
    </>
  );
}
