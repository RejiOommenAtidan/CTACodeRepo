import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Grid, Input, Card, FormControl } from '@material-ui/core';

import MaskedInput from 'react-text-mask';

function TextMaskPhone(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '+',
        '1',
        ' ',
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={'\u2000'}
      showMask
      guide={true}
    />
  );
}
TextMaskPhone.propTypes = {
  inputRef: PropTypes.func.isRequired
};

function TextMaskDate(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
      guide={true}
    />
  );
}
TextMaskDate.propTypes = {
  inputRef: PropTypes.func.isRequired
};

function TextMaskCc(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={'\u2000'}
      showMask
      guide={true}
    />
  );
}
TextMaskCc.propTypes = {
  inputRef: PropTypes.func.isRequired
};

export default function LivePreviewExample() {
  const [values, setValues] = useState({
    phone: '+1 (456) 456-4564',
    cc: '4242 4242 4242 4242',
    date: '09/12/2020'
  });

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  return (
    <>
      <Card className="shadow-xxl px-4 py-5">
        <Grid item md={8} lg={6} className="mx-auto p-0">
          <div className="heading-3">Phone numbers</div>
          <FormControl fullWidth size="medium">
            <Input
              value={values.phone}
              onChange={handleChange}
              name="phone"
              id="phone-mask-input"
              inputComponent={TextMaskPhone}
            />
          </FormControl>

          <div className="divider my-5" />

          <div className="heading-3">Dates</div>

          <FormControl fullWidth size="medium">
            <Input
              value={values.date}
              onChange={handleChange}
              name="date"
              id="date-mask-input"
              inputComponent={TextMaskDate}
            />
          </FormControl>

          <div className="divider my-5" />

          <div className="heading-3">Credit Card</div>

          <FormControl fullWidth size="medium">
            <Input
              value={values.cc}
              onChange={handleChange}
              name="cc"
              id="cc-mask-input"
              inputComponent={TextMaskCc}
            />
          </FormControl>
        </Grid>
      </Card>
    </>
  );
}
