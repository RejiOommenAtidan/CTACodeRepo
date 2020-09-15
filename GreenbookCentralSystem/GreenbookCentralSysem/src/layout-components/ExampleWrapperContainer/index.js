import React from 'react';

const ExampleWrapperContainer = (props) => {
  const { sectionHeading, children } = props;

  return (
    <div className="example-card-container mb-5">
      <div className="container">
        {sectionHeading && (
          <h5 className="display-4 mb-4 font-weight-bold">{sectionHeading}</h5>
        )}
        {children}
      </div>
    </div>
  );
};

export default ExampleWrapperContainer;
