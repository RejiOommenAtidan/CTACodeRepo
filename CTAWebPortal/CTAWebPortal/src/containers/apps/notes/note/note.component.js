import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListIcon from '@material-ui/icons/List';
import Hidden from '@material-ui/core/Hidden';

import classNames from 'classnames';

import themeStyles from './note.theme.style';
import scss from './note.module.scss';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      internalText: props.note.text,
      updateTimeout: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.note.id !== this.props.note.id) {
      this.setState({
        internalText: nextProps.note.text,
        updateTimeout: null
      });
    }
  }

  handleChange = (event) => {
    const { value } = event.target;
    if (this.state.updateTimeout) {
      clearTimeout(this.state.updateTimeout);
    }

    const update = setTimeout(() => {
      this.props.onSave({
        id: this.props.note.id,
        text: value
      });
    }, 3000);

    this.setState({
      internalText: value,
      updateTimeout: update
    });
  };

  render() {
    const { classes, onCancel } = this.props;
    return (
      <div className={classNames(scss['portal-note-container'], classes['portal-note-container'])}>
        <div className={scss['portal-note']}>
          <textarea
            value={this.state.internalText}
            placeholder="Type a note here"
            onChange={this.handleChange}
            className={scss['portal-note-text']}
          />
        </div>
        <Hidden mdUp>
          <Button
            variant="fab"
            color="secondary"
            aria-label="compose"
            className={scss['portal-note-cancel-fab']}
            onClick={() => onCancel()}
          >
            <ListIcon className={classes['portal-note-cancel-fab__icon']} />
          </Button>
        </Hidden>
      </div>
    );
  }
}

Note.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  note: PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default withStyles(themeStyles, { withTheme: true })(Note);
