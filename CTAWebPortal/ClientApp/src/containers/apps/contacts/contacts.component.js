import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

// Array of contacts to show on the left side.
import contactsList from '../../../assets/data/apps/contacts/contacts.json';

import ContactsList from './contacts-list/contacts-list.component';
import ContactDetails from './contact-details/contact-details.component';
import NoContacts from './no-contacts/no-contacts.component';

import themeStyles from './contacts.theme.style';
import scss from './contacts.module.scss';

class Contacts extends React.Component {
  state = {
    selectedContact: null
  };

  selectContact = contact => () => {
    this.setState({ selectedContact: contact });
  }

  render() {
    return (
      <div className={scss['contacts-wrapper']}>
        <ContactsList
          selectedContact={this.state.selectedContact}
          list={contactsList}
          onSelect={this.selectContact}
        />
        {this.state.selectedContact ?
          <ContactDetails
            selectedContact={this.state.selectedContact} /> : <NoContacts />}
      </div>
    );
  }
}

Contacts.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired
};

export default compose(withWidth(), withStyles(themeStyles, { withTheme: true }))(Contacts);
