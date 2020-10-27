import React from 'react';

import {
  AlphaPicker,
  BlockPicker,
  ChromePicker,
  CirclePicker,
  CompactPicker,
  GithubPicker,
  HuePicker,
  PhotoshopPicker,
  SketchPicker,
  SliderPicker,
  SwatchesPicker,
  TwitterPicker
} from 'react-color';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        <div className="d-flex justify-content-center align-items-center p-5">
          <div>
            <AlphaPicker />
            <p className="text-center pt-3 mb-0 text-black-50">
              Alpha colorpicker
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center p-5">
          <div>
            <BlockPicker />
            <p className="text-center pt-3 mb-0 text-black-50">
              Block colorpicker
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center p-5">
          <div>
            <ChromePicker />
            <p className="text-center pt-3 mb-0 text-black-50">
              Chrome colorpicker
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center p-5">
          <div>
            <CirclePicker />
            <p className="text-center pt-3 mb-0 text-black-50">
              Circle colorpicker
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center p-5">
          <div>
            <CompactPicker />
            <p className="text-center pt-3 mb-0 text-black-50">
              Compact colorpicker
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center p-5">
          <div>
            <GithubPicker />
            <p className="text-center pt-3 mb-0 text-black-50">
              Github colorpicker
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center p-5">
          <div>
            <HuePicker />
            <p className="text-center pt-3 mb-0 text-black-50">
              Hue colorpicker
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center p-5">
          <div>
            <PhotoshopPicker />
            <p className="text-center pt-3 mb-0 text-black-50">
              Photoshop colorpicker
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center p-5">
          <div>
            <SketchPicker />
            <p className="text-center pt-3 mb-0 text-black-50">
              Sketch colorpicker
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center p-5">
          <div>
            <SliderPicker />
            <p className="text-center pt-3 mb-0 text-black-50">
              Slider colorpicker
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center p-5">
          <div>
            <SwatchesPicker />
            <p className="text-center pt-3 mb-0 text-black-50">
              Swatches colorpicker
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center p-5">
          <div>
            <TwitterPicker />
            <p className="text-center pt-3 mb-0 text-black-50">
              Twitter colorpicker
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
