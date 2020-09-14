import React, { useState } from 'react';

import { Collapse, IconButton } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import CloseIcon from '@material-ui/icons/Close';

export default function LivePreviewExample() {
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [open3, setOpen3] = useState(true);
  const [open4, setOpen4] = useState(true);

  return (
    <>
      <Collapse in={open1}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen1(false);
              }}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          className="mb-4"
          severity="success">
          This is a success alert that can be closed. Give it a click if you
          like.
        </Alert>
      </Collapse>
      <Collapse in={open2}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen2(false);
              }}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          className="mb-4"
          severity="error">
          This is a danger alert that can be closed. Give it a click if you
          like.
        </Alert>
      </Collapse>
      <Collapse in={open3}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen3(false);
              }}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          className="mb-4"
          severity="warning">
          This is a warning alert that can be closed. Give it a click if you
          like.
        </Alert>
      </Collapse>
      <Collapse in={open4}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen4(false);
              }}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity="info">
          This is a info alert that can be closed. Give it a click if you like.
        </Alert>
      </Collapse>
    </>
  );
}
