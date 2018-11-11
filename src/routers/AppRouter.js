import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import TaskDetailsPage from '../task/TaskDetailsPage';
import SubtaskDetailsPage from '../subtask/SubtaskDetailsPage';
import TaskListPage from '../task/TaskListPage';
import BackButton from '../shared/BackButton';
import TaskCreatePage from '../task/TaskCreatePage';
import SubtaskCreatePage from '../subtask/SubtaskCreatePage';

const Container = styled.div`
  position: relative;
`;

const navigateBack = (history) => {
  const location = {
    pathname: history.location.pathname.split('/').slice(0, -1).join('/'),
    navigateToPrevious: true,
  };
  history.push(location);
};

class AppRouter extends React.Component {
  stripSlashes = string => string.replace('/', '');

  isRootRoute = pathname => ['', 'tasks'].includes(this.stripSlashes(pathname).trim());

  render() {
    return (
      <Router>
        <Route
          render={({ location, history }) => {
            const { pathname, key, navigateToPrevious = false } = location;
            return (
              <div>
                {
                  !this.isRootRoute(pathname)
                  && <BackButton history={history} location={location} />
                }
                <Container>
                  <TransitionGroup>
                    <CSSTransition
                      key={key}
                      classNames={navigateToPrevious ? 'page--prev' : 'page'}
                      timeout={800}
                    >
                      <Switch location={location}>
                        <Route exact path="/" component={TaskListPage} />
                        <Route exact path="/tasks" component={TaskListPage} />
                        <Route exact path="/tasks/create" component={TaskCreatePage} />
                        <Route exact path="/tasks/:id/create" component={SubtaskCreatePage} />
                        <Route exact path="/tasks/:id" component={TaskDetailsPage} />
                        <Route path="/tasks/:id/:subtaskId" component={SubtaskDetailsPage} />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                </Container>
              </div>
            );
          }}
        />
      </Router>
    );
  }
}

export { navigateBack, AppRouter };
