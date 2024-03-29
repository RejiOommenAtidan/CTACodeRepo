// hi
import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  FormControl,
  TextField,
  Breadcrumbs,
  Link,
  
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
//import theme from '../../../theme/theme/theme'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MUIDataTable from "mui-datatables";
//import { ThemeProvider } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';

import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from "@material-ui/icons/AddCircle";

// Local import


import { forwardRef } from 'react';

//import Test2 from './test2';
import MaterialTable, { MTableToolbar }  from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useStaticState } from '@material-ui/pickers';
import { prop } from 'lodash/fp';


 


export const PrintCard = (props) => {

  const [sgbid, setSGBID] = useState(() => {
    const zeros = 7 - props.data.sGBID.length;
    let str = '';
    for(let i=0; i< zeros; i++){
      str +='0';
    }
    return str + props.data.sGBID;
    });
  return (

    <>
     
     
    <div  style={{display: 'inline-block',  paddingLeft:'10px',paddingRight:'10px',fontSize:'14px' , fontFamily: '"Times New Roman", Georgia, Serif', color:'#000000'}}>
  
      <table width={310} height={437} border={0}>
        <tbody>
          <tr>
            <td style={{fontSize: '20px', textAlign: 'center', padding: '1em 0 0 0'}}>ལག་ཁྱེར་ཨང་།</td>
            <td colSpan={2} style={{padding: '25px 0 0 0'}}>
              <table border={0} width={170}>
                <tbody><tr>
                    <td valign="center" style={{fontSize: '11px', border: '1px solid #000', textAlign: 'center', width: '14px'}}>
                      {props.data.sCountryID[0]}
                    </td>
                    <td valign="center" style={{fontSize: '11px', border: '1px solid #000', textAlign: 'center', width: '14px'}}>
                    {props.data.sCountryID[1]}
                    </td>
                    <td valign="center" style={{fontSize: '11px', border: '1px solid #000', textAlign: 'center', width: '14px'}}>
                    {sgbid[0]} 
                    </td>
                    <td valign="center" style={{fontSize: '11px', border: '1px solid #000', textAlign: 'center', width: '14px'}}>
                    {sgbid[1]}
                    </td>
                    <td valign="center" style={{fontSize: '11px', border: '1px solid #000', textAlign: 'center', width: '14px'}}>
                    {sgbid[2]}
                    </td>
                    <td valign="center" style={{fontSize: '11px', border: '1px solid #000', textAlign: 'center', width: '14px'}}>
                    {sgbid[3]}
                    </td>
                    <td valign="center" style={{fontSize: '11px', border: '1px solid #000', textAlign: 'center', width: '14px'}}>
                    {sgbid[4]}
                    </td>
                    <td valign="center" style={{fontSize: '11px', border: '1px solid #000', textAlign: 'center', width: '14px'}}>
                    {sgbid[5]}
                    </td>
                    <td valign="center" style={{fontSize: '11px', border: '1px solid #000', textAlign: 'center', width: '14px'}}>
                    {sgbid[6]}
                    </td>
                  </tr>
                </tbody></table>
            </td>
          </tr>
          <tr><td style={{paddingBottom: '150px'}} /></tr>
          <tr>
            <td style={{textAlign: 'left', paddingRight: '5px', fontSize: '21px'}} width="27%" valign="top">མཚན།</td>
            <td style={{textAlign: 'left', fontSize: '20px'}} valign="top" width="73%">{props.data.tibetanName}</td>
          </tr>
          <tr>
            <td style={{textAlign: 'left', paddingRight: '5px', fontSize: '21px'}}>སྐྱེས་ལོ་ཟླ་ཚེས།</td>
            <td style={{textAlign: 'left', fontSize: '20px'}}>{props.data.sDOBApprox==='Y'?props.data.sTibetanDate.substring(0, 4):props.data.sTibetanDate}</td>
            {/* <td style={{textAlign: 'left', fontSize: '20px'}}>{props.data.sTibetanDate}</td>             */}
          </tr>
          <tr>
            <td style={{textAlign: 'right', paddingRight: '5px', fontSize: '21px'}} />
            <td style={{textAlign: 'left', fontSize: '20px'}} />
          </tr>
          <tr>
            <td style={{textAlign: 'right', paddingRight: '5px', fontSize: '21px'}} />
            <td style={{textAlign: 'left', fontSize: '20px'}} />
          </tr>
          <tr>
            <td style={{textAlign: 'left', paddingRight: '5px', fontSize: '21px'}}>ཕ་ཡུལ།</td>
            <td style={{textAlign: 'left', fontSize: '20px'}}>{props.data.tbuOriginVillage}</td>
          </tr>
          <tr>
            <td style={{textAlign: 'left', paddingTop: '25px', paddingRight: '5px', fontSize: '10px'}}>Book S. No.: </td> 
            <td style={{textAlign: 'left', paddingTop: '25px', paddingRight: '5px', fontSize: '10px'}}>
            {props.data.nCurrentBookNo + '-' + props.data.sRegion_code}
            </td>
          </tr>
          <tr>
            <td style={{textAlign: 'left', paddingRight: '5px', fontSize: '10px'}}>Pre. Book S. No.: </td> 
            <td style={{textAlign: 'left', paddingRight: '5px', fontSize: '10px'}}>
            
              {props.data.nPreviousBookNo ? props.data.nPreviousBookNo : <p style={{fontSize: '1.8em'}}>མེད།</p>}
              
            </td>
          </tr>
          <tr><td style={{height: '20px'}} /></tr>
        </tbody>
      </table>
      <br/>
</div>
  
   </>


          
  );
}
