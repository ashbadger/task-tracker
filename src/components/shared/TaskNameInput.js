import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SectionHeader from './SectionHeader';

const Input = styled.input`
  background-color: transparent;
  border: transparent;
  border-bottom: solid 1px rgba(0, 0, 0, 1);
  color: rgb(45, 49, 72);
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  width: 100%;

  &:focus {
    border-bottom-color: rgba(223, 200, 76, 1);
    outline: none;
  }

  @media screen and (max-width: 550px) {
    font-size: 5vw;
  }
`;

const propTypes = {
  name: PropTypes.string.isRequired,
  onNameChangeHandler: PropTypes.func.isRequired,
  onMouseLeaveHandler: PropTypes.func,
};

const defaultProps = {
  onMouseLeaveHandler: null,
};

const TaskNameInput = props => {
  const { name, onNameChangeHandler, onMouseLeaveHandler } = props;

  return (
    <>
      <SectionHeader>name</SectionHeader>
      <Input
        value={name}
        aria-label="name"
        onChange={onNameChangeHandler}
        onMouseLeave={onMouseLeaveHandler}
      />
    </>
  );
};

TaskNameInput.propTypes = propTypes;
TaskNameInput.defaultProps = defaultProps;

export default TaskNameInput;
