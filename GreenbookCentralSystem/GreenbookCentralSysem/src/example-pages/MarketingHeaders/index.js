import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid, Container, Card } from '@material-ui/core';

import MarketingHeaders1 from '../../example-components/MarketingHeaders/MarketingHeaders1';
import MarketingHeaders2 from '../../example-components/MarketingHeaders/MarketingHeaders2';
import MarketingHeaders3 from '../../example-components/MarketingHeaders/MarketingHeaders3';
import MarketingHeaders4 from '../../example-components/MarketingHeaders/MarketingHeaders4';
import MarketingHeaders5 from '../../example-components/MarketingHeaders/MarketingHeaders5';
import MarketingHeaders6 from '../../example-components/MarketingHeaders/MarketingHeaders6';
import MarketingHeaders7 from '../../example-components/MarketingHeaders/MarketingHeaders7';
export default function MarketingHeaders() {
  return (
    <>
      <PageTitle
        titleHeading="Header Sections"
        titleDescription="Build presentation or marketing websites using these wonderful UI Kit components."
      />

      <div className="bg-second rounded mb-5">
        <Container>
          <MarketingHeaders1 />
        </Container>
        <div className="divider bg-white-10" />
        <div className="py-3 text-center text-white py-xl-5">
          <Container className="py-3 py-xl-5">
            <Grid container spacing={6}>
              <Grid item lg={10} xl={7} className="mx-auto">
                <div className="font-size-xs text-first pb-3 text-uppercase font-weight-bold">
                  Examples
                </div>
                <h3 className="display-2 font-weight-bold mb-3">Headers</h3>
                <p className="text-white-50 line-height-2 font-size-xl px-3 px-xl-5 mb-0">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      <div className="bg-night-sky rounded mb-5">
        <MarketingHeaders2 />
        <div className="divider bg-white-10" />
        <div className="py-3 text-center text-white py-xl-5">
          <Container className="py-3 py-xl-5">
            <Grid container spacing={6}>
              <Grid item lg={10} xl={7} className="mx-auto">
                <div className="font-size-xs text-warning pb-3 text-uppercase font-weight-bold">
                  Examples
                </div>
                <h3 className="display-2 font-weight-bold mb-3">Headers</h3>
                <p className="text-white-50 line-height-2 font-size-xl px-3 px-xl-5 mb-0">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      <div className="bg-royal rounded mb-5">
        <MarketingHeaders3 />
        <div className="py-3 text-center text-white py-xl-5">
          <Container className="py-3 py-xl-5">
            <Grid container spacing={6}>
              <Grid item lg={10} xl={7} className="mx-auto">
                <div className="font-size-xs text-success pb-3 text-uppercase font-weight-bold">
                  Examples
                </div>
                <h3 className="display-2 font-weight-bold mb-3">Headers</h3>
                <p className="text-white-50 line-height-2 font-size-xl px-3 px-xl-5 mb-0">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      <Card className="rounded mb-5">
        <Container>
          <MarketingHeaders4 />
        </Container>
        <div className="divider bg-white-10" />
        <div className="py-3 text-center text-black py-xl-5">
          <Container className="py-3 py-xl-5">
            <Grid container spacing={6}>
              <Grid item lg={10} xl={7} className="mx-auto">
                <div className="font-size-xs text-primary pb-3 text-uppercase font-weight-bold">
                  Examples
                </div>
                <h3 className="display-2 font-weight-bold mb-3">Headers</h3>
                <p className="text-black-50 line-height-2 font-size-xl px-3 px-xl-5 mb-0">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Card>
      <div className="bg-deep-sky rounded mb-5">
        <MarketingHeaders5 />
        <div className="divider bg-white-10" />
        <div className="py-3 text-center text-white py-xl-5">
          <Container className="py-3 py-xl-5">
            <Grid container spacing={6}>
              <Grid item lg={10} xl={7} className="mx-auto">
                <div className="badge bg-white-10 text-white font-size-xs text-white mb-3 text-uppercase h-auto px-3 py-1">
                  Examples
                </div>
                <h3 className="display-2 font-weight-bold mb-3">Headers</h3>
                <p className="text-white-50 line-height-2 font-size-xl px-3 px-xl-5 mb-0">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>

      <Card className="bg-white rounded mb-5">
        <Container>
          <MarketingHeaders6 />
        </Container>
        <div className="pb-3 text-center text-black py-xl-5">
          <Container className="py-3 py-xl-5">
            <Grid container spacing={6}>
              <Grid item lg={10} xl={7} className="mx-auto">
                <div className="font-size-xs text-success pb-3 text-uppercase font-weight-bold">
                  Examples
                </div>
                <h3 className="display-2 font-weight-bold mb-3">Headers</h3>
                <p className="text-black-50 line-height-2 font-size-xl px-3 px-xl-5 mb-0">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Card>
      <MarketingHeaders7 />
    </>
  );
}
