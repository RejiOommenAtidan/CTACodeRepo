import React from 'react';

import {
  Grid,
  Container,
  ButtonGroup,
  Card,
  CardContent,
  Button
} from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <div className="bg-light">
        <Container className="py-3 py-xl-5">
          <div className="d-block d-xl-flex mb-5 justify-content-between">
            <div>
              <h1 className="display-3 text-dark mb-2 font-weight-bold">
                Plans & pricing
              </h1>
              <p className="font-size-lg text-black">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>
            </div>
            <div className="d-flex align-items-center">
              <ButtonGroup className="mt-4" size="large" variant="text">
                <Button className="btn-outline-second rounded-left active btn-transition-none">
                  Monthly
                </Button>
                <Button className="btn-outline-second rounded-right btn-transition-none">
                  Yearly
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div className="divider" />
          <Grid container spacing={6} className="d-flex align-items-center">
            <Grid item xl={4}>
              <Card className="mb-5 card-box-hover-rise card-box-hover">
                <CardContent className="px-4 pb-4 pt-3 text-center">
                  <h3 className="display-4 my-3 font-weight-bold text-dark">
                    Standard
                  </h3>
                  <span className="display-2 font-weight-bold">
                    <small className="font-size-lg">$</small>
                    69
                  </span>
                  <p className="text-black-50 mb-0">
                    monthly fee, for a single user
                  </p>
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    fullWidth
                    size="large"
                    variant="text"
                    className="btn-outline-success font-weight-bold text-uppercase my-4">
                    Buy now
                  </Button>
                  <ul className="list-unstyled text-left mb-3 font-weight-bold font-size-sm">
                    <li className="px-4 py-2">
                      <div className="badge badge-success badge-circle-inner mr-2">
                        Success
                      </div>
                      Unlimited Tasks
                    </li>
                    <li className="px-4 py-2">
                      <div className="badge badge-success badge-circle-inner mr-2">
                        Success
                      </div>
                      Unlimited Teams
                    </li>
                    <li className="px-4 py-2">
                      <div className="badge badge-success badge-circle-inner mr-2">
                        Success
                      </div>
                      All Integrations
                    </li>
                    <li className="px-4 py-2 text-black-50">
                      <div className="badge badge-danger badge-circle-inner mr-2">
                        Danger
                      </div>
                      Premium support
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xl={4}>
              <Card className="card-box shadow-xxl border-3 border-success mb-5">
                <CardContent className="px-5 pb-5 pt-4 text-center">
                  <h3 className="display-3 my-3 font-weight-bold text-black">
                    Business
                  </h3>
                  <span className="display-2 font-weight-bold">
                    <small className="font-size-lg">$</small>
                    139
                  </span>
                  <p className="text-black-50 mb-0">
                    monthly fee, for a single user
                  </p>
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    size="large"
                    fullWidth
                    className="btn-success font-weight-bold text-uppercase my-4">
                    Buy now
                  </Button>
                  <ul className="list-unstyled text-left mb-3 font-weight-bold font-size-sm">
                    <li className="px-4 py-2">
                      <div className="badge badge-success badge-circle-inner mr-2">
                        Success
                      </div>
                      Unlimited Tasks
                    </li>
                    <li className="px-4 py-2">
                      <div className="badge badge-success badge-circle-inner mr-2">
                        Success
                      </div>
                      Unlimited Teams
                    </li>
                    <li className="px-4 py-2">
                      <div className="badge badge-success badge-circle-inner mr-2">
                        Success
                      </div>
                      All Integrations
                    </li>
                    <li className="px-4 py-2 text-black-50">
                      <div className="badge badge-danger badge-circle-inner mr-2">
                        Danger
                      </div>
                      Premium support
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xl={4}>
              <Card className="mb-5 card-box-hover-rise card-box-hover">
                <CardContent className="px-4 pb-4 pt-3 text-center">
                  <h3 className="display-4 my-3 font-weight-bold text-dark">
                    Enterprise
                  </h3>
                  <span className="display-2 font-weight-bold">
                    <small className="font-size-lg">$</small>
                    99
                  </span>
                  <p className="text-black-50 mb-0">
                    monthly fee, for a single user
                  </p>
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    fullWidth
                    size="large"
                    variant="text"
                    className="btn-outline-success font-weight-bold text-uppercase my-4">
                    Buy now
                  </Button>
                  <ul className="list-unstyled text-left mb-3 font-weight-bold font-size-sm">
                    <li className="px-4 py-2">
                      <div className="badge badge-success badge-circle-inner mr-2">
                        Success
                      </div>
                      Unlimited Tasks
                    </li>
                    <li className="px-4 py-2">
                      <div className="badge badge-success badge-circle-inner mr-2">
                        Success
                      </div>
                      Unlimited Teams
                    </li>
                    <li className="px-4 py-2">
                      <div className="badge badge-success badge-circle-inner mr-2">
                        Success
                      </div>
                      All Integrations
                    </li>
                    <li className="px-4 py-2 text-black-50">
                      <div className="badge badge-danger badge-circle-inner mr-2">
                        Danger
                      </div>
                      Premium support
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
