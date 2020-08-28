import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';

import Drawer from '@material-ui/core/Drawer';
import withWidth from '@material-ui/core/withWidth';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';

import moment from 'moment';

import themeStyles from './notes-list.theme.style';
import scss from './notes-list.module.scss';

const NotesList = (props) => {
  const {
    classes,
    selectedNote,
    list,
    width,
    onSelect,
    onDelete
  } = props;

  return (
    <Drawer
      variant="persistent"
      open={(width !== 'sm' && width !== 'xs') || selectedNote === null}
      classes={{
        paper: width === 'sm' || width === 'xs' ? classes.mobileMenuPaper : classes.desktopMenuPaper,
        docked: classes.fullHeight
      }}
      anchor="left"
      ModalProps={{
        keepMounted: true
      }}
    >
      <div className={classNames(classes.drawerInner, 'portal-hide-scrollbars')}>
        <List component="nav" className={classes.list}>
          {list.map(note => ([
            <ListItem
              disableGutters
              title={note.date}
              key={`${note.id}a`}
              classes={{
                container: classNames(
                  scss['portal-thread-list__item'],
                  note === selectedNote ? classes['portal-thread-list__item--active'] : ''
                )
              }}
              onClick={onSelect(note)}
            >
              <ListItemText
                primary={note.text}
                secondary={moment(note.date).format('MMMM Do YYYY, h:mm:ss a')}
                classes={{
                  primary: scss['portal-thread-list__item__text'],
                  secondary: scss['portal-thread-list__item__text']
                }}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete Note" onClick={onDelete(note)}>
                  <DeleteIcon className={classes['portal-thread-list__item__icon']} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>,
            <Divider key={`${note.id}b`} />
          ]))}
        </List>
      </div>
    </Drawer>
  );
};

NotesList.defaultProps = {
  selectedNote: null
};

NotesList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  selectedNote: PropTypes.shape({}),
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
};

export default compose(withWidth(), withStyles(themeStyles, { withTheme: true }))(NotesList);
