import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import LineChartWidget from './components/line-chart-widget/line-chart-widget.component';
import ActiveUsersWidget from './components/active-users-widget/active-users-widget.component';
import DailySalesWidget from './components/daily-sales-widget/daily-sales-widget.component';
import TableWidget from './components/table-widget/table-widget.component';
import RegionSalesWidget from './components/region-sales-widget/region-sales-widget.component';

import styles from './ecommerce.style';

const Ecommerce = (props) => {
  const { classes } = props;

  return (
    <div className={classes.portalDashboardPageWrapper}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={16}>

          <Grid key={1} item xs={12} sm={6} md={4} className={classes.portalWidget}>
            <Paper className={classes.portalWidgetContent}>
              <LineChartWidget title="Recent Sales" />
            </Paper>
          </Grid>

          <Grid key={2} item xs={12} sm={6} md={4} className={classes.portalWidget}>
            <Paper className={classes.portalWidgetContent}>
              <LineChartWidget title="New Customers" />
            </Paper>
          </Grid>

          <Grid key={3} item xs={12} sm={12} md={4} className={classes.portalWidget}>
            <Paper className={classes.portalWidgetContent}>
              <ActiveUsersWidget />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <Grid container justify="center" spacing={16}>
              <Grid key={4} item xs={12} className={classes.portalWidget}>
                <Paper className={classes.portalWidgetContent}>
                  <DailySalesWidget />
                </Paper>
              </Grid>

              <Grid key={5} item xs={12} className={classes.portalWidget}>
                <Paper className={classes.portalWidgetContent}>
                  <TableWidget />
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid key={6} item xs={12} sm={12} md={4} className={classes.portalWidget}>
            <Paper className={classes.portalWidgetContent}>
              <RegionSalesWidget />
            </Paper>
          </Grid>

        </Grid>
      </Grid>
    </div>
  );
};

Ecommerce.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles, { withTheme: true })(Ecommerce);
