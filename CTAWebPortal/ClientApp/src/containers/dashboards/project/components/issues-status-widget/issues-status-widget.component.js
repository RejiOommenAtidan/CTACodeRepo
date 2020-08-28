import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import themeStyles from './issues-status-widget.theme.style';

const legendOptions = {
  display: true,
  position: 'top',
  labels: {
    boxWidth: 10
  }
};

class IssuesStatusWidget extends React.Component {
  state = {
    lineChartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        type: 'line',
        label: 'New',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderColor: this.props.theme.palette.primary.light,
        borderWidth: 1,
        lineTension: 0,
        pointBorderWidth: 1,
        pointBackgroundColor: this.props.theme.palette.primary.light,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: this.props.theme.palette.primary.main,
        pointHoverBorderColor: this.props.theme.palette.primary.light,
        pointRadius: [0, 0, 0, 4, 0, 0, 0],
        data: [...new Array(7)].map(() => 70 + Math.floor(Math.random() * 30))
      }, {
        type: 'line',
        label: 'Done',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderColor: this.props.theme.palette.primary.main,
        borderWidth: 1,
        lineTension: 0,
        pointBorderWidth: 1,
        pointBackgroundColor: this.props.theme.palette.primary.dark,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: this.props.theme.palette.primary.main,
        pointHoverBorderColor: this.props.theme.palette.primary.light,
        pointRadius: [0, 0, 0, 4, 0, 0, 0],
        data: [...new Array(7)].map(() => 40 + Math.floor(Math.random() * 30))
      }, {
        type: 'line',
        label: 'Unresolved',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderColor: this.props.theme.palette.secondary.main,
        borderWidth: 1,
        lineTension: 0,
        pointBorderWidth: 1,
        pointBackgroundColor: this.props.theme.palette.secondary.dark,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: this.props.theme.palette.secondary.main,
        pointHoverBorderColor: this.props.theme.palette.secondary.light,
        pointRadius: [0, 0, 0, 4, 0, 0, 0],
        data: [...new Array(7)].map(() => Math.floor(Math.random() * 30))
      }]
    },
    lineChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true,
        xPadding: 20,
        yPadding: 10,
        displayColors: false,
      },
      scales: {
        xAxes: [{
          display: false
        }]
      }
    },
    issuesTitle: 'Monthly View'
  };

  componentWillReceiveProps(props) {
    const oldNewDataSet = this.state.lineChartData.datasets[0];
    const newNewDataSet = { ...oldNewDataSet };
    newNewDataSet.borderColor = props.theme.palette.primary.light;
    newNewDataSet.pointBackgroundColor = props.theme.palette.primary.light;
    newNewDataSet.pointHoverBackgroundColor = props.theme.palette.primary.main;
    newNewDataSet.pointHoverBorderColor = props.theme.palette.primary.light;

    const oldDoneDataSet = this.state.lineChartData.datasets[1];
    const newDoneDataSet = { ...oldDoneDataSet };
    newDoneDataSet.borderColor = props.theme.palette.primary.main;
    newDoneDataSet.pointBackgroundColor = props.theme.palette.primary.dark;
    newDoneDataSet.pointHoverBackgroundColor = props.theme.palette.primary.main;
    newDoneDataSet.pointHoverBorderColor = props.theme.palette.primary.light;

    const oldUnresolvedDataSet = this.state.lineChartData.datasets[2];
    const newUnresolvedDataSet = { ...oldUnresolvedDataSet };
    newUnresolvedDataSet.borderColor = props.theme.palette.secondary.dark;
    newUnresolvedDataSet.pointBackgroundColor = props.theme.palette.secondary.dark;
    newUnresolvedDataSet.pointHoverBackgroundColor = props.theme.palette.secondary.main;
    newUnresolvedDataSet.pointHoverBorderColor = props.theme.palette.secondary.light;

    const newChartData = {
      ...this.state.lineChartData,
      datasets: [newNewDataSet, newDoneDataSet, newUnresolvedDataSet]
    };

    this.setState({ lineChartData: newChartData });
  }

  randomizeCharts = () => {
    const newDataSet = this.state.lineChartData.datasets[0];
    const newNewData = [...newDataSet.data];
    newNewData.push(Math.floor(Math.random() * 30));
    newNewData.splice(0, 1);
    const newNewDataSet = { ...newDataSet };
    newNewDataSet.data = newNewData;

    const oldDoneDataSet = this.state.lineChartData.datasets[1];
    const newDoneData = [...oldDoneDataSet.data];
    newDoneData.push(40 + Math.floor(Math.random() * 30));
    newDoneData.splice(0, 1);
    const newDoneDataSet = { ...oldDoneDataSet };
    newDoneDataSet.data = newDoneData;

    const oldUnresolvedDataSet = this.state.lineChartData.datasets[2];
    const newUnresolvedData = [...oldUnresolvedDataSet.data];
    newUnresolvedData.push(70 + Math.floor(Math.random() * 30));
    newUnresolvedData.splice(0, 1);
    const newUnresolvedDataSet = { ...oldUnresolvedDataSet };
    newUnresolvedDataSet.data = newUnresolvedData;

    const newChartData = {
      ...this.state.lineChartData,
      datasets: [newNewDataSet, newDoneDataSet, newUnresolvedDataSet]
    };

    this.setState({ lineChartData: newChartData });
  }

  onItemClick = (title) => {
    this.setState({ issuesTitle: title, anchorEl: null })
    this.randomizeCharts();
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, issuesTitle } = this.state;

    return (
      <Card className={classes['portal-issues-status-widget']}>
        <CardHeader
          action={
            <IconButton
              aria-owns={anchorEl ? 'issues-menu' : null}
              aria-haspopup="true"
              onClick={(event) => this.handleClick(event)}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={issuesTitle}
          subheader="June 2018 - July 2018"
        />
        <CardContent className={classes['portal-issues-status-widget__chart']}>
          <Line
            data={this.state.lineChartData}
            options={this.state.lineChartOptions}
            legend={legendOptions}
          />
        </CardContent>
        <Menu
          id="issues-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem key={1} onClick={() => this.onItemClick('Daily View')}>Day</MenuItem>
          <MenuItem key={2} onClick={() => this.onItemClick('Weekly View')}>Week</MenuItem>
          <MenuItem key={3} onClick={() => this.onItemClick('Monthly View')}>Month</MenuItem>
        </Menu>
      </Card>
    );
  }
}

IssuesStatusWidget.propTypes = {
  theme: PropTypes.shape({
    palette: PropTypes.shape({
      primary: PropTypes.shape({
        dark: PropTypes.string,
        main: PropTypes.string,
        light: PropTypes.string,
        contrastText: PropTypes.string
      }),
      secondary: PropTypes.shape({
        main: PropTypes.string,
        light: PropTypes.string,
        dark: PropTypes.string
      }),
      common: PropTypes.shape({
        white: PropTypes.string
      })
    })
  }).isRequired,
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(themeStyles, { withTheme: true })(IssuesStatusWidget);
