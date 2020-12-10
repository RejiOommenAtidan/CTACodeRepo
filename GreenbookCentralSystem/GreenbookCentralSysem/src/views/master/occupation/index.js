import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';

import Occupation from './occupation';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CoverOccupation = () => {
  const classes = useStyles();
  return (
      <Container maxWidth={false}>
        {/*<Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/Home" >
            Home
        </Link>

          <Typography color="textPrimary">Occupation</Typography>
  </Breadcrumbs>*/}
        <Occupation />
      </Container>
  );
};

export default CoverOccupation;
