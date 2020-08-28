import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import NotesList from './notes-list/notes-list.component';
import NoNotes from './no-notes/no-notes.component';
import Note from './note/note.component';

import themeStyles from './notes.theme.style';
import scss from './notes.module.scss';

import notes from '../../../assets/data/apps/notes/notes.json';

class Notes extends React.Component {
  state = {
    selectedNote: null,
    snackbarOpen: false,
    snackbarMessage: ''
  };

  onSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  }

  selectNote = note => () => {
    this.setState({ selectedNote: note });
  }

  deleteNote = note => () => {
    this.setState({ selectedNote: null });
    const index = notes.findIndex(findNote => findNote.id === note.id);
    if (index !== -1) {
      notes.splice(index, 1);
    }
  }

  unselectNote = () => {
    this.setState({ selectedNote: null });
  }

  saveSelectedNote = (note) => {
    const savedNote = Object.assign({}, note);
    const index = notes.findIndex(findNote => findNote.id === savedNote.id);
    savedNote.date = new Date().getTime();

    if (index === -1) {
      notes.unshift(savedNote);
    } else {
      notes[index] = savedNote;
    }

    this.setState({
      selectedNote: savedNote,
      snackbarOpen: true,
      snackbarMessage: 'Note Saved'
    });
  }

  addNewNote = () => {
    const newNote = {
      id: Math.floor((Math.random() * 1000)).toString(),
      date: new Date().getTime(),
      text: ''
    };
    this.setState({ selectedNote: newNote });
  }

  render() {
    const { classes, width } = this.props;
    const anchor = 'left';

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
        className={scss['portal-notes-compose-fab']}
        onClick={() => this.addNewNote()}
      >
        <NoteAddIcon className={classes['portal-notes-compose-fab__icon']} />
      </Button>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <NotesList
            selectedNote={this.state.selectedNote}
            list={notes}
            onSelect={this.selectNote}
            onDelete={this.deleteNote}
          />
          <main
            className={classNames(classes.content, classes[`content-${anchor}`], 'portal-hide-scrollbars', {
              [classes.contentShift]: (isWidthUp('md', width)),
              [classes[`contentShift-${anchor}`]]: isWidthUp('md', width)
            })}
          >
            {this.state.selectedNote ?
              <Note
                note={this.state.selectedNote}
                onMessageDelete={this.deleteMessage}
                onSave={this.saveSelectedNote}
                onCancel={this.unselectNote}
              /> : <NoNotes />
            }
            {addNoteButton}
          </main>
          {snackbar}
        </div>
      </div>
    );
  }
}

Notes.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired
};

export default compose(withWidth(), withStyles(themeStyles, { withTheme: true }))(Notes);
