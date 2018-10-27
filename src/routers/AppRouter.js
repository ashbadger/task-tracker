import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TaskDetails from '../components/TaskDetails';
import SubtaskDetails from '../components/SubtaskDetails';
import TaskList from '../components/TaskList';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route path="/" component={TaskList} exact={true} />
        <Route path="/tasks" component={TaskList} exact={true} />
        <Route path="/tasks/:id" component={TaskDetails} exact={true} />
        <Route path="/tasks/:id/:subtaskId" component={SubtaskDetails} />
      </div>
    </Router>
  );
};

export default AppRouter;