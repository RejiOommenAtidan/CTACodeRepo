import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, TextField } from '@material-ui/core';

import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';

export default function LivePreviewExample() {
  const [searchStatus1, setSearchStatus1] = useState(false);
  const toggleSearch1 = () => setSearchStatus1(!searchStatus1);

  return (
    <>
      <div className={clsx('search-wrapper', { 'is-active': searchStatus1 })}>
        <div className="search-options">
          <div>
            <input
              name="type"
              type="radio"
              value="type-audio"
              id="type-audio"
            />
            <label htmlFor="type-audio">
              <FontAwesomeIcon
                icon={['far', 'file-audio']}
                className="font-size-lg"
              />
              <span>Audio</span>
            </label>
          </div>
          <div>
            <input
              name="type"
              type="radio"
              value="type-video"
              id="type-video"
            />
            <label htmlFor="type-video">
              <FontAwesomeIcon
                icon={['fas', 'film']}
                className="font-size-lg"
              />
              <span>Videos</span>
            </label>
          </div>
          <div>
            <input
              name="type"
              type="radio"
              value="type-images"
              id="type-images"
            />
            <label htmlFor="type-images">
              <FontAwesomeIcon
                icon={['far', 'images']}
                className="font-size-lg"
              />
              <span>Images</span>
            </label>
          </div>
        </div>
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
    </>
  );
}
