import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';

import AppRouter from './routers/AppRouter';
import Navbar from './components/Navbar';
import Card from './components/Card';
import background from './assets/images/background.png';

injectGlobal`
  body {
    margin: 0px;
    overflow: hidden;
    height: 100%;
    font-family: 'Roboto';
    background-image: url(${background});
  }
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
