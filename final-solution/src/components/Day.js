import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Card from './Card';
import Form from './Form';
import Modal from './Modal';

const StyledDay = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 3rem;
  border-bottom: 1px solid #eee;
  display: flex;
`;

const Date = styled.div`
  text-align: center;
  padding: 0 2rem;
  border-right: 1px solid #eee;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 10rem;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 2rem;
`;

const AddCardButton = styled.button`
  width: 25rem;
  border: 3px dashed #eee;
  color: #aaa;
  text-transform: uppercase;
  border-radius: 1rem;
  font-size: 2rem;
  margin: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7;
  }

  &:active,
  &:focus {
    outline: none;
  }
`;

class Day extends React.PureComponent {
  static propTypes = {
    day: PropTypes.string.isRequired,
    events: PropTypes.objectOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
    ),
  };

  state = {
    showModal: false,
  };

  toggleModal = () =>
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));

  render() {
    let cards = null;
    const props = this.props;
    if (props.events) {
      cards = Object.keys(props.events).map(key => {
        const event = props.events[key];

        return <Card key={key} event={event} />;
      });
    }

    return (
      <StyledDay>
        <Date>
          <div>{props.day.split(', ')[0]}</div>
          <div>{props.day.split(', ')[1]}</div>
        </Date>
        <Cards>
          {cards}
          <AddCardButton onClick={this.toggleModal}>Add a Card</AddCardButton>
        </Cards>
        {this.state.showModal && (
          <Modal closeModal={this.toggleModal}>
            <Form heading="Add a Card" onSubmit={data => {
              this.props.addOrEditEvent(data, this.props.addr);
              this.toggleModal();
            }} />
          </Modal>
        )}
      </StyledDay>
    );
  }
}

export default Day;
