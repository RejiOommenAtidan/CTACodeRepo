import React, { useState } from 'react';

import { Card } from '@material-ui/core';

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
      <Card className="rounded w-100 shadow-xxl bg-white my-5 p-5">
        <div className="d-flex align-items-center justify-content-center flex-wrap">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
          </MuiPickersUtilsProvider>
        </div>
      </Card>
    </>
  );
}
