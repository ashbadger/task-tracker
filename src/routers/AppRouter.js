import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import TaskDetailsPage from '../components/task/TaskDetailsPage';
import SubtaskDetailsPage from '../components/subtask/SubtaskDetailsPage';
import TaskListPage from '../components/task/TaskListPage';
import BackButton from '../components/shared/BackButton';
import TaskCreatePage from '../components/task/TaskCreatePage';
import SubtaskCreatePage from '../components/subtask/SubtaskCreatePage';

const Container = styled.div`
  position: relative;
  height: 100%;
`;

class AppRouter extends React.Component {
  stripSlashes = string => string.replace('/', '');

  isRootRoute = pathname =>
    ['', 'tasks'].includes(this.stripSlashes(pathname).trim());

  render() {
    return (
      <Router>
        <Route
          render={({ location, history }) => {
            const { pathname, key, navigateToPrevious = false } = location;
            return (
              <>
                {!this.isRootRoute(pathname) && (
                  <BackButton history={history} location={location} />
                )}
                <Container>
                  <TransitionGroup style={{ height: '100%' }}>
                    <CSSTransition
                      key={key}
                      classNames={navigateToPrevious ? 'page--prev' : 'page'}
                      timeout={800}
                    >
                      <Switch location={location}>
                        <Route exact path="/" component={TaskListPage} />
                        <Route exact path="/tasks" component={TaskListPage} />
                        <Route
                          exact
                          path="/tasks/create"
                          component={TaskCreatePage}
                        />
                        <Route
                          exact
                          path="/tasks/:id/create"
                          component={SubtaskCreatePage}
                        />
                        <Route
                          exact
                          path="/tasks/:id"
                          component={TaskDetailsPage}
                        />
                        <Route
                          path="/tasks/:id/:subtaskId"
                          component={SubtaskDetailsPage}
                        />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                </Container>
              </>
            );
          }}
        />
      </Router>
    );
  }
}

export default AppRouter;
