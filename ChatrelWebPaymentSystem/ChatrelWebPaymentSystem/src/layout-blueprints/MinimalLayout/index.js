import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { Sidebar, Header, Footer } from '../../layout-components';
const MinimalLayout = (props) => {
  const { children,
 
    headerSearchHover,
    headerDrawerToggle,
    footerFixed,
    contentBackground
  
  } = props;

  return <>
        <div
        className={clsx('app-wrapper', contentBackground, {
          'header-drawer-open': headerDrawerToggle,

       
          'app-footer-fixed': footerFixed,
          'search-wrapper-open': headerSearchHover
        })}>

        <div className="app-main">
          <Header />
          <div className="app-content">
            <div className="app-content--inner">
              <div className="app-content--inner__wrapper">{children}</div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
  </>;
};

MinimalLayout.propTypes = {
  children: PropTypes.node
};
const mapStateToProps = (state) => ({
 

  headerSearchHover: state.ThemeOptions.headerSearchHover,
  headerDrawerToggle: state.ThemeOptions.headerDrawerToggle,

  footerFixed: state.ThemeOptions.footerFixed,

  contentBackground: state.ThemeOptions.contentBackground
});
export default connect(mapStateToProps)(MinimalLayout) ;
