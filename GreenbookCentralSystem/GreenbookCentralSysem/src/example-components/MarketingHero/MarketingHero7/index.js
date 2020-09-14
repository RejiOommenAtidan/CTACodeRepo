import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Card, Button } from '@material-ui/core';

import hero7 from '../../../assets/images/hero-bg/hero-7.jpg';

import MarketingHeaders2 from '../../MarketingHeaders/MarketingHeaders2';

import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';

import LocalLibraryTwoToneIcon from '@material-ui/icons/LocalLibraryTwoTone';

export default function LivePreviewExample() {
  return (
    <>
      <div className="divider border-2 bg-second border-second" />
      <div className="hero-wrapper bg-composed-wrapper bg-serious-blue">
        <div className="header-top-section pb-3">
          <MarketingHeaders2 />
        </div>
        <div className="divider bg-white-5" />
        <div className="hero-wrapper--content">
          <div
            className="bg-composed-wrapper--image"
            style={{ backgroundImage: 'url(' + hero7 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-premium-dark opacity-4" />
          <div className="bg-composed-wrapper--content">
            <Container className="z-over text-white pt-4">
              <div className="py-5 text-center d-flex justify-content-center">
                <Grid
                  item
                  md={11}
                  lg={10}
                  xl={8}
                  className="d-flex justify-content-center align-items-center">
                  <div>
                    <h2 className="display-3 font-weight-bold">
                      Bamburgh React Admin Dashboard with Material-UI PRO
                    </h2>
                    <p className="font-size-xl py-3 text-white-50">
                      Premium admin template powered by the most popular UI
                      components framework available for React: Material-UI.
                      Features hundreds of examples making web development fast
                      and easy. Start from one of the individual apps included
                      or from the general dashboard and build beautiful scalable
                      applications and presentation websites.
                    </p>
                    <div className="pt-3">
                      <Button
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        size="large"
                        className="btn-pill shadow-second-sm btn-warning">
                        <span className="btn-wrapper--label">
                          Plans & Pricing
                        </span>
                        <span className="btn-wrapper--icon">
                          <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                        </span>
                      </Button>
                    </div>
                  </div>
                </Grid>
              </div>
              <Grid container spacing={6} className="pt-4">
                <Grid item md={6} xl={4}>
                  <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 mb-xl-5 d-block">
                    <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-danger mx-auto">
                      <svg
                        className="blob-wrapper opacity-1"
                        viewBox="0 0 600 600"
                        xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(300,300)">
                          <path
                            d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                      <div className="blob-icon-wrapper">
                        <NotificationsActiveTwoToneIcon />
                      </div>
                    </div>
                    <h5 className="font-weight-bold font-size-lg text-second mb-2">
                      Analytics
                    </h5>
                    <p className="mb-4 text-black-50">
                      View any of the 5+ live previews we&#39;ve set up to learn
                      why this dashboard template is the last one you&#39;ll
                      ever need!
                    </p>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="transition-base rounded-pill py-1 px-4 text-lowercase font-size-xs bg-neutral-danger text-danger d-inline-flex">
                      click for details
                    </a>
                  </Card>
                </Grid>
                <Grid item md={6} xl={4} className="d-none d-md-block">
                  <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 mb-xl-5 d-block">
                    <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-warning mx-auto">
                      <svg
                        className="blob-wrapper opacity-1"
                        viewBox="0 0 600 600"
                        xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(300,300)">
                          <path
                            d="M155,-128.8C192.2,-77,207.7,-13,197.7,50.9C187.7,114.8,152.2,178.6,96.7,208.2C41.1,237.9,-34.6,233.4,-102.6,204C-170.6,174.7,-231.1,120.6,-246.7,55.4C-262.4,-9.9,-233.2,-86.3,-184.6,-140.7C-136,-195.2,-68,-227.6,-4.6,-223.9C58.9,-220.3,117.8,-180.6,155,-128.8Z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                      <div className="blob-icon-wrapper">
                        <SettingsTwoToneIcon />
                      </div>
                    </div>
                    <h5 className="font-weight-bold font-size-lg text-second mb-2">
                      Budgets
                    </h5>
                    <p className="mb-4 text-black-50">
                      View any of the 5+ live previews we&#39;ve set up to learn
                      why this dashboard template is the last one you&#39;ll
                      ever need!
                    </p>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="transition-base rounded-pill py-1 px-4 text-lowercase font-size-xs bg-neutral-warning text-warning d-inline-flex">
                      click for details
                    </a>
                  </Card>
                </Grid>
                <Grid item md={6} xl={4} className="d-none d-lg-block">
                  <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 mb-xl-5 d-block">
                    <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-success mx-auto">
                      <svg
                        className="blob-wrapper opacity-1"
                        viewBox="0 0 600 600"
                        xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(300,300)">
                          <path
                            d="M170.4,-137.2C213.2,-82.3,234.8,-11.9,223.6,56.7C212.4,125.2,168.5,191.9,104.3,226.6C40.2,261.3,-44.1,264,-104,229.8C-163.9,195.7,-199.4,124.6,-216.2,49.8C-233,-25.1,-231,-103.9,-191.9,-158C-152.7,-212.1,-76.4,-241.6,-6.3,-236.6C63.8,-231.6,127.7,-192.2,170.4,-137.2Z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                      <div className="blob-icon-wrapper">
                        <LocalLibraryTwoToneIcon />
                      </div>
                    </div>
                    <h5 className="font-weight-bold font-size-lg text-second mb-2">
                      Performance
                    </h5>
                    <p className="mb-4 text-black-50">
                      View any of the 5+ live previews we&#39;ve set up to learn
                      why this dashboard template is the last one you&#39;ll
                      ever need!
                    </p>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="transition-base rounded-pill py-1 px-4 text-lowercase font-size-xs bg-neutral-success text-success d-inline-flex">
                      click for details
                    </a>
                  </Card>
                </Grid>
              </Grid>
            </Container>
            <div className="shadow-container-blocks-1 z-below">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="var(--light)"
                  fillOpacity="1"
                  d="M0,288L48,250.7C96,213,192,139,288,106.7C384,75,480,85,576,112C672,139,768,181,864,176C960,171,1056,117,1152,128C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
