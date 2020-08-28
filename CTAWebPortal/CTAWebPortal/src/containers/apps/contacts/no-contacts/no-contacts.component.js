import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import classNames from 'classnames';

import themeStyles from './no-contacts.theme.style';
import scss from './no-contacts.module.scss';

const NoContacts = (props) => {
  const { classes } = props;

  return (
    <div className={classNames(scss['portal-contacts-no-contacts'], classes['portal-contacts-no-contacts'])}>
      <div className={classNames(
        scss['portal-contacts-no-contacts__icon'],
        classes['portal-contacts-no-contacts__icon']
      )}
      >
        <div className={scss['portal-contacts-no-contacts__paper']} />
      </div>
      <Typography component="h2">Please select a contact</Typography>
    </div>
  );
};

NoContacts.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(themeStyles, { withTheme: true })(NoContacts);
