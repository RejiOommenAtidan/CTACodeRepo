import React, { useEffect, useState } from 'react';
import { ClipLoader} from 'react-spinners';
export default function CoverHome() {
  useEffect(()=>{
      
    document.title="Success";
  
   },[]);
  return (

   
    <>
    <div className="mx-auto text-center mt-5">
      <h1>Contribution Approved from PayPal</h1>
      <h3>Waiting for Confirmation</h3>
      <div className="d-flex align-items-center justify-content-center mx-auto" style={{width: '150px', height: '80px'}}>
                                <ClipLoader color={'var(--primary)'} loading={true}/>
                            </div>
      </div>
    </>
  );
}
