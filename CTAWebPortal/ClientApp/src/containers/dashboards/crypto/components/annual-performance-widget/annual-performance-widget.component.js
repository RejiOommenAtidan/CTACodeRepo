import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import themeStyles from './annual-performance-widget.theme.style';

const legendOptions = {
  display: false
};

class AnnualPerformanceWidget extends React.Component {
  state = {
    intervalId: null,
    barChartData: {
      labels: ['BTC', 'ETH', 'MAT', 'ATN', 'JLG', 'AFT', 'KOL', 'JNH', 'AAG', 'JSG', 'LLK', 'GRE'],
      datasets: [{
        backgroundColor: this.props.theme.palette.primary.light,
        borderColor: this.props.theme.palette.primary.light,
        borderWidth: '1',
        data: [...new Array(10)].map(() => 20 + Math.floor(Math.random() * 30))
      }]
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true,
        backgroundColor: this.props.theme.palette.common.white,
        titleFontColor: this.props.theme.palette.primary.dark,
        bodyFontColor: this.props.theme.palette.primary.dark,
        xPadding: 20,
        yPadding: 20,
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
    const randomInterval = (3 + Math.floor(Math.random() * 4)) * 1000;
    const intervalId = setInterval(() => {
      this.randomizeCharts();
    }, randomInterval);

    this.setState({ intervalId });
  }

  componentWillReceiveProps(props) {
    const oldEthDataSet = this.state.barChartData.datasets[0];
    const newEthDataSet = { ...oldEthDataSet };
    newEthDataSet.borderColor = props.theme.palette.primary.light;
    newEthDataSet.backgroundColor = props.theme.palette.primary.light;

    const newChartData = {
      ...this.state.barChartData,
      datasets: [newEthDataSet]
    };

    this.setState({ barChartData: newChartData });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  onItemClick = () => {
    this.randomizeCharts();
  };

  randomizeCharts = () => {
    const ethDataSet = this.state.barChartData.datasets[0];
    const newEthData = [...ethDataSet.data];
    newEthData.push(20 + Math.floor(Math.random() * 30));
    newEthData.splice(0, 1);
    const newEthDataSet = { ...ethDataSet };
    newEthDataSet.data = newEthData;

    const newChartData = {
      ...this.state.barChartData,
      datasets: [newEthDataSet]
    };

    this.setState({ barChartData: newChartData });
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <Card className={classes['portal-annual-performance-widget']}>
        <CardHeader
          action={
            <IconButton
              aria-owns={anchorEl ? 'store-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title="Annual Performance"
          subheader="Order by market share"
        />
        <CardContent className={classes['portal-annual-performance-widget__chart']}>
          <HorizontalBar
            data={this.state.barChartData}
            options={this.state.barChartOptions}
            legend={legendOptions}
          />
        </CardContent>
        <Menu
          id="store-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem key={1} onClick={this.onItemClick}>Day</MenuItem>
          <MenuItem key={2} onClick={this.onItemClick}>Annual</MenuItem>
          <MenuItem key={3} onClick={this.onItemClick}>Month</MenuItem>
          <MenuItem key={4} onClick={this.onItemClick}>Week</MenuItem>
        </Menu>
      </Card>
    );
  }
}

AnnualPerformanceWidget.propTypes = {
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

export default withStyles(themeStyles, { withTheme: true })(AnnualPerformanceWidget);
