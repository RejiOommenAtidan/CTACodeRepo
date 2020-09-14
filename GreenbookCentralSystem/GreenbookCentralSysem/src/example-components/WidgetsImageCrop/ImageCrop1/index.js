import React, { Component } from 'react';

import { Grid, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import Cropper from 'react-cropper';

import stock3 from '../../../assets/images/stock-photos/stock-3.jpg';

const src = stock3;

export default class LivePreviewExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src,
      cropResult: null
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.useDefaultImage = this.useDefaultImage.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL()
    });
  }

  useDefaultImage() {
    this.setState({ src });
  }

  render() {
    return (
      <>
        <div className="d-flex align-items-center flex-column justify-content-center">
          <div className="pb-4">
            <input
              accept="image/*"
              onChange={this.onChange}
              className="d-none"
              id="upload-image-for-cropping"
              multiple
              type="file"
            />
            <label
              className="d-block text-center"
              htmlFor="upload-image-for-cropping">
              <Button
                className="btn-primary font-weight-bold"
                size="large"
                component="span">
                Upload
              </Button>
            </label>

            <div className="divider w-100 my-4" />

            <Button
              size="large"
              className="btn-outline-primary m-2"
              onClick={this.useDefaultImage}>
              Use Default Image
            </Button>
            <Button
              size="large"
              className="btn-outline-danger m-2"
              onClick={this.cropImage}>
              Crop Image
            </Button>
          </div>
          <Cropper
            style={{ height: 400, width: '100%' }}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref={(cropper) => {
              this.cropper = cropper;
            }}
          />
        </div>
        <div className="divider my-4" />
        <Grid
          container
          spacing={6}
          className="align-items-center justify-content-center">
          <Grid item md={6}>
            <div className="font-weight-bold text-center font-size-xl mb-4">
              Cropping Result
            </div>
            {!this.state.cropResult && (
              <Alert
                className="alerts-alternate font-size-lg text-warning p-4 m-4"
                severity="warning">
                Click the crop button!
              </Alert>
            )}
            {this.state.cropResult && (
              <div
                className="shadow-xxl m-4 rounded-lg overflow-hidden w-100 img-preview d-flex justify-content-center"
                style={{ height: 340 }}>
                <img
                  className="rounded-lg img-fit-container"
                  src={this.state.cropResult}
                  alt="..."
                />
              </div>
            )}
          </Grid>
          <Grid item md={6}>
            <div className="font-weight-bold text-center font-size-xl mb-4">
              Preview
            </div>
            <div
              className="shadow-xxl m-4 rounded-lg overflow-hidden w-100 d-flex justify-content-center"
              style={{ height: 340 }}>
              <div className="rounded-lg img-fit-container img-preview" />
            </div>
          </Grid>
        </Grid>
      </>
    );
  }
}
