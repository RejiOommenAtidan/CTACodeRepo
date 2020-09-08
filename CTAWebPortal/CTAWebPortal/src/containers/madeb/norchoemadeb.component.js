import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Demo from '../../components/demo.component';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'

import { withStyles } from '@material-ui/core/styles';

// import { Link } from '@material-ui/core';

import Icon from '@material-ui/core/Icon';
import SearchIcon from '@material-ui/icons/Search';
import {
    TextField,
    InputLabel
} from '@material-ui/core';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
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

const rows = [
    // { form: 41234, rdate: "21-09-2019", region: "New York", name: "Qwerty", id: "Abcda", change: "71", da: "RC", receipt: "15-09-2019", status: "Issued", rejectdate: "28-09-2019", returndate: "28-09-2019" },
    // { form: 41234, rdate: "21-09-2019", region: "New York", name: "Qwerty", id: "Abcda", change: "71", da: "RC", receipt: "15-09-2019", status: "Issued", rejectdate: "28-09-2019", returndate: "28-09-2019" },
    // { form: 41234, rdate: "21-09-2019", region: "New York", name: "Qwerty", id: "Abcda", change: "71", da: "RC", receipt: "15-09-2019", status: "Issued", rejectdate: "28-09-2019", returndate: "28-09-2019" },
    // { form: 41234, rdate: "21-09-2019", region: "New York", name: "Qwerty", id: "Abcda", change: "71", da: "RC", receipt: "15-09-2019", status: "Issued", rejectdate: "28-09-2019", returndate: "28-09-2019" },
    // { form: 41234, rdate: "21-09-2019", region: "New York", name: "Qwerty", id: "Abcda", change: "71", da: "RC", receipt: "15-09-2019", status: "Issued", rejectdate: "28-09-2019", returndate: "28-09-2019" },
    // { form: 41234, rdate: "21-09-2019", region: "New York", name: "Qwerty", id: "Abcda", change: "71", da: "RC", receipt: "15-09-2019", status: "Issued", rejectdate: "28-09-2019", returndate: "28-09-2019" }

    {form:16806 , rdate:"01-08-2018" , region:"Shimla",  name:"Tenzin namgyal" ,id:"6766082", change:"Fathers name",da:"RC and IC",
 receipt: 41506, status:"Approved",rejectdate:"28-09-2019",returndate:"28-09-2019"},
 
{form:16808 , rdate:"09-08-2018" , region:"Mundgod",  name:"Kunga" ,id:"7587035", change:"DOB, Mothers name and Address",da:"RC and SLC",
 receipt: 23657, status:"Approved",rejectdate:"12-09-2019",returndate:"21-05-2019"},

 {form: 16809 , rdate:" 03-08-2018" , region:" Dharamsala",  name:" Jamyang" ,id:"7471373", change:" BP and Phayul",da:" SEP and ORC",
 receipt: 27839, status:"Approved",rejectdate:"07-04-2020",returndate:"21-05-2020"},

 {form:16810 , rdate:"06-08-2018" , region:"Dalhousie",  name:"Ako Dolma" ,id:"4070343", change:"DOB",da:"RC and SLC",
 receipt: 22157, status:"Reject",rejectdate:"12-09-2019",returndate:"21-05-2019"},

 {form: 16811 , rdate:"06-08-2018" , region:"Dalhousie",  name:"Choedon" ,id:"5658351", change:"DOB",da:"RC",
 receipt: 23657, status:"Reject",rejectdate:"30-09-2019",returndate:"05-10-2019"},
];

const getBadge = (status) => {
    switch (status) {
      case 'Approved': return "primary"
      case 'Reject': return "secondary"
      case 'Issued': return "primary"
      case 'Rejected': return "secondary"
      default: return 'primary'
    }
  }




const Abroad = (props) => {
    const { classes } = props;
    const [open, setOpen] = React.useState(false);
    const [emailPage, setEmailPage] = React.useState(false);
    const [editPage, setEditPage] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleEmailClickOpen = () => {
        setEmailPage(true);
    };
    const handleEmailClose = () => {
        setEmailPage(false);
    };
    const handleEditClickOpen = () => {
        setEditPage(true);
    };
    const handleEditClose = () => {
        setEditPage(false);
    };
    return (
        <div style={{ padding: 20 }}>
            <Grid container spacing={3} direction="row" alignItems="center">
                <Grid item xs={6}>
                <Button>
                <Icon 
                className="fa fa-plus-circle" 
                style={{ fontSize: 30 }} 
                onClick={handleClickOpen}
                />&nbsp;Add Norchoe Madeb
                </Button>
                </Grid>
                <Grid item xs={6} style={{ textAlign: "right"}}>
                    <TextField
                        id="input-with-icon-grid"
                        label={<SearchIcon />}
                        style={{ marginBottom:20 }}
                    />
                </Grid>
            </Grid>
            <Table aria-label="simple table" >
                <TableHead>
                    <TableRow>
                        <TableCell padding="none">Form No</TableCell>
                        <TableCell padding="none" >Received Date</TableCell>
                        <TableCell padding="none">Region</TableCell>
                        <TableCell padding="none" >Name</TableCell>
                        <TableCell padding="none" >GB ID</TableCell>
                        <TableCell padding="none">Change Field</TableCell>
                        <TableCell padding="none" >Document attached</TableCell>
                        <TableCell padding="none">Receipt No</TableCell>
                        <TableCell padding="none">Status</TableCell>
                        <TableCell padding="none" >Reject Date</TableCell>
                        <TableCell padding="none" >Return Date</TableCell>
                        <TableCell padding="none" >Email</TableCell>
                        <TableCell padding="none" >Edit</TableCell>

                    </TableRow>
                </TableHead>
                {<TableBody>

                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell padding="none" component="th" scope="row">
                                {row.form}
                            </TableCell>
                            <TableCell padding="none">{row.rdate}</TableCell>
                            <TableCell padding="none">{row.region}</TableCell>
                            <TableCell padding="none">{row.name}</TableCell>
                            <TableCell padding="none">
                            <a href="#">
                            {row.id}
                            </a>
                            </TableCell>
                            <TableCell padding="none">{row.change}</TableCell>
                            <TableCell padding="none" >{row.da}</TableCell>
                            <TableCell padding="none">{row.receipt}</TableCell>
                            <TableCell padding="none">
                            <Chip
                                variant="outlined"
                                size="small"
                                color={getBadge(row.status)}
                                label={row.status}
                            />
                            </TableCell>
                            <TableCell padding="none">{row.rejectdate}</TableCell>
                            <TableCell padding="none">{row.returndate}</TableCell>
                            <TableCell padding="none">
                                <IconButton aria-label="Email">
                                    <EmailIcon onClick={handleEmailClickOpen}/>
                                </IconButton>
                            </TableCell>
                            <TableCell padding="none">
                                <IconButton color="primary" aria-label="Delete">
                                    <EditIcon onClick={handleEditClickOpen}/>
                                </IconButton>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>}
            </Table>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Norchoe Madeb</DialogTitle>
                <DialogContent>
                    <DialogContentText>
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
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleClose} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={editPage} onClose={handleEditClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Norchoe Madeb</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div>
                            <Typography variant="h4">Edit Madeb Entry Form For Changes</Typography>
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
                                    value='16827'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="date"
                                    label="Received Date"
                                    type="date"
                                    defaultValue="2018-01-08"
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
                                    value={2}
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
                                    value='Tenzin namgyal'

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="IdentId"
                                    label="Identity ID"
                                    type='number'
                                    value='6766082'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="change-field"
                                    label="Change field"
                                    value='Tsangshoo'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="da"
                                    label="Document attached"
                                    value='RC'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="rn"
                                    label="Reciept Number"
                                    type="number"
                                    value='41506'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="status"> Status</InputLabel>
                                <Select
                                    labelId="status"
                                    id="status"
                                    value={1}
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
                                    defaultValue="2019-08-01"
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
                                    //defaultValue="2020-08-27"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleEditClose} color="primary">
                        Save
          </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={emailPage} onClose={handleEmailClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Email</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div>
                            <Typography variant="h4" >Madeb Entry Form For Fresh Issue - Email Page</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            id="number"
                                            label="Email"
                                            type="email"
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            value='dataunit@tibet.net'

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            id="date"
                                            label="Enter Destination"
                                            type="text"
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
                                            id="name"

                                            value='Norchoe case no: 16806 Name: Tenzin namgyal'
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Card className={classes.root}>
                                        <CardContent>
                                            <Typography>Norchoe case no: 16806 Name: Tenzin namgyal Postal address:</Typography> 
                                        </CardContent>
                                        </Card>        
 
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={classes.formControl}>
                                        <Button onClick={handleEmailClose} color="primary">
                                            Send Email
                                        </Button>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// export default Abroad;
export default withStyles(styles)(Abroad);
