import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Card, CardContent, Button } from '@material-ui/core';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';

import hero5 from '../../../assets/images/hero-bg/hero-5.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-night-sky pt-5 mb-spacing-6-x2">
        <div className="flex-grow-1 w-100 d-flex align-items-center">
          <div
            className="bg-composed-wrapper--image opacity-3"
            style={{ backgroundImage: 'url(' + hero5 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-first opacity-1" />
          <div className="bg-composed-wrapper--content py-5">
            <Container className="pt-5">
              <Grid container spacing={6}>
                <Grid item xl={8}>
                  <div className="pr-0 pr-xl-5">
                    <Card className="mb-5">
                      <CardContent>
                        <div className="pl-4">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="text-warning font-size-lg">
                              <FontAwesomeIcon icon={['fas', 'star']} />
                              <FontAwesomeIcon icon={['fas', 'star']} />
                              <FontAwesomeIcon icon={['fas', 'star']} />
                              <FontAwesomeIcon icon={['fas', 'star']} />
                              <FontAwesomeIcon icon={['fas', 'star']} />
                            </div>
                            <div>
                              <FontAwesomeIcon
                                icon={['fas', 'quote-right']}
                                className="text-dark font-size-xxl"
                              />
                            </div>
                          </div>
                          <blockquote className="mb-3 mt-2 font-size-lg text-black-50">
                            But I must explain to you how all this mistaken idea
                            was born and I will give you a complete account of
                            the system, and expound the actual teachings of the
                            great explorer of the truth.
                          </blockquote>
                          <div className="align-box-row">
                            <div className="avatar-icon-wrapper avatar-icon-lg">
                              <div className="avatar-icon rounded-circle">
                                <img src={avatar1} alt="..." />
                              </div>
                            </div>
                            <div className="pl-2">
                              <span className="d-block font-size-lg">
                                Mandy Erle
                                <small className="d-block text-black-50">
                                  Mandy Company
                                </small>
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="mb-5">
                      <CardContent>
                        <div className="align-box-row align-items-start">
                          <div className="pl-4">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="text-warning font-size-lg">
                                <FontAwesomeIcon icon={['fas', 'star']} />
                                <FontAwesomeIcon icon={['fas', 'star']} />
                                <FontAwesomeIcon icon={['fas', 'star']} />
                                <FontAwesomeIcon icon={['fas', 'star']} />
                                <FontAwesomeIcon
                                  icon={['fas', 'star-half-alt']}
                                />
                              </div>
                              <div>
                                <FontAwesomeIcon
                                  icon={['fas', 'quote-right']}
                                  className="text-dark font-size-xxl"
                                />
                              </div>
                            </div>
                            <blockquote className="mb-3 mt-2 font-size-lg text-black-50">
                              To take a trivial example, which of us ever
                              undertakes laborious physical exercise, except to
                              obtain some advantage from it? But who has any
                              right to find fault with a man.
                            </blockquote>
                            <div className="align-box-row">
                              <div className="avatar-icon-wrapper avatar-icon-lg">
                                <div className="avatar-icon rounded-circle">
                                  <img src={avatar5} alt="..." />
                                </div>
                              </div>
                              <div className="pl-2">
                                <span className="d-block font-size-lg">
                                  Napoleon Stacey
                                  <small className="d-block text-black-50">
                                    ACME Inc.
                                  </small>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </Grid>
                <Grid item xl={4} className="d-flex align-items-center">
                  <div className="text-center text-xl-left pt-0 pt-xl-4 pb-5 pb-xl-0">
                    <h1 className="display-2 text-white mb-3 font-weight-bold">
                      Our customer stories
                    </h1>
                    <p className="font-size-lg mb-5 text-white-50">
                      Read how customers around the world use our services to
                      build their projects
                    </p>
                    <Button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="btn-success font-weight-bold"
                      size="large">
                      Read all stories
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
