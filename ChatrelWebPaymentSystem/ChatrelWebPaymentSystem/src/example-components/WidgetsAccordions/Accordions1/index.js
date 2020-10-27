import React, { Component } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse, Card, Button } from '@material-ui/core';

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
        <div className="accordion mb-spacing-6-x2">
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
                      className="btn-link font-weight-bold d-flex align-items-center justify-content-between btn-transition-none"
                      onClick={() => this.toggleAccordion(0)}
                      aria-expanded={this.state.accordion[0]}>
                      <span>Accordion heading 1</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-up']}
                        className="font-size-xl accordion-icon"
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <Collapse in={this.state.accordion[0]}>
                <div className="p-4">
                  This is just some content to illustrate fancy headings.
                </div>
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
                      className="btn-link font-weight-bold d-flex align-items-center justify-content-between btn-transition-none"
                      onClick={() => this.toggleAccordion(1)}
                      aria-expanded={this.state.accordion[1]}>
                      <span>Accordion heading 2</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-up']}
                        className="font-size-xl accordion-icon"
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <Collapse in={this.state.accordion[1]}>
                <div className="p-4">
                  This is just some content to illustrate fancy headings.
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
                      className="btn-link font-weight-bold d-flex align-items-center justify-content-between btn-transition-none"
                      onClick={() => this.toggleAccordion(2)}
                      aria-expanded={this.state.accordion[2]}>
                      <span>Accordion heading 3</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-up']}
                        className="font-size-xl accordion-icon"
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <Collapse in={this.state.accordion[2]}>
                <div className="p-4">
                  This is just some content to illustrate fancy headings.
                </div>
              </Collapse>
            </Card>
          </Card>
        </div>
      </>
    );
  }
}
