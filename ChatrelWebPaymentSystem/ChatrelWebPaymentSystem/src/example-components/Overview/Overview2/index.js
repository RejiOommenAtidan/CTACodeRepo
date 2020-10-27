import React from 'react';

import { Grid, Container, Card } from '@material-ui/core';

import CheckIcon from '@material-ui/icons/Check';

export default function LivePreviewExample() {
  return (
    <>
      <div className="bg-light z-over" style={{ marginTop: '-70px' }}>
        <Container className="pb-5 text-center">
          <div>
            <div className="badge badge-success mb-4 h-auto py-2 px-4 font-size-xs badge-pill font-weight-normal">
              Overview
            </div>
            <h4 className="font-weight-bold text-second display-3">
              Highlights
            </h4>
            <Grid item md={8} lg={6} className="mx-auto">
              <p className="text-second opacity-6 mt-3 mb-5 font-size-xxl">
                You can build unlimited layout styles using any of the 500+
                included components and elements. Powerful, unique template
                built for React and Material-UI.
              </p>
            </Grid>
          </div>

          <div className="mb-spacing-6">
            <Grid container spacing={6}>
              <Grid item md={6} xl={4}>
                <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 d-block">
                  <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-success mx-auto">
                    <svg
                      className="blob-wrapper opacity-1"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(300,300)">
                        <path
                          d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    <div className="blob-icon-wrapper">
                      <CheckIcon />
                    </div>
                  </div>
                  <h5 className="font-weight-bold font-size-lg text-second mb-2">
                    Powered by Material-UI
                  </h5>
                  <p className="mb-4 text-black-50">
                    Bamburgh uses the Material-UI components framework for
                    React.
                  </p>
                </Card>
              </Grid>
              <Grid item md={6} xl={4}>
                <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 d-block">
                  <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-success mx-auto">
                    <svg
                      className="blob-wrapper opacity-1"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(300,300)">
                        <path
                          d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    <div className="blob-icon-wrapper">
                      <CheckIcon />
                    </div>
                  </div>
                  <h5 className="font-weight-bold font-size-lg text-second mb-2">
                    Modular Architecture
                  </h5>
                  <p className="mb-4 text-black-50">
                    Easy to customize and mold for all your dev requirements
                  </p>
                </Card>
              </Grid>
              <Grid item md={6} xl={4}>
                <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 d-block">
                  <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-success mx-auto">
                    <svg
                      className="blob-wrapper opacity-1"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(300,300)">
                        <path
                          d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    <div className="blob-icon-wrapper">
                      <CheckIcon />
                    </div>
                  </div>
                  <h5 className="font-weight-bold font-size-lg text-second mb-2">
                    Extensive Docs
                  </h5>
                  <p className="mb-4 text-black-50">
                    Check out the powerful online documentation section we've
                    set up
                  </p>
                </Card>
              </Grid>
              <Grid item md={6} xl={4}>
                <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 d-block">
                  <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-success mx-auto">
                    <svg
                      className="blob-wrapper opacity-1"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(300,300)">
                        <path
                          d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    <div className="blob-icon-wrapper">
                      <CheckIcon />
                    </div>
                  </div>
                  <h5 className="font-weight-bold font-size-lg text-second mb-2">
                    Consistent Design
                  </h5>
                  <p className="mb-4 text-black-50">
                    Build the same experience across all your apps and websites
                  </p>
                </Card>
              </Grid>
              <Grid item md={6} xl={4}>
                <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 d-block">
                  <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-success mx-auto">
                    <svg
                      className="blob-wrapper opacity-1"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(300,300)">
                        <path
                          d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    <div className="blob-icon-wrapper">
                      <CheckIcon />
                    </div>
                  </div>
                  <h5 className="font-weight-bold font-size-lg text-second mb-2">
                    Fully Responsive
                  </h5>
                  <p className="mb-4 text-black-50">
                    We've built this template to fit all viewports and screen
                    widths
                  </p>
                </Card>
              </Grid>
              <Grid item md={6} xl={4}>
                <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 d-block">
                  <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-success mx-auto">
                    <svg
                      className="blob-wrapper opacity-1"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(300,300)">
                        <path
                          d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    <div className="blob-icon-wrapper">
                      <CheckIcon />
                    </div>
                  </div>
                  <h5 className="font-weight-bold font-size-lg text-second mb-2">
                    Clean Code
                  </h5>
                  <p className="mb-4 text-black-50">
                    We've written plain and easy to follow code for all pages
                    and sections
                  </p>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
}
