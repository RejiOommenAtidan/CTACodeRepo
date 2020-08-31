import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Demo from '../../components/demo.component';


const MasterPage = () => {

  return (
    <div>
      <section className="portal-pages__header">
        <div className="portal-pages__header-demo">
          <Typography variant="display2" gutterBottom>
            Master Page
          </Typography>
        </div>
      </section>
      <Grid container spacing={0}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Paper className="portal-pages__content-inner">
            <Typography variant="headline" gutterBottom>Master Page</Typography>

            <p>Our Page starts from here</p>
 
          </Paper>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
};

export default MasterPage;
