import React, { Component } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Collapse,
  Grid,
  Card,
  Button,
  List,
  ListItem,
  Tooltip
} from '@material-ui/core';

import stock3 from '../../../assets/images/stock-photos/stock-3.jpg';
export default class LivePreviewExample extends Component {
  constructor(props) {
    super(props);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.state = {
      accordion: [true, false, false]
    };
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state
    });
  }

  render() {
    return (
      <>
        <div className="accordion mb-5">
          <Card
            className={clsx('card-box', {
              'panel-open': this.state.accordion[0]
            })}>
            <Card>
              <div className="card-header">
                <div className="panel-title">
                  <div className="accordion-toggle">
                    <Button
                      variant="text"
                      size="large"
                      className="btn-link d-flex align-items-center justify-content-between btn-transition-none"
                      onClick={() => this.toggleAccordion(0)}
                      aria-expanded={this.state.accordion[0]}>
                      <span>Latest blog posts</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-up']}
                        className="font-size-xl accordion-icon"
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <Collapse in={this.state.accordion[0]}>
                <List component="div" className="list-group-flush">
                  <ListItem className="py-4 d-block">
                    <div className="d-flex flex-column flex-sm-row align-items-start">
                      <div>
                        <Card className="card-transparent mb-3 mb-sm-0">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="card-img-wrapper rounded">
                            <div className="img-wrapper-overlay">
                              <div className="overlay-btn-wrapper">
                                <div className="rounded-circle d-40 mx-auto d-flex align-items-center justify-content-center">
                                  <FontAwesomeIcon
                                    icon={['fas', 'plus-circle']}
                                    className="font-size-lg"
                                  />
                                </div>
                              </div>
                            </div>
                            <img
                              alt="..."
                              className="card-img-top rounded"
                              src={stock3}
                              style={{ width: 170 }}
                            />
                          </a>
                        </Card>
                      </div>
                      <div className="pl-0 pl-sm-4">
                        <div className="mb-3 font-size-xxl font-weight-bold">
                          <a href="#/" onClick={(e) => e.preventDefault()}>
                            Bamburgh React Admin Dashboard with Material-UI PRO
                          </a>
                        </div>
                        <div className="d-flex font-size-sm mb-3 opacity-7 align-items-center">
                          <FontAwesomeIcon
                            icon={['far', 'clock']}
                            className="mr-2"
                          />
                          <span>17 May 2020</span>
                        </div>
                        <p className="font-size-lg text-black-50">
                          Premium admin template powered by the most popular UI
                          components framework available for React: Material-UI.
                          Features hundreds of examples making web development
                          fast and easy. Start from one of the individual apps
                          included or from the general dashboard and build
                          beautiful scalable applications and presentation
                          websites.
                        </p>
                        <div className="mt-3">
                          <Button
                            className="btn-primary btn-pill px-4 hover-scale-sm"
                            size="small"
                            href="#/"
                            onClick={(e) => e.preventDefault()}>
                            Learn more
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ListItem>
                  <ListItem className="d-block text-center py-4">
                    <Tooltip title="Facebook" arrow placement="top">
                      <Button className="btn-facebook btn-icon d-40 p-0 hover-scale-lg rounded-circle">
                        <FontAwesomeIcon
                          icon={['fab', 'facebook']}
                          className="font-size-lg"
                        />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Dribbble" arrow placement="top">
                      <Button className="btn-dribbble btn-icon d-40 p-0 hover-scale-lg rounded-circle mx-2">
                        <FontAwesomeIcon
                          icon={['fab', 'dribbble']}
                          className="font-size-lg"
                        />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Twitter" arrow placement="top">
                      <Button className="btn-twitter btn-icon d-40 p-0 hover-scale-lg rounded-circle">
                        <FontAwesomeIcon
                          icon={['fab', 'twitter']}
                          className="font-size-lg"
                        />
                      </Button>
                    </Tooltip>
                  </ListItem>
                </List>
              </Collapse>
            </Card>
          </Card>
          <Card
            className={clsx('card-box', {
              'panel-open': this.state.accordion[1]
            })}>
            <Card>
              <div className="card-header">
                <div className="panel-title">
                  <div className="accordion-toggle">
                    <Button
                      variant="text"
                      size="large"
                      className="btn-link d-flex align-items-center justify-content-between btn-transition-none"
                      onClick={() => this.toggleAccordion(1)}
                      aria-expanded={this.state.accordion[1]}>
                      <span>Chart boxes</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-up']}
                        className="font-size-xl accordion-icon"
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <Collapse in={this.state.accordion[1]}>
                <Grid container spacing={0} className="mt-3">
                  <Grid item sm={6}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'user']}
                          className="font-size-xxl text-success"
                        />
                      </div>
                      <div className="mt-2 line-height-sm">
                        <b className="font-size-lg">2,345</b>
                        <span className="text-black-50 d-block">users</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={6}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'chart-bar']}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="mt-2 line-height-sm">
                        <b className="font-size-lg">$9,693</b>
                        <span className="text-black-50 d-block">revenue</span>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <div className="divider my-3" />
                <div className="text-center mb-3">
                  <Button
                    className="btn-primary btn-icon m-3 p-0 d-inline-flex align-items-center justify-content-center text-center font-size-xxl d-70 rounded"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={['fas', 'lemon']} />
                  </Button>
                  <Button
                    className="btn-success btn-icon m-3 p-0 d-inline-flex align-items-center justify-content-center text-center font-size-xxl d-70 rounded"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={['far', 'object-group']} />
                  </Button>
                  <Button
                    className="btn-danger btn-icon m-3 p-0 d-inline-flex align-items-center justify-content-center text-center font-size-xxl d-70 rounded"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={['far', 'keyboard']} />
                  </Button>
                </div>
              </Collapse>
            </Card>
          </Card>
          <Card
            className={clsx('card-box', {
              'panel-open': this.state.accordion[2]
            })}>
            <Card>
              <div className="card-header">
                <div className="panel-title">
                  <div className="accordion-toggle">
                    <Button
                      variant="text"
                      size="large"
                      className="btn-link d-flex align-items-center justify-content-between btn-transition-none"
                      onClick={() => this.toggleAccordion(2)}
                      aria-expanded={this.state.accordion[2]}>
                      <span>Statistics blocks</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-up']}
                        className="font-size-xl accordion-icon"
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <Collapse in={this.state.accordion[2]}>
                <div className="grid-menu grid-menu-2col">
                  <Grid container spacing={0}>
                    <Grid item sm={6}>
                      <Button
                        className="d-block btn-link p-4 w-100"
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="align-box-row align-items-start">
                          <div className="mr-3">
                            <div className="bg-love-kiss text-center text-white font-size-xl d-50 rounded-circle">
                              <FontAwesomeIcon icon={['fas', 'save']} />
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="font-weight-bold">
                              <small className="text-black-50 d-block mb-1 text-uppercase">
                                New Accounts
                              </small>
                              <span className="font-size-xxl mt-1">
                                586,356
                              </span>
                            </div>
                            <div className="mt-1">
                              <FontAwesomeIcon
                                icon={['fas', 'arrow-up']}
                                className="text-success"
                              />
                              <span className="text-success px-1">15.4%</span>
                              <span className="text-black-50">increase</span>
                            </div>
                          </div>
                          <div className="ml-auto card-hover-indicator align-self-center">
                            <FontAwesomeIcon
                              icon={['fas', 'chevron-right']}
                              className="font-size-xl"
                            />
                          </div>
                        </div>
                      </Button>
                    </Grid>
                    <Grid item sm={6}>
                      <Button
                        className="d-block btn-link p-4 w-100"
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        <div className="align-box-row align-items-start">
                          <div className="mr-3">
                            <div className="bg-happy-fisher text-center text-white font-size-xl d-50 rounded-circle">
                              <FontAwesomeIcon icon={['far', 'building']} />
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="font-weight-bold">
                              <small className="text-black-50 d-block mb-1 text-uppercase">
                                Sales
                              </small>
                              <span className="font-size-xxl mt-1">23,274</span>
                            </div>
                            <div className="mt-1">
                              <FontAwesomeIcon
                                icon={['fas', 'arrow-up']}
                                className="text-warning"
                              />
                              <span className="text-warning px-1">7.4%</span>
                              <span className="text-black-50">more sales</span>
                            </div>
                          </div>
                          <div className="ml-auto card-hover-indicator align-self-center">
                            <FontAwesomeIcon
                              icon={['fas', 'chevron-right']}
                              className="font-size-xl"
                            />
                          </div>
                        </div>
                      </Button>
                    </Grid>
                  </Grid>
                </div>
                <div className="card-footer d-block text-center">
                  <Button
                    className="btn-primary btn-icon m-3 border-0 p-0 shadow-sm bg-sunny-morning d-inline-block text-center text-white font-size-xxl d-70 rounded"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={['fas', 'lemon']} />
                  </Button>

                  <Button
                    className="btn-primary btn-icon m-3 border-0 p-0 shadow-sm bg-strong-bliss d-inline-block text-center text-white font-size-xxl d-70 rounded"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={['far', 'object-group']} />
                  </Button>

                  <Button
                    className="btn-primary btn-icon m-3 border-0 p-0 shadow-sm bg-night-sky d-inline-block text-center text-white font-size-xxl d-70 rounded"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={['far', 'building']} />
                  </Button>
                </div>
              </Collapse>
            </Card>
          </Card>
        </div>
      </>
    );
  }
}
