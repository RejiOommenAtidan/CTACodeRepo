import React , { useEffect, useState } from 'react';
import { Card ,CardContent,Typography ,Grid,Link,Button,ListItem,List} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive'

import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import FavoriteIcon from '@material-ui/icons/Favorite';
//import projectLogo from '../../assets/images/ctalogo.png';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Alerts } from '../alerts';
import img from '../../assets/images/home_pending.jpg';
import {useHistory} from 'react-router-dom';
import { storeCurrentGBDetails } from '../../actions/transactions/CurrentGBDetailsAction';
import {storeGBDetails} from '../../actions/transactions/GBDetailsAction';
import {storeSession} from '../../actions/transactions/SessionAction';
import logo1 from '../../assets/images/stock-logos/discord-icon.svg';

import logo2 from '../../assets/images/stock-logos/google-icon.svg';

//import people1 from '../../assets/images/DIR_9758.JPG';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountUp from 'react-countup';
import HomeIcon from '@material-ui/icons/Home';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));


export default function Home() {
  

  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('');
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType
  };
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    setSnackbar(true);
  };
  const snackbarClose = () => {
    setSnackbar(false);
  };


  const [backdrop, setBackdrop] = React.useState(true);
  const responsive = useMediaQuery({query: '(max-width: 1100px)'})
  const sGBID=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sGBID);
  //const pageFrom=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.from);
  //const payingFor=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sName);
  const paidByGBID=useSelector(state => state.GBDetailsReducer.oGBDetails.sGBID);
  const paidByName= useSelector(state => state.GBDetailsReducer.oGBDetails.sName);
  const oGBDetails = useSelector(state => state.GBDetailsReducer.oGBDetails);
  const [chatrelPending, setChatrelPending] = React.useState(null);

  const [currencySymbol, setCurrencySymbol] = React.useState();
  const [paymentData, setPaymentData] = React.useState();
  const [sHomePageImage, setsHomePageImage] = React.useState(null);
  const [sHomePageMessage, setsHomePageMessage] = React.useState(null);
  const [sHomePageName, setsHomePageName] = React.useState(null);
  const [sHomePageDesignation, setsHomePageDesignation] = React.useState(null);
  const [sFAQDocument, setsFAQDocument] = React.useState(null);

  const [outstanding, setOutstanding] = useState(false);
  const [donationDiv, setDonationDiv] = useState(false);
  const [thankYouMsg, setThankYouMsg] = useState(false);
  const [thankYouMsgFY, setThankYouMsgFY] = useState("");
  const [empty, setEmpty] = useState(false);
  let history = useHistory();
  let dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  useEffect(() => {
    axios.get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=`+paidByGBID)
    .then(resp => {
      if (resp.status === 200) {



      
      //Store New Token
      const oSession={
        sJwtToken:resp.data.token,
        bSession:true
      }
      dispatch(storeSession(oSession));
      axios.get(`/ChatrelPayment/GetHomePageData`)
      .then(resp => {
        if (resp.status === 200) {
          setBackdrop(false);
          const oSession={
            sJwtToken:resp.data.token,
            bSession:true
          }
          dispatch(storeSession(oSession));
          console.log("Home Page Data Display", resp.data);
          setsHomePageImage(resp.data.sHomePageImage);
          setsHomePageMessage(resp.data.sHomePageMessage);
          setsHomePageName(resp.data.sHomePageName);
          setsHomePageDesignation(resp.data.sHomePageDesignation);
         // setsFAQDocument(resp.data.sFAQDocument);
               
        }
      })
      .catch(error => {
        if(error.response.status!==401){
          setBackdrop(false);
          setAlertMessage('Something went wrong, please try again later');
          setAlertType('error');
          snackbarOpen();
          
        }
        console.log(error.message);
        console.log(error.response.status);
    
      });
     //const x =               
      //oGBDetails.sAuthRegion=resp.data.chatrel.authRegionProfile;
      //dispatch(storeGBDetails({...oGBDetails,sAuthRegion:resp.data.chatrel.authRegionProfile}));
     //console.log('x',x,oGBDetails);
      if(resp.data.message!=="Paid Until Missing")
      {
      if(resp.data.chatrel.chatrelPayment.nChatrelTotalAmount === 0){
        setChatrelPending('0');
        setThankYouMsg(true);
        setThankYouMsgFY(resp.data.chatrel.chatrelFrom+'-'+resp.data.chatrel.chatrelTo);
        if(resp.data.chatrel.gbChatrels[0].nCurrentChatrelSalaryAmt===0){
          setOutstanding(false);
        }
        else{
          setDonationDiv(true);
        }
        
        // setCurrencySymbol(resp.data.currency === 'INR' ? '₹' : '$' );
        // element.disabled = false;
        // return;
      }
      else{
        setChatrelPending(resp.data.chatrel.chatrelPayment.nChatrelTotalAmount);
        setOutstanding(true);
      }
      setPaymentData(resp.data.chatrel);
      console.log(resp.data.chatrel);
      
      
      if(resp.data.chatrel.gbChatrels[0].sAuthRegionCurrency === 'USD'){
        setCurrencySymbol('$');
      }
      else{
        setCurrencySymbol('₹');
      }
    }
    else{
      setEmpty(true);
    }
  }
      console.log("Data fetched...", resp.data);
      
   
  })
  .catch(error => {
    if(error.response.status!==401){
      setBackdrop(false);
      setAlertMessage('Something went wrong, please try again later');
      setAlertType('error');
      snackbarOpen();
    }
    console.log(error.message);
    console.log(error.response.status);

  });
  
}, []);

 

 const makePayment = (obj)=> {
 
  dispatch(storeCurrentGBDetails(obj));
  history.push('/Chatrel');
}


  return (
    <>
   
      <Card className="card-box mb-spacing-6-x2" style={{  padding: 50,margin:'30px' }} >
   {/*     <h4>QUICK ACTIONS</h4>  */}
      
      <Grid container spacing={8}>
    
      { thankYouMsg && 
      <Grid item xs={12} >
    
    <div className="text-center text-black">
      <strong>
        <span className="font-size-xl d-block btn-icon d-40 mr-3 text-center bg-neutral-info rounded-sm text-info">
            <FontAwesomeIcon icon={['fas', 'check']} />
        </span>
        <span>
          <span style={{fontSize:'40px'}} > རྩིས་ལོ་</span><span style={{fontSize:'20px'}}> {thankYouMsgFY}</span><span style={{fontSize:'40px'}}> ལོའི་དྭང་བླངས་དཔྱ་དངུལ་འབུལ་འབབ་གཙང་འབུལ་ཟིན།</span>
          
</span>
</strong>
    </div>

        </Grid>

   }
        <Grid item xs={12} sm={12} lg={6} >
      <iframe className="w-100 card-box card-box-alt  shadow-xxl rounded"  height="350" src="https://www.youtube.com/embed/FlUaitZfFAo?autoplay=1" frameborder="0" start  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      
                                     
      
        </Grid>
        <Grid item xs={12} sm={12} lg={6} >
     
        {!responsive &&      <Card className="bg-secondary m-5 m-lg-0 object-skew hover-scale-lg shadow-xxl w-100 card-box">
                                                <List component="div" className="list-group-flush">
                                                    <ListItem component="a" button  onClick={()=>{makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' })}} className="d-flex rounded-top align-items-center py-3">
                                                        <div className="d-flex align-items-center">
                                                        <div  className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-warning text-white btn-icon mx-auto text-center shadow-warning " >
                                                           <FontAwesomeIcon icon={['fas', 'wallet']} className="display-4" />
                                                         </div>
                                                            <div style={{marginLeft:'10px'}}>
                                                                <div className="font-weight-bold text-black">
                                                                    Self Chatrel
                                                                </div>
                                                                <div className="text-black-50">Make Chatrel Contributions for yourself online</div>
                                                            </div>
                                                        </div>
                                                       { !empty && <div className="ml-auto">

                                                            <div className="badge badge-neutral-success text-success font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                                                             {chatrelPending>0  ? currencySymbol + chatrelPending : "PAID"}
                                                            </div>
                                                        </div>}
                                                    </ListItem>
                                                    <ListItem component="a" button  onClick={()=>{history.push('/Friends')}} className="d-flex align-items-center py-3">
                                                        <div className="d-flex align-items-center">
                                                        <div  className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-first text-white btn-icon mx-auto text-center shadow-first">
                                                           <FontAwesomeIcon icon={['fas', 'leaf']} className="display-4" />
                                                         </div>
                                                            <div style={{marginLeft:'10px'}}>
                                                                <div className="font-weight-bold text-black">
                                                                   Friends & Family Chatrel
                                                                </div>
                                                                <div className="text-black-50">Contribute Instantly for all of your Friends & Family</div>
                                                                
                                                            </div>
                                                        </div>
                                                        
                                                    </ListItem>
                                                  <ListItem component="a" button  onClick={()=>{history.push('/ChatrelHistory')}} className="d-flex align-items-center py-3">
                                                        <div className="d-flex align-items-center">
                                                        <div  className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-success text-white btn-icon mx-auto text-center shadow-success">
                                                           <FontAwesomeIcon icon={['fas', 'history']} className="display-4" />
                                                         </div>
                                                            <div style={{marginLeft:'10px'}}>
                                                                <div className="font-weight-bold text-black">
                                                                    Chatrel History
                                                                </div>
                                                                <div className="text-black-50">Check your previous Chatrel donations</div>
                                                                
                                                            </div>
                                                        </div>
                                                       
                                                    </ListItem> 
                                                  
                                                </List>
                                            </Card>}
                        {responsive &&  <Card className="bg-secondary m-2   shadow-xxl w-100 card-box">
                                                <List component="div" className="list-group-flush">
                                                    <ListItem component="a" button  onClick={()=>{makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' })}} className="d-flex rounded-top align-items-center py-3">
                                                        <div className="d-flex align-items-center">
                                                        <div  className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-warning text-white btn-icon mx-auto text-center shadow-warning " >
                                                           <FontAwesomeIcon icon={['fas', 'wallet']} className="display-4" />
                                                         </div>
                                                            <div style={{marginLeft:'10px'}}>
                                                                <div className="font-weight-bold text-black">
                                                                    Self Chatrel
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                       {/*  <div className="ml-auto">

                                                            <div className="badge badge-neutral-success text-success font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                                                             {chatrelPending>0  ? currencySymbol + chatrelPending : "PAID"}
                                                            </div>
                                                        </div>*/} 
                                                    </ListItem>
                                                    <ListItem component="a" button href="/Friends" onClick={()=>{history.push('/Friends')}} className="d-flex align-items-center py-3">
                                                        <div className="d-flex align-items-center">
                                                        <div  className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-first text-white btn-icon mx-auto text-center shadow-first">
                                                           <FontAwesomeIcon icon={['fas', 'leaf']} className="display-4" />
                                                         </div>
                                                            <div style={{marginLeft:'10px'}}>
                                                                <div className="font-weight-bold text-black">
                                                                   Friends & Family Chatrel
                                                                </div>
                                                                {/* <div className="text-black-50">Pay Instantly for all of your Friends & Family</div> */}
                                                                
                                                            </div>
                                                        </div>
                                                        
                                                    </ListItem>
                                                    <ListItem component="a" button href="/ChatrelHistory" onClick={()=>{history.push('/ChatrelHistory')}} className="d-flex align-items-center py-3">
                                                        <div className="d-flex align-items-center">
                                                        <div  className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-success text-white btn-icon mx-auto text-center shadow-success">
                                                           <FontAwesomeIcon icon={['fas', 'history']} className="display-4" />
                                                         </div>
                                                            <div style={{marginLeft:'10px'}}>
                                                                <div className="font-weight-bold text-black">
                                                                    Chatrel History
                                                                </div>
                                                                {/* <div className="text-black-50">Check your previous Chatrel donations</div> */}
                                                                
                                                            </div>
                                                        </div>
                                                       
                                                    </ListItem> 
                                                  
                                                </List>
                                            </Card>}
      
        </Grid>
        </Grid>
        
          <Grid container spacing={4} className="py-5">

          <Grid item xs={12} sm={6} lg={4}>
          <Card className="card-box card-box-alt  h-100 shadow-xxl  p-2 ">
                                <div className="card-content-overlay text-center pb-4">
                                    <div className="d-50 mb-1 card-icon-wrapper   btn-icon mx-auto text-center">
                                    {sHomePageImage && <img src={sHomePageImage}  style={{ width: 100,borderRadius:'10px' }} alt="..." />}
                                    </div>
                                    <FontAwesomeIcon icon={['fas', 'quote-right']} className="text-primary font-size-xxl"  style={{marginLeft:'15px'}}/>
                                    {sHomePageMessage &&  <div className=" text-dark opacity-8 my-4" style={{fontSize:'14px'}}>
                                  {sHomePageMessage}
                                      </div>}
                                   {sHomePageName&&   <div className="font-size-lg font-weight-bold">
                                      {sHomePageName}<br/>
                                          <small className="text-black-50 pl-2">{sHomePageDesignation}</small>
                                      </div>}
                                </div>
                            </Card>



</Grid>
          <Grid item xs={12} sm={6} lg={4}>
           { outstanding && 
          <Card className="card-box card-box-alt  shadow-xxl  p-2 ">
                                <div className="card-content-overlay text-center pb-4">
                                    <div className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-success text-white btn-icon mx-auto text-center shadow-success">
                                        <FontAwesomeIcon icon={['fas', 'hand-holding-usd']} className="display-3" />
                                    </div>
                                    <div className="font-weight-bold text-black display-3 mt-5 mb-1">
                                    
                                    <CountUp
                                    start={0}
                                    end={parseFloat(chatrelPending)}
                                    duration={1}
                                    //deplay={2}
                                    separator=" "
                                    decimals
                                    decimal="."
                                    prefix={currencySymbol}
                                    suffix=""
                                />
                                    </div>
                                    <div className="font-size-lg text-dark opacity-8 mb-5">Is your Pending Chatrel</div>
                                    <div className="divider mx-4 my-4" />
                                    <div className="text-center">
                                        <Button className="p-0 text-uppercase btn-link-success font-weight-bold font-size-sm btn-link" variant="text"
                                        onClick={()=>{makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' })}}
                                        >
                                            <span>PLEASE GO AHEAD & DONATE</span>
                                        </Button>
                                    </div>
                                </div>          



                            </Card>}
                           { (!outstanding && !empty && !donationDiv )&&
                            <Card className="card-box card-box-alt  shadow-xxl  p-2  h-100">
                                <div className="card-content-overlay text-center pb-4">
                                    <div className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-primary text-white btn-icon mx-auto text-center shadow-primary">
                                        <FontAwesomeIcon icon={['fas', 'briefcase']} className="display-3" />
                                    </div>
                                    <div className="font-weight-bold text-black display-4 mt-4 mb-1">
                                    Have you got a job now?
                                    </div>
                                    <div className="font-size-lg text-dark opacity-8">Change your status and contribute more towards the Tibetan Government.</div>
                                    <div className="divider mx-4 my-4" />
                                    <div className="text-center">
                                        <Button className="p-0 text-uppercase btn-link-primary font-weight-bold font-size-sm btn-link" variant="text"
                                        onClick={()=>{makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' })}}
                                        >
                                            <span>UPDATE EMPLOYMENT STATUS</span>
                                        </Button>
                                    </div>
                                </div>
                            </Card>}
                            { (donationDiv && !empty )&&
                            <Card className="card-box card-box-alt  shadow-xxl  p-2 ">
                                <div className="card-content-overlay text-center pb-4">
                                    <div className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-primary text-white btn-icon mx-auto text-center shadow-primary">
                                        <FontAwesomeIcon icon={['fas', 'donate']} className="display-3" />
                                    </div>
                                    <div className="font-weight-bold text-black display-4 mt-4 mb-1">
                                    Make Additional Donation
                                    </div>
                                    <div className="font-size-lg text-dark opacity-8">Contribute additional donation towards the Tibetan Government.</div>
                                    <div className="divider mx-4 my-4" />
                                    <div className="text-center">
                                        <Button className="p-0 text-uppercase btn-link-primary font-weight-bold font-size-sm btn-link" variant="text"
                                        onClick={()=>{makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' })}}
                                        >
                                            <span>DONATE</span>
                                        </Button>
                                    </div>
                                </div>
                            </Card>}
                            { empty &&
                            <Card className="card-box card-box-alt  shadow-xxl  p-2 ">
                                <div className="card-content-overlay text-center pb-4">
                                    <div className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-primary text-white btn-icon mx-auto text-center shadow-primary">
                                        <FontAwesomeIcon icon={['fas', 'briefcase']} className="display-3" />
                                    </div>
                                   
                                    <div className="font-weight-bold text-black display-5 mt-4 mb-1">
                                    There is no chatrel contribution record in the database. You are requested to upload your two year chatrel receipt  
                                    </div>
                                    <div className="font-size-lg text-dark opacity-8">Please Contact CTA or file a dispute.</div>
                                    <div className="divider mx-4 my-4" />
                                    <div className="text-center">
                                        <Button className="p-0 text-uppercase btn-link-primary font-weight-bold font-size-sm btn-link" variant="text"
                                        onClick={()=>{history.push('/FileDispute');}}
                                        >
                                            <span>File a Dispute</span>
                                        </Button>
                                    </div>
                                </div>
                            </Card>}

          </Grid>
         

        
        <Grid item xs={12} lg={4}>
        <Card className="card-box bg-composed-wrapper  border-0 text-center p-4 p-xl-5 shadow-xxl h-100 ">
                                    <div className="bg-composed-img-4 bg-composed-wrapper--image rounded"/>
                                    <div className="bg-composed-wrapper--content text-black">
                                        <h4 className="display-5 font-weight-bold mb-0 ">Goals and Needs of Chatrel</h4>
                                        <p className="opacity-6 font-size-md m-2">
                                         Chatrel symbolizes the Tibetan people’s recognition of CTA as their legitimate representative. Chatrel payment exhibits Tibetan people’s support for CTA’s financial needs until Tibet regains freedom. 
                                        </p>
                                        <Button onClick={()=>{window.open('/ChatrelFAQ.pdf'); }} className="btn-warning text-nowrap px-4  font-size-sm font-weight-bold">
                                           READ FAQs
                                        </Button>
                                    </div>
                                </Card>
        </Grid>
        </Grid>
        {/*<Button onClick={()=>{history.push('/test')}}>Test</Button>*/}
      </Card>
      {snackbar && (
            <Alerts
              alertObj={alertObj}
              snackbar={snackbar}
              snackbarClose={snackbarClose}
            />
          )}
      <Backdrop className={classes.backdrop} open={backdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
    </>
  );
}

