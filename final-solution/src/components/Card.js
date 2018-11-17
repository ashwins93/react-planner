import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledCard = styled.div`
  padding: 3rem;
  background-color: #eee;
  margin: 0 1rem;
  border-radius: 1rem;
  width: 25rem;

  h2,
  div:not(:last-child) {
    margin-bottom: 2rem;
  }

  .badge {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.white};
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 1.8rem;
  }
`;

const Card = props => {
  return (
    <StyledCard>
      <h2>{props.event.title}</h2>
      <div>
        <span className="badge">{props.event.time}</span>
      </div>
      <div>{props.event.description}</div>
    </StyledCard>
  );
};

Card.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  expand: PropTypes.bool,
};

export default Card;
