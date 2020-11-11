
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { storeCurrentGBDetails } from '../../actions/transactions/CurrentGBDetailsAction';
import {storeGoogleCreds} from '../../actions/transactions/CurrentGBDetailsAction';
export default function PaymentPage  (props) {
    let history = useHistory();
    history.push('/PaymentPage');
    const dispatch = useDispatch();
    const userObj = useSelector(state => state.GBDetailsReducer.oGBDetails);
    let obj={
        sGBID:userObj.sGBID,
        title:'Chatrel for Self',
        relation:'My'
      }
      dispatch(storeCurrentGBDetails(obj));
    /*useEffect(() => {
      
    }, []);*/
return(<></>);
}