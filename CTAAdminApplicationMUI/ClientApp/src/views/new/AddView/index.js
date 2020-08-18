import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Breadcrumbs,
  Link,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import AddUser from './AddUser';


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
      title="Add User"
    >
      <Container maxWidth={false}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/app/manageuser" >
          Home
        </Link>
       
        <Typography color="textPrimary">Add User</Typography>
      </Breadcrumbs>
        <AddUser/>
      </Container>
    </Page>
  );
};

export default Dashboard;
