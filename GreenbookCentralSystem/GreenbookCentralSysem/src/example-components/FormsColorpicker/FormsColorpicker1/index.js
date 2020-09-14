import React, { useState } from 'react';

import { Grid, Button } from '@material-ui/core';

import { BlockPicker, TwitterPicker } from 'react-color';

const popover = {
  position: 'absolute',
  zIndex: '2',
  top: '54px',
  left: '15px',
  opacity: '1',
  visibility: 'visible'
};
const cover = {
  position: 'fixed',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px'
};

export default function LivePreviewExample() {
  const [displayColorPicker1, setDp1] = useState(false);
  const showDp1 = () => setDp1(!displayColorPicker1);
  const hideDp1 = () => setDp1(displayColorPicker1 === !displayColorPicker1);

  const [displayColorPicker2, setDp2] = useState(false);
  const showDp2 = () => setDp2(!displayColorPicker2);
  const hideDp2 = () => setDp2(displayColorPicker2 === !displayColorPicker2);

  return (
    <>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          sm={6}
          className="d-flex align-items-center justify-content-center">
          <div className="position-relative">
            <Button className="btn-primary" onClick={showDp1}>
              Custom Picker Wrapper 1
            </Button>
            {displayColorPicker1 ? (
              <div className="shadow-xxl p-0 m-0" style={popover}>
                <div style={cover} onClick={hideDp1} />
                <TwitterPicker />
              </div>
            ) : null}
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          className="d-flex align-items-center justify-content-center">
          <Button className="btn-primary" onClick={showDp2}>
            Custom Picker Wrapper 2
          </Button>
          {displayColorPicker2 ? (
            <div className="shadow-xxl p-0 m-0" style={popover}>
              <div style={cover} onClick={hideDp2} />
              <BlockPicker className="m-0 border-0 w-100 mx-auto" />
            </div>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}
