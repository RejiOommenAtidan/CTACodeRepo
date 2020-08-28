import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import AppBar from '@material-ui/core/AppBar';

import Sidenav from '../components/sidenav/sidenav.component';
import NotificationSidenav from '../components/notification-sidenav/notification-sidenav.component';
import ContentToolbar from '../components/content-toolbar/content-toolbar.component';
import ContentToolbarLower from '../components/content-toolbar-lower/content-toolbar-lower.component';
import ContentFooter from '../components/content-footer/content-footer.component';
import MenuSidenav from '../components/menu-sidenav/menu-sidenav.component';

// Actions
import { toggleSidenav, setSidenavOpen, toggleSidenavVariant } from '../../actions/layout.actions';

import scss from './layout-boxed.module.scss';
import styles from './layout-boxed.style';

class BoxedLayout extends React.Component {
  // Set the initial layout state when the layout is initialised
  constructor(props) {
    super(props);
    props.toggleSidenavVariant('temporary');
    props.setSidenavOpen(false);
  }

  render() {
    const { children, classes } = this.props;

    return (
      <div className={classNames(scss['layout-boxed-wrapper'], classes.wrapper)}>
        <Sidenav>
          <MenuSidenav />
        </Sidenav>
        <main className={classNames(scss['layout-boxed-main'], classes.main)}>
          <AppBar color="default" position="static" elevation={0}>
            <ContentToolbar />
          </AppBar>
          <div className={scss['layout-boxed-content-wrapper']}>
            <AppBar color="default" position="static" elevation={0}>
              <ContentToolbarLower />
            </AppBar>
            <div className={scss['layout-boxed-content']}>
              {children}
            </div>
          </div>
          <ContentFooter elevation={0} />
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

BoxedLayout.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired,
  setSidenavOpen: PropTypes.func.isRequired,
  toggleSidenavVariant: PropTypes.func.isRequired
};

export default compose(
  withWidth(),
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, {
    toggleSidenav,
    setSidenavOpen,
    toggleSidenavVariant
  })
)(BoxedLayout);

