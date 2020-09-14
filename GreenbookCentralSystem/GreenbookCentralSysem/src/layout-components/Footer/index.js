import React from 'react';

import clsx from 'clsx';

import { List, ListItem } from '@material-ui/core';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Footer = (props) => {
  const { footerShadow, footerBgTransparent } = props;
  return (
    <>
      <div
        className={clsx('app-footer text-black-50', {
          'app-footer--shadow': footerShadow,
          'app-footer--opacity-bg': footerBgTransparent
        })}>
        
        <div className="app-footer--second">
           CTA
           ©
          2020 
          
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  footerShadow: state.ThemeOptions.footerShadow,
  footerBgTransparent: state.ThemeOptions.footerBgTransparent
});

export default connect(mapStateToProps)(Footer);
