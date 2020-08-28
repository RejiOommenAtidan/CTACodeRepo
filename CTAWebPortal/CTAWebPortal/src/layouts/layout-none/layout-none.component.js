import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './layout-none.style';

const NoLayout = (props) => {
  const {
    classes,
    children
  } = props;
  return (
    <div className={classes.wrapper}>
      {children}
    </div>
  );
};

NoLayout.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(NoLayout);

