import React , { useEffect, useState } from 'react';
import { Card ,CardContent,Typography ,Grid,Link,Button,ListItem,List} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import FavoriteIcon from '@material-ui/icons/Favorite';
//import projectLogo from '../../assets/images/ctalogo.png';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import img from '../../assets/images/home_pending.jpg';
import {useHistory} from 'react-router-dom';
import { storeCurrentGBDetails } from '../../actions/transactions/CurrentGBDetailsAction';

import logo1 from '../../assets/images/stock-logos/discord-icon.svg';

import logo2 from '../../assets/images/stock-logos/google-icon.svg';

import people1 from '../../assets/images/avatars/avatar4.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountUp from 'react-countup';
import HomeIcon from '@material-ui/icons/Home';
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
}));


export default function Home() {

  const sGBID=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sGBID);
  //const pageFrom=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.from);
  //const payingFor=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sName);
  const paidByGBID=useSelector(state => state.GBDetailsReducer.oGBDetails.sGBID);
  const paidByName= useSelector(state => state.GBDetailsReducer.oGBDetails.sName);
  const [chatrelPending, setChatrelPending] = React.useState(null);

  const [currencySymbol, setCurrencySymbol] = React.useState();
  const [paymentData, setPaymentData] = React.useState();
  const [outstanding, setOutstanding] = useState(true);
  let history = useHistory();
  let dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  useEffect(() => {
  axios.get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=`+paidByGBID)
  .then(resp => {
    if (resp.status === 200) {
      //console.log("Self Chatrel Payment data:", resp.data);
      if(resp.data.chatrelPayment.nChatrelTotalAmount === 0){
        setChatrelPending('0');
        setOutstanding(false);
        // setCurrencySymbol(resp.data.currency === 'INR' ? '₹' : '$' );
        // element.disabled = false;
        // return;
      }
      else{
        setChatrelPending(resp.data.chatrelPayment.nChatrelTotalAmount);
      }
      setPaymentData(resp.data);
      console.log(resp.data);
      
      
      if(resp.data.gbChatrels[0].sAuthRegionCurrency === 'USD'){
        setCurrencySymbol('$');
      }
      else{
        setCurrencySymbol('₹');
      }
      
      console.log("Data fetched...", resp.data);
      
    }
  })
  .catch(error => {
    console.log(error.message);
    console.log(error.response);
  });

}, []);

 

 const makePayment = (obj, data, outstanding)=> {
  console.log("Inside Make payment method for " , obj, data)
  dispatch(storeCurrentGBDetails(obj));
  history.push('/PaymentPage', {pymtData: data, outstanding});
}



  return (
    <>
      <Card className="card-box mb-spacing-6-x2" style={{  padding: 50 }} >
   {/*     <h4>QUICK ACTIONS</h4>  */}
      
      <Grid container spacing={8}>
        <Grid item xs={12} sm={12} lg={6} >
        <iframe className="w-100"  height="350" src="https://www.youtube.com/embed/FlUaitZfFAo?autoplay=1" frameborder="0" start  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                     
      
        </Grid>
        <Grid item xs={12} sm={12} lg={6} >
     
        <Card className="bg-secondary m-5 m-lg-0 object-skew hover-scale-lg shadow-xxl w-100 card-box">
                                                <List component="div" className="list-group-flush">
                                                    <ListItem component="a" button  onClick={()=>{makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' }, paymentData, outstanding)}} className="d-flex rounded-top align-items-center py-3">
                                                        <div className="d-flex align-items-center">
                                                        <div  className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-primary text-white btn-icon mx-auto text-center shadow-primary">
                                                           <FontAwesomeIcon icon={['fas', 'wallet']} className="display-4" />
                                                         </div>
                                                            <div style={{marginLeft:'10px'}}>
                                                                <div className="font-weight-bold text-black">
                                                                    Self Chatrel
                                                                </div>
                                                                <div className="text-black-50">Make Chatrel Payments for yourself online</div>
                                                            </div>
                                                        </div>
                                                        <div className="ml-auto">

                                                            <div className="badge badge-neutral-success text-success font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                                                             {chatrelPending>0  ? currencySymbol + chatrelPending : "PAID"}
                                                            </div>
                                                        </div>
                                                    </ListItem>
                                                    <ListItem component="a" button href="/Family" onClick={()=>{history.push('/Family')}} className="d-flex align-items-center py-3">
                                                        <div className="d-flex align-items-center">
                                                        <div  className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-success text-white btn-icon mx-auto text-center shadow-success">
                                                           <FontAwesomeIcon icon={['fas', 'heart']} className="display-4" />
                                                         </div>
                                                            <div style={{marginLeft:'10px'}}>
                                                                <div className="font-weight-bold text-black">
                                                                    Family Chatrel
                                                                </div>
                                                                <div className="text-black-50">Pay Instantly for all of your family members</div>
                                                                
                                                            </div>
                                                        </div>
                                                        
                                                    </ListItem>
                                                    <ListItem component="a" button href="/Friends" onClick={()=>{history.push('/Friends')}} className="d-flex align-items-center py-3">
                                                        <div className="d-flex align-items-center">
                                                        <div  className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-warning text-white btn-icon mx-auto text-center shadow-warning">
                                                           <FontAwesomeIcon icon={['fas', 'leaf']} className="display-4" />
                                                         </div>
                                                            <div style={{marginLeft:'10px'}}>
                                                                <div className="font-weight-bold text-black">
                                                                   Friend's Chatrel
                                                                </div>
                                                                <div className="text-black-50">Get payments of your friends done too</div>
                                                                
                                                            </div>
                                                        </div>
                                                       
                                                    </ListItem>
                                                  
                                                </List>
                                            </Card>
      
        </Grid>
        <Grid item xs={12} lg={6}>
          <Grid container spacing={4}>

          <Grid item xs={12} lg={6}>
          <Card className="card-box card-box-alt  shadow-xxl  p-2 ">
                                <div className="card-content-overlay text-center pb-4">
                                    <div className="d-50 mb-1 card-icon-wrapper   btn-icon mx-auto text-center">
                                    <img src={people1} className="card-img-top rounded-circle" style={{ width: 100 }} alt="..." />
                                    </div>
                                    <FontAwesomeIcon icon={['fas', 'quote-right']} className="text-primary font-size-xxl" />
                                    <div className="font-size-xl text-dark opacity-8 my-4">
                                    This is a huge step for all the Tibetan people that the Chatrel collection services are now Online. Power at your fingertips.
                                      </div>
                                      <div className="font-size-lg font-weight-bold">
                                          FirstName LastName <br/>
                                          <small className="text-black-50 pl-2">President</small>
                                      </div>
                                </div>
                            </Card>



</Grid>
          <Grid item xs={12} lg={6}>
           { outstanding && 
          <Card className="card-box card-box-alt  shadow-xxl  p-2 ">
                                <div className="card-content-overlay text-center pb-4">
                                    <div className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-success text-white btn-icon mx-auto text-center shadow-success">
                                        <FontAwesomeIcon icon={['fas', 'hand-holding-usd']} className="display-3" />
                                    </div>
                                    <div className="font-weight-bold text-black display-3 mt-4 mb-1">
                                    
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
                                    <div className="font-size-lg text-dark opacity-8">Chatrel Pending</div>
                                    <div className="divider mx-4 my-4" />
                                    <div className="text-center">
                                        <Button className="p-0 text-uppercase btn-link-success font-weight-bold font-size-sm btn-link" variant="text"
                                        onClick={()=>{makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' }, paymentData, outstanding)}}
                                        >
                                            <span>PAY NOW</span>
                                        </Button>
                                    </div>
                                </div>
                            </Card>}
                           { !outstanding &&
                            <Card className="card-box card-box-alt  shadow-xxl  p-2 ">
                                <div className="card-content-overlay text-center pb-4">
                                    <div className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-primary text-white btn-icon mx-auto text-center shadow-primary">
                                        <FontAwesomeIcon icon={['fas', 'briefcase']} className="display-3" />
                                    </div>
                                    <div className="font-weight-bold text-black display-4 mt-4 mb-1">
                                    Have you gotten a new job?
                                    </div>
                                    <div className="font-size-lg text-dark opacity-8">Change your status and contribute more towards the Tibetan Government.</div>
                                    <div className="divider mx-4 my-4" />
                                    <div className="text-center">
                                        <Button className="p-0 text-uppercase btn-link-primary font-weight-bold font-size-sm btn-link" variant="text"
                                        onClick={()=>{makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' }, paymentData, outstanding)}}
                                        >
                                            <span>UPDATE EMPLOYEMENT STATUS</span>
                                        </Button>
                                    </div>
                                </div>
                            </Card>}

          </Grid>
         

          </Grid>

          
        </Grid>
        <Grid item xs={12} lg={6}>
        <Card className="card-box bg-composed-wrapper  border-0 text-center p-4 p-xl-5 shadow-xxl ">
                                    <div className="bg-composed-img-4 bg-composed-wrapper--image rounded"/>
                                    <div className="bg-composed-wrapper--content text-black">
                                        <h4 className="display-4 font-weight-bold mb-0 ">Goals and Needs of Chatrel</h4>
                                        <p className="opacity-6 font-size-lg my-4">
                                         Chatrel symbolizes the Tibetan people’s recognition of CTA as their legitimate representative. Chatrel payment exhibits Tibetan people’s support for CTA’s financial needs until Tibet regains freedom. 
                                        </p>
                                        <Button className="btn-warning text-nowrap px-4  font-size-sm font-weight-bold">
                                           READ FAQs
                                        </Button>
                                    </div>
                                </Card>
        </Grid>
        </Grid>
        {/*<Button onClick={()=>{history.push('/test')}}>Test</Button>*/}
      </Card>
    </>
  );
}

