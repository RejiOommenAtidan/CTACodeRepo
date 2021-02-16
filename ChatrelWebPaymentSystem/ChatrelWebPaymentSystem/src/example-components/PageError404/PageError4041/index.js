import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  InputAdornment,
  Button,
  Tooltip,
  TextField
} from '@material-ui/core';

import illustration1 from '../../../assets/images/illustrations/pack4/404.svg';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import projectLogo from '../../../assets/images/CTALogo.png';
export default function LivePreviewExample() {
  return (
    <>
      <div className="app-wrapper bg-white">
        <div className="app-main">
          <div className="app-content p-0">
            <div className="app-inner-content-layout--main">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content">
                  <div className="hero-wrapper bg-composed-wrapper min-vh-100">
                    <div className="flex-grow-1 w-100 d-flex align-items-center">
                      <Grid
                        item
                        lg={6}
                        md={9}
                        className="px-4 px-lg-0 mx-auto text-center text-black">
                        {/* <img
                          src={illustration1}
                          className="w-50 mx-auto d-block my-5 img-fluid"
                          alt="..."
                        /> */}
                        <img alt="CTA" className="w-50 mx-auto d-block my-5 img-fluid" src={projectLogo} width="200px" height="200px"/>

                        {/* <img
                          src={illustration1}
                          className="w-50 mx-auto d-block my-5 img-fluid"
                          alt="..."
                        />   */}

                        <h3 className="font-size-xxl line-height-sm font-weight-light d-block px-3 mb-3 text-black-50">
                          The page you were looking for doesn't exist.
                        </h3>
                        <p>
                          It's on us, we probably moved the content to a
                          different page.
                        </p>
                    
                      </Grid>
                    </div>
                    <div className="hero-footer py-4">
                      <Tooltip title="Facebook" arrow>
                        <Button
                          className="btn-link font-size-lg rounded-sm d-40 btn-icon text-facebook btn-animated-icon"
                         // href="#/"
                         onClick={() => {window.open('https://www.facebook.com/TheCentralTibetanAdministration/')}}>
                          <span className="btn-wrapper--icon d-flex">
                            <FontAwesomeIcon icon={['fab', 'facebook']} />
                          </span>
                        </Button>
                      </Tooltip>
                      <Tooltip title="Twitter" arrow>
                        <Button
                          className="btn-link font-size-lg rounded-sm d-40 btn-icon text-twitter btn-animated-icon"
                        //  href="#/"
                        onClick={() => {window.open('https://twitter.com/NetTibet')}}>
                          <span className="btn-wrapper--icon d-flex">
                            <FontAwesomeIcon icon={['fab', 'twitter']} />
                          </span>
                        </Button>
                      </Tooltip>
                      <Tooltip title="Google" arrow>
                        <Button
                          className="btn-link font-size-lg rounded-sm d-40 btn-icon text-google btn-animated-icon"
                          //href="#/"
                          onClick={() => {window.open('https://www.youtube.com/user/ctaonlinetv')}}>
                          <span className="btn-wrapper--icon d-flex">
                            <FontAwesomeIcon icon={['fab', 'youtube']} />
                          </span>
                        </Button>
                      </Tooltip>
                   
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
