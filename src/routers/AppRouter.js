import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import TaskDetails from '../components/TaskDetails';
import SubtaskDetails from '../components/SubtaskDetails';
import TaskList from '../components/TaskList';
import BackButton from '../components/BackButton';

const Container = styled.div`
  position: relative;
`;

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
                        <Route exact path="/" component={TaskList} />
                        <Route exact path="/tasks" component={TaskList} />
                        <Route exact path="/tasks/:id" component={TaskDetails} />
                        <Route path="/tasks/:id/:subtaskId" component={SubtaskDetails} />
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


export default AppRouter;
