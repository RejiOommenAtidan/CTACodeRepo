import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography/Typography';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import ViewDayIcon from '@material-ui/icons/ViewDay';

import moment from 'moment';
import $ from 'jquery';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.min';

import themeStyles from './full-calendar.theme.style';
import scss from './full-calendar.module.scss';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.jQuery = $.noConflict();
    this.date = new Date();

    this.viewOptions = [{
      iconName: <ViewModuleIcon />,
      viewName: 'month',
      name: 'Month View'
    }, {
      iconName: <ViewWeekIcon />,
      viewName: 'agendaWeek',
      name: 'Week View'
    }, {
      iconName: <ViewDayIcon />,
      viewName: 'agendaDay',
      name: 'Day View'
    }];

    this.viewFormats = {
      month: 'MMMM YYYY',
      agendaWeek: 'w - YYYY',
      agendaDay: 'dddd MMMM YYYY'
    };

    this.calendarOptions = {
      header: false,
      height: 'parent',
      navLinks: true,
      editable: true,
      fixedWeekCount: false,
      eventLimit: true,
      viewRender: (view) => {
        this.setState({
          currentDay: view.calendar.getDate().format(),
          currentMonthNum: view.calendar.getDate().month()
        });
      },
      eventClick: (calEvent) => {
        props.onEventClick(calEvent);
      },
      eventDrop: (calEvent) => {
        props.onEventMove(calEvent);
      }
    };

    this.state = {
      currentDay: null,
      currentMonthNum: null,
      selectedView: this.viewOptions[0].viewName
    };
  }

  componentDidMount() {
    const settings = { events: this.props.events, ...this.calendarOptions };
    setTimeout(() => {
      this.instance = this.jQuery(`#${this.root}`).fullCalendar(settings);
    }, 400);
  }

  componentWillReceiveProps(nextProps) {
    this.instance.fullCalendar('removeEventSources');
    this.instance.fullCalendar('addEventSource', nextProps.events);
  }

  calendarNavigate = direction => () => {
    this.instance.fullCalendar(direction);
  };

  changeView = view => () => {
    this.setState({ selectedView: view });
    this.instance.fullCalendar('changeView', view);
  }

  render() {
    const { classes } = this.props;
    this.root = `ID${this.date.getTime()}`;

    return (
      <Grid
        container
        direction="column"
        spacing={0}
        className={classNames(
          scss['portal-calendar-page'],
          scss['portal-calendar-page__background'],
          scss[`portal-calendar-page__background-month-${this.state.currentMonthNum}`]
        )}
      >
        <Grid item>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={6} className={scss['portal-calendar-page__column']}>
              <IconButton onClick={this.calendarNavigate('prev')} aria-labelledby="Previous">
                <ChevronLeftIcon />
              </IconButton>
              <Typography component="h1" variant="headline">
                {this.state.selectedView === 'agendaWeek' && 'Week '}
                {moment(this.state.currentDay).format(this.viewFormats[this.state.selectedView])}
              </Typography>
              <IconButton onClick={this.calendarNavigate('next')} aria-labelledby="Next">
                <ChevronRightIcon />
              </IconButton>
            </Grid>
            <Grid item container xs={6} className={scss['portal-calendar-page__column']} justify="flex-end">
              {this.viewOptions.map(option => (
                <IconButton
                  key={option.viewName}
                  onClick={this.changeView(option.viewName)}
                  className={option.viewName === this.state.selectedView ? classes['portal-calendar-page__view-active'] : ''}
                >
                  {option.iconName}
                </IconButton>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={scss['portal-calendar-page__calendar']}>
          <div id={this.root} className={classNames(classes.calendar, 'fc fc-unthemed fc-ltr')} />
        </Grid>
      </Grid>
    );
  }
}

Calendar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onEventClick: PropTypes.func.isRequired,
  onEventMove: PropTypes.func.isRequired
};

export default withStyles(themeStyles, { withTheme: true })(Calendar);
