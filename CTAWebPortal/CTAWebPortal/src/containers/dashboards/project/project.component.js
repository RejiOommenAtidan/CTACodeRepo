import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import WeeklyIssuesWidget from './components/weekly-issues-widget/weekly-issues-widget.component';
import ProjectStatesWidget from './components/project-states-widget/project-states.component';
import BacklogWidget from './components/backlog-widget/backlog-widget.component';
import IssuesStatusWidget from './components/issues-status-widget/issues-status-widget.component';
import UserTasksWidget from './components/user-tasks-widget/user-tasks-widget.component';

import styles from './project.style';

const Project = (props) => {
  const { classes } = props;

  return (
    <div className={classes.portalDashboardPageWrapper}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={16}>

          <Grid key={1} item xs={12} sm={12} md={9} className={classes.portalWidget}>
            <Typography variant="subheading" className={classes.portalWidgetHeading}>
              Project States
            </Typography>
            <Paper className={classes.portalWidgetContent}>
              <ProjectStatesWidget />
            </Paper>
          </Grid>

          <Grid key={2} item xs={12} sm={12} md={3} className={classes.portalWidget}>
            <Typography variant="subheading" className={classes.portalWidgetHeading}>
              Weekly Issues
            </Typography>
            <Paper className={classes.portalWidgetContent}>
              <WeeklyIssuesWidget />
            </Paper>
          </Grid>
        </Grid>

        <Grid container justify="center" spacing={16}>
          <Grid item xs={12} sm={12} md={8}>
            <Grid container justify="center" spacing={16}>
              <Grid key={4} item xs={12} className={classes.portalWidget}>
              <Typography variant="subheading" className={classes.portalWidgetHeading}>
                Issues Status
              </Typography>
                <Paper className={classes.portalWidgetContent}>
                  <IssuesStatusWidget />
                </Paper>
              </Grid>

              <Grid key={5} item xs={12} className={classes.portalWidget}>
                <Typography variant="subheading" className={classes.portalWidgetHeading}>
                  Backlog
                </Typography>
                <Paper className={classes.portalWidgetContent}>
                  <BacklogWidget />
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid key={6} item xs={12} sm={12} md={4} className={classes.portalWidget}>
            <Typography variant="subheading" className={classes.portalWidgetHeading}>
              Tasks by User
            </Typography>
            <Paper className={classes.portalWidgetContent}>
              <UserTasksWidget />
            </Paper>
          </Grid>

        </Grid>
      </Grid>
    </div>
  );
};

Project.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles, { withTheme: true })(Project);
