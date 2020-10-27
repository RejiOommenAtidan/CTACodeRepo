import React, { Component } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Collapse,
  Card,
  CardContent,
  Button,
  List,
  ListItem
} from '@material-ui/core';

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
                      <span>Navigation menu</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-up']}
                        className="font-size-xl accordion-icon"
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <Collapse in={this.state.accordion[0]}>
                <div className="bg-composed-wrapper bg-asteroid">
                  <div className="bg-composed-wrapper--image bg-composed-img-2" />
                  <div className="bg-composed-wrapper--content text-light p-4">
                    <h5 className="mb-1">Navigation</h5>
                    <p className="mb-0 opacity-7">
                      This is a composed background
                    </p>
                  </div>
                </div>
                <List component="div" className="list-group-flush">
                  <ListItem
                    button
                    className="align-items-center d-flex list-group-item-action pl-3"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon
                      icon={['far', 'user']}
                      className="nav-icon-wrapper text-primary font-size-lg mr-2"
                    />
                    <span>My profile</span>
                  </ListItem>
                  <ListItem
                    button
                    className="align-items-center d-flex list-group-item-action pl-3"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon
                      icon={['far', 'bell']}
                      className="nav-icon-wrapper text-info font-size-lg mr-2"
                    />
                    <span>Notifications</span>
                  </ListItem>
                  <ListItem
                    button
                    className="align-items-center d-flex list-group-item-action pl-3"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon
                      icon={['fas', 'award']}
                      className="nav-icon-wrapper text-danger font-size-lg mr-2"
                    />
                    <span>Awards</span>
                    <div className="badge badge-danger ml-auto">29</div>
                  </ListItem>
                  <ListItem
                    button
                    className="align-items-center d-flex list-group-item-action pl-3"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon
                      icon={['far', 'calendar-alt']}
                      className="nav-icon-wrapper text-success font-size-lg mr-2"
                    />
                    <span>Events</span>
                    <div className="badge badge-info ml-auto">48</div>
                  </ListItem>
                  <ListItem
                    button
                    className="align-items-center d-flex list-group-item-action pl-3"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon
                      icon={['fas', 'sliders-h']}
                      className="nav-icon-wrapper text-warning font-size-lg mr-2"
                    />
                    <span>Account settings</span>
                  </ListItem>
                </List>
                <div className="divider" />
                <CardContent className="d-block text-center">
                  <Button
                    size="small"
                    className="btn-primary"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['fas', 'lemon']} />
                    </span>
                    <span className="btn-wrapper--label">Details</span>
                  </Button>
                </CardContent>
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
                      <span>List blocks</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-up']}
                        className="font-size-xl accordion-icon"
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <Collapse in={this.state.accordion[1]}>
                <List component="div" className="list-group-flush">
                  <ListItem className="py-4 d-block">
                    <div className="d-flex align-items-center flex-column flex-sm-row">
                      <div>
                        <div className="bg-premium-dark text-center text-white font-size-xl btn-icon d-50 rounded-circle mb-3 mb-sm-0">
                          <FontAwesomeIcon icon={['far', 'lightbulb']} />
                        </div>
                      </div>
                      <div className="pl-0 pl-sm-3">
                        <div className="d-block text-center d-sm-flex align-items-center">
                          <span className="font-size-lg">Business</span>
                          <div className="badge badge-neutral-info text-info ml-2">
                            New
                          </div>
                        </div>
                        <p className="text-black-50 mb-0">
                          Grow familiar with the countless...
                        </p>
                      </div>
                      <div className="mt-3 mt-sm-0 ml-sm-auto">
                        <Button
                          size="small"
                          variant="text"
                          className="btn-icon d-40 p-0 btn-pill btn-outline-second btn-animated-icon">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['far', 'comment-dots']} />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </ListItem>
                  <ListItem className="py-4 d-block">
                    <div className="d-flex align-items-center flex-column flex-sm-row">
                      <div>
                        <div className="bg-warning text-center text-white font-size-xl btn-icon d-50 rounded-circle mb-3 mb-sm-0">
                          <FontAwesomeIcon icon={['far', 'eye']} />
                        </div>
                      </div>
                      <div className="pl-0 pl-sm-3">
                        <div className="d-block text-center d-sm-flex align-items-center">
                          <span className="font-size-lg">Images</span>
                        </div>
                        <p className="text-black-50 mb-0">
                          Absorbed in the exquisite sense...
                        </p>
                      </div>
                      <div className="mt-3 mt-sm-0 ml-sm-auto">
                        <Button
                          size="small"
                          variant="text"
                          className="btn-icon d-40 p-0 btn-pill btn-outline-animated-icon btn-outline-warning">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['far', 'object-group']} />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </ListItem>
                  <ListItem className="py-4 d-block">
                    <div className="d-flex align-items-center flex-column flex-sm-row">
                      <div>
                        <div className="bg-white border-primary border-2 text-center text-primary font-size-xl d-50 rounded-circle mb-3 mb-sm-0">
                          <FontAwesomeIcon icon={['fas', 'lemon']} />
                        </div>
                      </div>
                      <div className="pl-0 pl-sm-3">
                        <div className="d-block text-center d-sm-flex align-items-center">
                          <span className="font-size-lg">Finance</span>
                        </div>
                        <p className="text-black-50 mb-0">
                          A wonderful serenity has taken ...
                        </p>
                      </div>
                      <div className="mt-3 mt-sm-0 ml-sm-auto">
                        <Button
                          size="small"
                          variant="text"
                          className="btn-icon d-40 p-0 btn-pill btn-outline-animated-icon btn-icon d-40 p-0 btn-pill btn-outline-primary">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['fas', 'lemon']} />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </ListItem>
                  <ListItem className="py-4 d-block">
                    <div className="d-flex align-items-center flex-column flex-sm-row">
                      <div>
                        <div className="bg-premium-dark text-center text-white font-size-xl btn-icon d-50 rounded-circle mb-3 mb-sm-0">
                          <FontAwesomeIcon icon={['far', 'lightbulb']} />
                        </div>
                      </div>
                      <div className="pl-0 pl-sm-3">
                        <div className="d-block text-center d-sm-flex align-items-center">
                          <span className="font-size-lg">Business</span>
                          <div className="badge badge-neutral-info text-info ml-2">
                            New
                          </div>
                        </div>
                        <p className="text-black-50 mb-0">
                          Grow familiar with the countless...
                        </p>
                      </div>
                      <div className="mt-3 mt-sm-0 ml-sm-auto">
                        <Button
                          size="small"
                          variant="text"
                          className="btn-icon d-40 p-0 btn-pill btn-outline-second btn-animated-icon">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['far', 'comment-dots']} />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </ListItem>
                  <ListItem className="py-4 d-block">
                    <div className="d-flex align-items-center flex-column flex-sm-row">
                      <div>
                        <div className="bg-warning text-center text-white font-size-xl btn-icon d-50 rounded-circle mb-3 mb-sm-0">
                          <FontAwesomeIcon icon={['far', 'eye']} />
                        </div>
                      </div>
                      <div className="pl-0 pl-sm-3">
                        <div className="d-block text-center d-sm-flex align-items-center">
                          <span className="font-size-lg">Images</span>
                        </div>
                        <p className="text-black-50 mb-0">
                          Absorbed in the exquisite sense...
                        </p>
                      </div>
                      <div className="mt-3 mt-sm-0 ml-sm-auto">
                        <Button
                          size="small"
                          variant="text"
                          className="btn-icon d-40 p-0 btn-pill btn-outline-animated-icon btn-outline-warning">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['far', 'object-group']} />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </ListItem>
                </List>
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
                      <span>Alternate navs</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-up']}
                        className="font-size-xl accordion-icon"
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <Collapse in={this.state.accordion[2]}>
                <List component="div" className="list-group-flush">
                  <ListItem
                    button
                    className="list-group-item-action align-box-row"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon
                      icon={['far', 'file-excel']}
                      className="text-success font-size-lg mr-3"
                    />
                    <div>
                      <div>Excel_doc.csv</div>
                    </div>
                    <div className="ml-auto">
                      <FontAwesomeIcon
                        icon={['fas', 'caret-right']}
                        className="text-black-50"
                      />
                    </div>
                  </ListItem>
                  <ListItem
                    button
                    className="list-group-item-action align-box-row"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon
                      icon={['far', 'file-archive']}
                      className="text-warning font-size-lg mr-3"
                    />
                    <div>Archive_docs.zip</div>
                    <div className="ml-auto">
                      <FontAwesomeIcon
                        icon={['fas', 'caret-right']}
                        className="text-black-50"
                      />
                    </div>
                  </ListItem>
                  <ListItem
                    button
                    className="list-group-item-action align-box-row"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <div>
                      <FontAwesomeIcon
                        icon={['far', 'file-pdf']}
                        className="text-danger font-size-lg mr-3"
                      />
                      Adobe_file.pdf
                      <div className="badge badge-info ml-2">New</div>
                    </div>
                    <div className="ml-auto">
                      <FontAwesomeIcon
                        icon={['fas', 'caret-right']}
                        className="text-black-50"
                      />
                    </div>
                  </ListItem>
                  <ListItem
                    button
                    className="list-group-item-action align-box-row"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <div>
                      <FontAwesomeIcon
                        icon={['far', 'file-word']}
                        className="text-first font-size-lg mr-3"
                      />
                      Word_file.docx
                    </div>
                    <div className="ml-auto">
                      <FontAwesomeIcon
                        icon={['fas', 'caret-right']}
                        className="text-black-50"
                      />
                    </div>
                  </ListItem>
                </List>
              </Collapse>
            </Card>
          </Card>
        </div>
      </>
    );
  }
}
