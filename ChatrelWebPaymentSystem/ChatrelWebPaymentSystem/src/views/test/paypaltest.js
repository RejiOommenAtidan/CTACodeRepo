import React from 'react';
import Test from './test.js';
import { PayPalButton } from 'react-paypal-button-v2';
import {sPayPal_ClientID} from '../../config/commonConfig';
export default function CoverHome() {
  return (
    <>
        <PayPalButton
            amount={100}
            style={{ label: 'pay' }}
            options={{
            clientId:sPayPal_ClientID,
            currency: 'USD'
            }}
            shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            onSuccess={(details, data) => {
            //setBackdrop(true);
            //alert("Transaction completed by " + details.payer.name.given_name);
            console.log('Details:', details);
            console.log('Data', data);
            //submit(details);
            }}
            onError={(err) => {
            console.log(err);
            // setAlertMessage('Chatrel donation failed.');
            // setAlertType('error');
            // snackbarOpen();
            }}
            onCancel={(data)=>{
         //   setBackdrop(false);
            }}
            /*createOrder={(data, actions)=> { 
            setBackdrop(true);
            return actions.order.create({ purchase_units: [ { amount: { value: total.toFixed(2), }, }, ], }); 

            }}*/
            // onError={(details, data)=>{console.log(details);}}
            />


    </>
  );
}
