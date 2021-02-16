import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { useMediaPredicate } from "react-media-hook";
import { Sidebar, Header, Footer } from '../../layout-components';

const LeftSidebar = (props) => {
  const {
    children,
    sidebarToggle,
    sidebarToggleMobile,
   // sidebarFixed,
   // headerFixed,
    headerSearchHover,
    headerDrawerToggle,
    footerFixed,
    contentBackground
  } = props;


  const sidebarDisplay = useMediaPredicate("(max-width: 1099px)");

  //console.log(sidebarDisplay);
/* useEffect(() => {
  if(window.innerWidth < 768 ){
    setDisplayStyle("block");
  }
  else{
    setDisplayStyle("none");
  }
}, [window.innerWidth]);*/
  return (
    <>
      <div
        className={clsx('app-wrapper', contentBackground, {
          'header-drawer-open': headerDrawerToggle,
        'app-sidebar-collapsed': sidebarToggle,
       'app-sidebar-mobile-open': sidebarToggleMobile,
       // 'app-sidebar-fixed': sidebarFixed,
      //  'app-header-fixed': headerFixed,
          'app-footer-fixed': footerFixed,
          'search-wrapper-open': headerSearchHover
        })}>
        { sidebarDisplay &&  <div >
          <Sidebar />
        </div>}
        <div className="app-main">
          <Header />
          <div className="app-content">
            <div className="app-content--inner" style={{padding:10 }}>
              <div className="app-content--inner__wrapper">{children}</div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

LeftSidebar.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = (state) => ({
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
 // sidebarFixed: state.ThemeOptions.sidebarFixed,
 // headerFixed: state.ThemeOptions.headerFixed,
  headerSearchHover: state.ThemeOptions.headerSearchHover,
  headerDrawerToggle: state.ThemeOptions.headerDrawerToggle,

  footerFixed: state.ThemeOptions.footerFixed,

  contentBackground: state.ThemeOptions.contentBackground
});

export default connect(mapStateToProps)(LeftSidebar);
