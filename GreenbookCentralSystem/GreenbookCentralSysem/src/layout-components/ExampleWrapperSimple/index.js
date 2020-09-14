import React from 'react';

import { Card, CardContent } from '@material-ui/core';

const ExampleWrapperSimple = (props) => {
  const { sectionHeading, children } = props;

  return (
    <Card className="card-box overflow-visible mb-spacing-6-x2">
      {sectionHeading && (
        <div className="card-header">
          <div className="card-header--title font-size-md font-weight-bold py-2">
            {sectionHeading}
          </div>
        </div>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ExampleWrapperSimple;
