import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';

import Alert from '@material-ui/lab/Alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ChartsGauges1 from '../../example-components/ChartsGauges/ChartsGauges1';
import ChartsGauges2 from '../../example-components/ChartsGauges/ChartsGauges2';
import ChartsGauges3 from '../../example-components/ChartsGauges/ChartsGauges3';
import ChartsGauges4 from '../../example-components/ChartsGauges/ChartsGauges4';
export default function ChartsGauges() {
  return (
    <>
      <PageTitle
        titleHeading="Gauges"
        titleDescription="Create wonderful animated gauges that can be used in combination with other UI elements."
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

      <ExampleWrapperSeamless>
        <ChartsGauges1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <ChartsGauges2 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <ChartsGauges3 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <ChartsGauges4 />
      </ExampleWrapperSeamless>
    </>
  );
}
