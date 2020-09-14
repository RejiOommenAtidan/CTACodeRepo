import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import product1 from '../../../assets/images/stock-products/product-4.png';
import product2 from '../../../assets/images/stock-products/product-5.png';
import product3 from '../../../assets/images/stock-products/product-6.png';

export default function LivePreviewExample() {
  return (
    <>
      <div className="mb-spacing-6">
        <Grid container spacing={6}>
          <Grid item lg={4}>
            <Card className="d-flex flex-column card-box text-center">
              <div className="card-tr-actions">
                <Button className="btn-link p-0 font-size-xl" variant="text">
                  <FontAwesomeIcon
                    icon={['far', 'heart']}
                    className="font-size-lg text-danger"
                  />
                </Button>
              </div>
              <Card className="card-transparent mx-auto hover-scale-sm mt-3">
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="card-img-wrapper card-box-hover rounded">
                  <img
                    alt="..."
                    className="card-img-top rounded-sm"
                    src={product1}
                    style={{ width: 100 }}
                  />
                </a>
              </Card>
              <div className="card-header-alt d-flex flex-column justify-content-center p-3">
                <h6 className="font-weight-bold font-size-lg mb-2 text-black">
                  Apple MacBook PRO
                </h6>
                <p className="text-black-50 font-size-sm mb-0">
                  You can build unlimited layout styles using any of the 500+
                  included components and elements. Powerful, unique template
                  built for React and Material-UI.
                </p>
              </div>

              <div className="pb-3">
                <div className="badge badge-neutral-primary text-primary badge-pill font-weight-normal font-size-sm font-weight-bold h-auto py-2 px-3">
                  $1,287
                </div>
              </div>

              <div className="divider w-50 mx-auto" />

              <div className="py-2 d-flex align-items-center justify-content-center">
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="m-2 d-20 rounded-circle btn-swatch bg-danger">
                  &nbsp;
                </a>
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="m-2 d-20 rounded-circle btn-swatch bg-first">
                  &nbsp;
                </a>
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="m-2 d-20 rounded-circle btn-swatch bg-warning">
                  &nbsp;
                </a>
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="m-2 d-20 rounded-circle btn-swatch bg-deep-blue">
                  &nbsp;
                </a>
              </div>

              <div className="divider w-50 mx-auto" />

              <div className="py-3">
                <Button className="btn-success text-uppercase font-weight-bold font-size-xs">
                  Buy Now
                </Button>
              </div>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card className="d-flex flex-column card-box text-center">
              <div className="card-tr-actions">
                <Button className="btn-link p-0 font-size-xl" variant="text">
                  <FontAwesomeIcon
                    icon={['far', 'heart']}
                    className="font-size-lg text-danger"
                  />
                </Button>
              </div>
              <Card className="card-transparent mx-auto hover-scale-sm mt-3">
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="card-img-wrapper card-box-hover rounded">
                  <img
                    alt="..."
                    className="card-img-top rounded-sm"
                    src={product2}
                    style={{ width: 100 }}
                  />
                </a>
              </Card>
              <div className="card-header-alt d-flex flex-column justify-content-center p-3">
                <h6 className="font-weight-bold font-size-lg mb-2 text-black">
                  Headphones Pro 3
                </h6>
                <p className="text-black-50 font-size-sm mb-0">
                  You can build unlimited layout styles using any of the 500+
                  included components and elements. Powerful, unique template
                  built for React and Material-UI.
                </p>
              </div>

              <div className="pb-3">
                <div className="badge badge-neutral-primary text-primary badge-pill font-weight-normal font-size-sm font-weight-bold h-auto py-2 px-3">
                  $149
                </div>
              </div>

              <div className="divider w-50 mx-auto" />

              <div className="py-2 d-flex align-items-center justify-content-center">
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="m-2 d-20 rounded-circle btn-swatch bg-danger">
                  &nbsp;
                </a>
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="m-2 d-20 rounded-circle btn-swatch bg-first">
                  &nbsp;
                </a>
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="m-2 d-20 rounded-circle btn-swatch bg-warning">
                  &nbsp;
                </a>
              </div>

              <div className="divider w-50 mx-auto" />

              <div className="py-3">
                <Button className="btn-success text-uppercase font-weight-bold font-size-xs">
                  Buy Now
                </Button>
              </div>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card className="d-flex flex-column card-box text-center">
              <div className="card-tr-actions">
                <Button className="btn-link p-0 font-size-xl" variant="text">
                  <FontAwesomeIcon
                    icon={['far', 'heart']}
                    className="font-size-lg text-danger"
                  />
                </Button>
              </div>
              <Card className="card-transparent mx-auto hover-scale-sm mt-3">
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="card-img-wrapper card-box-hover rounded">
                  <img
                    alt="..."
                    className="card-img-top rounded-sm"
                    src={product3}
                    style={{ width: 100 }}
                  />
                </a>
              </Card>
              <div className="card-header-alt d-flex flex-column justify-content-center p-3">
                <h6 className="font-weight-bold font-size-lg mb-2 text-black">
                  Apple iWatch IV
                </h6>
                <p className="text-black-50 font-size-sm mb-0">
                  You can build unlimited layout styles using any of the 500+
                  included components and elements. Powerful, unique template
                  built for React and Material-UI.
                </p>
              </div>

              <div className="pb-3">
                <div className="badge badge-neutral-primary text-primary badge-pill font-weight-normal font-size-sm font-weight-bold h-auto py-2 px-3">
                  $329
                </div>
              </div>

              <div className="divider w-50 mx-auto" />

              <div className="py-2 d-flex align-items-center justify-content-center">
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="m-2 d-20 rounded-circle btn-swatch bg-danger">
                  &nbsp;
                </a>
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="m-2 d-20 rounded-circle btn-swatch bg-warning">
                  &nbsp;
                </a>
                <a
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="m-2 d-20 rounded-circle btn-swatch bg-deep-blue">
                  &nbsp;
                </a>
              </div>

              <div className="divider w-50 mx-auto" />

              <div className="py-3">
                <Button className="btn-success text-uppercase font-weight-bold font-size-xs">
                  Buy Now
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
