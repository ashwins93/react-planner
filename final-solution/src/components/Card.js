import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Form from './Form';

const StyledCard = styled.div`
  padding: 3rem;
  background-color: #eee;
  margin: 1rem;
  border-radius: 1rem;
  width: 25rem;
  display: flex;
  flex-direction: column;

  h2,
  div:not(:last-child) {
    margin-bottom: 2rem;
    flex-grow: 1;
  }

  .badge {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.white};
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 1.4rem;
  }

  .icons button {
    border: none;
    background-color: transparent;
    padding: 1rem;
    font-size: 2rem;
    cursor: pointer;
    color: inherit;
  }
`;

class Card extends React.PureComponent {
  static propTypes = {
    event: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    }).isRequired,
    deleteEvent: PropTypes.func.isRequired,
    editEvent: PropTypes.func.isRequired,
  };

  state = {
    showModal: false,
  };

  toggleModal = () =>
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));

  render() {
    const props = this.props;
    return (
      <StyledCard>
        <h2>{props.event.title}</h2>
        <div>
          <span className="badge">{props.event.time}</span>
        </div>
        <div>{props.event.description}</div>
        <div className="icons">
          <button onClick={this.toggleModal}>
            <i class="far fa-edit" />
          </button>
          <button onClick={props.deleteEvent}>
            <i class="far fa-trash-alt" />
          </button>
        </div>
        {this.state.showModal && (
          <Modal closeModal={this.toggleModal}>
            <Form
              heading="Edit card"
              onSubmit={data => {
                props.editEvent(data);
                this.toggleModal();
              }}
            />
          </Modal>
        )}
      </StyledCard>
    );
  }
}

export default Card;
