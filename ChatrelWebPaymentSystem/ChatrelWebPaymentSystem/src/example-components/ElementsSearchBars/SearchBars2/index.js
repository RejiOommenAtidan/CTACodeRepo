import React, { useState } from 'react';

import clsx from 'clsx';

import { InputAdornment, TextField } from '@material-ui/core';

import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';

export default function LivePreviewExample() {
  const [searchStatus1, setSearchStatus1] = useState(false);
  const toggleSearch1 = () => setSearchStatus1(!searchStatus1);

  const [searchStatus2, setSearchStatus2] = useState(false);
  const toggleSearch2 = () => setSearchStatus2(!searchStatus2);

  const [searchStatus3, setSearchStatus3] = useState(false);
  const toggleSearch3 = () => setSearchStatus3(!searchStatus3);

  return (
    <>
      <div
        className={clsx('search-wrapper search-wrapper--grow mb-4', {
          'is-active': searchStatus1
        })}>
        <TextField
          variant="outlined"
          size="small"
          id="input-with-icon-textfield22-1"
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
      <div className="divider mb-4" />

      <div
        className={clsx(
          'search-wrapper search-wrapper--alternate search-wrapper--grow mb-4',
          { 'is-active': searchStatus2 }
        )}>
        <TextField
          variant="outlined"
          size="small"
          id="input-with-icon-textfield22-2"
          onFocus={toggleSearch2}
          onBlur={toggleSearch2}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchTwoToneIcon />
              </InputAdornment>
            )
          }}
        />
      </div>
      <div className="divider mb-4" />

      <div
        className={clsx('search-wrapper search-wrapper--alternate', {
          'is-active': searchStatus3
        })}>
        <TextField
          variant="outlined"
          size="small"
          className="w-100"
          id="input-with-icon-textfield22-3"
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
    </>
  );
}
