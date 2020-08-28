import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Sidenav from '../components/sidenav/sidenav.component';
import NotificationSidenav from '../components/notification-sidenav/notification-sidenav.component';
import ContentToolbar from '../components/content-toolbar/content-toolbar.component';
import ContentFooter from '../components/content-footer/content-footer.component';
import MenuSidenavFunky from '../components/menu-sidenav-funky/menu-sidenav-funky.component';
import MenuNestedFunky from '../components/menu-nested-funky/menu-nested-funky.component';

// Actions
import { toggleSidenav, setSidenavOpen, toggleSidenavVariant } from '../../actions/layout.actions';

import scss from './layout-funky.module.scss';
import styles from './layout-funky.style';

class FunkyLayout extends React.Component {
  // Set the initial layout state when the layout is initialised
  constructor(props) {
    super(props);

    props.toggleSidenavVariant('persistent');
    props.setSidenavOpen(true);

    this.state = {
      selectedMenu: null
    };
  }

  openNestedMenu = item => () => {
    this.setState({
      selectedMenu: item
    });
  };

  closeNestedMenu = () => {
    this.setState({
      selectedMenu: null
    });
  };

  render() {
    const { children, classes, theme } = this.props;
    const sidenavTheme = createMuiTheme(theme.sidenavTheme);

    return (
      <div className={classNames(scss['layout-funky-wrapper'], classes.wrapper)}>
        <Sidenav>
          <MenuSidenavFunky onSelect={this.openNestedMenu} />
        </Sidenav>
        <MuiThemeProvider theme={sidenavTheme}>
          <MenuNestedFunky menu={this.state.selectedMenu} onClose={this.closeNestedMenu} />
        </MuiThemeProvider>
        <main className={scss['layout-funky-main']}>
          <AppBar color="default" position="static">
            <ContentToolbar />
          </AppBar>
          <div className={scss['layout-funky-content-wrapper']}>
            <div className={scss['layout-funky-content']}>
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
    },
    theme: state.theme
  };
}

FunkyLayout.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  toggleSidenavVariant: PropTypes.func.isRequired,
  setSidenavOpen: PropTypes.func.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, {
    toggleSidenav,
    toggleSidenavVariant,
    setSidenavOpen
  })
)(FunkyLayout);

