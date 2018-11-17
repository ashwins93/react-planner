import React from 'react';
import PropTypes from 'prop-types';

const Day = props => {
  let cards = null;
  if (props.events) {
    cards = Object.keys(props.events).map(key => {
      const event = props.events[key];

      return (
        <div key={key}>
          <h2>{event.title}</h2>
          <p>{event.time}</p>
        </div>
      );
    });
  }
  return (
    <div>
      {props.day} {cards}
    </div>
  );
};

Day.propTypes = {
  day: PropTypes.string.isRequired,
  events: PropTypes.objectOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ),
};

export default Day;
