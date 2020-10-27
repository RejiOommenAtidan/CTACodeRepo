import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Card, CardContent, Button } from '@material-ui/core';

import people2 from '../../../assets/images/stock-photos/people-2.jpg';
import people3 from '../../../assets/images/stock-photos/people-3.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="rounded bg-premium-dark py-5 mb-spacing-6-x2">
        <Container className="pt-5">
          <Grid container spacing={6}>
            <Grid item xl={4}>
              <div className="text-center text-xl-right pt-0 pt-xl-4 pb-5 pb-xl-0">
                <h1 className="display-2 text-white mb-3 font-weight-bold">
                  Our customer stories
                </h1>
                <p className="font-size-xl mb-5 text-white-50">
                  Read how customers around the world use our services to build
                  their projects
                </p>
                <Button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="btn-first"
                  size="large">
                  Read the stories
                </Button>
              </div>
            </Grid>
            <Grid item xl={8}>
              <div className="pl-0 pl-xl-5">
                <Card className="mb-5">
                  <CardContent>
                    <div className="align-box-row align-items-start">
                      <div>
                        <Card className="card-transparent">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="card-img-wrapper rounded">
                            <img
                              src={people2}
                              className="card-img-top rounded-circle"
                              style={{ width: 80 }}
                              alt="..."
                            />
                          </a>
                        </Card>
                      </div>
                      <div className="pl-4">
                        <div className="mb-3 text-warning font-size-lg">
                          <FontAwesomeIcon icon={['fas', 'star']} />
                          <FontAwesomeIcon icon={['fas', 'star']} />
                          <FontAwesomeIcon icon={['fas', 'star']} />
                          <FontAwesomeIcon icon={['fas', 'star']} />
                          <FontAwesomeIcon icon={['fas', 'star']} />
                        </div>
                        <blockquote className="my-3 text-black-50">
                          But who has any right to find fault with a man who
                          chooses to enjoy a pleasure that has.
                        </blockquote>
                        <div className="font-size-lg font-weight-bold">
                          Alexandros Hebert,
                          <small className="text-black-50 pl-2">
                            Bailey Company
                          </small>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="mb-5">
                  <CardContent>
                    <div className="align-box-row align-items-start">
                      <div>
                        <Card className="card-transparent">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="card-img-wrapper rounded">
                            <img
                              src={people3}
                              className="card-img-top rounded-circle"
                              style={{ width: 80 }}
                              alt="..."
                            />
                          </a>
                        </Card>
                      </div>
                      <div className="pl-4">
                        <div className="mb-3 text-warning font-size-lg">
                          <FontAwesomeIcon icon={['fas', 'star']} />
                          <FontAwesomeIcon icon={['fas', 'star']} />
                          <FontAwesomeIcon icon={['fas', 'star']} />
                          <FontAwesomeIcon icon={['fas', 'star']} />
                          <FontAwesomeIcon icon={['fas', 'star-half-alt']} />
                        </div>
                        <blockquote className="my-3 text-black-50">
                          Nor again is there anyone who loves or pursues or
                          desires to obtain pain of itself.
                        </blockquote>
                        <div className="font-size-lg font-weight-bold">
                          Jimi Tomlinson,
                          <small className="text-black-50 pl-2">
                            Wood Company
                          </small>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
