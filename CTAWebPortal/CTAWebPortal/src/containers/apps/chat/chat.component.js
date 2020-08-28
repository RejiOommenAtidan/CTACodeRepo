import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';

import ChatList from './chat-list/chat-list.component';
import NoMessages from './no-messages/no-messages.component';
import ChatMessages from './chat-messages/chat-messages.component';

import recentChats from '../../../assets/data/apps/chat/recent.json';

import scss from './chat.module.scss';

class Email extends React.Component {
  state = {
    selectedChat: null,
    snackbarOpen: false,
    snackbarMessage: ''
  };

  onSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  }

  selectChat = chat => () => {
    this.setState({
      selectedChat: chat
    });
  }

  sendMessage = (message) => {
    const newMessage = {
      date: Date.now(),
      from: {
        email: 'morris@gmail.com',
        name: 'Morris Onions',
        image: 'assets/images/avatars/avatar-2.png'
      },
      content: message
    };

    this.state.selectedChat.messages.unshift(newMessage);

    this.setState({
      snackbarOpen: true,
      snackbarMessage: 'Message Sent'
    });
  }

  render() {
    return (
      <div className={scss['chat-wrapper']}>
        <ChatList
          selected={this.state.selectedChat}
          list={recentChats}
          onSelect={this.selectChat}
        />
        {this.state.selectedChat ?
          (<ChatMessages chat={this.state.selectedChat} onSend={this.sendMessage} />) :
          (<NoMessages />)
        }
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.onSnackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
        />
      </div>
    );
  }
}

export default Email;
