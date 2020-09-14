import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container } from '@material-ui/core';

import illustration1 from '../../../assets/images/illustrations/pack2/online_shopping.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="p-4 rounded bg-white">
        <Container>
          <Grid container spacing={6}>
            <Grid item xl={6} className="d-flex align-items-center">
              <div>
                <div className="badge bg-neutral-primary mb-4 text-primary h-auto py-2 px-3 font-size-xs badge-pill font-weight-normal">
                  Promo Campaign
                </div>
                <h1 className="display-4 mb-4">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h1>
                <p className="font-size-lg py-2 mb-0 text-black-50">
                  Premium admin template powered by the most popular UI
                  components framework available for React: Material-UI.
                  Features hundreds of examples making web development fast and
                  easy. Start from one of the individual apps included or from
                  the general dashboard and build beautiful scalable
                  applications and presentation websites.
                </p>
                <Grid container spacing={6} className="mt-4">
                  <Grid item sm={6}>
                    <div className="text-primary d-flex align-items-center mb-3">
                      <div className="d-30 rounded-pill btn-icon bg-neutral-primary mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'check']}
                          className="font-size-sm"
                        />
                      </div>
                      <span className="pt-1">300+ Components</span>
                    </div>
                    <div className="text-primary d-flex align-items-center">
                      <div className="d-30 rounded-pill btn-icon bg-neutral-primary mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'check']}
                          className="font-size-sm"
                        />
                      </div>
                      <span className="pt-1">UI Kit Included</span>
                    </div>
                  </Grid>
                  <Grid item sm={6}>
                    <div className="text-primary d-flex align-items-center mb-3">
                      <div className="d-30 rounded-pill btn-icon bg-neutral-primary mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'check']}
                          className="font-size-sm"
                        />
                      </div>
                      <span className="pt-1">Unlimited Options</span>
                    </div>
                    <div className="text-primary d-flex align-items-center">
                      <div className="d-30 rounded-pill btn-icon bg-neutral-primary mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'check']}
                          className="font-size-sm"
                        />
                      </div>
                      <span className="pt-1">Multiple Apps</span>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xl={6} className="d-none d-xl-flex">
              <img src={illustration1} className="img-fluid w-100" alt="..." />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
