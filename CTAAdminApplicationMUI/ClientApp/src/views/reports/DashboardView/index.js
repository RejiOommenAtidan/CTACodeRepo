import React from 'react';
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Breadcrumbs,
  Link
} from '@material-ui/core';
import Page from 'src/components/Page';

import Manage from './Manage';

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
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/app/manageuser" >
          Home
        </Link>
       
        <Typography color="textPrimary">Manage User</Typography>
      </Breadcrumbs>
        <Manage/>
      </Container>
    </Page>
  );
};

export default Dashboard;
