import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TrandingUpIcon from '@material-ui/icons/TrendingUp';

import { Line } from 'react-chartjs-2';
import CountUp from 'react-countup';

import themeStyles from './line-chart-widget.theme.style';

const legendOptions = {
  display: false
};

class LineChartWidget extends React.Component {
  state = {
    intervalId: null,
    lineChartData: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November'],
      datasets: [{
        type: 'line',
        label: 'old',
        backgroundColor: this.props.theme.palette.primary.main,
        borderColor: this.props.theme.palette.primary.main,
        borderWidth: '2',
        pointBackgroundColor: this.props.theme.palette.secondary.main,
        pointBorderColor: this.props.theme.palette.secondary.main,
        lineTension: 0.5,
        fill: true,
        pointRadius: 0,
        data: [...new Array(10)].map(() => 100 + Math.floor(Math.random() * 10))
      }, {
        type: 'line',
        label: 'new',
        backgroundColor: this.props.theme.palette.secondary.main,
        borderColor: this.props.theme.palette.secondary.main,
        borderWidth: '2',
        pointBackgroundColor: this.props.theme.palette.primary.main,
        pointBorderColor: this.props.theme.palette.primary.main,
        lineTension: 0.5,
        fill: true,
        pointRadius: 0,
        data: [...new Array(10)].map(() => 100 + Math.floor(Math.random() * 10))
      }]
    },
    lineChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: false
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
    const randomInterval = (3 + Math.floor(Math.random() * 4)) * 1000;
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
    newPrimaryDataSet.pointBorderColor = props.theme.palette.secondary.main;

    const oldSecondaryDataSet = this.state.lineChartData.datasets[1];
    const newSecondaryDataSet = { ...oldSecondaryDataSet };
    newSecondaryDataSet.borderColor = props.theme.palette.secondary.main;
    newSecondaryDataSet.backgroundColor = props.theme.palette.secondary.main;
    newSecondaryDataSet.pointBackgroundColor = props.theme.palette.primary.main;
    newSecondaryDataSet.pointBorderColor = props.theme.palette.primary.main;

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
    const { classes, title } = this.props;

    return (
      <div className={classes['portal-line-chart-widget']}>
        <div className={classes['portal-line-chart-widget__text']}>
          <Typography variant="caption">
            {title}
          </Typography>
          <Typography variant="display1" component="span" className={classes['portal-trend']}>
            <TrandingUpIcon className={classes['portal-trend__icon']} />
            <CountUp
              start={this.state.lineChartData.datasets[0].data[8]}
              end={this.state.lineChartData.datasets[0].data[9]}
            />
          </Typography>
        </div>
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

LineChartWidget.propTypes = {
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
        light: PropTypes.string
      }),
      common: PropTypes.shape({
        white: PropTypes.string
      })
    })
  }).isRequired,
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(themeStyles, { withTheme: true })(LineChartWidget);
