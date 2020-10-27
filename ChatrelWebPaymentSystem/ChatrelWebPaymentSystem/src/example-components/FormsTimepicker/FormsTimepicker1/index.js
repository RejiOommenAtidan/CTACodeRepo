import React, { useState } from 'react';

import { Container, Card, TextField } from '@material-ui/core';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';

export default function LivePreviewExample() {
  const [selectedDate, setSelectedDate] = useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Container>
          <Card className="p-5 shadow-xxl">
            <div className="heading-3 text-center">Basic</div>
            <div className="d-flex justify-content-center align-items-center">
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
            </div>
          </Card>
          <div className="divider my-4" />
          <Card className="p-5 shadow-xxl">
            <div className="heading-3 text-center">Native</div>
            <div className="d-flex justify-content-center align-items-center">
              <TextField
                id="date"
                label="Birthday"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
          </Card>
          <div className="divider my-4" />
          <Card className="p-5 shadow-xxl">
            <div className="heading-3 text-center">Disabled</div>
            <div className="d-flex justify-content-center align-items-center">
              <KeyboardTimePicker
                disabled
                margin="normal"
                id="time-picker 2"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
            </div>
          </Card>
        </Container>
      </MuiPickersUtilsProvider>
    </>
  );
}
