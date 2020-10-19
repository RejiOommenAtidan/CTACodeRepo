import React from 'react';
import {
  Container,
  Typography,
  makeStyles,
  Breadcrumbs,
  Link
} from '@material-ui/core';
import Chartel from './chartel';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CoverChartel = () => {
  const classes = useStyles();
  return (
    <Container maxWidth={false}>
      {/*<Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/Home" >
          Home
          </Link>
        <Typography color="textPrimary">Type Issued</Typography>
      </Breadcrumbs>*/}
      <Chartel />
    </Container>
  );
};

export default CoverChartel;
