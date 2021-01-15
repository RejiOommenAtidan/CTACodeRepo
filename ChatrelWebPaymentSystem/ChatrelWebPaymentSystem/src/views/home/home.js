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
import logo3 from '../../assets/images/stock-logos/spotify-icon.svg';
import logo4 from '../../assets/images/stock-logos/slack-icon.svg';
import logo5 from '../../assets/images/stock-logos/pinterest-icon.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountUp from 'react-countup';

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
        <Grid item xs={6}>
                                     
                                            <Card className="card-box card-box-alt w-50 mx-auto shadow-xxl card-box-hover-rise p-2 ">
                                <div className="card-content-overlay text-center pb-4">
                                    <div className="d-50 rounded border-0 mb-1 card-icon-wrapper bg-success text-white btn-icon mx-auto text-center shadow-success">
                                        <FontAwesomeIcon icon={['fas', 'hand-holding-usd']} className="display-4" />
                                    </div>
                                    <div className="font-weight-bold text-black display-3 mt-4 mb-1">
                                    <CountUp
                                    start={0}
                                    end={102.20}
                                    duration={1}
                                    //deplay={2}
                                    separator=" "
                                    decimals={2}
                                    decimal="."
                                    prefix="$ "
                                    suffix=""
                                />
                                    </div>
                                    <div className="font-size-lg text-dark opacity-8">Chatrel Pending</div>
                                    <div className="divider mx-4 my-4" />
                                    <div className="text-center">
                                        <Button className="p-0 text-uppercase btn-link-success font-weight-bold font-size-sm btn-link" variant="text"
                                        onClick={()=>{makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' }, paymentData, outstanding)}}
                                        >
                                            <span>Pay now</span>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
         
        {/*   <Grid container spacing={2}>
            <Grid item xs={12}>
              <Link onClick={()=>{makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' }, paymentData, outstanding)}} style={{cursor: 'pointer'}} > 
                <Card  style={{height:'150px',backgroundColor:'#ebca17',color:'#168b44'}} >
                  <CardContent>
                    <div style={{textAlign:'right'}}>
                    <PersonIcon  style={{width:'50px',height:'50px'}}/>
                    </div>
                    <h1 style={{paddingLeft:'50px'}}>Pay for Self</h1>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link onClick={()=>{history.push('/Friends')}} style={{cursor: 'pointer'}} > 
                <Card  style={{height:'150px',backgroundColor:'#aef4ff',color:'#3d65b0'}} >
                  <CardContent>
                  <div style={{textAlign:'right'}}>
                    <GroupIcon  style={{width:'50px',height:'50px'}}/>
                    </div>
                    <h1 style={{paddingLeft:'50px'}}>Pay for Friends</h1>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={12}>
            <Link onClick={()=>{history.push('/Family')}} style={{cursor: 'pointer'}} > 
            <Card  style={{height:'150px',backgroundColor:'#168b44',color:'#ebca17'}} >
            <CardContent>
              <div style={{textAlign:'right'}}>
              <FavoriteIcon  style={{width:'50px',height:'50px'}}/>
              </div>
              <h1 style={{paddingLeft:'50px'}}>Pay for Family</h1>
            </CardContent>
            </Card>
            </Link>
            </Grid>
          </Grid>*/} 
        </Grid>
        <Grid item xs={6}>
        <Card className="bg-secondary m-5 m-lg-0 object-skew hover-scale-lg shadow-xxl w-100 card-box">
                                                <List component="div" className="list-group-flush">
                                                    <ListItem component="a" button  onClick={()=>{makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' }, paymentData, outstanding)}} className="d-flex rounded-top align-items-center py-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar-icon mr-3 d-50">
                                                                <img className="img-fit-container" alt="..." src={logo1} />
                                                            </div>
                                                            <div>
                                                                <div className="font-weight-bold text-black">
                                                                    Self Chatrel
                                                                </div>
                                                                <div className="text-black-50">Pay now</div>
                                                            </div>
                                                        </div>
                                                        <div className="ml-auto">
                                                            <div className="badge badge-neutral-success text-success font-size-xs font-weight-normal py-1 h-auto px-3 badge-pill">
                                                                $3,884
                                                            </div>
                                                        </div>
                                                    </ListItem>
                                                    <ListItem component="a" button href="/Family" onClick={()=>{history.push('/Family')}} className="d-flex align-items-center py-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar-icon mr-3 d-50">
                                                                <img className="img-fit-container" alt="..." src={logo2} />
                                                            </div>
                                                            <div>
                                                                <div className="font-weight-bold text-black">
                                                                    Family Chatrel
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                        
                                                    </ListItem>
                                                    <ListItem component="a" button href="/Friends" onClick={()=>{history.push('/Friends')}} className="d-flex align-items-center py-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar-icon mr-3 d-50">
                                                                <img className="img-fit-container" alt="..." src={logo3} />
                                                            </div>
                                                            <div>
                                                                <div className="font-weight-bold text-black">
                                                                   Friend's Chatrel
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                       
                                                    </ListItem>
                                                  
                                                </List>
                                            </Card>
        {/*  <Grid container spacing={10}>
            <Grid item xs={12}>
              { chatrelPending &&
            <Card style={{height:'200px',width:'300px',backgroundColor:'yellow',color:'white',background:'url('+img+') no-repeat',backgroundImage:"linear-gradient(to bottom, rgba(235, 202, 23, 0), rgba(235, 202, 23, 0.82) 51%, #ebca17)"  }}>
              <CardContent>
                <p style={{paddingTop:'30px'}}>PENDING AMOUNT</p>
                <h1>{currencySymbol + chatrelPending}</h1>
                <p style={{paddingBottom:'10px'}}><Button style={{borderRadius:' 17px',backgroundColor:'#168b44'}} onClick={()=>{makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' }, paymentData, outstanding)}}>Pay</Button></p>
                
              </CardContent>  
            </Card>} 
            </Grid>

              </Grid> */} 
        </Grid>
        </Grid>
        {/*<Button onClick={()=>{history.push('/test')}}>Test</Button>*/}
      </Card>
    </>
  );
}

