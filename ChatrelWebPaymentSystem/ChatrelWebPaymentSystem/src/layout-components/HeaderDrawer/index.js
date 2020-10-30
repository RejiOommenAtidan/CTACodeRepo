import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Checkbox,
  Button,
  List,
  ListItem,
  Tooltip,
  Divider,
  Menu,
  MenuItem,
  MenuList
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Rating from '@material-ui/lab/Rating';

import { setHeaderDrawerToggle } from '../../reducers/ThemeOptions';

import avatar1 from '../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import avatar6 from '../../assets/images/avatars/avatar6.jpg';
import avatar7 from '../../assets/images/avatars/avatar7.jpg';

import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import CountUp from 'react-countup';
import Chart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';

const HeaderDrawer = (props) => {


  
  const [value, setValue] = useState(2);

  const { headerDrawerToggle, setHeaderDrawerToggle } = props;

  const toogleHeaderDrawer = () => {
    setHeaderDrawerToggle(!headerDrawerToggle);
  };

  return (
    <>
      <div className="app-drawer-wrapper" style={{textAlign:'right'}}>
        <Button
          size="small"
          onClick={toogleHeaderDrawer}
          className={clsx(
            'btn-transition-none navbar-toggler bg-transparent p-0 hamburger hamburger--elastic',
            { 'is-active': headerDrawerToggle }
          )}
          disableRipple>
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </Button>
      </div>

      <div className="app-drawer-content">
        <Tooltip arrow title="Close drawer" placement="right">
          <Button
            size="small"
            onClick={toogleHeaderDrawer}
            className="close-drawer-btn bg-white p-0 d-40"
            id="CloseDrawerTooltip">
            <div
              className={clsx('navbar-toggler hamburger hamburger--elastic', {
                'is-active': headerDrawerToggle
              })}>
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </div>
          </Button>
        </Tooltip>
        <div className="vh-100 shadow-overflow">
          <PerfectScrollbar>
            <div >
              <h1 >Chatrel</h1>
            
              <ul>
                  <li>
                    <NavLink
                      onClick={toogleHeaderDrawer}
                      to="/Login">
                      Pay for Self
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toogleHeaderDrawer} to="/Home">
                      Pay for Friends
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toogleHeaderDrawer} to="/Home">
                      Pay for Family
                    </NavLink>
                  </li>
                  </ul>
            </div>
            
          </PerfectScrollbar>
        </div>
      </div>

      <div
        onClick={toogleHeaderDrawer}
        className={clsx('app-drawer-overlay', {
          'is-active': headerDrawerToggle
        })}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  headerDrawerToggle: state.ThemeOptions.headerDrawerToggle
});

const mapDispatchToProps = (dispatch) => ({
  setHeaderDrawerToggle: (enable) => dispatch(setHeaderDrawerToggle(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDrawer);
