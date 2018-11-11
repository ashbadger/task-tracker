import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SectionHeader from './SectionHeader';

const TaskNameInput = styled.input`
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
`;

const propTypes = {
  name: PropTypes.string.isRequired,
  onNameChangeHandler: PropTypes.func.isRequired,
};

const TaskInput = (props) => {
  const { name, onNameChangeHandler } = props;

  return (
    <React.Fragment>
      <SectionHeader>name</SectionHeader>
      <TaskNameInput value={name} onChange={onNameChangeHandler} />
    </React.Fragment>
  );
};

TaskInput.propTypes = propTypes;

export default TaskInput;
