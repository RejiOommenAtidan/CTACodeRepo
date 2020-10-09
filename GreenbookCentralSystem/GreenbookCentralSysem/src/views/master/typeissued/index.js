import React from 'react';
import {
  Container,
  Typography,
  makeStyles,
  Breadcrumbs,
  Link
} from '@material-ui/core';
import TypeIssued from './typeissued';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CoverTypeIssued = () => {
  const classes = useStyles();
  return (
    <Container maxWidth={false}>
      {/*<Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/Home" >
          Home
          </Link>
        <Typography color="textPrimary">Type Issued</Typography>
      </Breadcrumbs>*/}
      <TypeIssued />
    </Container>
  );
};

export default CoverTypeIssued;
