import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import TabbedChartWidget from './components/tabbed-chart-widget/tabbed-chart-widget.component';
import DoughnutChartWidget from './components/doughnut-chart-widget/doughnut-chart-widget.component';
import ActiveUsersWidget from './components/active-users-widget/active-users-widget.component';
import TableWidget from './components/table-widget/table-widget.component';

import styles from './analytics.style';

const Analytics = (props) => {
  const { classes } = props;

  return (
    <div className={classes.portalDashboardPageWrapper}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={16}>

          <Grid key={1} item xs={12} sm={12} md={8} className={classes.portalWidget}>
            <Typography variant="subheading" className={classes.portalWidgetHeading}>
              Portal Analytics
            </Typography>
            <Paper className={classes.portalWidgetContent}>
              <TabbedChartWidget />
            </Paper>
          </Grid>

          <Grid key={2} item xs={12} sm={12} md={4} className={classes.portalWidget}>
            <Typography variant="subheading" className={classes.portalWidgetHeading}>
              Active Users
            </Typography>
            <Paper className={classes.portalWidgetContent}>
              <ActiveUsersWidget />
            </Paper>
          </Grid>

          <Grid key={3} item xs={12} sm={12} md={4} className={classes.portalWidget}>
            <Typography variant="subheading" className={classes.portalWidgetHeading}>
              Sessions by device
            </Typography>
            <Paper className={classes.portalWidgetContent}>
              <DoughnutChartWidget />
            </Paper>
          </Grid>

          <Grid key={4} item xs={12} sm={12} md={8} className={classes.portalWidget}>
            <Typography variant="subheading" className={classes.portalWidgetHeading}>
              Client Acquisition
            </Typography>
            <Paper className={classes.portalWidgetContent}>
              <TableWidget />
            </Paper>
          </Grid>

        </Grid>
      </Grid>
    </div>
  );
};

Analytics.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles, { withTheme: true })(Analytics);
