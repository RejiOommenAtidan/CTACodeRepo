import React from 'react';
import {
  Container,
  makeStyles,
} from '@material-ui/core';

import Country from './country';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Container maxWidth={false}>
      <Country />
    </Container>

  );
};

export default Dashboard;
