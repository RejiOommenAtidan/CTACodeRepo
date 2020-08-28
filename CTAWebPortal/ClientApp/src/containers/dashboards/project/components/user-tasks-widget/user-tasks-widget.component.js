import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';

import usersList from '../../../../../assets/data/dashboards/users.json';
import themeStyles from './user-tasks-widget.theme.style';
import scss from './user-tasks-widget.module.scss';

class UserTasksWidget extends React.Component {
  state = {
    selectedUser: null
  }

  onSelect = (user) => {
    this.setState({ selectedUser: user });
  }

  render () {
    const { classes } = this.props;
    const { selectedUser } = this.state;

    return (
      <Card className={classes['portal-user-tasks-widget']}>
        <CardContent className={classNames(classes['portal-user-tasks-widget-content'], 'portal-hide-scrollbars')}>
          <List component="nav" className={classes.listWrapper}>

            {usersList.map((user) => {
              return(
                <ListItem
                  title={user.name + '' + user.surname}
                  key={user.id}
                  className={classNames(
                    scss['portal-users-list-item'],
                    user === selectedUser ? classes['portal-users-list-item--active'] : ''
                  )}
                  onClick={() => this.onSelect(user)}
                  divider
                  button
                >
                  <Avatar alt={user.name} src={`${process.env.PUBLIC_URL}/${user.photo}`} />
                  <ListItemText
                    primary={user.name + ' ' + user.surname}
                    secondary={user.closed_tasks + ' closed issues, ' + user.new_tasks + ' new'}
                    classes={{
                      primary: user === selectedUser ? classes['portal-users-list-item__text--active'] : '',
                      secondary: classNames(
                        scss['portal-users-list-item__text'],
                        user === selectedUser ? classes['portal-users-list-item__text--active'] : ''
                      )
                    }}
                  />
                  <ListItemIcon
                    className={classNames(
                      user === selectedUser ? classes.portalUserTasksWidgetItemIconActive : '',
                      classes.portalUserTasksWidgetItemIcon)
                    }
                  >
                    <span
                      className={classNames(
                        scss['portal-badge'],
                        user === selectedUser ? classes['portal-badge--primary']: classes['portal-badge--secondary'])
                      }
                    >
                      {user.new_tasks}
                    </span>
                  </ListItemIcon>
                </ListItem>
              )
            })}
          </List>
        </CardContent>
      </Card>
    );
  }
};

UserTasksWidget.defaultProps = {
  selectedUser: null
};

UserTasksWidget.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  selectedUser: PropTypes.shape({})
};

export default withStyles(themeStyles, { withTheme: true })(UserTasksWidget);
