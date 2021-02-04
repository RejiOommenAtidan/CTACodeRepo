import React, { useEffect, useState } from 'react';
export default function CoverHome() {
  useEffect(()=>{
      
    document.title="Success";
  
   },[]);
  return (

   
    <>
    <div className="mx-auto text-center mt-5">
      <h1>Payment Approved from PayPal</h1>
      <h3>Waiting for Confirmation</h3>
      </div>
    </>
  );
}
