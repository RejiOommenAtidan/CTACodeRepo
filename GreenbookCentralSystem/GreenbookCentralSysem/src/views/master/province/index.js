import React from 'react';
import {
  Container,
  Typography,
  makeStyles,
  Breadcrumbs,
  Link
} from '@material-ui/core';

import Province from './province';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CoverProvince = () => {
  const classes = useStyles();
  return (
   
      <Container maxWidth={false}>
        {/*<Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/app/manageuser" >
            Home
        </Link>

          <Typography color="textPrimary">Province</Typography>
  </Breadcrumbs>*/}
        <Province />
      </Container>
  );
};

export default CoverProvince;
