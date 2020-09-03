import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Demo from '../../components/demo.component';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles';
import {
    TextField,
    InputLabel
} from '@material-ui/core';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Icon from '@material-ui/core/Icon';
import SearchIcon from '@material-ui/icons/Search';


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
    {form:2100 , rdate:"06-08-2018" , region:"Paris",  name:"Lhakpa Dolma" ,id:7648981, fname:"Dhongyal",receipt:5615, sanay:"71",pgid:"0" , cgid:"0",ias:"2012-01-01", status:"Rejected",rejectdate:"2012-01-01",returndate:"28-09-2019"},
    {form:2100 , rdate:"06-08-2018" , region:"Paris",  name:"Lhakpa Dolma" ,id:7648981, fname:"Dhongyal",receipt:5615, sanay:"71",pgid:"0" , cgid:"0",ias:"2012-01-01", status:"Rejected",rejectdate:"2012-01-01",returndate:"28-09-2019"},
    {form:2100 , rdate:"06-08-2018" , region:"Paris",  name:"Lhakpa Dolma" ,id:7648981, fname:"Dhongyal",receipt:5615, sanay:"71",pgid:"0" , cgid:"0",ias:"2012-01-01", status:"Rejected",rejectdate:"2012-01-01",returndate:"28-09-2019"},
    {form:2100 , rdate:"06-08-2018" , region:"Paris",  name:"Lhakpa Dolma" ,id:7648981, fname:"Dhongyal",receipt:5615, sanay:"71",pgid:"0" , cgid:"0",ias:"2012-01-01", status:"Rejected",rejectdate:"2012-01-01",returndate:"28-09-2019"},
    {form:2100 , rdate:"06-08-2018" , region:"Paris",  name:"Lhakpa Dolma" ,id:7648981, fname:"Dhongyal",receipt:5615, sanay:"71",pgid:"0" , cgid:"0",ias:"2012-01-01", status:"Rejected",rejectdate:"2012-01-01",returndate:"28-09-2019"}
];
const Abroad = (props) => {
    const { classes } = props;
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
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
                        />&nbsp;Add Brief GB Madeb
    </Button>
                </Grid>
                <Grid item xs={6} style={{ textAlign: "right" }}>
                    <TextField
                        id="input-with-icon-grid"
                        label={<SearchIcon />}
                        style={{ marginBottom: 20 }}
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
                        <TableCell padding="none">Father's Name</TableCell>
                        <TableCell padding="none">Receipt No</TableCell>
                        <TableCell padding="none">Saney Form No</TableCell>
                        <TableCell padding="none" >Current GB S.no</TableCell>
                        <TableCell padding="none"> Previous GB S.no</TableCell>
                        <TableCell padding="none">Issue Action Date</TableCell>
                        <TableCell padding="none">Issue Action</TableCell>
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

                           {row.id}
             
                    </TableCell>
                    <TableCell padding="none">{row.fname}</TableCell>
                    <TableCell padding="none" >{row.receipt}</TableCell>
                    <TableCell padding="none" >{row.sanay}</TableCell>
                   
                    <TableCell padding="none">{row.cgid}</TableCell>
                    <TableCell padding="none">{row.pgid}</TableCell>
                    <TableCell padding="none">{row.ias}</TableCell>
                    <TableCell padding="none">{row.status}</TableCell>
                    <TableCell padding="none">{row.rejectdate}</TableCell>
                    <TableCell padding="none">{row.returndate}</TableCell>
                    <TableCell padding="none">
                         <IconButton  aria-label="Email">
                            <EmailIcon />
                        </IconButton>
                    </TableCell>
                    <TableCell  padding="none">
                        <IconButton color="primary" aria-label="Edit">
                            <EditIcon />
                        </IconButton>
                    </TableCell>

                        </TableRow>
                    ))}
                </TableBody>}
            </Table>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Brief GB Madeb</DialogTitle>
                <DialogContent>
                    <DialogContentText>
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
                                        <InputLabel id="auth-label">Authority</InputLabel>
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
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
      </Button>
                    <Button onClick={handleClose} color="primary">
                        Save
      </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

// export default Abroad;
export default withStyles(styles)(Abroad);
