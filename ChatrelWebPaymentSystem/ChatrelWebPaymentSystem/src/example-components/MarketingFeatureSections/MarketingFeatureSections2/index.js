import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Card, Button } from '@material-ui/core';

import particles3 from '../../../assets/images/hero-bg/particles-3.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="hero-wrapper rounded bg-sunrise-purple py-4 py-xl-5 bg-composed-wrapper mb-spacing-6-x2">
        <div className="hero-wrapper--content">
          <div
            className="bg-composed-wrapper--image rounded bg-composed-filter-rm opacity-6"
            style={{ backgroundImage: 'url(' + particles3 + ')' }}
          />
          <div className="bg-composed-wrapper--bg rounded bg-second opacity-4" />
          <div className="bg-composed-wrapper--content">
            <Container className="py-4 py-xl-5">
              <Grid container spacing={6}>
                <Grid item xl={5} className="d-flex align-items-center">
                  <Card className="p-3 p-md-5 w-100 mx-0 mx-4 shadow-sm-dark card-border-top border-success rounded-lg br-bl br-br">
                    <div>
                      <div className="display-3 font-weight-bold">$4,348</div>
                      <div className="text-black-50 font-size-lg">
                        Today's Earnings
                      </div>
                    </div>
                    <div className="divider my-4" />
                    <div>
                      <div className="display-3 font-weight-bold text-danger">
                        $2,105
                      </div>
                      <div className="text-black-50 font-size-lg">
                        Weekly Expenses
                      </div>
                    </div>
                    <div className="divider my-4" />
                    <div>
                      <div className="display-3 font-weight-bold">$3,439</div>
                      <div className="text-black-50 font-size-lg">
                        Pending Payments
                      </div>
                    </div>
                  </Card>
                </Grid>
                <Grid item xl={7}>
                  <div className="mt-4 mt-xl-0 py-4 py-xl-5">
                    <div className="px-4 text-white">
                      <h1 className="display-3 mb-3 font-weight-bold">
                        Bamburgh React Admin Dashboard with Material-UI PRO
                      </h1>
                      <p className="font-size-xxl m-0 py-3 text-white-50">
                        You can build unlimited layout styles using any of the
                        500+ included components and elements. Powerful, unique
                        template built for React and Material-UI.
                      </p>
                      <p className="font-size-lg m-0 py-2 text-white opacity-7">
                        View any of the 5+ live previews we&#39;ve set up to
                        learn why this dashboard template is the last one
                        you&#39;ll ever need!
                      </p>
                      <div className="d-block mt-4">
                        <Button className="btn-success px-5 font-size-sm font-weight-bold btn-animated-icon text-uppercase rounded shadow-none py-3 hover-scale-sm hover-scale-lg mr-3">
                          <span className="btn-wrapper--label">
                            Get Started
                          </span>
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                          </span>
                        </Button>
                      </div>
                    </div>
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
