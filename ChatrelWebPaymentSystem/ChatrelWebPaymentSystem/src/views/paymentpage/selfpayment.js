
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { storeCurrentGBDetails } from '../../actions/transactions/CurrentGBDetailsAction';
import {storeGoogleCreds} from '../../actions/transactions/CurrentGBDetailsAction';
import axios from 'axios';
export default function PaymentPage  (props) {
    let history = useHistory();
    /*history.push('/PaymentPage');
    const dispatch = useDispatch();
    const userObj = useSelector(state => state.GBDetailsReducer.oGBDetails);
    let obj={
        sGBID:userObj.sGBID,
        title:'Chatrel for Self',
        relation:'My'
      }
      dispatch(storeCurrentGBDetails(obj));*/
    /*useEffect(() => {
      
    }, []);*/
    let dispatch = useDispatch();
    const sGBID=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sGBID);
    //const pageFrom=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.from);
    //const payingFor=useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails.sName);
    const paidByGBID=useSelector(state => state.GBDetailsReducer.oGBDetails.sGBID);
    const paidByName= useSelector(state => state.GBDetailsReducer.oGBDetails.sName);
    const [chatrelPending, setChatrelPending] = React.useState(null);
    
    const [currencySymbol, setCurrencySymbol] = React.useState();
    const [paymentData, setPaymentData] = React.useState();
    const [outstanding, setOutstanding] = useState(true);
     
    const makePayment = (obj, data, outstanding)=> {
      console.log("Inside Make payment method for " , obj, data)
      dispatch(storeCurrentGBDetails(obj));
      history.push('/PaymentPage', {pymtData: data, outstanding});
    }
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
          makePayment({sGBID: paidByGBID, sName: paidByName, sRelation: 'Self', from:'Self Chatrel' }, paymentData, outstanding);
        }
      })
      .catch(error => {
        console.log(error.message);
        console.log(error.response);
      });
    
    }, []);
return(<></>);
}