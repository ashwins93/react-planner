import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import moment from '../momentRange';
import Day from './Day';

const StyledCalendar = styled.div`
  width: 100%;

  header {
    border-bottom: 1px solid #eee;
    background-color: #fff;
    position: sticky;
    top: 0;
  }

  h1 {
    padding: 3rem;
  }
`;

const Calendar = props => {
  if (!moment(props.month, 'YYYYMM')._isValid) return null;

  const range = moment(props.month, 'YYYYMM').range('month');

  const days = Array.from(range.by('days')).map(day => {
    const key = day.format('YYYYMMDD');
    return (
      <Day key={key} events={props.days[key]} day={day.format('ddd, DD')} />
    );
  });

  return (
    <StyledCalendar>
      <header>
        <h1>{range.start.format('MMMM YYYY')}</h1>
      </header>
      <div>{days}</div>
    </StyledCalendar>
  );
};

Calendar.propTypes = {
  month: PropTypes.string.isRequired,
  days: PropTypes.objectOf(PropTypes.object),
};

export default Calendar;
