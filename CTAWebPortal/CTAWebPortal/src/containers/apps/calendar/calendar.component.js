import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import EventDialog from './event-dialog/event-dialog.component';
import FullCalendar from './full-calendar/full-calendar.component';

import themeStyles from './calendar.theme.style';
import scss from './calendar.module.scss';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.createRandomEvents(100, moment().startOf('year'), moment().endOf('year')),
      snackbarOpen: false,
      snackbarMessage: '',
      eventDialogOpen: false,
      eventDialogTitle: '',
      event: null
    };
  }

  onSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  }

  openEventDialog = (event) => {
    const type = event ? 'Edit Event' : 'Add Event';
    const newState = {
      event,
      eventDialogTitle: type,
      eventDialogOpen: true
    };
    this.setState(newState);
  }

  refreshEvents = (event) => {
    this.setState({ events: [...this.state.events.filter(e => e.id !== event.id), event] });
  }

  addEvent = (result) => {
    const newEvent = result;
    this.setState({
      eventDialogOpen: false
    });

    if (!newEvent) {
      return;
    }

    const newEvents = this.state.eventDialogTitle === 'Edit Event' ?
      this.state.events.filter(e => e.id !== newEvent.id) :
      this.state.events;

    newEvent.id = !newEvent.id ? newEvents.length : newEvent.id;
    newEvents.push(newEvent);
    this.setState({ events: newEvents });


    this.setState({
      snackbarOpen: true,
      snackbarMessage: 'Event Saved'
    });
  }

  randomDate = (start, end) => {
    const startNumber = start.toDate().getTime();
    const endNumber = end.toDate().getTime();
    const randomTime = (Math.random() * (endNumber - startNumber)) + startNumber;
    return moment(randomTime);
  }

  createRandomEvents = (number, startDate, endDate) => {
    const events = [];
    const eventNames = [
      'Pick up the kids', 'Remember the milk', 'Meeting with Morris', 'Car service',  'Go Surfing',
      'Party at Christos house', 'Beer Oclock', 'Festival tickets', 'Laundry!', 'Haircut appointment',
      'Walk the dog', 'Dentist :(', 'Board meeting', 'Go fishing'];
    const locationNames = ['London', 'New York', 'Paris', 'Athens'];
    for (let x = 0; x < number; x += 1) {
      const randomMonthDate = this.randomDate(startDate, endDate);
      const anHourLater = moment(randomMonthDate).add(1, 'h');
      const randomEvent = Math.floor(Math.random() * (eventNames.length - 0));
      const randomLocation = Math.floor(Math.random() * (locationNames.length - 0));

      events.push({
        id: x,
        title: eventNames[randomEvent],
        start: randomMonthDate.toDate(),
        end: anHourLater.toDate(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, fugiat!',
        location: locationNames[randomLocation]
      });
    }
    return events;
  }

  render() {
    const { classes } = this.props;

    const snackbar = (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={this.state.snackbarOpen}
        autoHideDuration={3000}
        onClose={this.onSnackbarClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{this.state.snackbarMessage}</span>}
      />
    );

    const addNoteButton = (
      <Button
        variant="fab"
        color="secondary"
        aria-label="compose"
        className={scss['portal-calendar-event-fab']}
        onClick={() => this.openEventDialog()}
      >
        <AddIcon className={classes['portal-calendar-event-fab__icon']} />
      </Button>
    );

    return (
      <div className={classes.root}>
        <FullCalendar
          events={this.state.events}
          onEventClick={this.openEventDialog}
          onEventMove={this.refreshEvents}
        />
        <EventDialog
          open={this.state.eventDialogOpen}
          title={this.state.eventDialogTitle}
          event={this.state.event}
          onClose={this.addEvent}
        />
        {addNoteButton}
        {snackbar}
      </div>
    );
  }
}

Calendar.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default compose(withWidth(), withStyles(themeStyles, { withTheme: true }))(Calendar);
