import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, List, ListItem } from '@material-ui/core';

import logo1 from '../../../assets/images/stock-logos/coinbase.svg';
import logo2 from '../../../assets/images/stock-logos/netflix.svg';
import logo3 from '../../../assets/images/stock-logos/slack.svg';
import Rating from '@material-ui/lab/Rating';

export default function LivePreviewExample() {
  const [value1, setValue1] = useState(2);
  const [value2, setValue2] = useState(3);
  const [value3, setValue3] = useState(4);
  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={4} lg={12} xl={4}>
          <Card>
            <div className="text-center pt-4 pb-3">
              <img
                alt="..."
                className="img-fluid mt-2 mx-auto"
                style={{ height: '40px' }}
                src={logo1}
              />

              <div className="pt-3 mx-auto font-size-xl">
                <Rating
                  name="rating-1"
                  value={value1}
                  onChange={(event, newValue1) => {
                    setValue1(newValue1);
                  }}
                />
              </div>

              <p className="font-size-lg text-dark px-3 my-4">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>

              <List
                component="div"
                className="nav-pills nav-neutral-second nav-pills-rounded nav-lg flex-column px-4">
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="px-4">
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'building']} />
                  </div>
                  <span>Dashboard</span>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="px-4"
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
                  className="px-4"
                  disabled>
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'user-circle']} />
                  </div>
                  <span>Reports</span>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="px-4">
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'object-group']} />
                  </div>
                  <span>Components</span>
                </ListItem>
              </List>
            </div>
          </Card>
        </Grid>
        <Grid item md={4} lg={12} xl={4}>
          <Card>
            <div className="text-center pt-4 pb-3">
              <img
                alt="..."
                className="img-fluid mt-2 mx-auto"
                style={{ height: '40px' }}
                src={logo2}
              />

              <div className="pt-3 mx-auto font-size-xl">
                <Rating
                  name="rating-2"
                  value={value2}
                  onChange={(event, newValue2) => {
                    setValue2(newValue2);
                  }}
                />
              </div>

              <p className="font-size-lg text-dark px-3 my-4">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>

              <List
                component="div"
                className="nav-pills nav-neutral-first nav-lg nav-alt flex-column pr-3">
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="bl-0 pl-4 rounded-pill"
                  selected>
                  <span>Analytics</span>
                  <div className="ml-auto">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="bl-0 pl-4 rounded-pill">
                  <span>Reports Management</span>
                  <div className="ml-auto">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="bl-0 pl-4 rounded-pill">
                  <span>Real Estate</span>
                  <div className="ml-auto">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="bl-0 pl-4 rounded-pill">
                  <span>Server Status</span>
                  <div className="ml-auto">
                    <div className="badge badge-danger mr-3">23</div>
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                </ListItem>
              </List>
            </div>
          </Card>
        </Grid>
        <Grid item md={4} lg={12} xl={4}>
          <Card>
            <div className="text-center pt-4 pb-3">
              <img
                alt="..."
                className="img-fluid mt-2 mx-auto"
                style={{ height: '40px' }}
                src={logo3}
              />

              <div className="pt-3 mx-auto font-size-xl">
                <Rating
                  name="rating-3"
                  value={value3}
                  onChange={(event, newValue3) => {
                    setValue3(newValue3);
                  }}
                />
              </div>

              <p className="font-size-lg text-dark px-3 my-4">
                View any of the 5+ live previews we&#39;ve set up to learn why
                this dashboard template is the last one you&#39;ll ever need!
              </p>

              <List
                component="div"
                className="nav-neutral-danger nav-pills nav-lg flex-column px-4">
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="rounded-sm px-4">
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'building']} />
                  </div>
                  <span>Dashboard</span>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="rounded-sm px-4"
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
                  className="rounded-sm px-4"
                  disabled>
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'user-circle']} />
                  </div>
                  <span>Reports</span>
                </ListItem>
                <ListItem
                  component="a"
                  button
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="rounded-sm px-4">
                  <div className="nav-link-icon">
                    <FontAwesomeIcon icon={['far', 'object-group']} />
                  </div>
                  <span>Components</span>
                </ListItem>
              </List>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
