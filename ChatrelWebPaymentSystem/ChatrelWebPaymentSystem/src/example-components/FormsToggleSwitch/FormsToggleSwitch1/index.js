import React, { useState } from 'react';

import { Switch, Grid } from '@material-ui/core';

export default function LivePreviewExample() {
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={6}>
          <div className="heading-3 text-center">Default</div>
          <div className="d-flex justify-content-center">
            <div className="m-2">
              <Switch
                onChange={handleChange}
                checked={state.checkedA}
                name="checkedA"
                color="primary"
                className="switch-medium"
              />
            </div>
            <div className="m-2">
              <Switch
                defaultChecked
                name="checkedB"
                color="secondary"
                className="switch-medium"
              />
            </div>
          </div>
        </Grid>
        <Grid item xl={6}>
          <div className="heading-3 text-center">Sizing</div>
          <div className="d-flex justify-content-center">
            <div className="m-2">
              <Switch
                onChange={handleChange}
                checked={state.checkedA}
                color="primary"
                className="switch-small"
              />
            </div>
            <div className="m-2">
              <Switch
                onChange={handleChange}
                checked={state.checkedB}
                color="secondary"
                className="switch-medium"
              />
            </div>
            <div className="m-2">
              <Switch
                disabled
                checked
                color="primary"
                className="switch-large"
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
