import React, { useState } from 'react';

import {
  Grid,
  Input,
  InputLabel,
  Checkbox,
  Card,
  MenuItem,
  FormControl,
  Select,
  ListItemText
} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';

const ITEM_HEIGHT = 24;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6.5,
      width: 200
    }
  }
};

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

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
            <div className="heading-3 text-center">Tags Simple</div>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
              <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input />}
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
            <div className="heading-3 text-center">Tags Checkboxes</div>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}>
                {names.map((name) => (
                  <MenuItem className="mx-2 px-2" key={name} value={name}>
                    <Checkbox
                      checked={personName.indexOf(name) > -1}
                      className="p-0 mr-2"
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
