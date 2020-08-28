import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import FontAwesome from 'react-fontawesome';

import themeStyles from './no-messages.theme.style';
import scss from './no-messages.module.scss';

const NoMessages = (props) => {
  const { classes } = props;

  return (
    <div className={scss['no-messages-wrapper']}>
      <div className={scss['icon-wrapper']}>
        <FontAwesome
          className={classNames(
            scss.icon,
            classes['primary-icon']
          )}
          name="comments"
        />
        <FontAwesome
          className={classNames(
            scss.icon,
            classes['secondary-icon']
          )}
          name="comment"
        />
        <div className={scss.dots}>
          <span className={classes.dot} />
          <span className={classes.dot} />
          <span className={classes.dot} />
        </div>
      </div>
      <Typography component="h2">Select a conversation to start</Typography>
    </div>
  );
};

NoMessages.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(themeStyles, { withTheme: true })(NoMessages);
