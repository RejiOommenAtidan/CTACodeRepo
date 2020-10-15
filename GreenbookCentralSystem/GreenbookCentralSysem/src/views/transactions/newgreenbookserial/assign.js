import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

export const Assign = (props) => {
  return(
    <div>
      <IconButton 
        color="primary" 
        aria-label="upload picture" 
        component="span"
          onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          //addClick(props.rowData);
        }}  
        style={{padding:'0px'}}
      >
        <AssignmentTurnedInIcon />
      </IconButton>
    </div>
  );

}