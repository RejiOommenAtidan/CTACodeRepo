import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import classNames from 'classnames';

import themeStyles from './no-messages.theme.style';
import scss from './no-messages.module.scss';

const NoMessages = (props) => {
  const { classes } = props;

  return (
    <div className={classNames(scss['portal-email-no-messages'], classes['portal-email-no-messages'])}>
      <div className={classNames(
        scss['portal-email-no-messages__envelope'],
        classes['portal-email-no-messages__envelope']
      )}
      >
        <div className={scss['portal-email-no-messages__paper']} />
      </div>
      <Typography component="h2">Please select an email</Typography>
    </div>
  );
};


NoMessages.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(themeStyles, { withTheme: true })(NoMessages);
