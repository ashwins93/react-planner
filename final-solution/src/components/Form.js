import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledForm = styled.form`
  max-width: 50rem;
  padding: 3rem;
  border-radius: 1rem;
  background-color: #fff;
  text-align: center;
  width: 100%;

  h2 {
    margin-bottom: 2rem;
  }

  input,
  textarea {
    display: block;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    padding: 1rem;
    margin-bottom: 2rem;
    transition: all 0.3s;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.primary};
    }

    &::placeholder {
      color: #ddd;
    }
  }

  textarea {
    resize: none;
  }

  button {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.white};
    padding: 1rem 2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

class Form extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    heading: PropTypes.string.isRequired,
  };

  state = {
    title: '',
    time: '',
    description: '',
  };

  handleChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <h2>{this.props.heading}</h2>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="time"
          value={this.state.time}
          onChange={this.handleChange}
          placeholder="Time"
        />
        <textarea
          value={this.state.description}
          name="description"
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </StyledForm>
    );
  }
}

export default Form;
