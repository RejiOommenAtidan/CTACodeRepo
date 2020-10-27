import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';



const MyComp = (props) => {
  //const val = props.myValue.id
 
  
  const obj = props.myarray.find(x => x.id === props.field);
  const val = obj.val;
  // const changeHandler = (e) => {
  //   props.updateArray({id: e.target.id, val: e.target.value});
  //   props.searchColumn(e.target.value, e.target);
  //   props.setMyElement(e.target);
  //   props.setCurrId(e.target.id);
  //   //setVal(e.target.value);
  // }
  return(
    <div>
    <TextField
    id={props.field}
    label={"Search " + props.name}
    onChange = {((e) => 
      {
        props.changeHandler(e);
      
      
    })}
    //
    value={val}
    //value={props.myValue.val}
    autoFocus={props.currId === props.field}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    }}
    
  /></div>) ;
};

export default MyComp;