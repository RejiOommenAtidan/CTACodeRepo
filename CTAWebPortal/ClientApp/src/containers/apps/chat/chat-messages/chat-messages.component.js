import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import scss from './chat-messages.module.scss';

class ChatMessages extends React.Component {
  state = {
    message: ''
  };

  updateMessage = (event) => {
    this.setState({
      message: event.target.value
    });
  }

  sendMessage = () => {
    this.props.onSend(this.state.message);

    this.setState({
      message: ''
    });
  }

  render() {
    const {
      chat
    } = this.props;

    return (
      <div className={scss['chat-wrapper']}>
        <div className={scss['messages-wrapper']}>
          {chat.messages.map((message, index) => {
            const messageClass = chat.from.email === message.from.email ?
              scss['message--regular'] :
              scss['message--flipped'];

            return (
              <div
                key={index}
                className={classNames(
                  scss.message,
                  messageClass
                )}
              >
                <div className={scss['avatar-wrapper']}>
                  <Avatar
                    alt={message.from.name}
                    src={`${process.env.PUBLIC_URL}/${message.from.image}`}
                  />
                  <Typography variant="caption" align="center">
                    {message.from.name}
                  </Typography>
                </div>
                <div className={scss['card-wrapper']}>
                  <Card className={scss.message__card}>
                    <CardContent>
                      <Typography component="div" dangerouslySetInnerHTML={{ __html: message.content }} />
                    </CardContent>
                  </Card>
                  <div className={scss['message-footer']}>
                    <Typography variant="caption">{moment(message.date).fromNow()}</Typography>
                    <div className={scss['message-actions']}>
                      <Typography variant="caption" component="a" href="#">Edit Comment</Typography>
                      <Typography variant="caption" component="a" href="#">Delete Comment</Typography>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Card className={scss['send-card']}>
          <CardContent className={scss['send-card-content']}>
            <TextField
              fullWidth
              label="Type a message here"
              onChange={this.updateMessage}
              value={this.state.message}
            />
            <IconButton onClick={this.sendMessage} aria-label="Send">
              <SendIcon />
            </IconButton>
          </CardContent>
        </Card>
      </div>
    );
  }
}

ChatMessages.propTypes = {
  chat: PropTypes.shape({}).isRequired,
  onSend: PropTypes.func.isRequired
};

export default ChatMessages;
