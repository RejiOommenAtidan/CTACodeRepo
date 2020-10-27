import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button, List, ListItem } from '@material-ui/core';

import hero2 from '../../../assets/images/hero-bg/hero-2.jpg';

import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={0} className="py-5 my-5">
        <Grid
          item
          xl={6}
          className="hero-wrapper bg-composed-wrapper bg-serious-blue">
          <div className="hero-wrapper--content">
            <div
              className="bg-composed-wrapper--image bg-composed-filter-rm"
              style={{ backgroundImage: 'url(' + hero2 + ')' }}
            />
            <div className="bg-composed-wrapper--bg bg-second opacity-4" />
            <div className="bg-composed-wrapper--content p-4 p-xl-0">
              <Grid item lg={10} xl={9} className="p-0 mx-auto">
                <Card className="overflow-visible">
                  <List component="div" className="list-group-flush">
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      disableRipple
                      onClick={(e) => e.preventDefault()}
                      className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center rounded-top py-3">
                      <div className="d-flex align-items-center">
                        <div className="avatar-icon-wrapper d-50 mr-3">
                          <div className="avatar-icon rounded-circle d-50">
                            <img alt="..." src={avatar6} />
                          </div>
                        </div>
                        <div>
                          <div className="font-weight-bold font-size-sm text-black">
                            Karla Byrne
                          </div>
                          <div className="d-flex align-items-center font-size-xs">
                            <div className="badge badge-success badge-circle border-white border-1 mr-2">
                              Completed
                            </div>
                            <div className="text-success">Online</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button size="small" className="btn-neutral-dark px-3">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['fas', 'plus']} />
                          </span>
                          <span className="btn-wrapper--label">Add</span>
                        </Button>
                      </div>
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      disableRipple
                      onClick={(e) => e.preventDefault()}
                      className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center py-3">
                      <div className="d-flex align-items-center">
                        <div className="avatar-icon-wrapper d-50 mr-3">
                          <div className="avatar-icon rounded-circle d-50">
                            <img alt="..." src={avatar5} />
                          </div>
                        </div>
                        <div>
                          <div className="font-weight-bold font-size-sm text-black">
                            Eden Hays
                          </div>
                          <div className="d-flex align-items-center font-size-xs">
                            <div className="badge badge-danger badge-circle border-white border-1 mr-2">
                              Completed
                            </div>
                            <div className="text-danger">Offline</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button
                          size="small"
                          className="btn-neutral-dark px-3"
                          disabled>
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['fas', 'plus']} />
                          </span>
                          <span className="btn-wrapper--label">Add</span>
                        </Button>
                      </div>
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      disableRipple
                      onClick={(e) => e.preventDefault()}
                      className="d-flex bg-white hover-scale-rounded justify-content-between align-items-center py-3">
                      <div className="d-flex align-items-center">
                        <div className="avatar-icon-wrapper d-50 mr-3">
                          <div className="avatar-icon rounded-circle d-50">
                            <img alt="..." src={avatar4} />
                          </div>
                        </div>
                        <div>
                          <div className="font-weight-bold font-size-sm text-black">
                            Janine Benton
                          </div>
                          <div className="d-flex align-items-center font-size-xs">
                            <div className="badge badge-warning badge-circle border-white border-1 mr-2">
                              Completed
                            </div>
                            <div className="text-warning">In a meeting</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button size="small" className="btn-neutral-dark px-3">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['fas', 'plus']} />
                          </span>
                          <span className="btn-wrapper--label">Add</span>
                        </Button>
                      </div>
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </div>
          </div>
        </Grid>
        <Grid item xl={6} className="bg-white">
          <div className="p-4">
            <div className="p-0 p-lg-4">
              <h1 className="display-4 font-weight-bold mb-3">
                Bamburgh React Admin Dashboard with Material-UI PRO
              </h1>
              <p className="font-size-lg text-black-50">
                Premium admin template powered by the most popular UI components
                framework available for React: Material-UI. Features hundreds of
                examples making web development fast and easy. Start from one of
                the individual apps included or from the general dashboard and
                build beautiful scalable applications and presentation websites.
              </p>
              <Grid container spacing={6} className="text-first mt-4">
                <Grid item sm={6}>
                  <div className="d-flex align-items-center mb-3">
                    <div className="d-30 rounded-pill btn-icon bg-neutral-first mr-2">
                      <FontAwesomeIcon icon={['fas', 'check']} />
                    </div>
                    <span className="pt-1">300+ components available</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="d-30 rounded-pill btn-icon bg-neutral-first mr-2">
                      <FontAwesomeIcon icon={['fas', 'check']} />
                    </div>
                    <span className="pt-1">UI Kit included</span>
                  </div>
                </Grid>
                <Grid item sm={6}>
                  <div className="d-flex align-items-center mb-3">
                    <div className="d-30 rounded-pill btn-icon bg-neutral-first mr-2">
                      <FontAwesomeIcon icon={['fas', 'check']} />
                    </div>
                    <span className="pt-1">Unlimited custom options</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="d-30 rounded-pill btn-icon bg-neutral-first mr-2">
                      <FontAwesomeIcon icon={['fas', 'check']} />
                    </div>
                    <span className="pt-1">Multiple applications</span>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
