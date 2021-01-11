import React , { useEffect, useState } from 'react';
import { Card ,CardContent,Typography ,Grid,Link,Button} from '@material-ui/core';
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
  let history = useHistory();
  let dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [currencySymbol, setCurrencySymbol] = React.useState();
  const [paymentData, setPaymentData] = React.useState();
  const [outstanding, setOutstanding] = useState(true);
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
      <h4>QUICK ACTIONS</h4>
      <Grid container spacing={8}>
        <Grid item xs={6}>
          
         
          <Grid container spacing={2}>
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
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
            <Card style={{height:'200px',width:'300px',backgroundColor:'yellow',color:'white',background:'url('+img+') no-repeat',backgroundImage:"linear-gradient(to bottom, rgba(235, 202, 23, 0), rgba(235, 202, 23, 0.82) 51%, #ebca17)"  }}>
              <CardContent>
                <p style={{paddingTop:'30px'}}>PENDING AMOUNT</p>
                <h1>$200</h1>
                <p style={{paddingBottom:'10px'}}><Button style={{borderRadius:' 17px',backgroundColor:'#168b44'}}>Pay</Button></p>
                
              </CardContent>  
            </Card> 
            </Grid>

          </Grid>  
        </Grid>
        </Grid>
        {/*<Button onClick={()=>{history.push('/test')}}>Test</Button>*/}
      </Card>
    </>
  );
}
