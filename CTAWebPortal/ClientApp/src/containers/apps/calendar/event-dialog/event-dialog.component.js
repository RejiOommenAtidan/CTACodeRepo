import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import moment from 'moment';

class EventDialog extends React.Component {
  state = {
    title: '',
    location: '',
    description: '',
    start: '',
    end: '',
    id: ''
  };

  handleCancel = () => {
    this.props.onClose(null);
  };

  handleSend = () => {
    this.props.onClose(this.state);
  };

  handleFormFieldChange = (prop, value) => {
    this.setState({ [prop]: value });
  }

  handleEntering = () => {
    this.setState({
      title: (this.props.event && this.props.event.title) || '',
      location: (this.props.event && this.props.event.location) || '',
      description: (this.props.event && this.props.event.description) || '',
      start: (this.props.event && this.props.event.start.format('YYYY-MM-DD')) || moment().format('YYYY-MM-DD'),
      end: (this.props.event && this.props.event.end.format('YYYY-MM-DD')) || moment().format('YYYY-MM-DD'),
      id: (this.props.event && this.props.event.id) || null
    });
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleCancel}
        onEntering={this.handleEntering}
        aria-labelledby="event-dialog"
      >
        <DialogTitle id="event-dialog">{this.props.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Event title"
            type="text"
            value={this.state.title}
            onChange={e => this.handleFormFieldChange('title', e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="location"
            label="Event location"
            type="text"
            value={this.state.location}
            onChange={e => this.handleFormFieldChange('location', e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="description"
            label="Event description"
            type="text"
            value={this.state.description}
            onChange={e => this.handleFormFieldChange('description', e.target.value)}
            fullWidth
          />
          <TextField
            id="start"
            label="Start date"
            type="date"
            value={this.state.start}
            onChange={e => this.handleFormFieldChange('start', e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="start"
            label="End date"
            type="date"
            value={this.state.end}
            onChange={e => this.handleFormFieldChange('end', e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSend} color="primary" autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EventDialog.defaultProps = {
  event: null
};

EventDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    start: PropTypes.shape({
      format: PropTypes.func.isRequired
    }).isRequired,
    end: PropTypes.shape({
      format: PropTypes.func.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired
  }),
  onClose: PropTypes.func.isRequired
};

export default EventDialog;
