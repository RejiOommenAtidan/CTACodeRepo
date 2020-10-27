import React, { Component } from 'react';

import {
  Container,
  InputAdornment,
  Button,
  TextField
} from '@material-ui/core';

import { Formik } from 'formik';
import * as Yup from 'yup';

import NameIcon from '@material-ui/icons/SupervisorAccount';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';

const validationSchema = Yup.object({
  name: Yup.string('Enter a name').required('Name is required'),
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string('')
    .min(8, 'Password must contain atleast 8 characters')
    .required('Enter your password'),
  confirmPassword: Yup.string('Enter your password')
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match')
});

const Form = (props) => {
  const {
    values: { name, email, password, confirmPassword },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid
  } = props;
  console.table(props);

  return (
    <Container className="py-4">
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          className="mb-4"
          name="name"
          helperText={touched.name ? errors.name : ''}
          error={Boolean(errors.name)}
          label="Name"
          value={name}
          onChange={handleChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <NameIcon />
              </InputAdornment>
            )
          }}
        />
        <TextField
          variant="outlined"
          className="mb-4"
          name="email"
          helperText={touched.email ? errors.email : ''}
          error={Boolean(errors.email)}
          label="Email"
          fullWidth
          value={email}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            )
          }}
        />
        <TextField
          variant="outlined"
          className="mb-4"
          name="password"
          helperText={touched.password ? errors.password : ''}
          error={Boolean(errors.password)}
          label="Password"
          fullWidth
          type="password"
          value={password}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            )
          }}
        />
        <TextField
          variant="outlined"
          className="mb-4"
          name="confirmPassword"
          helperText={touched.confirmPassword ? errors.confirmPassword : ''}
          error={Boolean(errors.confirmPassword)}
          label="Confirm Password"
          fullWidth
          type="password"
          value={confirmPassword}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            )
          }}
        />
        <div className="text-center">
          <Button
            type="submit"
            size="large"
            className="btn-success"
            disabled={!isValid}>
            Validate Form
          </Button>
        </div>
      </form>
    </Container>
  );
};

class LivePreviewExample extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = (data) => {
    console.log(data);
  };

  render() {
    const values = { name: '', email: '', confirmPassword: '', password: '' };
    return (
      <>
        <Formik
          render={(props) => <Form {...props} />}
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={this.submit}
        />
      </>
    );
  }
}

export default LivePreviewExample;
