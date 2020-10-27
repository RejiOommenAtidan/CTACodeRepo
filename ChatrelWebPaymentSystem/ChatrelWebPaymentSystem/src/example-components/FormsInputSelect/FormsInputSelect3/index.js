import React, { useState } from 'react';

import {
  Grid,
  Input,
  InputLabel,
  Card,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';

const ITEM_HEIGHT = 24;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6.5,
      width: 200
    }
  }
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
];

export default function LivePreviewExample() {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  return (
    <>
      <Card className="shadow-xxl px-4 py-5">
        <Grid container spacing={6}>
          <Grid item lg={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div>
                    {selected.map((value) => (
                      <Chip
                        className="bg-primary text-white"
                        key={value}
                        label={value}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}>
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <Grid container spacing={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-mutiple-chip-label2">Tag</InputLabel>
                <Select
                  multiple
                  displayEmpty
                  value={personName}
                  onChange={handleChange}
                  input={<Input />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Placeholder</em>;
                    }

                    return selected.join(', ');
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem disabled value="">
                    <em>Placeholder</em>
                  </MenuItem>
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
