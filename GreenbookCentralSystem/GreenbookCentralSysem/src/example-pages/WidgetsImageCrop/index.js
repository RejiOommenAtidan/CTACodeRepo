import React from 'react';

import { PageTitle } from 'layout-components';

import { ExampleWrapperSimple } from 'layout-components';

import WidgetsImageCrop1 from '../../example-components/WidgetsImageCrop/ImageCrop1';
export default function WidgetsImageCrop() {
  return (
    <>
      <PageTitle
        titleHeading="Image Crop"
        titleDescription="You can easily crop and edit images with this React component."
      />

      <ExampleWrapperSimple>
        <WidgetsImageCrop1 />
      </ExampleWrapperSimple>
    </>
  );
}
