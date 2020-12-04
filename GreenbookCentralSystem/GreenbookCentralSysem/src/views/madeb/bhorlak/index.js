import React from 'react';
import {
  Container,
  Typography,
  makeStyles,
  Breadcrumbs,
  Link
} from '@material-ui/core';

import Bhorlak from './bhorlak';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CoverBhorlak = () => {
  const classes = useStyles();
  return (
      <Container maxWidth={false}>
        <Bhorlak />
      </Container>
  );
};

export default CoverBhorlak;
