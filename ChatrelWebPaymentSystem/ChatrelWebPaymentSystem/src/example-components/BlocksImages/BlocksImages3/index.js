import React from 'react';

import { Grid, Card, Button } from '@material-ui/core';

import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import stock7 from '../../../assets/images/stock-photos/stock-7.jpg';
import stock6 from '../../../assets/images/stock-photos/stock-6.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item lg={6} className="d-flex">
          <Card>
            <div className="card-badges">
              <div className="badge badge-pill badge-warning h-auto px-3 py-1">
                Blog Posts
              </div>
            </div>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="image-title-overlay d-block h-280px"
              title="...">
              <div className="image-title-overlay--bottom px-5 py-4">
                <h3 className="font-size-xxl font-weight-bold m-0 text-white">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h3>
              </div>
              <img
                alt="..."
                className="card-img-top img-fit-container"
                src={stock7}
              />
            </a>
            <div className="p-5">
              <div className="d-flex justify-content-between mb-4">
                <div className="d-flex align-items-center">
                  <div className="avatar-icon-wrapper mr-2">
                    <div className="avatar-icon">
                      <img alt="..." src={avatar2} />
                    </div>
                  </div>
                  <div>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-weight-bold"
                      title="...">
                      Shanelle Wynn
                    </a>
                    <span className="text-black-50 d-block">
                      UI Engineer, Apple Inc.
                    </span>
                  </div>
                </div>
                <div>
                  <Button className="btn-neutral-primary py-1 px-2 d-block">
                    <span className="font-size-lg font-weight-bold">23</span>
                    <span className="d-block opacity-6">Reviews</span>
                  </Button>
                </div>
              </div>
              <p className="text-black font-size-xl">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>
              <p className="card-text font-size-lg">
                Premium admin template powered by the most popular UI components
                framework available for React: Material-UI. Features hundreds of
                examples making web development fast and easy. Start from one of
                the individual apps included or from the general dashboard and
                build beautiful scalable applications and presentation websites.
              </p>
              <div className="d-flex justify-content-between pt-2">
                <Button className="btn-first hover-scale-lg">Learn more</Button>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item lg={6} className="d-flex">
          <Card>
            <div className="px-3 pt-3 position-relative">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="image-title-overlay d-block rounded d-block h-280px"
                title="...">
                <div className="card-badges">
                  <div className="badge badge-pill badge-success h-auto px-3 py-1">
                    New Content
                  </div>
                </div>
                <div className="image-title-overlay--bottom p-4">
                  <h3 className="font-size-xxl font-weight-bold m-0 text-white">
                    Bamburgh React Admin Dashboard with Material-UI PRO
                  </h3>
                </div>
                <img
                  alt="..."
                  className="rounded img-fit-container"
                  src={stock6}
                />
              </a>
            </div>
            <div className="p-4">
              <div className="d-flex justify-content-between mb-4">
                <div className="d-flex align-items-center">
                  <div className="avatar-icon-wrapper mr-2">
                    <div className="avatar-icon">
                      <img alt="..." src={avatar3} />
                    </div>
                  </div>
                  <div>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-weight-bold"
                      title="...">
                      Shanelle Wynn
                    </a>
                    <span className="text-black-50 d-block">
                      UI Engineer, Apple Inc.
                    </span>
                  </div>
                </div>
                <div>
                  <Button className="btn-neutral-primary py-1 px-2 d-block">
                    <span className="font-size-lg font-weight-bold">23</span>
                    <span className="d-block opacity-6">Reviews</span>
                  </Button>
                </div>
              </div>
              <p className="text-black font-size-xl">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>
              <p className="card-text font-size-lg">
                Premium admin template powered by the most popular UI components
                framework available for React: Material-UI. Features hundreds of
                examples making web development fast and easy. Start from one of
                the individual apps included or from the general dashboard and
                build beautiful scalable applications and presentation websites.
              </p>
              <div className="d-flex justify-content-between pt-2">
                <Button className="btn-first hover-scale-lg">Learn more</Button>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
