import React, { useState } from 'react';

import { Grid, Card } from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

export default function LivePreviewExample() {
  const [selectedDate, setSelectedDate] = useState(new Date('2020-08-18'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Card className="rounded bg-white mb-spacing-6-x2 p-5">
        <div className="d-flex align-items-center justify-content-center flex-wrap">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="center">
              <div className="m-4">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </div>
              <div className="m-4">
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </div>
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
      </Card>
    </>
  );
}
