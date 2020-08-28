import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { Line } from 'react-chartjs-2';

import themeStyles from './weekly-issues-widget.theme.style';

const legendOptions = {
  display: true,
  position: 'top',
  labels: {
    boxWidth: 12
  }
};

class WeeklyIssuesWidget extends React.Component {
  state = {
    intervalId: null,
    lineChartData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        type: 'line',
        label: 'Open',
        backgroundColor: this.props.theme.palette.primary.main,
        borderColor: this.props.theme.palette.primary.main,
        borderWidth: '2',
        pointBackgroundColor: this.props.theme.palette.primary.main,
        pointHoverBackgroundColor: this.props.theme.palette.secondary.main,
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        lineTension: 0,
        fill: 'start',
        pointRadius: 3,
        data: [...new Array(7)].map(() => 30 + Math.floor(Math.random() * 10))
      }, {
        type: 'line',
        label: 'Closed',
        backgroundColor: this.props.theme.palette.secondary.main,
        borderColor: this.props.theme.palette.secondary.main,
        borderWidth: '2',
        pointBackgroundColor: this.props.theme.palette.secondary.main,
        pointHoverBackgroundColor: this.props.theme.palette.primary.main,
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        lineTension: 0,
        fill: 'start',
        pointRadius: 3,
        data: [...new Array(7)].map(() => 100 + Math.floor(Math.random() * 10))
      }]
    },
    lineChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true,
        xPadding: 5,
        yPadding: 5,
        displayColors: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    }
  };

  componentWillMount() {
    const randomInterval = (3 + Math.floor(Math.random() * 4)) * 2000;
    const intervalId = setInterval(() => {
      const oldPrimaryDataSet = this.state.lineChartData.datasets[0];
      const newPrimaryData = [...oldPrimaryDataSet.data];
      newPrimaryData.push(100 + Math.floor(Math.random() * 10));
      newPrimaryData.splice(0, 1);
      const newPrimaryDataSet = { ...oldPrimaryDataSet };
      newPrimaryDataSet.data = newPrimaryData;

      const oldSecondaryDataSet = this.state.lineChartData.datasets[1];
      const newSecondaryData = [...oldSecondaryDataSet.data];
      newSecondaryData.push(100 + Math.floor(Math.random() * 10));
      newSecondaryData.splice(0, 1);
      const newSecondaryDataSet = { ...oldSecondaryDataSet };
      newSecondaryDataSet.data = newSecondaryData;

      const newChartData = {
        ...this.state.lineChartData,
        datasets: [newPrimaryDataSet, newSecondaryDataSet]
      };

      this.setState({ lineChartData: newChartData });
    }, randomInterval);

    this.setState({ intervalId });
  }

  componentWillReceiveProps(props) {
    const oldPrimaryDataSet = this.state.lineChartData.datasets[0];
    const newPrimaryDataSet = { ...oldPrimaryDataSet };
    newPrimaryDataSet.borderColor = props.theme.palette.primary.main;
    newPrimaryDataSet.backgroundColor = props.theme.palette.primary.main;
    newPrimaryDataSet.pointBackgroundColor = props.theme.palette.secondary.main;

    const oldSecondaryDataSet = this.state.lineChartData.datasets[1];
    const newSecondaryDataSet = { ...oldSecondaryDataSet };
    newSecondaryDataSet.borderColor = props.theme.palette.secondary.main;
    newSecondaryDataSet.backgroundColor = props.theme.palette.secondary.main;
    newSecondaryDataSet.pointBackgroundColor = props.theme.palette.primary.main;

    const newChartData = {
      ...this.state.lineChartData,
      datasets: [newPrimaryDataSet, newSecondaryDataSet]
    };

    this.setState({ lineChartData: newChartData });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes['portal-line-chart-widget']}>
        <div className={classes['portal-line-chart-widget__chart']}>
          <Line
            data={this.state.lineChartData}
            options={this.state.lineChartOptions}
            legend={legendOptions}
          />
        </div>
      </div>
    );
  }
}

WeeklyIssuesWidget.propTypes = {
  theme: PropTypes.shape({
    palette: PropTypes.shape({
      primary: PropTypes.shape({
        main: PropTypes.string
      }),
      secondary: PropTypes.shape({
        main: PropTypes.string
      })
    })
  }).isRequired,
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(themeStyles, { withTheme: true })(WeeklyIssuesWidget);
