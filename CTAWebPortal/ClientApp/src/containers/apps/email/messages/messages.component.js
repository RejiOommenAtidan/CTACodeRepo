import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ReplyIcon from '@material-ui/icons/Reply';
import ReplyAllIcon from '@material-ui/icons/ReplyAll';
import ForwardIcon from '@material-ui/icons/Forward';
import DeleteIcon from '@material-ui/icons/Delete';

import moment from 'moment';

import DeleteDialog from '../delete-dialog/delete-dialog.component';

import themeStyles from './messages.theme.style';
import scss from './messages.module.scss';

class Messages extends React.Component {
  state = {
    deleteDialogOpen: false,
    selectedMessage: null
  };

  onConfirmationDialogClose = (message) => {
    this.setState({ deleteDialogOpen: false, selectedMessage: message });
    if (message) {
      this.props.onMessageDelete(message);
    }
  }

  openConfirmationDialog = message => () => {
    this.setState({ deleteDialogOpen: true, selectedMessage: message });
  }

  replyButtonPressed = (replyType, message) => () => {
    this.props.onReply(replyType, message);
  }

  render() {
    const { classes, email } = this.props;
    return (
      <div>
        <Typography
          variant="title"
          key={Date.now()}
          className={scss['portal-mail-subject']}
        >
          {email.subject}
        </Typography>
        {email.messages.map(msg => (
          <Card className={classes['portal-thread']} key={msg.date}>
            <CardHeader
              classes={{
                root: classes['portal-thread__header'],
                action: scss['portal-thread__header__date']
              }}
              avatar={<Avatar alt={msg.from.name} src={`${process.env.PUBLIC_URL}/${msg.from.image}`} />}
              title={msg.from.name}
              subheader={msg.from.email}
              action={<Typography component="span">{moment(msg.date).fromNow()}</Typography>}
            />
            <CardContent>
              <Typography component="div" dangerouslySetInnerHTML={{ __html: msg.content }} />
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton aria-label="Reply" onClick={this.replyButtonPressed('Reply', msg)}>
                <ReplyIcon />
              </IconButton>
              <IconButton aria-label="Reply to all" onClick={this.replyButtonPressed('Reply to all', msg)}>
                <ReplyAllIcon />
              </IconButton>
              <IconButton aria-label="Forward" onClick={this.replyButtonPressed('Forward', msg)}>
                <ForwardIcon />
              </IconButton>
              <IconButton aria-label="Delete" onClick={this.openConfirmationDialog(msg)} className={scss.delete}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
        {<DeleteDialog
          open={this.state.deleteDialogOpen}
          message={this.state.selectedMessage}
          onClose={this.onConfirmationDialogClose}
        />}
      </div>
    );
  }
}

Messages.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  email: PropTypes.shape({}).isRequired,
  onMessageDelete: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired
};

export default withStyles(themeStyles, { withTheme: true })(Messages);
