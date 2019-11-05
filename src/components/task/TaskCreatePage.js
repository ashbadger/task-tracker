import React from 'react';
import { useHistory } from 'react-router-dom';

import TaskCreate from '../shared/TaskCreate';
import TaskService from '../../services/tasks';

const TaskCreatePage = () => {
  const taskService = new TaskService();
  const history = useHistory();

  const saveTaskHandler = async task => {
    return taskService.createTask(task).then(res => {
      history.push(`/tasks/${res.id}`);
    });
  };

  return <TaskCreate saveHandler={saveTaskHandler} />;
};

export default TaskCreatePage;
