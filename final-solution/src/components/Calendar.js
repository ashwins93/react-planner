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
    display: flex;
    justify-content: space-between;
  }

  h1 {
    padding: 3rem;
  }

  header i {
    display: flex;
    align-items: center;
    margin: 0 2rem;
    font-size: 2rem;
    color: #ddd;
    cursor: pointer;
  }
`;

const Calendar = props => {
  if (!moment(props.month, 'YYYYMM')._isValid) return null;

  const range = moment(props.month, 'YYYYMM').range('month');

  const days = Array.from(range.by('days')).map(day => {
    const key = day.format('YYYYMMDD');
    return (
      <Day
        key={key}
        addr={key}
        events={props.days[key]}
        addOrEditEvent={props.addOrEditEvent}
        deleteEvent={props.deleteEvent}
        day={day.format('ddd, DD')}
      />
    );
  });

  return (
    <StyledCalendar>
      <header>
        <i onClick={props.prevMonth} className="fas fa-chevron-left" />
        <h1>{range.start.format('MMMM YYYY')}</h1>
        <i onClick={props.nextMonth} className="fas fa-chevron-right" />
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
