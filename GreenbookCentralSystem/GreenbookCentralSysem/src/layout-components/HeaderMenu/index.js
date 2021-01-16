import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Box,
  Typography,
  Popover,
  Menu,
  Button,
  List,
  ListItem,
  Divider
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import CollectionsTwoToneIcon from '@material-ui/icons/CollectionsTwoTone';
import DnsTwoToneIcon from '@material-ui/icons/DnsTwoTone';
import HomeWorkTwoToneIcon from '@material-ui/icons/HomeWorkTwoTone';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';
import SearchIcon from '@material-ui/icons/Search';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import PrintIcon from '@material-ui/icons/Print';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleIcon from '@material-ui/icons/People';
// import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// import PaymentIcon from '@material-ui/icons/Payment';
// import AssessmentIcon from '@material-ui/icons/Assessment';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useHistory } from 'react-router-dom';
import projectLogo from '../../assets/images/ctalogo.png';
import { useSelector } from 'react-redux';

const HeaderMenu = () => {
  
const authUser = useSelector(state => state.UserAuthenticationReducer.oUserAuth);
const history = useHistory();
const open=(id)=>{
  var btn = document.getElementById(id);
  btn.style.backgroundColor = "#3c44b1";
  btn.style.color = "#fff";
}
const close=(id)=>{
  var btn = document.getElementById(id);
  btn.style.backgroundColor = 'rgb(60, 68, 177, 0.15)';
  btn.style.color = "#3c44b1";
}

  


  const [anchorElGB, setAnchorElGB] = useState(null);
  const openGB = Boolean(anchorElGB);
  const idGB = openGB ? 'gb-popover' : undefined;
  const handleGBClick = (event) => {
    open("id_GB");
   // handleMadebClose();
    setAnchorElGB(event.currentTarget);
    
    
  };
  const handleGBClose = () => {
    close("id_GB");
    setAnchorElGB(null);
  };
  const [bookSerialOpen, setBookSerialOpen] = useState(false);
  const handleBookSerialClick =()=>{
    setBookSerialOpen(!bookSerialOpen);
  }


  const [anchorElUser, setAnchorElUser] = useState(null);
  const openUser = Boolean(anchorElUser);
  const idUser = openUser ? 'user-popover' : undefined;
  const handleUserClick = (event) => {
    open("id_User");
    setAnchorElUser(event.currentTarget);
  };
  const handleUserClose = () => {
    close("id_User");
    setAnchorElUser(null);
  };


  const [anchorElMadeb, setAnchorElMadeb] = useState(null);
  const openMadeb = Boolean(anchorElMadeb);
  const idMadeb = openMadeb ? 'madeb-popover' : undefined;
  const handleMadebClick = (event) => {
    open("id_Madeb");
    setAnchorElMadeb(event.currentTarget);
  };
  const handleMadebClose = () => {
    close("id_Madeb");
    setAnchorElMadeb(null);
  };



  const [anchorElChatrel, setAnchorElChatrel] = useState(null);
  const openChatrel = Boolean(anchorElChatrel);
  const idChatrel = openChatrel ? 'chatrel-popover' : undefined;
  const handleChatrelClick = (event) => {
    open("id_Chatrel");
    setAnchorElChatrel(event.currentTarget);
    //history.push('/Chatrel');
  };
  const handleChatrelClose = () => {
    close("id_Chatrel");
    setAnchorElChatrel(null);
  };



  const [anchorElMaster, setAnchorElMaster] = useState(null);
  const openMaster = Boolean(anchorElMaster);
  const idMaster = openMaster ? 'master-popover' : undefined;
  const handleMasterClick = (event) => {
    open("id_Master");
    setAnchorElMaster(event.currentTarget);
  };
  const handleMasterClose = () => {
    close("id_Master");
    setAnchorElMaster(null);
  };

  const [anchorElReport, setAnchorElReport] = useState(null);
  const openReport = Boolean(anchorElReport);
  const idReport = openReport ? 'report-popover' : undefined;

  const handleReportClick = (event) => {
    open("id_Report");
    setAnchorElReport(event.currentTarget);
  };
  const handleReportClose = () => {
    close("id_Report");
    setAnchorElReport(null);
  };
  /*const [madebOpen, setMadebOpen] = React.useState(false);

  const handleMadebClick = () => {
    setMadebOpen(!madebOpen);
  };*/
  return (
    <>
    <div className="app-sidebar-logo" style={{paddingRight:'20px'}}>
          <NavLink
            to="/Home"
            //title="CTA"
            className="app-sidebar-logo">
            <div >
              <img
                style={{ width: '60px' }}
                alt="CTA"
                src={projectLogo}
              />
            </div>  
            <div className="app-sidebar-logo--text">
              <span style={{ color: 'black', paddingTop: 10 }}>
                <h4>Green Book Database</h4>
              </span>
            </div>
          </NavLink>
        </div>
      <div className="app-header-menu">
      {authUser
              &&
              ((authUser.lFeatureUserrights.find(x => x.nFeatureID === 3)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 4)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 5)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 6)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 7)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 8)) !== undefined)
              &&
        <Button
          size="small"
          onClick={handleMadebClick}
         // onMouseOver={handleMadebClick}
          id="id_Madeb"
          className="btn-transition-none btn-neutral-primary mr-3">
          Madebs
        </Button>}
        <Button
          id="id_GB"
          size="small"
          onClick={handleGBClick}
          //onMouseOver={handleGBClick}
        //  onMouseEnter={handleGBClick}
          
          
          className="btn-transition-none btn-neutral-primary mr-3">
          Green Book
        </Button>
        
        {authUser &&
              ((authUser.lFeatureUserrights.find(x => x.nFeatureID === 33)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 34)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 35)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 36)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 37)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 38)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 39)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 40)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 41)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 42)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 43)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 44)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 45)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 47)) !== undefined)
              &&
        <Button
          size="small"
          id="id_Report"
         onClick={handleReportClick}
       //  onMouseEnter={handleReportClick}
          className="btn-transition-none btn-neutral-primary mr-3">
          Reports
        </Button>}
        {authUser &&
              ((authUser.lFeatureUserrights.find(x => x.nFeatureID === 18)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 19)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 20)) !== undefined)
              &&
        <Button
          size="small"
          onClick={handleUserClick}
        //  onMouseEnter={handleUserClick}
          id="id_User"
          className="btn-transition-none btn-neutral-primary mr-3">
          Users
        </Button>}
        {authUser &&
              ((authUser.lFeatureUserrights.find(x => x.nFeatureID === 21)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 22)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 23)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 24)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 25)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 26)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 27)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 29)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 30)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 31)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 32)) !== undefined)
              &&
        <Button
          size="small"
          id="id_Master"
          onClick={handleMasterClick}
       //   onMouseEnter={handleMasterClick}
          className="btn-transition-none btn-neutral-primary mr-3">
          Masters
        </Button>}

        { <Button
          size="small"
          id="id_Chatrel"
          onClick={handleChatrelClick}
       //   onMouseEnter={handleMasterClick}
          className="btn-transition-none btn-neutral-primary mr-3">
          Chatrel
        </Button>}
       
        <Popover
          id={idGB}
          open={openGB}
          anchorEl={anchorElGB}
          onClose={handleGBClose}
         // onMouseLeave={handleGBClose}
      //   onMouseLeave={handleGBClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}>
          <div className="popover-custom-xxl p-0">
        
            <Grid container spacing={0}>
            <Grid item xs={4}>
            <div className="divider-v divider-v-lg" />
                <List component="div" className="nav-neutral-danger p-3">
                 
                  {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 2)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/Search"
                    >
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Search</span>
                  </ListItem>  }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 9)) !== undefined
                      &&
                  
                  <ListItem
                    component="a"
                    button
                    href="/GiveGBID"
                   >
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Give GB ID</span>
                  
                  </ListItem>  }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 10)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/SarsoNewGBEntry">
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span> New Entry</span>
                  </ListItem>   }
         
                </List>
              </Grid>
              <Grid item xs={4}>
                <div className="divider-v divider-v-lg" />
                <List component="div" className="nav-neutral-first p-3">
                {authUser &&
              ((authUser.lFeatureUserrights.find(x => x.nFeatureID === 11)) !== undefined
                ||
                (authUser.lFeatureUserrights.find(x => x.nFeatureID === 12)) !== undefined)
              &&
            <>  
              <ListItem
                component="a"
                button
                href="#/"
              // onClick={(e) => e.preventDefault()}
              onClick={handleBookSerialClick}
                >
                <div className="mr-2" >
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                <span style={{paddingRight:'10px'}}>Book Serial Numbers</span>
                {bookSerialOpen ?  <FontAwesomeIcon icon={['fas', 'chevron-up']} className="font-size-s opacity-3"/> : <FontAwesomeIcon icon={['fas', 'chevron-down']} className="font-size-xs opacity-3"/> }
              </ListItem>
              <Collapse in={bookSerialOpen} timeout="auto" unmountOnExit style={{paddingLeft:'25px'}}>
              <List component="div" disablePadding>
              {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 11)) !== undefined
                      &&
                <ListItem button href='/NewGreenBookSerial' component="a">Give Book Serial Number</ListItem>}
              {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 12)) !== undefined
                      &&  
                <ListItem button href='/GreenBookSerial' component="a">Edit Book Serial Number</ListItem>}
              </List>
            </Collapse>
          </>
                   }
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 13)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/Print">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Print</span>
                </ListItem>}
              
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 16)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/Greenbooks">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Edit GB</span>
                </ListItem>}
                  
                </List>
              </Grid>
              <Grid item xs={4}>
              <div className="divider-v divider-v-lg" />
                <List component="div" className="nav-neutral-success p-3">
                 
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 15)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/MakeList">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Make List</span>
                </ListItem>}
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 14)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/IssueBook">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Issue Book</span>
                </ListItem>}
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 17)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/DeleteGB"
                 >
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Delete</span>
                  </ListItem>}
                 
                </List>
              </Grid>
            
            </Grid>
          </div>
        </Popover>



        <Popover
          id={idMadeb}
          open={openMadeb}
          anchorEl={anchorElMadeb}
          onClose={handleMadebClose}
          
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}>
          <div className="popover-custom-xl p-0">
            <Grid container spacing={0}>
              <Grid item xs={6}>
              <div className="divider-v divider-v-lg" />
                <List component="div" className="nav-neutral-first p-3">
                

                  {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 3)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/Sarso"
                    >
                    <div className="mr-2">
                    <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Sarso</span>
                  </ListItem> }
                  {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 4)) !== undefined
                    &&
                  <ListItem
                    component="a"
                    button
                    href="/Norchoe"
                  // onClick={(e) => e.preventDefault()}
                    >
                    <div className="mr-2">
                    <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Norchoe</span>
                  </ListItem>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 5)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/Bhorlak"
                    //onClick={(e) => e.preventDefault()}
                    >
                  <div className="mr-2">
                  <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Bhorlak</span>
                  </ListItem>}
                 
              
                 
                </List>
              </Grid>
              <Grid item xs={6}>
              <div className="divider-v divider-v-lg" />
                <List component="div" className="nav-neutral-success p-3">
                
                  {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 7)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/BriefGB"
                    >
                    <div className="mr-2">
                    <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Brief GB</span>
                  </ListItem>}
                  {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 6)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/BookFull"
                  // onClick={(e) => e.preventDefault()}
                    >
                    <div className="mr-2">
                    <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Book Full</span>
                  </ListItem>}
                  {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 8)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/Abroad"
                    //onClick={(e) => e.preventDefault()}
                    >
                  <div className="mr-2">
                  <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Abroad</span>
                  </ListItem>}
                 
                  
                </List>
              </Grid>
             
            </Grid>
          </div>
        </Popover>
        <Popover
          id={idReport}
          open={openReport}
          anchorEl={anchorElReport}
          onClose={handleReportClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}>
          <div className="popover-custom-xxl p-0">
        
            <Grid container spacing={0}>
            <Grid item xs={4}>
            <div className="divider-v divider-v-lg" />
                <List component="div" className="nav-neutral-danger p-3">
                 
                  {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 33)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/Reports/GreenBookIssuedOverall"
                    >
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Issued Overall Report</span>
                  </ListItem>  }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 34)) !== undefined
                      &&
                  
                  <ListItem
                    component="a"
                    button
                    href="/Reports/GreenBookIssuedIndividual"
                   >
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Issued Individual Report</span>
                  
                  </ListItem>  }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 35)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/Reports/ChangesLog">
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Changes Log Report</span>
                  </ListItem>   }
                  {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 36)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/Reports/ChildChangesLog">
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Child Changes Log Report</span>
                  </ListItem>   }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 37)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/Reports/NewEntryFromDay">
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>New Entry Report</span>
                  </ListItem>
                   }
                 
                 
                 
                </List>
              </Grid>
              <Grid item xs={4}>
                <div className="divider-v divider-v-lg" />
                <List component="div" className="nav-neutral-first p-3">
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 38)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/Reports/Below6Years">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Below 6 Years Report</span>
                </ListItem>}
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 39)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/Reports/Deceased">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Deceased Report</span>
                </ListItem>}
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 47)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/Reports/DeletedGB">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Deleted Green Book Report</span>
                </ListItem>}
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 40)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/Reports/Madeb/Sarso">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Sarso Report</span>
                </ListItem>}
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 41)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/Reports/Madeb/Norchoe">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Norchoe Report</span>
                </ListItem>}
                 
                  
                </List>
              </Grid>
              <Grid item xs={4}>
              <div className="divider-v divider-v-lg" />
                <List component="div" className="nav-neutral-success p-3">
                 
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 42)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/Reports/Madeb/Bhorlak">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Bhorlak Report</span>
                </ListItem>}
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 43)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/Reports/Madeb/BookFull">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Book Full Report</span>
                </ListItem>}
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 44)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/Reports/Madeb/BriefGB"
                 >
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Brief GB Report</span>
                  </ListItem>}
                  {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 45)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/Reports/Madeb/Abroad"
                 >
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Abroad Report</span>
                  </ListItem>}
                 
                </List>
              </Grid>
            
            </Grid>
          </div>
        </Popover>
        <Popover
          id={idMaster}
          open={openMaster}
          anchorEl={anchorElMaster}
          onClose={handleMasterClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}>
          <div className="popover-custom-xxl p-0">
        
            <Grid container spacing={0}>
            <Grid item xs={4}>
            <div className="divider-v divider-v-lg" />
                <List component="div" className="nav-neutral-danger p-3">
                 
                  {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 21)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/Region"
                    >
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Region</span>
                  </ListItem>  }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 22)) !== undefined
                      &&
                  
                  <ListItem
                    component="a"
                    button
                    href="/AuthRegion"
                   >
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Authority Region</span>
                  
                  </ListItem>  }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 23)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/Country">
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Country</span>
                  </ListItem>   }
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 24)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/Occupation">
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Occupations</span>
                  </ListItem>
                   }
                 
                 
                 
                </List>
              </Grid>
              <Grid item xs={4}>
                <div className="divider-v divider-v-lg" />
                <List component="div" className="nav-neutral-first p-3">
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 25)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/Province">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Province</span>
                </ListItem>}
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 26)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/Qualification">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Qualification</span>
                </ListItem>}
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 27)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/Relation">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Relation</span>
                </ListItem>}
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 29)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/MadebType">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Madeb Type</span>
                </ListItem>}
                 
                  
                </List>
              </Grid>
              <Grid item xs={4}>
              <div className="divider-v divider-v-lg" />
                <List component="div" className="nav-neutral-success p-3">
                 
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 30)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/TypeIssued">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Type Issued</span>
                </ListItem>}
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 31)) !== undefined
                     &&
                  <ListItem
                  component="a"
                  button
                  href="/ChatrelMaster">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-right']}
                      className="font-size-xs opacity-3"
                    />
                  </div>
                  <span>Chatrel Configuration</span>
                </ListItem>}
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 32)) !== undefined
                      &&
                  <ListItem
                    component="a"
                    button
                    href="/CTAConfig"
                 >
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span> CTA Configuration</span>
                  </ListItem>}
                 
                </List>
              </Grid>
            
            </Grid>
          </div>
        </Popover>
        {/* User Popover  */}
        <Popover
          id={idUser}
          open={openUser}
          anchorEl={anchorElUser}
          onClose={handleUserClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}>
          <div className="popover-custom p-0">
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <List component="div" className="nav-neutral-danger p-3">
                
                  {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 18)) !== undefined
                      &&
                    <ListItem
                      component="a"
                      button
                      href="/Users">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>Manage Users</span>
                    </ListItem>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 19)) !== undefined
                      &&
                    <ListItem
                      component="a"
                      button
                      href="/FeatureRights">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        /> 
                        
                      </div>
                      <span>  Manage Feature Rights</span>
                    </ListItem>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 20)) !== undefined
                      &&
                    <ListItem
                      component="a"
                      button
                      href="/UserRights">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>Manage Roles</span>
                    </ListItem>}
                 
                 
                 
                </List>
              </Grid>
            </Grid>
          </div>
        </Popover>
        <Popover
          id={idChatrel}
          open={openChatrel}
          anchorEl={anchorElChatrel}
          onClose={handleChatrelClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}>
          <div className="popover-custom p-0">
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <List component="div" className="nav-neutral-danger p-3">
                {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 48)) !== undefined
                      &&
                    <ListItem
                      component="a"
                      button
                      href="/Chatrel/ChatrelList">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>Chatrel List</span>
                    </ListItem>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 50)) !== undefined
                      &&
                    <ListItem
                      component="a"
                      button
                      href="/Chatrel/SearchUsers">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        /> 
                        
                      </div>
                      <span>Search Users</span>
                    </ListItem>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 51)) !== undefined
                      &&
                    <ListItem
                      component="a"
                      button
                      href="/Chatrel/BulkImport">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>Bulk Import</span>
                    </ListItem>}
                    {authUser && (authUser.lFeatureUserrights.find(x => x.nFeatureID === 52)) !== undefined
                      &&
                    <ListItem
                      component="a"
                      button
                      href="/Chatrel/Report">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-xs opacity-3"
                        />
                      </div>
                      <span>Chatrel Report</span>
                    </ListItem>}
                 
                 
                </List>
              </Grid>
            </Grid>
          </div>
        </Popover>
      </div>
    </>
  );
};

export default HeaderMenu;
