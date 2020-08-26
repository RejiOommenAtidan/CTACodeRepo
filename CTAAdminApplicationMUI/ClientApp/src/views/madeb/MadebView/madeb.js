import React from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import theme from '../../../theme/theme/theme';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import axios from 'axios'
import { ThemeProvider } from '@material-ui/styles';
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
import Page from 'src/components/Page';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = (theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
        flexGrow: 1,
        'label + &': {
            marginTop: theme.spacing(3)
        }
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(0.5),

        width: '100%'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    /*textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },*/
    // selectField: {
    //   marginLeft: theme.spacing(1),
    //   marginRight: theme.spacing(1),
    //   marginBottom: theme.spacing(2)
    // },
    box: {
        marginBottom: theme.spacing(1.5),
        marginTop: theme.spacing(1.5)
    }

});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


class RegisterView extends React.Component {

    state={
        currentSelection:'new'
    };
    
    handleDropDownChange = (event) => {
        this.setState
    }

    render() {
        const { classes } = this.props;
        /*const [madeb, setMadeb] = React.useState('');
    
        const handleChange = (event) => {
          setMadeb(event.target.value);
        };*/

        return (

            <Grid container spacing={3}>
                <Typography variant="h2" >Manage Madeb</Typography>

                <Grid container spacing={3}>

                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="madeb-label"> Madeb</InputLabel>
                            <Select
                                labelId="madeb-label"
                                id="madeb"
                                //value={madeb}
                                //onChange={handleChange}
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
                    </Grid>
                    <Grid item xs={6}>

                    </Grid>
                </Grid>

                <div>
                    <Typography variant="h4" >Sarso Madeb</Typography>
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


                                    value='16-07-2020'

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
                    </Grid>
                </div>

                <div>
                    <Typography variant="h4" >Norchoe Madeb</Typography>
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


                                    value='16-07-2020'

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
                    </Grid>
                </div>

                <div>
                    <Typography variant="h4" >Bhorlak Madeb</Typography>
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


                                    value='16-07-2020'

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
                    </Grid>
                </div>
            </Grid>
        )
    }
}
export default withStyles(useStyles(theme))(RegisterView)
// export default RegisterView
