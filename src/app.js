import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';

import { AppRouter } from './routers/AppRouter';
import Navbar from './shared/Navbar';
import Card from './shared/Card';
import background from './assets/images/background.png';

injectGlobal`
  body {
    margin: 0px;
    overflow: hidden;
    height: 100%;
    font-family: 'Roboto';
    background-image: url(${background});
  }

  [class*='page-exit'], 
  [class*='page-enter'], 
  [class*='page--prev'] {
    position: absolute;
    width: -webkit-fill-available;
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

const App = () => (
  <div>
    <Navbar />
    <Card>
      <AppRouter />
    </Card>
  </div>
);


ReactDOM.render(<App />, document.getElementById('app'));
