import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Card, Button } from '@material-ui/core';

import stock1 from '../../../assets/images/stock-photos/stock-1.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="bg-light py-4">
        <Container className="py-3">
          <Card className="shadow-xxl overflow-visible">
            <div className="p-3 p-xl-5">
              <div className="d-flex flex-xl-row flex-column align-items-center">
                <div className="feature-box-img shadow-xxl p-4 p-xl-0 mb-5 mb-xl-0">
                  <img src={stock1} className="img-fluid" alt="..." />
                </div>
                <div className="pl-0 pl-xl-5 py-0 py-xl-2 text-center text-xl-left">
                  <div className="mb-4">
                    <div className="badge badge-pill badge-success">
                      New Release
                    </div>
                    <h1 className="display-4 mt-3 font-weight-bold">
                      You can build unlimited layout styles using any of the
                      500+ included components and elements. Powerful, unique
                      template built for React and Material-UI.
                    </h1>
                    <div className="my-4">
                      <Button
                        className="btn-primary mr-3 p-0 d-inline-block text-center d-50 btn-icon rounded"
                        title="Menu Example">
                        <FontAwesomeIcon icon={['far', 'building']} />
                      </Button>
                      <Button
                        className="btn-success mr-3 p-0 d-inline-block text-center d-50 btn-icon rounded"
                        title="Menu Example">
                        <FontAwesomeIcon icon={['far', 'keyboard']} />
                      </Button>
                      <Button
                        className="btn-danger p-0 d-inline-block text-center d-50 btn-icon rounded"
                        title="Menu Example">
                        <FontAwesomeIcon icon={['far', 'object-group']} />
                      </Button>
                    </div>
                    <p className="font-size-lg text-black-50">
                      Premium admin template powered by the most popular UI
                      components framework available for React: Material-UI.
                      Features hundreds of examples making web development fast
                      and easy. Start from one of the individual apps included
                      or from the general dashboard and build beautiful scalable
                      applications and presentation websites.
                    </p>
                  </div>
                  <div className="mb-4 mb-xl-0">
                    <Button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      size="large"
                      className="btn-primary d-flex d-sm-inline-flex">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['far', 'question-circle']} />
                      </span>
                      <span className="btn-wrapper--label">View Details</span>
                    </Button>
                    <Button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      size="large"
                      variant="text"
                      className="btn-outline-first d-flex d-sm-inline-flex ml-0 mt-3 mt-sm-0 ml-sm-3"
                      title="View documentation">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['far', 'question-circle']} />
                      </span>
                      <span className="btn-wrapper--label">Documentation</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </div>
    </>
  );
}
