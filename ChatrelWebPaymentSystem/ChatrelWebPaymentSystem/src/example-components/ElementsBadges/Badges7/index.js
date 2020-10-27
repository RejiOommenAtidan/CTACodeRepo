import React from 'react';

import { Grid, Typography, Badge } from '@material-ui/core';

import MailIcon from '@material-ui/icons/Mail';

const defaultProps = {
  color: 'error',
  children: <MailIcon />
};

export default function LivePreviewExample() {
  return (
    <>
      <div className="py-3">
        <Grid container spacing={6}>
          <Grid item md={4}>
            <div className="d-flex align-items-center justify-content-center">
              <Badge className="mx-2" badgeContent={4} color="error">
                <MailIcon />
              </Badge>
              <Badge className="mx-2" badgeContent={5} color="primary">
                <MailIcon />
              </Badge>
              <Badge className="mx-2" badgeContent={6} color="secondary">
                <MailIcon />
              </Badge>
            </div>
          </Grid>
          <Grid item md={4}>
            <div className="d-flex align-items-center justify-content-center">
              <Badge className="mx-2" color="error" variant="dot">
                <MailIcon />
              </Badge>
              <Badge className="mx-2" color="secondary" variant="dot">
                <Typography>Typography</Typography>
              </Badge>
            </div>
          </Grid>
          <Grid item md={4}>
            <div className="d-flex align-items-center justify-content-center">
              <Badge badgeContent={99} {...defaultProps} />
              <Badge className="mx-5" badgeContent={100} {...defaultProps} />
              <Badge badgeContent={1000} max={999} {...defaultProps} />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
