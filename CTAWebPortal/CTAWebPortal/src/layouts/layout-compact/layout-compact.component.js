import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import AppBar from '@material-ui/core/AppBar';

import Sidenav from '../components/sidenav/sidenav.component';
import NotificationSidenav from '../components/notification-sidenav/notification-sidenav.component';
import ContentToolbar from '../components/content-toolbar/content-toolbar.component';
import ContentFooter from '../components/content-footer/content-footer.component';
import MenuSidenavCompact from '../components/menu-sidenav-compact/menu-sidenav-compact.component';

// Actions
import { toggleSidenav, setSidenavOpen, toggleSidenavVariant } from '../../actions/layout.actions';

import scss from './layout-compact.module.scss';
import styles from './layout-compact.style';

class CompactLayout extends React.Component {
  // Set the initial layout state when the layout is initialised
  constructor(props) {
    super(props);
    const variant = isWidthDown('sm', props.width) ? 'temporary' : 'persistent';
    props.toggleSidenavVariant(variant);
    props.setSidenavOpen(variant === 'persistent');
  }

  // Update the layout state when a going from mobile to desktop and vice versa
  componentWillReceiveProps(nextProps) {
    if ((isWidthDown('sm', this.props.width) && isWidthUp('md', nextProps.width))) {
      this.props.toggleSidenavVariant('persistent');
      this.props.setSidenavOpen(true);
    } else if ((isWidthDown('sm', nextProps.width) && isWidthUp('md', this.props.width))) {
      this.props.toggleSidenavVariant('temporary');
      this.props.setSidenavOpen(false);
    }
  }

  render() {
    const { children, classes } = this.props;

    return (
      <div className={classNames(scss['layout-compact-wrapper'], classes.wrapper)}>
        <Sidenav>
          <MenuSidenavCompact />
        </Sidenav>
        <main className={scss['layout-compact-main']}>
          <AppBar color="default" position="static">
            <ContentToolbar />
          </AppBar>
          <div className={scss['layout-compact-content-wrapper']}>
            <div className={scss['layout-compact-content']}>
              {children}
            </div>
          </div>
          <ContentFooter />
        </main>
        <NotificationSidenav />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    layout: {
      sidenavOpen: state.layout.sidenavOpen
    }
  };
}

CompactLayout.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  toggleSidenavVariant: PropTypes.func.isRequired,
  setSidenavOpen: PropTypes.func.isRequired
};

export default compose(
  withWidth(),
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, {
    toggleSidenav,
    toggleSidenavVariant,
    setSidenavOpen
  })
)(CompactLayout);

