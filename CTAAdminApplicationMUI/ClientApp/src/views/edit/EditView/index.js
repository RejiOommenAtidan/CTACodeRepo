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
import EditUser from './EditUser';


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
      title="Edit User"
    >
      <Container maxWidth={false}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/app/manageuser" >
          Home
        </Link>
       
        <Typography color="textPrimary">Edit User</Typography>
      </Breadcrumbs>
        <EditUser/>
      </Container>
    </Page>
  );
};

export default Dashboard;
