import React from 'react';
import ReactDOM from 'react-dom';
import styled, { injectGlobal } from 'styled-components';

import { AppRouter } from './routers/AppRouter';
import Navbar from './components/shared/Navbar';
import Card from './components/shared/Card';

injectGlobal`
  body {
    margin: 0px;
    overflow: hidden;
    height: 100%;
    font-family: 'Roboto';
  }

  [class*='page-exit'], 
  [class*='page-enter'], 
  [class*='page--prev'] {
    width: -webkit-fill-available;
    height: 100%;
  }

  .page-enter {
    transform: translateX(120%);
  };

  .page-enter.page-enter-active {
    transform: translateX(0);
    transition: all 800ms ease;
  };

  .page-exit.page-exit-active {
    opacity: 0;
    transition: all 300ms ease;
  };

  .page--prev-enter {
    transform: translateX(-120%);
    transition-duration: all 800ms ease;
  };

  .page--prev-enter.page--prev-enter-active {
    transform: translateX(0);
    transition: all 800ms ease;
  };

  .page--prev--exit {
    transform: translateX(0);
  };

  .page--prev-exit.page--prev-exit-active {
    opacity: 0;
    transition: all 300ms ease;
  };
`;

const Page = styled.div`
  height: 90vh;
  position: relative;
  margin: 1rem;
`;

const App = () => (
  <div>
    <Navbar />
    <Page>
      <Card>
        <AppRouter />
      </Card>
    </Page>
  </div>
);


ReactDOM.render(<App />, document.getElementById('app'));
