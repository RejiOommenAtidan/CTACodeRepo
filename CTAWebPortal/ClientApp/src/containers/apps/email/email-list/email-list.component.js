import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withWidth from '@material-ui/core/withWidth';
import Avatar from '@material-ui/core/Avatar';

import themeStyles from './email-list.theme.style';
import scss from './email-list.module.scss';

const EmailList = (props) => {
  const {
    classes,
    selectedMail,
    list,
    width,
    onSelect
  } = props;

  return (
    <Drawer
      variant="persistent"
      open={(width !== 'sm' && width !== 'xs') || selectedMail === null}
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
          {list.map(email => (
            <ListItem
              disableGutters
              title={email.from.name}
              key={email.id}
              className={classNames(
                scss['portal-thread-list__item'],
                email === selectedMail ? classes['portal-thread-list__item--active'] : ''
              )}
              onClick={onSelect(email)}
            >
              <Avatar alt={email.from.name} src={`${process.env.PUBLIC_URL}/${email.from.image}`} />
              <ListItemText
                primary={email.from.name}
                secondary={email.subject}
                classes={{
                  primary: email === selectedMail ? classes['portal-thread-list__item__text--active'] : '',
                  secondary: classNames(
                    scss['portal-thread-list__item__text'],
                    email === selectedMail ? classes['portal-thread-list__item__text--active'] : ''
                  )
                }}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

EmailList.defaultProps = {
  selectedMail: null
};

EmailList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  selectedMail: PropTypes.shape({}),
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSelect: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
};

export default compose(withWidth(), withStyles(themeStyles, { withTheme: true }))(EmailList);
