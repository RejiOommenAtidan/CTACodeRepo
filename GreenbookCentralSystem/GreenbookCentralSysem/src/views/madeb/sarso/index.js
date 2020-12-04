import React from 'react';
import {
  Container,
  Typography,
  makeStyles,
  Breadcrumbs,
  Link
} from '@material-ui/core';

import Sarso from './sarso';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CoverSarsoMadeb = () => {
  const classes = useStyles();
  return (
      <Container maxWidth={false}>
        <Sarso />
      </Container>

  );
};

export default CoverSarsoMadeb;
