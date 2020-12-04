import React from 'react';
import {
  Container,
  Typography,
  makeStyles,
  Breadcrumbs,
  Link
} from '@material-ui/core';

import BriefGB from './briefgb';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CoverBriefGB = () => {
  const classes = useStyles();
  return (
      <Container maxWidth={false}>
        <BriefGB />
      </Container>

  );
};

export default CoverBriefGB;