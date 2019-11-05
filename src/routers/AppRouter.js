import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import BackButton from '../components/shared/BackButton';
import Routes from './Routes';

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const AppRouter = () => {
  const stripSlashes = string => string.replace('/', '');

  const isRootRoute = pathname =>
    ['', 'tasks'].includes(stripSlashes(pathname).trim());

  return (
    <Router>
      <Route
        render={({ location }) => {
          return (
            <>
              {!isRootRoute(location.pathname) && <BackButton />}
              <Container>
                <TransitionGroup style={{ height: '100%' }}>
                  <CSSTransition
                    key={location.key}
                    classNames={
                      location.navigateToPrevious ? 'page--prev' : 'page'
                    }
                    timeout={800}
                  >
                    <Routes />
                  </CSSTransition>
                </TransitionGroup>
              </Container>
            </>
          );
        }}
      />
    </Router>
  );
};

export default AppRouter;
