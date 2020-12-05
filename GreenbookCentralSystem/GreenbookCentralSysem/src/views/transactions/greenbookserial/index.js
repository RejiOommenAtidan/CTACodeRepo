import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';

import GreenBookSerial from './greenbookserial';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CoverEditGBSN = () => {
  const classes = useStyles();
  return (
      <Container maxWidth={false}>
        <GreenBookSerial />
      </Container>
  );
};

export default CoverEditGBSN;
