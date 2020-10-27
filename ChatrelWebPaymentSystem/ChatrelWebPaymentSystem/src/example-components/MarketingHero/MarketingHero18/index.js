import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Button } from '@material-ui/core';

import particles3 from '../../../assets/images/hero-bg/particles-3.svg';
import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import MarketingHeaders6 from '../../MarketingHeaders/MarketingHeaders6';

export default function LivePreviewExample() {
  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-white">
        <div className="w-100 px-4">
          <MarketingHeaders6 />
        </div>
        <div className="hero-wrapper--content">
          <div
            className="bg-composed-wrapper--image bg-composed-filter-rm opacity-3"
            style={{ backgroundImage: 'url(' + particles3 + ')' }}
          />
          <div className="bg-composed-wrapper--content">
            <div className="py-5">
              <Container className="text-black text-center py-5">
                <Grid item md={10} lg={8} className="mx-auto pb-4">
                  <h2 className="display-4 font-weight-bold">
                    Bamburgh React Admin Dashboard with Material-UI PRO
                  </h2>
                  <p className="font-size-xl mb-0 text-black-50">
                    Premium admin template powered by the most popular UI
                    components framework available for React: Material-UI.
                    Features hundreds of examples making web development fast
                    and easy. Start from one of the individual apps included or
                    from the general dashboard and build beautiful scalable
                    applications and presentation websites.
                  </p>
                </Grid>
                <div className="divider mx-5 mt-5" />

                <div className="d-flex flex-row flex-wrap justify-content-center">
                  <div className="position-relative py-3 py-xl-4 px-4 px-xl-5">
                    <div className="divider-v divider-v-lg" />
                    <div className="avatar-icon-wrapper rounded-circle d-80 mx-auto">
                      <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0">
                        <div className="rounded-circle overflow-hidden">
                          <img alt="..." className="img-fluid" src={avatar1} />
                        </div>
                      </div>
                    </div>
                    <div className="font-weight-bold mt-1">Marion Devine</div>
                    <div className="font-weight-bold font-size-sm text-black-50">
                      <FontAwesomeIcon
                        icon={['fas', 'star']}
                        className="text-warning mr-1"
                      />
                      <span>4.8</span>
                      <span className="px-1">|</span>
                      34 Jobs
                    </div>
                  </div>
                  <div className="position-relative py-3 py-xl-4 px-4 px-xl-5">
                    <div className="divider-v divider-v-lg" />
                    <div className="avatar-icon-wrapper rounded-circle d-80 mx-auto">
                      <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0">
                        <div className="rounded-circle overflow-hidden">
                          <img alt="..." className="img-fluid" src={avatar2} />
                        </div>
                      </div>
                    </div>
                    <div className="font-weight-bold mt-1">Monique Hanna</div>
                    <div className="font-weight-bold font-size-sm text-black-50">
                      <FontAwesomeIcon
                        icon={['fas', 'star']}
                        className="text-warning mr-1"
                      />
                      <span>5.0</span>
                      <span className="px-1">|</span>
                      81 Jobs
                    </div>
                  </div>
                  <div className="position-relative py-3 py-xl-4 px-4 px-xl-5">
                    <div className="divider-v divider-v-lg" />
                    <div className="avatar-icon-wrapper rounded-circle d-80 mx-auto">
                      <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0">
                        <div className="rounded-circle overflow-hidden">
                          <img alt="..." className="img-fluid" src={avatar3} />
                        </div>
                      </div>
                    </div>
                    <div className="font-weight-bold mt-1">Celine Goulding</div>
                    <div className="font-weight-bold font-size-sm text-black-50">
                      <FontAwesomeIcon
                        icon={['fas', 'star']}
                        className="text-warning mr-1"
                      />
                      <span>2.9</span>
                      <span className="px-1">|</span>
                      52 Jobs
                    </div>
                  </div>
                  <div className="position-relative py-3 py-xl-4 px-4 px-xl-5">
                    <div className="avatar-icon-wrapper rounded-circle d-80 mx-auto">
                      <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0">
                        <div className="rounded-circle overflow-hidden">
                          <img alt="..." className="img-fluid" src={avatar4} />
                        </div>
                      </div>
                    </div>
                    <div className="font-weight-bold mt-1">Anabel Mayo</div>
                    <div className="font-weight-bold font-size-sm text-black-50">
                      <FontAwesomeIcon
                        icon={['fas', 'star']}
                        className="text-warning mr-1"
                      />
                      <span>4.6</span>
                      <span className="px-1">|</span>
                      76 Jobs
                    </div>
                  </div>
                </div>

                <div className="divider mx-5 mb-5" />

                <Grid item md={10} lg={8} className="mx-auto pt-4">
                  <div>
                    <Button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      size="large"
                      className="btn-pill shadow-second-sm btn-danger">
                      <span className="btn-wrapper--label">Recent Orders</span>
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                      </span>
                    </Button>
                    <Button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      size="large"
                      className="btn-neutral-danger btn-pill ml-3">
                      <span>My Account</span>
                    </Button>
                  </div>
                </Grid>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
