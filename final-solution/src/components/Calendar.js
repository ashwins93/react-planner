import React from 'react';
import PropTypes from 'prop-types';

import moment from '../momentRange';
import Day from './Day';

const Calendar = props => {
  if (!moment(props.month, 'YYYYMM')._isValid) return null;

  const range = moment(props.month, 'YYYYMM').range('month');

  const days = Array.from(range.by('days')).map(day => {
    const key = day.format('YYYYMMDD');
    return (
      <Day key={key} events={props.days[key]} day={day.format('ddd, D')} />
    );
  });

  return (
    <div>
      Calendar {range.start.format('MMMM YYYY')}
      {days}
    </div>
  );
};

Calendar.propTypes = {
  month: PropTypes.string.isRequired,
  days: PropTypes.objectOf(PropTypes.object),
};

export default Calendar;
