//Hi
import React from 'react';
import {
  Container,
  Typography,
  makeStyles,
  Breadcrumbs,
  Link
} from '@material-ui/core';

import Norchoe from './norchoe';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CoverNorchoeMadeb = () => {
  const classes = useStyles();
  return (
      <Container maxWidth={false}>
        <Norchoe />
      </Container>
  );
};

export default CoverNorchoeMadeb;
