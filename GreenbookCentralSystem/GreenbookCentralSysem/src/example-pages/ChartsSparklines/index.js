import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSeamless } from 'layout-components';
import { ExampleWrapperSimple } from 'layout-components';
import Alert from '@material-ui/lab/Alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ChartsSparklines1 from '../../example-components/ChartsSparklines/ChartsSparklines1';
import ChartsSparklines2 from '../../example-components/ChartsSparklines/ChartsSparklines2';
import ChartsSparklines3 from '../../example-components/ChartsSparklines/ChartsSparklines3';
import ChartsSparklines4 from '../../example-components/ChartsSparklines/ChartsSparklines4';
import ChartsSparklines5 from '../../example-components/ChartsSparklines/ChartsSparklines5';
import ChartsSparklines6 from '../../example-components/ChartsSparklines/ChartsSparklines6';
export default function ChartsSparklines() {
  return (
    <>
      <PageTitle
        titleHeading="Sparklines Charts"
        titleDescription="These components add tiny charts in various elements and components."
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
        <ChartsSparklines1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSimple>
        <ChartsSparklines2 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ChartsSparklines3 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ChartsSparklines4 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ChartsSparklines5 />
      </ExampleWrapperSimple>
      <ExampleWrapperSimple>
        <ChartsSparklines6 />
      </ExampleWrapperSimple>
    </>
  );
}
