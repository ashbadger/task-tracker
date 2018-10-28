import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TaskDetails from '../components/TaskDetails';
import SubtaskDetails from '../components/SubtaskDetails';
import TaskList from '../components/TaskList';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={TaskList} />
      <Route exact path="/tasks" component={TaskList} />
      <Route exact path="/tasks/:id" component={TaskDetails} />
      <Route path="/tasks/:id/:subtaskId" component={SubtaskDetails} />
    </Switch>
  </Router>
);

export default AppRouter;
