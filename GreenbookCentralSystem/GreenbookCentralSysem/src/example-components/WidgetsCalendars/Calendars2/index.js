import React from 'react';

import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar';

import events from './events';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

let allViews = Object.keys(Views).map((k) => Views[k]);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: '#eaf6ff'
    }
  });

const locales = {
  'en-US': require('date-fns/locale/en-US')
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

export default function LivePreviewExample() {
  return (
    <>
      <Calendar
        localizer={localizer}
        views={allViews}
        step={60}
        showMultiDayTimes
        defaultDate={new Date(2020, 3, 1)}
        components={{
          timeSlotWrapper: ColoredDateCellWrapper
        }}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ minHeight: 650 }}
      />
    </>
  );
}
