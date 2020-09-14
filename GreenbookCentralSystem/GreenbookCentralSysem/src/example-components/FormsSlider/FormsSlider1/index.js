import React, { useState } from 'react';

import { Grid } from '@material-ui/core';

import Slider from '@material-ui/core/Slider';

function valuetext(value) {
  return <span>{{ value }}°C</span>;
}

export default function LivePreviewExample() {
  const [value, setValue] = useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid container spacing={6} justify="center">
        <Grid item md={6}>
          <Slider
            className="slider-primary my-3"
            value={value}
            onChange={handleChange}
          />

          <Slider
            className="slider-danger my-3"
            value={value}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={6}>
          <Slider
            defaultValue={30}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={110}
            className="slider-warning my-3"
          />

          <Slider
            className="slider-success my-3"
            defaultValue={30}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={110}
          />
        </Grid>
      </Grid>
    </>
  );
}
