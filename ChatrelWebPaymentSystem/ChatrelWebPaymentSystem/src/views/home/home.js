import React from 'react';
import { Card ,CardContent,Typography ,Grid} from '@material-ui/core';


import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import FavoriteIcon from '@material-ui/icons/Favorite';
//import projectLogo from '../../assets/images/ctalogo.png';

import pendingimg from '../home/pending.PNG';
import emp from '../home/employee.PNG';
export default function Home() {

  return (
    <>
      <Card className="card-box mb-spacing-6-x2" style={{  padding: 50 }} >
      <Grid container spacing={10}>
        <Grid item xs={12}>
          
          <h4>QUICK ACTIONS</h4>
          <Grid container spacing={10}>
            <Grid item xs={4}>
            <Card  style={{height:'150px',backgroundColor:'yellow',color:'#168b44'}} >
            <CardContent>
              <div style={{textAlign:'right'}}>
              <PersonIcon  style={{width:'50px',height:'50px'}}/>
              </div>
              <h1 style={{paddingLeft:'50px'}}>Pay for Self</h1>
            </CardContent>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card  style={{height:'150px',backgroundColor:'lightblue',color:'blue'}} >
            <CardContent>
            <div style={{textAlign:'right'}}>
              <GroupIcon  style={{width:'50px',height:'50px'}}/>
              </div>
              <h1 style={{paddingLeft:'50px'}}>Pay for Friends</h1>
            </CardContent>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card  style={{height:'150px',backgroundColor:'green',color:'yellow'}} >
            <CardContent>
              <div style={{textAlign:'right'}}>
              <FavoriteIcon  style={{width:'50px',height:'50px'}}/>
              </div>
              <h1 style={{paddingLeft:'50px'}}>Pay for Family</h1>
            </CardContent>
            </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={6}>
              <img src={pendingimg} style={{height:'500px',width:'700px'}}/>
           {/*
            <Card style={{width:'75%',backgroundColor:'yellow',color:'white'}}>
              <CardContent>
                <p style={{paddingTop:'50px'}}>PENDING AMOUNT</p>
                <h1>$200</h1>
              </CardContent>  
            </Card> */}
            </Grid>
            <Grid item xs={6}>
            <img src={emp} style={{height:'500px',width:'700px'}} />
           {/* <Card>
              <CardContent>
                <p style={{paddingTop:'50px'}}>PENDING AMOUNT</p>
              </CardContent>  
            </Card> */}
            </Grid>
          </Grid>  
        </Grid>
        </Grid>
      </Card>
    </>
  );
}
