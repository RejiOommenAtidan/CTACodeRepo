import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import JohnAvatar from './images/john.jpg';
import RyanAvatar from './images/ryan.jpg';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 60,
    height: 60
  }
};

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar alt="John Doe" src={JohnAvatar} className={classes.avatar} />
      <Avatar
        alt="Ryan Gos"
        src={RyanAvatar}
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(ImageAvatars);
