import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Feature from './feature';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CoverFeature = () => {
  const classes = useStyles();
  return (
    <Container maxWidth={false}>
      <Feature />
    </Container>
  );
};

export default CoverFeature;
