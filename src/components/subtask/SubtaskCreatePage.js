import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import TaskCreate from '../shared/TaskCreate';
import TaskService from '../../services/tasks';
import Subtask from '../../models/Subtask';

const SubtaskCreatePage = () => {
  const taskService = new TaskService();
  const { id: taskId } = useParams();
  const history = useHistory();

  const saveSubtaskHandler = subtask => {
    console.log(new Subtask(subtask));
    taskService.createSubtask(taskId, { ...new Subtask(subtask) }).then(res => {
      history.push(`/tasks/${taskId}/${res.id}`);
    });
  };

  return <TaskCreate saveHandler={saveSubtaskHandler} />;
};

export default SubtaskCreatePage;
