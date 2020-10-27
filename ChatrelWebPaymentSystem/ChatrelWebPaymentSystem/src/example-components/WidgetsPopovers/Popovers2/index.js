import React, { useState } from 'react';

import { Box, Popover, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const [anchorEl5, setAnchorEl5] = useState(null);
  const [anchorEl6, setAnchorEl6] = useState(null);
  const [anchorEl7, setAnchorEl7] = useState(null);
  const [anchorEl8, setAnchorEl8] = useState(null);
  const [anchorEl9, setAnchorEl9] = useState(null);

  const handleClickPopover1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClosePopover1 = () => {
    setAnchorEl1(null);
  };

  const handleClickPopover2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClosePopover2 = () => {
    setAnchorEl2(null);
  };

  const handleClickPopover3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClosePopover3 = () => {
    setAnchorEl3(null);
  };

  const handleClickPopover4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };
  const handleClosePopover4 = () => {
    setAnchorEl4(null);
  };

  const handleClickPopover5 = (event) => {
    setAnchorEl5(event.currentTarget);
  };
  const handleClosePopover5 = () => {
    setAnchorEl5(null);
  };

  const handleClickPopover6 = (event) => {
    setAnchorEl6(event.currentTarget);
  };
  const handleClosePopover6 = () => {
    setAnchorEl6(null);
  };

  const handleClickPopover7 = (event) => {
    setAnchorEl7(event.currentTarget);
  };
  const handleClosePopover7 = () => {
    setAnchorEl7(null);
  };

  const handleClickPopover8 = (event) => {
    setAnchorEl8(event.currentTarget);
  };
  const handleClosePopover8 = () => {
    setAnchorEl8(null);
  };

  const handleClickPopover9 = (event) => {
    setAnchorEl9(event.currentTarget);
  };
  const handleClosePopover9 = () => {
    setAnchorEl9(null);
  };

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const open4 = Boolean(anchorEl4);
  const open5 = Boolean(anchorEl5);
  const open6 = Boolean(anchorEl6);
  const open7 = Boolean(anchorEl7);
  const open8 = Boolean(anchorEl8);
  const open9 = Boolean(anchorEl9);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center py-4 flex-wrap">
        <Button className="btn-primary m-2" onClick={handleClickPopover1}>
          Primary
        </Button>
        <Popover
          classes={{ paper: 'bg-primary text-white' }}
          open={open1}
          anchorEl={anchorEl1}
          onClose={handleClosePopover1}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}>
          <Box className="p-4">
            This popover has a primary background and is powered by Material-UI!
          </Box>
        </Popover>

        <Button className="btn-secondary m-2" onClick={handleClickPopover2}>
          Secondary
        </Button>
        <Popover
          classes={{ paper: 'bg-secondary text-white' }}
          open={open2}
          anchorEl={anchorEl2}
          onClose={handleClosePopover2}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}>
          <Box className="p-4">
            This popover has a secondary background and is powered by
            Material-UI!
          </Box>
        </Popover>
        <Button className="btn-first m-2" onClick={handleClickPopover3}>
          First
        </Button>
        <Popover
          open={open3}
          classes={{ paper: 'bg-first text-white' }}
          anchorEl={anchorEl3}
          onClose={handleClosePopover3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}>
          <Box className="p-4">
            This popover has a first background and is powered by Material-UI!
          </Box>
        </Popover>
        <Button className="btn-second m-2" onClick={handleClickPopover4}>
          Second
        </Button>
        <Popover
          open={open4}
          anchorEl={anchorEl4}
          classes={{ paper: 'bg-second text-white' }}
          onClose={handleClosePopover4}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}>
          <Box className="p-4">
            This popover has a second background and is powered by Material-UI!
          </Box>
        </Popover>

        <Button className="btn-info m-2" onClick={handleClickPopover5}>
          Info
        </Button>
        <Popover
          open={open5}
          anchorEl={anchorEl5}
          classes={{ paper: 'bg-info text-white' }}
          onClose={handleClosePopover5}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}>
          <Box className="p-4">
            This popover has a info background and is powered by Material-UI!
          </Box>
        </Popover>
        <Button className="btn-success m-2" onClick={handleClickPopover6}>
          Success
        </Button>
        <Popover
          open={open6}
          classes={{ paper: 'bg-success text-white' }}
          anchorEl={anchorEl6}
          onClose={handleClosePopover6}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}>
          <Box className="p-4">
            This popover has a success background and is powered by Material-UI!
          </Box>
        </Popover>

        <Button className="btn-warning m-2" onClick={handleClickPopover7}>
          Warning
        </Button>
        <Popover
          open={open7}
          classes={{ paper: 'bg-warning text-white' }}
          anchorEl={anchorEl7}
          onClose={handleClosePopover7}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}>
          <Box className="p-4">
            This popover has a warning background and is powered by Material-UI!
          </Box>
        </Popover>

        <Button className="btn-danger m-2" onClick={handleClickPopover8}>
          Danger
        </Button>
        <Popover
          open={open8}
          classes={{ paper: 'bg-danger text-white' }}
          anchorEl={anchorEl8}
          onClose={handleClosePopover8}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}>
          <Box className="p-4">
            This popover has a danger background and is powered by Material-UI!
          </Box>
        </Popover>
        <Button className="btn-dark m-2" onClick={handleClickPopover9}>
          Dark
        </Button>
        <Popover
          open={open9}
          classes={{ paper: 'bg-dark text-white' }}
          anchorEl={anchorEl9}
          onClose={handleClosePopover9}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}>
          <Box className="p-4">
            This popover has a dark background and is powered by Material-UI!
          </Box>
        </Popover>
      </div>
    </>
  );
}
