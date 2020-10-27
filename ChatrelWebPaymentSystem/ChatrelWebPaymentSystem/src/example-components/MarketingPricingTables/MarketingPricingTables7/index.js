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
      <div className="bg-deep-sky py-5 my-5 rounded">
        <Container className="py-3 py-xl-5">
          <div className="d-block d-xl-flex mb-5 justify-content-between">
            <div>
              <h1 className="display-3 text-white mb-2 font-weight-bold">
                Plans & pricing
              </h1>
              <p className="font-size-lg text-white-50">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>
            </div>
            <div className="d-flex align-items-center">
              <ButtonGroup className="mt-4" size="large" variant="text">
                <Button className="btn-outline-secondary rounded-left active btn-transition-none shadow-none">
                  Monthly
                </Button>
                <Button className="btn-outline-secondary rounded-right btn-transition-none shadow-none">
                  Yearly
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div className="divider bg-white-10 mb-5" />
          <Grid container spacing={0} className="d-flex align-items-center">
            <Grid item xl={4}>
              <Card className="mb-5 br-xl-right-0 card-box-hover">
                <CardContent className="p-4 text-center">
                  <h3 className="font-size-xxl my-3 text-second">Standard</h3>
                  <span className="display-3 text-first">
                    <small className="font-size-lg">$</small>
                    69
                  </span>
                  <p className="text-black-50 mb-0">single user, monthly fee</p>
                  <div className="divider opacity-4 my-4" />
                  <ul className="list-unstyled text-center font-weight-bold mb-3">
                    <li className="py-2">Unlimited Tasks</li>
                    <li className="py-2">Unlimited Teams</li>
                    <li className="py-2">All Integrations</li>
                    <li className="px-4 py-2 text-black-50">Premium support</li>
                  </ul>
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    variant="text"
                    className="btn-outline-first font-weight-bold font-size-sm text-uppercase my-3">
                    Buy now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xl={4}>
              <Card className="card-box shadow-sm z-over border-3 border-white mb-5">
                <CardContent className="px-5 pb-5 pt-4 text-center">
                  <h3 className="display-3 my-3 font-weight-bold text-black">
                    Business
                  </h3>
                  <span className="display-3 text-first">
                    <small className="font-size-lg">$</small>
                    139
                  </span>
                  <p className="text-black-50 mb-0">
                    monthly fee, for a single user
                  </p>
                  <div className="divider opacity-4 my-4" />

                  <ul className="list-unstyled text-center font-weight-bold mb-3">
                    <li className="py-2">Unlimited Tasks</li>
                    <li className="py-2">Unlimited Teams</li>
                    <li className="py-2">All Integrations</li>
                    <li className="px-4 py-2 text-black-50">Premium support</li>
                  </ul>
                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    size="large"
                    className="btn-first font-weight-bold font-size-sm text-uppercase my-3">
                    Buy now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xl={4}>
              <Card className="mb-5 br-xl-left-0">
                <CardContent className="p-4 text-center">
                  <h3 className="font-size-xxl my-3 text-second">Enterprise</h3>
                  <span className="display-3 text-first">
                    <small className="font-size-lg">$</small>
                    99
                  </span>
                  <p className="text-black-50 mb-0">single user, monthly fee</p>
                  <div className="divider opacity-4 my-4" />
                  <ul className="list-unstyled text-center font-weight-bold mb-3">
                    <li className="py-2">Unlimited Tasks</li>
                    <li className="py-2">Unlimited Teams</li>
                    <li className="py-2">All Integrations</li>
                    <li className="px-4 py-2 text-black-50">Premium support</li>
                  </ul>

                  <Button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    variant="text"
                    className="btn-outline-first font-weight-bold font-size-sm text-uppercase my-3">
                    Buy now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
