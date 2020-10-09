import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Region from './region';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CoverRegion = () => {
  const classes = useStyles();
  return (
    <Container maxWidth={false}>
      {/*<Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/Home" >
            Home
          </Link>
          <Typography color="textPrimary">Region</Typography>
        </Breadcrumbs>*/}
      <Region />
    </Container>
  );
};

export default CoverRegion;
