import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  LinearProgress,
  Card,
  CardContent,
  Button,
  List,
  ListItem
} from '@material-ui/core';

import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box">
        <List component="div" className="list-group-flush">
          <ListItem className="p-0 d-block bg-transparent">
            <div className="card-header bg-light">
              <div className="font-size-lg d-block text-truncate">
                <span className="text-black-50 pr-2">#34</span> Hackathon
              </div>
              <div className="ml-auto d-flex align-items-center align-content-center">
                <div className="avatar-wrapper-overlap">
                  <div className="avatar-icon-wrapper" title="Rodrigo Barrera">
                    <div className="avatar-icon">
                      <img alt="..." src={avatar1} />
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper" title="Tobi Esparza">
                    <div className="avatar-icon">
                      <img alt="..." src={avatar6} />
                    </div>
                  </div>
                </div>

                <Button className="btn-first ml-3 d-40 btn-icon p-0 rounded-circle border-0">
                  <FontAwesomeIcon icon={['fas', 'plus']} />
                </Button>
              </div>
            </div>
            <CardContent>
              <Grid container spacing={0}>
                <Grid item lg={6} md={3}>
                  <div className="text-center">
                    <span className="text-black-50 d-block">Users</span>
                    <b className="font-size-xxl">2,345</b>
                  </div>
                </Grid>
                <Grid item lg={6} md={3}>
                  <div className="text-center">
                    <span className="text-black-50 d-block">Revenue</span>
                    <b className="font-size-xxl">$9,693</b>
                  </div>
                </Grid>
                <Grid item lg={12} md={6} className="align-box-row">
                  <div className="w-100 mt-3 mt-md-0">
                    <div className="mb-1 d-flex justify-content-between align-items-center">
                      <span className="text-black-50 pr-1">Progress:</span>
                      <span className="text-danger font-weight-bold font-size-sm">
                        100%
                      </span>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={43}
                      className="progress-bar-danger progress-sm progress-bar-rounded progress-animated-alt progress-bar-animated-alt"
                    />
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </ListItem>
          <ListItem className="p-0 d-block bg-transparent">
            <div className="card-header rounded-0 bg-light">
              <div className="font-size-lg d-block text-truncate">
                <span className="text-black-50 pr-2">#33</span> Gaming center
              </div>
              <div className="ml-auto d-flex align-items-center align-content-center">
                <div className="avatar-wrapper-overlap">
                  <div className="avatar-icon-wrapper" title="Karson Kline">
                    <div className="avatar-icon">
                      <img alt="..." src={avatar7} />
                    </div>
                  </div>
                </div>
                <Button className="btn-first ml-3 d-40 btn-icon p-0 rounded-circle border-0">
                  <FontAwesomeIcon icon={['fas', 'plus']} />
                </Button>
              </div>
            </div>
            <CardContent>
              <Grid container spacing={0}>
                <Grid item lg={6} md={3}>
                  <div className="text-center">
                    <span className="text-black-50 d-block">Users</span>
                    <b className="font-size-xxl">1,466</b>
                  </div>
                </Grid>
                <Grid item lg={6} md={3}>
                  <div className="text-center">
                    <span className="text-black-50 d-block">Revenue</span>
                    <b className="font-size-xxl text-danger">$6,465</b>
                  </div>
                </Grid>
                <Grid item lg={12} md={6} className="align-box-row">
                  <div className="w-100 mt-3 mt-md-0">
                    <div className="mb-1 d-flex justify-content-between align-items-center">
                      <span className="text-black-50 pr-1">Progress:</span>
                      <span className="text-warning font-weight-bold font-size-sm">
                        100%
                      </span>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={76}
                      className="progress-bar-warning progress-sm progress-bar-rounded progress-animated-alt progress-bar-animated-alt"
                    />
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </ListItem>
          <ListItem className="p-0 d-block bg-transparent">
            <div className="card-header rounded-0 bg-light">
              <div className="font-size-lg d-block text-truncate">
                <span className="text-black-50 pr-2">#34</span> Hackathon
              </div>
              <div className="ml-auto d-flex align-items-center align-content-center">
                <div className="avatar-wrapper-overlap">
                  <div className="avatar-icon-wrapper" title="Rodrigo Barrera">
                    <div className="avatar-icon">
                      <img alt="..." src={avatar1} />
                    </div>
                  </div>
                  <div className="avatar-icon-wrapper" title="Tobi Esparza">
                    <div className="avatar-icon">
                      <img alt="..." src={avatar6} />
                    </div>
                  </div>
                </div>

                <Button className="btn-first ml-3 d-40 btn-icon p-0 rounded-circle border-0">
                  <FontAwesomeIcon icon={['fas', 'plus']} />
                </Button>
              </div>
            </div>
            <CardContent>
              <Grid container spacing={6}>
                <Grid item md={6}>
                  <div>
                    <span className="font-size-xl font-weight-bold">73%</span>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={73}
                    className="progress-bar-rounded progress-sm mb-2 progress-bar-success"
                  />
                  <div className="text-dark">Orders</div>
                </Grid>
                <Grid item md={6}>
                  <div>
                    <span className="font-size-xl font-weight-bold">87%</span>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={87}
                    className="progress-bar-warning progress-bar-rounded progress-sm mb-2"
                  />
                  <div className="text-dark">Products</div>
                </Grid>
              </Grid>
            </CardContent>
          </ListItem>
        </List>
      </Card>
    </>
  );
}
