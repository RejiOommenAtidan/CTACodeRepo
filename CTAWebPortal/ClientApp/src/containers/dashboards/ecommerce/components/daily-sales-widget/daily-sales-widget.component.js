import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import themeStyles from './daily-sales-widget.theme.style';

const legendOptions = {
  display: false
};

class DailySalesWidget extends React.Component {
  state = {
    anchorEl: null,
    userChartData: {
      labels: [
        '15 days ago', '14 days ago', '13 days ago', '12 days ago', '11 days ago', '10 days ago',
        '9 days ago', '8 days ago', '7 days ago', '6 days ago', '5 days ago', '4 days ago',
        '3 days ago', '2 days ago', '1 day ago'
      ],
      datasets: [{
        label: 'Dead Users',
        data: [...new Array(15)].map(() => 100 + Math.floor(Math.random() * 900)),
        borderWidth: 0,
        backgroundColor: Array(15).fill(this.props.theme.palette.secondary.light),
        hoverBackgroundColor: this.props.theme.palette.secondary.main
      }, {
        label: 'Active Users',
        data: [...new Array(15)].map(() => 1000 + Math.floor(Math.random() * 1000)),
        borderWidth: 0,
        backgroundColor: Array(15).fill(this.props.theme.palette.primary.light),
        hoverBackgroundColor: this.props.theme.palette.primary.main
      }]
    },
    userChartOptions: {
      animation: false,
      scaleShowVerticalLines: false,
      responsive: true,
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
          stacked: true,
          display: false,
          categoryPercentage: 1.0,
          barPercentage: 0.4
        }],
        yAxes: [{
          stacked: true,
          display: false
        }]
      }
    }
  };

  componentWillReceiveProps(props) {
    const oldPrimaryDataSet = this.state.userChartData.datasets[0];
    const newPrimaryDataSet = { ...oldPrimaryDataSet };
    newPrimaryDataSet.hoverBackgroundColor = props.theme.palette.secondary.main;
    newPrimaryDataSet.backgroundColor = Array(15).fill(props.theme.palette.secondary.light);

    const oldSecondaryDataSet = this.state.userChartData.datasets[1];
    const newSecondaryDataSet = { ...oldSecondaryDataSet };
    newSecondaryDataSet.hoverBackgroundColor = props.theme.palette.primary.main;
    newSecondaryDataSet.backgroundColor = Array(15).fill(props.theme.palette.primary.light);

    const newChartData = {
      ...this.state.userChartData,
      datasets: [newPrimaryDataSet, newSecondaryDataSet]
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

  onItemClick = () => {
    const oldPrimaryDataSet = this.state.userChartData.datasets[0];
    const newPrimaryDataSet = { ...oldPrimaryDataSet };
    newPrimaryDataSet.data = [...new Array(15)].map(() => 100 + Math.floor(Math.random() * 900));

    const oldSecondaryDataSet = this.state.userChartData.datasets[1];
    const newSecondaryDataSet = { ...oldSecondaryDataSet };
    newSecondaryDataSet.data = [...new Array(15)].map(() => 1000 + Math.floor(Math.random() * 1000));

    const newChartData = {
      ...this.state.userChartData,
      datasets: [newPrimaryDataSet, newSecondaryDataSet]
    };

    this.setState({ userChartData: newChartData, anchorEl: null });
  };

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
      <Card className={classes['portal-daily-sales-widget']}>
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
          title="Daily Sales"
          subheader="Week 21 compared to week 20"
        />
        <CardContent className={classes['portal-daily-sales-widget__chart']}>
          <Bar
            data={this.state.userChartData}
            options={this.state.userChartOptions}
            legend={legendOptions}
          />
        </CardContent>
        <Menu
          id="store-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem key={1} onClick={this.onItemClick}>Online Stores</MenuItem>
          <MenuItem key={2} onClick={this.onItemClick}>Physical Stores</MenuItem>
        </Menu>
      </Card>
    );
  }
}

DailySalesWidget.propTypes = {
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

export default withStyles(themeStyles, { withTheme: true })(DailySalesWidget);
