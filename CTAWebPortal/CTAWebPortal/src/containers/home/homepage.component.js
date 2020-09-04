import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Demo from '../../components/demo.component';
import logoImage from '../../assets/images/logo.jfif';

const HomePage = () => {

  return (
    <div style={{margin:20}}>
      <Paper  style={{textAlign:"center" }}>  
            <img src={logoImage} style={{paddingTop:20}} alt="logo" />  
            <Typography variant="display2" gutterBottom>བཙན་འབྱོལ་བོད་མིའི་རང་དབང་</Typography>
            <Typography variant="display2" gutterBottom>གཅེས་འཛིན་དྭང་བླང་</Typography>
            <Typography variant="display2" gutterBottom>དཔྱ་དངུལ་ལག་དེབ</Typography>
            <Typography variant="display2" gutterBottom>གྲངས་མཛོད།</Typography>
            <br/>
          </Paper>
    </div>
  );
};

export default HomePage;
