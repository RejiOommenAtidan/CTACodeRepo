import React from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
//import theme from '../../../theme/theme/theme';

//import Link from '@material-ui/core/Link';
//import axios from 'axios'
//import { ThemeProvider } from '@material-ui/styles';
// import theme from '../../../theme/theme/theme'

import {
    Box,
    Button,
    Checkbox,
    Container,
    TextField,
    Typography,
    makeStyles,
    InputLabel,
    ListItemText,
    Contain,
    Paper,
    Grid
} from '@material-ui/core';
//import Page from 'src/components/Page';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme  => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
      },
      formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2
      }
});


class MadebPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentSelection: 'new'
        };
    }
    

    handleDropDownChange = (event) => {
        // console.log(event.target.value);
        let currentSelection = event.target.value;
        //setState is async in nature
        this.setState({currentSelection:currentSelection},()=>{console.log(this.state.currentSelection);});
        
    }

    render() {
        const { classes } = this.props;
        /*const [madeb, setMadeb] = React.useState('');
    
        const handleChange = (event) => {
          setMadeb(event.target.value);
        };*/

        return (
            <Grid container spacing={0}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Paper style={{marginTop:30,padding:30}}>
            <Grid container spacing={3}>
                
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="madeb-label"> Madeb</InputLabel>
                            <Select
                                labelId="madeb-label"
                                id="madeb"
                                //value={madeb}
                                value={this.state.currentSelection}
                                onChange={this.handleDropDownChange}
                                label="Madeb"
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={'new'}>Sarso Madeb</MenuItem>
                                <MenuItem value={'edit'}>Norchoe Madeb</MenuItem>
                                <MenuItem value={'lost'}>Bhorlak Madeb</MenuItem>
                                <MenuItem value={'full'}>Book Full</MenuItem>
                                <MenuItem value={'brief'}>Brief GB</MenuItem>
                                <MenuItem value={'abroad'}>Abroad</MenuItem>
                            </Select>
                        </FormControl>
                       <br/>
                       <br/> 
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                </Grid>
                {this.state.currentSelection ==="new" && 
                (<div>
                    <Typography variant="h4" >Madeb Entry Form For Fresh Issue</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="number"
                                    label="Form Number"
                                    type="number"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value='43131'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Received Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="Auth-label"> Authority</InputLabel>
                                <Select
                                    labelId="Auth-label"
                                    id="authority"
                                    //value={}
                                    // onChange={handleChange}
                                    label="Authority"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Mundgod</MenuItem>
                                    <MenuItem value={2}>Shimla</MenuItem>
                                    <MenuItem value={3}>Paris</MenuItem>
                                    <MenuItem value={4}>Dekyiling</MenuItem>
                                    <MenuItem value={5}>BTS, Bir</MenuItem>
                                    <MenuItem value={6}>Leh</MenuItem>
                                    <MenuItem value={7}>Boudha</MenuItem>
                                    <MenuItem value={8}>Jorpati</MenuItem>
                                    <MenuItem value={9}>Boston</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    //value='Aayush Pandya'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="fname"
                                    label="Father's Name"
                                    //value='Aayush Pandya'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="sfn"
                                    label="Saney Form No"
                                    type='number'
                                    //value='Aayush Pandya'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="da"
                                    label="Document attached"
                                    //value='Aayush Pandya'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Issue Action Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="issue-label"> Issue Action</InputLabel>
                                <Select
                                    labelId="issue-label"
                                    id="authority"
                                    //value={}
                                    // onChange={handleChange}
                                    label="Issue Action"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>On Progress</MenuItem>
                                    <MenuItem value={2}>Issued</MenuItem>
                                    <MenuItem value={3}>Rejected</MenuItem>
                                    <MenuItem value={4}>Double</MenuItem>
                                    <MenuItem value={5}>Cancel</MenuItem>
                                  
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Return Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
                )}

                {this.state.currentSelection ==="edit" && 
                (
                <div>
                    <Typography variant="h4" >Madeb Entry Form For Changes</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="number"
                                    label="Form Number"
                                    type="number"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value='43131'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Received Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="Auth-label"> Region</InputLabel>
                                <Select
                                    labelId="Region-label"
                                    id="region"
                                    //value={}
                                    // onChange={handleChange}
                                    label="Region"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Mundgod</MenuItem>
                                    <MenuItem value={2}>Shimla</MenuItem>
                                    <MenuItem value={3}>Paris</MenuItem>
                                    <MenuItem value={4}>Dekyiling</MenuItem>
                                    <MenuItem value={5}>BTS, Bir</MenuItem>
                                    <MenuItem value={6}>Leh</MenuItem>
                                    <MenuItem value={7}>Boudha</MenuItem>
                                    <MenuItem value={8}>Jorpati</MenuItem>
                                    <MenuItem value={9}>Boston</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="IdentId"
                                    label="Identity ID"
                                    type='number'
                                    //value='Aayush Pandya'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="change-field"
                                    label="Change field"
                                    //value='Aayush Pandya'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="da"
                                    label="Document attached"
                                    //value='Aayush Pandya'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="rn"
                                    label="Reciept Number"
                                    type="number"
                                    //value='Aayush Pandya'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="status"> Status</InputLabel>
                                <Select
                                    labelId="status"
                                    id="status"
                                    //value={}
                                    // onChange={handleChange}
                                    label="Status"
                                >
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Approved</MenuItem>
                                    <MenuItem value={2}>Rejected</MenuItem>
                                    <MenuItem value={3}>Cancel</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Reject Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Return Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
                )}

                
                {this.state.currentSelection ==="lost" && 
                (
                <div>
                    <Typography variant="h4" >Madeb Entry Form for Lost</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="number"
                                    label="Form Number"
                                    type="number"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value='43131'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Received Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="Auth-label"> Region</InputLabel>
                                <Select
                                    labelId="Region-label"
                                    id="region"
                                    //value={}
                                    // onChange={handleChange}
                                    label="Region"
                                >
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Mundgod</MenuItem>
                                    <MenuItem value={2}>Shimla</MenuItem>
                                    <MenuItem value={3}>Paris</MenuItem>
                                    <MenuItem value={4}>Dekyiling</MenuItem>
                                    <MenuItem value={5}>BTS, Bir</MenuItem>
                                    <MenuItem value={6}>Leh</MenuItem>
                                    <MenuItem value={7}>Boudha</MenuItem>
                                    <MenuItem value={8}>Jorpati</MenuItem>
                                    <MenuItem value={9}>Boston</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    //value='Aayush Pandya'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="IdentId"
                                    label="Identity ID"
                                    type='number'
                                    //value='Aayush Pandya'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="book-sr"
                                    label="Book S.no"
                                    type="number"
                                    //value='Aayush Pandya'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="da"
                                    label="Document attached"
                                    //value='Aayush Pandya'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="rn"
                                    label="Reciept Number"

                                    type="number"
                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="status"> Status</InputLabel>
                                <Select
                                    labelId="status"
                                    id="status"
                                    //value={}
                                    // onChange={handleChange}
                                    label="Status"
                                >
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Approved</MenuItem>
                                    <MenuItem value={2}>Rejected</MenuItem>
                                    <MenuItem value={3}>Cancel</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Reject Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>  <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Return Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
                )}
                {this.state.currentSelection ==="full" && 
                (
                    <div>
                    <Typography variant="h4" >Madeb Entry Form For Book Full</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="number"
                                    label="Form Number"
                                    type="number"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value='43131'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Received Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="auth-label"> Authority</InputLabel>
                                <Select
                                    labelId="auth-label"
                                    id="authority"
                                    //value={}
                                    // onChange={handleChange}
                                    label="Authority"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Mundgod</MenuItem>
                                    <MenuItem value={2}>Shimla</MenuItem>
                                    <MenuItem value={3}>Paris</MenuItem>
                                    <MenuItem value={4}>Dekyiling</MenuItem>
                                    <MenuItem value={5}>BTS, Bir</MenuItem>
                                    <MenuItem value={6}>Leh</MenuItem>
                                    <MenuItem value={7}>Boudha</MenuItem>
                                    <MenuItem value={8}>Jorpati</MenuItem>
                                    <MenuItem value={9}>Boston</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="name"
                                    label="Name"


                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="IdentId"
                                    label="GB ID"

                                    type='number'
                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="fname"
                                    label="Father's Name"
                                    

                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                     id="sfn"
                                     label="Saney Form No"
                                     type='number'
                                    


                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="cgb"
                                    label="Current GB Sno"

                                    type="number"
                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <FormControl className={classes.formControl}>
                                <TextField
                                    id="pgb"
                                    label="Previous GB Sno"

                                    type="number"
                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Reject Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="issue-label"> Issue Action</InputLabel>
                                <Select
                                    labelId="issue-label"
                                    id="authority"
                                    //value={}
                                    // onChange={handleChange}
                                    label="Issue Action"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>On Progress</MenuItem>
                                    <MenuItem value={2}>Issued</MenuItem>
                                    <MenuItem value={3}>Rejected</MenuItem>
                                    <MenuItem value={4}>Double</MenuItem>
                                    <MenuItem value={5}>Cancel</MenuItem>
                                  
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Return Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
                )}
                {this.state.currentSelection ==="brief" && 
                (
                    <div>
                    <Typography variant="h4" >Madeb Entry Form For Brief GB</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="number"
                                    label="Form Number"
                                    type="number"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value='43131'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Received Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="auth-label"> Authority</InputLabel>
                                <Select
                                    labelId="auth-label"
                                    id="authority"
                                    //value={}
                                    // onChange={handleChange}
                                    label="Authority"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Mundgod</MenuItem>
                                    <MenuItem value={2}>Shimla</MenuItem>
                                    <MenuItem value={3}>Paris</MenuItem>
                                    <MenuItem value={4}>Dekyiling</MenuItem>
                                    <MenuItem value={5}>BTS, Bir</MenuItem>
                                    <MenuItem value={6}>Leh</MenuItem>
                                    <MenuItem value={7}>Boudha</MenuItem>
                                    <MenuItem value={8}>Jorpati</MenuItem>
                                    <MenuItem value={9}>Boston</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="name"
                                    label="Name"


                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="IdentId"
                                    label="GB ID"

                                    type='number'
                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="fname"
                                    label="Father's Name"
                                    

                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                     id="rno"
                                     label="Reciept No"
                                     type='number'
                                    


                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                     id="rno"
                                     label="Saney Form No"
                                     type='number'
                                    


                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="cgb"
                                    label="Current GB Sno"

                                    type="number"
                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <FormControl className={classes.formControl}>
                                <TextField
                                    id="pgb"
                                    label="Previous GB Sno"

                                    type="number"
                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Reject Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="issue-label"> Issue Action</InputLabel>
                                <Select
                                    labelId="issue-label"
                                    id="authority"
                                    //value={}
                                    // onChange={handleChange}
                                    label="Issue Action"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>On Progress</MenuItem>
                                    <MenuItem value={2}>Issued</MenuItem>
                                    <MenuItem value={3}>Rejected</MenuItem>
                                    <MenuItem value={4}>Double</MenuItem>
                                    <MenuItem value={5}>Cancel</MenuItem>
                                  
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Return Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
                )}
                {this.state.currentSelection ==="abroad" && 
                (
                    <div>
                    <Typography variant="h4" >Madeb Entry Form For Abroad</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="number"
                                    label="Form Number"
                                    type="number"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value='43131'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Received Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="auth-label"> Authority</InputLabel>
                                <Select
                                    labelId="auth-label"
                                    id="authority"
                                    //value={}
                                    // onChange={handleChange}
                                    label="Authority"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Mundgod</MenuItem>
                                    <MenuItem value={2}>Shimla</MenuItem>
                                    <MenuItem value={3}>Paris</MenuItem>
                                    <MenuItem value={4}>Dekyiling</MenuItem>
                                    <MenuItem value={5}>BTS, Bir</MenuItem>
                                    <MenuItem value={6}>Leh</MenuItem>
                                    <MenuItem value={7}>Boudha</MenuItem>
                                    <MenuItem value={8}>Jorpati</MenuItem>
                                    <MenuItem value={9}>Boston</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="name"
                                    label="Name"


                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="alias"
                                    label="Alias"


                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="IdentId"
                                    label="GB ID"

                                    type='number'
                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="fname"
                                    label="Father's Name"
                                    

                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                     id="rno"
                                     label="Reciept No"
                                     type='number'
                                    


                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="sfn"
                                    label="Saney Form No"
                                    type='number'

                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="cgb"
                                    label="Current GB Sno"

                                    type="number"
                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <FormControl className={classes.formControl}>
                                <TextField
                                    id="pgb"
                                    label="Previous GB Sno"

                                    type="number"
                                //value='Aayush Pandya'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Reject Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="issue-label"> Issue Action</InputLabel>
                                <Select
                                    labelId="issue-label"
                                    id="authority"
                                    //value={}
                                    // onChange={handleChange}
                                    label="Issue Action"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>On Progress</MenuItem>
                                    <MenuItem value={2}>Issued</MenuItem>
                                    <MenuItem value={3}>Rejected</MenuItem>
                                    <MenuItem value={4}>Double</MenuItem>
                                    <MenuItem value={5}>Cancel</MenuItem>
                                  
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                            <TextField
                                id="date"
                                label="Return Date"
                                type="date"
                                defaultValue="2020-08-27"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
                )}
                
                  <Button variant="outlined" color="primary" >Save</Button>
                &nbsp;<Button variant="outlined" >Cancel</Button>

            </Grid>
             </Paper>
             </Grid>
             <Grid item xs={1} />
           </Grid>
        )
    }
}
export default withStyles(styles)(MadebPage)
// export default RegisterView
