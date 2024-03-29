import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    //Should be greater than 1300 because modal zIndex is 1300
    zIndex: 1301,
    color: '#fff'
  }
}));

export const BackdropComponent = (props) =>{
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.backdrop);
  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="primary" value="indeterminate"/>
        {/*#828282 is for greying the Circular Component*/}
      </Backdrop>
    </div>
  );
}