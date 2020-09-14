import React from 'react';

import {
  Grid,
  Container,
  Card,
  CardContent,
  Button,
  List,
  ListItem
} from '@material-ui/core';

import svgImage1 from '../../../assets/images/illustrations/pack4/business_plan.svg';
import svgImage13 from '../../../assets/images/illustrations/pack4/businesswoman.svg';
import svgImage14 from '../../../assets/images/illustrations/pack4/powerful.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="bg-royal py-3 py-xl-5">
        <Container className="py-3 py-xl-5">
          <Card className="modal-content">
            <div className="card-header bg-light d-flex justify-content-center">
              <div className="text-center my-4">
                <h1 className="display-4 text-black mb-2 font-weight-bold">
                  Plans & pricing
                </h1>
                <p className="font-size-lg mb-1 text-black-50">
                  Indignation and dislike men who are so beguiled and
                  demoralized.
                </p>
              </div>
            </div>
            <CardContent className="p-3">
              <List
                component="div"
                className="nav-line mb-4 nav-tabs-primary d-flex align-items-center justify-content-center">
                <ListItem button disableRipple selected>
                  <span>Monthly plans</span>
                  <div className="divider" />
                </ListItem>
                <ListItem button disableRipple>
                  <span>Yearly payments</span>
                  <div className="divider" />
                </ListItem>
              </List>
              <div className="container-fluid">
                <Grid container spacing={6}>
                  <Grid item xl={4}>
                    <div className="divider-v divider-v-lg" />
                    <div className="py-3">
                      <div className="feature-box text-center mt-2 mb-5">
                        <img
                          src={svgImage1}
                          className="w-50 mx-auto d-block img-fluid"
                          alt="..."
                        />
                        <h3 className="font-size-xxl font-weight-bold mt-4">
                          Standard
                        </h3>
                        <p className="text-black-50 mb-4">
                          But I must explain to you how all this mistaken.
                        </p>
                        <Button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          variant="text"
                          className="btn-outline-first"
                          title="Learn more">
                          <span>Purchase now</span>
                        </Button>
                      </div>
                      <div className="divider my-4" />
                      <ul className="list-unstyled text-left font-weight-bold font-size-sm">
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
                    </div>
                  </Grid>
                  <Grid item xl={4}>
                    <div className="divider-v divider-v-lg" />
                    <div className="py-3">
                      <div className="feature-box text-center mt-2 mb-5">
                        <img
                          src={svgImage13}
                          className="w-50 mx-auto d-block img-fluid"
                          alt="..."
                        />
                        <h3 className="font-size-xxl font-weight-bold mt-4">
                          Business
                        </h3>
                        <p className="text-black-50 mb-4">
                          But I must explain to you how all this mistaken.
                        </p>
                        <Button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="btn-first"
                          title="Learn more">
                          <span>Purchase now</span>
                        </Button>
                      </div>
                      <div className="divider my-4" />
                      <ul className="list-unstyled text-left font-weight-bold font-size-sm">
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
                    </div>
                  </Grid>
                  <Grid item xl={4}>
                    <div className="py-3">
                      <div className="feature-box text-center mt-2 mb-5">
                        <img
                          src={svgImage14}
                          className="w-50 mx-auto d-block img-fluid"
                          alt="..."
                        />
                        <h3 className="font-size-xxl font-weight-bold mt-4">
                          Enterprise
                        </h3>
                        <p className="text-black-50 mb-4">
                          But I must explain to you how all this mistaken.
                        </p>
                        <Button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          variant="text"
                          className="btn-outline-first"
                          title="Learn more">
                          <span>Purchase now</span>
                        </Button>
                      </div>
                      <div className="divider my-4" />
                      <ul className="list-unstyled text-left font-weight-bold font-size-sm">
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
                    </div>
                  </Grid>
                </Grid>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    </>
  );
}
