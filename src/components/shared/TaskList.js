import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Task from './Task';
import TaskService from '../../services/tasks';

const Container = styled.div`
  height: -webkit-fill-available;
`;

const Tasks = styled.div`
  width: -webkit-fill-available;
`;

const TaskList = () => {
  const taskService = new TaskService();
  const [tasks, setTasks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getTasks = async () => {
      const res = await taskService.getTasks();
      setTasks(res);
    };

    getTasks();
  }, []);

  return tasks ? (
    <Tasks data-testid="task-list">
      {tasks.map(task => (
        <div
          role="button"
          tabIndex={0}
          onClick={() => history.push(`/tasks/${task.id}`)}
          onKeyDown={() => history.push(`/tasks/${task.id}`)}
          key={task.id}
        >
          <Task
            name={task.name}
            completed={task.completed}
            subtasks={task.subtasks}
          />
        </div>
      ))}
    </Tasks>
  ) : (
    <Container />
  );
};

export default TaskList;
