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

import {PrintCard} from './printcard';
import { Print } from '@material-ui/icons';

 


export default function PrintGreenBook() {

    
let count=3;
  return (

    < >
    
    <div  style={{marginLeft:'50px' , marginTop:'50px' , fontSize:'14px' , fontFamily: '"Times New Roman", Georgia, Serif', color:'#000000'}}>
      

        <PrintCard/>
        <PrintCard/>
        {count%2==1 && <br/>}
        <PrintCard/>

     
    </div>
  
   </>


          
  );
}
