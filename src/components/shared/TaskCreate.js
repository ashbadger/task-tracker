import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TaskNameInput from './TaskNameInput';
import TextArea from './TextArea';
import SectionHeader from './SectionHeader';
import FullWidthButton from './FullWidthButton';
import Task from '../../models/Task';

const Container = styled.div`
  margin: 1rem 0;
  overflow-y: scroll;
  height: -webkit-fill-available;

  @media screen and (max-width: 767px) {
    -webkit-overflow-scrolling: touch;
  }
`;

const propTypes = {
  saveHandler: PropTypes.func.isRequired,
};

const TaskCreate = props => {
  const [task, setTask] = useState(new Task());

  const onNameChangeHandler = e => {
    const name = e.target.value;
    setTask(() => ({ ...task, name }));
  };

  const onNotesChange = e => {
    const notes = e.target.value;
    setTask(() => ({ ...task, notes }));
  };

  const { name, notes } = task;
  const { saveHandler } = props;

  return (
    <div>
      <TaskNameInput
        name={name}
        aria-label="name"
        onNameChangeHandler={onNameChangeHandler}
      />
      <SectionHeader>notes</SectionHeader>
      <TextArea aria-label="notes" value={notes} onChange={onNotesChange} />
      <Container>
        <FullWidthButton
          color="default"
          onClick={() => saveHandler({ name, notes })}
        >
          Create Task
        </FullWidthButton>
      </Container>
    </div>
  );
};

TaskCreate.propTypes = propTypes;

export default TaskCreate;
