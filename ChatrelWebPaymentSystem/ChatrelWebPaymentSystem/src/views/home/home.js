import React from 'react';
import { Card ,CardContent,Typography ,Grid,Link,Button} from '@material-ui/core';


import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import FavoriteIcon from '@material-ui/icons/Favorite';
//import projectLogo from '../../assets/images/ctalogo.png';


import img from '../../assets/images/home_pending.jpg';
import {useHistory} from 'react-router-dom';

export default function Home() {

 const history = useHistory();

  return (
    <>
      <Card className="card-box mb-spacing-6-x2" style={{  padding: 50 }} >
      <h4>QUICK ACTIONS</h4>
      <Grid container spacing={8}>
        <Grid item xs={6}>
          
         
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Link onClick={()=>{history.push('/selfpayment')}} style={{cursor: 'pointer'}} > 
                <Card  style={{height:'150px',backgroundColor:'#ebca17',color:'#168b44'}} >
                  <CardContent>
                    <div style={{textAlign:'right'}}>
                    <PersonIcon  style={{width:'50px',height:'50px'}}/>
                    </div>
                    <h1 style={{paddingLeft:'50px'}}>Pay for Self</h1>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link onClick={()=>{history.push('/Friends')}} style={{cursor: 'pointer'}} > 
                <Card  style={{height:'150px',backgroundColor:'#aef4ff',color:'#3d65b0'}} >
                  <CardContent>
                  <div style={{textAlign:'right'}}>
                    <GroupIcon  style={{width:'50px',height:'50px'}}/>
                    </div>
                    <h1 style={{paddingLeft:'50px'}}>Pay for Friends</h1>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={12}>
            <Link onClick={()=>{history.push('/Family')}} style={{cursor: 'pointer'}} > 
            <Card  style={{height:'150px',backgroundColor:'#168b44',color:'#ebca17'}} >
            <CardContent>
              <div style={{textAlign:'right'}}>
              <FavoriteIcon  style={{width:'50px',height:'50px'}}/>
              </div>
              <h1 style={{paddingLeft:'50px'}}>Pay for Family</h1>
            </CardContent>
            </Card>
            </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
            <Card style={{height:'200px',width:'300px',backgroundColor:'yellow',color:'white',background:'url('+img+') no-repeat',backgroundImage:"linear-gradient(to bottom, rgba(235, 202, 23, 0), rgba(235, 202, 23, 0.82) 51%, #ebca17)"  }}>
              <CardContent>
                <p style={{paddingTop:'30px'}}>PENDING AMOUNT</p>
                <h1>$200</h1>
                <p style={{paddingBottom:'10px'}}><Button style={{borderRadius:' 17px',backgroundColor:'#168b44'}}>Pay</Button></p>
                
              </CardContent>  
            </Card> 
            </Grid>

          </Grid>  
        </Grid>
        </Grid>
      </Card>
    </>
  );
}
