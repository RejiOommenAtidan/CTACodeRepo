import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import classNames from 'classnames';

import themeStyles from './no-notes.theme.style';
import scss from './no-notes.module.scss';

const NoNotes = (props) => {
  const { classes } = props;

  return (
    <div className={classNames(scss['portal-notes-no-notes'], classes['portal-notes-no-notes'])}>
      <div className={classNames(
        scss['portal-notes-no-note__container'],
        classes['portal-notes-no-note__container']
      )}
      >
        <div className={scss['portal-notes-no-note__paper']} />
      </div>
      <Typography component="h2">No Note Selected</Typography>
    </div>
  );
};


NoNotes.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(themeStyles, { withTheme: true })(NoNotes);
