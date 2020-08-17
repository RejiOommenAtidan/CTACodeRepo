import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
  InputLabel
} from '@material-ui/core';
import Page from 'src/components/Page';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              role: '',
              region: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                firstName: Yup.string().max(255).required('First name is required'),
                lastName: Yup.string().max(255).required('Last name is required'),
                region: Yup.string().max(255).required('Region is required'),
                role: Yup.string().max(255).required('Role is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={() => {
              navigate('/app/manageuser', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Edit User
                  </Typography>
                  
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.fullname && errors.fullname)}
                  fullWidth
                  helperText={touched.fullname && errors.fullname}
                  label="Full Name"
                  margin="normal"
                  name="fullname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullname}
                  variant="outlined"
                />
                
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.conpassword && errors.conpassword)}
                  fullWidth
                  helperText={touched.conpassword && errors.conpassword}
                  label="Confirm Password"
                  margin="normal"
                  name="conpassword"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.conpassword}
                  variant="outlined"
                />
            <FormControl variant="outlined" className={classes.formControl}>
                 <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    variant="outlined"
                  // value={age}
                    onChange={handleChange}
                    label="Role"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'sd'}>Software Developer</MenuItem>
                    <MenuItem value={'tsd'}>Trainee Software Developer</MenuItem>
                    
                  </Select>  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="region-label">Region</InputLabel>
                  <Select
                    labelId="region-label"
                    id="region"
                    variant="outlined"
                  // value={age}
                    onChange={handleChange}
                    label="Region"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'mum'}>Mumbai</MenuItem>
                    <MenuItem value={'pun'}>Pune</MenuItem>
                    
                  </Select> 
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    variant="outlined"
                  // value={age}
                    onChange={handleChange}
                    label="status"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'act'}>Active</MenuItem>
                    <MenuItem value={'inact'}>Inactive</MenuItem>
                    
                  </Select> 
                  </FormControl>
    
                
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                
                <Button variant="contained" color="primary">
                    Submit
                </Button> 
                            
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
