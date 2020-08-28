import React from 'react';
import PropTypes from 'prop-types';

// Material components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import FontAwesome from 'react-fontawesome';

import themeStyles from './content-footer.theme.style';

const ContentFooter = (props) => {
  const { classes, ...other } = props;

  return (
    <AppBar
      color="default"
      position="static"
      {...other}
    >
      <Toolbar>
        <Typography
          variant="title"
          color="inherit"
          noWrap
        >
          <small>&copy; 2020 CTA</small>
        </Typography>
        <span className="portal-flex" />
        
      </Toolbar>
    </AppBar>
  );
};

ContentFooter.propTypes = {
  classes: PropTypes.shape({}).isRequired
};


export default withStyles(themeStyles)(ContentFooter);
