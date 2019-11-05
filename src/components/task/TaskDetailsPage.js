import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';

import TaskOverview from '../shared/TaskOverview';
import TaskService from '../../services/tasks';
import TaskComponent from '../shared/Task';
import TextArea from '../shared/TextArea';
import TaskNameInput from '../shared/TaskNameInput';
import Button from '../shared/Button';
import FullWidthButton from '../shared/FullWidthButton';
import getSubtasksAggs from '../../utils/getSubtasksAggs';
import SectionHeader from '../shared/SectionHeader';
import ContentContainer from '../shared/ContentContainer';
import navigateBack from '../../utils/navigateBack';
import Task from '../../models/Task';

const SectionHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskDetails = () => {
  const taskService = new TaskService();
  const [task, setTask] = useState(new Task());
  const history = useHistory();
  const { id } = useParams();
  let initialState = true;

  const saveTask = async () => {
    return taskService
      .updateTask(id, { ...task })
      .catch(() => new Error('task does not exist'));
  };

  const getTask = async () => {
    const taskRes = await taskService.getTask(id);
    const aggregates = getSubtasksAggs(taskRes.subtasks);
    setTask({ ...taskRes, ...aggregates });
  };

  useEffect(() => {
    if (initialState) {
      getTask();
      initialState = false;
    }
  }, []);

  const openSubtask = subtaskId => {
    history.push(`/tasks/${id}/${subtaskId}`);
  };

  const deleteTask = () => {
    taskService.deleteTask(id).then(() => navigateBack(history));
  };

  const onNameChangeHandler = e => {
    const name = e.target.value;
    setTask(prevTask => ({ ...prevTask, name }));
  };

  const onNotesChange = e => {
    const notes = e.target.value;
    setTask(prevTask => ({ ...prevTask, notes }));
  };

  const { name, subtasks, notes, percentageCompletedAgg, timeSpentAgg } = task;

  return (
    <ContentContainer onMouseLeave={saveTask}>
      <TaskNameInput
        name={name}
        onMouseLeaveHandler={saveTask}
        onNameChangeHandler={onNameChangeHandler}
      />
      <SectionHeader>overview</SectionHeader>
      <TaskOverview
        timeSpent={timeSpentAgg}
        percentageCompleted={percentageCompletedAgg}
      />
      <SectionHeaderContainer>
        <SectionHeader>subtasks</SectionHeader>
        <Button
          color="default"
          onClick={() => history.push(`/tasks/${id}/create`)}
        >
          Create New Subtask
        </Button>
      </SectionHeaderContainer>
      {subtasks.map(subtask => (
        <div
          onClick={() => openSubtask(subtask.id)}
          onKeyDown={() => openSubtask(subtask.id)}
          role="button"
          tabIndex={0}
          key={subtask.id}
        >
          <TaskComponent
            name={subtask.name}
            completed={subtask.completed}
            timeSpent={subtask.timeSpent}
            isSubtask
          />
        </div>
      ))}
      <SectionHeader>notes</SectionHeader>
      <TextArea
        aria-label="notes"
        value={notes}
        onChange={onNotesChange}
        onMouseLeave={saveTask}
      />
      <FullWidthButton color="red" onClick={() => deleteTask()}>
        Delete Task
      </FullWidthButton>
    </ContentContainer>
  );
};

export default TaskDetails;
