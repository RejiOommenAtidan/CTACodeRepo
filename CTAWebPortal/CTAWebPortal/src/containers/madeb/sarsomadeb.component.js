import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Demo from '../../components/demo.component';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
// import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Icon from '@material-ui/core/Icon';

import Chip from '@material-ui/core/Chip';

// import Pagination from '@material-ui/lab/Pagination';
import {
    TextField,
    Typography,
    InputLabel,
    Grid
} from '@material-ui/core';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


const getBadge = (status) => {
    switch (status) {
        case 'Approved': return "primary"
        case 'Reject': return "secondary"
        case 'Issued': return "primary"
        case 'Rejected': return "secondary"
        default: return 'primary'
    }
}

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
    },
    // margin: {
    //     margin: theme.spacing(1),
    // }
    // box: {
    //     marginBottom: theme.spacing(1.5),
    //     marginTop: theme.spacing(1.5)
    // }
});

const rows = [
    { form: 35979, rdate: "09-08-2018", region: "Mundgod", name: "Tenzin Choezin", fname: "Passang Dorjee", saney: "71", da: "RC", iad: "15-09-2019", ia: "Issued", returndate: "28-09-2019" },
    { form: 35980, rdate: "10-08-2018", region: "Shimla", name: "Thupten Chodak", fname: "Dhondup Tsering", saney: "0", da: "RC", iad: "15-09-2019", ia: "Reject", returndate: "28-09-2019" },
    { form: 35979, rdate: "09-08-2018", region: "Mundgod", name: "Tenzin Choezin", fname: "Passang Dorjee", saney: "71", da: "SB and BC", iad: "15-09-2019", ia: "Issued", returndate: "28-09-2019" },
    { form: 35980, rdate: "10-08-2018", region: "Shimla", name: "Thupten Chodak", fname: "Dhondup Tsering", saney: "0", da: "RC", iad: "15-09-2019", ia: "Reject", returndate: "28-09-2019" },
    { form: 35979, rdate: "09-08-2018", region: "Mundgod", name: "Tenzin Choezin", fname: "Passang Dorjee", saney: "71", da: "PRC", iad: "15-09-2019", ia: "Issued", returndate: "28-09-2019" }
];
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
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };
    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };
    return (

        <div style={{ padding: 20 }}>
            <Grid container spacing={3} direction="row" alignItems="center">
                <Grid item xs={6}>
                    <Button>
                        <Icon
                            className="fa fa-plus-circle"
                            style={{ fontSize: 30 }}
                            onClick={handleClickOpen}
                        />&nbsp;Add Sarso Madeb
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
                        <TableCell padding="none">Authority</TableCell>
                        <TableCell padding="none" >Name</TableCell>
                        <TableCell padding="none" >Father's Name</TableCell>
                        <TableCell padding="none">Saney Form No</TableCell>
                        <TableCell padding="none" >Document attached</TableCell>
                        <TableCell padding="none">Issue Action Date</TableCell>
                        <TableCell padding="none">Issue Action</TableCell>
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
                            <TableCell padding="none">{row.fname}</TableCell>
                            <TableCell padding="none">{row.saney}</TableCell>
                            <TableCell padding="none" >{row.da}</TableCell>
                            <TableCell padding="none">{row.iad}</TableCell>
                            <TableCell padding="none">
                                <Chip
                                    variant="outlined"
                                    size="small"
                                    color={getBadge(row.ia)}
                                    label={row.ia}
                                />
                            </TableCell>
                            <TableCell padding="none">{row.returndate}</TableCell>
                            <TableCell padding="none">
                                <IconButton aria-label="Email">
                                    <EmailIcon onClick={handleEmailClickOpen} />
                                </IconButton>
                            </TableCell>
                            <TableCell padding="none">
                                <IconButton color="primary" aria-label="Delete">
                                    <EditIcon onClick={handleEditClickOpen} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>}
            </Table>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Sarso Madeb</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div>
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
            <Dialog open={editPage} onClose={handleEditClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Sarso Madeb</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div>
                            <Typography variant="h4" >Edit Madeb Entry Form For Fresh Issue</Typography>
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
                                            value='35979'

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            id="date"
                                            label="Received Date"
                                            type="date"
                                            defaultValue="2018-08-09"
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
                                            value={1}
                                            //onChange={()=>{}}
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
                                            value='Tenzin Choezin'
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            id="fname"
                                            label="Father's Name"
                                            value='Passang Dorjee'
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            id="sfn"
                                            label="Saney Form No"
                                            type='number'
                                            value="1"
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
                                            id="date"
                                            label="Issue Action Date"
                                            type="date"
                                            defaultValue="2018-08-28"
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
                                            value={2}
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
                                            defaultValue="2005-01-01"
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
                                            value='Sarso case no: 35981 Name: Thupten Chodak'
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Card className={classes.root}>
                                        <CardContent>
                                            <Typography>Sarso case no: 35981 Name: Thupten Chodak Postal address:</Typography>
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