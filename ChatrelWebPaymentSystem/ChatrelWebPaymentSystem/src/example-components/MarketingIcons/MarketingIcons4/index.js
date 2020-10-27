import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Card } from '@material-ui/core';

import logo1 from '../../../assets/images/stock-logos/microsoft-icon.svg';
import logo2 from '../../../assets/images/stock-logos/google-icon.svg';
import logo3 from '../../../assets/images/stock-logos/spotify-icon.svg';
import logo4 from '../../../assets/images/stock-logos/instagram-icon.svg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="mb-spacing-6-x2">
        <Container className="py-3">
          <Grid container spacing={0}>
            <Grid item lg={6}>
              <div className="d-flex py-4">
                <div className="d-80 flex-shrink-0 rounded-circle btn-icon bg-secondary">
                  <div className="d-40">
                    <img alt="..." className="img-fit-container" src={logo1} />
                  </div>
                </div>
                <div className="pt-2 pl-4">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold d-flex align-items-center mb-2 d-flex">
                    <div className="font-size-lg">Microsoft</div>
                    <div className="d-30 rounded-pill btn-icon bg-neutral-success font-size-xs text-success ml-2">
                      <FontAwesomeIcon
                        icon={['fas', 'check']}
                        className="font-size-sm"
                      />
                    </div>
                  </a>
                  <p className="mb-0 text-second opacity-7">
                    View any of the 5+ live previews we&#39;ve set up to learn
                    why this dashboard template is the last one you&#39;ll ever
                    need!
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className="d-flex py-4">
                <div className="d-80 flex-shrink-0 rounded-circle btn-icon bg-secondary">
                  <div className="d-40">
                    <img alt="..." className="img-fit-container" src={logo2} />
                  </div>
                </div>
                <div className="pt-2 pl-4">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold d-flex align-items-center mb-2 d-flex">
                    <div className="font-size-lg">Google</div>
                    <div className="d-30 rounded-pill btn-icon bg-neutral-success font-size-xs text-success ml-2">
                      <FontAwesomeIcon
                        icon={['fas', 'check']}
                        className="font-size-sm"
                      />
                    </div>
                  </a>
                  <p className="mb-0 text-second opacity-7">
                    View any of the 5+ live previews we&#39;ve set up to learn
                    why this dashboard template is the last one you&#39;ll ever
                    need!
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className="d-flex py-4">
                <div className="d-80 flex-shrink-0 rounded-circle btn-icon bg-secondary">
                  <div className="d-40">
                    <img alt="..." className="img-fit-container" src={logo3} />
                  </div>
                </div>
                <div className="pt-2 pl-4">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold d-flex align-items-center mb-2 d-flex">
                    <div className="font-size-lg">Spotify</div>
                    <div className="d-30 rounded-pill btn-icon bg-neutral-danger font-size-xs text-danger ml-2">
                      <FontAwesomeIcon
                        icon={['fas', 'times']}
                        className="font-size-sm"
                      />
                    </div>
                  </a>
                  <p className="mb-0 text-second opacity-7">
                    View any of the 5+ live previews we&#39;ve set up to learn
                    why this dashboard template is the last one you&#39;ll ever
                    need!
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className="d-flex py-4">
                <div className="d-80 flex-shrink-0 rounded-circle btn-icon bg-secondary">
                  <div className="d-40">
                    <img alt="..." className="img-fit-container" src={logo4} />
                  </div>
                </div>
                <div className="pt-2 pl-4">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold d-flex align-items-center mb-2 d-flex">
                    <div className="font-size-lg">Instagram</div>
                    <div className="d-30 rounded-pill btn-icon bg-neutral-success font-size-xs text-success ml-2">
                      <FontAwesomeIcon
                        icon={['fas', 'check']}
                        className="font-size-sm"
                      />
                    </div>
                  </a>
                  <p className="mb-0 text-second opacity-7">
                    View any of the 5+ live previews we&#39;ve set up to learn
                    why this dashboard template is the last one you&#39;ll ever
                    need!
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </>
  );
}
