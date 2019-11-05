import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TaskDetailsPage from '../components/task/TaskDetailsPage';
import SubtaskDetailsPage from '../components/subtask/SubtaskDetailsPage';
import TaskListPage from '../components/task/TaskListPage';
import TaskCreatePage from '../components/task/TaskCreatePage';
import SubtaskCreatePage from '../components/subtask/SubtaskCreatePage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <TaskListPage />
      </Route>
      <Route exact path="/tasks">
        <TaskListPage />
      </Route>
      <Route exact path="/tasks/create">
        <TaskCreatePage />
      </Route>
      <Route exact path="/tasks/:id/create">
        <SubtaskCreatePage />
      </Route>
      <Route exact path="/tasks/:id">
        <TaskDetailsPage />
      </Route>
      <Route path="/tasks/:id/:subtaskId">
        <SubtaskDetailsPage />
      </Route>
    </Switch>
  );
};

export default Routes;
