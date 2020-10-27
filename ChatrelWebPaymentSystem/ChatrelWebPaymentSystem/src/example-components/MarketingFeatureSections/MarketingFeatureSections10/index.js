import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Container,
  Card,
  Button,
  List,
  ListItem
} from '@material-ui/core';

import logo1 from '../../../assets/images/stock-logos/discord-icon.svg';
import logo2 from '../../../assets/images/stock-logos/google-icon.svg';
import logo3 from '../../../assets/images/stock-logos/spotify-icon.svg';
import logo4 from '../../../assets/images/stock-logos/slack-icon.svg';
import logo5 from '../../../assets/images/stock-logos/pinterest-icon.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="rounded bg-white px-4 py-4 py-xl-5">
        <Container className="py-0 py-xl-4">
          <Grid container spacing={6}>
            <Grid item xl={6}>
              <div className="pr-4 pr-xl-5 text-black">
                <h1 className="display-3 mb-3 font-weight-bold">
                  Bamburgh React Admin Dashboard with Material-UI PRO
                </h1>
                <p className="font-size-xxl m-0 py-3 text-black-50">
                  You can build unlimited layout styles using any of the 500+
                  included components and elements. Powerful, unique template
                  built for React and Material-UI.
                </p>
                <p className="font-size-lg m-0 py-2 text-black opacity-7">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
                <div className="d-block mt-4">
                  <Button className="btn-first px-5 font-size-sm font-weight-bold btn-animated-icon text-uppercase rounded shadow-none py-3 hover-scale-sm hover-scale-lg mr-3">
                    <span className="btn-wrapper--label">Purchase now</span>
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                    </span>
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xl={6} className="d-flex align-items-center">
              <Card className="my-5 my-xl-0 bg-secondary object-skew hover-scale-lg shadow-xxl w-100 card-box">
                <List component="div" className="list-group-flush">
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="d-flex align-items-center rounded-top py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon mr-3 d-50">
                        <img
                          className="img-fit-container"
                          alt="..."
                          src={logo1}
                        />
                      </div>
                      <div>
                        <div className="font-weight-bold text-black">
                          Build React Interface
                        </div>
                        <div className="text-black-50">Development</div>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <div className="badge badge-neutral-success text-success font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                        $3,884
                      </div>
                    </div>
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="d-flex align-items-center py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon mr-3 d-50">
                        <img
                          className="img-fit-container"
                          alt="..."
                          src={logo2}
                        />
                      </div>
                      <div>
                        <div className="font-weight-bold text-black">
                          Create Ads Campaign
                        </div>
                        <div className="text-black-50">Marketing</div>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <div className="badge badge-neutral-warning text-warning font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                        $8,362
                      </div>
                    </div>
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="d-flex align-items-center py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon mr-3 d-50">
                        <img
                          className="img-fit-container"
                          alt="..."
                          src={logo3}
                        />
                      </div>
                      <div>
                        <div className="font-weight-bold text-black">
                          Resolve All Github Issues
                        </div>
                        <div className="text-black-50">Bugfixes</div>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <div className="badge badge-neutral-success text-success font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                        $9,385
                      </div>
                    </div>
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="d-flex align-items-center py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon mr-3 d-50">
                        <img
                          className="img-fit-container"
                          alt="..."
                          src={logo4}
                        />
                      </div>
                      <div>
                        <div className="font-weight-bold text-black">
                          Build UI for Angular
                        </div>
                        <div className="text-black-50">Development</div>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <div className="badge badge-neutral-success text-success font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                        $1,964
                      </div>
                    </div>
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="d-flex align-items-center py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon mr-3 d-50">
                        <img
                          className="img-fit-container"
                          alt="..."
                          src={logo5}
                        />
                      </div>
                      <div>
                        <div className="font-weight-bold text-black">
                          Create UI Designs
                        </div>
                        <div className="text-black-50">Marketing</div>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <div className="badge badge-neutral-danger text-danger font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                        $5,825
                      </div>
                    </div>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
