import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Snackbar from '@material-ui/core/Snackbar';
import InboxIcon from '@material-ui/icons/Inbox';
import StarsIcon from '@material-ui/icons/Stars';
import FlagIcon from '@material-ui/icons/Flag';
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import EmailIcon from '@material-ui/icons/Email';

import inboxList from '../../../assets/data/apps/email/inbox.json';
import draftsList from '../../../assets/data/apps/email/drafts.json';
import importantList from '../../../assets/data/apps/email/important.json';
import contactsList from '../../../assets/data/apps/email/contacts.json';
import sentList from '../../../assets/data/apps/email/sent.json';
import starredList from '../../../assets/data/apps/email/starred.json';

import EmailCategoriesNav from './email-categories/email-categories.component';
import EmailList from './email-list/email-list.component';
import NoMessages from './no-messages/no-messages.component';
import Messages from './messages/messages.component';
import ComposeDialog from './compose-dialog/compose-dialog.component';

import themeStyles from './email.theme.style';
import scss from './email.module.scss';

const emailCategories = [{
  name: 'Inbox',
  icon: <InboxIcon />,
  list: 'inbox',
  count: 24
}, {
  name: 'Starred',
  icon: <StarsIcon />,
  list: 'starred',
  count: 2
}, {
  name: 'Important',
  icon: <FlagIcon />,
  list: 'important',
  count: 1
}, {
  name: 'Sent',
  icon: <SendIcon />,
  list: 'sent',
  count: 0
}, {
  name: 'Drafts',
  icon: <DraftsIcon />,
  list: 'drafts',
  count: 0
}];

const emailLists = {
  inbox: inboxList,
  starred: starredList,
  important: importantList,
  sent: sentList,
  drafts: draftsList,
  contacts: contactsList
};

class Email extends React.Component {
  state = {
    selectedCategory: emailCategories[0],
    selectedMail: null,
    composeDialogOpen: false,
    composeDialogTitle: '',
    composedMessage: {
      to: '',
      subject: '',
      content: ''
    },
    snackbarOpen: false,
    snackbarMessage: ''
  };

  onSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  }

  selectEmailCategory = category => () => {
    this.setState({
      selectedCategory: category,
      selectedMail: null
    });
  };

  selectEmail = email => () => {
    this.setState({ selectedMail: email });
  }

  deleteMessage = (msg) => {
    const index = this.state.selectedMail.messages.indexOf(msg);
    this.state.selectedMail.messages.splice(index, 1);
    this.setState({
      snackbarOpen: true,
      snackbarMessage: 'Message Deleted'
    });
  }

  openComposeDialog = (type, message) => {
    const newState = {
      composeDialogTitle: type,
      composeDialogOpen: true,
      composedMessage: {
        to: message ? message.from.email : '',
        subject: message && this.state.selectedMail ? this.state.selectedMail.subject : '',
        content: ''
      }
    };
    this.setState(newState);
  }

  handleNewMailDialogClose = () => {
    this.setState({
      composeDialogOpen: false
    });
  }

  sendMessage = (message) => {
    this.setState({
      composeDialogOpen: false
    });

    if (!message) {
      return;
    }

    const sentMessage = {
      date: Date.now(),
      from: {
        email: 'morris@gmail.com',
        name: 'Morris Onions',
        image: 'assets/images/avatars/avatar-2.png'
      },
      content: message.content
    };

    // Add under selected thread if any, otherwise create new thread.
    if (this.state.selectedMail && this.state.composeDialogTitle !== 'Compose new message') {
      this.state.selectedMail.messages.unshift(sentMessage);
    } else {
      const newThread = {
        id: Date.now().toString(),
        from: {
          email: 'morris@gmail.com',
          name: 'Morris Onions',
          image: 'assets/images/avatars/avatar-2.png'
        },
        subject: this.state.composedMessage.subject,
        messages: [sentMessage]
      };
      emailLists[this.state.selectedCategory.list].unshift(newThread);
    }

    this.setState({
      snackbarOpen: true,
      snackbarMessage: 'Message Sent'
    });
  }

  render() {
    const { classes, width } = this.props;
    const anchor = 'left';

    const snackbar = (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={this.state.snackbarOpen}
        autoHideDuration={6000}
        onClose={this.onSnackbarClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{this.state.snackbarMessage}</span>}
      />
    );

    const composeButton = (
      <Button
        variant="fab"
        color="secondary"
        aria-label="compose"
        className={scss['portal-email-compose-fab']}
        onClick={() => this.openComposeDialog('Compose new message')}
      >
        <EmailIcon className={classes['portal-email-compose-fab__icon']} />
      </Button>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <EmailCategoriesNav
            categories={emailCategories}
            selectedCategory={this.state.selectedCategory}
            onSelect={this.selectEmailCategory}
          />
          <EmailList
            selectedMail={this.state.selectedMail}
            list={emailLists[this.state.selectedCategory.list]}
            onSelect={this.selectEmail}
          />
          <main
            className={classNames(classes.content, classes[`content-${anchor}`], 'portal-hide-scrollbars', {
              [classes.contentShift]: (isWidthUp('md', width)),
              [classes[`contentShift-${anchor}`]]: isWidthUp('md', width)
            })}
          >
            {this.state.selectedMail ?
              <Messages
                email={this.state.selectedMail}
                onMessageDelete={this.deleteMessage}
                onReply={this.openComposeDialog}
              /> : <NoMessages />}
            {composeButton}
          </main>
          <ComposeDialog
            open={this.state.composeDialogOpen}
            title={this.state.composeDialogTitle}
            message={this.state.composedMessage}
            onClose={this.sendMessage}
          />
          {snackbar}
        </div>
      </div>
    );
  }
}

Email.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired
};

export default compose(withWidth(), withStyles(themeStyles, { withTheme: true }))(Email);
