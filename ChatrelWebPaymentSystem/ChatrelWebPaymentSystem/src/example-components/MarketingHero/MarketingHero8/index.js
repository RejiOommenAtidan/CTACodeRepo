import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Card, Button } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import hero8 from '../../../assets/images/hero-bg/hero-8.jpg';

import product1 from '../../../assets/images/stock-products/product-1.png';
import product2 from '../../../assets/images/stock-products/product-2.png';
import product3 from '../../../assets/images/stock-products/product-3.png';
import product4 from '../../../assets/images/stock-products/product-4.png';
import product5 from '../../../assets/images/stock-products/product-5.png';
import product6 from '../../../assets/images/stock-products/product-6.png';

import MarketingHeaders3 from '../../MarketingHeaders/MarketingHeaders3';

export default function LivePreviewExample() {
  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-night-sky">
        <div className="header-top-section pb-2">
          <MarketingHeaders3 />
        </div>
        <div className="hero-wrapper--content">
          <div
            className="bg-composed-wrapper--image bg-composed-filter-rm"
            style={{ backgroundImage: 'url(' + hero8 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-second opacity-5" />
          <div className="bg-composed-wrapper--content">
            <Container className="text-white pt-0 pt-lg-5 z-over">
              <Grid container spacing={6} className="py-5">
                <Grid item lg={6} xl={7}>
                  <div className="pt-0 pt-xl-3 pr-0 pr-xl-5">
                    <h2 className="display-3 font-weight-bold">
                      Bamburgh React Admin Dashboard with Material-UI PRO
                    </h2>
                    <p className="font-size-xl py-3 text-white-50">
                      Premium admin template powered by the most popular UI
                      components framework available for React: Material-UI.
                      Features hundreds of examples making web development fast
                      and easy. Start from one of the individual apps included
                      or from the general dashboard and build beautiful scalable
                      applications and presentation websites.
                    </p>
                    <div className="pt-3">
                      <Button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        size="large"
                        className="btn-pill shadow-second-sm btn-first">
                        <span className="btn-wrapper--label">
                          Browse gallery
                        </span>
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                        </span>
                      </Button>
                      <Button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        size="large"
                        className="bg-white-10 text-white btn-pill ml-3">
                        <span>Documentation</span>
                      </Button>
                    </div>
                  </div>
                </Grid>
                <Grid item lg={6} xl={5} className="d-flex align-items-center">
                  <Card className="card-box w-100 mb-5 mt-5 mt-xl-0">
                    <div className="card-tr-actions">
                      <Button
                        variant="text"
                        className="p-0 d-30 border-0 btn-transition-none text-second"
                        disableRipple>
                        <FontAwesomeIcon
                          icon={['fas', 'ellipsis-h']}
                          className="font-size-lg"
                        />
                      </Button>
                    </div>
                    <div className="card-header-alt d-flex justify-content-center px-4 pt-4">
                      <div className="text-center">
                        <h6 className="font-weight-bold font-size-lg mb-1 text-black">
                          Shopping Cart
                        </h6>
                        <p className="text-black-50 mb-0">
                          Checkout is almost done!
                        </p>
                      </div>
                    </div>
                    <div className="divider mt-4" />
                    <div className="scroll-area shadow-overflow">
                      <PerfectScrollbar options={{ wheelPropagation: false }}>
                        <div className="d-flex p-4 align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div>
                              <Card className="card-transparent mb-3 mb-sm-0">
                                <a
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}
                                  className="card-img-wrapper card-box-hover rounded">
                                  <img
                                    alt="..."
                                    className="card-img-top rounded-sm"
                                    src={product1}
                                    style={{ width: 110 }}
                                  />
                                </a>
                              </Card>
                            </div>
                            <div className="pl-3">
                              <b className="font-weight-bold font-size-lg text-black">
                                Apple TV Gen 5
                              </b>
                              <div className="d-flex pt-1 align-items-center">
                                <div className="badge badge-neutral-first text-first font-weight-normal font-size-sm h-auto py-1 px-2">
                                  $299
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Button className="btn-primary p-0 btn-icon btn-animated-icon-sm hover-scale-sm mr-2 d-30">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon
                                  icon={['fas', 'plus']}
                                  className="font-size-xs"
                                />
                              </span>
                            </Button>
                            <Button className="btn-neutral-danger p-0 btn-icon btn-animated-icon-sm hover-scale-sm d-30">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon
                                  icon={['fas', 'times']}
                                  className="font-size-xs"
                                />
                              </span>
                            </Button>
                          </div>
                        </div>
                        <div className="divider opacity-7" />
                        <div className="d-flex p-4 align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div>
                              <Card className="card-transparent mb-3 mb-sm-0">
                                <a
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}
                                  className="card-img-wrapper card-box-hover rounded">
                                  <img
                                    alt="..."
                                    className="card-img-top rounded-sm"
                                    src={product2}
                                    style={{ width: 110 }}
                                  />
                                </a>
                              </Card>
                            </div>
                            <div className="pl-3">
                              <b className="font-weight-bold font-size-lg text-black">
                                iPhone 11 Pro Max
                              </b>
                              <div className="d-flex pt-1 align-items-center">
                                <div className="badge badge-neutral-first text-first font-weight-normal font-size-sm h-auto py-1 px-2">
                                  <b>$1,999</b>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Button className="btn-primary p-0 btn-icon btn-animated-icon-sm hover-scale-sm mr-2 d-30">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon
                                  icon={['fas', 'plus']}
                                  className="font-size-xs"
                                />
                              </span>
                            </Button>
                            <Button className="btn-neutral-danger p-0 btn-icon btn-animated-icon-sm hover-scale-sm d-30">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon
                                  icon={['fas', 'times']}
                                  className="font-size-xs"
                                />
                              </span>
                            </Button>
                          </div>
                        </div>
                        <div className="divider opacity-7" />
                        <div className="d-flex p-4 align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div>
                              <Card className="card-transparent mb-3 mb-sm-0">
                                <a
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}
                                  className="card-img-wrapper card-box-hover rounded">
                                  <img
                                    alt="..."
                                    className="card-img-top rounded-sm"
                                    src={product3}
                                    style={{ width: 110 }}
                                  />
                                </a>
                              </Card>
                            </div>
                            <div className="pl-3">
                              <b className="font-weight-bold font-size-lg text-black">
                                IPad Pro Gen. 3
                              </b>
                              <div className="d-flex pt-1 align-items-center">
                                <div className="badge badge-neutral-first text-first font-weight-normal font-size-sm h-auto py-1 px-2">
                                  $299
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Button className="btn-primary p-0 btn-icon btn-animated-icon-sm hover-scale-sm mr-2 d-30">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon
                                  icon={['fas', 'plus']}
                                  className="font-size-xs"
                                />
                              </span>
                            </Button>
                            <Button className="btn-neutral-danger p-0 btn-icon btn-animated-icon-sm hover-scale-sm d-30">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon
                                  icon={['fas', 'times']}
                                  className="font-size-xs"
                                />
                              </span>
                            </Button>
                          </div>
                        </div>
                        <div className="divider opacity-7" />
                        <div className="d-flex p-4 align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div>
                              <Card className="card-transparent mb-3 mb-sm-0">
                                <a
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}
                                  className="card-img-wrapper card-box-hover rounded">
                                  <img
                                    alt="..."
                                    className="card-img-top rounded-sm"
                                    src={product4}
                                    style={{ width: 110 }}
                                  />
                                </a>
                              </Card>
                            </div>
                            <div className="pl-3">
                              <b className="font-weight-bold font-size-lg text-black">
                                Apple Macbook PRO
                              </b>
                              <div className="d-flex pt-1 align-items-center">
                                <div className="badge badge-neutral-first text-first font-weight-normal font-size-sm h-auto py-1 px-2">
                                  $299
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Button className="btn-primary p-0 btn-icon btn-animated-icon-sm hover-scale-sm mr-2 d-30">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon
                                  icon={['fas', 'plus']}
                                  className="font-size-xs"
                                />
                              </span>
                            </Button>
                            <Button className="btn-neutral-danger p-0 btn-icon btn-animated-icon-sm hover-scale-sm d-30">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon
                                  icon={['fas', 'times']}
                                  className="font-size-xs"
                                />
                              </span>
                            </Button>
                          </div>
                        </div>
                        <div className="divider opacity-7" />
                        <div className="d-flex p-4 align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div>
                              <Card className="card-transparent mb-3 mb-sm-0">
                                <a
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}
                                  className="card-img-wrapper card-box-hover rounded">
                                  <img
                                    alt="..."
                                    className="card-img-top rounded-sm"
                                    src={product5}
                                    style={{ width: 110 }}
                                  />
                                </a>
                              </Card>
                            </div>
                            <div className="pl-3">
                              <b className="font-weight-bold font-size-lg text-black">
                                PRO Headphones V3
                              </b>
                              <div className="d-flex pt-1 align-items-center">
                                <div className="badge badge-neutral-first text-first font-weight-normal font-size-sm h-auto py-1 px-2">
                                  $1199
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Button className="btn-primary p-0 btn-icon btn-animated-icon-sm hover-scale-sm mr-2 d-30">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon
                                  icon={['fas', 'plus']}
                                  className="font-size-xs"
                                />
                              </span>
                            </Button>
                            <Button className="btn-neutral-danger p-0 btn-icon btn-animated-icon-sm hover-scale-sm d-30">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon
                                  icon={['fas', 'times']}
                                  className="font-size-xs"
                                />
                              </span>
                            </Button>
                          </div>
                        </div>
                        <div className="divider opacity-7" />
                        <div className="d-flex p-4 align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div>
                              <Card className="card-transparent mb-3 mb-sm-0">
                                <a
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}
                                  className="card-img-wrapper card-box-hover rounded">
                                  <img
                                    alt="..."
                                    className="card-img-top rounded-sm"
                                    src={product6}
                                    style={{ width: 110 }}
                                  />
                                </a>
                              </Card>
                            </div>
                            <div className="pl-3">
                              <b className="font-weight-bold font-size-lg text-black">
                                Apple Watch 42mm
                              </b>
                              <div className="d-flex pt-1 align-items-center">
                                <div className="badge badge-neutral-first text-first font-weight-normal font-size-sm h-auto py-1 px-2">
                                  $699
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Button className="btn-primary p-0 btn-icon btn-animated-icon-sm hover-scale-sm mr-2 d-30">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon
                                  icon={['fas', 'plus']}
                                  className="font-size-xs"
                                />
                              </span>
                            </Button>
                            <Button className="btn-neutral-danger p-0 btn-icon btn-animated-icon-sm hover-scale-sm d-30">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon
                                  icon={['fas', 'times']}
                                  className="font-size-xs"
                                />
                              </span>
                            </Button>
                          </div>
                        </div>
                      </PerfectScrollbar>
                    </div>
                    <div className="divider" />
                    <div className="bg-secondary text-black py-3 px-4 text-right">
                      <Grid container spacing={6}>
                        <Grid item md={9}>
                          <div className="text-black-50 text-uppercase">
                            Total
                          </div>
                        </Grid>
                        <Grid item md={3}>
                          $12,549
                        </Grid>
                      </Grid>
                    </div>
                    <div className="divider" />
                    <div className="p-4">
                      <Button
                        size="large"
                        fullWidth
                        className="btn-primary font-weight-bold font-size-sm text-uppercase">
                        Proceed to checkout
                      </Button>
                    </div>
                  </Card>
                </Grid>
              </Grid>
            </Container>
            <div className="shadow-container-blocks-2 z-below">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="var(--light)"
                  fillOpacity="1"
                  d="M0,288L15,266.7C30,245,60,203,90,202.7C120,203,150,245,180,240C210,235,240,181,270,170.7C300,160,330,192,360,176C390,160,420,96,450,96C480,96,510,160,540,186.7C570,213,600,203,630,186.7C660,171,690,149,720,165.3C750,181,780,235,810,218.7C840,203,870,117,900,69.3C930,21,960,11,990,10.7C1020,11,1050,21,1080,42.7C1110,64,1140,96,1170,96C1200,96,1230,64,1260,48C1290,32,1320,32,1350,69.3C1380,107,1410,181,1425,218.7L1440,256L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
