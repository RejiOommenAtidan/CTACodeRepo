import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';

import product1 from '../../../assets/images/stock-products/product-1.png';
import product2 from '../../../assets/images/stock-products/product-2.png';
import product3 from '../../../assets/images/stock-products/product-3.png';
import product4 from '../../../assets/images/stock-products/product-4.png';
import product5 from '../../../assets/images/stock-products/product-5.png';
import product6 from '../../../assets/images/stock-products/product-6.png';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box">
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
            <p className="text-black-50 mb-0">Checkout is almost done!</p>
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
        <div className="bg-secondary py-3 px-4 text-right">
          <Grid container spacing={6}>
            <Grid item md={9}>
              <div className="text-black-50 text-uppercase">Total</div>
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
    </>
  );
}
