import React from 'react';
import { Card,InputAdornment,FormControlLabel,Checkbox,List,ListItem } from '@material-ui/core';
import {Link, Box, Container, Grid,CardContent, Button, FormControl, FormLabel, TextField, InputLabel, MenuItem, TextareaAutosize} from '@material-ui/core';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TableBodyRow } from 'mui-datatables';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Himalaya from '../../assets/fonts/himalaya.ttf';
import GoogleIcon from '../../assets/images/Google_ICON.png';
import Pdf from "react-to-pdf";
import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';

import Typography from '@material-ui/core/Typography';
import { PayPalButton } from "react-paypal-button-v2";
import Flag from 'react-flagkit';
import hero6 from '../../assets/images/hero-bg/hero-1.jpg';
import back from '../../assets/images/background.jpg';
import newback from '../../assets/images/new-background.jpg';
import projectLogo from '../../assets/images/CTALogo.png';
import wallpaper from '../../assets/images/wallpaper.jpg';

import { renderToString } from 'react-dom/server'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 1000,
    alignContent: "center",
    textAlign: "center"
  },
  table: {
    minWidth: 650,
  },
  typography:{
    fontFamily:'Poppins',
  }

}));

const ref = React.createRef();
export default function Test () {
  const classes = useStyles();
  const theme = useTheme();

  const fontName='Poppins';
//const rowBackGround,setRowBack
const StringPDF = renderToString(  
    <table
    /*ref={ref}*/ id='mytable'
    className='mytable'
    cellspacing='0'
    style={{
      border: '3px solid #000000',
     
     
    }}>
    <tr>
      <td width='20'></td>
      <td width='200'></td>
      <td width='175'></td>
      <td width='175'></td>

      <td width='20'></td>
    </tr>
    <tr>
      <td width='20'></td>
      <td colSpan='2' height='35' align='left' valign='middle'>
        <b>
          <font
            face='Microsoft Himalaya'
            size={5}
            color='#000000'>
            ༄༅། །བཙན་བྱོལ་བོད་མིའི་དཔྱ་དངུལ་བྱུང་འཛིན་ཨང་།
          </font>
        </b>
      </td>

      <td align='right'>
      QR
      </td>
      <td width='20'></td>
    </tr>
    <tr>
      <td width='20'></td>
      <td colspan='2' height='28' align='left' valign='middle'>
        <b>
          <font
            face='Microsoft Himalaya'
            size={4}
            color='#000000'>
            མིང་།
          </font>
          <font size={4} color='#000000'>
            FirstName
          </font>
        </b>
      </td>
      <td align='right' valign='middle'>
        <b>
          <font
            face='Microsoft Himalaya'
            size={4}
            color='#000000'>
            རང་ལོ།   AGE
          </font>
        </b>
      </td>
      <td width='20'></td>
    </tr>
    <tr>
      <td
        colspan='5'
        height='27'
        align='left'
        valign='top'>
        <table>
          <tr>
            <td
              style={{
                width: '200px',
                paddingLeft: '20px',
                borderTop: '3px solid #000000'
              }}>
              <b>
                <font
                  face='Microsoft Himalaya'
                  size={4}
                  color='#000000'>
                  
                  དཔྱ་དེབ་ཨང་།
                </font>
              </b>
            </td>
            <td
              align='center'
              style={{ border: '3px solid #000000' }}
              width='32'>
              <b>
                <font size={4} color='#000000'>
                  X
                </font>
              </b>
            </td>
            <td
              align='center'
              style={{
                borderTop: '3px solid #000000',
                borderBottom: '3px solid #000000',
                borderRight: '3px solid #000000'
              }}
              width='32'>
              <b>
                <font size={4} color='#000000'>
                  X
                </font>
              </b>
            </td>
            <td
              align='center'
              style={{
                borderTop: '3px solid #000000',
                borderBottom: '3px solid #000000',
                borderRight: '3px solid #000000'
              }}
              width='32'>
              <b>
                <font size={4} color='#000000'>
                  0
                </font>
              </b>
            </td>
            <td
              align='center'
              style={{
                borderTop: '3px solid #000000',
                borderBottom: '3px solid #000000',
                borderRight: '3px solid #000000'
              }}
              width='32'>
              <b>
                <font size={4} color='#000000'>
                  0
                </font>
              </b>
            </td>
            <td
              align='center'
              style={{
                borderTop: '3px solid #000000',
                borderBottom: '3px solid #000000',
                borderRight: '3px solid #000000'
              }}
              width='32'>
              <b>
                <font size={4} color='#000000'>
                  0
                </font>
              </b>
            </td>
            <td
              align='center'
              style={{
                borderTop: '3px solid #000000',
                borderBottom: '3px solid #000000',
                borderRight: '3px solid #000000'
              }}
              width='32'>
              <b>
                <font size={4} color='#000000'>
                  0
                </font>
              </b>
            </td>
            <td
              align='center'
              style={{
                borderTop: '3px solid #000000',
                borderBottom: '3px solid #000000',
                borderRight: '3px solid #000000'
              }}
              width='32'>
              <b>
                <font size={4} color='#000000'>
                  0
                </font>
              </b>
            </td>
            <td
              align='center'
              style={{
                borderTop: '3px solid #000000',
                borderBottom: '3px solid #000000',
                borderRight: '3px solid #000000'
              }}
              width='32'>
              <b>
                <font size={4} color='#000000'>
                  0
                </font>
              </b>
            </td>
            <td
              align='center'
              style={{
                borderTop: '3px solid #000000',
                borderBottom: '3px solid #000000',
                borderRight: '3px solid #000000'
              }}
              width='32'>
              <b>
                <font size={4} color='#000000'>
                0
                </font>
              </b>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td width='20'></td>
      <td colSpan='3' height='7' align='left' valign='top'>
        <font
          face='Microsoft Himalaya'
          size={4}
          color='#000000'></font>
      </td>
      <td width='20'></td>
    </tr>
    <tr>
      <td
        width='20'
        height='26'
        style={{ borderBottom: '1px solid #000000' }}></td>
      <td
        colspan='2'
        style={{ borderBottom: '1px solid #000000' }}
        align='left'
        valign='bottom'>
        <b>
          <font
            face='Microsoft Himalaya'
            size={4}
            color='#000000'>
            ༡། དཔྱ་དངུལ།
          </font>
        </b>
      </td>
      <td
        style={{ borderBottom: '2px solid #000000' }}
        align='left'
        valign='bottom'>
        <b>
          <font
            face='Microsoft Himalaya'
            size={4}
            color='#000000'>
            སྒོར།{' '}
            Chatrel
          </font>
        </b>
      </td>
      <td
        width='20'
        style={{ borderBottom: '2px solid #000000' }}></td>
    </tr>
    <tr>
      <td
        width='20'
        style={{ borderBottom: '1px solid #000000' }}
        height='26'></td>
      <td
        colspan='2'
        style={{ borderBottom: '1px solid #000000' }}
        align='left'
        valign='bottom'>
        <b>
          <font
            face='Microsoft Himalaya'
            size={4}
            color='#000000'>
            ༢། ཟས་བཅད་དོད།
          </font>
        </b>
      </td>
      <td
        style={{ borderBottom: '2px solid #000000' }}
        align='left'
        valign='bottom'>
        <b>
          <font
            face='Microsoft Himalaya'
            size={4}
            color='#000000'>
            སྒོར།  Meal
          </font>
        </b>
      </td>
      <td
        width='20'
        style={{ borderBottom: '2px solid #000000' }}></td>
    </tr>
    <tr>
      <td
        width='20'
        style={{ borderBottom: '1px solid #000000' }}
        height='26'></td>
      <td
        colspan='2'
        style={{ borderBottom: '1px solid #000000' }}
        align='left'
        valign='bottom'>
        <b>
          <font
            face='Microsoft Himalaya'
            size={4}
            color='#000000'>
            ༣། ཕོགས་འབབ།
          </font>
        </b>
      </td>
      <td
        style={{ borderBottom: '2px solid #000000' }}
        align='left'
        valign='bottom'>
        <b>
          <font
            face='Microsoft Himalaya'
            size={4}
            color='#000000'>
            སྒོར།{' '}
            Salary
          </font>
        </b>
      </td>
      <td
        width='20'
        style={{ borderBottom: '2px solid #000000' }}></td>
    </tr>
    <tr>
      <td
        width='20'
        style={{ borderBottom: '1px solid #000000' }}
        height='26'></td>
      <td
        colspan='2'
        style={{ borderBottom: '1px solid #000000' }}
        align='left'
        valign='bottom'>
        <b>
          <font
            face='Microsoft Himalaya'
            size={4}
            color='#000000'>
            ༤། ཚོང་ཁེའི་བློས་བཅད་ཞལ་འདེབས།
          </font>
        </b>
      </td>
      <td
        style={{ borderBottom: '2px solid #000000' }}
        align='left'
        valign='bottom'>
        <b>
          <font
            face='Microsoft Himalaya'
            size={4}
            color='#000000'>
            སྒོར།{' '}
            BDON
          </font>
        </b>
      </td>
      <td
        width='20'
        style={{ borderBottom: '2px solid #000000' }}></td>
    </tr>
    <tr>
      <td
        width='20'
        style={{ borderBottom: '1px solid #000000' }}
        height='26'></td>
      <td
        colspan='2'
        style={{ borderBottom: '1px solid #000000' }}
        align='left'
        valign='bottom'>
        <b>
          <font
            face='Microsoft Himalaya'
            size={4}
            color='#000000'>
            ༥། དཔྱ་དངུལ་འབུལ་ཆད་འབབ།
          </font>
        </b>
      </td>
      <td
        style={{ borderBottom: '2px solid #000000' }}
        align='left'
        valign='bottom'>
        <b>
          <font
            face='Microsoft Himalaya'
            size={4}
            color='#000000'>
            སྒོར །                          
          </font>
        </b>
      </td>
      <td
        width='20'
        style={{ borderBottom: '2px solid #000000' }}></td>
    </tr>
    <tr>
      <td
        width='20'
        style={{ borderBottom: '1px solid #000000' }}
        height='26'></td>
      <td
        colspan='2'
        style={{ borderBottom: '1px solid #000000' }}
        align='left'
        valign='bottom'>
        <b>
          <font
            face='Microsoft Himalaya'
            size={4}
            color='#000000'>
            ༦། འཕར་འབུལ་ཞལ་འདེབས།
          </font>
        </b>
      </td>
      <td
        style={{ borderBottom: '2px solid #000000' }}
        align='left'
        valign='bottom'>
        <b>
          <font
            face='Microsoft Himalaya'
            size={4}
            color='#000000'>
            སྒོར།{' '}
            ADO
          </font>
        </b>
      </td>
      <td
        width='20'
        style={{ borderBottom: '2px solid #000000' }}></td>
    </tr>
    <tr>
      <td width='20'></td>
      <td colSpan='3' height='10' align='left' valign='top'>
        <font
          face='Microsoft Himalaya'
          size={4}
          color='#000000'></font>
      </td>
      <td width='20'></td>
    </tr>
    <tr>
      <td width='20' height='34'></td>
      <td colspan='2' align='left' valign='bottom'>
        <font
          face='Microsoft Himalaya'
          size={4}
          color='#000000'>
          <b>བཅས་བསྡོམས་</b>{' '}
          US$/CA$/AU$/NT$/CHF/EURO/GBP/YEN/RR/
        </font>
      </td>
      <td
        align='left'
        style={{ paddingLeft: '30px' }}
        valign='bottom'>
        <b>
          <font
            face='Microsoft Himalaya'
            size={4}
            color='#000000'>
            སྒོར{' '}
          </font>
          <font size={4} color='#000000'>
            TOTAL
          </font>
        </b>
      </td>
      <td width='20'></td>
    </tr>
    <tr>
      <td width='20' height='31'></td>
      <td colspan='3' align='left' valign='middle'>
        <font
          face='Microsoft Himalaya'
          size={4}
          color='#000000'>
          <b>
            ཕྱི་ལོ་༌་་་་་་་་་་་་་་༌༌༌༌༌་་་་་་་་་་་་༌༌༌༌༌༌༌༌༌༌༌ལོའི་དཔྱ་དངུལ་འབུལ་འབབ་རྩིས་འབུལ་བྱུང་བའི་འཛིན་དུ།{' '}
          </b>
        </font>
      </td>
      <td width='20'></td>
    </tr>
    <tr>
      <td width='20'></td>
      <td colSpan='3' height='32' align='left' valign='top'>
        <font
          face='Microsoft Himalaya'
          size={4}
          color='#000000'></font>
      </td>
      <td width='20'></td>
    </tr>
    <tr>
      <td width='20' height='33'></td>
      <td colspan='3' align='left' valign='middle'>
        <font
          face='Microsoft Himalaya'
          size={4}
          color='#000000'>
          <b>
            བོད་རིགས་སྤྱི་མཐུན་ཚོགས་པའམ་བོད་རིགས་ཚོགས་པའི་ལས་དམ་དང་མཚན་རྟགས།
            &nbsp;&nbsp;&nbsp; ཕྱི་ལོ༌
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ཟླ་
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ཚེས་
            &nbsp;&nbsp;&nbsp; ལ།
          </b>
        </font>
      </td>
      <td width='20'></td>
    </tr>
    <tr>
      <td width='20'></td>
      <td colSpan='3' height='16' align='left' valign='top'>
        <font size={2} color='#000000'>
          This is computer generated Chatrel receipt, no
          signature required.
        </font>
      </td>
      <td width='20'></td>
    </tr>
    <tr>
      <td width='20'></td>
      <td colSpan='3' height='16' align='left' valign='top'>
        <font size={2} color='#000000'>
          You are advised to update chatrel contribution on your <br/>
          
          Greenbook from Office of Tibet or concerned Tibetan Association/Tibetan Community.
        </font>
      </td>
      <td width='20'></td>
    </tr>
   
    <tr>
      <td width='20'></td>
      <td colSpan='3' height='16' align='left' valign='top'>
        <font
          face='Microsoft Himalaya'
          size={4}
          color='#000000'></font>
      </td>
      <td width='20'></td>
    </tr>
  </table>);

  console.log(StringPDF);

  return (
    <>
       <div className="app-wrapper min-vh-100 bg-white">
                    <div className="hero-wrapper w-100 bg-composed-wrapper bg-midnight-bloom min-vh-100">
                        <div className="flex-grow-1 w-100 d-flex align-items-center">
                            <div className="bg-composed-wrapper--image opacity-9" style={{backgroundImage: 'url(' + newback + ')'}}/>
                            <div className="bg-composed-wrapper--bg bg-second opacity-7"/>
                            <div className="bg-composed-wrapper--content p-3 p-md-5">
                                <Container>
                                    <Card className="rounded-sm modal-content p-3 bg-white-10">
                                        <Card className="rounded-sm overflow-hidden shadow-xxl font-size-sm p-3 p-sm-0">
                                            <Grid container spacing={0}>
                                                <Grid item lg={6} className="d-flex align-items-center justify-content-center flex-column">
                                                    <div className="divider-v divider-v-lg d-none d-lg-block" />
                                                    <div className="text-center mt-4">
                                                    <img alt="CTA" src={projectLogo} width="200px" height="200px"/>
                                                    <h4  className="display-3 mb-1 text-black">eChatrel</h4>
                                           <h6 className="display-5 mb-1 text-black ">Your go-to resource for supporting the Tibetan Government</h6>
                                                    </div>
                                                    <div className="text-center mb-3">
                                                            <Button className="m-1  btn-pill" style={{border:'1px solid black'}} >
                                            <span className="mr-2" >
                                               <img alt="..." className="img-fluid" height="50" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHElEQVQ4T6VTQUgUYRT+3j/+1Ebmhprd7NDSLYlchQ1jV91DFEFs7KEsIg+LdEiIIvDiQTc6Z0gRXmohWYo65jqFNiGrLRV1KLBjbmvJtjaSzo7zYpZtnZEtD73be7zv430f3yNsqoXg4QapiD4GwgB8ALwAFgC8JEvcanyRzjgh5Gy+dbb2M1EcgGczcbm3iHFHGtsGvJqWt2cVgsUu/wiAS38BboyJ5oWlBBuez3ypEOS6/D0E3HeATQAJMKZY8DKYDhIQA1AgYYYaU29sSaUi1lC7FD80aa3VtJVnOUvh7r0Trz84r1k61r7LNOBpUtM5lweGKi+gKEb1B/vnzOyODgYFmtTZmS2l/LnAUGWCGGfsfu1d/djOK197neDQsH6eCHuqElr0iYqT8hWAQFnRTdltXHcudw7pb0FoqUbAIO2/CACkySnh6Wrz2OkT824JQz+HIah5w3XYZtsBA8BPyEjJi0Uot2OFI3MfTW+HECIwG01WNXFwkMW0XPkMYF8JDlwjTqEulD/5TLdke9mHHAsKZ6LJ9y7dzBSK66MEsvNg1zos80Apif7xSA+zO0jESIBoyiLOE8NHLM5uz/b/kL9ajtr5IfBddaA2Voly63hkBLx1lOVyMO35fm61RtYdn7hKK65n8j+MXGbgxj+eyT74EQvRm4kmC5VfcGpte3yqfr1IfcQUBsEHxm4AWWJMW4q4l4kmNef+b0N4yYovWTzTAAAAAElFTkSuQmCC"} />
                                            </span>
                                                  <div style={{fontFamily:'Roboto'}}>            
                                              Sign in with Google
                                                    </div>    
                                                            </Button></div  >
                                                 
                                                </Grid>
                                                <Grid item lg={6} className="d-flex align-items-center justify-content-center flex-column bg-secondary">
                                                    <div className="p-3">
                                                        <div className="p-4">
                                                            <div className="d-block d-xl-flex">
                                                                <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                                                    <FontAwesomeIcon icon={['fas', 'id-card']} className="font-size-xl text-first"/>
                                                                </div>
                                                                <div className="pl-0 pl-xl-3">
                                                                    <div className="text-black  font-size-lg mb-1">Map Google Account with Green Book</div>
                                                                    <p className="mb-0 text-black-75">Update your Google Account by filling <a className='text-first'> this form</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-4">
                                                            <div className="d-block d-xl-flex">
                                                                <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                                                    <FontAwesomeIcon icon={['fas', 'user']} className="font-size-xl text-first"/>
                                                                </div>
                                                                <div className="pl-0 pl-xl-3">
                                                                    <div className="text-black font-weight-bold font-size-xxl mb-1">དྭང་བླངས་དཔྱ་དངུལ་དྲ</div>
                                                                    <p className="mb-0 text-black-75 font-size-xl">དྭང་བླངས་དཔྱ་དངུལ་དྲ་རྒྱའི་བརྒྱུད་གནང་བར་ཐུགས་རྗེ་ཆེ་ཞུ། དྭང་བླངས་དཔྱ་དངུལ་དྲ དྭང་བླངས་དཔྱ་དངུལ་དྲ་རྒྱའི་བརྒྱུད་གནང་བར་ཐུགས་རྗེ་ཆེ་ཞུ། དྭང་བླངས་དཔྱ་དངུལ་དྲ</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-4">
                                                            <div className="d-block d-xl-flex">
                                                                <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                                                    <FontAwesomeIcon icon={['fas', 'seedling']} className="font-size-xl text-first"/>
                                                                </div>
                                                                <div className="pl-0 pl-xl-3">
                                                                    <div className="text-black  font-size-lg mb-1">Goals and Needs of Chatrel</div>
                                                                    <p className="mb-0 text-black-75">Chatrel symbolizes the Tibetan people’s recognition of CTA as their legitimate representative. Chatrel payment exhibits Tibetan people’s support for CTA’s financial needs until Tibet regains freedom. </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Card>
                                </Container>
                            </div>
                        </div>
                        {/* <div className="hero-footer w-100 pb-4">
                            <Container>
                                <div className="py-3 d-block d-lg-flex font-size-xs justify-content-between">
                                    <div className="text-center d-block mb-3 mb-md-0 text-white">
                                        Copyright &copy; 2020 - UiFort.com
                                    </div>
                                    <List component="div" className="nav-transparent text-nowrap d-flex justify-content-center">

                                            <ListItem button className="text-white-50" href="#/" onClick={e => e.preventDefault()}>
                                                Privacy Policy
                                            </ListItem>
                                                <ListItem button className="text-white-50" href="#/" onClick={e => e.preventDefault()}>
                                                Terms of Service
                                            </ListItem>

                                    </List>
                                </div>
                            </Container>
                        </div> */}
                    </div>
                </div>

                <div className="app-wrapper min-vh-100 bg-white">
                    <div className="hero-wrapper w-100 bg-composed-wrapper bg-midnight-bloom min-vh-100">
                        <div className="flex-grow-1 w-100 d-flex align-items-center">
                            <div className="bg-composed-wrapper--image opacity-9" style={{backgroundImage: 'url(' + newback + ')'}}/>
                            <div className="bg-composed-wrapper--bg bg-second opacity-7"/>
                            <div className="bg-composed-wrapper--content p-3 p-md-5">
                                <Container>
                                    <Card className="rounded-sm modal-content p-3 bg-white-10">
                                        <Card className="rounded-sm overflow-hidden shadow-xxl font-size-sm p-3 p-sm-0">
                                            <Grid container spacing={0}>
                                                <Grid item lg={6} className="d-flex align-items-center justify-content-center flex-column">
                                                    <div className="divider-v divider-v-lg d-none d-lg-block" />
                                                    <div className="text-center mt-4">
                                                    <img alt="CTA" src={projectLogo} width="200px" height="200px"/>
                                                    <h4  className="display-3 mb-1  text-black">eChatrel</h4>
                                           <h6 className="display-5 mb-1 text-black ">Your go-to resource for supporting the Tibetan Government</h6>
                                                    </div>
                                                    {/* <div className="text-center mb-3">
                                                            <Button className="m-2 btn-pill px-4 font-weight-bold btn-google" size="small">
                                            <span className="btn-wrapper--icon">
                                                <FontAwesomeIcon icon={['fab', 'google']} />
                                            </span>
                                                                <span className="btn-wrapper--label">
                                                Login with Google
                                            </span>
                                                            </Button></div  > */}
                                                    {/* <div className="py-4">
                                                        
                                                            <Button className="m-2 btn-pill px-4 font-weight-bold btn-facebook" size="small">
                                            <span className="btn-wrapper--icon">
                                                <FontAwesomeIcon icon={['fab', 'facebook']} />
                                            </span>
                                                                <span className="btn-wrapper--label">
                                                Login with Facebook
                                            </span>
                                                            </Button>
                                                        </div>
                                                        <div className="text-center text-black-50 py-2 mb-4">
                                                            or sign in with credentials
                                                        </div>
                                                        <div>
                                                            <div className="mb-4">
                                                                <TextField fullWidth
                                                                           variant="outlined"
                                                                           id="textfield-email"
                                                                           label="Email address"
                                                                           InputProps={{
                                                                               startAdornment: (
                                                                                   <InputAdornment position="start">
                                                                                       
                                                                                   </InputAdornment>
                                                                               ),
                                                                           }}
                                                                />
                                                            </div>
                                                            <div className="mb-3">
                                                                <TextField fullWidth
                                                                           variant="outlined"
                                                                           id="textfield-password"
                                                                           label="Password"
                                                                           type="password"
                                                                           InputProps={{
                                                                               startAdornment: (
                                                                                   <InputAdornment position="start">
                                                                                     
                                                                                   </InputAdornment>
                                                                               ),
                                                                           }}
                                                                />
                                                            </div>
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            //checked={checked1}
                                                                           // onChange={handleChange1}
                                                                            value="checked1"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    className="font-size-md"
                                                                    label="Remember me"
                                                                />
                                                                <div>
                                                                    <a className="text-first" href="#/" onClick={e => e.preventDefault()}>Recover password</a>
                                                                </div>
                                                            </div>
                                                            <div className="text-center py-4">
                                                                <Button className="btn-second font-weight-bold w-50 my-2">Sign in</Button>
                                                            </div>
                                                            <div className="text-center text-black-50 mt-3">
                                                                Don't have an account? <a className="text-first" href="#/" onClick={e => e.preventDefault()}>Sign up</a>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </Grid>
                                                <Grid item lg={6} className="d-flex align-items-center justify-content-center flex-column bg-secondary">
                                                    <div className="p-3">
                                               
                                                        <div className="text-center text-black py-2 mb-4">
                                                            Signed in with ctadummytest@gmail.com.<a className="text-first"> Sign Out?</a>
                                                        </div>
                                                        <h5 className="display-5 mb-4 text-center text-black "> Great! Just one more step now.</h5>
                                                        <div>
                                                            <div className="mb-4">
                                                                <TextField fullWidth
                                                                           variant="outlined"
                                                                           id="textfield-email"
                                                                           label="Green Book Number"
                                                                           placeholder="Enter Green Book Number"
                                                                           InputProps={{
                                                                               startAdornment: (
                                                                                   <InputAdornment position="start">
                                                                                       <FontAwesomeIcon icon={['fas', 'id-card']} />
                                                                                   </InputAdornment>
                                                                               ),
                                                                           }}
                                                                />
                                                            </div>
                                                            <div className="mb-3">
                                                                <TextField fullWidth
                                                                           variant="outlined"
                                                                           id="textfield-password"
                                                                           label="Date of Birth"
                                                                           placeholder="Enter Date of Birth"
                                                                           type="text"
                                                                           InputProps={{
                                                                               startAdornment: (
                                                                                   <InputAdornment position="start">
                                                                                     <FontAwesomeIcon icon={['fas', 'calendar']} />
                                                                                   </InputAdornment>
                                                                               ),
                                                                           }}
                                                                />
                                                            </div>
                                                            {/* <div className="d-flex align-items-center justify-content-between">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            //checked={checked1}
                                                                           // onChange={handleChange1}
                                                                            value="checked1"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    className="font-size-md"
                                                                    label="Remember me"
                                                                />
                                                                <div>
                                                                    <a className="text-first" href="#/" onClick={e => e.preventDefault()}>Recover password</a>
                                                                </div>
                                                            </div> */}
                                                            <div className="text-center py-4">
                                                                {/* <Button className="btn-second font-weight-bold w-50 my-2">VERIFY</Button> */}
                                                                <Button className="m-1  btn-pill w-50" style={{border:'1px solid black'}} > VERIFY</Button>
                                                            </div>
                                                          {/* <div className="text-center text-black-50 mt-3">
                                                                Update Google Account ? <a className="text-first" href="#/" onClick={e => e.preventDefault()}>Click here</a>
                                                            </div> */}
                                                        </div>
                                                  
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Card>
                                </Container>
                            </div>
                        </div>
                        {/* <div className="hero-footer w-100 pb-4">
                            <Container>
                                <div className="py-3 d-block d-lg-flex font-size-xs justify-content-between">
                                    <div className="text-center d-block mb-3 mb-md-0 text-white">
                                        Copyright &copy; 2020 - UiFort.com
                                    </div>
                                    <List component="div" className="nav-transparent text-nowrap d-flex justify-content-center">

                                            <ListItem button className="text-white-50" href="#/" onClick={e => e.preventDefault()}>
                                                Privacy Policy
                                            </ListItem>
                                                <ListItem button className="text-white-50" href="#/" onClick={e => e.preventDefault()}>
                                                Terms of Service
                                            </ListItem>

                                    </List>
                                </div>
                            </Container>
                        </div> */}
                    </div>
                </div>
                

    </>
  );
}
