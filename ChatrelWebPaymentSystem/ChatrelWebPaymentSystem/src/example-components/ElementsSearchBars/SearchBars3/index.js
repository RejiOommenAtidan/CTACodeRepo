import React, { useState } from 'react';

import clsx from 'clsx';

import { Grid, InputAdornment, TextField } from '@material-ui/core';

import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';

export default function LivePreviewExample() {
  const [searchStatus1, setSearchStatus1] = useState(false);
  const toggleSearch1 = () => setSearchStatus1(!searchStatus1);

  const [searchStatus3, setSearchStatus3] = useState(false);
  const toggleSearch3 = () => setSearchStatus3(!searchStatus3);

  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <div
            className={clsx('search-wrapper search-wrapper--expandable', {
              'is-active': searchStatus1
            })}>
            <TextField
              variant="outlined"
              size="small"
              className="w-100"
              id="input-with-icon-textfield22-3"
              onFocus={toggleSearch1}
              onBlur={toggleSearch1}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                )
              }}
            />
          </div>
        </Grid>
        <Grid item md={6}>
          <div
            className={clsx(
              'search-wrapper search-wrapper--expandable search-wrapper--alternate',
              { 'is-active': searchStatus3 }
            )}>
            <TextField
              variant="outlined"
              size="small"
              className="w-100"
              id="input-with-icon-textfield22-4"
              onFocus={toggleSearch3}
              onBlur={toggleSearch3}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                )
              }}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
