import React ,{useEffect}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeAuthDetails, removeAuthDetails } from "../../actions/userAuthenticateAction";
import PageLoginBasic1 from '../../example-components/PageLoginBasic/PageLoginBasic1';
export default function PageLoginBasic(props) {
  const dispatch = useDispatch();
 /* let message="";
  useEffect(() => {
    
    console.log('location',props.location);
    if(props.location.state){
      message=props.location.state.changepassword;  
      console.log(props.location.state.changepassword);  
    }
 }, []);*/
  return (
    <>
      <PageLoginBasic1 props={props}/>
      {/* message!=="" &&
        <p>Password has changed successfully</p>
  */}
    </>
  );
}
