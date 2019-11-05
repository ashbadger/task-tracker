import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import { useHistory, useParams } from 'react-router-dom';

import TaskNameInput from '../shared/TaskNameInput';
import TextArea from '../shared/TextArea';
import Timer from '../shared/Timer';
import FullWidthButton from '../shared/FullWidthButton';
import TaskService from '../../services/tasks';
import ContentContainer from '../shared/ContentContainer';
import navigateBack from '../../utils/navigateBack';
import Subtask from '../../models/Subtask';

const ActionsContainer = styled.div`
  height: auto;
  border: solid 2px rgb(226, 226, 226);
  border-radius: 5px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const ItemContainer = styled.div`
  text-align: center;
  align-items: center;
  padding: 1rem 2rem;
  border: solid 1px rgba(211, 211, 211, 1);
  border-radius: 5px;
  margin: 0.5rem;
  flex-grow: 1;
  min-height: 75px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media screen and (max-width: 767px) {
    min-height: 60px;
    margin: 0.25rem;
  }
`;

const SectionHeader = styled.h4`
  font-weight: 500;
  color: rgba(91, 91, 91, 1);
`;

const SubtaskDetails = () => {
  const { id: taskId, subtaskId } = useParams();
  const taskService = new TaskService();
  const [subtask, setSubtask] = useState(new Subtask());
  const history = useHistory();

  useEffect(() => {
    if (JSON.stringify(subtask) === JSON.stringify(new Subtask())) {
      const getSubtask = async () => {
        const subtaskRes = await taskService.getSubtask(taskId, subtaskId);
        setSubtask({ ...subtaskRes });
      };

      getSubtask();
    }
  }, [subtask]);

  const updateSubtask = async (updates = {}) => {
    return taskService
      .updateSubtask(taskId, subtaskId, { ...updates, ...subtask })
      .catch(() => new Error('task does not exist'));
  };

  const updateTimeSpentHandler = timeSpent => {
    setSubtask(prevSubtask => ({ ...prevSubtask, timeSpent }));
  };

  const onNameChangeHandler = e => {
    const name = e.target.value;
    setSubtask(prevSubtask => ({ ...prevSubtask, name }));
  };

  const onNotesChange = e => {
    const notes = e.target.value;
    setSubtask(prevSubtask => ({ ...prevSubtask, notes }));
  };

  const deleteSubtask = () => {
    return taskService
      .deleteSubtask(taskId, subtaskId)
      .then(() => navigateBack(history));
  };

  const { timeSpent, name, notes, completed } = subtask;

  return (
    <ContentContainer onMouseLeave={() => updateSubtask()}>
      <TaskNameInput
        name={name}
        onNameChangeHandler={onNameChangeHandler}
        onMouseLeaveHandler={() => updateSubtask()}
      />
      <SectionHeader>actions</SectionHeader>
      <ActionsContainer>
        <ItemContainer>
          <small>Time Spent</small>
          <Timer
            timeSpent={timeSpent}
            updateTimeSpentHandler={updateTimeSpentHandler}
            watchTimerStopHandler={updateSubtask}
          />
        </ItemContainer>
        <ItemContainer>
          <>
            <small>Subtask is Complete?</small>
            <Switch
              onChange={() =>
                setSubtask(prev => ({ ...prev, completed: !completed }))
              }
              checked={completed}
            />
          </>
        </ItemContainer>
      </ActionsContainer>
      <SectionHeader>notes</SectionHeader>
      <TextArea
        aria-label="notes"
        value={notes}
        onChange={onNotesChange}
        onMouseLeave={() => updateSubtask()}
      />
      <FullWidthButton color="red" onClick={deleteSubtask}>
        Delete Task
      </FullWidthButton>
    </ContentContainer>
  );
};

export default SubtaskDetails;
