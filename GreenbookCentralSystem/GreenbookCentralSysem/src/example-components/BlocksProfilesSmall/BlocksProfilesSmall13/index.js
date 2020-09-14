import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button, Tooltip } from '@material-ui/core';

import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../../assets/images/avatars/avatar3.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item lg={6}>
          <Card className="card-box p-4 bg-night-sky text-white">
            <div className="card-tr-actions">
              <Button className="btn-link btn-link-white p-0 font-size-xl text-white opacity-8">
                <FontAwesomeIcon
                  icon={['fas', 'ellipsis-h']}
                  className="font-size-lg"
                />
              </Button>
            </div>
            <div className="text-center">
              <div className="avatar-icon-wrapper rounded-circle m-0">
                <div className="d-block p-0 avatar-icon-wrapper m-0 d-90">
                  <div className="rounded-circle overflow-hidden">
                    <img alt="..." className="img-fluid" src={avatar2} />
                  </div>
                </div>
              </div>
              <h3 className="font-weight-bold mt-3">Akeem Griffith</h3>
              <div className="badge badge-warning mt-1 mb-4 font-size-xs px-4 py-1 h-auto">
                Pending
              </div>
              <p className="mb-0 text-white-50">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>
              <div className="pt-3">
                <Tooltip title="Github">
                  <Button className="btn-secondary btn-pill d-50 m-2 p-0 shadow-none text-github">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'github']}
                        className="font-size-lg"
                      />
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip title="Instagram" arrow>
                  <Button className="btn-secondary btn-pill d-50 m-2 p-0 shadow-none text-instagram">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'instagram']}
                        className="font-size-lg"
                      />
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip title="Google" arrow>
                  <Button className="btn-secondary btn-pill d-50 m-2 p-0 shadow-none text-google">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'google']}
                        className="font-size-lg"
                      />
                    </span>
                  </Button>
                </Tooltip>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item lg={6}>
          <Card className="card-box bg-midnight-bloom text-white p-4">
            <div className="card-tr-actions">
              <Button className="btn-link btn-link-white p-0 font-size-xl text-white opacity-8">
                <FontAwesomeIcon
                  icon={['fas', 'ellipsis-h']}
                  className="font-size-lg"
                />
              </Button>
            </div>
            <div className="text-center">
              <div className="avatar-icon-wrapper rounded-circle m-0">
                <div className="d-block p-0 avatar-icon-wrapper m-0 d-90">
                  <div className="rounded-circle overflow-hidden">
                    <img alt="..." className="img-fluid" src={avatar3} />
                  </div>
                </div>
              </div>
              <h3 className="font-weight-bold mt-3">Abigayle Hicks</h3>
              <div className="badge badge-danger mt-1 mb-4 font-size-xs px-4 py-1 h-auto">
                Offline
              </div>
              <p className="mb-0 text-white-50">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>
              <div className="pt-3">
                <Tooltip title="Github">
                  <Button className="btn-secondary btn-pill d-50 m-2 p-0 shadow-none text-github">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'github']}
                        className="font-size-lg"
                      />
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip title="Instagram" arrow>
                  <Button className="btn-secondary btn-pill d-50 m-2 p-0 shadow-none text-instagram">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'instagram']}
                        className="font-size-lg"
                      />
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip title="Google" arrow>
                  <Button className="btn-secondary btn-pill d-50 m-2 p-0 shadow-none text-google">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'google']}
                        className="font-size-lg"
                      />
                    </span>
                  </Button>
                </Tooltip>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
