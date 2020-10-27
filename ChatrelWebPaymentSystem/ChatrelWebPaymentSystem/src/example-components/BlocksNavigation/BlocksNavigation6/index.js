import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button, List, ListItem, Tooltip } from '@material-ui/core';

import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
import avatar5 from '../../../assets/images/avatars/avatar5.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={6} lg={12} xl={6}>
          <Card className="shadow-xxl pt-4 mb-5">
            <div className="card-tr-actions">
              <Tooltip title="Send Message" placement="top" arrow>
                <Button
                  size="small"
                  className="btn-neutral-warning d-40 btn-icon p-0">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['far', 'envelope']} />
                  </span>
                </Button>
              </Tooltip>
            </div>
            <div className="text-center">
              <div className="avatar-icon-wrapper rounded-circle m-0">
                <div className="d-block p-0 avatar-icon-wrapper m-0 d-90">
                  <div className="rounded-circle overflow-hidden">
                    <img alt="..." className="img-fluid" src={avatar4} />
                  </div>
                </div>
              </div>
              <h3 className="font-weight-bold mt-3">Leopold Magana</h3>
              <div className="badge badge-neutral-warning mt-1 mb-3 text-warning font-size-xs px-4 py-1 h-auto">
                Idle for 5 minutes
              </div>
              <div className="mt-3 rounded mx-4 bg-night-sky p-3">
                <Tooltip title="Discord">
                  <Button className="btn-discord btn-pill d-50 m-2 p-0">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'discord']}
                        className="font-size-lg"
                      />
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip title="Instagram" arrow>
                  <Button className="btn-instagram btn-pill d-50 m-2 p-0">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'instagram']}
                        className="font-size-lg"
                      />
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip title="Google" arrow>
                  <Button className="btn-google btn-pill d-50 m-2 p-0">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'google']}
                        className="font-size-lg"
                      />
                    </span>
                  </Button>
                </Tooltip>
              </div>
              <List
                component="div"
                className="nav-neutral-first nav-lg flex-column p-4">
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="rounded font-weight-bold">
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'chart-bar']} />
                  </div>
                  <span>Services</span>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="rounded font-weight-bold"
                  selected>
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'question-circle']} />
                  </div>
                  <span>Layouts</span>
                  <div className="badge badge-warning ml-auto">512</div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="rounded font-weight-bold"
                  disabled>
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'user-circle']} />
                  </div>
                  <span>Reports</span>
                </ListItem>

                <div className="divider" />

                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="rounded font-weight-bold">
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'object-group']} />
                  </div>
                  <span>Components</span>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="rounded font-weight-bold">
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'chart-bar']} />
                  </div>
                  <span>Services</span>
                </ListItem>
              </List>
            </div>
          </Card>
        </Grid>
        <Grid item md={6} lg={12} xl={6}>
          <Card className="shadow-xxl pt-4 mb-5">
            <div className="card-tr-actions">
              <Tooltip title="Send Message" placement="top" arrow>
                <Button size="small" className="btn-danger d-40 btn-icon p-0">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['far', 'envelope']} />
                  </span>
                </Button>
              </Tooltip>
            </div>
            <div className="text-center">
              <div className="avatar-icon-wrapper rounded-circle m-0">
                <div className="d-block p-0 avatar-icon-wrapper m-0 d-90">
                  <div className="rounded-circle overflow-hidden">
                    <img alt="..." className="img-fluid" src={avatar5} />
                  </div>
                </div>
              </div>
              <h3 className="font-weight-bold mt-3">Boyd Hardin</h3>
              <div className="badge badge-neutral-danger mt-1 mb-4 text-danger font-size-xs px-4 py-1 h-auto">
                Offline
              </div>
              <p className="mb-0 font-size-lg text-black-50">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>
              <div className="py-3">
                <Tooltip title="Github">
                  <Button className="btn-github btn-pill d-50 m-2 p-0">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'github']}
                        className="font-size-lg"
                      />
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip title="Instagram" arrow>
                  <Button className="btn-instagram btn-pill d-50 m-2 p-0">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'instagram']}
                        className="font-size-lg"
                      />
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip title="Google" arrow>
                  <Button className="btn-google btn-pill d-50 m-2 p-0">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'google']}
                        className="font-size-lg"
                      />
                    </span>
                  </Button>
                </Tooltip>
              </div>
              <div className="divider" />
              <List
                component="div"
                className="nav-neutral-primary nav-pills nav-pills-rounded nav-lg font-weight-bold flex-column py-3 px-3">
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <div className="nav-link-icon opacity-6 mr-2">
                    <FontAwesomeIcon
                      icon={['far', 'keyboard']}
                      className="mx-auto"
                    />
                  </div>
                  <span>My Account</span>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  selected>
                  <div className="nav-link-icon opacity-6 mr-2">
                    <FontAwesomeIcon
                      icon={['far', 'object-group']}
                      className="mx-auto"
                    />
                  </div>
                  <span>Profile settings</span>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <div className="nav-link-icon opacity-6 mr-2">
                    <FontAwesomeIcon
                      icon={['far', 'user-circle']}
                      className="mx-auto"
                    />
                  </div>
                  <span>Active tasks</span>
                  <div className="badge badge-pill badge-success ml-auto">
                    New
                  </div>
                </ListItem>

                <ListItem className="px-4 text-left font-size-sm text-uppercase mt-4 mb-2 font-weight-bold text-black nav-item--header">
                  <span>Other items</span>
                </ListItem>

                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <div className="nav-link-icon opacity-6 mr-2">
                    <FontAwesomeIcon
                      icon={['far', 'building']}
                      className="mx-auto"
                    />
                  </div>
                  <span>Customers</span>
                </ListItem>

                <div className="divider" />

                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <div className="nav-link-icon opacity-6 mr-2">
                    <FontAwesomeIcon
                      icon={['far', 'eye']}
                      className="mx-auto"
                    />
                  </div>
                  <span>Statistics</span>
                </ListItem>
              </List>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
