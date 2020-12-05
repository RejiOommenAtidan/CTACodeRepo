import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';

import NewGreenBookSerial from './newgreenbookserial';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CoverNewGBSN = () => {
  const classes = useStyles();
  return (
      <Container maxWidth={false}>
        <NewGreenBookSerial />
      </Container>
  );
};

export default CoverNewGBSN;
