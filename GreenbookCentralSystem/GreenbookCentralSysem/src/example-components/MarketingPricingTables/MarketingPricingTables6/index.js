import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, ButtonGroup, Card, Button } from '@material-ui/core';

import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import BusinessCenterTwoToneIcon from '@material-ui/icons/BusinessCenterTwoTone';
import LocalLibraryTwoToneIcon from '@material-ui/icons/LocalLibraryTwoTone';

export default function LivePreviewExample() {
  return (
    <>
      <Container className="py-5">
        <div className="mb-5 text-center">
          <h1 className="display-3 text-black mb-2 font-weight-bold">
            Subscription Options
          </h1>
          <p className="font-size-lg text-black-50">
            View any of the 5+ live previews we&#39;ve set up to learn why this
            dashboard template is the last one you&#39;ll ever need!
          </p>
          <ButtonGroup className="mt-4" size="small" variant="text">
            <Button className="btn-outline-second active btn-transition-none">
              Monthly
            </Button>
            <Button className="btn-outline-second btn-transition-none">
              Yearly
            </Button>
          </ButtonGroup>
        </div>

        <Grid container spacing={0}>
          <Grid item xl={4} className="mb-5 mb-lg-0 d-flex align-items-center">
            <Card className="text-center p-4 w-100 br-xl-right-0">
              <div className="d-100 rounded-lg bg-nice-redora btn-icon mx-auto">
                <SettingsTwoToneIcon className="d-30 text-white" />
              </div>
              <div className="divider my-4" />
              <div className="px-3">
                <div className="d-flex align-items-center pb-2">
                  <div className="d-30 rounded-sm btn-icon bg-neutral-success text-success mr-3">
                    <FontAwesomeIcon
                      icon={['fas', 'check']}
                      className="font-size-xs"
                    />
                  </div>
                  <div className="text-second">Unlimited Team Members</div>
                </div>
                <div className="d-flex align-items-center py-2">
                  <div className="d-30 rounded-sm btn-icon bg-neutral-success text-success mr-3">
                    <FontAwesomeIcon
                      icon={['fas', 'check']}
                      className="font-size-xs"
                    />
                  </div>
                  <div className="text-second">All Apps Integrations</div>
                </div>
                <div className="d-flex align-items-center pt-2">
                  <div className="d-30 rounded-sm btn-icon bg-neutral-danger text-danger mr-3">
                    <FontAwesomeIcon
                      icon={['fas', 'times']}
                      className="font-size-xs"
                    />
                  </div>
                  <div className="text-second opacity-6">Premium Support</div>
                </div>
              </div>
              <div className="divider my-4" />
              <div>
                <div className="text-center">
                  <div className="text-uppercase font-size-xl font-weight-bold">
                    Developer
                  </div>
                  <div className="display-3 line-height-1 font-weight-bold my-2">
                    <span className="font-size-sm">$</span>99
                  </div>
                  <span className="font-size-sm">per month</span>
                </div>
                <Button
                  fullWidth
                  className="btn-second mt-4 px-3 font-size-sm font-weight-bold text-uppercase rounded shadow-none py-3">
                  <span className="btn-wrapper--label">Subscribe</span>
                </Button>
              </div>
            </Card>
          </Grid>
          <Grid item xl={4} className="mb-5 mb-lg-0 d-flex align-items-center">
            <Card className="text-center shadow-xxl px-4 bg-nice-redora text-second py-5 w-100">
              <div className="d-100 rounded-lg bg-white btn-icon mx-auto">
                <BusinessCenterTwoToneIcon className="d-30 text-second" />
              </div>
              <div className="divider bg-white-10 my-4" />
              <div className="px-3">
                <div className="d-flex align-items-center pb-2">
                  <div className="d-30 rounded-sm btn-icon bg-white-10 text-white mr-3">
                    <FontAwesomeIcon
                      icon={['fas', 'check']}
                      className="font-size-xs"
                    />
                  </div>
                  <div className="text-white">Unlimited Team Members</div>
                </div>
                <div className="d-flex align-items-center py-2">
                  <div className="d-30 rounded-sm btn-icon bg-white-10 text-white mr-3">
                    <FontAwesomeIcon
                      icon={['fas', 'check']}
                      className="font-size-xs"
                    />
                  </div>
                  <div className="text-white">All Apps Integrations</div>
                </div>
                <div className="d-flex align-items-center pt-2">
                  <div className="d-30 rounded-sm btn-icon bg-white-10 text-white mr-3">
                    <FontAwesomeIcon
                      icon={['fas', 'times']}
                      className="font-size-xs"
                    />
                  </div>
                  <div className="text-white opacity-6">Premium Support</div>
                </div>
              </div>
              <div className="divider bg-white-10 my-4" />
              <div>
                <div className="text-center text-white">
                  <div className="text-uppercase font-size-xl font-weight-bold">
                    Designer
                  </div>
                  <div className="display-3 line-height-1 font-weight-bold my-2">
                    <span className="font-size-sm">$</span>199
                  </div>
                  <span className="font-size-sm">per month</span>
                </div>
                <Button
                  fullWidth
                  className="btn-light mt-4 px-3 font-size-sm font-weight-bold text-uppercase rounded shadow-none py-3">
                  <span className="btn-wrapper--label">Subscribe</span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                  </span>
                </Button>
              </div>
            </Card>
          </Grid>
          <Grid item xl={4} className="mb-5 mb-lg-0 d-flex align-items-center">
            <Card className="text-center p-4 w-100 bl-xl-left-0">
              <div className="d-100 rounded-lg bg-nice-redora btn-icon mx-auto">
                <LocalLibraryTwoToneIcon className="d-30 text-white" />
              </div>
              <div className="divider my-4" />
              <div className="px-3">
                <div className="d-flex align-items-center pb-2">
                  <div className="d-30 rounded-sm btn-icon bg-neutral-success text-success mr-3">
                    <FontAwesomeIcon
                      icon={['fas', 'check']}
                      className="font-size-xs"
                    />
                  </div>
                  <div className="text-second">Unlimited Team Members</div>
                </div>
                <div className="d-flex align-items-center py-2">
                  <div className="d-30 rounded-sm btn-icon bg-neutral-success text-success mr-3">
                    <FontAwesomeIcon
                      icon={['fas', 'check']}
                      className="font-size-xs"
                    />
                  </div>
                  <div className="text-second">All Apps Integrations</div>
                </div>
                <div className="d-flex align-items-center pt-2">
                  <div className="d-30 rounded-sm btn-icon bg-neutral-danger text-danger mr-3">
                    <FontAwesomeIcon
                      icon={['fas', 'times']}
                      className="font-size-xs"
                    />
                  </div>
                  <div className="text-second opacity-6">Premium Support</div>
                </div>
              </div>
              <div className="divider my-4" />
              <div>
                <div className="text-center">
                  <div className="text-uppercase font-size-xl font-weight-bold">
                    Enterprise
                  </div>
                  <div className="display-3 line-height-1 font-weight-bold my-2">
                    <span className="font-size-sm">$</span>599
                  </div>
                  <span className="font-size-sm">per month</span>
                </div>
                <Button
                  fullWidth
                  className="btn-second mt-4 px-3 font-size-sm font-weight-bold text-uppercase rounded shadow-none py-3">
                  <span className="btn-wrapper--label">Subscribe</span>
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
