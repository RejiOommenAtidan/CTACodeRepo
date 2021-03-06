import React from 'react';
import {
  Container,
  Typography,
  makeStyles,
  Breadcrumbs,
  Link
} from '@material-ui/core';

import Qualification from './qualification';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}));

const CoverQualification = () => {
  const classes = useStyles();
  return (
      <Container maxWidth={false} >
        {/*<Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/Home" >
            Home
        </Link>

          <Typography color="textPrimary">Qualification</Typography>
  </Breadcrumbs>*/}
        <Qualification />
      </Container>
  );
};

export default CoverQualification;
