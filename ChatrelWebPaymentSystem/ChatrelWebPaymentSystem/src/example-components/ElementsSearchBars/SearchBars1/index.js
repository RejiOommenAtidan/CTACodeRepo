import React from 'react';

import { InputAdornment, TextField } from '@material-ui/core';

import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
export default function LivePreviewExample() {
  return (
    <>
      <TextField
        variant="outlined"
        size="small"
        id="input-with-icon-textfield1"
        className="w-100 mb-4"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          )
        }}
      />
      <TextField
        variant="outlined"
        id="input-with-icon-textfield3"
        className="w-100 mb-4"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          )
        }}
      />
      <div className="divider" />
      <TextField
        variant="outlined"
        size="small"
        id="input-with-icon-textfield1-1"
        className="w-100 mb-4"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchTwoToneIcon />
            </InputAdornment>
          )
        }}
      />
      <TextField
        variant="outlined"
        id="input-with-icon-textfield3-3"
        className="w-100 mb-4"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchTwoToneIcon />
            </InputAdornment>
          )
        }}
      />
    </>
  );
}
