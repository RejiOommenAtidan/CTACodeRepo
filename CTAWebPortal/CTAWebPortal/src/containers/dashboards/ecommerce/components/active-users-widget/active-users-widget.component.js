import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import CountUp from 'react-countup';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TrandingUpIcon from '@material-ui/icons/TrendingUp';

import themeStyles from './active-users-widget.theme.style';

const legendOptions = {
  display: false
};

class ActiveUsersWidget extends React.Component {
  state = {
    intervalId: null,
    userChartData: {
      labels: [
        '1 min ago', '2 min ago', '3 min ago', '4 min ago', '5 min ago', '6 min ago', '7 min ago', '8 min ago',
        '9 min ago', '10 min ago', '11 min ago', '12 min ago'
      ],
      datasets: [{
        label: 'Active Users',
        data: [15, 24, 34, 66, 88, 69, 44, 34, 73, 99, 66, 42],
        borderWidth: 0,
        backgroundColor: Array(11).fill(this.props.theme.palette.primary.light).concat(this.props.theme.palette.secondary.light),
        hoverBackgroundColor: this.props.theme.palette.primary.main
      }]
    },
    userChartOptions: {
      animation: false,
      scaleShowVerticalLines: false,
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true,
        backgroundColor: this.props.theme.palette.primary.main,
        titleFontColor: this.props.theme.palette.common.white,
        bodyFontColor: this.props.theme.palette.common.white,
        xPadding: 20,
        yPadding: 20,
        displayColors: false
      },
      scales: {
        xAxes: [{
          display: false,
          categoryPercentage: 1.0,
          barPercentage: 0.9
        }],
        yAxes: [{
          display: false
        }]
      }
    }
  };

  componentWillMount() {
    const intervalId = setInterval(() => {
      const oldDataSet = this.state.userChartData.datasets[0];
      const newData = [...oldDataSet.data];

      newData.push(Math.floor((Math.random() * 100) + 1));
      newData.splice(0, 1);

      const newDataSet = { ...oldDataSet };
      newDataSet.data = newData;
      const newChartData = {
        ...this.state.userChartData,
        datasets: [newDataSet]
      };

      this.setState({ userChartData: newChartData });
    }, 3000);

    this.setState({ intervalId });
  }

  componentWillReceiveProps(props) {
    const oldDataSet = this.state.userChartData.datasets[0];
    const newDataSet = { ...oldDataSet };
    newDataSet.hoverBackgroundColor = props.theme.palette.primary.main;
    newDataSet.backgroundColor = Array(11).fill(props.theme.palette.primary.light).concat(props.theme.palette.secondary.light);
    const newChartData = {
      ...this.state.userChartData,
      datasets: [newDataSet]
    };

    const oldTooltipOptions = this.state.userChartOptions.tooltips;
    const newTooltipOptions = { ...oldTooltipOptions };
    newTooltipOptions.backgroundColor = props.theme.palette.primary.main;
    newTooltipOptions.titleFontColor = props.theme.palette.common.white;
    newTooltipOptions.bodyFontColor = props.theme.palette.common.white;
    const newChartOptions = {
      ...this.state.userChartOptions,
      tooltips: newTooltipOptions
    };
    this.setState({ userChartData: newChartData, userChartOptions: newChartOptions });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes['portal-active-users-widget']}>
        <div className={classes['portal-active-users-widget__text']}>
          <Typography variant="caption">
            Active Users
          </Typography>
          <Typography variant="display1" component="span" className={classes['portal-trend']}>
            <TrandingUpIcon className={classes['portal-trend__icon']} />
            <CountUp
              start={this.state.userChartData.datasets[0].data[10]}
              end={this.state.userChartData.datasets[0].data[11]}
            />
          </Typography>
        </div>
        <div className={classes['portal-active-users-widget__chart']}>
          <Bar
            data={this.state.userChartData}
            options={this.state.userChartOptions}
            legend={legendOptions}
          />
        </div>
      </div>
    );
  }
}

ActiveUsersWidget.propTypes = {
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
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(themeStyles, { withTheme: true })(ActiveUsersWidget);
